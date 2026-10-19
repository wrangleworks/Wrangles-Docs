# Wrangles Docs

The active website is in `wrangles-docs/`. Wrangles and connectors are authored
in Markdown under `registry/`; the compiler generates their reference pages,
parameter tables, recipe schemas and machine-readable contracts.

## Working locally

Run these commands from `wrangles-docs/`:

```sh
npm ci
npm run check:registry
npm run build
npm start
```

Docker uses `wrangles-docs/start_prod.py` and `run_recipe.py` in production.
The Node development server and recipe runner remain under `wrangles-docs/scripts/`.

## Sources and generated files

- `registry/wrangles/` and `registry/connectors/`: canonical Markdown records.
- `registry/runtime/`: saved WranglesPY source and runtime snapshots.
- `registry/catalog/api-core.json`: saved API-Core catalog response, not live DB access.
- `wrangles-docs/docs/`: XL and account guides.
- `wrangles-docs/registry-docs/python/`: manually maintained Python guides.
- Other `registry-docs/` reference pages and `static/registry/` contracts are generated.
- Legacy URL redirects are intentional compatibility files, not duplicate documentation.

Schema refreshes preserve editorial Markdown. Schema parameters and rules are
updated automatically. Unsupported changes are isolated and reported; valid
entries continue. See [Registry instructions](registry/README.md) and
[the contract](registry/CONTRACT.md) for ownership and validation details.

## Refreshing the Registry

```sh
python3 scripts/refresh_registry.py --checkout /path/to/WranglesPY
```

The manual **Refresh Registry from WranglesPY** GitHub workflow runs the same
refresh, validation and build. Its default is an artifact-only preview;
committing and publishing are explicit options. WranglesPY is read without
installing or importing it. Live catalog validation is a separate manual workflow;
automatic upstream push triggers are not connected yet.

Registry release: **0.3.1** (pre-production), tag `registry-v0.3.1`.
Contract version remains `0.3`; source entry schema remains `0.2`.
The tagged source archive includes generated Registry artifacts and their
integrity manifest. Use the tag for reproducibility, not the moving main branch.

### Manual live API-Core validation over WireGuard

`.github/workflows/validate-api-core.yml` is a manual, main-only check using
`https://internal-api.wrangle.works` (currently routed to dev). It does not write
to the database, commit files, or deploy. A successful run confirms catalog
identity coverage and schema/build checks, not universal runtime correctness.
Lifecycle and runtime-binding differences are reported as warnings; missing
wrangle registrations and identity conflicts fail the run.

The workflow also compares catalog bindings directly against the saved pinned
WranglesPY schema/runtime, independently of Registry Markdown. The generated
`registry/reports/catalog-schema-audit.json` records kind/binding existence,
identity coverage, connector operations available in the schema, and explicit
schema fallbacks/normalizations. It does not infer DB lifecycle, model types
(`wrangle_type`), IDs, dates, paths or notes from schemas. The table has no
parameter contracts to compare. Different catalog/runtime keys require alias
review; a valid target key alone does not prove the intended behavior.
The workflow uploads this key-level audit (no credentials or DB notes) and fails
its direct catalog/schema gate for missing bindings or registration identities.
The exact `map` identity/binding with kind `wrangle` and type `map` is reported
as `not-applicable`, not passed: API-Core maps model purpose `schema` to this
documented Excel column-mapping feature (`wrangles-docs/docs/excel/map.md`).
Only its missing recipe callable/schema check is excluded; normal catalog
identity/duplicate validation remains. It is not added to Recipe Writer or
deleted from the DB. Other missing bindings still fail. If WranglesPY adds a
`map` callable, it is validated normally rather than excluded.
Docs builds can still generate the diagnostic report without publishing a false
all-catalog-bindings-passed claim. This checks the recorded upstream revision,
not automatically the latest WranglesPY main or the deployed API-Core version.

Before running, create **Settings → Environments → api-core-validation**.
Restrict deployment branches to **main** and configure required reviewers.
Add `WIREGUARD_CONFIG` as an **environment secret** containing the complete
WireGuard config. This is an Actions secret, not a Codespaces secret. Optional
`API_CORE_TOKEN` or `API_CORE_API_KEY` can be added there if required (not both).
Add `DATABASE_URL` to the same environment for direct database fallback, preferably
using a user granted SELECT only on `public.wrangles_catalog`. The URL must point
to the intended catalog database; fallback cannot prove which DB the API uses.
On API HTTP 404/5xx or connection failure, the exporter reads that table in a
read-only transaction while the VPN is still connected. HTTP 401/403 and invalid
API payloads do not trigger fallback. If both sources fail, the workflow fails.
The job summary/artifact identifies `direct-database` and explicitly marks the API
fetch unsuccessful. A successful DB comparison does not mean API-Core works.
Protect main and review changes to workflow/helper code before approving access.
Anyone who can run modified code with the secret can potentially disclose it;
log masking is not an authorization boundary.

The existing config is used unchanged, including `AllowedIPs = 0.0.0.0/0`.
Disconnect the Mac peer using that same config while the workflow runs.
The VPN must support internet egress for the runner's full-tunnel traffic.
Linux DNS/config compatibility and actual network access must be tested in GitHub.
Dependencies are installed before connecting; VPN teardown and secret-file
cleanup happen immediately after catalog download, with a second always-run
cleanup step. No cached-catalog fallback is used on connection failure.

Run **Actions → Validate Registry against live API-Core → Run workflow → main**.
Only source/status metadata, schema-audit keys/reasons and a counts report are uploaded; raw catalog data, VPN config, VPN logs and
detailed internal reports are not published as artifacts in this public repo.
The existing schema-refresh workflow remains separate and uses the saved snapshot.

For a fresh catalog snapshot from a VPN-connected computer, use
`scripts/export_api_core_catalog.py`, then import the result with
`wrangles-docs/scripts/import-catalog-snapshot.cjs`.

[Catalog reconciliation](registry/reports/catalog-reconciliation.md) lists
missing entries, lifecycle differences and bindings requiring review.
Database identities must be allocated by API-Core's database, never guessed.
Catalog-only model concepts are not automatically executable recipe wrangles.

## Removed legacy tooling

The old Wiki migration, `wranglesio_content` seed/generation pipeline,
completed connector seed, obsolete endpoint-discovery scripts, empty prototype
site and unused Node/nginx production launchers have been retired. Their code
remains recoverable from Git history. They must not be reintroduced as alternate
authoring or deployment paths.

Agent integration, saved-model previews and automatic live API-Core validation
remain separate work; successful schema checks do not prove runtime execution.
