# Wrangles Registry

This directory is the authoring source for the Wrangles knowledge registry.
It contains curated, reviewable Markdown records and the small supporting
schemas and fixtures needed to compile those records into product artifacts.

Start with [CONTRACT.md](CONTRACT.md). The first-pass pilot covers all callable
recipe wrangles reported by the pinned WranglesPY runtime manifest. Three
entries (`convert.case`, `convert.data_type`, and `convert.from_json`) remain
hand-curated; the migration bootstrap creates the rest without overwriting
those records.

The generated outputs are intentionally committed so changes to public docs,
the agent-facing bundle, and recipe hinting can be reviewed in the same pull
request as their source records.

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

`bootstrap:registry` creates only missing Registry records. Use
`refresh:registry-bootstrap` to regenerate the non-curated first-pass records
after updating the pinned runtime manifest or migration logic.

`compile:registry` produces the pilot Docusaurus pages and public raw
artifacts. `check:registry` fails when the source is invalid or the committed
generated files are stale.

Do not edit these generated directories by hand:

- `wrangles-docs/registry-docs/`
- `wrangles-docs/static/registry/`
- `wrangles-docs/static/schemas/recipes/pilot/`
- `registry/reports/`
