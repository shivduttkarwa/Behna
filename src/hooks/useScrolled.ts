import { useEffect, useState } from 'react';

/**
 * Returns true once the page has scrolled past `threshold` px.
 * Mirrors the original header's `.scrolled` toggle (threshold 10px).
 */
export function useScrolled(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
