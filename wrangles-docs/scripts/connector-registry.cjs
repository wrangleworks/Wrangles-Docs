const fs = require('node:fs');
const path = require('node:path');
const {isDeepStrictEqual} = require('node:util');
const Ajv = require('ajv');
const {parseRegistryMarkdown} = require('./registry-markdown.cjs');
const {qualifySchemaReferences, normalizeTypes} = require('./wrangle-schema.cjs');

function readConnector(filename) {
  const {metadata, body} = parseRegistryMarkdown(fs.readFileSync(filename, 'utf8'), filename);
  if ('guidance' in metadata) throw new Error(`${filename}: guidance belongs in the Markdown body`);
  if (!body.trim()) throw new Error(`${filename}: missing Markdown documentation`);
  if (/^\|\s*Parameter\s*\|/m.test(body)) throw new Error(`${filename}: handwritten parameter table duplicates the generated contract`);
  return {...metadata, guidance: body};
}

function loadConnectors(root, catalog, snapshot) {
  const validate = new Ajv({strict: false}).compile(JSON.parse(fs.readFileSync(
    path.join(root, 'registry/schema/connector-entry.schema.json'))));
  const directory = path.join(root, 'registry/connectors');
  const files = fs.readdirSync(directory);
  if (files.some(name => name.endsWith('.json'))) throw new Error('Connector authoring records must be Markdown, not JSON.');
  const records = files.filter(name => name.endsWith('.md')).sort().map(name => {
    const record = readConnector(path.join(directory, name));
    if (name !== `${record.runtime_key}.md`) throw new Error(`Connector filename/key mismatch: ${name}`);
    return record;
  });
  const rows = catalog.catalog.filter(row => row.catalog_kind === 'connector');
  const seen = new Set();
  for (const record of records) {
    if (!validate(record)) throw new Error(`Invalid connector record: ${record.catalog_key}: ${JSON.stringify(validate.errors)}`);
    const row = rows.find(row => row.catalog_key === record.catalog_key);
    if (!row || seen.has(record.catalog_key) || record.catalog_kind !== 'connector'
        || record.schema_version !== '0.2' || record.type !== 'connector' || record.catalog_id !== row.catalog_id
        || record.slug !== `connectors/${record.runtime_key}`
        || record.runtime_key !== row.wranglesPY_key || record.status !== row.status
        || typeof record.title !== 'string' || !record.title || typeof record.guidance !== 'string'
        || !isDeepStrictEqual(record.source, snapshot.connector_sources?.[record.runtime_key] || snapshot.source)
        || !isDeepStrictEqual(record.operations, Object.fromEntries(Object.entries(snapshot.connectors[record.runtime_key] || {}).map(([op, schema]) => [op, normalizeTypes(schema)])))) {
      throw new Error(`Connector catalog/schema mismatch: ${record.catalog_key}`);
    }
    const operations = Object.keys(record.operations);
    if (!operations.length || operations.some(op => !['read', 'write', 'run'].includes(op))) {
      throw new Error(`Invalid connector operations: ${record.catalog_key}`);
    }
    seen.add(record.catalog_key);
  }
  if (rows.length !== seen.size || Object.keys(snapshot.connectors).length !== seen.size) {
    throw new Error('Connector coverage differs between catalog, source schema and Registry.');
  }
  return records;
}

function operationSchema(schema, operation) {
  const result = normalizeTypes(schema);
  const target = result.properties ? result : result.anyOf?.at(-1) || result;
  target.properties ||= {};
  const controls = operation === 'run' ? ['if'] : ['columns', 'not_columns', 'where', 'where_params', 'order_by', 'if'];
  for (const name of controls) {
    target.properties[name] = {$ref: `#/$defs/${operation === 'run' ? 'run' : 'write'}/commonProperties/${name}`};
  }
  return result;
}

function withConnectors(wrangleSchema, records, snapshot) {
  const schema = structuredClone(snapshot.recipe_base);
  Object.assign(schema, {$id: wrangleSchema.$id, title: wrangleSchema.title,
    description: wrangleSchema.description, $comment: wrangleSchema.$comment});
  schema.$defs.wrangles.items = wrangleSchema.$defs.wrangles.items;
  for (const op of ['read', 'write', 'run']) {
    const items = schema.$defs[op].items;
    delete items.additionProperties; // Correct upstream's spelling in the compiled contract.
    items.additionalProperties = false;
    items.minProperties = 1;
    items.maxProperties = 1;
    items.properties = {};
    for (const record of records) {
      if (record.operations[op]) items.properties[record.runtime_key] = operationSchema(record.operations[op], op);
    }
  }
  // Compile every branch and resolve nested references before publishing the schema.
  new Ajv({strict: false, validateFormats: false}).compile(schema);
  return schema;
}

function compiledConnector(record) {
  const compiled = structuredClone(record);
  compiled.guidance = record.guidance.replace(/^# [^\n]+\n*/, '');
  for (const [op, schema] of Object.entries(compiled.operations)) {
    compiled.operations[op] = qualifySchemaReferences(operationSchema(schema, op),
      'https://docs.wrangles.com/schemas/recipes/registry/schema.json');
  }
  return compiled;
}

function text(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('{', '&#123;').replaceAll('}', '&#125;')
    .replaceAll('|', '&#124;').replaceAll('\n', ' ');
}

function renderConnector(record, snapshot, slug = record.slug) {
  let result = `---\ntitle: ${JSON.stringify(record.title)}\ndescription: ${JSON.stringify(record.description)}\nslug: /${slug}\nregistry_entry: true\ntoc_min_heading_level: 2\ntoc_max_heading_level: 3\n---\n\n`;
  result += "import CopyableCode from '@site/src/components/CopyableCode';\n\n";
  result += `# ${text(record.title)} <CopyableCode value=${JSON.stringify(record.runtime_key)} />\n\n`;
  result += record.guidance.replace(/^# [^\n]+\n*/, '') + '\n\n';
  result += '## Parameters\n\n';
  for (const [op, original] of Object.entries(record.operations)) {
    const schema = operationSchema(original, op);
    const target = schema.properties ? schema : schema.anyOf?.at(-1) || schema;
    result += `### ${op[0].toUpperCase() + op.slice(1)}\n\n${text(original.description || target.description || '').trim()}\n\n`;
    result += '| Parameter | Required | Type | Description |\n| --- | --- | --- | --- |\n';
    const required = new Set(target.required || []);
    const properties = Object.entries(target.properties || {}).sort(([a], [b]) => {
      const conditions = ['if', 'where', 'where_params'];
      return Number(conditions.includes(a)) - Number(conditions.includes(b));
    });
    for (const [name, param] of properties) {
      const resolved = param.$ref?.startsWith('#/')
        ? param.$ref.slice(2).split('/').reduce((v, k) => v?.[k], snapshot.recipe_base) || param : param;
      const type = Array.isArray(resolved.type) ? resolved.type.join(' / ') : resolved.type || 'See schema';
      result += `| \`${name}\` | ${required.has(name) ? 'Yes' : 'No'} | ${text(type)} | ${text(resolved.description || '')} |\n`;
    }
    result += '\n<details>\n<summary>Full operation schema (including nested constraints)</summary>\n\n```json\n';
    result += JSON.stringify(schema, null, 2) + '\n```\n\n</details>\n\n';
  }
  result += `[Machine-readable contract](/registry/connectors/${record.runtime_key}.json) · `;
  result += `[WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/${record.source.revision})\n`;
  return result;
}

module.exports = {readConnector, loadConnectors, operationSchema, withConnectors, renderConnector, compiledConnector};
