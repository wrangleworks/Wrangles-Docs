#!/usr/bin/env node
// Reads source without installing/importing WranglesPY. Run with its checkout path.
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');
const yaml = require('js-yaml');
const {parseRegistryMarkdown, serializeRegistryMarkdown} = require('./registry-markdown.cjs');
const {normalizeTypes} = require('./wrangle-schema.cjs');
const root = path.resolve(__dirname, '../..');
const checkout = process.argv[2];
if (!checkout) throw new Error('Usage: node import-wranglespy-schema.cjs /path/to/WranglesPY');
const extracted = JSON.parse(execFileSync('python3', [
  path.join(root, 'scripts/extract_wranglespy_schema.py'), checkout,
], {encoding: 'utf8', maxBuffer: 20 * 1024 * 1024}));
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'registry/catalog/api-core.json'))).catalog;
const snapshot = {format: 'wranglespy-source-schema', format_version: '0.1',
  source: extracted.source, recipe_base: extracted.recipe_base, controls: extracted.controls,
  wrangle_definitions: extracted.wrangle_definitions, connectors: {}, wrangles: {}, unresolved_wrangles: []};
for (const [key, operations] of Object.entries(extracted.connectors).sort()) {
  snapshot.connectors[key] = {};
  for (const [operation, source] of Object.entries(operations).sort()) {
    const schema = yaml.load(source);
    if (!schema || typeof schema !== 'object') throw new Error(`Invalid schema: ${key}.${operation}`);
    snapshot.connectors[key][operation] = schema;
  }
}
for (const [key, definition] of Object.entries(extracted.wrangle_definitions).sort()) {
  let schema;
  try { schema = definition.generated_schema || yaml.load(definition.docstring || ''); } catch { /* reported below */ }
  if (schema && typeof schema === 'object' && (schema.type || schema.anyOf)) {
    snapshot.wrangles[key] = {...definition, schema};
  } else {
    snapshot.unresolved_wrangles.push({key, source_file: definition.source_file,
      reason: definition.schema_extraction_error || 'No supported schema definition found.',
      source_text: fs.readFileSync(path.join(checkout, definition.source_file), 'utf8')});
  }
}
const connectorRows = catalog.filter(row => row.catalog_kind === 'connector');
if (process.argv.includes('--snapshot-only')) {
  const filename = process.argv[process.argv.indexOf('--snapshot-only') + 1];
  fs.writeFileSync(filename, JSON.stringify(snapshot, null, 2) + '\n');
  process.exit(0);
}
const keys = new Set(connectorRows.map(row => row.wranglesPY_key));
for (const row of connectorRows) {
  if (!snapshot.connectors[row.wranglesPY_key]) throw new Error(`Missing source connector: ${row.catalog_key}`);
}
for (const key of Object.keys(snapshot.connectors)) {
  if (!keys.has(key)) throw new Error(`Missing catalog connector: ${key}`);
}
function write(filename, data) {
  fs.mkdirSync(path.dirname(filename), {recursive: true});
  fs.writeFileSync(filename, JSON.stringify(data, null, 2) + '\n');
}
const refreshedRecords = connectorRows.map(row => {
  const filename = path.join(root, 'registry/connectors', row.wranglesPY_key + '.md');
  // Editorial fields survive refresh; schema-owned operation contracts are replaced.
  if (!fs.existsSync(filename)) {
    throw new Error(`Missing Markdown source ${filename}. Reuse existing docs, check wrangles.io, then author a schema-based description if necessary before importing.`);
  }
  const previous = parseRegistryMarkdown(fs.readFileSync(filename, 'utf8'), filename);
  const metadata = {...previous.metadata, catalog_id: row.catalog_id, catalog_key: row.catalog_key,
    catalog_kind: 'connector', runtime_key: row.wranglesPY_key, status: row.status,
    source: snapshot.source, operations: Object.fromEntries(Object.entries(snapshot.connectors[row.wranglesPY_key]).map(([op, schema]) => [op, normalizeTypes(schema)]))};
  return {filename, content: serializeRegistryMarkdown(metadata, previous.body)};
});
write(path.join(root, 'registry/runtime/wranglespy-source-schema.json'), snapshot);
for (const record of refreshedRecords) fs.writeFileSync(record.filename, record.content);
console.log(`Imported ${connectorRows.length} connectors and ${Object.keys(snapshot.wrangles).length} literal wrangle schemas from ${snapshot.source.revision}.`);
console.log(`Unresolved dynamic wrangle schemas: ${snapshot.unresolved_wrangles.map(x => x.key).join(', ') || 'none'}`);
