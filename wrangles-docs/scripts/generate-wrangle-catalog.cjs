#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const https = require('node:https');

const DEFAULT_SCHEMA_URL = 'https://public.wrangle.works/schema/recipes/schema.json';
const DEFAULT_OUTPUT = 'src/components/WrangleFlowPlayground/wrangleCatalog.generated.js';
const DEFAULT_EXCLUDED_TYPES = new Set(['try', 'accordion', 'batch', 'concurrent', 'matrix', 'recipe']);
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

const STANDALONE_CATEGORIES = {
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
    schemaUrl: DEFAULT_SCHEMA_URL,
    schemaFile: '',
    schemaJson: '',
    output: DEFAULT_OUTPUT,
    include: null,
    exclude: new Set(DEFAULT_EXCLUDED_TYPES),
    includeAdvancedFields: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === '--schema-url') {
      args.schemaUrl = next;
      args.schemaFile = '';
      args.schemaJson = '';
      index += 1;
    } else if (arg === '--schema-file') {
      args.schemaFile = next;
      args.schemaUrl = '';
      args.schemaJson = '';
      index += 1;
    } else if (arg === '--schema-json') {
      args.schemaJson = next;
      args.schemaUrl = '';
      args.schemaFile = '';
      index += 1;
    } else if (arg === '--output') {
      args.output = next;
      index += 1;
    } else if (arg === '--include') {
      args.include = new Set(String(next).split(',').map((item) => item.trim()).filter(Boolean));
      index += 1;
    } else if (arg === '--exclude') {
      args.exclude = new Set([...args.exclude, ...String(next).split(',').map((item) => item.trim()).filter(Boolean)]);
      index += 1;
    } else if (arg === '--include-containers') {
      args.exclude = new Set([...args.exclude].filter((item) => !DEFAULT_EXCLUDED_TYPES.has(item)));
    } else if (arg === '--include-advanced-fields') {
      args.includeAdvancedFields = true;
    } else if (arg === '--help') {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Generate the playground wrangle catalog from the recipe JSON schema.

Usage:
  node scripts/generate-wrangle-catalog.cjs [options]

Options:
  --schema-url <url>       Pull schema JSON from a URL. Defaults to ${DEFAULT_SCHEMA_URL}
  --schema-file <path>     Read schema JSON from a local file.
  --schema-json <json>     Read schema JSON from an inline JSON string.
  --output <path>          Output JS file. Defaults to ${DEFAULT_OUTPUT}
  --include <types>        Comma-separated wrangle types to include.
  --exclude <types>        Comma-separated wrangle types to exclude.
  --include-containers     Include structural wrangles like try, batch, matrix, recipe.
  --include-advanced-fields Include if/where/where_params controls.
`);
}

function request(url) {
  const client = url.startsWith('https:') ? https : http;

  return new Promise((resolve, reject) => {
    client
      .get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          resolve(request(new URL(response.headers.location, url).toString()));
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Failed to fetch schema: HTTP ${response.statusCode}`));
          response.resume();
          return;
        }

        response.setEncoding('utf8');
        let body = '';
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => resolve(body));
      })
      .on('error', reject);
  });
}

async function loadSchema(args) {
  if (args.schemaJson) {
    return JSON.parse(args.schemaJson);
  }

  if (args.schemaFile) {
    return JSON.parse(await fs.readFile(path.resolve(args.schemaFile), 'utf8'));
  }

  return JSON.parse(await request(args.schemaUrl));
}

