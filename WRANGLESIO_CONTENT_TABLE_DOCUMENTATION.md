# Wrangles.io Content Table Documentation

This document describes the `public.wranglesio_content` table that stores the stock recipe wrangle catalog used by Wrangles.io.

The table is intentionally a single-table catalog. It keeps common fields as normal columns and stores variable wrangle-specific structures, such as parameters, defaults, and examples, as `jsonb`.

## Purpose

`public.wranglesio_content` is meant to hold the official stock recipe wrangles, currently populated from the Wrangles.io Docusaurus content and generated wrangle catalog.

It is separate from the older mixed `models` table. The old table contains DIY wrangles, bespoke wrangles, stock wrangles, deleted records, and user-created Excel recipes. This new table should only represent stock content records that the product/site can use as a clean source.

Current seed source:

```text
wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js
wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json
wrangles-docs/docs/python/recipes/wrangles/*.md
wrangles-docs/docs/excel/*.md
```

## Naming Model

The table keeps some legacy column names but changes their meaning.

The important mapping is:

```text
old models.type     -> new variant
old models.purpose  -> new type
old models.variant  -> new subtype
```

For this stock catalog:

```text
variant = stock
type    = broad functional category, such as convert, extract, format
subtype = specific wrangle action, such as case, regex, attributes
```

Example:

```text
wrangle_key = convert.case
name        = Case
type        = convert
subtype     = case
variant     = stock
```

For standalone wrangles that do not use a dotted key, `subtype` may be null.

Example:

```text
wrangle_key = classify
name        = Classify
type        = ai
subtype     = null
variant     = stock
```

## Table Columns

### `id`

Type:

```sql
uuid
```

Primary identifier for the row.

For stock wrangles, this is currently populated from `wrangleMappings.json` using the `modelId` value.

Example:

```text
12ff4120-3613-4801-8653-99c793477fbc
```

Important distinction:

This `id` identifies the stock catalog row. Some wrangles also have a runtime parameter named `model_id` inside `parameters`. That runtime `model_id` refers to a DIY, bespoke, lookup, classify, standardize, or extract model used when the recipe runs. It is not the same concept as this table row `id`.

### `name`

Type:

```sql
text
```

Human-readable display name.

Examples:

```text
Case
Attributes
Highest Confidence
Date Calculator
```

This value is suitable for display in the site UI, search results, or catalog cards.

### `type`

Type:

```sql
text
```

Broad functional category for the wrangle.

This is the new meaning of the old `purpose` concept.

Examples:

```text
convert
extract
format
select
merge
split
create
compare
compute
ai
lookup
transform
utility
date
```

This should be used for category filters and grouping.

### `subtype`

Type:

```sql
text
```

Specific wrangle action within the broad `type`.

For dotted wrangle keys, this is usually the part after the first dot.

Examples:

```text
case
data_type
fraction_to_decimal
attributes
regex
highest_confidence
score_search_results
```

For standalone wrangles like `classify`, `lookup`, `round`, or `sql`, this can be null unless we later decide to set it equal to `wrangle_key`.

### `variant`

Type:

```sql
text
```

Catalog ownership/type.

For this table, the expected value is:

```text
stock
```

The column exists because the old `models.type` mixed values like `diy`, `bespoke`, and stock-like records. In this new table, `variant` preserves that idea while keeping the records clean.

Potential future values:

```text
stock
deprecated_stock
internal
preview
```

Avoid putting user-created DIY records in this table.

### `status`

Type:

```sql
text
```

Lifecycle state of the content record.

Current seeded value:

```text
active
```

Suggested values:

```text
active
draft
hidden
deprecated
removed
```

Use `deprecated` instead of deleting rows when old content may still be referenced by recipes or docs.

### `path`

Type:

```sql
text
```

Primary source document path in the repo.

Example:

```text
docs/python/recipes/wrangles/convert.md
docs/python/recipes/wrangles/extract.md
docs/excel/standardize.md
```

This is currently the same as `docs_path` for most rows. It is retained mostly for compatibility with the old table shape.

### `purpose`

Type:

```sql
text
```

Short human-readable purpose or summary.

Example:

```text
Change the case of the input.
Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks Account.
```

