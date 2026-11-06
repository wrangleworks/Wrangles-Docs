const test = require('node:test');
const assert = require('node:assert/strict');
const {getSearchItems, searchItemsForQuery} = require('../src/theme/SearchBar/search.cjs');

test('search covers both documentation collections and matches recipe key punctuation', () => {
  const items = getSearchItems({
    default: {versions: [{docs: [{id: 'account/secrets', path: '/account/secrets'}]}]},
    registry: {versions: [{isLast: true, docs: [
      {id: 'split/dictionary', path: '/py/split/dictionary'},
      {id: 'structure/split-dictionary', path: '/py/structure/split-dictionary'},
      {id: 'connectors/postgres', path: '/py/connectors/postgres'},
    ]}]},
  });
  for (const query of ['split.dictionary', 'split dictionary', 'split/dictionary']) {
    assert.equal(searchItemsForQuery(items, query)[0].path, '/py/split/dictionary');
  }
  assert.equal(searchItemsForQuery(items, 'structure.split_dictionary')[0].path, '/py/structure/split-dictionary');
  assert.equal(searchItemsForQuery(items, 'connector.postgres')[0].path, '/py/connectors/postgres');
  assert.equal(searchItemsForQuery(items, 'account secrets')[0].path, '/account/secrets');
  assert.deepEqual(searchItemsForQuery(items, '   '), []);
  assert.deepEqual(searchItemsForQuery(items, 'does not exist'), []);
});
