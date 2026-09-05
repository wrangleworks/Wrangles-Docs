#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const yaml = require('js-yaml');

const REGISTRY_VERSION = '0.1.0-pilot';
const ENTRY_SCHEMA_VERSION = '0.1';
const PUBLIC_ORIGIN = 'https://docs.wrangles.com';

const siteRoot = path.resolve(__dirname, '..');
const repositoryRoot = path.resolve(siteRoot, '..');
const registryRoot = path.join(repositoryRoot, 'registry');
const entriesRoot = path.join(registryRoot, 'wrangles');
const quasiRegistryRoot = path.join(siteRoot, 'wrangle-docs');
const entrySchemaPath = path.join(registryRoot, 'schema', 'wrangle-entry.schema.json');
const runtimeManifestSchemaPath = path.join(
  registryRoot,
  'schema',
  'wrangles-runtime-manifest.schema.json',
);
const commonControlsPath = path.join(registryRoot, 'common', 'wrangle-controls.yaml');
const runtimeManifestPath = path.join(registryRoot, 'runtime', 'wranglespy.json');
const reportsOutputRoot = path.join(registryRoot, 'reports');

const docsOutputRoot = path.join(siteRoot, 'registry-docs');
const registrySidebarPath = path.join(siteRoot, 'sidebarsRegistry.js');
const rawOutputRoot = path.join(siteRoot, 'static', 'registry');
const schemaOutputRoot = path.join(siteRoot, 'static', 'schemas', 'recipes', 'pilot');

const LEGACY_GROUP_OVERRIDES = {
  maths: 'compute',
  recipe: 'utility',
};
const GROUP_ORDER = [
  'convert',
  'merge',
  'split',
  'select',
  'format',
  'create',
  'extract',
  'compare',
  'compute',
  'search',
  'ai',
  'generate',
  'lookup',
  'standardize',
  'transform',
  'utility',
  'date',
];
const PARAM_GROUP_ORDER = [
  'I/O',
  'Options',
  'Formatting',
  'Conditions',
  'Execution',
  'Errors',
  'Details',
];

const generatedFiles = new Map();
const errors = [];

function posixPath(value) {
  return value.split(path.sep).join('/');
}

function fail(source, message) {
  errors.push(`${posixPath(path.relative(repositoryRoot, source))}: ${message}`);
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function hasOwn(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function valuesEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function canonicalizeSchema(value) {
  if (Array.isArray(value)) return value.map(canonicalizeSchema);
  if (!isObject(value)) return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !['description', 'title', '$comment'].includes(key))
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, canonicalizeSchema(item)]),
  );
}

function parseFrontmatter(source, filename) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    fail(filename, 'missing YAML frontmatter');
    return null;
  }

  try {
    const metadata = yaml.load(match[1]);
    if (!isObject(metadata)) {
      fail(filename, 'frontmatter must be an object');
      return null;
    }
    return {
      metadata,
      body: source.slice(match[0].length).trim(),
    };
  } catch (error) {
    fail(filename, `invalid YAML frontmatter: ${error.message}`);
    return null;
  }
}

async function listFiles(root, suffix = '') {
  const results = [];
  let directoryEntries;
  try {
    directoryEntries = await fs.readdir(root, {withFileTypes: true});
  } catch (error) {
    if (error.code === 'ENOENT') return results;
    throw error;
  }

  for (const directoryEntry of directoryEntries) {
    const fullPath = path.join(root, directoryEntry.name);
    if (directoryEntry.isDirectory()) {
      results.push(...await listFiles(fullPath, suffix));
    } else if (!suffix || directoryEntry.name.endsWith(suffix)) {
      results.push(fullPath);
    }
  }
  return results.sort();
}

function validateRuntimeManifest(manifest) {
  if (!isObject(manifest)) {
    fail(runtimeManifestPath, 'runtime manifest must be an object');
    return;
  }
  if (manifest.format !== 'wrangles-runtime-manifest') {
    fail(runtimeManifestPath, 'format must be wrangles-runtime-manifest');
  }
  if (manifest.format_version !== '0.1') {
    fail(runtimeManifestPath, 'format_version must be 0.1');
  }
  if (!isObject(manifest.source)) {
    fail(runtimeManifestPath, 'source must be an object');
  } else {
    if (manifest.source.repository !== 'https://github.com/wrangleworks/WranglesPY') {
      fail(runtimeManifestPath, 'source.repository must identify WranglesPY');
    }
    if (!/^[0-9a-f]{40}$/i.test(manifest.source.revision || '')) {
      fail(runtimeManifestPath, 'source.revision must be a pinned 40-character Git commit');
    }
  }
  if (!Array.isArray(manifest.wrangles)) {
    fail(runtimeManifestPath, 'wrangles must be an array');
    return;
  }
  if (manifest.entry_count !== manifest.wrangles.length) {
    fail(runtimeManifestPath, 'entry_count does not match wrangles.length');
  }

  const keys = new Set();
  for (const [index, wrangle] of manifest.wrangles.entries()) {
    const label = `wrangles[${index}]`;
    if (!isObject(wrangle)) {
      fail(runtimeManifestPath, `${label} must be an object`);
      continue;
    }
    if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/.test(wrangle.runtime_key || '')) {
      fail(runtimeManifestPath, `${label}.runtime_key is invalid`);
    } else if (keys.has(wrangle.runtime_key)) {
      fail(runtimeManifestPath, `duplicate runtime key ${wrangle.runtime_key}`);
    } else {
      keys.add(wrangle.runtime_key);
    }
    if (typeof wrangle.python_symbol !== 'string' || !wrangle.python_symbol) {
      fail(runtimeManifestPath, `${label}.python_symbol must be a non-empty string`);
    }
    if (!Array.isArray(wrangle.parameters)) {
      fail(runtimeManifestPath, `${label}.parameters must be an array`);
    }
    if (!isObject(wrangle.capabilities)) {
      fail(runtimeManifestPath, `${label}.capabilities must be an object`);
    }
    if (!['available', 'missing'].includes(wrangle.docstring_schema_status)) {
      fail(runtimeManifestPath, `${label}.docstring_schema_status is invalid`);
    }
  }
}

function splitMarkdownRow(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) return [];

  const cells = [];
  let current = '';
  for (let index = 1; index < trimmed.length - 1; index += 1) {
    const character = trimmed[index];
    if (character === '\\' && trimmed[index + 1] === '|') {
      current += '|';
      index += 1;
    } else if (character === '|') {
      cells.push(current.trim());
      current = '';
    } else {
      current += character;
    }
  }
  cells.push(current.trim());
  return cells;
}

function markdownTableAfter(source, marker) {
  const lines = source.split(/\r?\n/);
  const markerIndex = lines.findIndex((line) => line.trim() === marker);
  if (markerIndex < 0) return [];

  let headerIndex = markerIndex + 1;
  while (headerIndex < lines.length && !lines[headerIndex].trim()) headerIndex += 1;
  if (!lines[headerIndex]?.trim().startsWith('|')) return [];

  const headers = splitMarkdownRow(lines[headerIndex]);
  const rows = [];
  for (let index = headerIndex + 2; index < lines.length; index += 1) {
    if (!lines[index].trim().startsWith('|')) break;
    const cells = splitMarkdownRow(lines[index]);
    if (cells.length !== headers.length) continue;
    rows.push(Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex]])));
  }
  return rows;
}

function fieldTable(rows) {
  return Object.fromEntries(rows.map((row) => [row.Field, row.Value]));
}

function stripCode(value) {
  const text = String(value || '').trim();
  return text.startsWith('`') && text.endsWith('`') ? text.slice(1, -1) : text;
}

function yesNo(value) {
  if (value === 'Yes') return true;
  if (value === 'No') return false;
  return null;
}

function parseQuasiRegistryEntry(source, sourceFile) {
  const metadata = fieldTable(markdownTableAfter(source, '<summary>Metadata</summary>'));
  const access = fieldTable(markdownTableAfter(source, '<summary>Access</summary>'));
  const parameterRows = markdownTableAfter(source, '### Parameters');
  const wrangleKey = stripCode(metadata['Wrangle Key']);

  if (!wrangleKey) fail(sourceFile, 'quasi-registry record has no Wrangle Key');
  if (!parameterRows.length) fail(sourceFile, 'quasi-registry record has no parameter table');

  const parameters = parameterRows.map((row) => ({
    name: stripCode(row.Parameter),
    required: yesNo(row.Required),
    label: row.Label || '',
    ui_type: row['UI Type'] || '',
    description: row.Description || '',
    allowed_values: row['Allowed Values'] || '',
    display_default: row.Default || '',
  }));
  const parameterNames = new Set();
  for (const parameter of parameters) {
    if (!parameter.name) {
      fail(sourceFile, 'quasi-registry parameter has no name');
    } else if (parameterNames.has(parameter.name)) {
      fail(sourceFile, `duplicate quasi-registry parameter ${parameter.name}`);
    } else {
      parameterNames.add(parameter.name);
    }
    if (parameter.required === null) {
      fail(sourceFile, `quasi-registry parameter ${parameter.name} has invalid Required value`);
    }
  }

  const id = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    metadata.ID || '',
  ) ? metadata.ID : null;

  return {
    source_file: posixPath(path.relative(repositoryRoot, sourceFile)),
    source_sha256: sha256(source),
    title: source.match(/^##\s+(.+)$/m)?.[1]?.trim() || wrangleKey,
    wrangle_key: wrangleKey,
    id,
    type: metadata.Type || '',
    subtype: metadata.Subtype || '',
    variant: metadata.Variant || '',
    status: metadata.Status || '',
    tags: String(metadata.Tags || '').split(',').map((tag) => tag.trim()).filter(Boolean),
    parameters,
    access: {
      ai_powered: yesNo(access['AI-backed']),
      requires_account: yesNo(access['Requires WrangleWorks account']),
      requires_subscription: yesNo(access['Requires subscription']),
      requires_external_api_key: yesNo(access['Requires external API key']),
    },
  };
}

