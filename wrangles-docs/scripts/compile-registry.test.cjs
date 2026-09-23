const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const os = require('node:os');
const crypto = require('node:crypto');
const {spawnSync} = require('node:child_process');

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

  assert.equal(manifest.registry_version, '0.3.1');
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

  assert.equal(snapshot.entry_count, 101);
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

// Synthetic metadata: actual IDs/keys reported by the catalog owner, with
// fixture-only titles and timestamps. Do not use these rows as a DB export.
function catalogCompilerFixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wrangles-catalog-test-'));
  t.after(() => {
    const resolved = path.resolve(root);
    const tempRoot = path.resolve(os.tmpdir()) + path.sep;
    assert.ok(resolved.startsWith(tempRoot));
    assert.ok(path.basename(resolved).startsWith('wrangles-catalog-test-'));
    fs.rmSync(resolved, {recursive: true, force: true});
  });
  fs.cpSync(path.join(repositoryRoot, 'registry'), path.join(root, 'registry'), {recursive: true});
  const site = path.join(root, 'wrangles-docs');
  fs.mkdirSync(path.join(site, 'scripts'), {recursive: true});
  fs.copyFileSync(__dirname + '/compile-registry.cjs', path.join(site, 'scripts', 'compile-registry.cjs'));
  const snapshotPath = path.join(root, 'registry', 'catalog', 'api-core.json');
  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
  const lookup = snapshot.entries.find((entry) => entry.catalog_key === 'lookup');
  snapshot.entries = snapshot.entries.filter((entry) => !['lookup.key', 'lookup.semantic'].includes(entry.catalog_key));
  snapshot.entries.push(
    {...lookup, catalog_id: '101', catalog_key: 'lookup.key', title: 'Key lookup fixture'},
    {...lookup, catalog_id: '102', catalog_key: 'lookup.semantic', title: 'Semantic lookup fixture', status: 'deprecated'},
  );
  return {
    snapshot,
    read: (relative) => JSON.parse(fs.readFileSync(path.join(site, relative), 'utf8')),
    exists: (relative) => fs.existsSync(path.join(site, relative)),
    compile() {
      snapshot.entry_count = snapshot.entries.length;
      fs.writeFileSync(snapshotPath, JSON.stringify(snapshot));
      return spawnSync(process.execPath, [path.join(site, 'scripts', 'compile-registry.cjs')], {
        cwd: site,
        encoding: 'utf8',
        timeout: 30000,
        maxBuffer: 4 * 1024 * 1024,
        env: {
          ...process.env,
          NODE_PATH: [path.dirname(path.dirname(require.resolve('js-yaml/package.json'))), process.env.NODE_PATH]
            .filter(Boolean).join(path.delimiter),
        },
      });
    },
  };
}

