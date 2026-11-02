#!/usr/bin/env python3
"""Reconcile recipe wrangles from a generated upstream schema. Preview by default."""
import argparse
import json
import os
import re
import sys


def plan(schema, rows):
    definitions = schema['$defs']['wrangles']['items']['properties']
    if not isinstance(definitions, dict) or not definitions:
        raise ValueError('Missing wrangle definitions')
    groups = {}
    skipped = []
    for name, definition in definitions.items():
        identity = definition.get('catalog_id')
        if identity is None:
            matches = [r for r in rows if r['catalog_kind'] == 'wrangle' and r['wranglesPY_key'] == name]
            if len(matches) > 1:
                raise ValueError(f'Ambiguous fallback: {name}')
            if not matches:
                skipped.append(name)
                continue
            identity = str(matches[0]['catalog_id'])
        if not isinstance(identity, str) or not re.fullmatch(r'[1-9][0-9]*', identity):
            raise ValueError(f'Invalid catalog_id: {name}')
        if int(identity) > 9223372036854775807:
            raise ValueError(f'catalog_id exceeds BIGINT: {name}')
        history = definition.get('history', {})
        if not isinstance(history, dict) or any(not isinstance(k, str) or v != 'legacy' for k, v in history.items()):
            raise ValueError(f'Invalid legacy history: {name}')
        status = definition.get('status')
        if status not in (None, 'active'):
            raise ValueError(f'Expected active status; legacy names belong in history: {name}')
        groups.setdefault(identity, []).append((name, status, history))
    changes = []
    for identity, entries in groups.items():
        if any(e[1:] != entries[0][1:] for e in entries):
            raise ValueError(f'Inconsistent shared metadata: {identity}')
        _, status, history = entries[0]
        names = {e[0] for e in entries}
        if not set(history) <= names:
            raise ValueError(f'Legacy names absent from schema: {identity}')
        current = names - history.keys()
        if len(current) != 1:
            raise ValueError(f'Expected one current name for {identity}: {sorted(current)}')
        name = current.pop()
        matches = [r for r in rows if str(r['catalog_id']) == identity]
        if len(matches) > 1:
            raise ValueError(f'Duplicate catalog ID: {identity}')
        old = matches[0] if matches else None
        if old and old['catalog_kind'] != 'wrangle':
            raise ValueError(f'Wrong kind: {identity}')
        if old and not isinstance(old.get('history'), dict):
            raise ValueError('Run the history migration first')
        key = old['catalog_key'] if old else name
        if key in history:
            key = name
        # Preserve custom documentation organization; rename only declared legacy keys.
        merged = dict(old['history']) if old else {}
        merged.update(history)
        if name in merged:
            raise ValueError(f'Current name already in history: {name}')
        for row in rows:
            if str(row['catalog_id']) == identity:
                continue
            if row['catalog_key'] == key or (row['catalog_kind'] == 'wrangle' and row['wranglesPY_key'] in names):
                # Allow a stale binding only when the same plan explicitly moves
                # that other row to a distinct current name (e.g. lookup variants).
                other = groups.get(str(row['catalog_id']), [])
                other_current = {e[0] for e in other} - (other[0][2].keys() if other else set())
                if row['catalog_key'] == key or len(other_current) != 1 or other_current & names:
                    raise ValueError(f'Conflicting catalog identity for {name}')
        if not old and status is None:
            raise ValueError(f'New entry needs explicit status: {name}')
        target = dict(catalog_id=identity, catalog_key=key, wranglesPY_key=name,
                      status=status or old['status'], history=merged)
        if not old or any(old.get(k) != v for k, v in target.items() if k != 'catalog_id'):
            changes.append({'action': 'update' if old else 'create', **target})
    if len({c['catalog_key'] for c in changes}) != len(changes):
        raise ValueError('Duplicate target catalog keys')
    return changes, skipped


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('schema')
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    import psycopg
    from psycopg.rows import dict_row
    from psycopg.types.json import Jsonb
    with open(args.schema) as stream:
        schema = json.load(stream)
    with psycopg.connect(os.environ['DATABASE_URL'], connect_timeout=15, row_factory=dict_row) as connection:
        connection.execute("SET LOCAL lock_timeout = '10s'")
        connection.execute("SET LOCAL statement_timeout = '60s'")
        # Prevent competing writes between conflict checks and application.
        if args.apply:
            connection.execute('LOCK TABLE public.wrangles_catalog IN SHARE ROW EXCLUSIVE MODE')
        else:
            connection.execute('SET TRANSACTION READ ONLY')
        rows = connection.execute('SELECT * FROM public.wrangles_catalog').fetchall()
        changes, skipped = plan(schema, rows)
        if args.apply:
            for change in changes:
                values = (change['catalog_key'], change['wranglesPY_key'], change['status'], Jsonb(change['history']), int(change['catalog_id']))
                if change['action'] == 'update':
                    connection.execute('''UPDATE public.wrangles_catalog SET catalog_key=%s,
                        "wranglesPY_key"=%s, status=%s, history=%s, updated_at=NOW()
                        WHERE catalog_id=%s''', values)
                else:
                    connection.execute('''INSERT INTO public.wrangles_catalog
                        (catalog_key, "wranglesPY_key", status, history, catalog_id, catalog_kind, wrangle_type, okf_path)
                        OVERRIDING SYSTEM VALUE VALUES (%s,%s,%s,%s,%s,'wrangle',NULL,NULL)''', values)
            # Leave any DB-owned allocator above the explicitly assigned IDs.
            if any(c['action'] == 'create' for c in changes):
                connection.execute('''SELECT setval(pg_get_serial_sequence('public.wrangles_catalog','catalog_id'),
                    GREATEST((SELECT MAX(catalog_id) FROM public.wrangles_catalog),
                    nextval(pg_get_serial_sequence('public.wrangles_catalog','catalog_id'))), true)
                    WHERE pg_get_serial_sequence('public.wrangles_catalog','catalog_id') IS NOT NULL''')
    print(json.dumps({'applied': args.apply, 'changes': changes, 'unregistered': skipped}, indent=2))


if __name__ == '__main__':
    try:
        main()
    except ValueError as error:
        print(f'Catalog sync rejected: {error}. No catalog row changes committed.', file=sys.stderr)
        sys.exit(1)
    except Exception:
        print('Catalog sync failed; transaction rolled back. Check schema metadata, identity conflicts, migration and DB access.', file=sys.stderr)
        sys.exit(1)
