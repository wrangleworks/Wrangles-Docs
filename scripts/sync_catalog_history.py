#!/usr/bin/env python3
"""Reconcile recipe wrangles from a generated upstream schema. Preview by default."""
import argparse
import json
import os
import re
import sys
from datetime import timezone
from contextlib import contextmanager
from pathlib import Path



class SyncFailure(Exception):
    """An actionable diagnostic containing no raw DB error or connection string."""


def safe_error(error, operation, committed=False):
    details = {'operation': operation, 'error_type': type(error).__name__,
               'catalog_changes_committed': committed}
    state = getattr(error, 'sqlstate', None)
    if isinstance(state, str) and re.fullmatch(r'[A-Z0-9]{5}', state):
        details['sqlstate'] = state
        details['reason'] = {
            '23503': 'Foreign-key reference prevents the catalog change',
            '23505': 'Unique constraint conflict',
            '23514': 'Check constraint violation',
            '23502': 'Required database column is null',
            '42501': 'Database role lacks permission for this operation',
            '55P03': 'Could not acquire the database lock',
            '57014': 'Database statement timed out or was cancelled',
            '25006': 'Database connection is read-only',
        }.get(state, 'Database rejected this operation')
    diagnostic = getattr(error, 'diag', None)
    for key in ('schema_name', 'table_name', 'column_name', 'constraint_name'):
        value = getattr(diagnostic, key, None)
        if isinstance(value, str) and re.fullmatch(r'[A-Za-z_][A-Za-z0-9_]{0,127}', value):
            details[key] = value
    return json.dumps(details, sort_keys=True)


@contextmanager
def sync_step(label, committed=False):
    try:
        yield
    except SyncFailure:
        raise
    except Exception as error:
        raise SyncFailure(safe_error(error, label, committed)) from None

