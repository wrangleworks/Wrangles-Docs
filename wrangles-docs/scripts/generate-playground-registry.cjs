#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_MANIFEST = 'static/registry/manifest.json';
const DEFAULT_OUTPUT = 'src/components/WrangleFlowPlayground/registryCatalog.generated.js';
const ADVANCED_FIELDS = new Set(['if', 'where', 'where_params']);
const CATEGORY_COLORS = {
  AI: 'sky',
  Compare: 'slate',
  Compute: 'lagoon',
  Convert: 'sun',
  Copy: 'sky',
  Create: 'forest',
  Drop: 'ember',
  Extract: 'sky',
  Filter: 'slate',
  Format: 'violet',
  Generate: 'forest',
  Lookup: 'lagoon',
  Math: 'ember',
  Merge: 'forest',
  Python: 'slate',
  Reindex: 'slate',
  Remove: 'ember',
  Rename: 'sun',
  Replace: 'violet',
  Round: 'lagoon',
  Search: 'sky',
  Select: 'slate',
  Similarity: 'lagoon',
  Sort: 'sun',
  Split: 'violet',
  Sql: 'slate',
  Standardize: 'forest',
  Translate: 'sky',
  Transpose: 'slate',
  Transform: 'sun',
  Utility: 'slate',
};

// Root wrangles do not have a namespace, so this keeps their established
// Playground grouping while all contract data comes from the Registry.
const ROOT_CATEGORIES = {
  classify: 'AI',
  clean_whitespaces: 'Format',
  copy: 'Transform',
  date_calculator: 'Date',
  drop: 'Select',
  explode: 'Split',
  filter: 'Select',
  huggingface: 'AI',
  log: 'Utility',
  lookup: 'Lookup',
  math: 'Compute',
  python: 'Compute',
  reindex: 'Transform',
  remove_words: 'Format',
  rename: 'Transform',
  replace: 'Format',
  round: 'Format',
  similarity: 'Compare',
  sort: 'Select',
  sql: 'Compute',
  standardize: 'Format',
  translate: 'Format',
  transpose: 'Transform',
};

const CATEGORY_ORDER = [
  'Convert',
  'Merge',
  'Split',
  'Select',
  'Format',
  'Create',
  'Extract',
  'Compare',
  'Compute',
  'Search',
  'AI',
  'Lookup',
  'Transform',
  'Utility',
];