This is currently populated from the generated catalog description.

`purpose` and `description` currently contain the same value in most rows. Over time:

```text
purpose     = short one-sentence purpose
description = longer detailed description
```

### `batch_size`

Type:

```sql
integer
```

Optional batch size metadata.

This is retained from the old table shape. It is usually null for stock catalog records.

If used later, it should represent a suggested/default batch size for execution, not a UI grouping value.

### `created_by`

Type:

```sql
uuid
```

Optional user ID for the creator.

For seeded stock catalog rows, this is usually null.

If populated later, it should refer to the internal user or service account that created the content record.

### `date_created`

Type:

```sql
timestamptz
```

Creation timestamp for the row.

The seed script leaves the table default in place, usually:

```sql
now()
```

### `modified_by`

Type:

```sql
uuid
```

Optional user ID for the last editor.

For automated syncs, this can remain null unless there is a service account ID.

### `date_modified`

Type:

```sql
timestamptz
```

Last modification timestamp.

The seed scripts update this whenever they upsert metadata or examples.

### `tags`

Type:

```sql
jsonb
```

Array of tags for search and filtering.

Current shape:

```json
["Convert", "convert", "case"]
```

For dotted wrangle keys, tags usually include:

```text
catalog category label
wrangle key prefix
wrangle key suffix
```

Example:

```json
["Extract", "extract", "attributes"]
```

For standalone wrangles:

```json
["AI", "classify"]
```

Note:

This is `jsonb`, not `text[]`, because the original table used JSON-like fields and the seed scripts write JSON.

### `notes`

Type:

```sql
text
```

Free-form internal notes.

Currently null for seeded rows.

Use this for human-authored notes, not structured data. Structured metadata should go in `settings`.

### `settings`

Type:

```sql
jsonb
```

General structured metadata that does not deserve its own top-level column.

Current shape:

```json
{
  "docs": ["docs/python/recipes/wrangles/convert.md"],
  "color": "sun",
  "source_catalog": "wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js",
  "source_mapping": "wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json"
}
```

Current keys:

```text
docs
color
source_catalog
source_mapping
```

#### `settings.docs`

Array of source documentation files from `wrangleMappings.json`.

Example:

```json
["docs/python/recipes/wrangles/standalone.md", "docs/excel/classify.md"]
```

#### `settings.color`

UI color token from the generated catalog.

Examples:

```text
sun
sky
slate
forest
violet
lagoon
```

#### `settings.source_catalog`

Repo path to the generated catalog used for seeding.

#### `settings.source_mapping`

Repo path to the mapping file used for IDs and docs paths.

Future possible keys:

```json
{
  "introduced_version": "1.14.0",
  "deprecated_version": null,
  "aliases": ["case"],
  "excel_category": "Format"
}
```

### `used_by`

Type:

```sql
uuid
```

Optional legacy compatibility column.

Usually null for stock content records.

### `date_used`

Type:

```sql
timestamptz
```

Optional legacy compatibility column.

Usually null for stock content records.

### `production_version_id`

Type:

```sql
uuid
```

Optional legacy compatibility column.

Usually null for stock content records.

If a future publishing/versioning system is added, this could point to the currently deployed content version.

### `wrangle_key`

Type:

```sql
text
```

Stable recipe key used in YAML recipes.

Examples:

```text
convert.case
extract.attributes
select.highest_confidence
create.embeddings
classify
lookup
sql
```

This is one of the most important columns in the table.

Use it to:

```text
match docs to catalog entries
build recipe examples
find rows from wranglespy docstrings
upsert future updates
render user-facing recipe snippets
```

`wrangle_key` should be unique.

### `slug`

Type:

```sql
text
```

URL-safe slug generated from `wrangle_key`.

Examples:

```text
convert-case
extract-attributes
select-highest-confidence
date-calculator
```

This can be used for site routes or anchors if needed.

### `description`

Type:

```sql
text
```

Description from the generated catalog.

Currently often the same as `purpose`.

Example:

```text
Take the first non-empty value from a series of columns or lists.
```

Over time, `description` can become richer than `purpose`.

### `docs_path`

Type:

```sql
text
```

Primary documentation source file.

Example:

