#!/usr/bin/env python3
"""One-time local migration. Requires psycopg 3 and DATABASE_URL (VPN connected).

python3 -m pip install 'psycopg[binary]>=3.2,<4'
python3 scripts/migrate_catalog_history.py

Prints the updated catalog as JSON. Never renames entries or moves legacy names.
"""
import json
import os
import sys


def main():
    import psycopg
    from psycopg.rows import dict_row

    with psycopg.connect(os.environ['DATABASE_URL'], connect_timeout=15,
                          row_factory=dict_row) as connection:
        connection.execute("SET LOCAL lock_timeout = '10s'")
        connection.execute("SET LOCAL statement_timeout = '60s'")
        connection.execute('''ALTER TABLE public.wrangles_catalog
            ADD COLUMN IF NOT EXISTS history jsonb NOT NULL DEFAULT '{}'::jsonb''')
        connection.execute("UPDATE public.wrangles_catalog SET history = '{}'::jsonb WHERE history IS NULL")
        connection.execute("ALTER TABLE public.wrangles_catalog ALTER COLUMN history SET DEFAULT '{}'::jsonb, ALTER COLUMN history SET NOT NULL")
        # Existing deliberate lifecycle decisions must not be reset.
        connection.execute("ALTER TABLE public.wrangles_catalog ALTER COLUMN status SET DEFAULT 'active'")
        connection.execute("UPDATE public.wrangles_catalog SET status = 'active', updated_at = NOW() WHERE status IS NULL")
        rows = connection.execute('SELECT * FROM public.wrangles_catalog ORDER BY catalog_id').fetchall()
        if any(not isinstance(row['history'], dict) for row in rows):
            raise ValueError('Existing history must contain JSON objects; migration rolled back.')
        for row in rows:
            row['catalog_id'] = str(row['catalog_id'])
    print(json.dumps({'catalog': rows}, default=str, indent=2))


if __name__ == '__main__':
    try:
        main()
    except Exception:
        print('Migration failed. Check DATABASE_URL, VPN, psycopg and table permissions. No credentials printed.', file=sys.stderr)
        sys.exit(1)
