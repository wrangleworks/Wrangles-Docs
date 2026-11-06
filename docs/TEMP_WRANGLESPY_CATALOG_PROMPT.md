# Prompt for the WranglesPY AI

Correct the catalog metadata implementation in your WranglesPY branch.

Only TWO new fields belong at the root of each recipe function's YAML docstring
schema: `catalog_id` and `status`. Remove `history` from ALL docstrings, schema
builders, generated schemas, fixtures and tests that added it. Do not put these
fields inside `properties`, signatures, titles or descriptions. Do not add
`wranglesPY_key`; the exposed function name supplies that.

```yaml
type: object
catalog_id: "3"
status: active
```

Use the supplied `registry/catalog/api-core.json` from Wrangles-Docs for IDs.
Keep all existing IDs; do not invent an ID for an unmatched existing name.
For the agreed lookup migration, use ID 81 with `status: legacy` for `lookup`,
ID 81 with `status: active` for `lookup.semantic`, and ID 101 with `status: active`
for `lookup.key`. The Docs workflow will absorb the old semantic row 102 into
row 81; do not perform that database change in WranglesPY.
The database-only `map` entry is not a recipe callable: do not invent one.

For these five pairs, the OLD name must have `status: legacy` and the CURRENT
name must have `status: active`. Both names use the same catalog ID:

| Catalog ID | Old name — legacy | Current name — active |
| --- | --- | --- |
| 90 | replace | standardize.replace |
| 63 | split.dictionary | structure.split_dictionary |
| 64 | split.list | structure.split_list |
| 65 | split.text | structure.split_text |
| 66 | split.tokenize | structure.tokenize |

All other current names receive `status: active` unless an existing intentional
legacy designation is documented. Report ambiguous identities rather than guessing.

IMPORTANT: assigning two names to the same Python function object also shares
its docstring, so it cannot give those names different statuses. Give old/current
names independently documented callables (thin compatibility wrappers are fine),
while preserving their existing signatures, defaults, behavior, and supported
Python/recipe entry points. Do not copy the full implementation unnecessarily.
Do not change a shared object's docstring twice and assume the names are separate.
Ensure the static docstrings/schema builders expose the per-name metadata, so
both runtime schema generation and this repo's static extraction see it.

Database history is calculated entirely by workflows in Wrangles-Docs:
- Old name present with legacy status -> DB history contains `"old.name": "legacy"`.
- Old name absent -> DB history contains `"old.name": "not active"`.
- Direct deletion without a legacy phase follows the same absence rule.
- The current active name becomes the row's runtime binding; its ID stays unchanged.

Do NOT implement database writes or lifecycle-sync workflows in WranglesPY.
Do NOT put `history: {}` back into any docstring. Do NOT write `not active` on a
function that still exists; absence is detected by the synchronization workflow.

Test that generated schemas contain the correct ID/status for EVERY exposed
name, contain no root `history`, and do not expose these metadata fields as recipe
arguments. Test old/current recipe behavior, signatures and defaults for all five
pairs. Update old tests asserting function-object identity to test compatibility
and independent metadata instead. Report unresolved mappings and test results.
The five existing thin wrappers and the two compatibility-test updates are
approved exceptions to the docstring-only scope. Keep them. Do not make further
implementation changes unless an existing test demonstrates a necessary fix.

Keep the catalog snapshot, task-added metadata test file and temporary artifacts
removed from WranglesPY. Preserve unrelated pre-existing edits. The supplied
catalog is a reference for IDs, not a file to commit into WranglesPY.

Report these known warnings without inventing schemas or IDs to silence them:
- maths (83) and format.price_breaks (34) lack structured schemas.
- map (99) remains catalog-only.
- Lookup bindings and the obsolete row 102 are handled by the Docs synchronization workflow.
- Connector metadata is unchanged; excel.table has no catalog row.

The Docs DB sync retains existing rows for present functions whose schemas are
missing, reports warnings, and continues with other valid identities. Missing
schemas do not mean functions were deleted. Identity conflicts retain the affected
rows and report warnings while unrelated identities continue syncing.

Run the relevant existing tests and report changed files, results, warnings and
the current branch name. Leave all changes uncommitted on codex/catalog-schema-ids.
Do not commit, push or create PRs. I will commit and push the branch myself.
