#!/usr/bin/env python3
"""Seed public.wranglesio_content from the generated wrangle catalog.

Connection:
  export DATABASE_URL='postgresql://user:password@host:5432/database'

The script also accepts the misspelled DATABSE_URL for convenience.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js"
MAPPINGS_PATH = ROOT / "wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json"
DEFAULT_TABLE = "public.wranglesio_content"


def load_db_driver():
    try:
        import psycopg
        from psycopg.types.json import Jsonb

        return "psycopg", psycopg, Jsonb
    except ImportError:
        pass

    try:
        import psycopg2
        from psycopg2.extras import Json

        return "psycopg2", psycopg2, Json
    except ImportError:
        raise SystemExit(
            "Missing PostgreSQL driver. Install one of:\n"
            "  python -m pip install psycopg[binary]\n"
            "  python -m pip install psycopg2-binary"
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


def load_catalog() -> list[dict[str, Any]]:
    content = CATALOG_PATH.read_text(encoding="utf-8")
    match = re.search(
        r"const GENERATED_WRANGLE_CATALOG = (\[[\s\S]*?\]);\s*export default",
        content,
    )
    if not match:
        raise RuntimeError(f"Could not parse catalog JSON from {CATALOG_PATH}")
    return json.loads(match.group(1))


def load_mappings() -> dict[str, dict[str, Any]]:
    return json.loads(MAPPINGS_PATH.read_text(encoding="utf-8"))


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "wrangle"


def normalized_parameters(entry: dict[str, Any]) -> list[dict[str, Any]]:
    defaults = entry.get("defaults", {})
    parameters = []
    for index, field in enumerate(entry.get("fields", []), start=1):
        options = field.get("options")
        parameters.append(
            {
                "name": field.get("key"),
                "label": field.get("label"),
                "ui_type": field.get("type"),
                "required": bool(field.get("required")),
                "description": field.get("helper"),
                "default": defaults.get(field.get("key")),
                "enum_values": [option.get("value") for option in options] if options else None,
                "placeholder": field.get("placeholder"),
                "sort_order": index,
            }
        )
    return parameters


def infer_auth_flags(entry: dict[str, Any]) -> dict[str, bool]:
    key = entry["type"]
    description = (entry.get("description") or "").lower()
    field_names = {field.get("key") for field in entry.get("fields", [])}
    category = (entry.get("category") or "").lower()

    return {
        "is_ai": category == "ai" or key.endswith(".ai") or "ai" in key or "openai" in description,
        "requires_account": "wrangleworks account" in description,
        "requires_subscription": "subscription" in description,
        "requires_external_api_key": "api_key" in field_names or "api key" in description,
    }


def build_row(entry: dict[str, Any], mapping: dict[str, Any]) -> dict[str, Any]:
    wrangle_key = entry["type"]
    docs = mapping.get("docs") or []
    docs_path = docs[0] if docs else None
    category = entry.get("category") or ""
    subtype = wrangle_key.split(".", 1)[1] if "." in wrangle_key else None
    flags = infer_auth_flags(entry)

    return {
        "id": mapping["modelId"],
        "name": entry.get("label") or wrangle_key,
        "type": category.lower(),
        "subtype": subtype,
        "variant": "stock",
        "status": "active",
        "path": docs_path,
        "purpose": entry.get("description"),
        "tags": [category, *wrangle_key.split(".")],
        "notes": None,
        "settings": {
            "color": entry.get("color"),
            "source_catalog": str(CATALOG_PATH.relative_to(ROOT)),
            "source_mapping": str(MAPPINGS_PATH.relative_to(ROOT)),
            "docs": docs,
        },
        "wrangle_key": wrangle_key,
        "slug": slugify(wrangle_key),
        "description": entry.get("description"),
        "docs_path": docs_path,
        "docs_url": f"/python/recipes/wrangles/{Path(docs_path).stem}" if docs_path else None,
        "parameters": normalized_parameters(entry),
        "defaults": entry.get("defaults", {}),
        "examples": [],
        "is_stock": True,
        "is_recipe_wrangle": True,
        **flags,
    }


def ensure_columns(cursor, table_sql: str) -> None:
    statements = [
        "add column if not exists id uuid primary key",
        "add column if not exists name text not null",
        "add column if not exists type text not null",
        "add column if not exists subtype text",
        "add column if not exists variant text",
        "add column if not exists status text not null default 'active'",
        "add column if not exists path text",
        "add column if not exists purpose text",
        "add column if not exists tags jsonb not null default '[]'::jsonb",
        "add column if not exists notes text",
        "add column if not exists settings jsonb not null default '{}'::jsonb",
        "add column if not exists wrangle_key text unique",
        "add column if not exists slug text unique",
        "add column if not exists description text",
        "add column if not exists docs_path text",
        "add column if not exists docs_url text",
        "add column if not exists parameters jsonb not null default '[]'::jsonb",
        "add column if not exists defaults jsonb not null default '{}'::jsonb",
        "add column if not exists examples jsonb not null default '[]'::jsonb",
        "add column if not exists is_stock boolean not null default true",
        "add column if not exists is_recipe_wrangle boolean not null default true",
        "add column if not exists is_ai boolean not null default false",
        "add column if not exists requires_account boolean not null default false",
        "add column if not exists requires_subscription boolean not null default false",
        "add column if not exists requires_external_api_key boolean not null default false",
        "add column if not exists date_created timestamptz not null default now()",
        "add column if not exists date_modified timestamptz not null default now()",
    ]
    for statement in statements:
        cursor.execute(f"alter table {table_sql} {statement}")


def upsert_rows(cursor, table_sql: str, rows: list[dict[str, Any]], json_wrapper) -> None:
    columns = [
        "id",
        "name",
        "type",
        "subtype",
        "variant",
        "status",
        "path",
        "purpose",
        "tags",
        "notes",
        "settings",
        "wrangle_key",
        "slug",
        "description",
        "docs_path",
        "docs_url",
        "parameters",
        "defaults",
        "examples",
        "is_stock",
        "is_recipe_wrangle",
        "is_ai",
        "requires_account",
        "requires_subscription",
        "requires_external_api_key",
    ]
    json_columns = {"tags", "settings", "parameters", "defaults", "examples"}
    placeholders = ", ".join(["%s"] * len(columns))
    column_sql = ", ".join(quote_ident(column) for column in columns)
    update_sql = ", ".join(
        f"{quote_ident(column)} = excluded.{quote_ident(column)}"
        for column in columns
        if column != "id"
    )

    sql = f"""
        insert into {table_sql} ({column_sql})
        values ({placeholders})
        on conflict (id) do update set
          {update_sql},
          date_modified = now()
    """

    for row in rows:
        values = [
            json_wrapper(row[column]) if column in json_columns else row[column]
            for column in columns
        ]
        cursor.execute(sql, values)


def main() -> int:
    parser = argparse.ArgumentParser(description="Seed stock wrangles into public.wranglesio_content.")
    parser.add_argument("--table", default=DEFAULT_TABLE, help=f"Target table. Default: {DEFAULT_TABLE}")
    parser.add_argument(
        "--ensure-columns",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Add expected columns when missing. Default: true",
    )
    parser.add_argument("--dry-run", action="store_true", help="Parse and print rows without writing.")
    args = parser.parse_args()

    table_sql = parse_table_name(args.table)
    catalog = load_catalog()
    mappings = load_mappings()

    rows = []
    missing = []
    for entry in catalog:
        mapping = mappings.get(entry["type"])
        if not mapping or not mapping.get("modelId"):
            missing.append(entry["type"])
            continue
        rows.append(build_row(entry, mapping))

    if missing:
        raise SystemExit(f"Missing modelId mappings for: {', '.join(missing)}")

    if args.dry_run:
        print(json.dumps({"table": args.table, "row_count": len(rows), "first_row": rows[0]}, indent=2))
        return 0

    database_url = os.getenv("DATABASE_URL") or os.getenv("DATABSE_URL")
    if not database_url:
        raise SystemExit("Set DATABASE_URL before running this script.")

    driver_name, driver, json_wrapper = load_db_driver()
    connection = driver.connect(database_url)
    try:
        with connection:
            with connection.cursor() as cursor:
                if args.ensure_columns:
                    ensure_columns(cursor, table_sql)
                upsert_rows(cursor, table_sql, rows, json_wrapper)
    finally:
        connection.close()

    print(f"Seeded {len(rows)} wrangles into {args.table} using {driver_name}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