async function readQuasiRegistry() {
  const allMarkdown = await listFiles(quasiRegistryRoot, '.md');
  const sourceFiles = allMarkdown.filter(
    (sourceFile) => path.basename(path.dirname(sourceFile)) === '_sources',
  );
  const sourceFileSet = new Set(sourceFiles.map((sourceFile) => path.resolve(sourceFile)));
  const entries = [];
  for (const sourceFile of sourceFiles) {
    const source = await fs.readFile(sourceFile, 'utf8');
    entries.push(parseQuasiRegistryEntry(source, sourceFile));
  }

  const keys = new Set();
  for (const entry of entries) {
    if (keys.has(entry.wrangle_key)) {
      fail(path.join(repositoryRoot, entry.source_file), `duplicate quasi-registry key ${entry.wrangle_key}`);
    }
    keys.add(entry.wrangle_key);
  }

  const supportingMarkdown = [];
  for (const sourceFile of allMarkdown.filter(
    (filename) => !sourceFileSet.has(path.resolve(filename)))) {
    const source = await fs.readFile(sourceFile, 'utf8');
    supportingMarkdown.push({
      source_file: posixPath(path.relative(repositoryRoot, sourceFile)),
      source_sha256: sha256(source),
    });
  }

  return {
    entries: entries.sort((left, right) => left.wrangle_key.localeCompare(right.wrangle_key)),
    supportingMarkdown: supportingMarkdown.sort((left, right) =>
      left.source_file.localeCompare(right.source_file)),
  };
}

function validateSchemaFragment(fragment, source, label) {
  if (!isObject(fragment)) {
    fail(source, `${label}.schema must be an object`);
    return;
  }

  const validTypes = new Set([
    'array',
    'boolean',
    'integer',
    'null',
    'number',
    'object',
    'string',
  ]);
  const types = Array.isArray(fragment.type) ? fragment.type : [fragment.type];
  const hasComposition = ['anyOf', 'oneOf', 'allOf'].some((key) => Array.isArray(fragment[key]));
  if (!fragment.type && !hasComposition && typeof fragment.$ref !== 'string') {
    fail(source, `${label}.schema must declare type, composition, or $ref`);
  } else if (fragment.type && types.some((type) => !validTypes.has(type))) {
    fail(source, `${label}.schema.type contains an unsupported JSON Schema type`);
  }
  if (fragment.enum && !Array.isArray(fragment.enum)) {
    fail(source, `${label}.schema.enum must be an array`);
  }
  if (fragment.items) {
    validateSchemaFragment(fragment.items, source, `${label}.items`);
  }
  for (const keyword of ['anyOf', 'oneOf', 'allOf']) {
    if (!hasOwn(fragment, keyword)) continue;
    if (!Array.isArray(fragment[keyword]) || fragment[keyword].length === 0) {
      fail(source, `${label}.schema.${keyword} must be a non-empty array`);
      continue;
    }
    fragment[keyword].forEach((option, index) =>
      validateSchemaFragment(option, source, `${label}.${keyword}[${index}]`));
  }
}

function validateTopLevel(metadata, source, entrySchema) {
  const allowed = new Set(Object.keys(entrySchema.properties));
  for (const required of entrySchema.required) {
    if (!hasOwn(metadata, required)) fail(source, `missing required field ${required}`);
  }
  for (const key of Object.keys(metadata)) {
    if (!allowed.has(key)) fail(source, `unknown top-level field ${key}`);
  }

  if (metadata.schema_version !== ENTRY_SCHEMA_VERSION) {
    fail(source, `schema_version must be ${ENTRY_SCHEMA_VERSION}`);
  }
  if (metadata.type !== 'wrangle') fail(source, 'type must be wrangle');
  for (const key of [
    'wrangle_name',
    'title',
    'description',
    'wrangle_key',
    'slug',
  ]) {
    if (typeof metadata[key] !== 'string' || !metadata[key].trim()) {
      fail(source, `${key} must be a non-empty string`);
    }
  }
  if (metadata.id !== null && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(metadata.id || '')) {
    fail(source, 'id must be a UUID or null');
  }
  if (!/^[a-z][a-z0-9_]*$/.test(metadata.wrangle_name || '')) {
    fail(source, 'wrangle_name is invalid');
  }
  if (metadata.namespace !== null && !/^[a-z][a-z0-9_]*$/.test(metadata.namespace || '')) {
    fail(source, 'namespace must be a valid recipe-key segment or null');
  }
  if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/.test(metadata.wrangle_key || '')) {
    fail(source, 'wrangle_key is not a valid recipe key');
  }
  const composedKey = metadata.namespace
    ? `${metadata.namespace}.${metadata.wrangle_name}`
    : metadata.wrangle_name;
  if (metadata.wrangle_key !== composedKey) {
    fail(source, `wrangle_key must equal namespace + wrangle_name (${composedKey})`);
  }
  if (!/^[a-z0-9]+(?:[a-z0-9_-]*[a-z0-9])?(\/[a-z0-9]+(?:[a-z0-9_-]*[a-z0-9])?)*$/.test(metadata.slug || '')) {
    fail(source, 'slug is not a valid relative documentation path');
  }
  if (!Array.isArray(metadata.aliases)) {
    fail(source, 'aliases must be an array');
  } else {
    const aliases = new Set();
    for (const alias of metadata.aliases) {
      if (typeof alias !== 'string' || !/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/.test(alias)) {
        fail(source, `alias ${JSON.stringify(alias)} is not a valid recipe key`);
      } else if (alias === metadata.wrangle_key) {
        fail(source, `aliases must not contain the canonical wrangle_key ${alias}`);
      } else if (aliases.has(alias)) {
        fail(source, `duplicate alias ${alias}`);
      } else {
        aliases.add(alias);
      }
    }
  }
  if (!['draft', 'active', 'deprecated', 'removed'].includes(metadata.status)) {
    fail(source, 'status is invalid');
  }
  if (metadata.status === 'deprecated' && typeof metadata.replaced_by !== 'string') {
    fail(source, 'deprecated entries must declare replaced_by');
  }
  if (hasOwn(metadata, 'replaced_by')) {
    if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/.test(metadata.replaced_by || '')) {
      fail(source, 'replaced_by must be a valid recipe key');
    } else if (metadata.replaced_by === metadata.wrangle_key) {
      fail(source, 'replaced_by must not reference the same wrangle');
    }
  }
  if (!['public', 'internal'].includes(metadata.visibility)) {
    fail(source, 'visibility is invalid');
  }
  if (!Array.isArray(metadata.tags) || metadata.tags.length === 0) {
    fail(source, 'tags must be a non-empty array');
  } else if (new Set(metadata.tags).size !== metadata.tags.length) {
    fail(source, 'tags must be unique');
  }

  if (!isObject(metadata.runtime)) {
    fail(source, 'runtime must be an object');
  } else {
    for (const key of ['package', 'symbol', 'contract_status']) {
      if (!hasOwn(metadata.runtime, key)) fail(source, `runtime.${key} is required`);
    }
    if (!['awaiting-manifest', 'verified'].includes(metadata.runtime.contract_status)) {
      fail(source, 'runtime.contract_status is invalid');
    }
  }

  const accessKeys = [
    'ai_powered',
    'requires_account',
    'requires_subscription',
    'requires_external_api_key',
  ];
  if (!isObject(metadata.access)) {
    fail(source, 'access must be an object');
  } else {
    for (const key of accessKeys) {
      if (typeof metadata.access[key] !== 'boolean') {
        fail(source, `access.${key} must be a boolean`);
      }
    }
  }
  if (!isObject(metadata.capabilities)) fail(source, 'capabilities must be an object');
  if (!Array.isArray(metadata.parameters)) {
    fail(source, 'parameters must be an array');
  }
  if (!Array.isArray(metadata.examples)) fail(source, 'examples must be an array');
  if (!Array.isArray(metadata.sources) || metadata.sources.length === 0) {
    fail(source, 'sources must be a non-empty array');
  }
}

function validateParameters(metadata, source) {
  if (!Array.isArray(metadata.parameters)) return;
  const names = new Set();
  for (const [index, parameter] of metadata.parameters.entries()) {
    const label = `parameters[${index}]`;
    if (!isObject(parameter)) {
      fail(source, `${label} must be an object`);
      continue;
    }
    const allowed = new Set([
      'name',
      'name_pattern',
      'description',
      'required',
      'param_group',
      'runtime_default',
      'schema',
    ]);
    for (const key of Object.keys(parameter)) {
      if (!allowed.has(key)) fail(source, `${label} has unknown field ${key}`);
    }
    for (const key of ['name', 'description', 'required', 'param_group', 'schema']) {
      if (!hasOwn(parameter, key)) fail(source, `${label}.${key} is required`);
    }
    if (typeof parameter.name_pattern === 'string') {
      try {
        new RegExp(parameter.name_pattern);
      } catch (error) {
        fail(source, `${label}.name_pattern is invalid: ${error.message}`);
      }
      if (typeof parameter.name !== 'string' || !parameter.name.trim()) {
        fail(source, `${label}.name must label the dynamic parameter family`);
      }
    } else if (!/^[a-z][A-Za-z0-9_]*$/.test(parameter.name || '')) {
      fail(source, `${label}.name is not a valid Python keyword parameter`);
    } else if (names.has(parameter.name)) {
      fail(source, `duplicate parameter ${parameter.name}`);
    } else {
      names.add(parameter.name);
    }
    if (typeof parameter.description !== 'string' || !parameter.description.trim()) {
      fail(source, `${label}.description must be a non-empty string`);
    }
    if (typeof parameter.required !== 'boolean') {
      fail(source, `${label}.required must be a boolean`);
    }
    if (!PARAM_GROUP_ORDER.includes(parameter.param_group)) {
      fail(source, `${label}.param_group must be one of: ${PARAM_GROUP_ORDER.join(', ')}`);
    }
    validateSchemaFragment(parameter.schema, source, label);
  }
}

