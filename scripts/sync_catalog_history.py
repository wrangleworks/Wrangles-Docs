#!/usr/bin/env python3
"""Reconcile recipe wrangles from a generated upstream schema. Preview by default."""
import argparse
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path


def plan(schema, rows, inventory=None):
    """Derive DB lifecycle from per-name metadata, never from docstring history.

    Only a complete callable inventory authorizes disappearance detection.
    Present callables with missing/unreadable schemas abort rather than retire.
    """
    definitions = schema['$defs']['wrangles']['items']['properties']
    if not isinstance(definitions, dict) or not definitions:
        raise ValueError('Missing wrangle definitions')
    if inventory is not None:
        if not isinstance(inventory, list) or not inventory or any(not isinstance(n, str) for n in inventory):
            raise ValueError('Invalid callable inventory')
        inventory = set(inventory)
        if not set(definitions) <= inventory:
            raise ValueError('Schema and callable inventory disagree')
    groups, skipped, owners = {}, [], {}
    existing = {str(row['catalog_id']): row for row in rows}
    if len(existing) != len(rows):
        raise ValueError('Duplicate catalog IDs')
    for name, definition in definitions.items():
        if 'history' in definition:
            raise ValueError(f'Remove history from the WranglesPY docstring: {name}')
        status = definition.get('status')
        if status not in (None, 'active', 'legacy'):
            raise ValueError(f'Invalid per-name status: {name}')
        identity = definition.get('catalog_id')
        if identity is None:
            matches = [r for r in rows if r['catalog_kind'] == 'wrangle' and r['wranglesPY_key'] == name]
            if len(matches) > 1:
                raise ValueError(f'Ambiguous fallback: {name}')
            if not matches:
                skipped.append(name)
                continue
            identity = str(matches[0]['catalog_id'])
        if not isinstance(identity, str) or not re.fullmatch(r'[1-9][0-9]*', identity) or int(identity) > 9223372036854775807:
            raise ValueError(f'Invalid catalog_id: {name}')
        old = existing.get(identity)
        if old and old['catalog_kind'] != 'wrangle':
            raise ValueError(f'Wrong kind: {identity}')
        if not old and status is None:
            raise ValueError(f'New entry needs explicit status: {name}')
        groups.setdefault(identity, {})[name] = status or (old.get('history', {}).get(name) if old else None) or 'active'
        owners[name] = identity
    targets = []
    identities = set(groups)
    if inventory is not None:
        identities.update(str(r['catalog_id']) for r in rows if r['catalog_kind'] == 'wrangle')
    for identity in sorted(identities, key=int):
        old = existing.get(identity)
        # Excel Map is catalog-only, never a recipe callable.
        if old and old['catalog_key'] == old['wranglesPY_key'] == 'map' and old['wrangle_type'] == 'map' and 'map' not in definitions:
            continue
        names = groups.get(identity, {})
        if old and not isinstance(old.get('history'), dict):
            raise ValueError('Run the history migration first')
        history = dict(old['history']) if old else {}
        known = set(history) | ({old['wranglesPY_key']} if old else set())
        for name in known:
            if name in owners and owners[name] != identity:
                # Historical lookup rows share the old binding; their explicit
                # IDs may correct that binding, but must not claim lookup itself.
                if old and old['wranglesPY_key'] == name and old['catalog_key'] in names and name not in history:
                    continue
                raise ValueError(f'Catalog identity conflict: {name}')
            if inventory is not None and name not in inventory:
                history[name] = 'not active'
            elif inventory is not None and name not in definitions:
                raise ValueError(f'Callable exists but its schema is missing: {name}')
        for name, status in names.items():
            if status == 'legacy':
                history[name] = 'legacy'
            else:
                history.pop(name, None)
        active = [name for name, status in names.items() if status == 'active']
        if len(active) > 1:
            raise ValueError(f'Multiple active names for catalog ID {identity}: {active}')
        if active:
            name, status = active[0], 'active'
        elif names:
            name = old['wranglesPY_key'] if old and old['wranglesPY_key'] in names else sorted(names)[0]
            status = 'legacy'
        elif old:
            name = old['wranglesPY_key']
            status = 'not active' if inventory is not None and not (known & inventory) else old['status']
        else:
            continue
        key = old['catalog_key'] if old else name
        if old and key == old['wranglesPY_key'] and name != old['wranglesPY_key']:
            key = name
        # Without explicit lifecycle metadata, retain deliberate existing state.
        if old and name in definitions and definitions[name].get('status') is None and len(names) == 1:
            status = old['status']
        target = dict(catalog_id=identity, catalog_key=key, wranglesPY_key=name,
                      status=status, history=history)
        targets.append(target)
    final = {identity: row for identity, row in existing.items()}
    final.update({target['catalog_id']: target for target in targets})
    keys = [r['catalog_key'] for r in final.values()]
    if len(set(keys)) != len(keys):
        raise ValueError('Conflicting target catalog keys')
    for target in targets:
        for row in rows:
            if str(row['catalog_id']) != target['catalog_id'] and row['catalog_kind'] == 'wrangle' and row['wranglesPY_key'] == target['wranglesPY_key']:
                other = final[str(row['catalog_id'])]
                if other['wranglesPY_key'] == target['wranglesPY_key']:
                    raise ValueError(f"Conflicting runtime binding: {target['wranglesPY_key']}")
    return [dict(action='update' if target['catalog_id'] in existing else 'create', **target)
            for target in targets if target['catalog_id'] not in existing or any(
                existing[target['catalog_id']].get(k) != v for k, v in target.items() if k != 'catalog_id')], skipped


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('schema')
    parser.add_argument('--inventory', required=True, help='Complete callable inventory from the same upstream revision')
    parser.add_argument('--catalog-output', help='Write the updated catalog after applying changes')
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    import psycopg
    from psycopg.rows import dict_row
    from psycopg.types.json import Jsonb
    with open(args.schema) as stream:
        schema = json.load(stream)
    inventory = json.loads(Path(args.inventory).read_text())
    with psycopg.connect(os.environ['DATABASE_URL'], connect_timeout=15, row_factory=dict_row) as connection:
        connection.execute("SET LOCAL lock_timeout = '10s'")
        connection.execute("SET LOCAL statement_timeout = '60s'")
        # Prevent competing writes between conflict checks and application.
        if args.apply:
            connection.execute('LOCK TABLE public.wrangles_catalog IN SHARE ROW EXCLUSIVE MODE')
        else:
            connection.execute('SET TRANSACTION READ ONLY')
        rows = connection.execute('SELECT * FROM public.wrangles_catalog').fetchall()
        changes, skipped = plan(schema, rows, inventory['names'])
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
        if args.apply and args.catalog_output:
            exported = connection.execute('SELECT * FROM public.wrangles_catalog ORDER BY catalog_key').fetchall()
            for row in exported:
                row['catalog_id'] = str(row['catalog_id'])
                for field in ('created_at', 'updated_at'):
                    row[field] = row[field].astimezone(timezone.utc).isoformat().replace('+00:00', 'Z')
    if args.apply and args.catalog_output:
        Path(args.catalog_output).write_text(json.dumps({'catalog': exported}, indent=2) + '\n')
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
