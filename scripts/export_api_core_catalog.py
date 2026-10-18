#!/usr/bin/env python3
"""Export the full API-Core catalog while connected to the company VPN.

Run from any directory:
    python3 /path/to/scripts/export_api_core_catalog.py

Writes api-core.json in the current directory (or pass --output PATH).
API export uses only Python's standard library. Optional --database-fallback
requires psycopg 3 and DATABASE_URL, and reads public.wrangles_catalog only.
Optional environment variables: API_CORE_URL, API_CORE_TOKEN, API_CORE_API_KEY.
The exported JSON preserves the API response, including all catalog fields.
"""

import argparse
from collections import Counter
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


def fetch_database_catalog():
    """Read only the catalog; do not log connection strings or driver errors."""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError('DB fallback requires the DATABASE_URL Actions secret.')
    try:
        import psycopg
        with psycopg.connect(
            database_url, connect_timeout=15,
            options='-c default_transaction_read_only=on -c statement_timeout=30000',
        ) as connection:
            with connection.cursor() as cursor:
                cursor.execute('SET TRANSACTION READ ONLY')
                cursor.execute('''SELECT catalog_id, catalog_key, catalog_kind,
                    "wranglesPY_key", okf_path, status, created_at, updated_at,
                    wrangle_type, notes
                    FROM public.wrangles_catalog ORDER BY catalog_key''')
                columns = [column[0] for column in cursor.description]
                rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        for row in rows:
            row['catalog_id'] = str(row['catalog_id'])
            for field in ('created_at', 'updated_at'):
                value = row[field]
                if not isinstance(value, datetime) or value.tzinfo is None:
                    raise ValueError('Catalog dates must have a timezone.')
                row[field] = value.astimezone(timezone.utc).isoformat().replace('+00:00', 'Z')
        return {'catalog': rows}
    except Exception:
        raise ValueError('DB fallback failed. Check VPN access, DATABASE_URL, driver installation and SELECT permission.') from None


def fetch_catalog(url, headers, allow_database_fallback):
    try:
        with urlopen(Request(url, headers=headers), timeout=30) as response:
            payload = json.load(response)
        return payload, 'live-api-core-dev', None
    except HTTPError as exc:
        # Authentication/permission errors must be fixed, not bypassed via DB.
        if not allow_database_fallback or not (exc.code == 404 or 500 <= exc.code <= 599):
            raise
        reason = 'HTTP %s' % exc.code
    except (URLError, TimeoutError):
        if not allow_database_fallback:
            raise
        reason = 'API connection failed'
    print('WARNING: %s; reading catalog directly from DB. API-Core validation did not pass.' % reason,
          file=sys.stderr)
    return fetch_database_catalog(), 'direct-database', reason


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--url",
        default=os.environ.get("API_CORE_URL", "https://internal-api.wrangle.works"),
        help="API-Core base URL",
    )
    parser.add_argument("--output", default="api-core.json")
    parser.add_argument('--database-fallback', action='store_true',
                        help='Use read-only DATABASE_URL on API 404, 5xx or connection failure')
    parser.add_argument('--source-report', help='Write a credential-free acquisition report')
    args = parser.parse_args()
    url = args.url.rstrip("/") + "/catalog"
    token = os.environ.get("API_CORE_TOKEN")
    api_key = os.environ.get("API_CORE_API_KEY")
    if token and api_key:
        parser.error("Set API_CORE_TOKEN or API_CORE_API_KEY, not both.")

    headers = {"Accept": "application/json"}
    if token:
        headers["Authorization"] = "Bearer " + token
    elif api_key:
        headers["x-api-key"] = api_key

    print("Fetching " + url, flush=True)
    try:
        payload, source, fallback_reason = fetch_catalog(url, headers, args.database_fallback)
        if not isinstance(payload, dict) or not isinstance(payload.get("catalog"), list):
            raise ValueError("Expected a JSON object containing a 'catalog' array.")
        rows = payload["catalog"]
        if not rows:
            raise ValueError("The catalog is empty; no file was written.")
        for index, row in enumerate(rows):
            if not isinstance(row, dict) or not all(
                field in row for field in ("catalog_id", "catalog_key", "catalog_kind")
            ):
                raise ValueError("Catalog row %s is missing identity fields." % index)
        output = Path(args.output).expanduser().resolve()
        # Exclusive creation avoids overwriting the Registry's differently shaped snapshot.
        with output.open("x", encoding="utf-8") as destination:
            json.dump(payload, destination, indent=2, ensure_ascii=False)
            destination.write("\n")
        if args.source_report:
            report = {
                'source': source,
                'fetched_at': datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'),
                'api_core_fetch_succeeded': source == 'live-api-core-dev',
                'fallback_reason': fallback_reason,
                'catalog_rows': len(rows),
            }
            with Path(args.source_report).open('x', encoding='utf-8') as stream:
                json.dump(report, stream, indent=2)
                stream.write('\n')
    except HTTPError as exc:
        print("ERROR: HTTP %s. Check the endpoint and authentication." % exc.code, file=sys.stderr)
        return 1
    except (URLError, TimeoutError) as exc:
        print("ERROR: Cannot reach API-Core. Check your VPN.", file=sys.stderr)
        return 1
    except FileExistsError:
        print("ERROR: Output already exists. Choose another filename with --output.", file=sys.stderr)
        return 1
    except (OSError, ValueError) as exc:
        print("ERROR: %s" % exc, file=sys.stderr)
        return 1

    print("Saved %s catalog rows to %s" % (len(rows), output))
    for kind, count in sorted(Counter(str(row["catalog_kind"]) for row in rows).items()):
        print("  %s: %s" % (kind, count))
    print("Copy the complete contents of that JSON file and send them here.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
