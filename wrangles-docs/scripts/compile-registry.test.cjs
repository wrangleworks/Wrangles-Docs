const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {validateColumnSemantics} = require('./compile-registry.cjs');

const siteRoot = path.resolve(__dirname, '..');
const repositoryRoot = path.resolve(siteRoot, '..');
const contractsRoot = path.join(siteRoot, 'static', 'registry', 'contracts');
const registryManifestPath = path.join(siteRoot, 'static', 'registry', 'manifest.json');
const catalogSnapshotPath = path.join(
  siteRoot,
  'static',
  'registry',
  'catalog',
  'api-core.json',
);
const catalogReconciliationPath = path.join(
  siteRoot,
  'static',
  'registry',
  'catalog',
  'reconciliation.json',
);
const entrySchemaPath = path.join(
  repositoryRoot,
  'registry',
  'schema',
  'wrangle-entry.schema.json',
);
const recipeSchemaPath = path.join(
  siteRoot,
  'static',
  'schemas',
  'recipes',
  'registry',
  'schema.json',
);
const recipeWriterSchemaPath = path.join(
  siteRoot,
  'static',
  'schemas',
  'recipes',
  'registry',
  'recipe-writer.schema.json',
);

function parameterContract(relativeContract, parameterName) {
  const contract = JSON.parse(
    fs.readFileSync(path.join(contractsRoot, relativeContract), 'utf8'),
  );
  return contract.parameters.find((parameter) => parameter.name === parameterName);
}

test('column semantics are optional and accept every supported cardinality', () => {
  assert.deepEqual(validateColumnSemantics({schema: {type: 'boolean'}}), []);

  const validParameters = [
    {
      column_semantics: {role: 'reference', cardinality: 'scalar'},
      schema: {type: ['string', 'null']},
    },
    {
      column_semantics: {role: 'reference', cardinality: 'list'},
      schema: {type: 'array', items: {type: ['string', 'integer']}},
    },
    {
      column_semantics: {role: 'destination', cardinality: 'scalar_or_list'},
      schema: {
        type: ['string', 'integer', 'array', 'null'],
        items: {type: ['string', 'integer']},
      },
    },
  ];

  for (const parameter of validParameters) {
    assert.deepEqual(validateColumnSemantics(parameter), []);
  }
});

test('column semantics reject unknown fields, invalid roles, and schema mismatches', () => {
  assert.deepEqual(
    validateColumnSemantics({
      column_semantics: {role: 'source', cardinality: 'scalar', effect: 'add'},
      schema: {type: ['string', 'array'], items: {type: 'string'}},
    }),
    [
      'column_semantics has unknown field effect',
      'column_semantics.role must be one of: reference, destination',
      'column_semantics.cardinality scalar does not match schema shape scalar_or_list',
    ],
  );
  assert.deepEqual(
    validateColumnSemantics({
      column_semantics: {role: 'destination', cardinality: 'scalar'},
      schema: {type: 'boolean'},
    }),
    [
      'schema accepts unsupported parameter value type boolean; object, mapping, nested-list, and other indirect locations require a future locator vocabulary',
    ],
  );
});

test('column semantics reject non-column branches and indirect identifier locations', () => {
  assert.deepEqual(
    validateColumnSemantics({
      column_semantics: {role: 'destination', cardinality: 'scalar'},
      schema: {type: ['string', 'object']},
    }),
    [
      'schema accepts unsupported parameter value type object; object, mapping, nested-list, and other indirect locations require a future locator vocabulary',
    ],
  );
  assert.deepEqual(
    validateColumnSemantics({
      column_semantics: {role: 'reference', cardinality: 'list'},
      schema: {type: 'array'},
    }),
    ['schema array items must be explicitly limited to string/integer column identifiers'],
  );
  assert.deepEqual(
    validateColumnSemantics({
      column_semantics: {role: 'destination', cardinality: 'list'},
      schema: {type: 'array', items: {type: 'object'}},
    }),
    [
      'schema.items accepts unsupported array item type object; object, mapping, nested-list, and other indirect locations require a future locator vocabulary',
    ],
  );
  assert.deepEqual(
    validateColumnSemantics({
      column_semantics: {role: 'reference', cardinality: 'scalar'},
      schema: {$ref: '#/$defs/column'},
    }),
    ['schema uses $ref; indirect column locations require a future locator vocabulary'],
  );
  assert.deepEqual(
    validateColumnSemantics({
      column_semantics: {role: 'reference', cardinality: 'scalar'},
      schema: {allOf: [{type: 'string'}]},
    }),
    ['schema uses allOf; indirect column locations require a future locator vocabulary'],
  );
});

test('entry schema publishes the closed column semantics vocabulary', () => {
  const entrySchema = JSON.parse(fs.readFileSync(entrySchemaPath, 'utf8'));
  const columnSemantics = entrySchema.$defs.column_semantics;

  assert.equal(columnSemantics.additionalProperties, false);
  assert.deepEqual(columnSemantics.required, ['role', 'cardinality']);
  assert.deepEqual(columnSemantics.properties.role.enum, ['reference', 'destination']);
  assert.deepEqual(
    columnSemantics.properties.cardinality.enum,
    ['scalar', 'list', 'scalar_or_list'],
  );
  assert.deepEqual(
    entrySchema.$defs.parameter.properties.column_semantics,
    {$ref: '#/$defs/column_semantics'},
  );
});

