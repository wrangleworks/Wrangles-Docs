#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const siteRoot = path.resolve(__dirname, '..');
const repositoryRoot = path.resolve(siteRoot, '..');
const outputPath = path.join(repositoryRoot, 'registry', 'catalog', 'api-core.json');
const expectedColumns = [
  'catalog_id',
  'catalog_key',
  'kind',
  'wrangle_key',
  'title',
  'registry_path',
  'status',
  'source',
  'created_at',
  'updated_at',
];

function fail(message) {
  console.error(`Catalog snapshot import failed: ${message}`);
  process.exit(1);
}

function normalizeTimestamp(value, field, rowNumber) {
  const normalized = value.replace(' ', 'T').replace(/\+00$/, 'Z');
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(normalized)) {
    fail(`row ${rowNumber} has invalid ${field}: ${value}`);
  }
  return normalized;
}

const inputArgument = process.argv[2];
if (!inputArgument) {
  fail('pass the tab-separated wrangles_catalog export as the first argument');
}

const inputPath = path.resolve(process.cwd(), inputArgument);
const lines = fs.readFileSync(inputPath, 'utf8').trimEnd().split(/\r?\n/);
if (lines.length < 2) fail('the export contains no catalog rows');

const headers = lines.shift().split('\t');
if (JSON.stringify(headers) !== JSON.stringify(expectedColumns)) {
  fail(`expected tab-separated columns: ${expectedColumns.join(', ')}`);
}

const entries = lines.map((line, index) => {
  const rowNumber = index + 2;
  const values = line.split('\t');
  if (values.length !== expectedColumns.length) {
    fail(`row ${rowNumber} has ${values.length} fields; expected ${expectedColumns.length}`);
  }
  const row = Object.fromEntries(
    headers.map((header, columnIndex) => [header, values[columnIndex]]),
  );
  if (!/^[1-9][0-9]*$/.test(row.catalog_id)) {
    fail(`row ${rowNumber} has invalid catalog_id: ${row.catalog_id}`);
  }
  return {
    catalog_id: row.catalog_id,
    catalog_key: row.catalog_key,
    kind: row.kind,
    wrangle_key: row.wrangle_key || null,
    title: row.title || null,
    registry_path: row.registry_path || null,
    status: row.status,
    source: row.source,
    created_at: normalizeTimestamp(row.created_at, 'created_at', rowNumber),
    updated_at: normalizeTimestamp(row.updated_at, 'updated_at', rowNumber),
  };
}).sort((left, right) => {
  const leftId = BigInt(left.catalog_id);
  const rightId = BigInt(right.catalog_id);
  return leftId < rightId ? -1 : leftId > rightId ? 1 : 0;
});

const duplicate = (field) => {
  const seen = new Set();
  return entries.find((entry) => seen.has(entry[field]) || !seen.add(entry[field]));
};
for (const field of ['catalog_id', 'catalog_key']) {
  const entry = duplicate(field);
  if (entry) fail(`duplicate ${field}: ${entry[field]}`);
}

const snapshot = {
  $schema: 'https://docs.wrangles.com/registry/schema/catalog-snapshot.schema.json',
  format: 'wrangles-catalog-snapshot',
  format_version: '0.1',
  source: {
    system: 'API Core',
    repository: 'https://github.com/wrangleworks/API-Core',
    table: 'public.wrangles_catalog',
    data_updated_through: entries.map((entry) => entry.updated_at).sort().at(-1),
  },
  entry_count: entries.length,
  entries,
};

fs.mkdirSync(path.dirname(outputPath), {recursive: true});
fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(
  `Imported ${entries.length} catalog rows into ${path.relative(repositoryRoot, outputPath)}.`,
);
