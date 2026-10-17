const yaml = require('js-yaml');

function parseRegistryMarkdown(source, filename = 'Registry record') {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`${filename}: missing YAML frontmatter`);
  const metadata = yaml.load(match[1]);
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    throw new Error(`${filename}: frontmatter must be an object`);
  }
  return {metadata, body: source.slice(match[0].length).trim()};
}

function serializeRegistryMarkdown(metadata, body) {
  const needsQuotes = value => typeof value === 'string' ? value.split('\n').some(line => /[ \t]$/.test(line))
    : value && typeof value === 'object' ? Object.values(value).some(needsQuotes) : false;
  // Preserve upstream description whitespace inside escaped strings rather than
  // introduce trailing whitespace into Markdown source lines.
  return `---\n${yaml.dump(metadata, {noRefs: true, lineWidth: 100, sortKeys: false, forceQuotes: needsQuotes(metadata)})}---\n\n${body.trim()}\n`;
}

module.exports = {parseRegistryMarkdown, serializeRegistryMarkdown};