```text
docs/python/recipes/wrangles/merge.md
```

This is used by the example seeder to know which docs file to scan.

### `docs_url`

Type:

```sql
text
```

Public docs route.

Example:

```text
/python/recipes/wrangles/convert
/python/recipes/wrangles/extract
```

Known caveat:

Some docs URLs are generated mechanically from `docs_path`. For Excel-only paths, the current URL may need cleanup. Example: a `docs_path` under `docs/excel/...` should usually map to `/excel/...`, not `/python/recipes/wrangles/...`.

### `parameters`

Type:

```sql
jsonb
```

Array of parameter definitions for the wrangle.

This is one of the most important JSON columns.

Each item describes a configurable parameter accepted by the wrangle.

Example:

```json
[
  {
    "name": "input",
    "label": "Input",
    "default": ["Column A", "Column B"],
    "ui_type": "list",
    "required": true,
    "sort_order": 1,
    "description": "Name or list of input columns",
    "enum_values": null,
    "placeholder": "Column A"
  },
  {
    "name": "case",
    "label": "Case",
    "default": "lower",
    "ui_type": "select",
    "required": true,
    "sort_order": 3,
    "description": "The case to convert to. lower, upper, title or sentence",
    "enum_values": ["lower", "upper", "title", "sentence"],
    "placeholder": null
  }
]
```

#### `parameters[].name`

Machine-readable parameter key used in recipe YAML.

Examples:

```text
input
output
case
model_id
api_key
first_element
attribute_type
```

This should match the key accepted by the wrangle.

#### `parameters[].label`

Human-readable label.

Examples:

```text
Input
Output
Model Id
First Element
Attribute Type
```

This can be used directly in form labels.

#### `parameters[].default`

Default value for the parameter.

Can be any JSON-compatible value:

```json
"lower"
false
10
["Column A", "Column B"]
{}
[]
```

Important:

Some defaults are UI/demo defaults from the generated catalog, not necessarily runtime defaults from `wranglespy`.

#### `parameters[].ui_type`

Suggested UI control type.

Current values:

```text
text
list
select
boolean
number
json
```

Meaning:

```text
text    = simple string input
list    = one or more values, usually columns
select  = enum dropdown
boolean = true/false
number  = numeric input
json    = object/array/free structured config
```

#### `parameters[].required`

Boolean.

Indicates whether the parameter is required by the schema.

Example:

```json
"required": true
```

#### `parameters[].sort_order`

Integer.

Determines display order in generated forms or docs.

#### `parameters[].description`

Short help text for the parameter.

This comes from the generated schema/catalog when available.

Can be null.

#### `parameters[].enum_values`

Array of allowed values for select-style parameters.

Example:

```json
["lower", "upper", "title", "sentence"]
```

Null for non-enum parameters.

#### `parameters[].placeholder`

Optional placeholder value for UI rendering.

Examples:

```json
"Column A"
["Case Output"]
null
```

### `defaults`

Type:

```sql
jsonb
```

Object containing default config values keyed by parameter name.

Example:

```json
{
  "input": ["Column A", "Column B"],
  "output": ["Case Output"],
  "case": "lower"
}
```

This is useful for:

```text
building playground forms
generating starter recipes
showing example configs
```

Important:

Like `parameters[].default`, these are catalog defaults, not always runtime defaults.

### `examples`

Type:

```sql
jsonb
```

Array of examples extracted from Docusaurus docs.

Current shape:

```json
[
  {
    "title": "Capitalize Input Column",
    "recipe_yaml": "wrangles:\n  - convert.case:\n      input: column\n      output: new column\n      case: upper",
    "source": "docs/python/recipes/wrangles/convert.md",
    "input_sample": [
      {
        "column": "some text"
      }
    ],
    "output_sample": [
      {
        "column": "more text",
        "new column": "MORE TEXT"
      }
    ]
  }
]
```

#### `examples[].title`

Example title from the nearest Markdown heading before the `RecipePlayground` block.

Examples:

```text
Capitalize Input Column
Concatenating 3 Columns
Making Use of Output Parameters
```

#### `examples[].recipe_yaml`

Recipe YAML string shown in the docs.

Example:

```yaml
wrangles:
  - convert.case:
      input: column
      output: new column
      case: upper
```

