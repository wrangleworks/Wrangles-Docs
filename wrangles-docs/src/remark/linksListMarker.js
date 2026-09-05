const {visitParents} = require('unist-util-visit-parents');

const MARKER_RE = /\\?\{\.links-list\\?\}/g;
const COMMENT_MARKER_RE = /<!--\s*\\?\{\.links-list\\?\}\s*-->/;

function addLinksListClass(listNode) {
  if (!listNode) return;
  const data = (listNode.data ||= {});
  const hProperties = (data.hProperties ||= {});

  let className = hProperties.className;
  if (!className) className = [];
  if (typeof className === 'string') className = className.split(/\s+/).filter(Boolean);
  if (!Array.isArray(className)) className = [String(className)];

  if (!className.includes('links-list')) className.push('links-list');
  hProperties.className = className;
}

function isMarkerHtml(node) {
  if (!node || node.type !== 'html' || typeof node.value !== 'string') return false;
  const value = node.value.trim();
  if (value === '{.links-list}' || value === '\\{.links-list\\}') return true;
  return COMMENT_MARKER_RE.test(value);
}

function isMarkerParagraph(node) {
  if (!node || node.type !== 'paragraph' || !Array.isArray(node.children)) return false;
  if (node.children.length !== 1) return false;
  const child = node.children[0];
  if (!child || child.type !== 'text' || typeof child.value !== 'string') return false;
  const value = child.value.trim();
  return value === '{.links-list}' || value === '\\{.links-list\\}';
}

function removeEmptyParagraphs(node) {
  if (!node || !Array.isArray(node.children)) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    removeEmptyParagraphs(child);

    if (child?.type !== 'paragraph' || !Array.isArray(child.children)) continue;
    const isEmpty = child.children.every((n) => {
      if (n.type !== 'text') return false;
      return !n.value || !n.value.trim();
    });
    if (isEmpty) {
      node.children.splice(i, 1);
      i--;
    }
  }
}

module.exports = function linksListMarkerPlugin() {
  return (tree) => {
    // 1) Handle standalone markers that appear as sibling nodes after a list.
    // This covers markers stored as html comments too (preferred).
    const walkChildren = (node) => {
      if (!node || !Array.isArray(node.children)) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        if (isMarkerHtml(child) || isMarkerParagraph(child)) {
          const previous = node.children[i - 1];
          if (previous?.type === 'list') {
            addLinksListClass(previous);
          }
          node.children.splice(i, 1);
          i--;
          continue;
        }

        walkChildren(child);
      }
    };
    walkChildren(tree);

    // 2) Handle markers that got parsed into list item text (common in scraped docs).
    visitParents(tree, 'text', (node, ancestors) => {
      if (!node.value || !node.value.includes('links-list')) return;
      if (!MARKER_RE.test(node.value)) {
        MARKER_RE.lastIndex = 0;
        return;
      }
      MARKER_RE.lastIndex = 0;

      node.value = node.value
        .replace(MARKER_RE, '')
        .replace(/\n[ \t]*$/, '');

      // Apply class to the closest ancestor list.
      for (let i = ancestors.length - 1; i >= 0; i--) {
        if (ancestors[i]?.type === 'list') {
          addLinksListClass(ancestors[i]);
          break;
        }
      }
      MARKER_RE.lastIndex = 0;
    });

    removeEmptyParagraphs(tree);
  };
};

