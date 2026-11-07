const yaml = require('js-yaml');
const sources = require('./customFunctions.generated.json');

function customFunctionNames(recipe) {
  let parsed;
  try { parsed = yaml.load(String(recipe).replace(/\t/g, '  ')); } catch { return []; }
  const found = new Set();
  const seen = new WeakSet();
  function visit(value) {
    if (typeof value === 'string') {
      if (/^custom\.[\w.]+$/.test(value)) found.add(value.slice(7));
    } else if (value && typeof value === 'object' && !seen.has(value)) {
      seen.add(value);
      for (const [key, child] of Object.entries(value)) {
        if (['value', 'data', 'default', 'examples', 'input', 'output'].includes(key)) continue;
        if (key.startsWith('custom.')) found.add(key.slice(7));
        visit(child);
      }
    }
  }
  visit(parsed);
  return [...found].sort();
}
module.exports = {customFunctionNames, sources};
