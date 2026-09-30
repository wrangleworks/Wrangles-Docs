# Catalog Table v1

## Purpose

The first version of the catalog adds a stable database mapping between saved models and Registry documentation entries.

Before this change, model records only had broad fields such as `purpose`, `type`, and `variant`. Those fields are useful, but they are not always specific enough to identify the exact Registry entry that should be used by the agent or UI. For example, several models can have `purpose = 'extract'`, but they may correspond to different Registry keys such as `extract.custom`, `extract.ai`, `extract.attributes`, or `extract.brackets`.

The catalog gives every Registry-backed capability a database identity and lets each model point to the correct catalog row.

## New Table: `public.wrangles_catalog`

`wrangles_catalog` stores one row per catalog entry.

Recommended v1 columns:

| Column | Data Type | Purpose |
| --- | --- | --- |
| `catalog_id` | `bigint` | Database-generated primary key. This is the value stored on `models.catalog_id`. |
| `catalog_kind` | `text` | Catalog entry category. Registry types will be `wrangle`, `connector`, `recipe`, `guide`.|
| `wrangle_type` | `text` | Types of wrangles. Current list is `extract`, `standardize`, `classify`, `lookup` and `map`. This is `purpose` in models table. More will be added, and wrangles can be moved between types. |
| `catalog_key` | `text` | Stable catalog path, for example `extract.custom`, `extract.ai`, `lookup.key`, `lookup.semantic`, `map`. Can be mutated. |
| `wranglesPY_key` | `text` | Generated key that provides function execution path. Can differ from `catalog_key` when there are aliases such as `lookup.key` or catlog reorganization. |
| `okf_path` | `text` | Future path to the public Open Knowledge Format markdown file. |
| `status` | `text` | Catalog entry status, for example `active`. Other values `deprecated`, `draft`, ... |
| `notes` | `text` | Comments for reference to status / transitions / updates etc.
| `created_at` | `timestamptz` | Creation timestamp. |
| `updated_at` | `timestamptz` | Last update timestamp. |

# Catalog Table and Model Bindings

Last reviewed: **2026-09-29**.

