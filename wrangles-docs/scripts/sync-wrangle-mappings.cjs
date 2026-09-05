#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const siteDir = path.resolve(__dirname, '..');
const mappingPath = path.join(siteDir, 'src', 'components', 'WrangleFlowPlayground', 'wrangleMappings.json');
const catalogPath = path.join(siteDir, 'src', 'components', 'WrangleFlowPlayground', 'wrangleCatalog.generated.js');
const KNOWN_UNRESOLVED = new Set([
  'docs/python/recipes/wrangles/compare.md::compare.lists',
]);

function loadGeneratedCatalogTypes() {
  const source = fs.readFileSync(catalogPath, 'utf8');
  const match = source.match(/const GENERATED_WRANGLE_CATALOG = ([\s\S]*);\n\nexport default/);
  if (!match) {
    throw new Error(`Could not parse generated catalog at ${catalogPath}`);
  }

  return JSON.parse(match[1]).map((item) => item.type);
}

function normalizeMapping(rawMapping) {
  return Object.fromEntries(
    Object.entries(rawMapping).map(([type, value]) => [
      type,
      {
        modelId: String(value.modelId || '').trim(),
        docs: Array.isArray(value.docs) ? value.docs : [],
      },
    ]),
  );
}

function validateMapping(mapping, catalogTypes) {
  const catalogSet = new Set(catalogTypes);
  const mappingSet = new Set(Object.keys(mapping));
  const missing = catalogTypes.filter((type) => !mappingSet.has(type));
  const extra = [...mappingSet].filter((type) => !catalogSet.has(type));

  if (missing.length || extra.length) {
    throw new Error(
      [
        missing.length ? `Missing mapping entries: ${missing.join(', ')}` : '',
        extra.length ? `Unknown mapping entries: ${extra.join(', ')}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    );
  }
}

function markerFor(type, modelId) {
  return `<!-- wrangle: {"type":"${type}","model_id":"${modelId}"} -->`;
}

function removeObsoleteFrontmatterWrangles(source) {
  const lines = source.split('\n');
  if (lines[0] !== '---') {
    return {source, changed: false};
  }

  const endIndex = lines.indexOf('---', 1);
  if (endIndex === -1) {
    return {source, changed: false};
  }

  const nextLines = [lines[0]];
  let changed = false;

  for (let index = 1; index < endIndex; index += 1) {
    if (lines[index] !== 'wrangles:') {
      nextLines.push(lines[index]);
      continue;
    }

    changed = true;
    index += 1;
    while (index < endIndex) {
      const line = lines[index];
      if (line && !line.startsWith(' ') && !line.startsWith('\t')) {
        index -= 1;
        break;
      }
      index += 1;
    }
  }

  nextLines.push(...lines.slice(endIndex));
  return {
    source: nextLines.join('\n'),
    changed,
  };
}

function main() {
  const catalogTypes = loadGeneratedCatalogTypes();
  const mapping = normalizeMapping(JSON.parse(fs.readFileSync(mappingPath, 'utf8')));
  validateMapping(mapping, catalogTypes);

  const missingMarkers = [];
  const unresolved = [];
  let checked = 0;
  let cleaned = 0;

  for (const type of catalogTypes) {
    const entry = mapping[type];

    for (const docPath of entry.docs) {
      const absoluteDocPath = path.join(siteDir, docPath);
      if (!fs.existsSync(absoluteDocPath)) {
        missingMarkers.push(`${docPath}: ${type} (mapped markdown file does not exist)`);
        continue;
      }

      const key = `${docPath}::${type}`;
      const raw = fs.readFileSync(absoluteDocPath, 'utf8');
      const cleanup = removeObsoleteFrontmatterWrangles(raw);
      if (cleanup.changed) {
        fs.writeFileSync(absoluteDocPath, cleanup.source, 'utf8');
        cleaned += 1;
      }

      if (cleanup.source.includes(markerFor(type, entry.modelId))) {
        checked += 1;
        continue;
      }

      if (KNOWN_UNRESOLVED.has(key)) {
        unresolved.push(`${docPath}: ${type}`);
        continue;
      }

      missingMarkers.push(`${docPath}: ${type}`);
    }
  }

  if (missingMarkers.length) {
    throw new Error(`Missing hidden wrangle markers:\n${missingMarkers.join('\n')}`);
  }

  console.log(`Validated ${checked} hidden wrangle markers.`);
  if (cleaned) {
    console.log(`Removed obsolete frontmatter wrangles from ${cleaned} markdown files.`);
  }
  if (unresolved.length) {
    console.log(`Skipped ${unresolved.length} known unresolved mapping(s): ${unresolved.join(', ')}`);
  }
}

main();
