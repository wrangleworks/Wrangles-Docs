function normalize(value) {
  return String(value || '').toLowerCase().replace(/[._/\-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function getSearchItems(allDocsData) {
  const items = new Map();
  for (const [plugin, data] of Object.entries(allDocsData || {})) {
    const version = data.versions?.find(item => item.isLast) || data.versions?.[0];
    for (const doc of version?.docs || []) {
      if (!doc.path || items.has(doc.path)) continue;
      const title = plugin === 'registry'
        ? doc.id.replace(/^connectors\//, 'connector/').replaceAll('/', '.').replaceAll('-', '_')
        : doc.id.replaceAll('/', ' / ').replace(/[-_]/g, ' ');
      items.set(doc.path, {id: `${plugin}:${doc.id}`, title, path: doc.path,
        haystack: normalize(`${title} ${doc.id} ${doc.path}`)});
    }
  }
  return [...items.values()];
}

function searchItemsForQuery(items, query) {
  const normalized = normalize(query);
  if (!normalized) return [];
  const terms = normalized.split(' ');
  return items.filter(item => terms.every(term => item.haystack.includes(term)))
    .map(item => ({...item, score: normalize(item.title) === normalized ? 3
      : normalize(item.title).startsWith(normalized) ? 2 : 1}))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 8);
}

module.exports = {getSearchItems, searchItemsForQuery};
