# API Core Catalog Reconciliation

Generated file. Do not edit directly.

- Catalog source: `public.wrangles_catalog`
- Catalog data updated through: `2026-10-18T10:01:30Z`
- Catalog rows: 153
- Callable Registry entries: 106
- Identity matches: 106
- Connector matches: 46
- Identity conflicts: 0
- Lifecycle/status differences: 2
- Runtime binding differences requiring review: 2
- Missing catalog registry paths: 106
- Catalog-only rows: 1

The compiler joins callable entries to API Core by `wrangle_key`. Missing rows
remain explicitly pending registration (0);
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

## Missing catalog entries

None.

Allocate IDs in the database; do not copy or guess IDs from documentation.

## Runtime bindings requiring review

| Catalog ID | Catalog key | API-Core wranglesPY_key | Documented callable key |
| --- | --- | --- | --- |
| `101` | `lookup.key` | `lookup` | `lookup.key` |
| `102` | `lookup.semantic` | `lookup` | `lookup.semantic` |

Different keys can be intentional aliases. Review the implementation before
changing a binding; this report does not rewrite API-Core data. Missing
`okf_path` values are optional publication metadata, not missing schemas.

## Catalog-only rows

| Catalog ID | Catalog key | Kind | Title | Reason excluded from callable Registry |
| --- | --- | --- | --- | --- |
| `99` | `map` | wrangle | — | No callable entry exists in the pinned WranglesPY runtime and Docs Registry. |
