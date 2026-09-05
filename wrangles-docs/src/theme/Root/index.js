import React, {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';

export default function Root({children}) {
  const location = useLocation();

  useEffect(() => {
    const isWrangleMode =
      location.pathname === '/wrangle' ||
      location.pathname.startsWith('/wrangle/');
    document.body.classList.toggle('ww-wranglespy-mode', isWrangleMode);
    return () => document.body.classList.remove('ww-wranglespy-mode');
  }, [location.pathname]);

  return <>{children}</>;
}
