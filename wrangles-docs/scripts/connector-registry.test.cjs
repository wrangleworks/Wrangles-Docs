const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const {spawnSync} = require('node:child_process');
const yaml = require('js-yaml');
const {parseRegistryMarkdown, serializeRegistryMarkdown} = require('./registry-markdown.cjs');
const Ajv = require('ajv');
const {readConnector, loadConnectors, compiledConnector} = require('./connector-registry.cjs');
const {normalizeApiCatalog} = require('./api-core-catalog.cjs');
const root = path.resolve(__dirname, '../..');
const catalog = require('../../registry/catalog/api-core.json');
const snapshot = require('../../registry/runtime/wranglespy-source-schema.json');
const manifest = require('../static/registry/manifest.json');
const schema = require('../static/schemas/recipes/registry/schema.json');

test('wrangles and connectors share the saved source pin and runtime signatures are current', () => {
  const runtime = require('../../registry/runtime/wranglespy.json');
  const report = require('../../registry/reports/runtime-reconciliation.json');
  const {repository, version, revision} = snapshot.source;
  assert.deepEqual(runtime.source, {repository, version, revision});
  assert.match(version, /^\d+\.\d+\.\d+/);
  assert.ok(fs.readFileSync(path.join(root, 'wrangles-docs/requirements.txt'), 'utf8')
    .includes(`https://github.com/wrangleworks/WranglesPY/archive/${revision}.tar.gz`));
  assert.equal(runtime.entry_count, Object.keys(snapshot.wrangle_definitions).length);
  assert.ok(runtime.entry_count >= 98);
  assert.equal(report.summary.normalized_verified_entries, manifest.entry_count);
  assert.equal(report.summary.normalized_conflicting_entries, 0);
  assert.deepEqual(report.runtime_without_normalized_registry,
    runtime.wrangles.map(entry => entry.runtime_key).filter(key => !manifest.entries.some(entry => entry.wrangle_key === key)).sort());
  for (const entry of runtime.wrangles) {
    const definition = snapshot.wrangle_definitions[entry.runtime_key];
    assert.equal(entry.signature, definition.signature);
    assert.equal(entry.python_symbol, definition.python_symbol);
    assert.deepEqual(entry.parameters, definition.parameters.filter(parameter => !entry.internal_parameters.includes(parameter.name)));
    assert.deepEqual(entry.docstring_schema, snapshot.wrangles[entry.runtime_key]?.schema || null);
  }
  const embeddings = runtime.wrangles.find(entry => entry.runtime_key === 'create.embeddings');
  assert.equal(embeddings.parameters.find(parameter => parameter.name === 'model').default, null);
  assert.ok(embeddings.parameters.some(parameter => parameter.name === 'timeout'));
  const extract = runtime.wrangles.find(entry => entry.runtime_key === 'extract.ai');
  assert.ok(extract.docstring_schema.properties.metadata);
  const extractRecord = parseRegistryMarkdown(fs.readFileSync(path.join(root, 'registry/wrangles/extract/ai.md'), 'utf8'));
  assert.ok(extractRecord.metadata.parameters.some(parameter => parameter.name === 'metadata'));
  assert.ok(!extractRecord.metadata.parameters.some(parameter => parameter.name === 'deadline'));
  assert.ok(!extract.parameters.some(parameter => parameter.name === 'deadline'));
  const check = spawnSync(process.execPath, [path.join(__dirname, 'import-runtime-snapshot.cjs'), '--check'], {encoding: 'utf8'});
  assert.equal(check.status, 0, check.stderr);
});

test('connectors have only canonical Registry pages and legacy URLs redirect', () => {
  const docs = path.join(root, 'wrangles-docs/registry-docs');
  assert.equal(fs.existsSync(path.join(docs, 'python/connectors.md')), false);
  const legacy = path.join(docs, 'python/connectors');
  if (fs.existsSync(legacy)) {
    assert.equal(fs.readdirSync(legacy, {recursive: true}).filter(name => name.endsWith('.md')).length, 0);
  }
  assert.ok(fs.existsSync(path.join(docs, 'namespaces/connectors.md')));
  for (const connector of manifest.connectors) {
    const key = connector.runtime_key;
    assert.ok(fs.existsSync(path.join(docs, 'connectors', key + '.md')));
    const redirect = fs.readFileSync(path.join(root, 'wrangles-docs/static/py/python/connectors', key.replaceAll('.', '/'), 'index.html'), 'utf8');
    assert.ok(redirect.includes(`location.replace("/py/connectors/${key}" +`));
    assert.ok(redirect.includes('location.search + location.hash'));
  }
});

test('all connector sources are Markdown with the same shared frontmatter conventions as wrangles', () => {
  const files = fs.readdirSync(path.join(root, 'registry/connectors'));
  assert.equal(files.length, 46);
  assert.ok(files.every(name => name.endsWith('.md')));
  for (const file of files) {
    const source = fs.readFileSync(path.join(root, 'registry/connectors', file), 'utf8');
    const parsed = parseRegistryMarkdown(source);
    assert.equal(parsed.metadata.type, 'connector');
    assert.equal(parsed.metadata.schema_version, '0.2');
    assert.equal(parsed.metadata.guidance, undefined);
    assert.ok(parsed.body.startsWith('# '));
    assert.deepEqual(parseRegistryMarkdown(serializeRegistryMarkdown(parsed.metadata, parsed.body)), parsed);
    const key = parsed.metadata.runtime_key;
    assert.equal(fs.readFileSync(path.join(root, 'wrangles-docs/static/registry/connectors', key + '.md'), 'utf8'), source);
    const contract = JSON.parse(fs.readFileSync(path.join(root, 'wrangles-docs/static/registry/connectors', key + '.json')));
    assert.equal(contract.guidance, parsed.body.replace(/^# [^\n]+\n*/, ''));
    assert.equal(manifest.connectors.find(entry => entry.runtime_key === key).raw_markdown, `/registry/connectors/${key}.md`);
  }
});

test('source loader rejects duplicate parameter tables and editorial guidance hidden in metadata', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'connector-markdown-'));
  const filename = path.join(temporary, 'file.md');
  try {
    fs.writeFileSync(filename, '---\ntitle: File\nguidance: duplicate\n---\n# File\n');
    assert.throws(() => readConnector(filename), /Markdown body/);
    fs.writeFileSync(filename, '---\ntitle: File\n---\n# File\n\n| Parameter | Required |\n');
    assert.throws(() => readConnector(filename), /handwritten parameter table/);
  } finally {
    fs.unlinkSync(filename);
    fs.rmdirSync(temporary);
  }
});

