const yaml = require('js-yaml');

// UI availability only: this is not a server-side security sandbox.
const RUN_DISABLED_WRANGLES = {
  batch: 'This example requires an external API key.',
  classify: 'This example requires a configured model ID and model service.',
  'create.embeddings': 'This example requires an external AI API key.',
  'extract.ai': 'This example requires an external AI API key or configured model.',
  'extract.custom': 'This example requires a configured model ID and model service.',
  'generate.ai': 'This example requires an external AI API key.',
  huggingface: 'This example depends on an external model service.',
  lookup: 'This example requires a configured model ID and model service.',
  'lookup.key': 'This example requires a configured model ID and model service.',
  'lookup.semantic': 'This example requires a configured model ID and model service.',
  'search.find_links': 'This example requires an external SerpApi API key.',
  'search.retrieve_link_content': 'This example requires an external Google API key.',
  'search.ai_mode': 'This example requires an external API key.',
  standardize: 'This example requires a configured model ID and model service.',
  'standardize.custom': 'This example requires a configured model ID and model service.',
};

function getRunDisabledReason(recipe) {
  let parsed;
  const source = String(recipe || '').replace(/\t/g, '  ');
  try {
    parsed = yaml.load(source);
  } catch {
    return 'This example is not valid YAML.';
  }
  if (!Array.isArray(parsed?.wrangles) || !parsed.wrangles.length) {
    return 'Add at least one wrangle before running.';
  }
  const visited = new WeakSet();
  function inspect(value) {
    if (!value || typeof value !== 'object' || visited.has(value)) return '';
    visited.add(value);
    for (const [key, child] of Object.entries(value)) {
      if (['read', 'write', 'run'].includes(key)) {
        return 'Connector operations are not available in interactive examples.';
      }
      if (key === 'functions') {
        return 'Custom function files are configured by the server, not by the recipe.';
      }
      if (/^(model|model_id|api_key|openai_key|openai_api_key)$/i.test(key)) {
        return 'This example requires a model or API key and cannot run interactively.';
      }
      if (key === 'wrangles' && Array.isArray(child)) {
        for (const step of child) {
          const name = step && typeof step === 'object' ? Object.keys(step)[0] : '';
          if (name === 'custom.function_name') return 'This tutorial placeholder has no custom function implementation.';
          if (name === 'recipe' && step.recipe?.name) return 'This example requires a separate recipe file.';
          if (name?.startsWith('ai.')) return 'This example requires an external AI service.';
          if (RUN_DISABLED_WRANGLES[name]) return RUN_DISABLED_WRANGLES[name];
        }
      }
      // Do not interpret literal data as execution configuration.
      if (['default', 'value', 'data', 'examples'].includes(key)) continue;
      const reason = inspect(child);
      if (reason) return reason;
    }
    return '';
  }
  function inspectVariables(value, bound = new Set()) {
    if (typeof value === 'string') {
      return [...value.matchAll(/\$\{([^}]+)\}/g)].some(match => !bound.has(match[1]))
        ? 'This example requires a variable or secret before it can run.' : '';
    }
    if (!value || typeof value !== 'object') return '';
    for (const [key, child] of Object.entries(value)) {
      if (key === 'matrix' && child && typeof child === 'object') {
        const variables = child.variables;
        if (!variables || typeof variables !== 'object' || Array.isArray(variables)
            || !Object.values(variables).every(values => Array.isArray(values)
              && values.every(v => v === null || ['string', 'number', 'boolean'].includes(typeof v)))) {
          return 'Interactive matrix examples require explicit lists of variable values.';
        }
        const valuesReason = inspectVariables(variables, bound);
        if (valuesReason) return valuesReason;
        const reason = inspectVariables(child.wrangles, new Set([...bound, ...Object.keys(variables)]));
        if (reason) return reason;
      } else {
        const reason = inspectVariables(child, bound);
        if (reason) return reason;
      }
    }
    return '';
  }
  return inspect(parsed) || inspectVariables(parsed);
}

module.exports = {getRunDisabledReason};
