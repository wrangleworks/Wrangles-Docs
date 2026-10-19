# Wrangles Registry

This directory is the authoring source for the Wrangles knowledge registry.
It contains curated, reviewable Markdown records and the small supporting
schemas and fixtures needed to compile those records into product artifacts.

Start with [CONTRACT.md](CONTRACT.md). Current entry counts and excluded upstream
keys are recorded in `reports/runtime-reconciliation.json`. Valid new schemas
can produce new Markdown pages before API-Core registration; their catalog ID
remains null until a real catalog row exists.
Every Registry record is authoritative editorial content.

The Registry also contains 46 Markdown connector contracts in `connectors/`. Each record
joins the API-Core catalog ID to separate `read`, `write`, and/or `run` schemas.
Connector schemas are pinned to WranglesPY 1.20.5, revision
`bd5f88fba479ec406b409cb2880689c54e72b298`. Wrangle runtime contracts use that
same source revision initially. Partial refreshes retain exact per-entry source
revisions, recorded in the saved snapshot and generated contracts.
Each Markdown record now retains the complete configuration schema, not just a
parameter projection. Full-schema or parameter drift fails compilation. Validation
preserves upstream conditional rules, requiredness and additional-property policy.
Python requiredness is separately retained as `runtime_required`.
The recipe runner requirements pin the same immutable source archive. Installing
that package is needed for recipe execution, not for snapshot extraction or
Registry generation/validation.

The generated outputs are intentionally committed so changes to public docs,
the agent-facing bundle, and recipe hinting can be reviewed in the same pull
request as their source records.

## Source and generated directories

The similarly named Registry directories have different responsibilities:

| Directory | Responsibility | Edit directly? |
| --- | --- | --- |
| `registry/catalog/api-core.json` | Sanitized, pinned projection of API Core `public.wrangles_catalog` | Import from API Core export |
| `registry/wrangles/` | Authoritative Markdown records for wrangle metadata, parameters, guidance, examples, and lifecycle | Yes |
| `registry/connectors/` | Authoritative `.md` records: YAML metadata and operation schemas, Markdown explanations/examples | Edit editorial content; import schemas |
| `registry/runtime/wranglespy-source-schema.json` | Static extraction of connector schemas, literal wrangle schemas, recipe base and unresolved source definitions | Regenerate from pinned checkout |
| `wrangles-docs/registry-docs/` | Docusaurus pages generated from the authoritative records | No |
| `wrangles-docs/static/registry/` | Public machine-readable Markdown, JSON contracts, schemas, fixtures, and discovery metadata | No |

The normal flow is therefore:

```text
registry/catalog/api-core.json + registry/runtime/wranglespy.json + registry/wrangles/
        -> npm run compile:registry
wrangles-docs/registry-docs/     (human-facing pages)
wrangles-docs/static/registry/   (machine-facing artifacts)
wrangles-docs/src/components/WrangleFlowPlayground/registryCatalog.generated.js
                                  (Registry-backed Playground catalog)
```

`runtime/wranglespy.json` is the pinned mechanical contract exported from the
WranglesPY recipe namespace. It records both the exact package version and
source revision. Its producer-owned schema is copied alongside the
Registry schema under `schema/`. The compiler reconciles the manifest directly
with the curated Markdown and writes the reviewable result to `reports/`.
Runtime names, required status, defaults, symbols, and common controls must
agree. Schema differences on our side fail the build; upstream contradictions
are listed separately in `reports/runtime-reconciliation.md`.

Each Registry entry also makes an explicit, fail-closed Recipe Writer
eligibility decision. The compiler publishes the eligible view, verifies it
against the pinned 88-key baseline, and emits checksums for every machine-facing
artifact plus a non-circular bundle checksum. The Recipe Writer schema is
stock-only and rejects broad `custom.*` and `pandas.*` extension names.

## Commands

To refresh source schemas and connector records, from the repository root run:

```bash
node wrangles-docs/scripts/import-wranglespy-schema.cjs /path/to/WranglesPY
node wrangles-docs/scripts/import-runtime-snapshot.cjs --sync-registry
```

This reads the checkout without installing or importing WranglesPY. It requires
Python 3.9+ and the Docs Node dependencies. The checkout's exact revision is
recorded. Unknown connector schema expressions or catalog coverage gaps stop
the import. Existing connector titles, descriptions, provenance and Markdown bodies
survive a refresh. New connectors require a Markdown source before import: reuse
repository documentation, check wrangles.io, then write a concise schema-based
description if neither has matching material. The
current source snapshot flags six wrangles without literal schema docstrings;
their source text is retained. The full runtime inventory includes these keys
and their statically extracted signatures, without inventing missing schemas.
`import-runtime-snapshot.cjs` uses only the saved snapshot (no checkout, package
installation, or API access). Its optional `--sync-registry` refreshes signature
fields and adds/removes parameters in existing Markdown, preserving editorial
bodies, descriptions and provenance while refreshing upstream constraints and
whole-object schema rules. Review the resulting diff and schema report.

