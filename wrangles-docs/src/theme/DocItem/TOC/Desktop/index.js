/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {ThemeClassNames, useThemeConfig} from '@docusaurus/theme-common';
import {
  useFilteredAndTreeifiedTOC,
  useTOCHighlight,
} from '@docusaurus/theme-common/internal';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TOC from '@theme/TOC';
import styles from './styles.module.css';

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

function headingLabel(value) {
  return value.replace(/<[^>]+>/g, '');
}

function WrangleTOCItem({heading}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = heading.children.length > 0;
  const label = headingLabel(heading.value);

  function toggleChildren() {
    if (hasChildren) {
      setExpanded((current) => !current);
    }
  }

  return (
    <li className={styles.item}>
      <div className={styles.itemRow}>
        <Link
          to={`#${heading.id}`}
          className={clsx(LINK_CLASS_NAME, styles.itemLink)}
          onClick={toggleChildren}
          dangerouslySetInnerHTML={{__html: heading.value}}
        />
        {hasChildren && (
          <button
            className={styles.itemToggle}
            type="button"
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${label}`}
            aria-expanded={expanded}
            onClick={toggleChildren}>
            <span
              className={clsx(
                styles.chevron,
                expanded && styles.chevronExpanded,
              )}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      {hasChildren && expanded && (
        <WrangleTOCTree toc={heading.children} isChild />
      )}
    </li>
  );
}

function WrangleTOCTree({toc, isChild = false}) {
  if (!toc.length) {
    return null;
  }

  return (
    <ul
      className={clsx(
        isChild
          ? styles.childList
          : 'table-of-contents table-of-contents__left-border',
      )}>
      {toc.map((heading) => (
        <WrangleTOCItem key={heading.id} heading={heading} />
      ))}
    </ul>
  );
}

function WrangleTOC({toc, minHeadingLevel, maxHeadingLevel}) {
  const themeConfig = useThemeConfig();
  const minLevel =
    minHeadingLevel ?? themeConfig.tableOfContents.minHeadingLevel;
  const maxLevel =
    maxHeadingLevel ?? themeConfig.tableOfContents.maxHeadingLevel;
  const tocTree = useFilteredAndTreeifiedTOC({
    toc,
    minHeadingLevel: minLevel,
    maxHeadingLevel: maxLevel,
  });
  const highlightConfig = useMemo(
    () => ({
      linkClassName: LINK_CLASS_NAME,
      linkActiveClassName: LINK_ACTIVE_CLASS_NAME,
      minHeadingLevel: minLevel,
      maxHeadingLevel: maxLevel,
    }),
    [maxLevel, minLevel],
  );

  useTOCHighlight(highlightConfig);

  return (
    <div
      className={clsx(
        styles.tableOfContents,
        'thin-scrollbar',
        ThemeClassNames.docs.docTocDesktop,
      )}>
      <WrangleTOCTree toc={tocTree} />
    </div>
  );
}

export default function DocItemTOCDesktop() {
  const {toc, frontMatter} = useDoc();

  if (!frontMatter.wrangle_type) {
    return (
      <TOC
        toc={toc}
        minHeadingLevel={frontMatter.toc_min_heading_level}
        maxHeadingLevel={frontMatter.toc_max_heading_level}
        className={ThemeClassNames.docs.docTocDesktop}
      />
    );
  }

  return (
    <WrangleTOC
      toc={toc}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
    />
  );
}
