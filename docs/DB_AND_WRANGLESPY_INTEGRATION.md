# Database, WranglesPY and documentation

**The catalog synchronization is implemented on `feat/catalog-history-sync`;
it has not been run against the live database.** Documentation regrouping below
remains a plan. The existing validation workflow remains read-only.

## What does each part do?

| Part | Its job |
| --- | --- |
| WranglesPY | Defines the executable functions and their schemas. Under this plan, it also allocates IDs for new wrangles. |
| Database (`wrangles_catalog`) | Stores catalog IDs, names, execution bindings and status. |
| Docs | Stores editable explanations and examples; generates pages and contracts. |

## The three important fields

| Field | Meaning |
| --- | --- |
| `catalog_id` | Permanent identity linking PY, the database and Docs. Keep it unchanged when names change. |
| `wranglesPY_key` | The operation used in a recipe, such as `lookup.semantic`. It is not a Python file path. |
| `catalog_key` | Where the entry belongs in the documentation, such as `standardize.lookup`. |

For example, `wranglesPY_key: lookup.semantic` with
`catalog_key: standardize.lookup` appears under **Standardize → Lookup**.
Its recipes still use **`lookup.semantic`**, not `standardize.lookup`.

Store catalog IDs as quoted strings in metadata, such as `"102"`.
In PY, this is schema/docstring metadata, **not a function or recipe parameter**.
In Docs, do not reuse the existing legacy UUID `id` field as the catalog ID.

## How do we match a wrangle?

Apply these rules separately to each wrangle:

| What PY provides | What happens |
| --- | --- |
| An ID that already exists in the database | Use that database row. |
| A new explicit ID that does not exist in the database | Create a row with that PY-issued ID, only if there is no conflicting existing identity. |
| No ID, but exactly one database row matches `wranglesPY_key` | Use that row and its existing ID. |
| No ID and no matching database row | Do not create a database row. Report the entry as unregistered. |
| Multiple fallback matches or conflicting IDs/keys | Report the problem. Do not guess or overwrite. |

The key fallback is for existing wrangles whose PY metadata does not yet contain
an ID. Matching does not automatically write the ID back into PY.

## What values do we keep?

| Field | Existing row | New row |
| --- | --- | --- |
| `catalog_id` | Keep the existing ID. | Use the explicit PY-issued ID. |
| `catalog_key` | Keep the database value. | Start with `wranglesPY_key`; it can be reorganized later. |
| `catalog_kind` | Preserve the correct category. | Identify it as a wrangle, connector, etc. |
| `wrangle_type` | Keep the existing value. | Allow `null`. |
| `status` | Use explicit PY status; preserve it when metadata is missing. | Set `active` from PY metadata. |
| `history` | Merge explicitly declared legacy names. | Start with `{}`, then add declared legacy names. |
| `okf_path` | Leave unchanged. | Leave `null` for now. |

`active` does not automatically enable the Run button. Execution eligibility
still needs its own review.

## What happens to the documentation?

Find the existing document by catalog ID and preserve its manual content.
Use `catalog_key` to determine its documentation group and location.

- If the document is missing, create a starter page from a valid schema.
- If the group is missing, create the group too.
- If the catalog key changes, move the existing document instead of duplicating
  it, and preserve redirects from its old public URL.
- Keep executable recipe keys tied to `wranglesPY_key`.
- Do not invent examples or expected outputs for a new page.

A read-only check reports differences. The synchronization/refresh process
applies approved changes and regenerates the pages and contracts.

For normal wording and example edits, follow
[Editing wrangles and connectors](EDITING_WRANGLES_AND_CONNECTORS.md).

## Before merging

We still need to define how PY allocates unique IDs without collisions across
branches or existing database entries. This workflow uses the direct database
connection for explicit IDs. API-Core would need a separate change to accept
caller-supplied IDs through its catalog creation API.

Develop and push the implementation on a **separate branch**, not `main`.
Merge only after the required IDs are added to WranglesPY and the matching,
fallback, conflict handling and generated outputs have been tested.

## Run the history migration locally

Connect to the VPN. Set `DATABASE_URL` to the direct PostgreSQL URL, as before.
Do not paste credentials into this repository.

```sh
python3 -m pip install 'psycopg[binary]>=3.2,<4'
python3 scripts/migrate_catalog_history.py > catalog-after-migration.json
```

This adds a JSONB `history` column with default `{}`. It preserves existing
statuses and fills only null statuses with `active`; new rows default to active.
All rows in the supplied export are already active. It does not rename anything,
move legacy names, or clear an existing history. The output contains the latest
catalog rows after the transaction commits. Keep it locally.

## Run synchronization

Use **Actions → Sync catalog identity and history from WranglesPY**. Enter the
WranglesPY branch containing the new metadata in `upstream_ref`. Later, enter
`main` after that PR merges. Leave `apply_changes` off to preview; turn it on
to apply the changes in one database transaction. It uses the existing
`api-core-validation` environment's `WIREGUARD_CONFIG` and `DATABASE_URL` secrets.
The database credential must have INSERT and UPDATE permissions for applying.
The environment must permit this development branch if testing before merge.
GitHub requires a workflow to exist on the default branch before it can be
manually dispatched; until then, the same sync script can be tested locally
with a generated `schema/schema.json` and `DATABASE_URL`:

```sh
python3 scripts/sync_catalog_history.py /path/to/WranglesPY/schema/schema.json
# After reviewing the preview:
python3 scripts/sync_catalog_history.py /path/to/WranglesPY/schema/schema.json --apply
```

For ID 63, `split.dictionary` moves into `history` as `legacy`, while the runtime
key becomes `structure.split_dictionary`. The catalog key also changes if it
still equals the old legacy name; a manually chosen documentation key is kept.
The row stays active and keeps ID 63. Shared docstrings carry the same history;
exactly one exposed name must remain outside history for each shared ID.

Only recipe wrangles are synchronized here. Connectors and catalog-only `map`
are untouched. Missing definitions do not automatically deactivate rows: a
missing schema is not sufficient proof of removal. Existing documentation
generation and schema refresh workflows remain separate; refresh the pinned
WranglesPY schema before expecting validation against renamed bindings to pass.

**Current integration blocker:** adding `history` itself is supported, but the
existing Registry reconciliation still counts catalog identities by their current
keys rather than resolving legacy names through history. Simulating the five
renames against the saved runtime reports five missing bindings and five missing
old catalog identities. Updating the pinned schema alone does not address the
history matching. Keep synchronization in preview mode until Registry matching
also supports these shared identities; the local column migration is independent.
