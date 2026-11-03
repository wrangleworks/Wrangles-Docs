# Database, WranglesPY and documentation

WranglesPY describes each recipe name. This repository synchronizes the database
and generates the documentation. All workflow commits go directly to `main`.

## What belongs where?

| Place | What it contains |
| --- | --- |
| WranglesPY docstring/schema | `catalog_id: "123"` and `status: active` or `legacy`. No `history`. |
| Database | One row per catalog ID, the current runtime name, status, and calculated `history`. |
| Documentation | A page for each available name. Legacy names get a **Legacy** pill. Removed names have no page. |

IDs are metadata, not recipe parameters. The function's exposed name supplies
`wranglesPY_key`. `catalog_key` controls documentation identity; existing custom
catalog keys are preserved. A new row starts with its runtime name as catalog key.
Existing `wrangle_type` and `okf_path` values stay unchanged; new values can be null.

## Example

Old function `split.dictionary`: ID `63`, status `legacy`.
New function `structure.split_dictionary`: ID `63`, status `active`.
Each name needs its own status, even when the implementations are equivalent.
A shared Python function object cannot hold two different docstrings.

The workflow keeps row 63 active, points it to `structure.split_dictionary`, and
calculates:

```json
{"split.dictionary": "legacy"}
```

Both documentation pages remain available. Only the old one gets a Legacy pill.
Its examples and Run eligibility are not disabled merely because it is legacy.

When the old function disappears, the workflow changes its history to:

```json
{"split.dictionary": "not active"}
```

Registry refresh removes that old Markdown page, generated page, contract,
navigation references and Playground entry. Directly deleted active names follow
the same rule. If no names remain for an ID, the database row stays for history
with status `not active`. Connectors and the catalog-only Excel Map are excluded.

A present function with a missing/unreadable schema is an error, not a deletion.
Disappearance is checked against the complete callable inventory from the same
upstream revision as the generated schema.

## How are IDs matched?

1. Use the explicit WranglesPY catalog ID when present.
2. Otherwise use an exact, unique existing database `wranglesPY_key` match.
3. No ID and no database match: report it; do not insert a row.
4. An explicit new ID may create a row. Conflicting IDs/keys or multiple active
   names for one ID stop the transaction. Do not guess IDs or allocate them here.

## What do I run?

The one-time `history` column migration has already been run. The saved catalog
is `registry/catalog/api-core.json`; history currently contains empty objects.

1. Give the WranglesPY AI [this temporary prompt](TEMP_WRANGLESPY_CATALOG_PROMPT.md)
   and the saved catalog JSON.
2. Open **Actions → Sync catalog identity and history from WranglesPY** on `main`.
3. Enter its WranglesPY branch in `upstream_ref`. Use `main` after upstream merges.
4. Leave `apply_changes` off to preview changes first.
5. Enable `apply_changes` to update the database, refresh the catalog snapshot,
   generate/validate/build the documentation, and commit successful results to main.
6. Run **Publish Latest** to publish those committed results.

The protected `api-core-validation` environment supplies `WIREGUARD_CONFIG` and
`DATABASE_URL`. No credentials belong in source files. Upstream Python runs in a
separate job without database/VPN secrets. If documentation validation fails after
the database transaction, no documentation commit is pushed; fix the reported
problem and rerun. The sync is idempotent.

The existing **Validate Registry against live API-Core** workflow stays read-only.
The normal **Refresh Registry from WranglesPY** workflow can also refresh docs
against the saved catalog after synchronization.
