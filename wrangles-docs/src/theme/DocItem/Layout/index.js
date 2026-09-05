/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useState} from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import styles from './styles.module.css';
/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return {
    hidden,
    mobile,
    desktop,
    collapsible: Boolean(frontMatter.wrangle_type),
  };
}
function TocToggle({collapsed, onClick}) {
  const label = collapsed ? 'Expand page contents' : 'Collapse page contents';

  return (
    <button
      className={clsx(styles.tocToggle, collapsed && styles.tocToggleCollapsed)}
      type="button"
      aria-label={label}
      aria-expanded={!collapsed}
      title={label}
      onClick={onClick}>
      <span
        className={clsx(styles.chevron, collapsed && styles.chevronExpand)}
        aria-hidden="true"
      />
    </button>
  );
}

export default function DocItemLayout({children}) {
  const docTOC = useDocTOC();
  const {metadata} = useDoc();
  const [tocCollapsed, setTocCollapsed] = useState(false);
  const collapsible = docTOC.collapsible && Boolean(docTOC.desktop);
  const isTocCollapsed = collapsible && tocCollapsed;
  const desktopToc = isTocCollapsed ? undefined : docTOC.desktop;

  return (
    <div className={clsx('row', docTOC.collapsible && 'ww-wrangle-doc-scope')}>
      <div
        className={clsx(
          'col',
          !docTOC.hidden && !isTocCollapsed && styles.docItemCol,
          isTocCollapsed && styles.docItemColExpanded,
        )}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {desktopToc && (
        <div className={clsx('col', 'col--3', styles.tocColumn)}>
          {collapsible && (
            <TocToggle collapsed={false} onClick={() => setTocCollapsed(true)} />
          )}
          {desktopToc}
        </div>
      )}
      {isTocCollapsed && (
        <TocToggle collapsed onClick={() => setTocCollapsed(false)} />
      )}
    </div>
  );
}
