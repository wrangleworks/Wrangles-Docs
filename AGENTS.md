# Repository consistency rules

Consistency is a repository requirement for every change, not an optional cleanup.

- Registry wrangles and connectors use Markdown (`.md`) with YAML frontmatter as
  their authoritative authoring format. Metadata belongs in frontmatter;
  explanations, guidance, and examples belong in the Markdown body. Do not add
  JSON-authored connector or wrangle records or a second editable documentation copy.
- JSON is appropriate for extracted runtime/schema snapshots and generated
  machine-readable contracts. Generate those contracts from the Markdown sources.
- Reuse existing repository documentation first. When material is missing, check
  wrangles.io. If no matching material is available, write a concise description
  supported by the pinned schema and record the provenance. Never invent behavior.
- Use the same naming, source parsing, presentation conventions, copyable recipe
  keys, parameter ordering, and validation rules across equivalent Registry features.
  Read/write/run operations have distinct contracts but share the authoring format.
- Keep Conditions parameters last. Generate parameter tables from validated
  metadata; do not maintain parallel handwritten copies of those tables.
- Preserve the complete upstream configuration schema, including conditional
  rules and additional-property behavior. Do not rebuild it from a flat parameter
  list. Keep schema requiredness separate from Python `runtime_required`.
- Fail on Registry schema drift. Record upstream defects, syntax corrections and
  missing-schema fallbacks explicitly; never label normalized or derived schemas
  as unmodified upstream parity.
- Schema requiredness wins over Python signature defaults. Normalize equivalent
  type spellings only in schema nodes, never in examples or literal values.
- Automated refreshes isolate entry failures: retain an existing entry's last
  valid source and Markdown, skip invalid new entries, and report the exact
  retained revision. Never weaken validation to publish a broken entry. A shared
  build failure prevents applying/publishing the staged result.
- New wrangles may be documented before API-Core registration: use a null catalog
  ID and explicit pending-registration status, never invent a database ID. Unknown
  access requirements remain null (Not reviewed); new execution eligibility is off.
- Schema refreshes must preserve editorial Markdown, titles, descriptions, and
  provenance. Keep one canonical Registry page per entry. Old documentation URLs
  must redirect to canonical Registry pages, not retain duplicate Markdown pages.
- Update importers, compilers, schemas, discovery manifests, documentation, tests,
  and generated artifacts together. Remove superseded sources after preserving
  their content. Add checks that reject format drift and stale generated outputs.
- Before completing a Registry change, run `npm run check:registry` and
  `npm run build` in `wrangles-docs`. Do not claim universal semantic correctness
  based only on a build; report any observed unresolved inconsistencies explicitly.
