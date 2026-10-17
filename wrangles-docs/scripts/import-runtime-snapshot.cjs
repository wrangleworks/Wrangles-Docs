#!/usr/bin/env node
// Generate the runtime inventory from the saved static source snapshot, without
// importing WranglesPY or accessing API-Core. Editorial Markdown is not changed.
const fs = require('node:fs');
const path = require('node:path');
const {parseRegistryMarkdown, serializeRegistryMarkdown} = require('./registry-markdown.cjs');
const {configurationSchema, parameterProperties, schemaRequired} = require('./wrangle-schema.cjs');
const root = path.resolve(__dirname, '../..');
if (process.argv.includes('--check') && process.argv.includes('--sync-registry')) throw new Error('--check cannot be combined with --sync-registry');
const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'registry/runtime/wranglespy-source-schema.json')));
if (!snapshot.wrangle_definitions || !snapshot.controls) throw new Error('Refresh the source snapshot with the AST extractor first.');
const wrangles = Object.entries(snapshot.wrangle_definitions).sort().map(([key, definition]) => {
  const schema = snapshot.wrangles[key]?.schema || null;
  const properties = {...schema?.properties, ...Object.assign({}, ...(schema?.anyOf || []).map(branch => branch.properties || {}))};
  const internal = definition.parameters.filter(parameter =>
    ['df', 'functions', 'error'].includes(parameter.name) ||
    (parameter.name === 'variables' && !properties.variables)).map(parameter => parameter.name);
  const where = !snapshot.controls.where_not_implemented.includes(key);
  return {
    runtime_key: key, python_symbol: definition.python_symbol, signature: definition.signature,
    parameters: definition.parameters.filter(parameter => !internal.includes(parameter.name)),
    internal_parameters: internal, variadic: definition.variadic,
    capabilities: {if: true, where, where_params: where},
    where_mode: !where ? 'unsupported' : snapshot.controls.where_overwrite_output.includes(key) ? 'overwrite_output' : 'filter',
    docstring_schema_status: schema ? 'available' : 'missing', docstring_schema: schema,
    plain_docstring: schema ? null : definition.docstring,
  };
});
const {repository, version, revision} = snapshot.source;
const manifest = {
  $schema: 'https://docs.wrangles.com/registry/schema/wrangles-runtime-manifest.schema.json',
  format: 'wrangles-runtime-manifest', format_version: '0.1',
  source: {repository, version, revision},
  ...(snapshot.entry_sources ? {entry_sources: snapshot.entry_sources} : {}),
  entry_count: wrangles.length, wrangles,
};
const manifestPath = path.join(root, 'registry/runtime/wranglespy.json');
const serialized = JSON.stringify(manifest, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (fs.readFileSync(manifestPath, 'utf8') !== serialized) throw new Error('Runtime manifest is stale relative to the saved source snapshot.');
} else {
  fs.writeFileSync(manifestPath, serialized);
}
console.log(`${process.argv.includes('--check') ? 'Verified' : 'Generated'} ${wrangles.length} runtime definitions from saved ${version}@${revision}.`);

