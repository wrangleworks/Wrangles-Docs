import React, {useMemo} from 'react';
import TOCItems from '@theme-original/TOCItems';

const HELPER_HEADINGS = new Set([
  'tabset',
  'sample',
  'example',
  'parameters',
  'options',
]);

function normalizeValue(value) {
  return String(value || '')
    .replace(/\{[.#][^}]+\}/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function isHelperHeading(item) {
  return HELPER_HEADINGS.has(normalizeValue(item?.value));
}

function treeifyToc(toc) {
  const root = {level: 0, children: []};
  const stack = [root];

  for (const item of toc || []) {
    const node = {...item, children: []};
    while (stack.length > 1 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }
    stack[stack.length - 1].children.push(node);
    stack.push(node);
  }

  return root.children;
}

function flattenCleanToc(nodes, level = 2) {
  const cleaned = [];

  for (const node of nodes) {
    const children = flattenCleanToc(node.children || [], Math.min(level + 1, 3));

    if (isHelperHeading(node)) {
      cleaned.push(...flattenCleanToc(node.children || [], level));
      continue;
    }

    cleaned.push({
      ...node,
      level,
      children: undefined,
    });
    cleaned.push(...children);
  }

  return cleaned;
}

function cleanToc(toc) {
  return flattenCleanToc(treeifyToc(toc));
}

export default function TOCItemsWrapper(props) {
  const toc = useMemo(() => cleanToc(props.toc), [props.toc]);
  return <TOCItems {...props} toc={toc} />;
}