This should be treated as documentation/demo content. Some examples include comments, placeholders, or fake values.

#### `examples[].source`

Repo path to the Markdown file where the example came from.

Example:

```text
docs/python/recipes/wrangles/convert.md
```

#### `examples[].input_sample`

Optional sample input rows.

Shape:

```json
[
  {
    "Column Name": "value"
  }
]
```

Example:

```json
[
  {
    "Product Specs": "18V Cordless 4.5in angle grinder"
  },
  {
    "Product Specs": "120V 12in chop saw 3600 max. rpm"
  }
]
```

Can be null if the docs do not expose parseable input sample data.

#### `examples[].output_sample`

Optional sample output rows.

Shape:

```json
[
  {
    "Column Name": "value",
    "Output Column": "value"
  }
]
```

Example:

```json
[
  {
    "Blade Diameter": "4.5 inches",
    "Max. RPM": ""
  },
  {
    "Blade Diameter": "12 inches",
    "Max. RPM": "3600"
  }
]
```

Can be null if the docs do not expose parseable output sample data.

Known behavior:

When the docs expose a single combined table rather than separate before/after tables, the script stores that table as `output_sample` and leaves `input_sample` null.

### `is_stock`

Type:

```sql
boolean
```

Whether this is a stock catalog record.

Expected value for this table:

```text
true
```

### `is_recipe_wrangle`

Type:

```sql
boolean
```

Whether this row represents a recipe wrangle.

Expected value for the 88 stock wrangles:

```text
true
```

If connectors are ever added to this same table, they should probably have:

```text
is_recipe_wrangle = false
```

But the current recommendation is to keep connectors separate or use a clear `content_kind` column before mixing them.

### `is_ai`

Type:

```sql
boolean
```

Whether the wrangle is AI/model-driven.

Expected true examples:

```text
classify
extract.ai
generate.ai
huggingface
```

Known issue in the first seed script version:

The original inference checked for `"ai"` inside the key, which accidentally marked keys like `tail` or `key_value_pairs` as AI because they contain the letters `ai`.

Correct logic should be closer to:

```python
category == "ai" or key.endswith(".ai") or key == "huggingface"
```

Quick SQL cleanup:

```sql
update public.wranglesio_content
set is_ai = false
where wrangle_key not in (
  'classify',
  'extract.ai',
  'generate.ai',
  'huggingface'
);

update public.wranglesio_content
set is_ai = true
where wrangle_key in (
  'classify',
  'extract.ai',
  'generate.ai',
  'huggingface'
);
```

### `requires_account`

Type:

```sql
boolean
```

Whether the wrangle requires a WrangleWorks account.

This is inferred from descriptions that mention `Requires WrangleWorks Account`.

Examples likely true:

```text
extract.address
extract.attributes
extract.codes
extract.html
extract.properties
standardize
translate
```

### `requires_subscription`

Type:

```sql
boolean
```

Whether the wrangle requires a paid subscription.

This is inferred from descriptions that mention `Subscription`.

Examples likely true:

```text
standardize
extract.custom
```

### `requires_external_api_key`

Type:

```sql
boolean
```

Whether the wrangle requires an external API key.

This is true when the parameter list includes `api_key` or the description mentions an API key.

Examples:

```text
extract.ai
generate.ai
create.embeddings
translate
search.find_links
search.retrieve_link_content
```

## JSON Column Query Examples

### Find all wrangles with examples

```sql
select wrangle_key, name, jsonb_array_length(examples) as example_count
from public.wranglesio_content
where jsonb_array_length(examples) > 0
order by example_count desc;
```

### Find wrangles with an `api_key` parameter

```sql
select wrangle_key, name
from public.wranglesio_content
where parameters @> '[{"name": "api_key"}]'::jsonb
order by wrangle_key;
```

### Find required parameters for one wrangle

```sql
select parameter ->> 'name' as parameter_name,
       parameter ->> 'ui_type' as ui_type,
       parameter ->> 'description' as description
from public.wranglesio_content,
     jsonb_array_elements(parameters) as parameter
where wrangle_key = 'convert.case'
  and (parameter ->> 'required')::boolean = true;
```

