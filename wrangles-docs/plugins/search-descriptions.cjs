module.exports = function searchDescriptions() {
  return {
    name: 'search-descriptions',
    allContentLoaded({allContent, actions}) {
      const descriptions = {};
      for (const content of Object.values(allContent['docusaurus-plugin-content-docs'] || {})) {
        for (const version of content.loadedVersions) {
          for (const doc of version.docs) {
            descriptions[doc.permalink] = String(doc.description || '')
              .replace(/`/g, '').replace(/\s+/g, ' ').trim();
          }
        }
      }
      actions.setGlobalData(descriptions);
    },
  };
};
