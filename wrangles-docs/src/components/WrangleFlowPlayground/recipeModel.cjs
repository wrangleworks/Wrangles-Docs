const yaml = require('js-yaml');

const clone = value => structuredClone(value);
function parseRecipe(source) {
  const recipe = yaml.load(String(source).replace(/\t/g, '  '));
  if (!recipe || typeof recipe !== 'object' || !Array.isArray(recipe.wrangles)) {
    throw new Error('A recipe must contain a wrangles list.');
  }
  JSON.stringify(recipe); // Reject recursive YAML aliases before rendering.
  return recipe;
}
function recipeSteps(recipe) {
  return recipe.wrangles.map(entry => {
    if (!entry || Array.isArray(entry) || typeof entry !== 'object' || Object.keys(entry).length !== 1) {
      throw new Error('Each recipe step must contain one wrangle name.');
    }
    const [type, config] = Object.entries(entry)[0];
    return {type, config: clone(config)};
  });
}
function buildRecipeYaml(blocks, options = {}) {
  return yaml.dump({...clone(options), wrangles: blocks.map(({type, config}) => ({[type]: clone(config)}))}, {lineWidth: -1, noRefs: true});
}
function updateConfig(config, key, value) {
  return {...clone(config), [key]: clone(value)};
}
module.exports = {parseRecipe, recipeSteps, buildRecipeYaml, updateConfig};