if (process.argv.includes('--sync-registry')) {
  const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
  const byKey = new Map(wrangles.map(entry => [entry.runtime_key, entry]));
  const walk = directory => fs.readdirSync(directory, {withFileTypes: true}).flatMap(item =>
    item.isDirectory() ? walk(path.join(directory, item.name)) : [path.join(directory, item.name)]);
  let changed = 0;
  if (process.argv.includes('--create')) {
    if (!only || !/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)?$/.test(only)) throw new Error('New entry requires a supported --only key');
    const runtime = byKey.get(only);
    if (!runtime) throw new Error(`No source definition for ${only}`);
    if (!runtime.docstring_schema && only !== 'maths') throw new Error(`Missing schema for new wrangle ${only}; no signature-derived publication`);
    const parts = only.split('.');
    const name = parts.at(-1);
    const namespace = parts.length === 2 ? parts[0] : null;
    const slug = parts.map(part => part.replaceAll('_', '-')).join('/');
    const filename = path.join(root, 'registry/wrangles', namespace || '_root', name.replaceAll('_', '-') + '.md');
    if (!fs.existsSync(filename)) {
      const schema = configurationSchema(runtime, snapshot).schema;
      const title = typeof schema.title === 'string' ? schema.title : name.replaceAll('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
      const description = typeof schema.description === 'string' && schema.description.trim() ? schema.description : `Reference for the ${only} wrangle.`;
      const metadata = {schema_version: '0.2', type: 'wrangle', id: null, wrangle_name: name, namespace,
        title, description, wrangle_key: only, aliases: [], slug, status: 'active', visibility: 'public',
        recipe_writer: {eligible: false, reason: 'Automatically documented from schema; execution eligibility requires review.'},
        tags: [namespace || name], runtime: {package: 'wrangles', symbol: runtime.python_symbol, contract_status: 'verified'},
        access: {ai_powered: null, requires_account: null, requires_subscription: null, requires_external_api_key: null},
        capabilities: runtime.capabilities, parameters: [], examples: [],
        sources: [{id: 'schema', resource: `${repository}/blob/${revision}/${snapshot.wrangle_definitions[only].source_file}`, title: 'WranglesPY schema'}]};
      // This is a minimal schema-backed reference, not an invented tutorial.
      fs.mkdirSync(path.dirname(filename), {recursive: true});
      fs.writeFileSync(filename, serializeRegistryMarkdown(metadata, `# ${title}\n\n${description}\n\nUsage guidance and examples have not yet been reviewed.\n`));
    }
  }
  for (const filename of walk(path.join(root, 'registry/wrangles')).filter(name => name.endsWith('.md'))) {
    const original = fs.readFileSync(filename, 'utf8');
    const {metadata, body} = parseRegistryMarkdown(original, filename);
    if (only && metadata.wrangle_key !== only) continue;
    const runtime = byKey.get(metadata.wrangle_key);
    if (!runtime) throw new Error(`Missing runtime definition for ${metadata.wrangle_key}`);
    const {schema, origin, adjustments} = configurationSchema(runtime, snapshot);
    metadata.configuration_schema = schema;
    metadata.schema_origin = origin;
    metadata.schema_adjustments = adjustments;
    const properties = parameterProperties(schema);
    const parameters = new Map(runtime.parameters.map(parameter => [parameter.name, parameter]));
    for (const name of Object.keys(properties)) {
      // Schema-only fields still belong in the table. They are not mandatory
      // Python arguments merely because the schema requires them.
      if (!parameters.has(name)) parameters.set(name, {name, required: false});
    }
    for (const name of ['if', 'where', 'where_params']) parameters.delete(name);
    const old = new Map(metadata.parameters.map(parameter => [parameter.name.replace(/\.\*$/, '.placeholder'), parameter]));
    const ordered = [...old.keys()].filter(key => parameters.has(key));
    ordered.push(...[...parameters.keys()].filter(key => !old.has(key)));
    metadata.parameters = ordered.map(name => {
      const signature = parameters.get(name);
      const previous = old.get(name);
      const parameter = previous ? {...previous} : {
        name, description: properties[name]?.description || `The ${name} parameter.`,
        param_group: ['input', 'output'].includes(name) ? 'I/O' : 'Options',
        schema: properties[name] || {},
      };
      parameter.runtime_required = signature.required;
      parameter.required = schemaRequired(schema, name);
      parameter.schema = structuredClone(properties[name] || {});
      if (typeof properties[name]?.description === 'string' && properties[name].description.trim()) {
        parameter.description = properties[name].description;
      }
      if (Object.hasOwn(signature, 'default')) parameter.runtime_default = signature.default;
      else delete parameter.runtime_default;
      return parameter;
    });
    metadata.runtime.symbol = runtime.python_symbol;
    metadata.capabilities = {...metadata.capabilities, ...runtime.capabilities};
    // Editorial body, descriptions, titles and historical provenance are preserved.
    const updated = serializeRegistryMarkdown(metadata, body);
    if (JSON.stringify(parseRegistryMarkdown(original)) !== JSON.stringify(parseRegistryMarkdown(updated))) {
      fs.writeFileSync(filename, updated);
      changed++;
    }
  }
  console.log(`Refreshed signature-owned fields in ${changed} Markdown records; editorial bodies preserved.`);
}