test('compiled contracts preserve representative column semantics', () => {
  const cases = [
    [
      'standardize/clean.json',
      'input',
      {role: 'reference', cardinality: 'scalar_or_list'},
    ],
    [
      'standardize/clean.json',
      'output',
      {role: 'destination', cardinality: 'scalar_or_list'},
    ],
    ['extract/date-range.json', 'start_time', {role: 'reference', cardinality: 'scalar'}],
    ['extract/date-range.json', 'end_time', {role: 'reference', cardinality: 'scalar'}],
    ['extract/date-range.json', 'output', {role: 'destination', cardinality: 'scalar'}],
    ['drop.json', 'columns', {role: 'reference', cardinality: 'scalar_or_list'}],
    ['rename.json', 'input', {role: 'reference', cardinality: 'scalar_or_list'}],
    ['rename.json', 'output', {role: 'destination', cardinality: 'scalar_or_list'}],
  ];

  for (const [contract, parameterName, expected] of cases) {
    assert.deepEqual(parameterContract(contract, parameterName).column_semantics, expected);
  }

  for (const [contract, parameterName] of [
    ['create/column.json', 'output'],
    ['create/embeddings.json', 'input'],
    ['create/embeddings.json', 'output'],
    ['merge/coalesce.json', 'input'],
    ['merge/coalesce.json', 'output'],
  ]) {
    assert.equal(parameterContract(contract, parameterName).column_semantics, undefined);
  }
});

test('recipe schema exposes column semantics as JSON Schema annotations', () => {
  const schemas = [recipeSchemaPath, recipeWriterSchemaPath].map((filename) =>
    JSON.parse(fs.readFileSync(filename, 'utf8')),
  );

  for (const schema of schemas) {
    const wrangles = schema.$defs.wrangles.items.properties;
    assert.deepEqual(
      wrangles['standardize.clean'].properties.input['x-wrangles-column'],
      {role: 'reference', cardinality: 'scalar_or_list'},
    );
    assert.deepEqual(wrangles.drop.properties.columns['x-wrangles-column'], {
      role: 'reference',
      cardinality: 'scalar_or_list',
    });
    assert.deepEqual(
      wrangles['extract.date_range'].properties.start_time['x-wrangles-column'],
      {role: 'reference', cardinality: 'scalar'},
    );
    assert.deepEqual(
      wrangles['extract.date_range'].properties.output['x-wrangles-column'],
      {role: 'destination', cardinality: 'scalar'},
    );
    assert.equal(wrangles['create.column'].properties.output['x-wrangles-column'], undefined);
    assert.equal(wrangles['create.embeddings'].properties.input['x-wrangles-column'], undefined);
    assert.equal(wrangles['merge.coalesce'].properties.input['x-wrangles-column'], undefined);
  }
});

test('compiled Registry publishes API Core catalog identities as strings', () => {
  const manifest = JSON.parse(fs.readFileSync(registryManifestPath, 'utf8'));
  const catalogIds = manifest.entries.map((entry) => entry.catalog_id);
  const convertCase = manifest.entries.find((entry) => entry.wrangle_key === 'convert.case');

  assert.equal(manifest.registry_version, '0.3.0');
  assert.equal(manifest.contract_version, '0.3');
  assert.equal(manifest.entry_count, 98);
  assert.equal(new Set(catalogIds).size, manifest.entry_count);
  assert.ok(catalogIds.every((catalogId) => /^[1-9][0-9]*$/.test(catalogId)));
  assert.equal(convertCase.catalog_id, '5');
  assert.equal(convertCase.catalog_key, 'convert.case');
  assert.equal(convertCase.catalog_status, 'active');
  assert.equal(convertCase.legacy_id, '12ff4120-3613-4801-8653-99c793477fbc');
  assert.equal('id' in convertCase, false);
});

test('compiled contracts use catalog identity and retain UUID only as legacy data', () => {
  const contract = JSON.parse(
    fs.readFileSync(path.join(contractsRoot, 'convert', 'case.json'), 'utf8'),
  );

  assert.equal(contract.schema_version, '0.3');
  assert.equal(contract.catalog_id, '5');
  assert.equal(contract.catalog_key, 'convert.case');
  assert.equal(contract.catalog_status, 'active');
  assert.equal(contract.legacy_id, '12ff4120-3613-4801-8653-99c793477fbc');
  assert.equal('id' in contract, false);
});

test('catalog-only records and source differences remain explicit', () => {
  const snapshot = JSON.parse(fs.readFileSync(catalogSnapshotPath, 'utf8'));
  const reconciliation = JSON.parse(fs.readFileSync(catalogReconciliationPath, 'utf8'));
  const map = snapshot.entries.find((entry) => entry.catalog_key === 'map');

  assert.equal(snapshot.entry_count, 99);
  assert.equal(map.catalog_id, '99');
  assert.equal(typeof map.catalog_id, 'string');
  assert.deepEqual(
    reconciliation.catalog_only_entries.map((entry) => entry.catalog_key),
    ['map'],
  );
  assert.deepEqual(
    reconciliation.matched_entries
      .filter((entry) => entry.catalog_status !== entry.registry_status)
      .map((entry) => entry.wrangle_key),
    ['maths', 'standardize'],
  );
  assert.equal(reconciliation.summary.conflicting_entries, 0);
  assert.equal(reconciliation.summary.entries_without_catalog_registry_path, 98);
});
