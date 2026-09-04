#!/usr/bin/env python3
"""Extract RecipePlayground examples from docs and update wrangle examples.

Connection:
  export DATABASE_URL='postgresql://user:password@host:5432/database'

This script updates only the examples column. It does not modify the catalog
metadata populated by seed_wranglesio_content.py.
"""

from __future__ import annotations

import argparse
import ast
import html
import json
import os
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
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


def load_mappings() -> dict[str, dict[str, Any]]:
    return json.loads(MAPPINGS_PATH.read_text(encoding="utf-8"))


def extract_wrangle_comments(markdown: str) -> list[tuple[int, str]]:
    comments = []
    pattern = re.compile(r"<!--\s*wrangle:\s*(\{.*?\})\s*-->", re.DOTALL)
    for match in pattern.finditer(markdown):
        try:
            data = json.loads(match.group(1))
        except json.JSONDecodeError:
            continue
        wrangle_key = data.get("type")
        if wrangle_key:
            comments.append((match.start(), wrangle_key))
    return comments


def find_current_wrangle(comments: list[tuple[int, str]], position: int) -> str | None:
    current = None
    for comment_position, wrangle_key in comments:
        if comment_position > position:
            break
        current = wrangle_key
    return current


def find_title(markdown: str, position: int) -> str:
    before = markdown[:position]
    headings = re.findall(r"^#{1,6}\s+(.+?)\s*$", before, flags=re.MULTILINE)
    if not headings:
        return "Example"
    title = headings[-1]
    title = title.replace("\\*", "*").replace("\\{", "{").replace("\\}", "}")
    return re.sub(r"\s+", " ", title).strip()


def find_recipe_prop(block: str) -> str | None:
    expression = find_jsx_prop_expression(block, "recipe")
    return parse_jsx_string_expression(expression)


def find_jsx_prop_expression(block: str, prop_name: str) -> str | None:
    marker = f"{prop_name}="
    start = block.find(marker)
    if start == -1:
        return None

    cursor = start + len(marker)
    while cursor < len(block) and block[cursor].isspace():
        cursor += 1

    if cursor >= len(block) or block[cursor] != "{":
        return None

    cursor += 1
    expression_start = cursor
    depth = 1
    quote = None
    escaped = False

    while cursor < len(block):
        char = block[cursor]
        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = None
        elif char in {'"', "'", "`"}:
            quote = char
        elif char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return block[expression_start:cursor].strip()
        cursor += 1

    return None


def parse_jsx_string_expression(expression: str | None) -> str | None:
    if expression is None:
        return None

    expression = expression.strip()
    if not expression or expression[0] not in {'"', "'", "`"}:
        return None

    quote = expression[0]
    cursor = 1
    raw = []
    escaped = False

    while cursor < len(expression):
        char = expression[cursor]
        if escaped:
            raw.append("\\" + char if quote in {"'", '"'} else char)
            escaped = False
        elif char == "\\":
            escaped = True
        elif char == quote:
            raw_text = "".join(raw)
            if quote == '"':
                try:
                    return json.loads(f'"{raw_text}"')
                except json.JSONDecodeError:
                    return raw_text.replace("\\n", "\n").replace("\\t", "\t")
            if quote == "'":
                return raw_text.replace("\\n", "\n").replace("\\t", "\t").replace("\\'", "'")
            return raw_text
        else:
            raw.append(char)
        cursor += 1

    return None


def parse_jsx_array_expression(expression: str | None) -> Any:
    if expression is None:
        return None
    try:
        return ast.literal_eval(expression)
    except (SyntaxError, ValueError):
        return None


def rows_from_columns(columns: Any, rows: Any) -> list[dict[str, Any]] | None:
    if not isinstance(columns, list) or not isinstance(rows, list):
        return None
    output = []
    for row in rows:
        if not isinstance(row, list):
            return None
        output.append({str(column): row[index] if index < len(row) else None for index, column in enumerate(columns)})
    return output


def strip_cell(value: str) -> str:
    value = html.unescape(value)
    value = re.sub(r"<[^>]+>", "", value)
    value = value.replace("\\{", "{").replace("\\}", "}")
    value = value.strip()
    if len(value) >= 2 and value[0] == "`" and value[-1] == "`":
        value = value[1:-1].strip()
    return re.sub(r"\s+", " ", value)


def parse_markdown_table(table_text: str) -> list[dict[str, str]] | None:
    lines = [line.strip() for line in table_text.splitlines() if line.strip().startswith("|")]
    if len(lines) < 2:
        return None

    headers = [strip_cell(cell) for cell in lines[0].strip("|").split("|")]
    separator = [cell.strip() for cell in lines[1].strip("|").split("|")]
    if not all(re.fullmatch(r":?-{2,}:?", cell) for cell in separator):
        return None

    rows = []
    for line in lines[2:]:
        cells = [strip_cell(cell) for cell in line.strip("|").split("|")]
        rows.append({header: cells[index] if index < len(cells) else "" for index, header in enumerate(headers)})
    return rows


def tables_from_example_source(source: str | None) -> list[list[dict[str, str]]]:
    if not source:
        return []

    source = html.unescape(source)
    source = source.replace("\\n", "\n").replace("\\t", "\t")
    source = re.sub(r"</t[dh]>\s*<t[dh]>", "\n\n", source, flags=re.IGNORECASE)
    source = re.sub(r"<br\s*/?>", "\n", source, flags=re.IGNORECASE)
    source = re.sub(r"<[^>]+>", "\n", source)

    tables = []
    current = []
    for line in source.splitlines():
        if line.strip().startswith("|"):
            current.append(line)
        elif current:
            table = parse_markdown_table("\n".join(current))
            if table:
                tables.append(table)
            current = []
    if current:
        table = parse_markdown_table("\n".join(current))
        if table:
            tables.append(table)
    return tables


