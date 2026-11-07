const test = require('node:test');
const assert = require('node:assert/strict');
const {parseRecipe, recipeSteps, buildRecipeYaml, updateConfig} = require('../src/components/WrangleFlowPlayground/recipeModel.cjs');
const {customFunctionNames, sources} = require('../src/components/customFunctionReferences.cjs');
const {getRunDisabledReason} = require('../src/components/recipeRunPolicy.cjs');

test('recipe transfer preserves unknown steps, nested structures, types, controls and root settings', () => {
  const recipe = {variables: {test: 4}, read: [{file: {name: 'data.csv'}}], wrangles: [
    {'future.wrangle': {input: 'x', output: ['a'], values: [1, false, null, {nested: [2]}], default: 'square', where: 'x = :value', where_params: {value: 0}}},
    {'custom.reverse_strings': {input: 'Strings', output: 'Reverse'}},
    {'pandas.sort_values': {parameters: {by: 'group'}}},
    {matrix: {variables: {v: ['A']}, wrangles: [{'custom.test_fn': {input: 'code', output: '${v}', value: '${v}'}}]}},
  ]};
  const {wrangles, ...options} = recipe;
  const blocks = recipeSteps(recipe);
  assert.deepEqual(parseRecipe(buildRecipeYaml(blocks, options)), recipe);
  blocks[0].config = updateConfig(blocks[0].config, 'output', 'new');
  assert.deepEqual(parseRecipe(buildRecipeYaml(blocks, options)), {...recipe, wrangles: [
    {'future.wrangle': {...recipe.wrangles[0]['future.wrangle'], output: 'new'}}, ...wrangles.slice(1)]});
  assert.deepEqual(recipe.wrangles[0]['future.wrangle'].output, ['a']);
});

test('invalid steps cannot be silently discarded', () => {
  assert.throws(() => recipeSteps({wrangles: [{a: {}, b: {}}]}), /one wrangle/);
  assert.throws(() => recipeSteps({wrangles: ['custom.unknown']}), /one wrangle/);
});

test('function discovery follows nested configuration and excludes literal example data', () => {
  const recipe = 'wrangles:\n - select.group_by:\n     custom.sum_times_two: Quantity\n - split.tokenize:\n     method: custom.reverse_strings\n - create.column:\n     value: custom.not_a_call\n';
  assert.deepEqual(customFunctionNames(recipe), ['reverse_strings', 'sum_times_two']);
  assert.match(sources.sum_times_two, /def sum_times_two/);
  assert.match(sources.function, /test_vals = \[\]/);
  assert.equal(getRunDisabledReason(recipe), '');
  assert.match(getRunDisabledReason('wrangles:\n - custom.not_available: {}'), /not available/);
  assert.match(getRunDisabledReason('wrangles:\n - custom.reverse_strings:\n     model_id: 123'), /model or API key/);
});

test('every authored YAML recipe survives import and export without per-wrangle handling', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const yaml = require('js-yaml');
  const roots = ['../registry/input_wrangles', '../registry/input_connectors', 'registry-docs/python', 'docs'];
  let count = 0;
  const pythonSnippets = [];
  function visit(dir) {
    for (const file of fs.readdirSync(dir, {withFileTypes: true})) {
      const name = path.join(dir, file.name);
      if (file.isDirectory()) { visit(name); continue; }
      if (!/\.mdx?$/.test(file.name)) continue;
      const text = fs.readFileSync(name, 'utf8');
      for (const match of text.matchAll(/```python[^\n]*\n([\s\S]*?)```/g)) pythonSnippets.push({file: name, source: match[1]});
      const snippets = [...text.matchAll(/```ya?ml[^\n]*\n([\s\S]*?)```/g)].map(match => match[1]);
      for (const match of text.matchAll(/recipe=\{("(?:[^"\\]|\\.)*")\}/g)) snippets.push(JSON.parse(match[1]));
      for (const source of snippets) {
        const parsed = yaml.load(source.replace(/\t/g, '  '));
        if (!parsed || !Array.isArray(parsed.wrangles)) continue;
        const {wrangles, ...options} = parsed;
        assert.deepEqual(parseRecipe(buildRecipeYaml(recipeSteps(parsed), options)), parsed, name);
        count++;
      }
    }
  }
  roots.forEach(visit);
  const result = require('node:child_process').spawnSync('python3', ['-c', String.raw`import ast,json,sys
for example in json.load(sys.stdin):
    source = example['source']
    if any(line.startswith('>>> ') for line in source.splitlines()):
        source = '\n'.join(line[4:] for line in source.splitlines() if line.startswith(('>>> ', '... ')))
    ast.parse(source, filename=example['file'])
`], {input: JSON.stringify(pythonSnippets), encoding: 'utf8'});
  assert.equal(result.status, 0, result.stderr);
  assert.ok(count > 100, `Only ${count} recipes checked`);
});

test('new custom functions and helper dependencies are extracted without executing the module', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const os = require('node:os');
  const {spawnSync} = require('node:child_process');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'function-source-'));
  try {
    const file = path.join(dir, 'functions.py');
    fs.writeFileSync(file, 'from math import floor\nLIMIT = 2\nraise RuntimeError("do not import")\ndef _helper(x):\n    return floor(x) + LIMIT\ndef new_example(x):\n    return _helper(x)\n');
    const run = spawnSync('python3', ['-c', 'import runpy,json,sys; print(json.dumps(runpy.run_path(sys.argv[1])["extract"](sys.argv[2])))', 'scripts/extract-custom-functions.py', file], {encoding: 'utf8'});
    assert.equal(run.status, 0, run.stderr);
    const functions = JSON.parse(run.stdout);
    assert.match(functions.new_example, /from math import floor/);
    assert.match(functions.new_example, /LIMIT = 2/);
    assert.match(functions.new_example, /def _helper/);
    assert.doesNotMatch(functions.new_example, /raise RuntimeError/);
    assert.equal(functions._helper, undefined);
  } finally { fs.rmSync(dir, {recursive: true, force: true}); }
});
