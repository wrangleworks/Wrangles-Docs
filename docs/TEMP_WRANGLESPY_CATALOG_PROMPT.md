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
Lookup IDs are 81 for `lookup`, 101 for `lookup.key`, and 102 for
`lookup.semantic`; the last two database runtime bindings are awaiting correction.
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
Keep this work on the WranglesPY branch for review and give me its branch name.