async function validateExamples(entry) {
  const ids = new Set();
  for (const [index, example] of entry.metadata.examples.entries()) {
    const label = `examples[${index}]`;
    if (!isObject(example)) {
      fail(entry.sourceFile, `${label} must be an object`);
      continue;
    }
    for (const key of [
      'id',
      'title',
      'recipe',
      'input_fixture',
      'output_fixture',
      'verification',
    ]) {
      if (!hasOwn(example, key)) fail(entry.sourceFile, `${label}.${key} is required`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(example.id || '')) {
      fail(entry.sourceFile, `${label}.id is invalid`);
    } else if (ids.has(example.id)) {
      fail(entry.sourceFile, `duplicate example id ${example.id}`);
    } else {
      ids.add(example.id);
    }
    if (!['static', 'offline', 'live', 'manual'].includes(example.verification)) {
      fail(entry.sourceFile, `${label}.verification is invalid`);
    }

    let recipe;
    try {
      recipe = yaml.load(example.recipe);
    } catch (error) {
      fail(entry.sourceFile, `${label}.recipe is invalid YAML: ${error.message}`);
    }
    if (!isObject(recipe) || !Array.isArray(recipe.wrangles)) {
      fail(entry.sourceFile, `${label}.recipe must contain a wrangles array`);
    } else {
      const usesEntry = recipe.wrangles.some(
        (step) => isObject(step) && hasOwn(step, entry.metadata.wrangle_key),
      );
      if (!usesEntry) {
        fail(entry.sourceFile, `${label}.recipe does not use ${entry.metadata.wrangle_key}`);
      }
    }

    for (const fixtureField of ['input_fixture', 'output_fixture']) {
      if (typeof example[fixtureField] !== 'string') continue;
      const fixturePath = path.resolve(path.dirname(entry.sourceFile), example[fixtureField]);
      const registryPrefix = `${registryRoot}${path.sep}`;
      if (!fixturePath.startsWith(registryPrefix)) {
        fail(entry.sourceFile, `${label}.${fixtureField} resolves outside registry/`);
        continue;
      }
      try {
        const fixture = JSON.parse(await fs.readFile(fixturePath, 'utf8'));
        if (!Array.isArray(fixture) || fixture.some((row) => !isObject(row))) {
          fail(entry.sourceFile, `${label}.${fixtureField} must contain a JSON array of objects`);
        }
        example[`_${fixtureField}`] = fixture;
      } catch (error) {
        fail(entry.sourceFile, `${label}.${fixtureField} cannot be read: ${error.message}`);
      }
    }
  }
}

function escapeMdxText(value) {
  return String(value ?? '')
    .split(/(`[^`\r\n]*`)/g)
    .map((part) => part.startsWith('`') ? part : part
      .replace(/&/g, '&amp;')
      .replace(/\{/g, '&#123;')
      .replace(/\}/g, '&#125;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'))
    .join('');
}

function escapeCell(value) {
  return escapeMdxText(value)
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, '<br />');
}

function acceptedValueSummary(schema) {
  for (const keyword of ['anyOf', 'oneOf']) {
    if (Array.isArray(schema[keyword])) {
      return schema[keyword].map(acceptedValueSummary).filter(Boolean).join(' or ');
    }
  }
  if (typeof schema.$ref === 'string') return escapeCell(`reference: ${schema.$ref}`);
  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  const typeLabel = escapeCell(types.filter(Boolean).join(', '));
  if (Array.isArray(schema.enum)) {
    const values = schema.enum.map((value) => {
      const label = typeof value === 'string' ? value : JSON.stringify(value);
      return `<li>${escapeCell(label)}</li>`;
    }).join('');
    return `${typeLabel}; one of:<ul className="ww-param-enum-values">${values}</ul>`;
  }
  return typeLabel;
}

function jsonValue(value) {
  return value === undefined ? '—' : `\`${JSON.stringify(value)}\``;
}

function sampleValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return escapeCell(JSON.stringify(value));
  return escapeCell(String(value));
}

function fixtureTable(fixture) {
  if (!Array.isArray(fixture) || !fixture.length || !fixture.every(isObject)) {
    return null;
  }

  const columns = [...new Set(fixture.flatMap((record) => Object.keys(record)))];
  if (!columns.length) return null;

  const header = `| ${columns.map(escapeCell).join(' | ')} |`;
  const separator = `| ${columns.map(() => '---').join(' | ')} |`;
  const rows = fixture.map((record) =>
    `| ${columns.map((column) => sampleValue(record[column])).join(' | ')} |`,
  );
  return [header, separator, ...rows].join('\n');
}

function parseSampleTable(source) {
  const lines = String(source || '').trim().split(/\r?\n/);
  if (lines.length < 2) return null;

  const headers = splitMarkdownRow(lines[0]);
  const separator = splitMarkdownRow(lines[1]);
  if (
    !headers.length ||
    separator.length !== headers.length ||
    separator.some((cell) => !/^:?-{3,}:?$/.test(cell))
  ) {
    return null;
  }

  const rows = lines.slice(2).map(splitMarkdownRow);
  if (!rows.length || rows.some((row) => row.length !== headers.length)) return null;
  return {headers, rows};
}

function renderSampleTable(table) {
  const preserveCell = (value) => String(value ?? '').replace(/\|/g, '\\|');
  return [
    `| ${table.headers.map(preserveCell).join(' | ')} |`,
    `| ${table.headers.map(() => '---').join(' | ')} |`,
    ...table.rows.map((row) => `| ${row.map(preserveCell).join(' | ')} |`),
  ].join('\n');
}

function selectSampleColumns(table, indexes) {
  return {
    headers: indexes.map((index) => table.headers[index]),
    rows: table.rows.map((row) => indexes.map((index) => row[index] ?? '')),
  };
}

function normalizedSampleColumn(value) {
  return String(value || '')
    .replace(/`/g, '')
    .replace(/\s*\([^)]*\b(?:input|output)\b[^)]*\)\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function recipeParameterValues(recipeSource, parameter) {
  try {
    const document = yaml.load(recipeSource);
    const wrangle = Array.isArray(document?.wrangles) ?
      document.wrangles.find(isObject) : null;
    const configuration = wrangle ? Object.values(wrangle)[0] : null;
    const value = isObject(configuration) ? configuration[parameter] : null;
    const values = Array.isArray(value) ? value : [value];
    return values
      .filter((item) => typeof item === 'string' || typeof item === 'number')
      .map(String);
  } catch {
    return [];
  }
}

function inferInputTable(recipeSource, outputTable) {
  const inputColumns = recipeParameterValues(recipeSource, 'input');
  if (!inputColumns.length || !outputTable) return null;

  const indexes = inputColumns.map((column) =>
    outputTable.headers.findIndex((header) =>
      normalizedSampleColumn(header) === normalizedSampleColumn(column)),
  );
  if (indexes.some((index) => index < 0) || new Set(indexes).size !== indexes.length) {
    return null;
  }
  return selectSampleColumns(outputTable, indexes);
}

function resultOnlyTable(inputTable, outputTable) {
  if (!inputTable || !outputTable) return outputTable;

  const retainedIndexes = outputTable.headers.map((header, outputIndex) => {
    const inputIndex = inputTable.headers.findIndex((inputHeader) =>
      normalizedSampleColumn(inputHeader) === normalizedSampleColumn(header));
    if (inputIndex < 0) return outputIndex;

    const inputValues = inputTable.rows.map((row) => row[inputIndex] ?? '');
    const outputValues = outputTable.rows.map((row) => row[outputIndex] ?? '');
    return valuesEqual(inputValues, outputValues) ? null : outputIndex;
  }).filter((index) => index !== null);

  // Structural wrangles such as select/drop can return only unchanged columns.
  // Retain their full result so the changed table shape remains visible.
  return retainedIndexes.length ? selectSampleColumns(outputTable, retainedIndexes) : outputTable;
}

function rewriteSampleGrids(content) {
  const pattern = /```yaml\r?\n([\s\S]*?)\r?\n```\r?\n\r?\n<div className="ww-sample-grid">\r?\n\r?\n<div className="ww-sample-panel">\r?\n\r?\n##### Input Sample\r?\n\r?\n([\s\S]*?)\r?\n\r?\n<\/div>\r?\n\r?\n<div className="ww-sample-panel">\r?\n\r?\n##### Output Sample\r?\n\r?\n([\s\S]*?)\r?\n\r?\n<\/div>\r?\n\r?\n<\/div>/g;

  return content.replace(pattern, (match, recipeSource, inputSource, outputSource) => {
    let inputTable = parseSampleTable(inputSource);
    let outputTable = parseSampleTable(outputSource);
    if (!inputTable && /No sample available/i.test(inputSource)) {
      inputTable = inferInputTable(recipeSource, outputTable);
    }
    if (inputTable && outputTable) outputTable = resultOnlyTable(inputTable, outputTable);

    const normalizedInput = inputTable ? renderSampleTable(inputTable) : inputSource.trim();
    const normalizedOutput = outputTable ? renderSampleTable(outputTable) : outputSource.trim();
    return `\`\`\`yaml
${recipeSource}
\`\`\`

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

${normalizedInput}

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

${normalizedOutput}

</div>

</div>`;
  });
}

function renderFixturePanel(role, fixture, normalizedTable = null) {
  const table = normalizedTable ? renderSampleTable(normalizedTable) : fixtureTable(fixture);
  const content = table || [
    '```json',
    JSON.stringify(fixture, null, 2),
    '```',
  ].join('\n');

  return `<div className="ww-sample-panel ww-sample-panel--${role}" data-sample-role="${role}">

${content}

</div>`;
}