def extract_samples(block: str) -> tuple[Any, Any]:
    input_columns = parse_jsx_array_expression(find_jsx_prop_expression(block, "inputColumns"))
    input_rows = parse_jsx_array_expression(find_jsx_prop_expression(block, "inputRows"))
    output_columns = parse_jsx_array_expression(find_jsx_prop_expression(block, "outputColumns"))
    output_rows = parse_jsx_array_expression(find_jsx_prop_expression(block, "outputRows"))

    input_sample = rows_from_columns(input_columns, input_rows)
    output_sample = rows_from_columns(output_columns, output_rows)
    if input_sample is not None or output_sample is not None:
        return input_sample, output_sample

    example_source = parse_jsx_string_expression(find_jsx_prop_expression(block, "exampleSource"))
    tables = tables_from_example_source(example_source)
    if len(tables) >= 2:
        return tables[0], tables[-1]
    if len(tables) == 1:
        return None, tables[0]
    return None, None


def extract_recipe_playgrounds(markdown: str) -> list[tuple[int, str, Any, Any]]:
    blocks = []
    pattern = re.compile(r"<RecipePlayground[\s\S]*?\n\s*/>", re.MULTILINE)
    for match in pattern.finditer(markdown):
        block = match.group(0)
        recipe = find_recipe_prop(block)
        if recipe:
            input_sample, output_sample = extract_samples(block)
            blocks.append((match.start(), recipe.strip(), input_sample, output_sample))
    return blocks


def normalize_recipe(recipe: str) -> str:
    recipe = recipe.replace("\r\n", "\n").replace("\r", "\n")
    lines = recipe.split("\n")
    non_empty = [line for line in lines if line.strip()]
    if not non_empty:
        return recipe.strip()
    min_indent = min(len(line) - len(line.lstrip(" ")) for line in non_empty)
    if min_indent:
        lines = [line[min_indent:] if len(line) >= min_indent else line for line in lines]
    return "\n".join(lines).strip()


def collect_examples() -> dict[str, list[dict[str, Any]]]:
    mappings = load_mappings()
    valid_keys = set(mappings)
    docs_paths = sorted(
        {
            doc_path
            for mapping in mappings.values()
            for doc_path in mapping.get("docs", [])
            if doc_path
        }
    )

    examples_by_key: dict[str, list[dict[str, Any]]] = {key: [] for key in valid_keys}
    seen = set()

    for doc_path in docs_paths:
        full_path = ROOT / "wrangles-docs" / doc_path
        if not full_path.exists():
            continue

        markdown = full_path.read_text(encoding="utf-8")
        comments = extract_wrangle_comments(markdown)
        playgrounds = extract_recipe_playgrounds(markdown)

        for position, recipe, input_sample, output_sample in playgrounds:
            wrangle_key = find_current_wrangle(comments, position)
            if wrangle_key not in valid_keys:
                continue

            normalized = normalize_recipe(recipe)
            dedupe_key = (wrangle_key, doc_path, normalized)
            if dedupe_key in seen:
                continue
            seen.add(dedupe_key)

            examples_by_key[wrangle_key].append(
                {
                    "title": find_title(markdown, position),
                    "recipe_yaml": normalized,
                    "source": doc_path,
                    "input_sample": input_sample,
                    "output_sample": output_sample,
                }
            )

    return {key: examples for key, examples in examples_by_key.items() if examples}


def update_examples(cursor, table_sql: str, examples_by_key: dict[str, list[dict[str, Any]]], json_wrapper) -> None:
    sql = f"""
        update {table_sql}
        set examples = %s,
            date_modified = now()
        where wrangle_key = %s
    """
    for wrangle_key, examples in examples_by_key.items():
        cursor.execute(sql, (json_wrapper(examples), wrangle_key))


def main() -> int:
    parser = argparse.ArgumentParser(description="Seed wrangle examples from RecipePlayground docs.")
    parser.add_argument("--table", default=DEFAULT_TABLE, help=f"Target table. Default: {DEFAULT_TABLE}")
    parser.add_argument("--dry-run", action="store_true", help="Parse and print examples without writing.")
    args = parser.parse_args()

    table_sql = parse_table_name(args.table)
    examples_by_key = collect_examples()
    total_examples = sum(len(examples) for examples in examples_by_key.values())

    if args.dry_run:
        preview_key = next(iter(examples_by_key), None)
        print(
            json.dumps(
                {
                    "table": args.table,
                    "wrangle_count": len(examples_by_key),
                    "example_count": total_examples,
                    "first_key": preview_key,
                    "first_examples": examples_by_key.get(preview_key, [])[:3],
                },
                indent=2,
            )
        )
        return 0

    database_url = os.getenv("DATABASE_URL") or os.getenv("DATABSE_URL")
    if not database_url:
        raise SystemExit("Set DATABASE_URL before running this script.")

    driver_name, driver, json_wrapper = load_db_driver()
    connection = driver.connect(database_url)
    try:
        with connection:
            with connection.cursor() as cursor:
                update_examples(cursor, table_sql, examples_by_key, json_wrapper)
    finally:
        connection.close()

    print(
        f"Updated examples for {len(examples_by_key)} wrangles "
        f"({total_examples} examples) in {args.table} using {driver_name}."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
