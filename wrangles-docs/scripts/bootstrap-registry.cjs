#!/usr/bin/env node

const fs = require('node:fs/promises');
const path = require('node:path');
const yaml = require('js-yaml');

const siteRoot = path.resolve(__dirname, '..');
const repositoryRoot = path.resolve(siteRoot, '..');
const registryRoot = path.join(repositoryRoot, 'registry');
const entriesRoot = path.join(registryRoot, 'wrangles');
const runtimeManifestPath = path.join(registryRoot, 'runtime', 'wranglespy.json');
const quasiRegistryRoot = path.join(siteRoot, 'wrangle-docs');
const COMMON_CONTROLS = new Set(['if', 'where', 'where_params']);
const ALL_JSON_TYPES = ['string', 'number', 'integer', 'boolean', 'array', 'object', 'null'];
const DEPRECATED_REPLACEMENTS = {
  maths: 'math',
  standardize: 'standardize.custom',
};

function posixPath(value) {
  return value.split(path.sep).join('/');
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function hasOwn(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}

async function listFiles(root, suffix = '') {
  const results = [];
  for (const entry of await fs.readdir(root, {withFileTypes: true})) {
    const filename = path.join(root, entry.name);
    if (entry.isDirectory()) results.push(...await listFiles(filename, suffix));
    else if (!suffix || entry.name.endsWith(suffix)) results.push(filename);
  }
  return results.sort();
}

function splitMarkdownRow(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) return [];
  const cells = [];
  let current = '';
  for (let index = 1; index < trimmed.length - 1; index += 1) {
    if (trimmed[index] === '\\' && trimmed[index + 1] === '|') {
      current += '|';
      index += 1;
    } else if (trimmed[index] === '|') {
      cells.push(current.trim());
      current = '';
    } else {
      current += trimmed[index];
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
    if (cells.length === headers.length) {
      rows.push(Object.fromEntries(headers.map((header, cellIndex) => [header, cells[cellIndex]])));
    }
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
  return value === 'Yes' ? true : value === 'No' ? false : null;
}

function compactText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/\bagaisnst\b/gi, 'against')
    .replace(/\bwarniing\b/gi, 'warning')
    .trim();
}

