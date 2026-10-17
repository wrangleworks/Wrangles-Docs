const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
const Ajv = require('ajv');
const {parseRegistryMarkdown} = require('./registry-markdown.cjs');
const {configurationSchema, normalizeTypes, withoutAnnotations, qualifySchemaReferences} = require('./wrangle-schema.cjs');
const {compareEmbeddedSchema} = require('./compile-registry.cjs');
const root = path.resolve(__dirname, '../..');
const snapshot = require('../../registry/runtime/wranglespy-source-schema.json');
const runtime = require('../../registry/runtime/wranglespy.json');
const schema = require('../static/schemas/recipes/registry/schema.json');
const walk = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(item => item.isDirectory() ? walk(path.join(dir, item.name)) : [path.join(dir, item.name)]);
const entries = walk(path.join(root, 'registry/wrangles')).filter(file => file.endsWith('.md')).map(file => ({...parseRegistryMarkdown(fs.readFileSync(file, 'utf8')), sourceFile: file}));
const validate = new Ajv({strict: false, validateFormats: false, allErrors: true}).compile(schema);

test('generated AI schemas retain nested question and conditional output rules', () => {
  for (const key of ['ai.choose', 'ai.score', 'ai.true_false', 'ai.answers']) {
    const definition = snapshot.wrangles[key];
    assert.ok(definition?.generated_schema, `${key} must be extracted from its builder`);
    assert.deepEqual(definition.schema.required, ['questions']);
    const question = definition.schema.properties.questions.additionalProperties;
    for (const branch of question.oneOf || [question]) {
      assert.equal(branch.additionalProperties, false);
      assert.deepEqual(branch.allOf[0].if.required, ['for_each']);
      if (key === 'ai.answers') assert.ok(branch.required.includes('type'));
    }
  }
});

test('missing schemas are not silently reconstructed from Python signatures', () => {
  assert.throws(() => configurationSchema({runtime_key: 'format.new_item', docstring_schema: null}, snapshot), /Missing readable upstream schema/);
});

test('type aliases normalize in schema nodes without changing examples or defaults', () => {
  const original = {type: 'dict', properties: {x: {type: ['int', 'integer', 'str', null]},
    data: {type: 'list', items: {type: 'bool'}, default: {type: 'str'}}},
    examples: [{type: 'int'}], const: {type: 'str'}};
  const notes = [];
  const normalized = normalizeTypes(original, notes);
  assert.equal(normalized.type, 'object');
  assert.deepEqual(normalized.properties.x.type, ['integer', 'string', 'null']);
  assert.equal(normalized.properties.data.items.type, 'boolean');
  assert.deepEqual(normalized.properties.data.default, {type: 'str'});
  assert.deepEqual(normalized.examples, original.examples);
  assert.deepEqual(normalized.const, original.const);
  assert.equal(original.type, 'dict');
  assert.ok(notes.length);
});

test('all published wrangle contracts compile independently with the referenced recipe schema', () => {
  const manifest = require('../static/registry/manifest.json');
  const ajv = new Ajv({strict: false, validateFormats: false});
  ajv.addSchema(schema);
  for (const item of manifest.entries) {
    const contract = JSON.parse(fs.readFileSync(path.join(root, 'wrangles-docs/static', item.contract_json)));
    const source = entries.find(entry => entry.metadata.wrangle_key === item.wrangle_key);
    assert.deepEqual(contract.configuration_schema,
      qualifySchemaReferences(source.metadata.configuration_schema, schema.$id), item.wrangle_key);
    assert.doesNotThrow(() => ajv.compile(contract.configuration_schema), item.wrangle_key);
    for (const parameter of contract.parameters) {
      assert.doesNotThrow(() => ajv.compile(parameter.schema), `${item.wrangle_key}.${parameter.name}`);
    }
  }
});

test('reference qualification handles recursive roots and preserves literal user data', () => {
  const source = {anyOf: [{$ref: '#'}, {$ref: '#/$defs/test'}],
    properties: {payload: {const: {$ref: '#literal'}, default: {$ref: '#literal'}}},
    examples: [{$ref: '#literal'}]};
  const output = qualifySchemaReferences(source, schema.$id);
  assert.equal(output.anyOf[0].$ref, schema.$id + '#');
  assert.equal(output.anyOf[1].$ref, schema.$id + '#/$defs/test');
  assert.deepEqual(output.properties.payload, source.properties.payload);
  assert.deepEqual(output.examples, source.examples);
  assert.equal(source.anyOf[0].$ref, '#');
});

