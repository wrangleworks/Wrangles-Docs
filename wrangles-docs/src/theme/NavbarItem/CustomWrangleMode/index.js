import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

export default function CustomWrangleModeNavbarItem() {
  const location = useLocation();
  const isPythonMode =
    location.pathname === '/wrangles' ||
    location.pathname.startsWith('/wrangles/') ||
    location.pathname === '/python/connectors' ||
    location.pathname.startsWith('/python/connectors/') ||
    location.pathname === '/playground' ||
    location.pathname.startsWith('/playground/');

  return (
    <div className="navbar__item ww-mode-switch" role="group" aria-label="Wrangle product documentation">
      <Link
        className={`ww-mode-switch__option${!isPythonMode ? ' ww-mode-switch__option--active' : ''}`}
        to="/excel"
        aria-pressed={!isPythonMode}>
        WranglesXL
      </Link>
      <Link
        className={`ww-mode-switch__option${isPythonMode ? ' ww-mode-switch__option--active' : ''}`}
        to="/wrangles"
        aria-pressed={isPythonMode}>
        WranglesPY
      </Link>
    </div>
  );
}
