const fs = require('fs');
const path = require('path');
const {unified} = require('unified');
const remarkParse = require('remark-parse').default;
const remarkMdx = require('remark-mdx').default;

const siteDir = path.resolve(__dirname, '..');
const recipesDir = path.join(siteDir, 'docs', 'python', 'recipes');
const targets = [
  path.join(siteDir, 'docs', 'python', 'recipes.md'),
  path.join(recipesDir, 'wrangles.md'),
  ...fs.readdirSync(path.join(recipesDir, 'wrangles')).map((name) => path.join(recipesDir, 'wrangles', name)),
].filter((filePath) => filePath.endsWith('.md'));

const parser = unified().use(remarkParse).use(remarkMdx);
const importLine = "import RecipePlayground from '@site/src/components/RecipePlayground';\n";

function getSourceSlice(source, node) {
  return source.slice(node.position.start.offset, node.position.end.offset);
}

function isRecipeCode(node) {
  return node && node.type === 'code' && /ya?ml/i.test(node.lang || '') && node.value.includes('wrangles:');
}

function isExampleNode(node, source) {
  if (!node) return false;
  const snippet = getSourceSlice(source, node).trim();
  if (!snippet) return false;

  if (node.type === 'mdxJsxFlowElement') {
    return node.name === 'div' || node.name === 'table';
  }

  if (node.type === 'paragraph') {
    return snippet.startsWith('|') && snippet.includes('→');
  }

  return false;
}

function quoteAttribute(value) {
  return `{${JSON.stringify(value)}}`;
}

function buildPlaygroundBlock(recipe, exampleSource) {
  return [
    '<RecipePlayground',
    '  editable={true}',
    `  recipe=${quoteAttribute(recipe)}`,
    `  exampleSource=${quoteAttribute(exampleSource)}`,
    '/>',
  ].join('\n');
}

function ensureImport(source) {
  if (source.includes(importLine.trim())) {
    return source;
  }

  if (!source.startsWith('---')) {
    return `${importLine}\n${source}`;
  }

  const end = source.indexOf('\n---', 3);
  if (end === -1) {
    return `${importLine}\n${source}`;
  }

  const insertAt = end + 4;
  return `${source.slice(0, insertAt)}\n\n${importLine}${source.slice(insertAt)}`;
}

function applyReplacements(source, replacements) {
  let output = source;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    output = `${output.slice(0, replacement.start)}${replacement.value}${output.slice(replacement.end)}`;
  }
  return output;
}

let totalReplacements = 0;

for (const filePath of targets) {
  const source = fs.readFileSync(filePath, 'utf8');
  const tree = parser.parse(source);
  const replacements = [];

  for (let index = 0; index < tree.children.length - 1; index += 1) {
    const node = tree.children[index];
    const next = tree.children[index + 1];

    if (!isRecipeCode(node)) {
      continue;
    }

    if (!isExampleNode(next, source)) {
      continue;
    }

    const recipe = node.value;
    const exampleSource = getSourceSlice(source, next);
    replacements.push({
      start: node.position.start.offset,
      end: next.position.end.offset,
      value: buildPlaygroundBlock(recipe, exampleSource),
    });
    index += 1;
  }

  if (!replacements.length) {
    continue;
  }

  let nextSource = applyReplacements(source, replacements);
  nextSource = ensureImport(nextSource);
  fs.writeFileSync(filePath, nextSource, 'utf8');
  totalReplacements += replacements.length;
  console.log(`${path.relative(siteDir, filePath)}: converted ${replacements.length} example(s)`);
}

console.log(`Total converted examples: ${totalReplacements}`);
