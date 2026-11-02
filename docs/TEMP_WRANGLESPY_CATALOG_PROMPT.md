# Prompt for the WranglesPY session

Add catalog identity/lifecycle metadata to recipe wrangle schemas on this branch.
Use the supplied `registry/catalog/api-core.json` from Wrangles-Docs as the
existing-ID mapping. Do not change runtime behavior or add recipe arguments.

- Put `catalog_id` (quoted decimal string), `status: active`, and `history: {}`
  at the root of each YAML docstring schema, never inside `properties` or prose.
- Derive names from the publicly exposed recipe functions. Do NOT add
  `wranglesPY_key` or the rest of the database catalog to docstrings.
- Preserve existing IDs. Match existing entries by their exact runtime key;
  report ambiguous mappings rather than guessing. Lookup IDs are 81 for lookup,
  101 for lookup.key, 102 for lookup.semantic; their DB bindings need correction.
- These five pairs intentionally share an ID AND a docstring. Keep their row
  status active; record ONLY the old name as legacy in their shared history:

| ID | Current name | History |
| --- | --- | --- |
| 90 | standardize.replace | `{replace: legacy}` |
| 63 | structure.split_dictionary | `{split.dictionary: legacy}` |
| 64 | structure.split_list | `{split.list: legacy}` |
| 65 | structure.split_text | `{split.text: legacy}` |
| 66 | structure.tokenize | `{split.tokenize: legacy}` |

For example, both exposed schemas for ID 63 must carry:

```yaml
catalog_id: "63"
status: active
history:
  split.dictionary: legacy
```

Do not mark the shared function status legacy: that would affect its current
name too. No wrappers or duplicate docstrings are necessary. Other existing
aliases must be reported if identity allocation is ambiguous; do not silently
assign two unrelated names one ID. Do not fabricate IDs for missing matches.
The catalog-only `map` entry is not a recipe callable; do not invent one.

Ensure generated recipe schemas retain these root metadata fields for every
exposed name, including dynamically generated docstrings. Keep signatures,
descriptions, properties, defaults and validation behavior unchanged. Test schema
metadata, alias parity, and unchanged recipe execution. Report unmatched names
and IDs, run the appropriate tests, and open a PR; do not merge it yet.
