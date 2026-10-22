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

// Schema prose is only a seed for missing editorial content, never a replacement.
function seedMissingIntroduction(metadata, body, schemaDescription) {
  const content = body.replace(/^#\s+[^\r\n]+\r?\n*/, '').trim();
  const guidance = content.split(/^## (?:Migrated examples|Examples)\s*$/m)[0];
  const introduction = guidance.split(/\r?\n\s*\r?\n/)
    .find(block => block.trim() && !/^(?:#|```|<|\|)/.test(block.trim()));
  const hasIntroduction = Boolean(introduction);
  const description = typeof metadata.description === 'string' && metadata.description.trim()
    ? metadata.description : hasIntroduction ? introduction
      : typeof schemaDescription === 'string' && schemaDescription.trim()
        ? schemaDescription : `Reference for the ${metadata.wrangle_key} wrangle.`;
  if (!metadata.description?.trim()) metadata.description = description;
  if (hasIntroduction) return body;
  const title = body.match(/^#\s+[^\r\n]+/);
  return `${title ? title[0] : '# ' + metadata.title}\n\n${description}${content ? '\n\n' + content : ''}`;
}

module.exports = {parseRegistryMarkdown, serializeRegistryMarkdown, seedMissingIntroduction};