### Search descriptions

```sql
select wrangle_key, name, description
from public.wranglesio_content
where description ilike '%extract%'
order by type, name;
```

### Get first example for each wrangle

```sql
select wrangle_key,
       name,
       examples -> 0 as first_example
from public.wranglesio_content
where jsonb_array_length(examples) > 0;
```

## Seed Scripts

Two scripts currently populate the table.

### `scripts/seed_wranglesio_content.py`

Populates core catalog data.

It reads:

```text
wrangleCatalog.generated.js
wrangleMappings.json
```

It writes:

```text
id
name
type
subtype
variant
status
path
purpose
tags
settings
wrangle_key
slug
description
docs_path
docs_url
parameters
defaults
examples
is_stock
is_recipe_wrangle
is_ai
requires_account
requires_subscription
requires_external_api_key
```

Run:

```bash
export DATABASE_URL='postgresql://USER:PASSWORD@HOST:5432/DATABASE'
python scripts/seed_wranglesio_content.py
```

Dry run:

```bash
python scripts/seed_wranglesio_content.py --dry-run
```

By default, this script also adds missing columns using `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`.

To disable that:

```bash
python scripts/seed_wranglesio_content.py --no-ensure-columns
```

### `scripts/seed_wrangle_examples.py`

Populates only the `examples` column.

It scans docs referenced by `wrangleMappings.json`, finds `RecipePlayground` blocks, extracts recipe YAML, and attempts to parse input/output samples.

Run:

```bash
export DATABASE_URL='postgresql://USER:PASSWORD@HOST:5432/DATABASE'
python scripts/seed_wrangle_examples.py
```

Dry run:

```bash
python scripts/seed_wrangle_examples.py --dry-run
```

Current local dry-run result:

```text
131 examples found
79 wrangles have examples
68 examples have input_sample
96 examples have output_sample
```

## Current Limitations

### Descriptions are short

Descriptions currently come from the generated catalog. They are mostly one sentence.

The richer docs content has not been summarized into the table yet.

### Examples are best-effort

`examples.recipe_yaml` is reliable for most `RecipePlayground` blocks.

`input_sample` and `output_sample` are best-effort. They are extracted from:

```text
inputColumns / inputRows / outputColumns / outputRows
exampleSource markdown tables
exampleSource HTML-wrapped markdown tables
```

Some examples remain null because the docs do not expose clean sample data.

### Some docs URLs may need cleanup

Rows sourced from Excel docs may need manual or script-based URL correction.

### AI flags need correction if seeded with the first script version

If `is_ai` was inferred using substring matching, clean it up with the SQL shown above.

### Runtime defaults vs UI defaults

The `defaults` column is based on catalog/UI defaults, not necessarily the exact runtime defaults from `wranglespy`.

Future sync from `wranglespy` should clarify which defaults are authoritative.

## Recommended Future Additions

If the single-table model remains, useful future columns could be:

```sql
content_kind text default 'wrangle'
source_package text
source_module text
source_function text
wranglespy_version text
last_verified_at timestamptz
deprecated_at timestamptz
replacement_wrangle_key text
```

The most useful one is probably:

```sql
content_kind text
```

That would make it safer to store non-wrangle content later, such as connectors, without overloading `is_recipe_wrangle`.

Suggested values:

```text
wrangle
connector
guide
example
```

## Practical Usage Guidance

For the website:

Use these columns directly:

```text
id
wrangle_key
name
type
subtype
variant
status
purpose
description
docs_url
parameters
defaults
examples
is_ai
requires_account
requires_subscription
requires_external_api_key
```

For search:

Search across:

```text
name
wrangle_key
type
subtype
purpose
description
tags
parameters[].name
parameters[].description
```

For rendering a parameter form:

Use:

```text
parameters
defaults
```

For rendering examples:

Use:

```text
examples[].title
examples[].recipe_yaml
examples[].input_sample
examples[].output_sample
```

For syncing from `wranglespy` later:

Prefer matching by:

```text
wrangle_key
```

Then update:

```text
id if the stock model ID is confirmed stable
parameters
defaults
description
settings.source_module
settings.source_function
date_modified
```

Do not create duplicate rows for the same `wrangle_key`.

