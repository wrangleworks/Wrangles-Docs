const test = require('node:test');
const assert = require('node:assert/strict');
const {auditCatalogSchema} = require('./catalog-schema-audit.cjs');
const catalog = require('../../registry/catalog/api-core.json');
const snapshot = require('../../registry/runtime/wranglespy-source-schema.json');
const runtime = require('../../registry/runtime/wranglespy.json');
test('legacy history supplies identity coverage but cannot hide missing current callables', () => {
  const changed = structuredClone(catalog);
  const row = changed.catalog.find(row => row.catalog_key === 'split.dictionary');
  row.history = {'split.dictionary': 'legacy'};
  row.catalog_key = row.wranglesPY_key = 'structure.split_dictionary';
  const report = auditCatalogSchema(changed, snapshot, runtime);
  assert.ok(!report.missing_catalog_identities.includes('split.dictionary'));
  assert.equal(report.summary.failed, 1);
  const refreshedRuntime = structuredClone(runtime);
  const refreshedSnapshot = structuredClone(snapshot);
  refreshedRuntime.wrangles.push({...structuredClone(runtime.wrangles.find(item => item.runtime_key === 'split.dictionary')),
    runtime_key: 'structure.split_dictionary'});
  refreshedSnapshot.wrangles['structure.split_dictionary'] = structuredClone(snapshot.wrangles['split.dictionary']);
  const refreshed = auditCatalogSchema(changed, refreshedSnapshot, refreshedRuntime);
  assert.equal(refreshed.summary.failed, 0);
  assert.deepEqual(refreshed.missing_catalog_identities, auditCatalogSchema(catalog, snapshot, runtime).missing_catalog_identities);
});
test('catalog bindings are checked directly and non-schema fields are excluded', () => {
  const report = auditCatalogSchema(catalog, snapshot, runtime);
  assert.equal(report.summary.rows, catalog.catalog.length);
  assert.equal(report.summary.schema_entries_missing_catalog_identity, report.missing_catalog_identities.length);
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
test('new unregistered wrangles are reported without blocking documentation checks', () => {
  const row = catalog.catalog.find(row => row.catalog_key === 'convert.case');
  const callable = runtime.wrangles.find(row => row.runtime_key === 'convert.case');
  const sources = {...snapshot, connectors: {}};
  const baseline = {wrangles: [callable]};
  assert.equal(auditCatalogSchema({catalog: [row]}, sources, baseline).summary.schema_entries_missing_catalog_identity, 0);
  const report = auditCatalogSchema({catalog: [row]}, sources, {
    wrangles: [callable, {...callable, runtime_key: 'format.new_entry'}],
  });
  assert.deepEqual(report.missing_catalog_identities, ['format.new_entry']);
  assert.equal(report.summary.schema_entries_missing_catalog_identity, 1);
  assert.equal(report.summary.failed, 0);
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
