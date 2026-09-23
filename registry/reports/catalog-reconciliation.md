# API Core Catalog Reconciliation

Generated file. Do not edit directly.

- Catalog source: `public.wrangles_catalog`
- Catalog data updated through: `2026-09-21T09:29:40.543681Z`
- Catalog rows: 101
- Callable Registry entries: 98
- Identity matches: 98
- Identity conflicts: 0
- Additional catalog bindings: 2
- Additional binding conflicts: 0
- Canonical lifecycle/status differences: 2
- Additional binding lifecycle/status differences: 0
- Missing canonical catalog registry paths: 98
- Catalog-only rows: 1

The canonical row has `catalog_key = wrangle_key`; additional catalog keys may
share its callable. Canonical identity never depends on snapshot order. A missing
canonical row, duplicate identity/key, or incompatible kind fails the build.
Canonical titles must match Docs; additional bindings retain their own titles.
Status and path differences remain visible migration work and do not silently
change the executable contract.

## Additional bindings

| Catalog ID | Catalog key | Wrangle key | Canonical catalog ID |
| --- | --- | --- | --- |
| `101` | `lookup.key` | `lookup` | `81` |
| `102` | `lookup.semantic` | `lookup` | `81` |

## Status differences

| Catalog ID | Wrangle key | API Core status | Registry lifecycle |
| --- | --- | --- | --- |
| `83` | `maths` | active | deprecated |
| `95` | `standardize` | active | deprecated |

## Catalog-only rows

| Catalog ID | Catalog key | Kind | Title | Reason excluded from callable Registry |
| --- | --- | --- | --- | --- |
| `99` | `map` | wrangle | Map | No callable entry exists in the pinned WranglesPY runtime and Docs Registry. |