function renderPublicExample(example, grouped = false) {
  const inputTable = parseSampleTable(fixtureTable(example._input_fixture));
  const originalOutputTable = parseSampleTable(fixtureTable(example._output_fixture));
  const outputTable = resultOnlyTable(inputTable, originalOutputTable);

  return `\`\`\`yaml
${example.recipe.trim()}
\`\`\`

<div className="ww-sample-grid">

${renderFixturePanel('input', example._input_fixture, inputTable)}

${renderFixturePanel('output', example._output_fixture, outputTable)}

</div>`;
}

function normalizePublicBody(body, description, grouped = false) {
  let content = rewriteSampleGrids(stripLeadingTitle(body));
  const blocks = content.split(/\r?\n\r?\n/);
  const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();
  if (blocks.length && normalizeText(blocks[0]) === normalizeText(description)) {
    content = blocks.slice(1).join('\n\n').trim();
  }

  let inMigratedExamples = false;
  return content.split(/\r?\n/).map((line) => {
    if (/^## Migrated examples\s*$/.test(line)) {
      inMigratedExamples = true;
      return grouped ? '### Examples' : '## Examples';
    }
    if (inMigratedExamples && /^##\s+/.test(line)) {
      inMigratedExamples = false;
    }
    if (inMigratedExamples && (
      /^####\s+/.test(line) ||
      /^#####\s+(?:Recipe|Input Sample|Output Sample)\s*$/.test(line)
    )) {
      return '';
    }
    return grouped ? line.replace(/^##(\s+)/, '###$1') : line;
  }).join('\n');
}

function legacyDocumentationGroup(entry) {
  for (const source of entry.metadata.sources) {
    const match = source.resource.match(/\/wrangle-docs\/([^/]+)\/_sources\//);
    if (match) return match[1];
  }
  return null;
}

function entryGroup(entry) {
  return entry.metadata.namespace ||
    legacyDocumentationGroup(entry) ||
    LEGACY_GROUP_OVERRIDES[entry.metadata.wrangle_key] ||
    'other';
}

function groupLabel(group) {
  if (group === 'ai') return 'AI';
  return group
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

function groupRoute(group) {
  return `/wrangles/namespaces/${group}`;
}

function entryAnchor(entry) {
  return entry.metadata.slug.split('/').at(-1);
}

function entryRoute(entry) {
  return `${groupRoute(entryGroup(entry))}#${entryAnchor(entry)}`;
}

function entryOutputRelativePath(entry) {
  const parts = entry.metadata.slug.split('/');
  return path.join(...parts.slice(0, -1), `${parts.at(-1)}.md`);
}

function entryContractRelativePath(entry) {
  const parts = entry.metadata.slug.split('/');
  return path.join('contracts', ...parts.slice(0, -1), `${parts.at(-1)}.json`);
}

function combinedParameters(entry, controls) {
  const parameters = [...entry.metadata.parameters];
  for (const [name, enabled] of Object.entries(entry.metadata.capabilities)) {
    if (!enabled) continue;
    if (!controls[name]) {
      fail(entry.sourceFile, `capability ${name} has no common control definition`);
      continue;
    }
    if (parameters.some((parameter) => parameter.name === name)) {
      fail(entry.sourceFile, `capability ${name} duplicates an entry parameter`);
      continue;
    }
    parameters.push({name, ...controls[name]});
  }
  return parameters;
}

function stripLeadingTitle(body) {
  return body.replace(/^#\s+[^\r\n]+\r?\n*/, '').trim();
}

function splitExamplesSection(content, sectionHeading) {
  const lines = content.split(/\r?\n/);
  const heading = `${sectionHeading} Examples`;
  const index = lines.findIndex((line) => line.trim() === heading);
  if (index === -1) return {guidance: content.trim(), examples: ''};
  return {
    guidance: lines.slice(0, index).join('\n').trim(),
    examples: lines.slice(index + 1).join('\n').trim(),
  };
}

function renderEntryContent(entry, controls, {grouped = false, entriesByKey = new Map()} = {}) {
  const metadata = entry.metadata;
  const sectionHeading = grouped ? '###' : '##';
  const parameters = combinedParameters(entry, controls);
  const parameterRows = PARAM_GROUP_ORDER.flatMap((paramGroup) => {
    const groupedParameters = parameters.filter(
      (parameter) => parameter.param_group === paramGroup,
    );
    if (!groupedParameters.length) return [];
    return [
      [`<span className="ww-param-group-label">${paramGroup}</span>`, '', '', '', ''],
      ...groupedParameters.map((parameter) => [
        `\`${parameter.name}\``,
        escapeCell(parameter.description),
        acceptedValueSummary(parameter.schema),
        hasOwn(parameter, 'runtime_default') ? jsonValue(parameter.runtime_default) : '—',
        parameter.required ? 'Yes' : 'No',
      ]),
    ];
  });

  const fixtureExamples = metadata.examples
    .map((example) => renderPublicExample(example, grouped))
    .join('\n\n');

  const sourceRows = metadata.sources.map((source) =>
    `- [${source.title || source.id}](${source.resource})`,
  ).join('\n');

  const accessLabels = {
    ai_powered: 'AI-powered',
    requires_account: 'Requires WrangleWorks account',
    requires_subscription: 'Requires subscription',
    requires_external_api_key: 'Requires external API key',
  };
  const accessRows = Object.entries(metadata.access).map(([key, value]) =>
    `| ${accessLabels[key] || escapeCell(key.replaceAll('_', ' '))} | ${value ? 'Yes' : 'No'} |`,
  ).join('\n');

  const normalizedBody = normalizePublicBody(entry.body, metadata.description, grouped);
  const {guidance, examples: migratedExamples} = splitExamplesSection(
    normalizedBody,
    sectionHeading,
  );
  const examples = [migratedExamples, fixtureExamples].filter(Boolean).join('\n\n');
  const examplesSection = examples ? `${sectionHeading} Examples\n\n${examples}` : '';
  const namespace = metadata.namespace || 'Root-level';
  const documentationGroup = entryGroup(entry);
  const aliases = metadata.aliases.length ?
    metadata.aliases.map((alias) => `\`${alias}\``).join(', ') : 'None';
  const lifecycleSuffix = metadata.status === 'deprecated' ? ' (Deprecated)' :
    metadata.status === 'removed' ? ' (Removed)' : '';
  const displayTitle = `${metadata.title}${lifecycleSuffix}`;
  const replacement = metadata.replaced_by ? entriesByKey.get(metadata.replaced_by) : null;
  const replacementLink = replacement ?
    `[\`${metadata.replaced_by}\`](${entryRoute(replacement)})` :
    metadata.replaced_by ? `\`${metadata.replaced_by}\`` : '';
  const lifecycleNotice = metadata.status === 'deprecated' ? `:::warning Deprecated
This compatibility wrangle remains available for existing recipes. Use ${replacementLink} for new recipes.
:::

` : metadata.status === 'removed' ? `:::danger Removed
This wrangle is retained only to document historical recipes.${replacementLink ? ` Use ${replacementLink} instead.` : ''}
:::

` : '';
  const entryHeading = grouped ?
    `## ${displayTitle} {#${entryAnchor(entry)}}\n\n` : '';
  return `${entryHeading}${lifecycleNotice}${escapeMdxText(metadata.description)}

${guidance}

${sectionHeading} Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
${parameterRows.map((row) => `| ${row.join(' | ')} |`).join('\n')}

</div>

${examplesSection}

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
${accessRows}

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Recipe key | \`${metadata.wrangle_key}\` |
| Lifecycle status | ${metadata.status} |
${metadata.replaced_by ? `| Replaced by | ${replacementLink} |\n` : ''}| Namespace | ${namespace === 'Root-level' ? namespace : `\`${namespace}\``} |
| Documentation group | \`${documentationGroup}\` |
| Aliases | ${aliases} |
| Runtime symbol | \`${metadata.runtime.symbol}\` |

**Sources**

${sourceRows}

</details>
`;
}

function renderEntryPage(entry, controls, entriesByKey) {
  const metadata = entry.metadata;
  const lifecycleSuffix = metadata.status === 'deprecated' ? ' (Deprecated)' :
    metadata.status === 'removed' ? ' (Removed)' : '';
  const displayTitle = `${metadata.title}${lifecycleSuffix}`;
  return `---
title: "${displayTitle.replaceAll('"', '\\"')}"
description: "${metadata.description.replaceAll('"', '\\"')}"
sidebar_label: "${displayTitle.replaceAll('"', '\\"')}"
slug: "/${metadata.slug}"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# ${displayTitle}

${renderEntryContent(entry, controls, {entriesByKey})}`;
}

function groupedEntries(entries) {
  const statusRank = {active: 0, draft: 1, deprecated: 2, removed: 3};
  const groupsByName = new Map();
  for (const entry of entries) {
    const group = entryGroup(entry);
    if (!groupsByName.has(group)) groupsByName.set(group, []);
    groupsByName.get(group).push(entry);
  }

  const orderOf = (group) => {
    const index = GROUP_ORDER.indexOf(group);
    return index < 0 ? Number.MAX_SAFE_INTEGER : index;
  };
  return [...groupsByName.entries()]
    .map(([group, groupItems]) => ({
      group,
      entries: groupItems.sort((left, right) =>
        (statusRank[left.metadata.status] ?? 99) - (statusRank[right.metadata.status] ?? 99) ||
        left.metadata.wrangle_key.localeCompare(right.metadata.wrangle_key),
      ),
    }))
    .sort((left, right) =>
      orderOf(left.group) - orderOf(right.group) || left.group.localeCompare(right.group),
    );
}

function renderNamespacePage(grouped, controls, entriesByKey) {
  const label = groupLabel(grouped.group);
  const description = `${label} wrangles, with recipe examples, parameters, and behavior.`;
  const sections = grouped.entries.map((entry) =>
    renderEntryContent(entry, controls, {grouped: true, entriesByKey}),
  ).join('\n\n---\n\n');
  return `---
title: "${label} Wrangles"
description: "${description}"
sidebar_label: "${label}"
slug: "/namespaces/${grouped.group}"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# ${label} Wrangles

${description}

${sections}`;
}

function renderRegistrySidebar(groups) {
  const items = groups.map(({group}) =>
    `    {type: 'doc', id: 'namespaces/${group}', label: '${groupLabel(group)}'},`,
  ).join('\n');
  return `/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebarsRegistry = {
  registrySidebar: [
    {type: 'doc', id: 'index', label: 'Registry Pilot'},
${items}
  ],
};

export default sidebarsRegistry;
`;
}

function renderDocsIndex(groups) {
  const rows = groups.map(({group, entries}) =>
    `| [${groupLabel(group)}](${groupRoute(group)}) | ${entries.length} | ${groupLabel(group)} wrangles and compatibility entries. |`,
  ).join('\n');
  return `---
title: Wrangles Registry Pilot
description: Pilot of the versioned Wrangles recipe knowledge registry.
slug: /
registry_entry: true
---

# Wrangles Registry Pilot

This preview contains the first Registry records compiled from the new
Markdown contract. These pages are not yet the production replacement for the
existing wrangle reference. Wrangles are grouped using their Registry namespace;
root-level compatibility keys remain in their existing documentation group.

| Namespace or group | Wrangles | Description |
| --- | ---: | --- |
${rows}
`;
}

function renderRawIndex(entries) {
  const rows = entries.map((entry) => {
    const rawRelative = posixPath(path.relative(registryRoot, entry.sourceFile));
    return `- [\`${entry.metadata.wrangle_key}\`](${rawRelative}): ${entry.metadata.description}`;
  }).join('\n');
  return `---
okf_version: "0.2"
type: collection
title: Wrangles Registry
description: Public pilot bundle for Wrangles recipe primitives.
status: pilot
registry_version: ${REGISTRY_VERSION}
---

# Wrangles Registry

This is the public, agent-readable pilot bundle. Use \`manifest.json\` for
structured discovery.

${rows}
`;
}

function schemaAcceptsValue(schema, value) {
  for (const keyword of ['anyOf', 'oneOf']) {
    if (Array.isArray(schema[keyword])) {
      return schema[keyword].some((option) => schemaAcceptsValue(option, value));
    }
  }
  if (value === null) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    return types.includes('null');
  }
  if (Array.isArray(schema.enum)) return schema.enum.includes(value);
  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  if (Array.isArray(value)) return types.includes('array');
  if (typeof value === 'number') {
    return types.includes('number') || (Number.isInteger(value) && types.includes('integer'));
  }
  return types.includes(typeof value);
}

function buildParameterSchema(parameter) {
  const result = JSON.parse(JSON.stringify(parameter.schema));
  result.description = parameter.description;
  if (
    hasOwn(parameter, 'runtime_default') &&
    schemaAcceptsValue(parameter.schema, parameter.runtime_default)
  ) {
    result.default = parameter.runtime_default;
  }
  return result;
}

function buildRecipeSchema(entries, controls) {
  const wrangleProperties = {};
  for (const entry of entries) {
    const parameters = combinedParameters(entry, controls);
    const properties = Object.fromEntries(
      parameters
        .filter((parameter) => !parameter.name_pattern)
        .map((parameter) => [parameter.name, buildParameterSchema(parameter)]),
    );
    const patternProperties = Object.fromEntries(
      parameters
        .filter((parameter) => parameter.name_pattern)
        .map((parameter) => [parameter.name_pattern, buildParameterSchema(parameter)]),
    );
    const required = parameters
      .filter((parameter) => parameter.required && !parameter.name_pattern)
      .map((parameter) => parameter.name);
    const configuration = {
      type: 'object',
      description: entry.metadata.description,
      additionalProperties: false,
      properties,
    };
    if (Object.keys(patternProperties).length) configuration.patternProperties = patternProperties;
    if (required.length) configuration.required = required;
    for (const recipeKey of [entry.metadata.wrangle_key, ...entry.metadata.aliases]) {
      wrangleProperties[recipeKey] = configuration;
    }
  }

  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: `${PUBLIC_ORIGIN}/schemas/recipes/pilot/schema.json`,
    title: 'Wrangles Recipe Schema - Registry Pilot',
    description: 'Pilot schema containing only the initial Registry entries.',
    $comment: 'Not the production recipe schema. Generated from Registry version 0.1.0-pilot.',
    type: 'object',
    additionalProperties: false,
    required: ['wrangles'],
    properties: {
      wrangles: {
        type: 'array',
        minItems: 1,
        items: {$ref: '#/$defs/wrangles/items'},
      },
    },
    $defs: {
      wrangles: {
        items: {
          type: 'object',
          description: 'One Registry-backed wrangle step.',
          minProperties: 1,
          maxProperties: 1,
          additionalProperties: false,
          patternProperties: {
            '^custom\\..*': {type: 'object'},
            '^pandas\\..*': {type: 'object'},
          },
          properties: wrangleProperties,
        },
      },
      write: {
        items: {
          type: 'object',
          description: 'One write connector step from the wider recipe contract.',
          minProperties: 1,
          maxProperties: 1,
        },
      },
    },
  };
}

function buildEntryContract(entry, controls) {
  const metadata = entry.metadata;
  const examples = metadata.examples.map((example) => {
    const inputPath = path.resolve(path.dirname(entry.sourceFile), example.input_fixture);
    const outputPath = path.resolve(path.dirname(entry.sourceFile), example.output_fixture);
    return {
      id: example.id,
      title: example.title,
      recipe: example.recipe,
      input_fixture: `/registry/${posixPath(path.relative(registryRoot, inputPath))}`,
      output_fixture: `/registry/${posixPath(path.relative(registryRoot, outputPath))}`,
      verification: example.verification,
    };
  });

  return {
    format: 'wrangles-registry-entry',
    registry_version: REGISTRY_VERSION,
    schema_version: metadata.schema_version,
    type: metadata.type,
    id: metadata.id,
    wrangle_name: metadata.wrangle_name,
    namespace: metadata.namespace,
    wrangle_key: metadata.wrangle_key,
    aliases: metadata.aliases,
    slug: metadata.slug,
    title: metadata.title,
    description: metadata.description,
    status: metadata.status,
    ...(metadata.replaced_by ? {replaced_by: metadata.replaced_by} : {}),
    visibility: metadata.visibility,
    tags: metadata.tags,
    runtime: metadata.runtime,
    access: metadata.access,
    capabilities: metadata.capabilities,
    parameters: combinedParameters(entry, controls),
    examples,
    guidance: stripLeadingTitle(entry.body),
    sources: metadata.sources,
  };
}

function docstringProperties(schema) {
  if (!isObject(schema)) return {};
  if (isObject(schema.properties)) return schema.properties;
  if (Array.isArray(schema.anyOf)) {
    for (let index = schema.anyOf.length - 1; index >= 0; index -= 1) {
      if (isObject(schema.anyOf[index]?.properties)) return schema.anyOf[index].properties;
    }
  }
  return {};
}

function docstringRequired(schema) {
  if (!isObject(schema)) return [];
  if (Array.isArray(schema.required)) return schema.required;
  if (Array.isArray(schema.anyOf)) {
    for (let index = schema.anyOf.length - 1; index >= 0; index -= 1) {
      if (Array.isArray(schema.anyOf[index]?.required)) return schema.anyOf[index].required;
    }
  }
  return [];
}

function parameterComparisonName(parameter) {
  return parameter.name_pattern
    ? parameter.name.replace(/\.\*$/, '.placeholder')
    : parameter.name;
}

function compareEmbeddedSchema(entry, runtime) {
  if (runtime.docstring_schema_status === 'missing') {
    return [{code: 'missing_docstring_schema'}];
  }

  const differences = [];
  const registryParameters = new Map(
    entry.metadata.parameters.map((parameter) => [parameterComparisonName(parameter), parameter]),
  );
  const runtimeParameters = new Map(
    runtime.parameters.map((parameter) => [parameter.name, parameter]),
  );
  const properties = docstringProperties(runtime.docstring_schema);
  const required = new Set(docstringRequired(runtime.docstring_schema));
  const allNames = [...new Set([
    ...registryParameters.keys(),
    ...Object.keys(properties),
  ])].sort();

  for (const name of allNames) {
    const registryParameter = registryParameters.get(name);
    const docstringParameter = properties[name];
    if (!registryParameter) {
      differences.push({code: 'docstring_only_parameter', parameter: name});
      continue;
    }
    if (!docstringParameter) {
      differences.push({code: 'registry_only_parameter', parameter: name});
      continue;
    }

    const runtimeParameter = runtimeParameters.get(name);
    if (runtimeParameter && required.has(name) !== runtimeParameter.required) {
      differences.push({
        code: 'docstring_required_mismatch',
        parameter: name,
        runtime_required: runtimeParameter.required,
        docstring_required: required.has(name),
      });
    }
    if (!valuesEqual(
      canonicalizeSchema(registryParameter.schema),
      canonicalizeSchema(docstringParameter),
    )) {
      differences.push({
        code: 'schema_constraint_difference',
        parameter: name,
        registry_schema: canonicalizeSchema(registryParameter.schema),
        docstring_schema: canonicalizeSchema(docstringParameter),
      });
    }
  }

  if (runtime.docstring_schema.additionalProperties !== false) {
    differences.push({code: 'docstring_allows_additional_properties'});
  }
  return differences;
}

function effectiveRuntimeParameters(runtime) {
  const parameters = new Map(
    runtime.parameters.map((parameter) => [parameter.name, {
      ...parameter,
      source: 'signature',
    }]),
  );
  if (runtime.variadic.keyword && runtime.docstring_schema_status === 'available') {
    const properties = docstringProperties(runtime.docstring_schema);
    const required = new Set(docstringRequired(runtime.docstring_schema));
    for (const name of Object.keys(properties)) {
      if (!parameters.has(name)) {
        parameters.set(name, {
          name,
          required: required.has(name),
          source: 'embedded-schema-for-kwargs',
        });
      }
    }
  }
  for (const control of ['if', 'where', 'where_params']) {
    if (runtime.capabilities[control]) {
      parameters.set(control, {name: control, required: false});
    }
  }
  return parameters;
}

function effectiveEmbeddedParameters(runtime) {
  if (runtime.docstring_schema_status === 'missing') return null;
  const properties = docstringProperties(runtime.docstring_schema);
  const required = new Set(docstringRequired(runtime.docstring_schema));
  const parameters = new Map(
    Object.keys(properties).map((name) => [name, {name, required: required.has(name)}]),
  );
  for (const control of ['if', 'where', 'where_params']) {
    if (runtime.capabilities[control]) {
      parameters.set(control, {name: control, required: false});
    }
  }
  return parameters;
}

function effectiveNormalizedParameters(entry) {
  const parameters = new Map(
    entry.metadata.parameters.map((parameter) => [parameterComparisonName(parameter), {
      name: parameterComparisonName(parameter),
      required: parameter.required,
    }]),
  );
  for (const [name, enabled] of Object.entries(entry.metadata.capabilities)) {
    if (enabled) parameters.set(name, {name, required: false});
  }
  return parameters;
}

function compareQuasiToRuntime(quasi, runtime) {
  if (!runtime) return [{code: 'missing_runtime_wrangle'}];
  const differences = [];
  const quasiParameters = new Map(
    quasi.parameters.map((parameter) => [parameter.name, parameter]),
  );
  const runtimeParameters = effectiveRuntimeParameters(runtime);
  const names = [...new Set([
    ...quasiParameters.keys(),
    ...runtimeParameters.keys(),
  ])].sort();

  for (const name of names) {
    const quasiParameter = quasiParameters.get(name);
    const runtimeParameter = runtimeParameters.get(name);
    if (!quasiParameter) {
      differences.push({code: 'runtime_only_parameter', parameter: name});
    } else if (!runtimeParameter) {
      differences.push({code: 'quasi_registry_only_parameter', parameter: name});
    } else if (quasiParameter.required !== runtimeParameter.required) {
      differences.push({
        code: 'required_mismatch',
        parameter: name,
        quasi_registry_required: quasiParameter.required,
        runtime_required: runtimeParameter.required,
      });
    }
  }
  return differences;
}

function compareQuasiToEmbeddedSchema(quasi, runtime) {
  if (!runtime) return [];
  const embeddedParameters = effectiveEmbeddedParameters(runtime);
  if (!embeddedParameters) return [{code: 'missing_docstring_schema'}];

  const differences = [];
  const quasiParameters = new Map(
    quasi.parameters.map((parameter) => [parameter.name, parameter]),
  );
  const names = [...new Set([
    ...quasiParameters.keys(),
    ...embeddedParameters.keys(),
  ])].sort();
  for (const name of names) {
    const quasiParameter = quasiParameters.get(name);
    const embeddedParameter = embeddedParameters.get(name);
    if (!quasiParameter) {
      differences.push({code: 'embedded_schema_only_parameter', parameter: name});
    } else if (!embeddedParameter) {
      differences.push({code: 'quasi_registry_only_parameter', parameter: name});
    } else if (quasiParameter.required !== embeddedParameter.required) {
      differences.push({
        code: 'embedded_required_mismatch',
        parameter: name,
        quasi_registry_required: quasiParameter.required,
        embedded_schema_required: embeddedParameter.required,
      });
    }
  }
  return differences;
}

function compareQuasiToNormalized(quasi, normalized) {
  if (!normalized) return [];
  const differences = [];
  if (quasi.id && quasi.id !== normalized.metadata.id) {
    differences.push({
      code: 'id_mismatch',
      quasi_registry: quasi.id,
      normalized_registry: normalized.metadata.id,
    });
  }

  const quasiParameters = new Map(
    quasi.parameters.map((parameter) => [parameter.name, parameter]),
  );
  const normalizedParameters = effectiveNormalizedParameters(normalized);
  const names = [...new Set([
    ...quasiParameters.keys(),
    ...normalizedParameters.keys(),
  ])].sort();
  for (const name of names) {
    const quasiParameter = quasiParameters.get(name);
    const normalizedParameter = normalizedParameters.get(name);
    if (!quasiParameter) {
      differences.push({code: 'normalized_registry_only_parameter', parameter: name});
    } else if (!normalizedParameter) {
      differences.push({code: 'quasi_registry_only_parameter', parameter: name});
    } else if (quasiParameter.required !== normalizedParameter.required) {
      differences.push({
        code: 'required_mismatch',
        parameter: name,
        quasi_registry_required: quasiParameter.required,
        normalized_registry_required: normalizedParameter.required,
      });
    }
  }

  for (const [name, normalizedValue] of Object.entries(normalized.metadata.access)) {
    if (quasi.access[name] !== null && quasi.access[name] !== normalizedValue) {
      differences.push({
        code: 'access_mismatch',
        requirement: name,
        quasi_registry: quasi.access[name],
        normalized_registry: normalizedValue,
      });
    }
  }
  return differences;
}

function reconcileRegistry(entries, runtimeManifest, quasiRegistry) {
  const runtimeByKey = new Map(
    runtimeManifest.wrangles.map((wrangle) => [wrangle.runtime_key, wrangle]),
  );
  const normalizedByDeclaredKey = new Map();
  for (const entry of entries) {
    for (const key of [entry.metadata.wrangle_key, ...entry.metadata.aliases]) {
      normalizedByDeclaredKey.set(key, entry);
    }
  }
  const normalizedResults = [];

  for (const entry of [...entries].sort((left, right) =>
    left.metadata.wrangle_key.localeCompare(right.metadata.wrangle_key))) {
    const declaredKeys = [entry.metadata.wrangle_key, ...entry.metadata.aliases];
    const matchedKeys = declaredKeys.filter((key) => runtimeByKey.has(key));
    const preferredKey = matchedKeys.includes(entry.metadata.wrangle_key)
      ? entry.metadata.wrangle_key
      : matchedKeys[0];
    const runtime = preferredKey ? runtimeByKey.get(preferredKey) : null;
    const issues = [];

    if (!runtime) {
      issues.push({code: 'registry_only'});
      fail(entry.sourceFile, 'no wrangle_key or alias exists in the runtime manifest');
    } else {
      if (runtime.python_symbol !== entry.metadata.runtime.symbol) {
        issues.push({
          code: 'python_symbol_mismatch',
          registry: entry.metadata.runtime.symbol,
          runtime: runtime.python_symbol,
        });
      }

      const registryParameters = new Map(
        entry.metadata.parameters.map((parameter) => [parameterComparisonName(parameter), parameter]),
      );
      const runtimeParameters = effectiveRuntimeParameters(runtime);
      for (const control of ['if', 'where', 'where_params']) runtimeParameters.delete(control);
      for (const name of [...new Set([
        ...registryParameters.keys(),
        ...runtimeParameters.keys(),
      ])].sort()) {
        const registryParameter = registryParameters.get(name);
        const runtimeParameter = runtimeParameters.get(name);
        if (!registryParameter) {
          issues.push({code: 'runtime_only_parameter', parameter: name});
          continue;
        }
        if (!runtimeParameter) {
          issues.push({code: 'registry_only_parameter', parameter: name});
          continue;
        }
        if (registryParameter.required !== runtimeParameter.required) {
          issues.push({
            code: 'required_mismatch',
            parameter: name,
            registry: registryParameter.required,
            runtime: runtimeParameter.required,
          });
        }
        const registryHasDefault = hasOwn(registryParameter, 'runtime_default');
        const runtimeHasDefault = hasOwn(runtimeParameter, 'default');
        if (registryHasDefault !== runtimeHasDefault || (
          registryHasDefault && !valuesEqual(
            registryParameter.runtime_default,
            runtimeParameter.default,
          )
        )) {
          issues.push({
            code: 'default_mismatch',
            parameter: name,
            registry: registryHasDefault ? registryParameter.runtime_default : '<required>',
            runtime: runtimeHasDefault ? runtimeParameter.default : '<required>',
          });
        }
      }

      for (const control of ['if', 'where', 'where_params']) {
        if (entry.metadata.capabilities[control] !== runtime.capabilities[control]) {
          issues.push({
            code: 'capability_mismatch',
            capability: control,
            registry: entry.metadata.capabilities[control],
            runtime: runtime.capabilities[control],
          });
        }
      }

      for (const issue of issues) {
        fail(entry.sourceFile, `runtime reconciliation ${issue.code}: ${JSON.stringify(issue)}`);
      }
      if (issues.length === 0 && entry.metadata.runtime.contract_status !== 'verified') {
        fail(entry.sourceFile, 'runtime.contract_status must be verified after reconciliation');
      }
    }

    normalizedResults.push({
      wrangle_key: entry.metadata.wrangle_key,
      matched_runtime_keys: matchedKeys,
      status: runtime && issues.length === 0 ? 'verified' : 'conflict',
      runtime_issues: issues,
      embedded_schema_differences: runtime ? compareEmbeddedSchema(entry, runtime) : [],
    });
  }

  const quasiByKey = new Map(
    quasiRegistry.entries.map((entry) => [entry.wrangle_key, entry]),
  );
  const quasiResults = quasiRegistry.entries.map((quasi) => {
    const runtime = runtimeByKey.get(quasi.wrangle_key) || null;
    const normalized = normalizedByDeclaredKey.get(quasi.wrangle_key) || null;
    return {
      wrangle_key: quasi.wrangle_key,
      source_file: quasi.source_file,
      source_sha256: quasi.source_sha256,
      id: quasi.id,
      runtime_status: runtime ? 'matched' : 'missing',
      normalized_registry_status: normalized ? 'matched' : 'awaiting-normalization',
      runtime_parameter_differences: compareQuasiToRuntime(quasi, runtime),
      embedded_schema_differences: compareQuasiToEmbeddedSchema(quasi, runtime),
      normalized_registry_differences: compareQuasiToNormalized(quasi, normalized),
      migration_content: {
        title: quasi.title,
        type: quasi.type,
        subtype: quasi.subtype,
        variant: quasi.variant,
        status: quasi.status,
        tags: quasi.tags,
        parameters: quasi.parameters,
        access: quasi.access,
      },
    };
  });
  const runtimeWithoutQuasi = runtimeManifest.wrangles
    .filter((wrangle) => !quasiByKey.has(wrangle.runtime_key))
    .map((wrangle) => ({
      runtime_key: wrangle.runtime_key,
      python_symbol: wrangle.python_symbol,
      docstring_schema_status: wrangle.docstring_schema_status,
    }));
  const quasiWithoutRuntime = quasiResults.filter((entry) => entry.runtime_status === 'missing');
  const normalizedWithoutQuasi = entries
    .filter((entry) => ![entry.metadata.wrangle_key, ...entry.metadata.aliases]
      .some((key) => quasiByKey.has(key)))
    .map((entry) => entry.metadata.wrangle_key)
    .sort();
  const runtimeWithoutNormalized = runtimeManifest.wrangles
    .filter((runtime) => !normalizedByDeclaredKey.has(runtime.runtime_key))
    .map((runtime) => runtime.runtime_key)
    .sort();
  for (const runtimeKey of runtimeWithoutNormalized) {
    fail(
      runtimeManifestPath,
      `runtime key ${runtimeKey} has no normalized Registry entry; run npm run bootstrap:registry`,
    );
  }

  return {
    format: 'wrangles-registry-reconciliation',
    format_version: '0.2',
    registry_version: REGISTRY_VERSION,
    runtime_source: runtimeManifest.source,
    summary: {
      runtime_entries: runtimeManifest.wrangles.length,
      embedded_schema_entries: runtimeManifest.wrangles.filter(
        (wrangle) => wrangle.docstring_schema_status === 'available',
      ).length,
      quasi_registry_entries: quasiResults.length,
      normalized_registry_entries: entries.length,
      normalized_verified_entries: normalizedResults.filter(
        (result) => result.status === 'verified',
      ).length,
      normalized_conflicting_entries: normalizedResults.filter(
        (result) => result.status === 'conflict',
      ).length,
      normalized_entries_with_embedded_schema_differences: normalizedResults.filter(
        (result) => result.embedded_schema_differences.length > 0,
      ).length,
      runtime_entries_without_embedded_schema: runtimeManifest.wrangles.filter(
        (wrangle) => wrangle.docstring_schema_status === 'missing',
      ).length,
      normalized_and_quasi_entries: quasiResults.filter(
        (entry) => entry.normalized_registry_status === 'matched',
      ).length,
      quasi_entries_awaiting_normalization: quasiResults.filter(
        (entry) => entry.normalized_registry_status === 'awaiting-normalization',
      ).length,
      runtime_entries_without_normalized_registry: runtimeWithoutNormalized.length,
      runtime_entries_without_quasi_registry: runtimeWithoutQuasi.length,
      quasi_entries_without_runtime: quasiWithoutRuntime.length,
      quasi_entries_without_id: quasiResults.filter((entry) => !entry.id).length,
      supporting_markdown_files: quasiRegistry.supportingMarkdown.length,
    },
    normalized_registry_entries: normalizedResults,
    quasi_registry_entries: quasiResults,
    runtime_without_quasi_registry: runtimeWithoutQuasi,
    quasi_registry_without_runtime: quasiWithoutRuntime.map((entry) => ({
      wrangle_key: entry.wrangle_key,
      source_file: entry.source_file,
    })),
    normalized_registry_without_quasi: normalizedWithoutQuasi,
    runtime_without_normalized_registry: runtimeWithoutNormalized,
    supporting_markdown: quasiRegistry.supportingMarkdown,
  };
}

function renderReconciliationReport(report) {
  const registryRows = report.normalized_registry_entries.map((entry) => {
    const runtimeKeys = entry.matched_runtime_keys.length
      ? entry.matched_runtime_keys.map((key) => `\`${key}\``).join(', ')
      : 'none';
    return `| \`${entry.wrangle_key}\` | ${runtimeKeys} | ${entry.status} | ${entry.runtime_issues.length} | ${entry.embedded_schema_differences.length} |`;
  }).join('\n');
  const runtimeWithoutQuasiRows = report.runtime_without_quasi_registry.map((entry) =>
    `| \`${entry.runtime_key}\` | \`${entry.python_symbol}\` | ${entry.docstring_schema_status} |`,
  ).join('\n');
  const embeddedRows = report.normalized_registry_entries.flatMap((entry) =>
    entry.embedded_schema_differences.map((difference) => {
      let detail = 'See the JSON report for both schema fragments.';
      if (difference.code === 'docstring_required_mismatch') {
        detail = `runtime required=${difference.runtime_required}; docstring required=${difference.docstring_required}`;
      } else if (difference.code === 'docstring_allows_additional_properties') {
        detail = 'The curated Registry contract rejects undocumented parameters.';
      } else if (difference.code === 'missing_docstring_schema') {
        detail = 'The callable is present but has no embedded Python schema docstring.';
      }
      const parameter = difference.parameter ? `\`${difference.parameter}\`` : '—';
      return `| \`${entry.wrangle_key}\` | ${difference.code} | ${parameter} | ${detail} |`;
    }),
  ).join('\n');
  const quasiRows = report.quasi_registry_entries.map((entry) =>
    `| \`${entry.wrangle_key}\` | \`${entry.source_file}\` | ${entry.id ? `\`${entry.id}\`` : 'missing'} | ${entry.runtime_status} | ${entry.normalized_registry_status} | ${entry.runtime_parameter_differences.length} | ${entry.embedded_schema_differences.length} |`,
  ).join('\n');
  const supportingRows = report.supporting_markdown.map((entry) =>
    `- \`${entry.source_file}\` (SHA-256 \`${entry.source_sha256.slice(0, 12)}…\`)`,
  ).join('\n');

  return `# Wrangles Registry Source Reconciliation

Generated file. Do not edit directly.

- Runtime source: [\`${report.runtime_source.revision}\`](${report.runtime_source.repository}/commit/${report.runtime_source.revision})
- Registry version: \`${report.registry_version}\`
- Runtime entries: ${report.summary.runtime_entries}
- Embedded Python schema docstrings: ${report.summary.embedded_schema_entries}
- Existing quasi-registry records: ${report.summary.quasi_registry_entries}
- Normalized Registry entries: ${report.summary.normalized_registry_entries}
- Verified normalized entries: ${report.summary.normalized_verified_entries}
- Quasi-registry records awaiting normalization: ${report.summary.quasi_entries_awaiting_normalization}
- Runtime entries without quasi-registry Markdown: ${report.summary.runtime_entries_without_quasi_registry}
- Quasi-registry records without runtime matches: ${report.summary.quasi_entries_without_runtime}
- Quasi-registry records without UUIDs: ${report.summary.quasi_entries_without_id}
- Supporting and aggregate Markdown files: ${report.summary.supporting_markdown_files}

Embedded Python schema differences and quasi-registry differences are migration
evidence, not runtime contract failures. The first pass resolves runtime facts
from code, then enriches them from embedded schemas and quasi-registry Markdown.
Signature-owned names, required status, defaults, symbols, and common-control
capabilities must reconcile; individual records can be curated in place later.

## Normalized Registry entries

| Registry key | Matched runtime key | Status | Runtime issues | Embedded schema differences |
| --- | --- | --- | ---: | ---: |
${registryRows}

## Embedded Python schema differences

| Registry key | Difference | Parameter | Detail |
| --- | --- | --- | --- |
${embeddedRows || '| — | none | — | — |'}

## Existing quasi-registry inventory

Every per-wrangle \`_sources/*.md\` record is included below. Display defaults
are retained as migration content and are not treated as Python runtime defaults.
The JSON report records a SHA-256 hash of every source file so changes anywhere
in the quasi-registry remain reviewable.

| Wrangle key | Source Markdown | UUID | Runtime | Normalization | Runtime parameter differences | Embedded schema differences |
| --- | --- | --- | --- | --- | ---: | ---: |
${quasiRows}

## Runtime entries without quasi-registry Markdown

| Runtime key | Python symbol | Embedded schema |
| --- | --- | --- |
${runtimeWithoutQuasiRows || '| — | none | — |'}

## Supporting and aggregate Markdown

These files are accounted for as context or templates rather than one-to-one
wrangle records.

${supportingRows}
`;
}

