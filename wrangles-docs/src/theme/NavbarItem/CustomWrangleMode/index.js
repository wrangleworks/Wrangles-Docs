import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';

export default function CustomWrangleModeNavbarItem() {
  const location = useLocation();
  const isWrangleMode =
    location.pathname === '/wrangle' ||
    location.pathname.startsWith('/wrangle/');

  return (
    <div className="navbar__item ww-mode-switch" role="group" aria-label="Wrangle product documentation">
      <Link
        className={`ww-mode-switch__option${!isWrangleMode ? ' ww-mode-switch__option--active' : ''}`}
        to="/"
        aria-pressed={!isWrangleMode}>
        WranglesXL
      </Link>
      <Link
        className={`ww-mode-switch__option${isWrangleMode ? ' ww-mode-switch__option--active' : ''}`}
        to="/wrangle"
        aria-pressed={isWrangleMode}>
        WranglesPy
      </Link>
    </div>
  );
}
