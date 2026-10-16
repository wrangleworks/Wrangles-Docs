#!/usr/bin/env python3
"""Seed WranglesPY recipe connectors into public.wrangles_catalog.

The connector inventory is pinned to WranglesPY branch
``codex/excel-recipe-input`` at commit
``a5256a5d30b0ebed7fb883a1c1fd8d68b11fcce4``. It includes the branch's
``excel.selected_data`` read connector and ``excel.columns`` write connector.

Catalog keys are prefixed with ``connector.`` so connector identities do not
collide with existing wrangle identities such as ``matrix`` and ``recipe``.
The exact executable recipe key remains in the quoted ``wranglesPY_key``
column.

Preview without connecting to PostgreSQL:

    python3 scripts/seed_connector_catalog.py

Apply using the same DATABASE_URL convention as the other seed scripts:

    export DATABASE_URL='postgresql://user:password@host:5432/database'
    python3 scripts/seed_connector_catalog.py --apply

The script accepts psycopg 3 or psycopg2. It never supplies ``catalog_id``;
PostgreSQL's identity sequence remains authoritative. Re-running the script is
safe: rows are inserted or updated by unique ``catalog_key``, and unchanged
rows are left untouched.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from dataclasses import dataclass
from typing import Any


DEFAULT_TABLE = "public.wrangles_catalog"
CATALOG_PREFIX = "connector."
SOURCE_REVISION = "WranglesPY codex/excel-recipe-input@a5256a5d"


@dataclass(frozen=True)
class Connector:
    runtime_key: str
    operations: tuple[str, ...]
    note: str | None = None


# Keys discovered by WranglesPY's recursive recipe-schema generator. The four
# synthetic schema connectors at the end are added directly by that generator.
CONNECTORS = (
    Connector("access", ("read", "run", "write")),
    Connector("akeneo", ("read", "write")),
    Connector("ckan", ("read", "write")),
    Connector("ckan.download", ("run",)),
    Connector("ckan.upload", ("run",)),
    Connector("concurrent", ("read", "run", "write")),
    Connector("duckdb", ("read", "run", "write")),
    Connector(
        "excel.columns",
        ("write",),
        "WranglesXL columns write mode added by Eric's excel recipe input branch.",
    ),
    Connector(
        "excel.selected_data",
        ("read",),
        "WranglesXL selected-data read; preferred over the legacy input connector.",
    ),
    Connector("excel.sheet", ("write",)),
    Connector("file", ("read", "write")),
    Connector("grid.selected_data", ("read",)),
    Connector("http", ("read", "run", "write")),
    Connector(
        "input",
        ("read",),
        "Legacy selected-data connector retained for compatibility; prefer excel.selected_data in WranglesXL.",
    ),
    Connector("jinja", ("run",)),
    Connector("matrix", ("read", "run", "write")),
    Connector("memory", ("read", "write")),
    Connector("mongodb", ("read", "write")),
    Connector("mssql", ("read", "run", "write")),
    Connector("mysql", ("read", "write")),
    Connector("notification", ("run",)),
    Connector("notification.email", ("run",)),
    Connector("notification.slack", ("run",)),
    Connector("notification.telegram", ("run",)),
    Connector("postgres", ("read", "run", "write")),
    Connector("pricefx", ("read", "write")),
    Connector("recipe", ("read", "run", "write")),
    Connector("s3", ("read", "write")),
    Connector("s3.download_files", ("run",)),
    Connector("s3.upload_files", ("run",)),
    Connector("salesforce", ("read", "write")),
    Connector("sftp", ("read", "write")),
    Connector("sftp.download_files", ("run",)),
    Connector("sftp.upload_files", ("run",)),
    Connector("sqlite", ("read", "run", "write")),
    Connector("ssh", ("run",)),
    Connector("test", ("read",)),
    Connector("train.classify", ("read", "write")),
    Connector("train.extract", ("read", "write")),
    Connector("train.lookup", ("read", "write")),
    Connector("train.meta_data", ("read", "write")),
    Connector("train.standardize", ("read", "write")),
    Connector("join", ("read",), "Recipe-schema composite read connector."),
    Connector("union", ("read",), "Recipe-schema composite read connector."),
    Connector("concatenate", ("read",), "Recipe-schema composite read connector."),
    Connector("dataframe", ("write",), "Recipe return-dataframe write connector."),
)


def load_db_driver():
    try:
        import psycopg

        return "psycopg", psycopg
    except ImportError:
        pass

    try:
        import psycopg2

        return "psycopg2", psycopg2
    except ImportError:
        raise SystemExit(
            "Missing PostgreSQL driver. Install one of:\n"
            "  python3 -m pip install 'psycopg[binary]'\n"
            "  python3 -m pip install psycopg2-binary"
        )


def quote_ident(identifier: str) -> str:
    if not re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*", identifier):
        raise ValueError(f"Unsafe SQL identifier: {identifier!r}")
    return f'"{identifier}"'


def parse_table_name(value: str) -> str:
    parts = value.split(".")
    if len(parts) == 1:
        return quote_ident(parts[0])
    if len(parts) == 2:
        return f"{quote_ident(parts[0])}.{quote_ident(parts[1])}"
    raise ValueError("Table name must be table or schema.table")


def connector_note(connector: Connector) -> str:
    operations = ", ".join(connector.operations)
    base = f"WranglesPY recipe connector; operations: {operations}."
    if connector.note:
        base = f"{base} {connector.note}"
    return f"{base} Source: {SOURCE_REVISION}."


def build_rows() -> list[dict[str, Any]]:
    rows = [
        {
            "catalog_key": f"{CATALOG_PREFIX}{connector.runtime_key}",
            "catalog_kind": "connector",
            "wranglesPY_key": connector.runtime_key,
            "okf_path": None,
            "status": "active",
            "wrangle_type": None,
            "notes": connector_note(connector),
        }
        for connector in CONNECTORS
    ]

    catalog_keys = [row["catalog_key"] for row in rows]
    runtime_keys = [row["wranglesPY_key"] for row in rows]
    if len(catalog_keys) != len(set(catalog_keys)):
        raise RuntimeError("Duplicate connector catalog_key in seed inventory")
    if len(runtime_keys) != len(set(runtime_keys)):
        raise RuntimeError("Duplicate connector wranglesPY_key in seed inventory")
    return rows


def validate_table(cursor, table_sql: str) -> None:
    cursor.execute(f"select * from {table_sql} where false")
    actual_columns = {description[0] for description in cursor.description}
    expected_columns = {
        "catalog_id",
        "catalog_key",
        "catalog_kind",
        "wranglesPY_key",
        "okf_path",
        "status",
        "wrangle_type",
        "notes",
        "created_at",
        "updated_at",
    }
    missing = sorted(expected_columns - actual_columns)
    if missing:
        raise RuntimeError(
            f"{table_sql} is missing expected columns: {', '.join(missing)}"
        )


def reject_kind_conflicts(cursor, table_sql: str, rows: list[dict[str, Any]]) -> None:
    placeholders = ", ".join(["%s"] * len(rows))
    cursor.execute(
        f"""
        select catalog_key, catalog_kind
        from {table_sql}
        where catalog_key in ({placeholders})
          and catalog_kind <> 'connector'
        order by catalog_key
        """,
        [row["catalog_key"] for row in rows],
    )
    conflicts = cursor.fetchall()
    if conflicts:
        details = ", ".join(f"{key} ({kind})" for key, kind in conflicts)
        raise RuntimeError(
            "Refusing to replace non-connector catalog rows: " + details
        )


def upsert_rows(cursor, table_sql: str, rows: list[dict[str, Any]]) -> tuple[int, int, int]:
    existing_alias = quote_ident("existing")
    sql = f"""
        insert into {table_sql} as {existing_alias} (
          catalog_key,
          catalog_kind,
          "wranglesPY_key",
          okf_path,
          status,
          wrangle_type,
          notes
        )
        values (%s, %s, %s, %s, %s, %s, %s)
        on conflict (catalog_key) do update set
          catalog_kind = excluded.catalog_kind,
          "wranglesPY_key" = excluded."wranglesPY_key",
          okf_path = excluded.okf_path,
          status = excluded.status,
          wrangle_type = excluded.wrangle_type,
          notes = excluded.notes,
          updated_at = date_trunc('second', now())
        where (
          {existing_alias}.catalog_kind,
          {existing_alias}."wranglesPY_key",
          {existing_alias}.okf_path,
          {existing_alias}.status,
          {existing_alias}.wrangle_type,
          {existing_alias}.notes
        ) is distinct from (
          excluded.catalog_kind,
          excluded."wranglesPY_key",
          excluded.okf_path,
          excluded.status,
          excluded.wrangle_type,
          excluded.notes
        )
        returning catalog_id, catalog_key
    """

    cursor.execute(
        f"select catalog_key from {table_sql} where catalog_key like %s",
        [f"{CATALOG_PREFIX}%"],
    )
    existing_keys = {row[0] for row in cursor.fetchall()}
    inserted = updated = unchanged = 0

    for row in rows:
        cursor.execute(
            sql,
            (
                row["catalog_key"],
                row["catalog_kind"],
                row["wranglesPY_key"],
                row["okf_path"],
                row["status"],
                row["wrangle_type"],
                row["notes"],
            ),
        )
        changed = cursor.fetchone()
        if changed is None:
            unchanged += 1
        elif row["catalog_key"] in existing_keys:
            updated += 1
        else:
            inserted += 1

    return inserted, updated, unchanged


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Seed WranglesPY connectors into public.wrangles_catalog."
    )
    parser.add_argument(
        "--table",
        default=DEFAULT_TABLE,
        help=f"Target table. Default: {DEFAULT_TABLE}",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Connect and commit the upsert. Without this flag, only print the plan.",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print the planned rows as JSON (preview mode only).",
    )
    args = parser.parse_args()

    table_sql = parse_table_name(args.table)
    rows = build_rows()

    if not args.apply:
        if args.json:
            print(json.dumps(rows, indent=2))
        else:
            print(
                f"Preview: {len(rows)} connector rows would be upserted into "
                f"{args.table}."
            )
            for row in rows:
                print(
                    f"  {row['catalog_key']} -> {row['wranglesPY_key']} "
                    f"({row['notes'].split('operations: ', 1)[1].split('.', 1)[0]})"
                )
            print("No database connection was opened. Re-run with --apply to write.")
        return 0

    database_url = os.getenv("DATABASE_URL") or os.getenv("DATABSE_URL")
    if not database_url:
        raise SystemExit("Set DATABASE_URL before running with --apply.")

    driver_name, driver = load_db_driver()
    connection = driver.connect(database_url)
    try:
        with connection:
            with connection.cursor() as cursor:
                validate_table(cursor, table_sql)
                reject_kind_conflicts(cursor, table_sql, rows)
                inserted, updated, unchanged = upsert_rows(cursor, table_sql, rows)
    finally:
        connection.close()

    print(
        f"Seeded {len(rows)} connector rows into {args.table} using {driver_name}: "
        f"{inserted} inserted, {updated} updated, {unchanged} unchanged."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