test('all full schemas and parameter projections match their accepted source', () => {
  assert.ok(entries.length >= 98);
  for (const entry of entries) {
    const key = entry.metadata.wrangle_key;
    const definition = runtime.wrangles.find(item => item.runtime_key === key);
    const expected = configurationSchema(definition, snapshot);
    assert.deepEqual(entry.metadata.configuration_schema, expected.schema, key);
    assert.deepEqual(compareEmbeddedSchema(entry, definition), [], key);
    assert.deepEqual(withoutAnnotations(schema.$defs.wrangles.items.properties[key]), expected.schema, key);
  }
});

test('unmodified upstream schemas are preserved independently of the importer projection', () => {
  const corrected = new Set(entries.filter(entry => entry.metadata.schema_adjustments.length).map(entry => entry.metadata.wrangle_key));
  let exact = 0;
  for (const entry of entries) {
    const key = entry.metadata.wrangle_key;
    const raw = snapshot.wrangles[key]?.schema;
    if (!raw || corrected.has(key)) continue;
    const expected = structuredClone(raw);
    const properties = (expected.properties ? expected : expected.anyOf.at(-1)).properties;
    properties.if = {$ref: '#/$defs/wrangles/commonProperties/if'};
    if (!snapshot.controls.where_not_implemented.includes(key)) {
      properties.where = {$ref: '#/$defs/wrangles/commonProperties/' +
        (snapshot.controls.where_overwrite_output.includes(key) ? 'where_special' : 'where')};
      properties.where_params = {$ref: '#/$defs/wrangles/commonProperties/where_params'};
    }
    assert.deepEqual(withoutAnnotations(schema.$defs.wrangles.items.properties[key]), expected, key);
    exact++;
  }
  assert.equal(exact, entries.filter(entry => snapshot.wrangles[entry.metadata.wrangle_key]?.schema && !corrected.has(entry.metadata.wrangle_key)).length);
  assert.equal(entries.filter(entry => entry.metadata.schema_origin === 'deprecated-alias:math').length, 1);
  assert.equal(entries.filter(entry => entry.metadata.schema_origin === 'signature-derived').length, 1);
});

test('reconciliation rejects parameter, requiredness and whole-schema drift', () => {
  for (const mutate of [
    entry => { entry.metadata.parameters[0].schema = {type: 'boolean'}; },
    entry => { entry.metadata.parameters[0].required = !entry.metadata.parameters[0].required; },
    entry => { entry.metadata.configuration_schema.additionalProperties = 'invalid'; },
  ]) {
    const entry = structuredClone(entries.find(entry => entry.metadata.wrangle_key === 'convert.case'));
    mutate(entry);
    assert.ok(compareEmbeddedSchema(entry, runtime.wrangles.find(item => item.runtime_key === 'convert.case')).length);
  }
});

test('whole-schema conditions, accepted types, enums and controls are enforced', () => {
  const accepts = (key, args) => validate({wrangles: [{[key]: args}]});
  assert.ok(accepts('filter', {equal: 3}));
  assert.ok(accepts('filter', {equal: true}));
  assert.ok(accepts('create.embeddings', {input: ['A', 'B'], api_key: 'placeholder'}));
  assert.equal(accepts('create.embeddings', {input: 'A', api_key: 'placeholder', retries: -1}), false);
  assert.equal(accepts('extract.ai', {api_key: 'placeholder'}), false);
  assert.ok(accepts('extract.ai', {api_key: 'placeholder', model_id: 'example'}));
  assert.equal(accepts('compare.text', {input: ['A','B'], output: 'C', method: 'similarity', metric: 'invalid'}), false);
  assert.ok(accepts('convert.case', {input: 'A', case: 'upper', where: 'A IS NOT NULL', if: 'true'}));
  assert.equal(accepts('convert.case', {input: 'A', case: 'upper', where: 42}), false);
});

test('every complete recipe example in wrangle Markdown and fixtures validates', () => {
  let count = 0;
  for (const entry of entries) {
    const recipes = (entry.metadata.examples || []).map(example => example.recipe);
    for (const match of entry.body.matchAll(/```(?:yaml|yml)\s*\n([\s\S]*?)```/g)) recipes.push(match[1]);
    for (const text of recipes) {
      const recipe = yaml.load(text);
      if (!recipe?.wrangles) continue;
      assert.ok(validate(recipe), `${entry.metadata.wrangle_key}: ${JSON.stringify(validate.errors)}`);
      count++;
    }
  }
  assert.ok(count >= 140);
});