def plan(schema, rows, inventory=None, warnings=None):
    """Derive DB lifecycle from per-name metadata, never from docstring history.

    Only a complete callable inventory authorizes disappearance detection.
    Present callables with missing schemas retain their entire catalog row.
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
    warnings = warnings if warnings is not None else []
    missing = inventory - set(definitions) if inventory is not None else set()
    for name in sorted(missing):
        warnings.append({'name': name, 'reason': 'Callable exists but its schema is missing',
                         'action': 'retain_existing_row_or_skip_new'})
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
        if not old and status is None:
            raise ValueError(f'New entry needs explicit status: {name}')
        groups.setdefault(identity, {})[name] = status or (old.get('history', {}).get(name) if old else None) or 'active'
        owners[name] = identity
    # Link source/destination IDs so a rejected move retains both sides.
    links = {identity: set() for identity in set(existing) | set(groups)}
    moves = {}
    blocked = set()

    def block(identity, reason):
        if identity not in blocked:
            warnings.append({'catalog_id': identity, 'reason': reason,
                             'action': 'retain_conflicting_rows'})
        blocked.add(identity)

    def row_name(row):
        # Older lookup rows have distinct catalog keys but all bind to lookup.
        # Prefer that exact exposed key when resolving the original identity.
        return row['catalog_key'] if row['catalog_key'] in definitions or row['catalog_key'] in missing else row['wranglesPY_key']

    for identity, names in groups.items():
        if identity in existing and existing[identity]['catalog_kind'] != 'wrangle':
            block(identity, 'Catalog ID belongs to a connector')
        active = [name for name, status in names.items() if status == 'active']
        if len(active) > 1:
            block(identity, f'Multiple active names request this ID: {active}')
    for identity, old in existing.items():
        if old['catalog_kind'] != 'wrangle':
            continue
        if not isinstance(old.get('history'), dict):
            raise ValueError('Run the history migration first')
        current = row_name(old)
        known = set(old['history']) | {current}
        if known & missing:
            block(identity, 'Present function lacks a schema; retain the entire identity')
        for name in known:
            destination = owners.get(name)
            if destination and destination != identity:
                links[identity].add(destination)
                links[destination].add(identity)
        destination = owners.get(current)
        if destination and destination != identity and identity not in groups:
            moves[identity] = destination

    # Preserve old history when a whole row is absorbed by a new identity.
    histories = {identity: dict(row.get('history', {})) for identity, row in existing.items()}
    for source, destination in moves.items():
        for name, status in existing[source]['history'].items():
            owner = owners.get(name, destination)
            histories.setdefault(owner, {})[name] = status
            links[source].add(owner)
            links[owner].add(source)

    def propagate_blocks():
        pending = list(blocked)
        while pending:
            identity = pending.pop()
            for linked in links[identity] - blocked:
                block(linked, f'Related catalog move conflicts with retained ID {identity}')
                pending.append(linked)

    propagate_blocks()
    targets = {}
    identities = set(groups) | set(moves)
    if inventory is not None:
        identities.update(i for i, r in existing.items() if r['catalog_kind'] == 'wrangle')
    for identity in sorted(identities, key=int):
        if identity in blocked or identity in moves:
            continue
        old = existing.get(identity)
        # Excel Map is catalog-only, never a recipe callable.
        if old and old['catalog_key'] == old['wranglesPY_key'] == 'map' and old['wrangle_type'] == 'map' and 'map' not in definitions:
            continue
        names = groups.get(identity, {})
        history = dict(histories.get(identity, {}))
        known = set(history) | ({row_name(old)} if old else set())
        for name in known:
            if name in owners and owners[name] != identity:
                history.pop(name, None)
            elif inventory is not None and name not in inventory:
                history[name] = 'not active'
        for name, status in names.items():
            if status == 'legacy':
                history[name] = 'legacy'
            else:
                history.pop(name, None)
        active = [name for name, status in names.items() if status == 'active']
        if active:
            name, status = active[0], 'active'
        elif names:
            name = row_name(old) if old and row_name(old) in names else sorted(names)[0]
            status = 'legacy'
        elif old:
            name = old['wranglesPY_key']
            status = 'not active' if inventory is not None and not (known & inventory) else old['status']
        else:
            continue
        template = old or next((existing[source] for source, destination in moves.items()
                               if destination == identity and row_name(existing[source]) == name), None)
        key = template['catalog_key'] if template else name
        if old and name in definitions and definitions[name].get('status') is None and len(names) == 1:
            status = old['status']
        targets[identity] = dict(catalog_id=identity, catalog_key=key, wranglesPY_key=name,
                                 status=status, history=history)

    # A retained row can also block another row's proposed unique key/binding.
    # Recompute after each rejection, propagating across related moves.
    while True:
        final = {i: r for i, r in existing.items() if i not in moves or i in blocked}
        final.update({i: t for i, t in targets.items() if i not in blocked})
        before = set(blocked)
        for field in ('catalog_key', 'wranglesPY_key'):
            values = {}
            for identity, record in final.items():
                if field == 'wranglesPY_key' and identity in existing and existing[identity]['catalog_kind'] != 'wrangle':
                    continue
                values.setdefault(record[field], []).append(identity)
            for value, ids in values.items():
                if len(ids) > 1 and any(i in targets and i not in blocked and
                        (i not in existing or targets[i][field] != existing[i][field]) for i in ids):
                    for identity in ids:
                        block(identity, f'Conflicting {field}: {value}')
        propagate_blocks()
        if blocked == before:
            break
    changes = [dict(action='delete', catalog_id=source,
                    catalog_key=existing[source]['catalog_key'],
                    wranglesPY_key=existing[source]['wranglesPY_key'],
                    replacement_catalog_id=destination)
               for source, destination in sorted(moves.items(), key=lambda item: int(item[0]))
               if source not in blocked]
    changes.extend(dict(action='update' if identity in existing else 'create', **target)
                   for identity, target in targets.items() if identity not in blocked and
                   (identity not in existing or any(existing[identity].get(k) != v
                    for k, v in target.items() if k != 'catalog_id')))
    return changes, skipped


def apply_plan(connection, changes, rows, jsonb):
    """Execute the reviewed plan inside the caller's single DB transaction."""
    existing = {str(row['catalog_id']): row for row in rows}
    for change in changes:
        if change['action'] == 'delete':
            with sync_step(f"reassign model references from catalog ID {change['catalog_id']} to {change['replacement_catalog_id']}"):
                connection.execute('UPDATE public.models SET catalog_id=%s WHERE catalog_id=%s',
                                   (int(change['replacement_catalog_id']), int(change['catalog_id'])))
            with sync_step(f"{change['action']} catalog ID {change['catalog_id']}"):
                connection.execute('DELETE FROM public.wrangles_catalog WHERE catalog_id=%s',
                                   (int(change['catalog_id']),))
    for change in changes:
        if change['action'] == 'delete':
            continue
        values = (change['catalog_key'], change['wranglesPY_key'], change['status'],
                  jsonb(change['history']), int(change['catalog_id']))
        if change['action'] == 'update':
            with sync_step(f"{change['action']} catalog ID {change['catalog_id']}"):
                connection.execute('''UPDATE public.wrangles_catalog SET catalog_key=%s,
                    "wranglesPY_key"=%s, status=%s, history=%s, updated_at=NOW()
                    WHERE catalog_id=%s''', values)
        else:
            # ID reassignment preserves the source row's non-schema metadata.
            source = next((existing[c['catalog_id']] for c in changes if c['action'] == 'delete'
                           and c['replacement_catalog_id'] == change['catalog_id']
                           and change['wranglesPY_key'] in
                           (existing[c['catalog_id']]['catalog_key'], existing[c['catalog_id']]['wranglesPY_key'])), {})
            with sync_step(f"{change['action']} catalog ID {change['catalog_id']}"):
                connection.execute('''INSERT INTO public.wrangles_catalog
                    (catalog_key, "wranglesPY_key", status, history, catalog_id, catalog_kind,
                     wrangle_type, okf_path, notes, created_at)
                    OVERRIDING SYSTEM VALUE VALUES (%s,%s,%s,%s,%s,'wrangle',%s,%s,%s,COALESCE(%s,NOW()))''',
                    (*values, source.get('wrangle_type'), source.get('okf_path'),
                     source.get('notes'), source.get('created_at')))

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
    with sync_step('database transaction (connect, plan, apply, export, commit)'):
        with psycopg.connect(os.environ['DATABASE_URL'], connect_timeout=15, row_factory=dict_row) as connection:
            connection.execute("SET LOCAL lock_timeout = '10s'")
            connection.execute("SET LOCAL statement_timeout = '60s'")
            # Prevent competing writes between conflict checks and application.
            if args.apply:
                connection.execute('LOCK TABLE public.wrangles_catalog IN SHARE ROW EXCLUSIVE MODE')
            else:
                connection.execute('SET TRANSACTION READ ONLY')
            rows = connection.execute('SELECT * FROM public.wrangles_catalog').fetchall()
            warnings = []
            changes, skipped = plan(schema, rows, inventory['names'], warnings)
            for change in changes:
                if change['action'] == 'delete':
                    with sync_step(f"count model references for catalog ID {change['catalog_id']}"):
                        change['model_references_to_reassign'] = connection.execute(
                            'SELECT COUNT(*) AS count FROM public.models WHERE catalog_id=%s',
                            (int(change['catalog_id']),)).fetchone()['count']
            if args.apply:
                apply_plan(connection, changes, rows, Jsonb)
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
        with sync_step('write catalog snapshot after database commit', committed=True):
            Path(args.catalog_output).write_text(json.dumps({'catalog': exported}, indent=2) + '\n')
    print(json.dumps({'applied': args.apply, 'changes': changes, 'unregistered': skipped,
                      'warnings': warnings}, indent=2))


if __name__ == '__main__':
    try:
        main()
    except SyncFailure as error:
        print(f'Catalog sync failed: {error}', file=sys.stderr)
        sys.exit(1)
    except ValueError as error:
        print(f'Catalog sync rejected: {error}. No catalog row changes committed.', file=sys.stderr)
        sys.exit(1)
    except Exception as error:
        print(f'Catalog sync failed: {safe_error(error, 'load configuration/schema')}', file=sys.stderr)
        sys.exit(1)
