import React, {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';

export default function Root({children}) {
  const location = useLocation();

  useEffect(() => {
    const isPythonMode =
      location.pathname === '/py' ||
      location.pathname.startsWith('/py/') ||
      location.pathname === '/python' ||
      location.pathname.startsWith('/python/') ||
      location.pathname === '/playground' ||
      location.pathname.startsWith('/playground/');
    document.body.classList.toggle('ww-wranglespy-mode', isPythonMode);
    return () => document.body.classList.remove('ww-wranglespy-mode');
  }, [location.pathname]);

  return <>{children}</>;
}
