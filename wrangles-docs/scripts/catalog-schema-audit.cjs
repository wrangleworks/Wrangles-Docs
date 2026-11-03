// Compare DB identity/binding fields directly with pinned WranglesPY sources.
// Database lifecycle, IDs, paths, notes and model types are not schema facts.
const {configurationSchema} = require('./wrangle-schema.cjs');
const {catalogForName} = require('./api-core-catalog.cjs');

function auditCatalogSchema(catalog, snapshot, runtimeManifest) {
  const runtime = new Map(runtimeManifest.wrangles.map(item => [item.runtime_key, item]));
  const rows = catalog.catalog.map(row => {
    const key = row.wranglesPY_key;
    const result = {catalog_key: row.catalog_key, runtime_key: key,
      catalog_kind: row.catalog_kind, status: 'passed', issues: [],
      source: (row.catalog_kind === 'connector' ? snapshot.connector_sources?.[key]
        : snapshot.entry_sources?.[key]) || snapshot.source};
    const issue = (severity, code) => {
      result.issues.push({severity, code});
      if (severity === 'error') result.status = 'failed';
      else if (severity === 'warning' && result.status !== 'failed') result.status = 'review-required';
    };
    if (row.catalog_kind === 'connector') {
      const operations = snapshot.connectors[key];
      if (!operations) issue('error', 'connector_binding_missing_in_schema');
      else {
        result.operations = Object.keys(operations).filter(op => ['read', 'write', 'run'].includes(op));
        if (!result.operations.length) issue('error', 'connector_has_no_schema_operations');
        result.schema_origin = 'pinned-connector-schema';
      }
      if (row.catalog_key !== `connector.${key}`) issue('warning', 'catalog_key_binding_difference');
    } else if (row.catalog_kind === 'wrangle') {
      const callable = runtime.get(key);
      // API-Core maps purpose=schema to the Excel Map feature, not a recipe callable.
      // If upstream ever adds a callable, validate it normally instead.
      if (!callable && row.status === 'not active') {
        result.status = 'not-applicable';
        result.reason = 'Removed upstream; retained catalog identity and history only.';
      } else if (!callable && row.catalog_key === 'map' && key === 'map' && row.wrangle_type === 'map') {
        result.status = 'not-applicable';
        result.source = null;
        result.reason = 'Excel column mapping (API-Core purpose=schema); WranglesPY recipe schema validation does not apply.';
        result.documentation = 'wrangles-docs/docs/excel/map.md';
        issue('info', 'documented_non_recipe_map');
      } else if (!callable) issue('error', 'wrangle_binding_missing_in_pinned_runtime');
      else {
        try {
          const projected = configurationSchema(callable, snapshot);
          result.schema_origin = projected.origin;
          result.adjustments = projected.adjustments;
          if (projected.origin === 'deprecated-alias:math') issue('info', 'accepted_math_schema_alias');
          else if (projected.origin !== 'upstream-docstring') issue('warning', 'explicit_schema_fallback');
          if (projected.adjustments.some(value => value.startsWith('Normalize schema type '))) {
            issue('info', 'equivalent_type_spelling_normalized');
          }
          if (projected.adjustments.some(value => !value.startsWith('Normalize schema type '))) {
            issue('warning', 'upstream_schema_correction');
          }
        } catch {
          issue('error', 'readable_configuration_schema_missing');
        }
      }
      // A different identity is not automatically an invalid binding. Schema
      // existence cannot establish whether the alias is semantically intended.
      if (row.catalog_key !== key) issue('warning', 'catalog_key_binding_difference');
    } else issue('error', 'unsupported_catalog_kind');
    return result;
  });
  const identities = new Set(catalog.catalog.map(row => `${row.catalog_kind}:${row.catalog_key}`));
  for (const row of catalog.catalog.filter(row => row.catalog_kind === 'wrangle')) {
    identities.add(`wrangle:${row.wranglesPY_key}`);
    for (const [name, state] of Object.entries(row.history || {})) {
      if (state === 'legacy') identities.add(`wrangle:${name}`);
    }
  }
  const identityRows = catalog.catalog.map(row => ({...row, kind: row.catalog_kind, runtime_key: row.wranglesPY_key}));
  for (const item of runtimeManifest.wrangles) {
    const metadata = snapshot.wrangles[item.runtime_key]?.schema || {};
    if (metadata.catalog_id) {
      try {
        if (catalogForName(identityRows, item.runtime_key, metadata.catalog_id)) {
          identities.add(`wrangle:${item.runtime_key}`);
        }
      } catch { /* Conflicting identities remain missing and fail coverage. */ }
    }
  }
  const missing = [
    ...runtimeManifest.wrangles.filter(row => !identities.has(`wrangle:${row.runtime_key}`)).map(row => row.runtime_key),
    ...Object.keys(snapshot.connectors).filter(key => !identities.has(`connector:connector.${key}`)).map(key => `connector.${key}`),
  ].sort();
  return {format: 'catalog-schema-audit', source: snapshot.source,
    scope: 'Saved pinned WranglesPY source; not latest main or deployed API runtime.',
    checked_fields: ['catalog_kind', 'wranglesPY_key', 'catalog_key (identity coverage and alias review)'],
    not_schema_validatable: ['catalog_id', 'status', 'wrangle_type', 'okf_path', 'notes', 'created_at', 'updated_at'],
    limitations: 'Catalog contains no parameter contracts or structured operation list to compare. Alias meaning needs review. Full Registry configuration schemas are validated separately.',
    summary: {rows: rows.length, passed: rows.filter(row => row.status === 'passed').length,
      review_required: rows.filter(row => row.status === 'review-required').length,
      not_applicable: rows.filter(row => row.status === 'not-applicable').length,
      failed: rows.filter(row => row.status === 'failed').length,
      schema_entries_missing_catalog_identity: missing.length},
    missing_catalog_identities: missing, rows};
}
module.exports = {auditCatalogSchema};
