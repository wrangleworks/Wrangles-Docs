// Shared schema projection. Preserve whole-object constraints in executable schemas.
const clone = value => structuredClone(value);
const controls = new Set(['if', 'where', 'where_params']);
// Walk schema nodes only: literal defaults/examples must never be rewritten.
function normalizeTypes(input, adjustments = []) {
  const result = clone(input);
  const aliases = {int: 'integer', str: 'string', bool: 'boolean', float: 'number', dict: 'object', list: 'array'};
  function visit(node) {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    if (Object.hasOwn(node, 'type')) {
      const convert = type => {
        const normalized = type === null ? 'null' : aliases[type] || type;
        if (normalized !== type) adjustments.push(`Normalize schema type ${JSON.stringify(type)} to ${normalized}.`);
        return normalized;
      };
      node.type = Array.isArray(node.type) ? [...new Set(node.type.map(convert))] : convert(node.type);
    }
    for (const key of ['properties', 'patternProperties', '$defs', 'definitions', 'dependentSchemas']) Object.values(node[key] || {}).forEach(visit);
    for (const key of ['allOf', 'anyOf', 'oneOf', 'prefixItems']) (node[key] || []).forEach(visit);
    if (Array.isArray(node.items)) node.items.forEach(visit); else visit(node.items);
    for (const key of ['additionalItems', 'additionalProperties', 'contains', 'not', 'if', 'then', 'else', 'propertyNames', 'unevaluatedItems', 'unevaluatedProperties']) visit(node[key]);
  }
  visit(result);
  return result;
}
function objectBranch(schema) {
  return schema.properties ? schema : schema.anyOf?.findLast(branch => branch.properties) || schema;
}
function configurationSchema(runtime, snapshot) {
  let schema = runtime.docstring_schema && clone(runtime.docstring_schema);
  let origin = 'upstream-docstring';
  const adjustments = [];
  if (!schema && runtime.runtime_key === 'maths') {
    if (!snapshot.wrangles.math?.schema) throw new Error('maths requires the math schema to be present.');
    schema = clone(snapshot.wrangles.math.schema);
    origin = 'deprecated-alias:math';
  }
  if (!schema) {
    if (runtime.runtime_key !== 'format.price_breaks') {
      throw new Error(`Missing readable upstream schema for ${runtime.runtime_key}; retain the previous entry instead of deriving a contract.`);
    }
    // Missing upstream schemas must never be reported as exact upstream parity.
    origin = 'signature-derived';
    const types = {str: 'string', list: 'array', dict: 'object', int: 'integer', float: 'number', bool: 'boolean'};
    schema = {type: 'object', properties: {}, required: [], additionalProperties: Boolean(runtime.variadic.keyword)};
    for (const parameter of runtime.parameters) {
      const type = types[parameter.annotation];
      if (!type) throw new Error(`Cannot derive missing schema for ${runtime.runtime_key}.${parameter.name}`);
      schema.properties[parameter.name] = {type};
      if (parameter.required) schema.required.push(parameter.name);
    }
  }
  // JSON has no datetime primitive. The upstream convert.data_type default
  // schema lists it alongside string; JSON datetime values are strings.
  if (runtime.runtime_key === 'convert.data_type' && schema.properties?.default?.type?.includes('datetime')) {
    const types = schema.properties.default.type;
    schema.properties.default.type = [...new Set(types.map(type => type === 'datetime' ? 'string' : type))];
    adjustments.push('JSON Schema has no datetime primitive; JSON timestamps use string.');
  }
  schema = normalizeTypes(schema, adjustments);
  const target = objectBranch(schema);
  target.properties ||= {};
  for (const name of controls) {
    if (runtime.capabilities[name]) {
      const key = name === 'where' && runtime.where_mode === 'overwrite_output' ? 'where_special' : name;
      target.properties[name] = {$ref: `#/$defs/wrangles/commonProperties/${key}`};
    }
  }
  return {schema, origin, adjustments};
}
function parameterProperties(schema) {
  const properties = {};
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    Object.assign(properties, node.properties || {});
    for (const key of ['allOf', 'anyOf', 'oneOf']) for (const branch of node[key] || []) visit(branch);
    visit(node.then);
    visit(node.else);
  }
  visit(schema);
  return properties;
}
function schemaRequired(schema, name) {
  if ((schema.required || []).includes(name)) return true;
  if ((schema.allOf || []).some(branch => schemaRequired(branch, name))) return true;
  for (const keyword of ['anyOf', 'oneOf']) {
    if (schema[keyword]?.length && schema[keyword].every(branch => schemaRequired(branch, name))) return true;
  }
  return false;
}
function withoutAnnotations(value) {
  if (Array.isArray(value)) return value.map(withoutAnnotations);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).filter(([key]) =>
    key !== 'x-wrangles-column')
    .map(([key, child]) => [key, withoutAnnotations(child)]));
}
function conditionallyRequired(schema, name) {
  if (schemaRequired(schema, name)) return false;
  const visit = node => Boolean(node && ((node.required || []).includes(name)
    || ['allOf', 'anyOf', 'oneOf'].some(key => (node[key] || []).some(visit))
    || visit(node.then) || visit(node.else)));
  return visit(schema);
}
function qualifySchemaReferences(schema, documentUrl) {
  const result = clone(schema);
  function visit(node) {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    if (typeof node.$ref === 'string' && node.$ref.startsWith('#')) node.$ref = documentUrl + node.$ref;
    for (const keyword of ['properties', 'patternProperties', '$defs', 'definitions', 'dependentSchemas']) {
      for (const child of Object.values(node[keyword] || {})) visit(child);
    }
    for (const keyword of ['allOf', 'anyOf', 'oneOf', 'prefixItems']) for (const child of node[keyword] || []) visit(child);
    if (Array.isArray(node.items)) node.items.forEach(visit);
    else visit(node.items);
    for (const keyword of ['additionalItems', 'additionalProperties', 'contains', 'not', 'if', 'then', 'else', 'propertyNames', 'unevaluatedItems', 'unevaluatedProperties']) visit(node[keyword]);
    // Examples, defaults and const/enum values are data, not schema nodes.
  }
  visit(result);
  return result;
}
module.exports = {configurationSchema, normalizeTypes, objectBranch, parameterProperties, schemaRequired, conditionallyRequired, withoutAnnotations, qualifySchemaReferences};
