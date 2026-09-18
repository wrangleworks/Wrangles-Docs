# Wrangles Registry

This directory is the authoring source for the Wrangles knowledge registry.
It contains curated, reviewable Markdown records and the small supporting
schemas and fixtures needed to compile those records into product artifacts.

Start with [CONTRACT.md](CONTRACT.md). The Registry currently covers all
callable recipe wrangles reported by the pinned WranglesPY runtime manifest.
Every Registry record is authoritative editorial content.

The generated outputs are intentionally committed so changes to public docs,
the agent-facing bundle, and recipe hinting can be reviewed in the same pull
request as their source records.

## Source and generated directories

The similarly named Registry directories have different responsibilities:

| Directory | Responsibility | Edit directly? |
| --- | --- | --- |
| `registry/catalog/api-core.json` | Sanitized, pinned projection of API Core `public.wrangles_catalog` | Import from API Core export |
| `registry/wrangles/` | Authoritative Markdown records for wrangle metadata, parameters, guidance, examples, and lifecycle | Yes |
| `wrangles-docs/registry-docs/` | Docusaurus pages generated from the authoritative records | No |
| `wrangles-docs/static/registry/` | Public machine-readable Markdown, JSON contracts, schemas, fixtures, and discovery metadata | No |

The normal flow is therefore:

```text
registry/catalog/api-core.json + registry/runtime/wranglespy.json + registry/wrangles/
        -> npm run compile:registry
wrangles-docs/registry-docs/     (human-facing pages)
wrangles-docs/static/registry/   (machine-facing artifacts)
wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js
                                  (Registry-backed Playground catalog)
```

`runtime/wranglespy.json` is the pinned mechanical contract exported from the
WranglesPY recipe namespace. It records both the exact package version and
source revision. Its producer-owned schema is copied alongside the
Registry schema under `schema/`. The compiler reconciles the manifest directly
with the curated Markdown and writes the reviewable result to `reports/`.
Runtime names, required status, defaults, symbols, and common controls must
agree; embedded Python schema differences are retained as migration evidence.

Each Registry entry also makes an explicit, fail-closed Recipe Writer
eligibility decision. The compiler publishes the eligible view, verifies it
against the pinned 88-key baseline, and emits checksums for every machine-facing
artifact plus a non-circular bundle checksum. The Recipe Writer schema is
stock-only and rejects broad `custom.*` and `pandas.*` extension names.

## Commands

Run these commands from `wrangles-docs`:

```bash
npm run import:catalog-snapshot -- ../wrangles_catalog.csv
npm run compile:registry
npm run generate:wrangle-catalog
npm run check:registry
npm run build
```

`import:catalog-snapshot` accepts the tab-separated export of
`public.wrangles_catalog`, converts every database `BIGINT` ID to a JSON string,
and replaces the sanitized snapshot deterministically. It does not read or
publish the `models` table.

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
wrangle documentation source. Connector and Pandas guides remain in the normal
Python documentation until those entity kinds are added to the Registry.

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
