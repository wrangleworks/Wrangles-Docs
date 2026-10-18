// Convert API-Core's current response to the compiler's internal snapshot model.
// Identity is catalog_key: several catalog rows legitimately share wranglesPY_key.
function normalizeApiCatalog(payload, schemaId) {
  if (!Array.isArray(payload.catalog)) return payload;
  const ids = new Set();
  const keys = new Set();
  for (const row of payload.catalog) {
    if (!/^[1-9][0-9]*$/.test(row.catalog_id) || ids.has(row.catalog_id)
        || !row.catalog_key || keys.has(row.catalog_key)
        || !['wrangle', 'connector'].includes(row.catalog_kind) || !row.wranglesPY_key
        || !row.created_at || !row.updated_at || !row.status) {
      throw new Error(`Invalid or duplicate API-Core catalog row: ${row.catalog_key}`);
    }
    ids.add(row.catalog_id);
    keys.add(row.catalog_key);
  }
  return {$schema: schemaId, format: 'wrangles-catalog-snapshot', format_version: '0.1',
    source: {system: 'API Core', repository: 'https://github.com/wrangleworks/API-Core',
      table: 'public.wrangles_catalog',
      data_updated_through: payload.catalog.map(row => row.updated_at).sort().at(-1)},
    entry_count: payload.catalog.length,
    entries: payload.catalog.map(row => ({catalog_id: row.catalog_id, catalog_key: row.catalog_key,
      kind: row.catalog_kind, wrangle_key: row.catalog_kind === 'wrangle' ? row.catalog_key : null,
      runtime_key: row.wranglesPY_key,
      title: null, registry_path: row.okf_path, status: row.status, source: 'API Core',
      created_at: row.created_at, updated_at: row.updated_at}))};
}
module.exports = {normalizeApiCatalog};