function addGeneratedFile(filename, content) {
  generatedFiles.set(path.resolve(filename), content.endsWith('\n') ? content : `${content}\n`);
}

async function readInputs() {
  const entrySchemaSource = await fs.readFile(entrySchemaPath, 'utf8');
  const runtimeManifestSchemaSource = await fs.readFile(runtimeManifestSchemaPath, 'utf8');
  const entrySchema = JSON.parse(entrySchemaSource);
  const runtimeManifestSchema = JSON.parse(runtimeManifestSchemaSource);
  const runtimeManifest = JSON.parse(await fs.readFile(runtimeManifestPath, 'utf8'));
  const quasiRegistry = await readQuasiRegistry();
  validateRuntimeManifest(runtimeManifest);
  if (runtimeManifest.$schema !== runtimeManifestSchema.$id) {
    fail(runtimeManifestPath, '$schema does not match the pinned runtime manifest schema');
  }
  const commonDocument = yaml.load(await fs.readFile(commonControlsPath, 'utf8'));
  if (
    !isObject(commonDocument) ||
    commonDocument.schema_version !== ENTRY_SCHEMA_VERSION ||
    !isObject(commonDocument.controls)
  ) {
    throw new Error('registry/common/wrangle-controls.yaml is invalid');
  }
  for (const [name, control] of Object.entries(commonDocument.controls)) {
    if (
      !isObject(control) ||
      typeof control.description !== 'string' ||
      !PARAM_GROUP_ORDER.includes(control.param_group)
    ) {
      throw new Error(`Common control ${name} is invalid`);
    }
    validateSchemaFragment(control.schema, commonControlsPath, `controls.${name}`);
  }

  const entries = [];
  for (const sourceFile of await listFiles(entriesRoot, '.md')) {
    const source = await fs.readFile(sourceFile, 'utf8');
    const parsed = parseFrontmatter(source, sourceFile);
    if (!parsed) continue;
    validateTopLevel(parsed.metadata, sourceFile, entrySchema);
    validateParameters(parsed.metadata, sourceFile);
    const entry = {sourceFile, source, ...parsed};
    if (Array.isArray(parsed.metadata.examples)) await validateExamples(entry);
    entries.push(entry);
  }

  const ids = new Set();
  const slugs = new Set();
  const recipeKeys = new Set();
  for (const entry of entries) {
    if (entry.metadata.id !== null) {
      if (ids.has(entry.metadata.id)) fail(entry.sourceFile, `duplicate id ${entry.metadata.id}`);
      ids.add(entry.metadata.id);
    }

    if (slugs.has(entry.metadata.slug)) fail(entry.sourceFile, `duplicate slug ${entry.metadata.slug}`);
    slugs.add(entry.metadata.slug);

    for (const recipeKey of [entry.metadata.wrangle_key, ...(entry.metadata.aliases || [])]) {
      if (recipeKeys.has(recipeKey)) fail(entry.sourceFile, `duplicate recipe key or alias ${recipeKey}`);
      recipeKeys.add(recipeKey);
    }
  }
  for (const entry of entries) {
    if (entry.metadata.replaced_by && !recipeKeys.has(entry.metadata.replaced_by)) {
      fail(entry.sourceFile, `replaced_by references unknown recipe key ${entry.metadata.replaced_by}`);
    }
  }

  return {
    entries,
    controls: commonDocument.controls,
    runtimeManifest,
    quasiRegistry,
    registrySchemas: {
      entry: entrySchema,
      runtimeManifest: runtimeManifestSchema,
    },
  };
}