test('catalog variants share one contract and preserve selection identities', (t) => {
  const fixture = catalogCompilerFixture(t);
  const result = fixture.compile();
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  const manifest = fixture.read('static/registry/manifest.json');
  const bindingPath = manifest.artifacts.catalog_bindings;
  const bindings = fixture.read(`static${bindingPath}`);
  const lookupBindings = bindings.entries.filter((entry) => entry.wrangle_key === 'lookup');
  assert.deepEqual(lookupBindings.map((entry) => [entry.catalog_id, entry.catalog_key, entry.canonical_catalog_id]), [
    ['81', 'lookup', '81'], ['101', 'lookup.key', '81'], ['102', 'lookup.semantic', '81'],
  ]);
  assert.deepEqual(lookupBindings.map((entry) => entry.contract_json), Array(3).fill('/registry/contracts/lookup.json'));
  assert.equal(lookupBindings[1].title, 'Key lookup fixture');
  assert.equal(lookupBindings[2].catalog_status, 'deprecated');
  assert.ok(lookupBindings.every((entry) => !('model_id' in entry)));
  assert.equal(bindings.entry_count, 100);
  assert.equal(manifest.catalog.binding_count, 100);
  assert.equal(manifest.entry_count, 98);
  assert.equal(manifest.catalog.callable_entry_count, 98);
  assert.deepEqual(manifest.entries.filter((entry) => entry.wrangle_key === 'lookup').map((entry) => entry.catalog_id), ['81']);
  assert.equal(fixture.read('static/registry/contracts/lookup.json').catalog_id, '81');
  assert.equal(fixture.exists('static/registry/contracts/lookup/key.json'), false);
  assert.equal(fixture.exists('registry-docs/lookup/key.md'), false);
  for (const schemaName of ['schema.json', 'recipe-writer.schema.json']) {
    const properties = fixture.read(`static/schemas/recipes/registry/${schemaName}`).$defs.wrangles.items.properties;
    assert.equal('lookup' in properties, true);
    assert.equal('lookup.key' in properties, false);
    assert.equal('lookup.semantic' in properties, false);
    assert.equal(properties.lookup.properties.model_id.type.includes('string'), true);
  }
  assert.equal(bindings.entries.some((entry) => entry.catalog_key === 'map'), false);
  assert.equal(manifest.artifact_checksums.files[bindingPath], crypto.createHash('sha256')
    .update(`${JSON.stringify(bindings, null, 2)}\n`).digest('hex'));
  const report = fixture.read('static/registry/catalog/reconciliation.json');
  assert.deepEqual(report.additional_bindings.map((entry) => [entry.catalog_id, entry.wrangle_key]), [
    ['101', 'lookup'], ['102', 'lookup'],
  ]);
  assert.deepEqual(report.additional_bindings[1].differences[0], {
    code: 'status_difference', registry: 'active', catalog: 'deprecated',
  });

  fixture.snapshot.entries.reverse();
  const reversed = fixture.compile();
  assert.equal(reversed.status, 0, reversed.stderr);
  assert.deepEqual(fixture.read(`static${bindingPath}`), bindings);
  assert.equal(fixture.read('static/registry/contracts/lookup.json').catalog_id, '81');
});

test('catalog binding IDs above the JavaScript safe integer range remain exact', (t) => {
  const fixture = catalogCompilerFixture(t);
  fixture.snapshot.entries.find((entry) => entry.catalog_key === 'lookup.semantic').catalog_id = '9007199254740993';
  const result = fixture.compile();
  assert.equal(result.status, 0, result.stderr);
  const bindings = fixture.read('static/registry/catalog/bindings.json').entries;
  assert.equal(bindings.find((entry) => entry.catalog_key === 'lookup.semantic').catalog_id, '9007199254740993');
});

for (const [label, mutate, expected] of [
  ['duplicate IDs', (s) => { s.entries.at(-1).catalog_id = '101'; }, /duplicate catalog_id 101/],
  ['duplicate keys', (s) => { s.entries.at(-1).catalog_key = 'lookup.key'; }, /duplicate catalog_key lookup.key/],
  ['missing canonical row', (s) => { s.entries = s.entries.filter((e) => e.catalog_key !== 'lookup'); }, /requires a canonical row.*lookup/],
  ['wrong canonical target', (s) => { s.entries.find((e) => e.catalog_key === 'lookup').wrangle_key = 'classify'; }, /requires a canonical row.*lookup/],
  ['incompatible variant kind', (s) => { s.entries.at(-1).kind = 'connector'; }, /lookup.semantic has incompatible kind connector/],
  ['canonical title drift', (s) => { s.entries.find((e) => e.catalog_key === 'lookup').title = 'Wrong'; }, /title_mismatch/],
]) {
  test(`catalog bindings reject ${label} before publishing`, (t) => {
    const fixture = catalogCompilerFixture(t);
    mutate(fixture.snapshot);
    const result = fixture.compile();
    assert.equal(result.status, 1, result.stderr || result.error?.message);
    assert.match(result.stderr, expected);
    assert.equal(fixture.exists('static/registry/manifest.json'), false);
    assert.equal(fixture.exists('static/registry/catalog/bindings.json'), false);
  });
}
