import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

export default function CustomWrangleModeNavbarItem() {
  const location = useLocation();
  const isXLMode =
    location.pathname === '/xl' ||
    location.pathname.startsWith('/xl/') ||
    location.pathname === '/account' ||
    location.pathname.startsWith('/account/') ||
    location.pathname === '/groups' ||
    location.pathname.startsWith('/groups/');
  const isPythonMode =
    location.pathname === '/py' ||
    location.pathname.startsWith('/py/') ||
    location.pathname === '/python' ||
    location.pathname.startsWith('/python/') ||
    location.pathname === '/playground' ||
    location.pathname.startsWith('/playground/');

  return (
    <div className="navbar__item ww-mode-switch" role="group" aria-label="Wrangle product documentation">
      <Link
        className={`ww-mode-switch__option${isXLMode ? ' ww-mode-switch__option--active' : ''}`}
        to="/xl"
        aria-pressed={isXLMode}>
        WranglesXL
      </Link>
      <Link
        className={`ww-mode-switch__option${isPythonMode ? ' ww-mode-switch__option--active' : ''}`}
        to="/py"
        aria-pressed={isPythonMode}>
        WranglesPY
      </Link>
    </div>
  );
}
