# API Core Catalog Reconciliation

Generated file. Do not edit directly.

- Catalog source: `public.wrangles_catalog`
- Catalog data updated through: `2026-10-09T14:06:47Z`
- Catalog rows: 147
- Callable Registry entries: 106
- Identity matches: 100
- Connector matches: 46
- Identity conflicts: 0
- Lifecycle/status differences: 2
- Missing catalog registry paths: 100
- Catalog-only rows: 1

The compiler joins callable entries to API Core by `wrangle_key`. Missing rows
remain explicitly pending registration (6);
no database IDs are invented. Duplicate identity, key mismatch, kind mismatch,
or title mismatch fails the build.
Status and path differences remain visible migration work and do not silently
change the executable contract.

Connector records are joined by catalog key and checked against their exact
WranglesPY source revision and operation schemas. Their matches are included in
the JSON report under `matched_connectors`.

## Status differences

| Catalog ID | Wrangle key | API Core status | Registry lifecycle |
| --- | --- | --- | --- |
| `83` | `maths` | active | deprecated |
| `95` | `standardize` | active | deprecated |

## Catalog-only rows

| Catalog ID | Catalog key | Kind | Title | Reason excluded from callable Registry |
| --- | --- | --- | --- | --- |
| `99` | `map` | wrangle | — | No callable entry exists in the pinned WranglesPY runtime and Docs Registry. |
