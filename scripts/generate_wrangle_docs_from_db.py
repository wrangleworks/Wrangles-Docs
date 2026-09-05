#!/usr/bin/env python3
"""Generate structured wrangle docs from public.wranglesio_content.

Connection:
  export DATABASE_URL='postgresql://user:password@host:5432/database'

Output:
  wrangles-docs/wrangle-docs/index.md
  wrangles-docs/wrangle-docs/<type>/<type>.md
  wrangles-docs/wrangle-docs/<type>/_sources/<wrangle>.md

Each category page imports separate wrangle source Markdown files from its _sources folder.

The script does not modify the existing docs/python or docs/excel pages.
It overwrites generated files in the output folder, but leaves
wrangle_template.md untouched.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_TABLE = "public.wranglesio_content"
DEFAULT_OUTPUT_DIR = ROOT / "wrangles-docs/wrangle-docs"
DEFAULT_TEMPLATE = DEFAULT_OUTPUT_DIR / "wrangle_template.md"

CATEGORY_DESCRIPTIONS = {
    "ai": "AI wrangles use trained models or external AI providers to classify, extract, generate, or transform data.",
    "compare": "Compare wrangles compare values, lists, vectors, or text and return useful similarities or differences.",
    "compute": "Compute wrangles calculate values using SQL, Python, math, search scoring, or conditional logic.",
    "convert": "Convert wrangles change data formats, representations, and data types.",
    "create": "Create wrangles add new data such as generated IDs, bins, indexes, hashes, embeddings, or templated text.",
    "date": "Date wrangles work with date and time values.",
    "extract": "Extract wrangles identify and extract structured information from unstructured or semi-structured input.",
    "format": "Format wrangles clean, standardize, translate, pad, trim, or otherwise reformat existing values.",
    "lookup": "Lookup wrangles retrieve values from saved lookup wrangles.",
    "merge": "Merge wrangles combine multiple columns, lists, dictionaries, or values into a single output.",
    "search": "Search wrangles find links and retrieve targeted content from external web pages.",
    "select": "Select wrangles choose rows, columns, elements, substrings, or values from existing data.",
    "split": "Split wrangles break strings, lists, dictionaries, or rows into smaller pieces.",
    "transform": "Transform wrangles copy, rename, reindex, or transpose data.",
    "utility": "Utility wrangles support logging and other workflow-level actions.",
}

CATEGORY_ORDER = [
    "convert",
    "merge",
    "split",
    "select",
    "format",
    "create",
    "extract",
    "compare",
    "compute",
    "search",
    "ai",
    "lookup",
    "transform",
    "utility",
    "date",
]


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


def as_json(value: Any, fallback: Any) -> Any:
    if value is None:
        return fallback
    if isinstance(value, str):
        try:
            return json.loads(value)
        except json.JSONDecodeError:
            return fallback
    return value


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "wrangle"


def title_case(value: str | None) -> str:
    if not value:
        return ""
    return re.sub(r"[_-]+", " ", value).title()


def escape_md(value: Any) -> str:
    text = "" if value is None else str(value)
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("{", "\\{")
        .replace("}", "\\}")
        .replace("|", "\\|")
        .replace("\n", "<br />")
    )


def escape_mdx_text(value: Any) -> str:
    text = "" if value is None else str(value)
    return text.replace("<", "&lt;").replace(">", "&gt;").replace("{", "\\{").replace("}", "\\}")


def escape_frontmatter(value: Any) -> str:
    text = "" if value is None else str(value)
    return text.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ")


def markdown_table(headers: list[str], rows: list[list[Any]]) -> str:
    if not rows:
        return "_None._"
    header = "| " + " | ".join(headers) + " |"
    divider = "| " + " | ".join(["---"] * len(headers)) + " |"
    body = ["| " + " | ".join(escape_md(cell) for cell in row) + " |" for row in rows]
    return "\n".join([header, divider, *body])


def json_block(value: Any) -> str:
    return json.dumps(value, indent=2, ensure_ascii=False)


def load_rows(table: str) -> list[dict[str, Any]]:
    database_url = os.getenv("DATABASE_URL") or os.getenv("DATABSE_URL")
    if not database_url:
        raise SystemExit("Set DATABASE_URL before running this script.")

    table_sql = parse_table_name(table)
    _, driver = load_db_driver()
    connection = driver.connect(database_url)
    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    f"""
                    select
                      id,
                      name,
                      type,
                      subtype,
                      variant,
                      status,
                      path,
                      purpose,
                      tags,
                      notes,
                      settings,
                      wrangle_key,
                      slug,
                      description,
                      docs_path,
                      docs_url,
                      parameters,
                      defaults,
                      examples,
                      is_stock,
                      is_recipe_wrangle,
                      is_ai,
                      requires_account,
                      requires_subscription,
                      requires_external_api_key
                    from {table_sql}
                    where coalesce(is_stock, true) = true
                      and coalesce(is_recipe_wrangle, true) = true
                    order by type, name, wrangle_key
                    """
                )
                columns = [column[0] for column in cursor.description]
                rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
    finally:
        connection.close()

    for row in rows:
        row["id"] = str(row["id"])
        row["tags"] = as_json(row.get("tags"), [])
        row["settings"] = as_json(row.get("settings"), {})
        row["parameters"] = as_json(row.get("parameters"), [])
        row["defaults"] = as_json(row.get("defaults"), {})
        row["examples"] = as_json(row.get("examples"), [])
    return rows


def parameter_table(parameters: list[dict[str, Any]]) -> str:
    rows = []
    for parameter in parameters:
        enum_values = parameter.get("enum_values")
        if isinstance(enum_values, list):
            enum_values = ", ".join(str(item) for item in enum_values)
        rows.append(
            [
                parameter.get("name"),
                parameter.get("label"),
                parameter.get("ui_type"),
                "Yes" if parameter.get("required") else "No",
                parameter.get("description"),
                enum_values or "",
                json.dumps(parameter.get("default"), ensure_ascii=False),
            ]
        )
    return markdown_table(
        ["Parameter", "Label", "UI Type", "Required", "Description", "Allowed Values", "Default"],
        rows,
    )


def sample_table(sample: Any) -> str:
    if not isinstance(sample, list) or not sample:
        return "_No sample available._"
    if not all(isinstance(row, dict) for row in sample):
        return "```json\n" + json_block(sample) + "\n```"

    headers = []
    for row in sample:
        for key in row:
            if key not in headers:
                headers.append(key)
    rows = [[row.get(header, "") for header in headers] for row in sample]
    return markdown_table(headers, rows)


def render_examples(examples: list[dict[str, Any]]) -> str:
    if not examples:
        return "_No examples are currently available._"

    rendered = []
    for index, example in enumerate(examples, start=1):
        title = example.get("title") or f"Example {index}"
        recipe = example.get("recipe_yaml") or ""
        rendered.append(f"#### {title}\n")
        rendered.append("##### Recipe\n")
        rendered.append("```yaml\n" + recipe.strip() + "\n```\n")
        rendered.append("##### Input Sample\n")
        rendered.append(sample_table(example.get("input_sample")) + "\n")
        rendered.append("##### Output Sample\n")
        rendered.append(sample_table(example.get("output_sample")) + "\n")
        if example.get("source"):
            rendered.append(f"_Source: `{example['source']}`_\n")
    return "\n".join(rendered).strip()


def metadata_table(row: dict[str, Any]) -> str:
    return markdown_table(
        ["Field", "Value"],
        [
            ["ID", row.get("id")],
            ["Wrangle Key", f"`{row.get('wrangle_key')}`"],
            ["Type", row.get("type")],
            ["Subtype", row.get("subtype") or ""],
            ["Variant", row.get("variant")],
            ["Status", row.get("status")],
            ["Tags", ", ".join(row.get("tags") or [])],
        ],
    )


def access_table(row: dict[str, Any]) -> str:
    return markdown_table(
        ["Requirement", "Value"],
        [
            ["AI-backed", "Yes" if row.get("is_ai") else "No"],
            ["Requires WrangleWorks account", "Yes" if row.get("requires_account") else "No"],
            ["Requires subscription", "Yes" if row.get("requires_subscription") else "No"],
            ["Requires external API key", "Yes" if row.get("requires_external_api_key") else "No"],
        ],
    )


def source_table(row: dict[str, Any]) -> str:
    settings = row.get("settings") or {}
    return markdown_table(
        ["Field", "Value"],
        [
            ["Docs Path", row.get("docs_path") or ""],
            ["Docs URL", row.get("docs_url") or ""],
            ["Legacy Path", row.get("path") or ""],
            ["Catalog Source", settings.get("source_catalog", "")],
            ["Mapping Source", settings.get("source_mapping", "")],
        ],
    )




def strip_frontmatter(markdown: str) -> str:
    if not markdown.startswith("---\n"):
        return markdown
    end = markdown.find("\n---", 4)
    if end == -1:
        return markdown
    return markdown[end + len("\n---") :].lstrip()


def component_name(slug: str, used: set[str]) -> str:
    name = "".join(part.capitalize() for part in re.split(r"[^a-zA-Z0-9]+", slug) if part)
    if not name or name[0].isdigit():
        name = f"Wrangle{name}"
    base = name
    index = 2
    while name in used:
        name = f"{base}{index}"
        index += 1
    used.add(name)
    return name


def render_wrangle_source(row: dict[str, Any], template: str) -> str:
    description = row.get("description") or row.get("purpose") or ""
    section_template = strip_frontmatter(template)
    replacements = {
        "TITLE": row.get("name") or row.get("wrangle_key"),
        "SLUG": "",
        "DESCRIPTION": escape_frontmatter(description),
        "WRANGLE_KEY": row.get("wrangle_key") or "",
        "TYPE": row.get("type") or "",
        "SUBTYPE": row.get("subtype") or "",
        "VARIANT": row.get("variant") or "",
        "STATUS": row.get("status") or "",
        "OVERVIEW": escape_mdx_text(description) if description else "_No description is currently available._",
        "METADATA_TABLE": metadata_table(row),
        "ACCESS_TABLE": access_table(row),
        "PARAMETERS_TABLE": parameter_table(row.get("parameters") or []),
        "DEFAULTS_JSON": json_block(row.get("defaults") or {}),
        "EXAMPLES": render_examples(row.get("examples") or []),
        "SOURCE_TABLE": source_table(row),
    }

    rendered = section_template
    for key, value in replacements.items():
        rendered = rendered.replace("{{" + key + "}}", str(value))
    return rendered.strip() + "\n"


def render_category_page(category: str, source_entries: list[dict[str, str]]) -> str:
    category_slug = slugify(category)
    title = f"{title_case(category)} Wrangles"
    description = CATEGORY_DESCRIPTIONS.get(category, f"{title_case(category)} wrangles.")

    used_components: set[str] = set()
    imports = []
    links = []
    renders = []
    for entry in source_entries:
        component = component_name(entry["source_slug"], used_components)
        imports.append(f"import {component} from './_sources/{entry['filename']}';")
        suffix = f" - `{entry['wrangle_key']}`" if entry.get("wrangle_key") else ""
        links.append(f"- [{entry['title']}](#{entry['anchor']}){suffix}")
        renders.append(f"<{component} />")

    metadata = markdown_table(
        ["Field", "Value"],
        [
            ["Type", category],
            ["Wrangle Count", len(source_entries)],
            ["Generated Source", "`public.wranglesio_content`"],
            ["Section Sources", f"`wrangle-docs/{category_slug}/_sources/*.md`"],
        ],
    )

    return f'''---
title: "{escape_frontmatter(title)}"
slug: /{category_slug}
description: "{escape_frontmatter(description)}"
wrangle_type: "{escape_frontmatter(category)}"
wrangle_count: {len(source_entries)}
---

{chr(10).join(imports)}

# {title}

{escape_mdx_text(description)}

## Metadata

{metadata}

## Wrangles

{chr(10).join(links)}

---

{f'{chr(10)}{chr(10)}---{chr(10)}{chr(10)}'.join(renders)}
'''


def render_index_page(grouped: dict[str, list[dict[str, Any]]], category_keys: list[str]) -> str:
    rows = []
    for category in category_keys:
        category_slug = slugify(category)
        count = len(grouped[category])
        description = CATEGORY_DESCRIPTIONS.get(category, f"{title_case(category)} wrangles.")
        rows.append([f"[{title_case(category)}](/wrangle/{category_slug})", count, description])

    return f'''---
title: "Wrangles"
slug: /
description: "Generated reference pages for recipe wrangles."
---

# Wrangles

This section is generated from `public.wranglesio_content`. Each category page imports separate source Markdown files from its `_sources` folder, so individual wrangle content stays split while the public docs show one page per category.

## Categories

{markdown_table(["Category", "Wrangles", "Description"], rows)}
'''


def remove_old_generated_pages(output_dir: Path, keep_paths: set[Path]) -> None:
    for path in output_dir.glob("*/*.md"):
        if path.resolve() not in keep_paths:
            path.unlink()


def write_docs(rows: list[dict[str, Any]], output_dir: Path, template_path: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    if not template_path.exists():
        raise SystemExit(f"Template file does not exist: {template_path}")

    template = template_path.read_text(encoding="utf-8")
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for row in rows:
        grouped[row.get("type") or "uncategorized"].append(row)

    category_keys = sorted(
        grouped,
        key=lambda key: (CATEGORY_ORDER.index(key) if key in CATEGORY_ORDER else 999, key),
    )

    keep_paths: set[Path] = {template_path.resolve()}
    index_path = output_dir / "index.md"
    index_path.write_text(render_index_page(grouped, category_keys), encoding="utf-8")
    keep_paths.add(index_path.resolve())

    for category in category_keys:
        category_slug = slugify(category)
        category_dir = output_dir / category_slug
        sources_dir = category_dir / "_sources"
        category_dir.mkdir(parents=True, exist_ok=True)
        sources_dir.mkdir(parents=True, exist_ok=True)

        for old_source in sources_dir.glob("*.md"):
            old_source.unlink()

        category_rows = sorted(grouped[category], key=lambda row: row.get("name") or "")
        source_entries = []
        for row in category_rows:
            source_slug = slugify(row.get("subtype") or row.get("wrangle_key") or row.get("name") or "wrangle")
            filename = f"{source_slug}.md"
            source_path = sources_dir / filename
            source_path.write_text(render_wrangle_source(row, template), encoding="utf-8")
            source_entries.append(
                {
                    "title": row.get("name") or row.get("wrangle_key") or source_slug,
                    "wrangle_key": row.get("wrangle_key") or "",
                    "source_slug": source_slug,
                    "filename": filename,
                    "anchor": slugify(row.get("name") or row.get("wrangle_key") or source_slug),
                }
            )

        category_path = category_dir / f"{category_slug}.md"
        category_path.write_text(render_category_page(category, source_entries), encoding="utf-8")
        keep_paths.add(category_path.resolve())

    remove_old_generated_pages(output_dir, keep_paths)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate structured wrangle docs from the content DB.")
    parser.add_argument("--table", default=DEFAULT_TABLE, help=f"Source table. Default: {DEFAULT_TABLE}")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR), help="Output docs directory.")
    parser.add_argument("--template", default=str(DEFAULT_TEMPLATE), help="Wrangle source section template path.")
    parser.add_argument("--dry-run", action="store_true", help="Load rows and print what would be generated.")
    args = parser.parse_args()

    rows = load_rows(args.table)
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for row in rows:
        grouped[row.get("type") or "uncategorized"].append(row)

    if args.dry_run:
        print(
            json.dumps(
                {
                    "row_count": len(rows),
                    "category_count": len(grouped),
                    "categories": {key: len(value) for key, value in sorted(grouped.items())},
                    "output_dir": args.output_dir,
                    "template": args.template,
                    "output_model": "one /wrangle index page, one page per category, and separate _sources/*.md section files",
                },
                indent=2,
            )
        )
        return 0

    write_docs(rows, Path(args.output_dir), Path(args.template))
    print(f"Generated {len(grouped)} category pages and {len(rows)} wrangle source files in {args.output_dir}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
