const test = require('node:test');
const assert = require('node:assert/strict');
const {auditCatalogSchema} = require('./catalog-schema-audit.cjs');
const catalog = require('../../registry/catalog/api-core.json');
const snapshot = require('../../registry/runtime/wranglespy-source-schema.json');
const runtime = require('../../registry/runtime/wranglespy.json');
test('catalog bindings are checked directly and non-schema fields are excluded', () => {
  const report = auditCatalogSchema(catalog, snapshot, runtime);
  assert.equal(report.summary.rows, 153);
  assert.equal(report.summary.schema_entries_missing_catalog_identity, 0);
  assert.equal(report.summary.failed, 0);
  assert.equal(report.summary.not_applicable, 1);
  const map = report.rows.find(row => row.catalog_key === 'map');
  assert.equal(map.status, 'not-applicable');
  assert.equal(map.source, null);
  assert.match(map.reason, /Excel column mapping/);
  assert.ok(report.not_schema_validatable.includes('wrangle_type'));
  assert.equal(report.rows.find(row => row.catalog_key === 'maths').schema_origin, 'deprecated-alias:math');
  assert.equal(report.rows.find(row => row.catalog_key === 'maths').status, 'passed');
  assert.equal(report.rows.find(row => row.catalog_key === 'split.list').status, 'passed');
  assert.equal(report.rows.find(row => row.catalog_key === 'format.price_breaks').schema_origin, 'signature-derived');
  assert.equal(report.rows.find(row => row.catalog_key === 'lookup.key').status, 'review-required');
  assert.deepEqual(report.rows.find(row => row.catalog_key === 'connector.file').operations.sort(), ['read', 'write']);
});
test('Map exception is exact and never hides a future runtime callable', () => {
  const map = catalog.catalog.find(row => row.catalog_key === 'map');
  for (const change of [
    {catalog_key: 'maps'}, {wranglesPY_key: 'maps'},
    {catalog_kind: 'connector'}, {wrangle_type: 'recipe'},
  ]) {
    const report = auditCatalogSchema({catalog: [{...map, ...change}]}, snapshot, runtime);
    assert.equal(report.rows[0].status, 'failed', JSON.stringify(change));
  }
  const callable = {...runtime.wrangles.find(row => row.runtime_key === 'convert.case'), runtime_key: 'map'};
  const report = auditCatalogSchema({catalog: [map]}, snapshot, {...runtime, wrangles: [...runtime.wrangles, callable]});
  assert.notEqual(report.rows[0].status, 'not-applicable');
});
test('wrong kind, nonexistent binding and missing catalog identities are detected', () => {
  const changed = structuredClone(catalog);
  changed.catalog.find(row => row.catalog_key === 'ai.choose').wranglesPY_key = 'nonexistent';
  changed.catalog.find(row => row.catalog_key === 'connector.file').catalog_kind = 'wrangle';
  changed.catalog = changed.catalog.filter(row => row.catalog_key !== 'convert.parse');
  const report = auditCatalogSchema(changed, snapshot, runtime);
  assert.equal(report.rows.find(row => row.catalog_key === 'ai.choose').status, 'failed');
  assert.equal(report.rows.find(row => row.catalog_key === 'connector.file').status, 'failed');
  assert.ok(report.missing_catalog_identities.includes('convert.parse'));
  assert.ok(report.missing_catalog_identities.includes('connector.file'));
});
