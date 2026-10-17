// Parse a candidate generated page without evaluating its code or running recipes.
const fs = require('node:fs');
const path = require('node:path');
const {parseRegistryMarkdown} = require('./registry-markdown.cjs');
(async () => {
  const {metadata} = parseRegistryMarkdown(fs.readFileSync(process.argv[2], 'utf8'));
  const filename = path.resolve(__dirname, '../registry-docs', metadata.slug + '.md');
  const source = fs.readFileSync(filename, 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const {compile} = await import('@mdx-js/mdx');
  await compile(source, {development: false});
})().catch(error => { console.error(error); process.exitCode = 1; });