Three upstream JSON Schema syntax corrections are explicit: `int` → `integer`
in `split.list`, unquoted YAML null → the string `null` in `transpose`, and the
non-JSON type `datetime` → `string` in `convert.data_type`. Original snapshots
remain unchanged. `maths` uses its documented `math` alias schema;
`format.price_breaks` uses a clearly labeled signature-derived schema because
upstream supplies none. These are not claims of unmodified upstream parity.

`catalog/api-core.json` preserves the 153-row `{ "catalog": [...] }` API
response supplied from the VPN. The compiler normalizes it internally and
publishes both the normalized snapshot and original response. Duplicate runtime
keys are valid: `lookup`, `lookup.key`, and `lookup.semantic` have distinct
catalog identities. The catalog-only report currently lists `map`; all 106
callable Registry entries and all 46 connectors are matched. The direct schema
audit reports the documented Excel `map` feature as not applicable to recipe
schema validation, not as passed. Lookup alias bindings remain review warnings.

Run these commands from `wrangles-docs`:

```bash
npm run import:catalog-snapshot -- /path/to/downloaded/api-core.json
npm run compile:registry
npm run generate:playground-registry
npm run check:registry
npm run build
```

`import:catalog-snapshot` accepts the full JSON response saved by
`scripts/export_api_core_catalog.py`, validates catalog identity, and replaces
the saved API response. Catalog IDs remain decimal strings. It does not read or
publish the `models` table. The older TSV projection is no longer accepted.

`compile:registry` produces the Docusaurus pages and public raw
artifacts. `check:registry` fails when the source is invalid or the committed
generated files are stale.

## Migration Plan

The documentation-source migration and the recipe-schema migration are
separate activities. Neither is the same as deprecating or removing a callable
wrangle from the product.

