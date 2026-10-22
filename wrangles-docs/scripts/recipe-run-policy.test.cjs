const test = require('node:test');
const assert = require('node:assert/strict');
const yaml = require('js-yaml');
const {getRunDisabledReason} = require('../src/components/recipeRunPolicy.cjs');
const reason = steps => getRunDisabledReason(yaml.dump({wrangles: steps}));

test('ordinary and custom group_by use the same runner', () => {
  for (const name of ['extract.date_range', 'merge.dictionaries', 'try']) {
    assert.equal(reason([{[name]: {}}]), '');
  }
  assert.equal(reason([{'select.group_by': {by: 'Category', sum: 'Quantity'}}]), '');
  assert.equal(reason([{'select.group_by': {by: 'Category', 'custom.sum_times_two': 'Quantity'}}]), '');
  assert.equal(reason([{'custom.example': {input: 'x'}}]), '');
});

test('matrix resolves only its own explicit local variables and retains dependency blocks', () => {
  const matrix = {matrix: {variables: {var: ['A', 'B']}, wrangles: [
    {'custom.test_fn': {input: 'Part Code', output: 'Part Code ${var}', value: '${var}'}}
  ]}};
  assert.equal(reason([matrix]), '');
  assert.match(reason([matrix, {copy: {input: '${var}', output: 'x'}}]), /variable or secret/);
  assert.match(reason([{matrix: {variables: {var: ['${SECRET}']}, wrangles: []}}]), /variable or secret/);
  assert.match(reason([{matrix: {variables: {var: 'dir(/tmp)'}, wrangles: []}}]), /explicit lists/);
  assert.match(reason([{matrix: {variables: {var: ['A']}, wrangles: [{classify: {input: 'x'}}]}}]), /model/);
});

test('custom function dependencies are checked inside nested recipes', () => {
  assert.equal(reason([{concurrent: {wrangles: [{'select.group_by': {'custom.sum': 'x'}}]}}]), '');
  assert.equal(reason([{recipe: {wrangles: [{'custom.example': {}}]}}]), '');
  assert.match(getRunDisabledReason('functions: {}\nwrangles:\n  - copy: {input: x, output: y}'), /configured by the server/);
});

test('model and API key dependencies block literal and placeholder values', () => {
  for (const field of ['model', 'model_id', 'api_key', 'openai_api_key']) {
    assert.match(reason([{copy: {[field]: 'test-placeholder'}}]), /model or API key/);
  }
  assert.match(reason([{concurrent: {wrangles: [{classify: {input: 'x'}}]}}]), /model/);
  assert.match(reason([{try: {wrangles: [{classify: {input: 'x'}}]}}]), /model/);
  assert.match(reason([{'ai.answers': {questions: {}}}]), /AI service/);
});

test('placeholder functions, named recipes and connector operations cannot run', () => {
  assert.match(reason([{'custom.function_name': {}}]), /placeholder/);
  assert.match(reason([{concurrent: {wrangles: [{'custom.function_name': {example_param: 'value'}}]}}]), /placeholder/);
  assert.match(reason([{recipe: {name: 'my_recipe.wrgl.yml'}}]), /separate recipe file/);
  assert.match(reason([{log: {write: [{file: {name: 'output/filepath'}}]}}]), /Connector operations/);
  assert.match(getRunDisabledReason('read: [{file: {name: input.csv}}]\nwrangles: [{copy: {input: x, output: y}}]'), /Connector operations/);
  assert.equal(reason([{log: {}}]), '');
  assert.equal(reason([{'custom.test_fn': {input: 'x', value: 'A'}}]), '');
  assert.equal(reason([{'create.column': {output: 'data', value: {write: 'literal'}}}]), '');
});

test('literal data is not mistaken for dependencies', () => {
  assert.equal(reason([{'create.column': {output: 'data', value: {model: 'toy', 'custom.key': 1}}}]), '');
  assert.equal(reason([{copy: {input: 'custom.column', output: 'model'}}]), '');
});

test('safe nested recipes remain runnable and malformed recipes fail closed', () => {
  assert.equal(reason([{concurrent: {wrangles: [{copy: {input: 'x', output: 'y'}}]}}]), '');
  assert.ok(getRunDisabledReason('wrangles: ['));
  assert.ok(getRunDisabledReason('wrangles: []'));
  assert.match(reason([{copy: {input: '${column}', output: 'x'}}]), /variable or secret/);
});
