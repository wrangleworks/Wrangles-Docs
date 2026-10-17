// Preserve exact connector provenance during partial schema refreshes.
const fs = require('node:fs');
const path = require('node:path');
const {parseRegistryMarkdown, serializeRegistryMarkdown} = require('./registry-markdown.cjs');
const {normalizeTypes} = require('./wrangle-schema.cjs');
const root = path.resolve(__dirname, '../..');
const filename = path.join(root, 'registry/runtime/wranglespy-source-schema.json');
const snapshot = JSON.parse(fs.readFileSync(filename));
snapshot.connector_sources ||= {};
for (const name of fs.readdirSync(path.join(root, 'registry/connectors')).filter(name => name.endsWith('.md'))) {
  const file = path.join(root, 'registry/connectors', name);
  const {metadata, body} = parseRegistryMarkdown(fs.readFileSync(file, 'utf8'));
  snapshot.connector_sources[metadata.runtime_key] ||= metadata.source;
  if (process.argv[2] === metadata.runtime_key) {
    metadata.source = snapshot.connector_sources[metadata.runtime_key];
    metadata.operations = Object.fromEntries(Object.entries(snapshot.connectors[metadata.runtime_key]).map(([op, schema]) => [op, normalizeTypes(schema)]));
    fs.writeFileSync(file, serializeRegistryMarkdown(metadata, body));
  }
}
fs.writeFileSync(filename, JSON.stringify(snapshot, null, 2) + '\n');