function parseArgs(argv) {
  const args = {
    manifest: DEFAULT_MANIFEST,
    output: DEFAULT_OUTPUT,
    includeAdvancedFields: false,
    check: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === '--manifest') {
      args.manifest = next;
      index += 1;
    } else if (arg === '--output') {
      args.output = next;
      index += 1;
    } else if (arg === '--include-advanced-fields') {
      args.includeAdvancedFields = true;
    } else if (arg === '--check') {
      args.check = true;
    } else if (arg === '--help') {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (!args.manifest || !args.output) {
    throw new Error('--manifest and --output require a path');
  }

  return args;
}

function printHelp() {
  console.log(`Generate the Playground catalog from compiled Registry contracts.

Usage:
  node scripts/generate-playground-registry.cjs [options]

Options:
  --manifest <path>         Registry manifest. Defaults to ${DEFAULT_MANIFEST}
  --output <path>           Generated JS module. Defaults to ${DEFAULT_OUTPUT}
  --include-advanced-fields Include if/where/where_params controls.
  --check                   Fail when the generated module is stale.
`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function titleCase(value) {
  return String(value)
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function firstSentence(description) {
  return String(description ?? '').split('\n').map((line) => line.trim()).filter(Boolean)[0] ?? '';
}

function schemaTypes(schema) {
  if (!schema) {
    return [];
  }

  if (Array.isArray(schema.type)) {
    return schema.type.filter(Boolean);
  }

  if (schema.type) {
    return [schema.type];
  }

  if (Array.isArray(schema.anyOf)) {
    return [...new Set(schema.anyOf.flatMap(schemaTypes))];
  }

  if (Array.isArray(schema.oneOf)) {
    return [...new Set(schema.oneOf.flatMap(schemaTypes))];
  }

  return [];
}

function enumValues(schema) {
  if (Array.isArray(schema?.enum)) {
    return schema.enum;
  }

  if (Array.isArray(schema?.anyOf)) {
    const values = schema.anyOf.flatMap(enumValues);
    return values.length ? [...new Set(values)] : [];
  }

  if (Array.isArray(schema?.oneOf)) {
    const values = schema.oneOf.flatMap(enumValues);
    return values.length ? [...new Set(values)] : [];
  }

  return [];
}

function fieldTypeFor(key, schema) {
  if (enumValues(schema).length) {
    return 'select';
  }

  const types = schemaTypes(schema);

  if (key === 'input') {
    return types.includes('array') ? 'list' : 'text';
  }

  if (types.includes('boolean')) {
    return 'boolean';
  }

  if (types.includes('object')) {
    return 'json';
  }

  if (types.includes('array') || key === 'columns' || key === 'by') {
    return 'list';
  }

  if (!types.includes('string') && (types.includes('integer') || types.includes('number'))) {
    return 'number';
  }

  return 'text';
}

function labelForContract(contract) {
  return titleCase(contract.wrangle_name || contract.wrangle_key.split('.').at(-1));
}

function defaultForParameter(parameter, fieldType, contract) {
  if (Object.prototype.hasOwnProperty.call(parameter, 'runtime_default')) {
    return parameter.runtime_default;
  }

  const key = parameter.name;
  if (fieldType === 'select') {
    return parameter.required ? enumValues(parameter.schema)[0] ?? '' : '';
  }
  if (fieldType === 'boolean') {
    return false;
  }
  if (fieldType === 'number') {
    return '';
  }
  if (fieldType === 'json') {
    return parameter.required ? '{}' : '';
  }
  if (fieldType === 'list') {
    if (key === 'input' || key === 'columns' || key === 'by') {
      return ['Column A', 'Column B'];
    }
    if (key === 'output') {
      return [`${labelForContract(contract)} Output`];
    }
    return [];
  }
  if (key === 'input') {
    return 'Column A';
  }
  if (key === 'output') {
    return `${labelForContract(contract)} Output`;
  }
  return '';
}

function sortFields(fields) {
  const priority = new Map([
    ['input', 0],
    ['columns', 1],
    ['by', 2],
    ['output', 3],
  ]);

  return [...fields].sort((left, right) => {
    const leftPriority = priority.has(left.key) ? priority.get(left.key) : left.required ? 10 : 20;
    const rightPriority = priority.has(right.key) ? priority.get(right.key) : right.required ? 10 : 20;
    return leftPriority - rightPriority || left.key.localeCompare(right.key);
  });
}

function createField(parameter, contract) {
  const type = fieldTypeFor(parameter.name, parameter.schema);
  const field = {
    key: parameter.name,
    label: titleCase(parameter.name),
    type,
    required: Boolean(parameter.required),
  };
  const description = firstSentence(parameter.description);

  if (description) {
    field.helper = description;
  }
  if (type === 'select') {
    field.options = enumValues(parameter.schema).map((value) => ({value, label: titleCase(value)}));
  }
  if (parameter.name === 'input') {
    field.placeholder = 'Column A';
  } else if (parameter.name === 'output') {
    field.placeholder = defaultForParameter(parameter, type, contract);
  }

  return field;
}

function categoryForContract(contract) {
  if (contract.wrangle_key.endsWith('.ai')) {
    return 'AI';
  }
  if (contract.namespace) {
    return titleCase(contract.namespace);
  }
  return ROOT_CATEGORIES[contract.wrangle_key] || titleCase(contract.wrangle_key.split('_')[0]);
}

function createCatalogEntry(manifestEntry, contract, options) {
  const parameters = contract.parameters
    .filter((parameter) => options.includeAdvancedFields || !ADVANCED_FIELDS.has(parameter.name));
  const fields = sortFields(parameters.map((parameter) => createField(parameter, contract)));
  const parameterByName = new Map(parameters.map((parameter) => [parameter.name, parameter]));
  const defaults = Object.fromEntries(
    fields.map((field) => [field.key, defaultForParameter(parameterByName.get(field.key), field.type, contract)]),
  );
  const category = categoryForContract(contract);

  return {
    type: contract.wrangle_key,
    catalogId: contract.catalog_id,
    catalogKey: contract.catalog_key,
    registryRoute: manifestEntry.route,
    recipeWriterEligible: Boolean(contract.recipe_writer?.eligible),
    label: labelForContract(contract),
    category,
    description: firstSentence(contract.description) || `${labelForContract(contract)} wrangle.`,
    color: CATEGORY_COLORS[category] ?? 'slate',
    defaults,
    fields,
  };
}

function validateContract(manifestEntry, contract, contractPath) {
  if (contract.format !== 'wrangles-registry-entry' || contract.type !== 'wrangle') {
    throw new Error(`Invalid wrangle contract: ${contractPath}`);
  }
  for (const key of ['catalog_id', 'catalog_key', 'wrangle_key']) {
    if (String(contract[key]) !== String(manifestEntry[key])) {
      throw new Error(`Registry identity mismatch for ${manifestEntry.wrangle_key}: ${key}`);
    }
  }
  if (!Array.isArray(contract.parameters)) {
    throw new Error(`Registry contract has no parameters array: ${contractPath}`);
  }
}

function generateRegistryCatalog(manifestPath, options = {}) {
  const absoluteManifestPath = path.resolve(manifestPath);
  const manifest = readJson(absoluteManifestPath);
  const staticRoot = path.dirname(path.dirname(absoluteManifestPath));

  if (manifest.format !== 'wrangles-registry' || !Array.isArray(manifest.entries)) {
    throw new Error(`Invalid Registry manifest: ${absoluteManifestPath}`);
  }

  const seenCatalogIds = new Set();
  const seenWrangleKeys = new Set();
  const catalog = manifest.entries.map((entry) => {
    if (entry.type !== 'wrangle' || !entry.contract_json) {
      throw new Error(`Manifest entry is not a wrangle contract: ${entry.catalog_key || 'unknown'}`);
    }
    if (seenCatalogIds.has(String(entry.catalog_id)) || seenWrangleKeys.has(entry.wrangle_key)) {
      throw new Error(`Duplicate Registry identity: ${entry.wrangle_key}`);
    }
    seenCatalogIds.add(String(entry.catalog_id));
    seenWrangleKeys.add(entry.wrangle_key);

    const contractPath = path.join(staticRoot, entry.contract_json.replace(/^\//, ''));
    const contract = readJson(contractPath);
    validateContract(entry, contract, contractPath);
    return createCatalogEntry(entry, contract, options);
  });

  if (catalog.length !== manifest.entry_count) {
    throw new Error(`Registry manifest expected ${manifest.entry_count} entries but generated ${catalog.length}`);
  }

  catalog.sort((left, right) => {
    const leftCategory = CATEGORY_ORDER.includes(left.category) ? CATEGORY_ORDER.indexOf(left.category) : 999;
    const rightCategory = CATEGORY_ORDER.includes(right.category) ? CATEGORY_ORDER.indexOf(right.category) : 999;
    return leftCategory - rightCategory || left.type.localeCompare(right.type);
  });

  return {
    registryVersion: manifest.registry_version,
    contractVersion: manifest.contract_version,
    catalog,
  };
}

function renderRegistryCatalog(result, sourceLabel) {
  return `// This file is generated by scripts/generate-playground-registry.cjs.
// Source: ${sourceLabel} and its referenced contracts.
// Do not edit by hand. Put UI-specific tweaks in registryCatalog.overrides.js.

export const PLAYGROUND_REGISTRY_VERSION = ${JSON.stringify(result.registryVersion)};
export const PLAYGROUND_CONTRACT_VERSION = ${JSON.stringify(result.contractVersion)};

const GENERATED_REGISTRY_CATALOG = ${JSON.stringify(result.catalog, null, 2)};

export default GENERATED_REGISTRY_CATALOG;
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const result = generateRegistryCatalog(args.manifest, args);
  const outputPath = path.resolve(args.output);
  const rendered = renderRegistryCatalog(result, args.manifest);

  if (args.check) {
    if (!fs.existsSync(outputPath)) {
      throw new Error(`Generated Playground Registry module is missing: ${outputPath}`);
    }
    if (fs.readFileSync(outputPath, 'utf8') !== rendered) {
      throw new Error('Generated Playground Registry module is stale; run npm run generate:playground-registry');
    }
    console.log(`Playground Registry is current (${result.catalog.length} wrangles, Registry ${result.registryVersion}).`);
    return;
  }

  fs.mkdirSync(path.dirname(outputPath), {recursive: true});
  fs.writeFileSync(outputPath, rendered);
  console.log(`Generated ${result.catalog.length} Registry wrangles -> ${path.relative(process.cwd(), outputPath)}`);
}

module.exports = {
  createCatalogEntry,
  generateRegistryCatalog,
  renderRegistryCatalog,
};

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