Progress is tracked in
[#27: Complete Docs Registry migration and production cutover](https://github.com/wrangleworks/Wrangles-Docs/issues/27).

### Documentation source cutover

The previous `_sources`-based wrangle documentation has been retired. The site,
compiler, and authoring workflow now use `registry/wrangles/` as the only stock
wrangle documentation source. Connector reference pages are generated from
`registry/connectors/`. Existing connector guide content has been migrated into
those Markdown sources. Legacy Python connector URLs redirect to canonical
Registry pages; there are no duplicate connector guide pages. Pandas guides
remain ordinary Python documentation. Both entity kinds share the Markdown
parser and YAML frontmatter conventions. JSON under `static/registry/` is a
generated machine contract, not an authoring source. See `AGENTS.md` for the
repository-wide consistency rule.

### Migrating the schema from WranglesPY to the Docs Registry

The embedded `_schema` JSON Schema docstrings in WranglesPY remain migration
input today. Runtime behavior and callable signatures continue to be owned by
WranglesPY; descriptions, parameter guidance, accepted-value constraints, and
examples move to `registry/wrangles/`.

The Registry contract remains **pre-production** until these steps are
complete:

1. Reconcile every callable wrangle and public parameter against a pinned
   WranglesPY runtime manifest, resolving every unexplained key, required-state,
   default, common-control, and accepted-value conflict.
2. Complete the Registry descriptions, constraints, examples, access metadata,
   lifecycle metadata, and provenance; reconcile every callable with its API
   Core catalog ID.
3. Stabilize and version the Registry entry schema, compiled contract, and
   recipe-schema URLs, including compatibility and change-management rules.
4. Generate the recipe JSON Schema and, where still needed, a compatible
   WranglesPY `_schema` view from the Registry; add deterministic parity checks
   so manually maintained copies cannot drift.
5. Cut over supported consumers—including WranglesXL, VS Code, APIs, the docs
   site, and Recipe Writer clients—to the Registry-generated schema and
   contracts.
6. Remove the hand-maintained WranglesPY `_schema` content, or retain only a
   generated compatibility view until every supported direct reader has
   migrated.
7. Add offline execution verification for local examples and controlled live
   verification for service-backed examples.
8. Publish and verify immutable Registry artifacts at their canonical public
   URLs, document ownership and release procedures, and tag the first
   production Registry release.

After all eight steps are complete, change the contract status from
`pre-production` to `production`. Until then, generated artifacts are suitable
for integration and review but are not the final production authority for all
consumers.

## Deprecating or removing a callable wrangle

This is the lifecycle process for an executable recipe key. It is unrelated to
retiring `_sources` or migrating the WranglesPY `_schema` content.

1. Add or verify the canonical replacement in WranglesPY, retain the old key
   for the supported compatibility period, and test that both paths behave as
   intended.
2. Export the refreshed WranglesPY runtime manifest, then set the old Registry
   record to `status: deprecated` and add `replaced_by: <canonical wrangle_key>`.
3. Run `compile:registry`, `check:registry`, and `build`. The compiler validates
   the replacement and automatically labels, links, and sorts the deprecated
   entry in both human and machine artifacts.

Do not model a deprecated callable as an alias of its replacement: keeping its
own Registry record preserves compatibility and historical recipe discovery.

Do not edit these generated directories by hand:

- `wrangles-docs/registry-docs/`
- `wrangles-docs/static/registry/`
- `wrangles-docs/static/schemas/recipes/registry/`
- `registry/reports/`

## Schema refresh workflow

In GitHub, choose **Actions → Refresh Registry from WranglesPY → Run workflow**.
`upstream_ref` defaults to `main`, resolved to an exact commit. WranglesPY is not
installed. No VPN, API-Core request, database write, or AI call is involved.

- Default is preview only: download `registry-refresh-<run-id>` from Artifacts.
  It contains `report.json`, `report.txt`, a patch of tracked changes, and an
  output archive that also contains new files.
- Select `commit_changes` to commit validated outputs to main. Branch protection
  may require applying the preview manually instead.
- Also select `publish` to dispatch the existing Publish Latest image-publishing
  workflow. No hosting infrastructure is changed by this refresh.
- This workflow is manual. A WranglesPY push trigger and live API-Core integration
  remain separate future steps.

Local equivalent after running `npm ci` in `wrangles-docs`:

```sh
python3 scripts/refresh_registry.py --checkout /path/to/WranglesPY
```

The Python script stages changes in a temporary copy. It validates each changed
entry, runs `npm run check:registry` and `npm run build`, and only then applies
the outputs. Locally it never commits or pushes. Reports go to the ignored
`registry-refresh-report/` directory even on failure.

### Editable files and ownership

For `format.clean_text`, edit `registry/wrangles/format/clean-text.md`.
For a connector, edit `registry/connectors/<runtime_key>.md`. Titles, introductory
descriptions, and Markdown explanations/examples survive refreshes. Parameter
descriptions, types, requiredness and configuration rules are schema-owned.
Tables, website pages and JSON contracts are generated, not separately authored.

New pages start with schema descriptions, not invented tutorials. Missing
descriptions receive a minimal reference notice. Existing local guides needing
migration are reported to avoid creating duplicate canonical documentation.
wrangles.io is checked and its URL/result recorded; web prose requires review,
not blind HTML copying. New execution eligibility is disabled; unknown access
requirements are null and displayed as **Not reviewed**.

### Partial refresh rules

Data-only Python schema builders are supported alongside literal YAML docstrings.
`scripts/schema_functions.py` interprets their dictionary/list construction,
local helper calls, conditions and bounded loops without importing WranglesPY
or executing its modules. Literal constants from relative modules can be read
without importing those modules. Unsupported expressions are reported per entry;
they never trigger an unrestricted Python execution fallback. The four `ai.*`
schemas use this path, retaining nested question and conditional output rules.

Catalog identity and runtime identity are separate: a canonical `math` mapping
would be `catalog_key: math, wranglesPY_key: math`; its legacy `maths` entry
could map `catalog_key: maths, wranglesPY_key: math`. The saved API-Core snapshot
currently reports `maths -> maths`. Do not silently rewrite that snapshot as if
the database had changed. Until catalog reconciliation is updated, the explicit,
reported `maths` schema fallback remains in place.

Schema Required wins over Python requiredness. `maths` uses `math`. Schema-node
aliases `int`, `str`, `bool`, `float`, `dict`, `list` normalize to JSON Schema
spellings. YAML null in a type list becomes the string `null`. Literal defaults,
examples and enum values are never rewritten. The existing explicit `datetime`
repair and `format.price_breaks` signature fallback remain reported; new entries
without readable schemas are skipped instead of inferred from Python.

A rejected entry keeps its previous Markdown and source; a rejected new entry
does not get a page. Accepted snapshot fields `entry_sources`, `connector_sources`
and `recipe_base_source` retain exact provenance. The top-level source identifies
the requested revision, not a claim that all retained definitions came from it.
Generated wrangle contracts expose `schema_source` for the accepted entry.

Missing API-Core rows use `catalog_id: null` and `catalog_status: pending-registration`.
Never invent database IDs. Connector identity additions/removals require catalog
reconciliation. A shared extraction/check/build failure prevents applying the
staged output. Concurrent edits to authoritative Registry inputs also stop apply.

Run the full failure-isolation integration test with:

```sh
REGISTRY_REFRESH_INTEGRATION=1 python3 scripts/test_refresh_registry.py
```
