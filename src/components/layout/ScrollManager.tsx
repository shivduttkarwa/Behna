import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles scroll position on navigation: jumps to top on a plain route change,
 * or smooth-scrolls to the `#hash` target when one is present (retrying briefly
 * so it works even before the target section has mounted).
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (tries < 20) {
        tries += 1;
        window.setTimeout(tryScroll, 50);
      }
    };
    tryScroll();
  }, [pathname, hash]);

  return null;
}
