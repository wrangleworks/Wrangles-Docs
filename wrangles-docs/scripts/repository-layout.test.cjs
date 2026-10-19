const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const {normalizeApiCatalog} = require('./api-core-catalog.cjs');

test('retired migration and alternate production scripts cannot return unnoticed', () => {
  for (const file of [
    'migrate.py', 'my-docs-site/wrangle-docs/compare/compare.md',
    'scripts/seed_connector_catalog.py', 'scripts/seed_wranglesio_content.py',
    'scripts/seed_wrangle_examples.py', 'scripts/generate_wrangle_docs_from_db.py',
    'scripts/test_api_core_paths.sh', 'scripts/test_api_core_all_paths.sh',
    'scripts/probe_api_core.sh',
    'wrangles-docs/scripts/convert-recipe-examples.cjs',
    'wrangles-docs/scripts/start-prod.cjs', 'wrangles-docs/deploy/default.conf',
  ]) assert.equal(fs.existsSync(path.join(root, file)), false, file);
});

test('editor authoring folders exist and exclude generated reference copies', () => {
  const config = JSON.parse(fs.readFileSync(path.join(root, 'frontmatter.json')));
  const expected = ['wrangles-docs/docs', 'wrangles-docs/registry-docs/python',
    'registry/wrangles', 'registry/connectors'];
  assert.deepEqual(config['frontMatter.content.pageFolders'].map(folder =>
    folder.path.replace('[[workspace]]/', '')), expected);
  for (const folder of expected) assert.ok(fs.statSync(path.join(root, folder)).isDirectory());
});

test('catalog normalization preserves runtime bindings separately from identity', () => {
  const payload = {catalog: [{catalog_id: '1', catalog_kind: 'wrangle',
    catalog_key: 'lookup.semantic', wranglesPY_key: 'lookup', status: 'active',
    okf_path: null, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z'}]};
  const entry = normalizeApiCatalog(payload, 'test').entries[0];
  assert.equal(entry.wrangle_key, 'lookup.semantic');
  assert.equal(entry.runtime_key, 'lookup');
  assert.equal(entry.catalog_id, '1');
});
