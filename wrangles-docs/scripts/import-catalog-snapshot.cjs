#!/usr/bin/env node
// Import the complete JSON response downloaded by export_api_core_catalog.py.
const fs = require('node:fs');
const path = require('node:path');
const {normalizeApiCatalog} = require('./api-core-catalog.cjs');
const root = path.resolve(__dirname, '../..');
try {
  if (!process.argv[2]) throw new Error('Pass the downloaded api-core.json file as the first argument.');
  const payload = JSON.parse(fs.readFileSync(path.resolve(process.argv[2]), 'utf8'));
  if (!Array.isArray(payload.catalog) || !payload.catalog.length) {
    throw new Error('Expected a non-empty {catalog: [...]} API-Core JSON response.');
  }
  normalizeApiCatalog(payload, 'https://docs.wrangles.com/registry/schema/catalog-snapshot.schema.json');
  const destination = path.join(root, 'registry/catalog/api-core.json');
  fs.writeFileSync(destination, JSON.stringify(payload, null, 2) + '\n');
  console.log(`Imported ${payload.catalog.length} API-Core rows into ${destination}.`);
} catch (error) {
  console.error('Catalog import failed: ' + error.message);
  process.exitCode = 1;
}
