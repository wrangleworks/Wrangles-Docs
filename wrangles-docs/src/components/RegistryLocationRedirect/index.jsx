import {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';

// Preserve original namespace bookmarks when catalog placement changes.
export default function RegistryLocationRedirect({routes, fallback, from}) {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.replace(/\/$/, '') !== from) return;
    const destination = routes[location.hash.slice(1)] || fallback;
    if (destination) {
      const [pathname, anchor] = destination.split('#');
      // A full navigation also works during initial hydration of an old bookmark.
      window.location.replace(pathname + location.search + (anchor ? `#${anchor}` : ''));
    }
  }, [location.pathname, location.hash, location.search, routes, fallback, from]);
  return null;
}