test('all reused recipe examples validate and Python examples parse without executing connectors', () => {
  const validate = new Ajv({strict: false, validateFormats: false}).compile(schema);
  const pythonExamples = [];
  let recipeCount = 0;
  for (const record of loadConnectors(root, catalog, snapshot)) {
    for (const match of record.guidance.matchAll(/```(?:yaml|yml)\s*\n([\s\S]*?)```/g)) {
      recipeCount++;
      assert.equal(validate(yaml.load(match[1])), true, record.runtime_key + ': ' + JSON.stringify(validate.errors));
    }
    for (const match of record.guidance.matchAll(/```python\s*\n([\s\S]*?)```/g)) {
      pythonExamples.push({key: record.runtime_key, source: match[1]});
    }
  }
  assert.ok(recipeCount >= 62, 'preserve the migrated recipe examples');
  assert.ok(pythonExamples.length >= 60, 'preserve the migrated Python examples');
  const result = spawnSync('python3', ['-c',
    'import ast,json,sys\nfor example in json.load(sys.stdin): ast.parse(example["source"], filename=example["key"])'],
  {input: JSON.stringify(pythonExamples), encoding: 'utf8'});
  assert.equal(result.status, 0, result.stderr || result.error?.message);
});

test('all 46 connector identities and operation schemas match API-Core and source', () => {
  const records = loadConnectors(root, catalog, snapshot);
  assert.equal(records.length, 46);
  assert.equal(manifest.connector_entry_count, 46);
  assert.equal(new Set(records.map(x => x.catalog_id)).size, 46);
  assert.deepEqual(manifest.connector_source, snapshot.source);
  assert.equal(records.find(x => x.runtime_key === 'excel.columns').catalog_id, '110');
  assert.equal(records.find(x => x.runtime_key === 'excel.selected_data').catalog_id, '111');
});

test('connector reconciliation rejects missing rows, identity drift and schema drift', () => {
  const missing = structuredClone(catalog);
  missing.catalog = missing.catalog.filter(x => x.catalog_key !== 'connector.file');
  assert.throws(() => loadConnectors(root, missing, snapshot), /mismatch/);
  const changed = structuredClone(catalog);
  changed.catalog.find(x => x.catalog_key === 'connector.file').catalog_id = '9999';
  assert.throws(() => loadConnectors(root, changed, snapshot), /mismatch/);
  const drift = structuredClone(snapshot);
  drift.connectors['excel.columns'].write.properties.invented = {type: 'string'};
  assert.throws(() => loadConnectors(root, catalog, drift), /mismatch/);
});

test('catalog normalization retains separate lookup identities and rejects duplicate IDs', () => {
  const normalized = normalizeApiCatalog(catalog, 'test');
  assert.equal(normalized.entry_count, 153);
  assert.equal(normalized.entries.find(x => x.catalog_key === 'lookup.key').wrangle_key, 'lookup.key');
  assert.equal(normalized.entries.find(x => x.catalog_key === 'connector.recipe').wrangle_key, null);
  const duplicate = structuredClone(catalog);
  duplicate.catalog.push(duplicate.catalog[0]);
  assert.throws(() => normalizeApiCatalog(duplicate, 'test'), /duplicate/);
});

test('published connector contracts include common controls with resolvable schema references', () => {
  const record = readConnector(path.join(root, 'registry/connectors/excel.columns.md'));
  const compiled = compiledConnector(record);
  assert.equal(record.operations.write.properties.if, undefined);
  assert.equal(compiled.operations.write.properties.if.$ref,
    schema.$id + '#/$defs/write/commonProperties/if');
  const ajv = new Ajv({strict: false, validateFormats: false});
  ajv.addSchema(schema);
  const validate = ajv.compile(compiled.operations.write);
  assert.equal(validate({columns: ['Result'], if: 'true'}), true);
  assert.equal(validate({invented_parameter: 1}), false);
});

test('recipe schema validates connector operation placement, required fields and nested references', () => {
  const validate = new Ajv({strict: false, validateFormats: false}).compile(schema);
  assert.equal(validate({read: [{'excel.selected_data': {}}], write: [{'excel.columns': {}}]}), true);
  assert.equal(validate({read: [{'excel.columns': {}}]}), false);
  assert.equal(validate({write: [{'excel.selected_data': {}}]}), false);
  assert.equal(validate({read: [{unknown_connector: {}}]}), false);
  assert.equal(validate({read: [{file: {}}]}), false);
  assert.equal(validate({read: [{file: {name: 'data.csv'}}]}), true);
  assert.equal(validate({read: [{union: {sources: [{'excel.selected_data': {}}]}}]}), true);
  assert.equal(validate({read: [{union: {sources: [{unknown_connector: {}}]}}]}), false);
});
