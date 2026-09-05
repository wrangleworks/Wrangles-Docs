# Wrangles Registry

This directory is the authoring source for the Wrangles knowledge registry.
It contains curated, reviewable Markdown records and the small supporting
schemas and fixtures needed to compile those records into product artifacts.

Start with [CONTRACT.md](CONTRACT.md). The Registry currently covers all
callable recipe wrangles reported by the pinned WranglesPY runtime manifest.
Every existing Registry record is authoritative editorial content;
`bootstrap:registry` creates missing records but never overwrites an existing
one.

The generated outputs are intentionally committed so changes to public docs,
the agent-facing bundle, and recipe hinting can be reviewed in the same pull
request as their source records.

## Source and generated directories

The similarly named Registry directories have different responsibilities:

| Directory | Responsibility | Edit directly? |
| --- | --- | --- |
| `registry/wrangles/` | Authoritative Markdown records for wrangle metadata, parameters, guidance, examples, and lifecycle | Yes |
| `wrangles-docs/registry-docs/` | Docusaurus pages generated from the authoritative records | No |
| `wrangles-docs/static/registry/` | Public machine-readable Markdown, JSON contracts, schemas, fixtures, and discovery metadata | No |

The normal flow is therefore:

```text
registry/wrangles/
        -> npm run compile:registry
wrangles-docs/registry-docs/     (human-facing pages)
wrangles-docs/static/registry/   (machine-facing artifacts)
```

`runtime/wranglespy.json` is the pinned mechanical contract exported from the
WranglesPY recipe namespace. Its producer-owned schema is copied alongside the
Registry schema under `schema/`. The compiler reconciles the manifest with the
curated Markdown and writes the reviewable result to `reports/`. It also reads
all existing `wrangles-docs/wrangle-docs/**/_sources/*.md` quasi-registry
records and accounts for the remaining aggregate and template Markdown files.
Runtime names, required status, defaults, symbols, and common controls must
agree; embedded Python schema and quasi-registry differences are retained as
migration evidence.

## Commands

Run these commands from `wrangles-docs`:

```bash
npm run bootstrap:registry
npm run compile:registry
npm run check:registry
npm run build
```

`bootstrap:registry` creates only missing Registry records. It deliberately
does not regenerate existing records because `registry/wrangles/` is the
authoritative editorial source.

`compile:registry` produces the Docusaurus pages and public raw
artifacts. `check:registry` fails when the source is invalid or the committed
generated files are stale.

## Migration Plan

The documentation-source migration and the recipe-schema migration are
separate activities. Neither is the same as deprecating or removing a callable
wrangle from the product.

Progress is tracked in
[#27: Complete Docs Registry migration and production cutover](https://github.com/wrangleworks/Wrangles-Docs/issues/27).

### Retiring Baver's local source files

The committed files under `wrangles-docs/wrangle-docs/**/_sources/` came from
the previous documentation workflow. They are currently retained as migration
input and reconciliation evidence; they are not the ongoing authoring source.

Complete this migration in the following order:

1. Inventory every `_sources` file and confirm that useful descriptions,
   examples, access requirements, and provenance are represented in
   `registry/wrangles/` or intentionally omitted.
2. Review the Registry-generated pages and establish the final routes and any
   required redirects from the previous documentation pages.
3. Remove `_sources` from Registry reconciliation and retire the old
   `_sources`-based generation and synchronization workflow, including
   `.github/agents/sync.md`.
4. Preserve a tagged or archived rollback snapshot, deploy the Registry pages,
   and then remove the obsolete `_sources` files.

This activity is complete when no supported build, compiler, or authoring
workflow reads from or writes to `_sources`.

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
   lifecycle metadata, and provenance; assign canonical database UUIDs where
   they are still missing.
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
