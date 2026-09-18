# API Core Catalog Reconciliation

Generated file. Do not edit directly.

- Catalog source: `public.wrangles_catalog`
- Catalog data updated through: `2026-09-16T08:44:50.975472Z`
- Catalog rows: 99
- Callable Registry entries: 98
- Identity matches: 98
- Identity conflicts: 0
- Lifecycle/status differences: 2
- Missing catalog registry paths: 98
- Catalog-only rows: 1

The compiler joins callable entries to API Core by `wrangle_key`. A missing row,
duplicate identity, key mismatch, kind mismatch, or title mismatch fails the build.
Status and path differences remain visible migration work and do not silently
change the executable contract.

## Status differences

| Catalog ID | Wrangle key | API Core status | Registry lifecycle |
| --- | --- | --- | --- |
| `83` | `maths` | active | deprecated |
| `95` | `standardize` | active | deprecated |

## Catalog-only rows

| Catalog ID | Catalog key | Kind | Title | Reason excluded from callable Registry |
| --- | --- | --- | --- | --- |
| `99` | `map` | wrangle | Map | No callable entry exists in the pinned WranglesPY runtime and Docs Registry. |
