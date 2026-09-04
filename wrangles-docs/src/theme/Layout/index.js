import React from 'react';
import {useLocation} from '@docusaurus/router';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  PageMetadata,
  SkipToContentFallbackId,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useKeyboardNavigation} from '@docusaurus/theme-common/internal';
import ErrorPageContent from '@theme/ErrorPageContent';
import LayoutProvider from '@theme/Layout/Provider';
import OriginalLayout from '@theme-original/Layout';
import SkipToContent from '@theme/SkipToContent';

import NavigationShell from '../../../utility-pilot/shell/NavigationShell';
import shellStyles from '../../../utility-pilot/shell/styles.module.css';

const UTILITY_PILOT_PATH = '/python/recipes/wrangles/utilities';

function UtilityPilotLayout({children, title, description}) {
  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />
      <SkipToContent />
      <NavigationShell />
      <div
        id={SkipToContentFallbackId}
        className={`${ThemeClassNames.layout.main.container} ${ThemeClassNames.wrapper.main} ${shellStyles.layoutContent}`}>
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>
    </LayoutProvider>
  );
}

export default function Layout(props) {
  const location = useLocation();
  useKeyboardNavigation();

  if (location.pathname === UTILITY_PILOT_PATH) {
    return <UtilityPilotLayout {...props} />;
  }

  return <OriginalLayout {...props} />;
}