function titleCase(value) {
  return String(value)
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function categoryForType(type) {
  if (type.endsWith('.ai')) {
    return 'AI';
  }

  if (STANDALONE_CATEGORIES[type]) {
    return STANDALONE_CATEGORIES[type];
  }

  const prefix = type.includes('.') ? type.split('.')[0] : type.split('_')[0];
  return titleCase(prefix);
}

function labelForType(type) {
  const parts = type.split('.');
  return titleCase(parts[parts.length - 1]);
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

  return [];
}

function fieldTypeFor(key, propertySchema) {
  const enums = enumValues(propertySchema);
  if (enums.length) {
    return 'select';
  }

  const types = schemaTypes(propertySchema);

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

function defaultForField(key, fieldType, propertySchema, required, wrangleType) {
  if (propertySchema && Object.prototype.hasOwnProperty.call(propertySchema, 'default')) {
    return propertySchema.default;
  }

  if (fieldType === 'select') {
    const values = enumValues(propertySchema);
    return required ? values[0] ?? '' : '';
  }

  if (fieldType === 'boolean') {
    return false;
  }

  if (fieldType === 'number') {
    return '';
  }

  if (fieldType === 'json') {
    return required ? '{}' : '';
  }

  if (fieldType === 'list') {
    if (key === 'input' || key === 'columns' || key === 'by') {
      return ['Column A', 'Column B'];
    }

    if (key === 'output') {
      return [`${labelForType(wrangleType)} Output`];
    }

    return [];
  }

  if (key === 'input') {
    return 'Column A';
  }

  if (key === 'output') {
    return `${labelForType(wrangleType)} Output`;
  }

  return required ? '' : '';
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

function createField(key, propertySchema, required, wrangleType) {
  const fieldType = fieldTypeFor(key, propertySchema);
  const field = {
    key,
    label: titleCase(key),
    type: fieldType,
    required,
  };

  const description = firstSentence(propertySchema?.description);
  if (description) {
    field.helper = description;
  }

  if (fieldType === 'select') {
    field.options = enumValues(propertySchema).map((value) => ({
      value,
      label: titleCase(value),
    }));
  }

  if (key === 'input') {
    field.placeholder = fieldType === 'list' ? 'Column A' : 'Column A';
  } else if (key === 'output') {
    field.placeholder = defaultForField(key, fieldType, propertySchema, required, wrangleType);
  }

  return field;
}

function createCatalogEntry(type, definition, args) {
  const requiredKeys = new Set(definition.required ?? []);
  const rawProperties = definition.properties ?? {};
  const fields = sortFields(
    Object.entries(rawProperties)
      .filter(([key]) => args.includeAdvancedFields || !ADVANCED_FIELDS.has(key))
      .map(([key, propertySchema]) => createField(key, propertySchema, requiredKeys.has(key), type)),
  );

  const defaults = Object.fromEntries(
    fields.map((field) => [
      field.key,
      defaultForField(field.key, field.type, rawProperties[field.key], field.required || field.key === 'output', type),
    ]),
  );

  const category = categoryForType(type);

  return {
    type,
    label: labelForType(type),
    category,
    description: firstSentence(definition.description) || `${labelForType(type)} wrangle.`,
    color: CATEGORY_COLORS[category] ?? 'slate',
    defaults,
    fields,
  };
}

function generateCatalog(schema, args) {
  const wrangleProperties = schema?.$defs?.wrangles?.items?.properties;

  if (!wrangleProperties) {
    throw new Error('Schema does not contain $defs.wrangles.items.properties');
  }

  return Object.entries(wrangleProperties)
    .filter(([type]) => !args.include || args.include.has(type))
    .filter(([type]) => !args.exclude.has(type))
    .map(([type, definition]) => createCatalogEntry(type, definition, args))
    .sort((left, right) => {
      const leftCategory = CATEGORY_ORDER.includes(left.category) ? CATEGORY_ORDER.indexOf(left.category) : 999;
      const rightCategory = CATEGORY_ORDER.includes(right.category) ? CATEGORY_ORDER.indexOf(right.category) : 999;
      return leftCategory - rightCategory || left.type.localeCompare(right.type);
    });
}

function renderCatalog(catalog, sourceLabel) {
  return `// This file is generated by scripts/generate-wrangle-catalog.cjs.
// Source: ${sourceLabel}
// Do not edit by hand. Put UI-specific tweaks in wrangleCatalog.overrides.js.

const GENERATED_WRANGLE_CATALOG = ${JSON.stringify(catalog, null, 2)};

export default GENERATED_WRANGLE_CATALOG;
`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const schema = await loadSchema(args);
  const catalog = generateCatalog(schema, args);
  const outputPath = path.resolve(args.output);
  const sourceLabel = args.schemaFile || args.schemaUrl || 'inline JSON';

  await fs.mkdir(path.dirname(outputPath), {recursive: true});
  await fs.writeFile(outputPath, renderCatalog(catalog, sourceLabel));
  console.log(`Generated ${catalog.length} wrangles -> ${path.relative(process.cwd(), outputPath)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
