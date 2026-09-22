# Catalog Table v1

## Purpose

The first version of the catalog adds a stable database mapping between saved models and Registry documentation entries.

Before this change, model records only had broad fields such as `purpose`, `type`, and `variant`. Those fields are useful, but they are not always specific enough to identify the exact Registry entry that should be used by the agent or UI. For example, several models can have `purpose = 'extract'`, but they may correspond to different Registry keys such as `extract.custom`, `extract.ai`, `extract.attributes`, or `extract.brackets`.

The catalog gives every Registry-backed capability a database identity and lets each model point to the correct catalog row.

## New Table: `public.wrangles_catalog`

`wrangles_catalog` stores one row per catalog entry.

Recommended v1 columns:

| Column | Type | Purpose |
| --- | --- | --- |
| `catalog_id` | `bigint` | Database-generated primary key. This is the value stored on `models.catalog_id`. |
| `catalog_key` | `text` | Stable catalog key, for example `extract.custom`, `extract.ai`, `lookup.key`, `lookup.semantic`, `map`. |
| `kind` | `text` | Entry category. For Registry wrangles this is usually `wrangle`. |
| `wrangle_key` | `text` | Registry wrangle key used to locate documentation or execution metadata. Usually same as `catalog_key`, but can differ for aliases such as `lookup.key` mapping to `lookup`. |
| `title` | `text` | Human-readable title, for example `Custom`, `AI`, `Attributes`, `Map`. |
| `registry_path` | `text` | Optional path to the Registry docs source. Can be `null` in v1. |
| `status` | `text` | Catalog entry status, for example `active`. |
| `source` | `text` | Source system, for example `registry-docs`. |
| `created_at` | `timestamptz` | Creation timestamp. |
| `updated_at` | `timestamptz` | Last update timestamp. |

Example row:

```json
{
  "catalog_id": "2",
  "catalog_key": "compare.text",
  "kind": "wrangle",
  "wrangle_key": "compare.text",
  "title": "Text",
  "registry_path": null,
  "status": "active",
  "source": "registry-docs",
  "created_at": "2026-09-16T08:41:16.744287Z",
  "updated_at": "2026-09-16T08:41:16.744287Z"
}
```

## New Field: `public.models.catalog_id`

`models.catalog_id` is a nullable `bigint` foreign key to `wrangles_catalog.catalog_id`.

```sql
alter table public.models
add column if not exists catalog_id bigint;

alter table public.models
add constraint models_catalog_id_fkey
foreign key (catalog_id)
references public.wrangles_catalog(catalog_id);
```

This field tells the API which catalog entry belongs to a saved model.

Important: `catalog_id` is shared. Multiple models can point to the same catalog row. For example, many custom extract models can map to the same `extract.custom` catalog entry.

## Why `bigint`

`catalog_id` should be a database-generated 64-bit integer counter, not a manually formatted string such as `000001`.

Reasons:

- It follows normal PostgreSQL primary key practice.
- It avoids display formatting concerns inside relational data.
- It works naturally with foreign keys and indexes.
- Display formatting can still be produced when needed using `lpad(catalog_id::text, 6, '0')`.

API responses should return `catalog_id` as a string to avoid JavaScript precision loss for large `bigint` values.

Example:

```json
{
  "catalog_id": "34"
}
```

## Mapping Logic

The catalog mapping is based on model metadata:

| Model condition | Catalog key |
| --- | --- |
| `purpose = 'extract'`, `variant in ('extract-ai', 'ai')` | `extract.ai` |
| `purpose = 'extract'`, default/custom/pattern DIY model | `extract.custom` |
| stock extract named `Attributes` | `extract.attributes` |
| stock extract named `Bracketed Information` or `Brackets` | `extract.brackets` |
| stock extract named `Codes` | `extract.codes` |
| `purpose = 'lookup'`, default/null/key variant | `lookup.key` |
| `purpose = 'lookup'`, `variant in ('embedding', 'semantic')` | `lookup.semantic` |
| `purpose = 'schema'` | `map` |
| `purpose = 'standardize'`, `variant = 'clean'` | `standardize.clean` |
| `purpose = 'standardize'`, `variant = 'custom'` | `standardize.custom` |
| `purpose = 'standardize'`, no specific variant | `standardize` |
| `purpose = 'classify'` | `classify` |
| `purpose = 'recipe'` | `recipe` |

Legacy null variants are interpreted using existing product behavior:

- extract null/default means pattern/custom extract, mapped to `extract.custom`.
- lookup null/default means key lookup, mapped to `lookup.key`.

## Trigger Recommendation

To keep future rows correct, the database should include a trigger that resolves `catalog_id` on insert and relevant updates.

The trigger should:

1. Resolve a `catalog_key` from `purpose`, `type`, `name`, `variant`, and `settings`.
2. Look up that key in `wrangles_catalog`.
3. Set `new.catalog_id` to the matching `wrangles_catalog.catalog_id`.

This prevents new models from being inserted without catalog mapping when the API or another writer forgets to pass `catalog_id`.

## API Response Shape

Endpoints that return model metadata should include both:

- `catalog_id`
- `catalog_binding`

Example:

```json
{
  "id": "model-id",
  "name": "Example Model",
  "purpose": "extract",
  "type": "diy",
  "variant": "pattern",
  "catalog_id": "34",
  "catalog_binding": {
    "catalog_id": "34",
    "catalog_key": "extract.custom",
    "kind": "wrangle",
    "wrangle_key": "extract.custom",
    "title": "Custom",
    "registry_path": null,
    "status": "active",
    "source": "registry-docs",
    "created_at": "2026-09-16T08:41:16.744287Z",
    "updated_at": "2026-09-16T08:41:16.744287Z",
    "model_id": "model-id"
  }
}
```

`catalog_binding` is the execution/documentation bridge. It lets the agent resolve from a selected model to:

- the catalog identity;
- the Registry key;
- the wrangle key;
- the existing saved model ID when needed.

## Endpoints Affected

The first version should expose catalog data from:

- `GET /user/models`
- `GET /model/metadata?id=<model_id>`
- `GET /model/content?model_id=<model_id>`
- `POST /model/content?type=<type>&name=<name>`
- `GET /catalog`

## Preview View

A database view can be used to preview how models map to catalog entries before backfilling or debugging trigger behavior.

Recommended view name:

```sql
public.models_catalog_mapping_preview
```

The view should show:

- model ID and name;
- model `purpose`, `type`, `variant`;
- current `models.catalog_id`;
- inferred `catalog_key`;
- inferred `wrangles_catalog.catalog_id`;
- mapping status such as `mapped`, `needs_catalog_id`, `catalog_id_mismatch`, or `missing_catalog_entry`.

This view is useful for checking:

```sql
select *
from public.models_catalog_mapping_preview
where current_catalog_id is null;
```

## What v1 Does Not Do

This first version does not replace Registry docs. The Registry remains the source of documentation content.

The catalog table is a database index and binding layer. It gives the API and agent a stable way to move from a saved model to the correct Registry entry.

It also does not delete catalog rows when a model is deleted. Catalog rows are shared and should remain available as long as the Registry entry exists.