This document describes the updated PostgreSQL catalog schema and the API
behavior implemented in [API-Core PR #171](https://github.com/wrangleworks/API-Core/pull/171).
At the review date, that PR is open. Its behavior has been tested locally;
deployment of the updated schema and API must be verified per environment.
An API instance running older code may still return the previous field names.

## Purpose

`public.wrangles_catalog` stores one row per catalog entry. Saved models refer
to an entry through `public.models.catalog_id`.

These identities have different responsibilities:

| Value | Responsibility |
| --- | --- |
| `catalog_id` | Database identity of a catalog entry. |
| `catalog_key` | Logical key used to locate the catalog/Registry entry. |
| `wranglesPY_key` | Executable operation key in WranglesPY. |
| `models.id` / execution `model_id` | Identity of the particular saved model. |

Many saved models can share one catalog entry. For example, multiple semantic
lookup models can reference `lookup.semantic`, while each retains its own
saved-model ID, training data, ownership, and permissions.

A catalog identity must not replace a saved-model ID during execution. A
generic operation's catalog record does not identify the selected saved model.

## Current catalog schema

The columns below are listed in documentation order; queries should name the
columns they require rather than depend on physical column order.

| Column | PostgreSQL type | Nullable | Default / behavior |
| --- | --- | --- | --- |
| `catalog_id` | `bigint` | No | Primary key; `GENERATED ALWAYS AS IDENTITY`. |
| `catalog_kind` | `text` | No | Default `'wrangle'`. Catalog category; intended categories include `wrangle`, `connector`, `recipe`, and `guide`. |
| `wrangle_type` | `text` | Yes | Catalog classification associated with model purpose; see the classification note below. |
| `catalog_key` | `text` | No | Unique logical catalog key, such as `extract.custom`, `lookup.semantic`, or `map`. |
| `wranglesPY_key` | `text` | Yes | WranglesPY execution key; may differ from `catalog_key`. |
| `okf_path` | `text` | Yes | Path to the public Open Knowledge Format Markdown document, when available. |
| `status` | `text` | No | Default `'active'`. Catalog-entry status, separate from model training status. |
| `notes` | `text` | Yes | Catalog comments, including status changes or transitions. |
| `created_at` | `timestamptz(0)` | No | Default `date_trunc('second', now())`. |
| `updated_at` | `timestamptz(0)` | No | Default `date_trunc('second', now())`; writers must set it when updating a catalog record. |

The mixed-case SQL column name must be quoted as `"wranglesPY_key"`.

The previous columns `kind`, `wrangle_key`, and `registry_path` were renamed to
`catalog_kind`, `wranglesPY_key`, and `okf_path`. `title`, `source`, and
`lifecycle_status` are no longer catalog-table columns. Documentation titles
belong in Registry Markdown content.

`status` is text; examples such as `active`, `draft`, `deprecated`, or `deleted`
do not imply that the database enforces an enum or that PR #171 implements
catalog lifecycle transitions. The same distinction applies to category names.

Timestamps retain timezone semantics and whole-second precision. Catalog JSON
examples use UTC ISO 8601, such as `2026-09-21T09:29:40Z`. A timestamp default
does not automatically refresh `updated_at` on an UPDATE.

### Classification: `wrangle_type`, `purpose`, and `map`

Existing model purposes include `classify`, `extract`, `lookup`, `recipe`,
`schema`, and `standardize`. The catalog key for the schema operation is `map`:

```text
models.purpose = schema  ->  catalog_key = map
```

Do not describe `map` as the literal value stored in `models.purpose`.
`wrangle_type` is separately stored catalog metadata. If its classification
uses `map`, comparison with model purpose must explicitly account for the
`map`/`schema` correspondence. This document does not prescribe a new data
reclassification or infer all categories from catalog-key prefixes.

The creation-time resolver uses model metadata and configured catalog keys;
it does not derive or update the catalog's `wrangle_type`.

## Identity allocation and model associations

PostgreSQL allocates new catalog identities using the central catalog's
64-bit identity counter. Creating a saved model does **not** allocate a new
catalog entry: API-Core looks up the existing entry and stores its ID.

`models.catalog_id` remains nullable `bigint`. A non-null value associates a
model with `wrangles_catalog.catalog_id`. Where the foreign-key constraint is
installed, PostgreSQL also enforces the reference. PR #171 does not install or
change that constraint; verify its definition in the target database rather
than assuming it exists from the column name alone.

The identity policy is to retain catalog IDs across key changes, runtime
renames, snapshots, and environment imports. IDs must not be renumbered or
reused. Primary-key uniqueness and identity generation alone do not establish
all protections against privileged manual changes, sequence resets, or reuse.

Development and production use the shared authoritative catalog described in
this design. Any exported copy must preserve its IDs; an independent copy
must not allocate competing identities. PR #171 does not implement Registry
import/export or cross-repository synchronization.

In JSON, catalog IDs are decimal strings, for example `"102"`. Python and
JavaScript consumers must preserve the value without converting it to a
JavaScript `Number`. Do not pad or truncate IDs for storage or transport.

## Automatic assignment in API-Core

Mapping rules live in
[`src/model_catalog_type_mapping.yaml`](https://github.com/wrangleworks/API-Core/blob/075b7d3f1dcd9a0da5ad260b11c57f5cee2b6628/src/model_catalog_type_mapping.yaml).
API-Core loads this file with `yaml.safe_load` once at startup.

For example:

```yaml
extract:
  default: extract.custom
  catalog_key_by_variant:
    extract-ai: extract.ai
    ai: extract.ai
  catalog_key_by_name_by_type:
    stock:
      address: extract.address

lookup:
  default: lookup.key
  catalog_key_by_variant:
    embedding: lookup.semantic
    semantic: lookup.semantic

schema:
  default: map
```

This is an excerpt; the checked-in file contains the complete mapping.
Configuration supplies catalog keys, never numeric catalog IDs.

### Rule priority

1. Match a model-name alias for the model's type. Names are lowercased after
   trimming surrounding space characters. A matching alias takes precedence
   over variants.
2. Match the explicit model variant. Only when it is NULL/`None`, and settings
   is an object, use `settings.variant`. An explicit empty string does not fall
   back to settings.
3. Use the purpose's configured default when no alias or variant matches.

| Model metadata | Resolved catalog key |
| --- | --- |
| `purpose=extract`, `type=stock`, `name=Address` | `extract.address` |
| `purpose=extract`, `type=stock`, `name=Bracketed Information` or `Brackets` | `extract.brackets` |
| `purpose=extract`, no matching name alias, `variant=extract-ai` or `ai` | `extract.ai` |
| `purpose=extract`, DIY model, no matching variant | `extract.custom` |
| `purpose=lookup`, `variant=embedding` or `semantic` | `lookup.semantic` |
| `purpose=lookup`, `variant=NULL`, `settings.variant=embedding` | `lookup.semantic` |
| `purpose=lookup`, no matching effective variant | `lookup.key` |
| `purpose=standardize`, `variant=clean` | `standardize.clean` |
| `purpose=standardize`, `variant=custom` | `standardize.custom` |
| `purpose=standardize`, no matching variant | `standardize` |
| `purpose=classify` | `classify` |
| `purpose=schema` | `map` |
| `purpose=recipe` | `recipe` |

For `POST /model/content`, the request's `type` becomes the model's `purpose`;
the stored model `type` is `diy`. Stock-name aliases apply to Python callers
that supply `type=stock`, not to that creation route.

### Transaction and fallback behavior

Both `models.create()` and `models.create_with_owner()` call the shared Python
creation logic. Within the creation transaction, it resolves the key, selects
the matching `catalog_id`, and inserts the model. `create_with_owner()` also
inserts the owner claim in that transaction.

```sql
SELECT catalog_id
FROM public.wrangles_catalog
WHERE catalog_key = %s;
```

If a matching row exists, its ID takes precedence over an ID supplied to the
Python method. If no key or matching row exists, a supplied ID is retained;
otherwise the model's association is NULL. Database errors propagate and roll
back the transaction; they are not treated as missing mappings. The HTTP
creation route does not expose the Python method's optional `catalog_id` input.

Content storage and S3 work occur after metadata/ownership commit and are
outside that transaction. A successful catalog assignment does not establish
that asynchronous model training has completed.

### Trigger and update scope

This Python creation path works without a database catalog-binding trigger.
PR #171 does not disable or delete any existing trigger. Direct SQL inserts
and writes from other services do not execute the Python resolver.

Changing YAML does not backfill models or recalculate associations when model
metadata is updated. It also does not create missing catalog entries or
synchronize runtime names and documentation paths. Configuration changes
require an application restart or container rebuild/redeployment.

## API response contract

| Endpoint | Catalog behavior |
| --- | --- |
| `POST /model/content?type=<purpose>&name=<name>` | On success, HTTP 202 with only `model_id`. |
| `GET /model/metadata?id=<model_id>` | Model fields, top-level `catalog_id`, and nested `catalog_binding`. |
| `GET /user/models` | Each returned model includes `catalog_id` and `catalog_binding`. |
| `GET /user/models?projection=authoring` | The compact authoring projection retains both fields. |
| `GET /model/content?model_id=<model_id>` | Adds both fields when content is a JSON object; non-object content is returned without those additions. |
| `GET /catalog` | Returns `{"catalog": [...]}`. |
| `GET /catalog?catalog_id=<id>` or `?catalog_key=<key>` | Returns one catalog entry directly. |

`/catalog` also supports `kind` and `status` list filters. The query parameter
remains `kind`; it filters the renamed `catalog_kind` column. Supplying both
`catalog_id` and `catalog_key` returns HTTP 400; an unknown single-entry
selector returns HTTP 404.

### Creation response

```json
{
  "model_id": "<generated-model-id>"
}
```

No catalog metadata is included in this response.

### Catalog entry example

This example uses the known semantic lookup entry. Consumers must resolve IDs
from the authoritative catalog, not hardcode example values.

```json
{
  "catalog_id": "102",
  "catalog_kind": "wrangle",
  "wrangle_type": "lookup",
  "catalog_key": "lookup.semantic",
  "wranglesPY_key": "lookup",
  "okf_path": null,
  "status": "active",
  "notes": null,
  "created_at": "2026-09-21T09:29:40Z",
  "updated_at": "2026-09-23T16:47:58Z"
}
```

Here the catalog key and executable key differ. The API returns the database's
`wranglesPY_key`; it does not replace it with `catalog_key` or discover it from
an installed Python package during model creation.

### Model metadata example

Selected fields from a model response:

```json
{
  "id": "<saved-model-id>",
  "name": "Semantic lookup test",
  "type": "diy",
  "purpose": "lookup",
  "variant": "embedding",
  "status": "Ready",
  "notes": "",
  "catalog_id": "102",
  "catalog_binding": {
    "catalog_id": "102",
    "catalog_key": "lookup.semantic",
    "catalog_kind": "wrangle",
    "wrangle_type": "lookup",
    "wranglesPY_key": "lookup",
    "okf_path": null,
    "status": "active",
    "notes": null,
    "created_at": "2026-09-21T09:29:40Z",
    "updated_at": "2026-09-23T16:47:58Z",
    "model_id": "<saved-model-id>"
  }
}
```

The top-level `catalog_id` is the model's association. All other catalog
metadata appears only inside `catalog_binding`, without duplicated top-level
catalog fields. The binding's `model_id` is the actual saved model's `id`.

Model `status` and `notes` belong to the model. Binding `status` and `notes`
belong to the catalog. If the model has no catalog association, `catalog_id`
and `catalog_binding` are both NULL.

## Inspecting stored associations

A direct JOIN is sufficient to inspect existing associations. It does not
require a permanent view or the SQL resolver previously used by a trigger.

```sql
SELECT
    m.id AS model_id,
    m.name AS model_name,
    m.purpose,
    m.type AS model_type,
    m.variant,
    m.catalog_id,
    wc.catalog_key,
    wc.catalog_kind,
    wc.wrangle_type,
    wc."wranglesPY_key",
    wc.okf_path,
    m.status AS model_status,
    wc.status AS catalog_status,
    CASE
        WHEN m.catalog_id IS NULL THEN 'unlinked'
        WHEN wc.catalog_id IS NULL THEN 'missing_catalog_entry'
        ELSE 'linked'
    END AS association_status
FROM public.models m
LEFT JOIN public.wrangles_catalog wc ON wc.catalog_id = m.catalog_id
ORDER BY m.id;
```

`linked` confirms that the stored reference has a catalog row. It does not
prove the reference matches the latest YAML rules. That check must use the
current resolver and compare its expected key/ID with the stored association.

The earlier `models_catalog_mapping_preview` view is not a prerequisite or a
guaranteed deployed object. If a diagnostic view is maintained, its definition
must use the current columns and state whether it shows stored or inferred
associations.

Verify actual key constraints without modifying the database:

```sql
SELECT
    conrelid::regclass AS table_name,
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conrelid IN ('public.models'::regclass,
                   'public.wrangles_catalog'::regclass)
  AND contype IN ('p', 'u', 'f')
ORDER BY table_name, constraint_name;
```

## Registry compatibility and scope

Registry Markdown remains the source of documentation content. Catalog IDs
connect those entries to saved models and executable operations; the catalog
table does not replace the documentation.

At the review date, the
[Registry catalog snapshot in main](https://github.com/wrangleworks/Wrangles-Docs/blob/main/registry/catalog/api-core.json)
still uses legacy metadata names. The updated database/API field names in this
document do not automatically change that snapshot's versioned format or its
importer. Updating Registry compatibility and automatic binding synchronization
is separate work tracked by
[Wrangles-Docs #35](https://github.com/wrangleworks/Wrangles-Docs/issues/35).

Deleting a saved model does not imply deleting its shared catalog entry.
Catalog creation, updates, soft deletion, schema migration, and automatic
runtime/documentation synchronization are not implemented by API-Core PR #171.
