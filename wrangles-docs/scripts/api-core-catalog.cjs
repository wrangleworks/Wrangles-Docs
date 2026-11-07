// Convert API-Core's current response to the compiler's internal snapshot model.
// Catalog IDs identify rows; catalog keys control documentation placement.
// Multiple catalog rows can legitimately share a runtime binding.
function normalizeApiCatalog(payload, schemaId) {
  if (!Array.isArray(payload.catalog)) return payload;
  const ids = new Set();
  const keys = new Set();
  for (const row of payload.catalog) {
    if (row.history !== undefined && (!row.history || typeof row.history !== 'object'
        || Array.isArray(row.history) || Object.values(row.history).some(value => !['legacy', 'not active'].includes(value)))) {
      throw new Error(`Invalid catalog history: ${row.catalog_key}`);
    }
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
      ...(row.history === undefined ? {} : {history: row.history}),
      title: null, registry_path: row.okf_path, status: row.status, source: 'API Core',
      created_at: row.created_at, updated_at: row.updated_at}))};
}
// A page retains its recipe name even when it shares a catalog identity.
function catalogForName(rows, key, id = null) {
  const wrangles = rows.filter(row => row.kind === 'wrangle');
  const named = row => row.catalog_key === key || row.runtime_key === key || row.history?.[key] === 'legacy';
  let matches;
  if (id !== null && id !== undefined) {
    matches = wrangles.filter(row => String(row.catalog_id) === String(id));
    // Explicit IDs are authoritative across renames; status belongs to each name.
  } else {
    matches = wrangles.filter(row => row.catalog_key === key || row.history?.[key] === 'legacy');
    if (!matches.length) matches = wrangles.filter(row => row.runtime_key === key);
  }
  if (matches.length > 1) throw new Error(`Ambiguous catalog identity: ${key}`);
  return matches[0] || null;
}

module.exports = {normalizeApiCatalog, catalogForName};