function buildOutputs(entries, controls, reconciliation, registrySchemas, runtimeManifest) {
  const publicEntries = entries
    .filter((entry) => entry.metadata.visibility === 'public')
    .sort((left, right) => left.metadata.wrangle_key.localeCompare(right.metadata.wrangle_key));

  const groups = groupedEntries(publicEntries);
  const entriesByKey = new Map(publicEntries.map((entry) => [entry.metadata.wrangle_key, entry]));

  addGeneratedFile(path.join(docsOutputRoot, 'index.md'), renderDocsIndex(groups));
  addGeneratedFile(registrySidebarPath, renderRegistrySidebar(groups));
  for (const group of groups) {
    addGeneratedFile(
      path.join(docsOutputRoot, 'namespaces', `${group.group}.md`),
      renderNamespacePage(group, controls, entriesByKey),
    );
  }
  for (const entry of publicEntries) {
    addGeneratedFile(
      path.join(docsOutputRoot, entryOutputRelativePath(entry)),
      renderEntryPage(entry, controls, entriesByKey),
    );
    const rawRelative = path.relative(registryRoot, entry.sourceFile);
    addGeneratedFile(path.join(rawOutputRoot, rawRelative), entry.source);
    addGeneratedFile(
      path.join(rawOutputRoot, entryContractRelativePath(entry)),
      JSON.stringify(buildEntryContract(entry, controls), null, 2),
    );
    for (const example of entry.metadata.examples) {
      for (const fixtureField of ['input_fixture', 'output_fixture']) {
        const fixturePath = path.resolve(path.dirname(entry.sourceFile), example[fixtureField]);
        const fixtureRelative = path.relative(registryRoot, fixturePath);
        addGeneratedFile(
          path.join(rawOutputRoot, fixtureRelative),
          JSON.stringify(example[`_${fixtureField}`], null, 2),
        );
      }
    }
  }

  addGeneratedFile(path.join(rawOutputRoot, 'index.md'), renderRawIndex(publicEntries));
  const manifest = {
    format: 'wrangles-registry',
    registry_version: REGISTRY_VERSION,
    contract_version: ENTRY_SCHEMA_VERSION,
    status: 'pilot',
    entry_count: publicEntries.length,
    entries: publicEntries.map((entry) => ({
      type: entry.metadata.type,
      id: entry.metadata.id,
      wrangle_name: entry.metadata.wrangle_name,
      namespace: entry.metadata.namespace,
      wrangle_key: entry.metadata.wrangle_key,
      aliases: entry.metadata.aliases,
      slug: entry.metadata.slug,
      title: entry.metadata.title,
      description: entry.metadata.description,
      status: entry.metadata.status,
      ...(entry.metadata.replaced_by ? {replaced_by: entry.metadata.replaced_by} : {}),
      tags: entry.metadata.tags,
      route: entryRoute(entry),
      contract_json: `/registry/${posixPath(entryContractRelativePath(entry))}`,
      raw_markdown: `/registry/${posixPath(path.relative(registryRoot, entry.sourceFile))}`,
      runtime_symbol: entry.metadata.runtime.symbol,
      runtime_contract_status: entry.metadata.runtime.contract_status,
      example_count: entry.metadata.examples.length,
    })),
    artifacts: {
      index: '/registry/index.md',
      recipe_schema: '/schemas/recipes/pilot/schema.json',
      entry_schema: '/registry/schema/wrangle-entry.schema.json',
      runtime_manifest: '/registry/runtime/wranglespy.json',
      runtime_manifest_schema: '/registry/schema/wrangles-runtime-manifest.schema.json',
    },
  };
  addGeneratedFile(
    path.join(rawOutputRoot, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
  );
  addGeneratedFile(
    path.join(schemaOutputRoot, 'schema.json'),
    JSON.stringify(buildRecipeSchema(publicEntries, controls), null, 2),
  );
  addGeneratedFile(
    path.join(rawOutputRoot, 'schema', 'wrangle-entry.schema.json'),
    JSON.stringify(registrySchemas.entry, null, 2),
  );
  addGeneratedFile(
    path.join(rawOutputRoot, 'schema', 'wrangles-runtime-manifest.schema.json'),
    JSON.stringify(registrySchemas.runtimeManifest, null, 2),
  );
  addGeneratedFile(
    path.join(rawOutputRoot, 'runtime', 'wranglespy.json'),
    JSON.stringify(runtimeManifest, null, 2),
  );
  addGeneratedFile(
    path.join(reportsOutputRoot, 'runtime-reconciliation.json'),
    JSON.stringify(reconciliation, null, 2),
  );
  addGeneratedFile(
    path.join(reportsOutputRoot, 'runtime-reconciliation.md'),
    renderReconciliationReport(reconciliation),
  );
}

async function writeOutputs() {
  for (const [filename, content] of generatedFiles) {
    await fs.mkdir(path.dirname(filename), {recursive: true});
    await fs.writeFile(filename, content, 'utf8');
  }
}

async function checkOutputs() {
  for (const [filename, expected] of generatedFiles) {
    let actual;
    try {
      actual = await fs.readFile(filename, 'utf8');
    } catch (error) {
      fail(filename, error.code === 'ENOENT' ? 'generated artifact is missing' : error.message);
      continue;
    }
    if (actual !== expected) fail(filename, 'generated artifact is stale; run npm run compile:registry');
  }

  const managedRoots = [docsOutputRoot, rawOutputRoot, schemaOutputRoot, reportsOutputRoot];
  const expectedPaths = new Set(generatedFiles.keys());
  for (const root of managedRoots) {
    for (const filename of await listFiles(root)) {
      if (!expectedPaths.has(path.resolve(filename))) {
        fail(filename, 'unexpected generated artifact');
      }
    }
  }
}

async function main() {
  const checkOnly = process.argv.includes('--check');
  const {entries, controls, runtimeManifest, quasiRegistry, registrySchemas} = await readInputs();
  const reconciliation = reconcileRegistry(entries, runtimeManifest, quasiRegistry);
  buildOutputs(entries, controls, reconciliation, registrySchemas, runtimeManifest);

  if (errors.length) {
    throw new Error(`Registry validation failed:\n- ${errors.join('\n- ')}`);
  }

  if (checkOnly) {
    await checkOutputs();
    if (errors.length) {
      throw new Error(`Registry artifact check failed:\n- ${errors.join('\n- ')}`);
    }
    console.log(`Registry is valid and ${generatedFiles.size} generated artifacts are current.`);
  } else {
    await writeOutputs();
    console.log(`Compiled ${entries.length} Registry entries into ${generatedFiles.size} artifacts.`);
  }
  console.log(
    `Reconciled ${reconciliation.summary.quasi_registry_entries} quasi-registry records and ` +
    `${reconciliation.summary.normalized_registry_entries} normalized entries against ` +
    `${reconciliation.summary.runtime_entries} runtime wrangles; ` +
    `${reconciliation.summary.runtime_entries_without_quasi_registry} runtime entries lack quasi-registry Markdown.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
