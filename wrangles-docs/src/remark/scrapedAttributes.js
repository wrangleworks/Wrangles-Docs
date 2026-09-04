const {visitParents} = require('unist-util-visit-parents');

// Matches `{.class}` or `\{.class\}` (scraped markdown often uses backslashes).
const CLASS_MARKER_RE = /\\?\{\.([A-Za-z0-9_-]+)\\?\}/g;
// Matches `{#id}` or `\{#id\}` (used in a few docs).
const ID_MARKER_RE = /\\?\{#([A-Za-z0-9_-]+)\\?\}/g;

function ensureHProperties(node) {
  const data = (node.data ||= {});
  return (data.hProperties ||= {});
}

function addClass(node, className) {
  if (!node || !className) return;
  const hProperties = ensureHProperties(node);
  let classes = hProperties.className;
  if (!classes) classes = [];
  if (typeof classes === 'string') classes = classes.split(/\s+/).filter(Boolean);
  if (!Array.isArray(classes)) classes = [String(classes)];
  if (!classes.includes(className)) classes.push(className);
  hProperties.className = classes;
}

function setId(node, id) {
  if (!node || !id) return;
  const hProperties = ensureHProperties(node);
  hProperties.id = id;
}

function findPrevSibling(children, startIndex) {
  for (let i = startIndex - 1; i >= 0; i--) {
    const n = children[i];
    if (!n) continue;
    // Skip empty html nodes (common for scraped `<br/>` etc).
    if (n.type === 'html' && (!n.value || !n.value.trim())) continue;
    return n;
  }
  return null;
}

function extractMarkers(raw) {
  const classes = [];
  const ids = [];

  let match;
  while ((match = CLASS_MARKER_RE.exec(raw))) {
    classes.push(match[1]);
  }
  CLASS_MARKER_RE.lastIndex = 0;

  while ((match = ID_MARKER_RE.exec(raw))) {
    ids.push(match[1]);
  }
  ID_MARKER_RE.lastIndex = 0;

  return {classes, ids};
}

function stripMarkers(raw) {
  return raw
    .replace(CLASS_MARKER_RE, '')
    .replace(ID_MARKER_RE, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');
}

function isMarkerParagraph(node) {
  if (!node || node.type !== 'paragraph' || !Array.isArray(node.children)) return false;
  const text = node.children
    .filter((c) => c.type === 'text')
    .map((c) => c.value)
    .join('');
  if (!text) return false;
  const cleaned = stripMarkers(text).trim();
  if (cleaned !== '') return false;
  const {classes, ids} = extractMarkers(text);
  return classes.length > 0 || ids.length > 0;
}

module.exports = function scrapedAttributesPlugin() {
  return (tree) => {
    // 1) Handle standalone marker paragraphs: apply to the previous sibling node.
    const walk = (node) => {
      if (!node || !Array.isArray(node.children)) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        // Image + `{.mr-1}` immediately after the image (common in connectors list).
        if (child?.type === 'image') {
          const next = node.children[i + 1];
          if (next?.type === 'text' && typeof next.value === 'string') {
            const raw = next.value;
            const {classes} = extractMarkers(raw);
            if (classes.includes('mr-1')) {
              addClass(child, 'mr-1');
              next.value = stripMarkers(raw);
              if (!next.value.trim()) {
                node.children.splice(i + 1, 1);
              }
            }
          }
        }

        if (isMarkerParagraph(child)) {
          const raw = child.children
            .filter((c) => c.type === 'text')
            .map((c) => c.value)
            .join('');
          const {classes, ids} = extractMarkers(raw);

          const prev = findPrevSibling(node.children, i);
          if (prev) {
            for (const cls of classes) addClass(prev, cls);
            for (const id of ids) setId(prev, id);
          }

          node.children.splice(i, 1);
          i--;
          continue;
        }

        walk(child);
      }
    };
    walk(tree);

    // 2) Handle markers embedded inside text nodes (including inside blockquotes/headings).
    visitParents(tree, 'text', (node, ancestors) => {
      if (!node.value || !node.value.includes('{')) return;
      if (!CLASS_MARKER_RE.test(node.value) && !ID_MARKER_RE.test(node.value)) {
        CLASS_MARKER_RE.lastIndex = 0;
        ID_MARKER_RE.lastIndex = 0;
        return;
      }
      CLASS_MARKER_RE.lastIndex = 0;
      ID_MARKER_RE.lastIndex = 0;

      const {classes, ids} = extractMarkers(node.value);

      // Apply to the closest relevant ancestor.
      for (let i = ancestors.length - 1; i >= 0; i--) {
        const a = ancestors[i];
        if (!a) continue;
        if (a.type === 'blockquote' || a.type === 'list' || a.type === 'paragraph' || a.type === 'heading') {
          for (const cls of classes) addClass(a, cls);
          for (const id of ids) setId(a, id);
          break;
        }
      }

      node.value = stripMarkers(node.value).replace(/\s+$/, '');

      CLASS_MARKER_RE.lastIndex = 0;
      ID_MARKER_RE.lastIndex = 0;
    });
  };
};