function sentence(value) {
  const text = compactText(value);
  if (!text) return text;
  const capitalized = text[0].toUpperCase() + text.slice(1);
  return /[.!?`]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

function humanize(value) {
  return value
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function kebab(value) {
  return value.replaceAll('_', '-').replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
}

function normalizeTag(value) {
  return kebab(String(value).trim().toLowerCase());
}

function schemaObject(schema) {
  if (!isObject(schema)) return null;
  if (isObject(schema.properties)) return schema;
  if (Array.isArray(schema.anyOf)) {
    return [...schema.anyOf].reverse().find((option) => isObject(option?.properties)) || schema;
  }
  return schema;
}

function schemaProperties(schema) {
  return schemaObject(schema)?.properties || {};
}

function schemaRequired(schema) {
  return new Set(schemaObject(schema)?.required || []);
}

function schemaDescription(schema) {
  return sentence(schemaObject(schema)?.description || '');
}

function cloneSchema(value) {
  if (Array.isArray(value)) return value.map(cloneSchema);
  if (!isObject(value)) return value;
  const result = {};
  for (const [key, item] of Object.entries(value)) {
    if (['description', 'title', 'default', '$comment'].includes(key)) continue;
    if (key === 'type') {
      const types = Array.isArray(item) ? item : [item];
      const normalized = types.flatMap((type) => {
        if (type === null || type === 'null') return ['null'];
        return type === 'datetime' ? ['string'] : [type];
      });
      result.type = [...new Set(normalized)];
      if (result.type.length === 1) result.type = result.type[0];
    } else if (key === 'items' && Array.isArray(item) && item.length === 1) {
      result.items = cloneSchema(item[0]);
    } else {
      result[key] = cloneSchema(item);
    }
  }
  return result;
}

function annotationTypes(annotation) {
  if (!annotation || annotation.includes('<built-in function any>') || /\bAny\b/.test(annotation)) {
    return [];
  }
  const types = [];
  if (/\bstr\b/.test(annotation)) types.push('string');
  if (/\bbool\b/.test(annotation)) types.push('boolean');
  if (/\bint\b/.test(annotation)) types.push('integer');
  if (/\bfloat\b/.test(annotation)) types.push('number');
  if (/\b(?:list|tuple|Sequence)\b/i.test(annotation)) types.push('array');
  if (/\b(?:dict|Mapping)\b/i.test(annotation)) types.push('object');
  if (/None/.test(annotation)) types.push('null');
  return [...new Set(types)];
}

function defaultType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (isObject(value)) return 'object';
  if (Number.isInteger(value)) return 'integer';
  if (typeof value === 'number') return 'number';
  return typeof value;
}

function withCodeTypes(schema, runtimeParameter) {
  const result = cloneSchema(schema || {});
  const inferredTypes = annotationTypes(runtimeParameter?.annotation);
  if (inferredTypes.length && !result.anyOf && !result.oneOf && !result.allOf && !result.$ref) {
    result.type = inferredTypes.length === 1 ? inferredTypes[0] : inferredTypes;
  }
  if (!Object.keys(result).length) {
    const types = inferredTypes.length ? inferredTypes : (
      runtimeParameter && hasOwn(runtimeParameter, 'default')
        ? [defaultType(runtimeParameter.default)]
        : ALL_JSON_TYPES
    );
    result.type = types.length === 1 ? types[0] : types;
  }
  if (runtimeParameter && hasOwn(runtimeParameter, 'default') && runtimeParameter.default === null) {
    if (result.anyOf || result.oneOf) {
      const keyword = result.anyOf ? 'anyOf' : 'oneOf';
      if (!result[keyword].some((option) => option?.type === 'null')) {
        result[keyword].push({type: 'null'});
      }
    } else if (result.type) {
      const types = Array.isArray(result.type) ? result.type : [result.type];
      result.type = [...new Set([...types, 'null'])];
    }
  }
  return result;
}

const PARAMETER_DESCRIPTIONS = {
  input: 'Name, index, or list of input columns.',
  output: 'Name or list of output columns.',
  model_id: 'Identifier of the saved model to use.',
  wrangles: 'Wrangle steps to run.',
  variables: 'Recipe variables available while this wrangle runs.',
  functions: 'Custom functions available while this wrangle runs.',
  use_multiprocessing: 'Use process-based workers instead of threads. This is an advanced runtime option.',
  categoryLabel: 'Prefix for output columns that identify the source price-break category.',
  valueLabel: 'Prefix for output columns that contain the corresponding price-break value.',
};

const DESCRIPTION_OVERRIDES = {
  'format.price_breaks': 'Expand non-empty price-break cells into paired category and value columns.',
  maths: 'Deprecated alias for `math`; evaluate an expression and write its result to an output column.',
  recipe: 'Run another recipe as a wrangle against the current dataframe.',
  standardize: 'Deprecated compatibility key for `standardize.custom`, which standardizes data using a trained DIY or bespoke model.',
};

function parameterDescription(name, embedded, quasi) {
  return sentence(
    embedded?.description ||
    quasi?.description ||
    PARAMETER_DESCRIPTIONS[name] ||
    `${humanize(name)} value accepted by the runtime`,
  );
}

const FORMATTING_PARAMETERS = new Set([
  'allow_unicode', 'auto_rename_columns', 'categoryLabel', 'char', 'decimal_places',
  'decimals', 'ensure_ascii', 'first_element', 'format', 'ignore_index',
  'include_confidence', 'include_empty_labels', 'include_ratio', 'indent',
  'non_match_char', 'output_format', 'output_pattern', 'output_type', 'pad',
  'pad_length', 'precision', 'preserve_index', 'reset_index', 'return_data_type',
  'separator', 'significant_figures', 'sort_keys', 'sort_order', 'use_labels',
  'valueLabel',
]);
const EXECUTION_PARAMETERS = new Set([
  'batch_size', 'deadline', 'max_concurrency', 'threads', 'timeout',
  'use_multiprocessing', 'variables', 'wrangles',
]);
const ERROR_PARAMETERS = new Set(['default', 'except', 'on_error', 'retries']);
const DETAIL_PARAMETERS = new Set([
  'api_key', 'api_token', 'cache', 'cache_ttl', 'client', 'model', 'model_id',
  'previous_response', 'protocol', 'provider', 'reasoning', 'store', 'strict',
  'url', 'verbosity',
]);
const PARAM_GROUP_OVERRIDES = new Map([
  ['accordion.propagate', 'I/O'],
  ['compute.case_when.default', 'Options'],
  ['extract.date_range.end_time', 'I/O'],
  ['extract.date_range.start_time', 'I/O'],
  ['log.error', 'Options'],
  ['remove_words.to_remove', 'I/O'],
  ['search.find_links.device', 'Options'],
  ['search.find_links.id', 'I/O'],
  ['search.find_links.queries', 'I/O'],
]);

function parameterGroup(runtimeKey, name) {
  const override = PARAM_GROUP_OVERRIDES.get(`${runtimeKey}.${name}`);
  if (override) return override;
  if (COMMON_CONTROLS.has(name)) return 'Conditions';
  if (
    name === 'input' ||
    name === 'output' ||
    name === 'by' ||
    name === 'columns' ||
    name.endsWith('_column')
  ) return 'I/O';
  if (name === 'char' && ['compare.text', 'split.text'].includes(runtimeKey)) {
    return 'Options';
  }
  if (FORMATTING_PARAMETERS.has(name)) return 'Formatting';
  if (EXECUTION_PARAMETERS.has(name)) return 'Execution';
  if (ERROR_PARAMETERS.has(name)) return 'Errors';
  if (DETAIL_PARAMETERS.has(name)) return 'Details';
  return 'Options';
}

function dynamicParameter(name) {
  if (!name.endsWith('.placeholder')) return {name};
  const prefix = name.slice(0, -'.placeholder'.length);
  return {
    name: `${prefix}.*`,
    name_pattern: `^${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.[A-Za-z_][A-Za-z0-9_]*$`,
  };
}

function runtimeSource(runtime, revision) {
  const symbolParts = runtime.python_symbol.split('.');
  const modulePath = `${symbolParts.slice(0, -1).join('/')}.py`;
  return `https://github.com/wrangleworks/WranglesPY/blob/${revision}/${modulePath}`;
}

function sourceGuidance(source, title) {
  if (!source) return '';
  const parameterStart = source.search(/^### Parameters\s*$/m);
  const useful = (parameterStart >= 0 ? source.slice(0, parameterStart) : source)
    .replace(/^##\s+[^\r\n]+\r?\n*/, '')
    .replace(/^### Examples\s*$/gm, '## Migrated examples')
    .replace(/\bQuanitity\b/g, 'Quantity')
    .replace(/\bagaisnst\b/gi, 'against')
    .replace(/\bwarniing\b/gi, 'warning')
    .replace(/\t/g, '  ')
    .replace(/[ \t]+$/gm, '')
    .trim();
  if (!useful) return '';
  return `# ${title}\n\n${useful}`;
}

async function readQuasiRegistry() {
  const records = new Map();
  const allMarkdown = await listFiles(quasiRegistryRoot, '.md');
  for (const sourceFile of allMarkdown.filter(
    (filename) => path.basename(path.dirname(filename)) === '_sources')) {
    const source = await fs.readFile(sourceFile, 'utf8');
    const metadata = fieldTable(markdownTableAfter(source, '<summary>Metadata</summary>'));
    const access = fieldTable(markdownTableAfter(source, '<summary>Access</summary>'));
    const wrangleKey = stripCode(metadata['Wrangle Key']);
    const parameterRows = markdownTableAfter(source, '### Parameters');
    records.set(wrangleKey, {
      source,
      sourceFile,
      sourceRelative: posixPath(path.relative(repositoryRoot, sourceFile)),
      id: /^[0-9a-f-]{36}$/i.test(metadata.ID || '') ? metadata.ID : null,
      title: source.match(/^##\s+(.+)$/m)?.[1]?.trim() || '',
      status: String(metadata.Status || '').toLowerCase(),
      tags: String(metadata.Tags || '').split(',').map(normalizeTag).filter(Boolean),
      parameters: new Map(parameterRows.map((row) => [stripCode(row.Parameter), {
        required: yesNo(row.Required),
        description: compactText(row.Description),
      }])),
      access: {
        ai_powered: yesNo(access['AI-backed']),
        requires_account: yesNo(access['Requires WrangleWorks account']),
        requires_subscription: yesNo(access['Requires subscription']),
        requires_external_api_key: yesNo(access['Requires external API key']),
      },
    });
  }
  return records;
}

function buildParameters(runtime, quasi) {
  const embeddedProperties = schemaProperties(runtime.docstring_schema);
  const embeddedRequired = schemaRequired(runtime.docstring_schema);
  const parameters = [];
  const names = new Set();

  for (const runtimeParameter of runtime.parameters) {
    if (COMMON_CONTROLS.has(runtimeParameter.name)) continue;
    const embedded = embeddedProperties[runtimeParameter.name];
    const quasiParameter = quasi?.parameters.get(runtimeParameter.name);
    const parameter = {
      name: runtimeParameter.name,
      description: parameterDescription(runtimeParameter.name, embedded, quasiParameter),
      required: runtimeParameter.required,
      param_group: parameterGroup(runtime.runtime_key, runtimeParameter.name),
    };
    if (hasOwn(runtimeParameter, 'default')) parameter.runtime_default = runtimeParameter.default;
    parameter.schema = withCodeTypes(embedded, runtimeParameter);
    parameters.push(parameter);
    names.add(runtimeParameter.name);
  }

  if (runtime.variadic.keyword) {
    for (const [name, embedded] of Object.entries(embeddedProperties)) {
      if (names.has(name) || COMMON_CONTROLS.has(name)) continue;
      const parameter = {
        ...dynamicParameter(name),
        description: parameterDescription(name, embedded, quasi?.parameters.get(name)),
        required: embeddedRequired.has(name),
        param_group: parameterGroup(runtime.runtime_key, name),
        schema: withCodeTypes(embedded, null),
      };
      parameters.push(parameter);
      names.add(name);
    }
  }
  return parameters;
}

function defaultAccess(runtimeKey) {
  if (runtimeKey === 'standardize.custom') {
    return {
      ai_powered: false,
      requires_account: true,
      requires_subscription: true,
      requires_external_api_key: false,
    };
  }
  return {
    ai_powered: false,
    requires_account: false,
    requires_subscription: false,
    requires_external_api_key: false,
  };
}

function resolvedAccess(runtime, quasi) {
  const access = quasi && Object.values(quasi.access).every((value) => typeof value === 'boolean')
    ? {...quasi.access}
    : defaultAccess(runtime.runtime_key);
  const description = schemaDescription(runtime.docstring_schema);
  if (/requires? (?:a )?wrangleworks account/i.test(description)) {
    access.requires_account = true;
  }
  if (/requires? (?:a )?subscription/i.test(description)) {
    access.requires_subscription = true;
  }
  return access;
}

function buildMetadata(runtime, manifest, quasi) {
  const keyParts = runtime.runtime_key.split('.');
  const wrangleName = keyParts.at(-1);
  const namespace = keyParts.length > 1 ? keyParts.slice(0, -1).join('.') : null;
  const title = quasi?.title || humanize(runtime.runtime_key.replaceAll('.', ' '));
  const description = DESCRIPTION_OVERRIDES[runtime.runtime_key] ||
    schemaDescription(runtime.docstring_schema) ||
    sentence(runtime.plain_docstring) ||
    sentence(`${title} using the current WranglesPY implementation`);
  const tags = [...new Set([
    ...(quasi?.tags || []),
    ...(namespace ? namespace.split('.') : []),
    normalizeTag(wrangleName),
  ].filter(Boolean))];
  return {
    schema_version: '0.1',
    type: 'wrangle',
    id: quasi?.id || null,
    wrangle_name: wrangleName,
    namespace,
    title,
    description,
    wrangle_key: runtime.runtime_key,
    aliases: [],
    slug: namespace
      ? `${namespace.split('.').map(kebab).join('/')}/${kebab(wrangleName)}`
      : kebab(wrangleName),
    status: DEPRECATED_REPLACEMENTS[runtime.runtime_key] ? 'deprecated' : (
      ['draft', 'active', 'deprecated', 'removed'].includes(quasi?.status)
        ? quasi.status
        : 'active'
    ),
    ...(DEPRECATED_REPLACEMENTS[runtime.runtime_key]
      ? {replaced_by: DEPRECATED_REPLACEMENTS[runtime.runtime_key]}
      : {}),
    visibility: 'public',
    tags,
    runtime: {
      package: 'wrangles',
      symbol: runtime.python_symbol,
      contract_status: 'verified',
    },
    access: resolvedAccess(runtime, quasi),
    capabilities: runtime.capabilities,
    parameters: buildParameters(runtime, quasi),
    examples: [],
    sources: [
      {
        id: 'runtime',
        resource: runtimeSource(runtime, manifest.source.revision),
        title: `WranglesPY ${runtime.runtime_key} implementation`,
      },
      ...(quasi ? [{
        id: 'quasi-registry',
        resource: `https://github.com/wrangleworks/Wrangles-Docs/blob/main/${quasi.sourceRelative}`,
        title: `Existing ${runtime.runtime_key} Markdown`,
      }] : []),
    ],
  };
}

function entryPath(runtimeKey) {
  const parts = runtimeKey.split('.');
  if (parts.length === 1) return path.join(entriesRoot, '_root', `${kebab(parts[0])}.md`);
  return path.join(entriesRoot, ...parts.slice(0, -1), `${kebab(parts.at(-1))}.md`);
}

function entryDocument(metadata, quasi, runtime) {
  const frontmatter = yaml.dump(metadata, {
    noRefs: true,
    lineWidth: 100,
    noCompatMode: true,
    sortKeys: false,
  }).trimEnd();
  const guidance = sourceGuidance(quasi?.source, metadata.title) || `# ${metadata.title}

## Behavior

${metadata.description}

This guidance was derived from the callable signature${
  runtime.docstring_schema_status === 'available'
    ? ' and its embedded Python schema docstring'
    : ''
}.`;
  return `---\n${frontmatter}\n---\n\n${guidance}\n`;
}

async function main() {
  const manifest = JSON.parse(await fs.readFile(runtimeManifestPath, 'utf8'));
  const quasiRegistry = await readQuasiRegistry();
  const existing = new Set((await listFiles(entriesRoot, '.md')).map((filename) => path.resolve(filename)));
  let created = 0;
  let preserved = 0;
  let missingIds = 0;

  for (const runtime of manifest.wrangles) {
    const output = entryPath(runtime.runtime_key);
    if (existing.has(path.resolve(output))) {
      preserved += 1;
      continue;
    }
    const quasi = quasiRegistry.get(runtime.runtime_key);
    const metadata = buildMetadata(runtime, manifest, quasi);
    if (metadata.id === null) missingIds += 1;
    await fs.mkdir(path.dirname(output), {recursive: true});
    await fs.writeFile(output, entryDocument(metadata, quasi, runtime), 'utf8');
    created += 1;
  }

  console.log(
    `Created ${created} missing Registry entries; preserved ${preserved} existing entries; ` +
    `${missingIds} newly created entries await a database UUID.`,
  );
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
