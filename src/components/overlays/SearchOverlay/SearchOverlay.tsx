import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { useOverlay } from '@/context/OverlayContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { SEARCH_DATA } from '@/data/searchData';
import styles from './SearchOverlay.module.css';

/**
 * Right-side search drawer with a client-side catalogue filter. Present for
 * parity with the original markup (the header search trigger is disabled there,
 * but wiring it to the overlay context makes it drop-in ready).
 */
export default function SearchOverlay() {
  const { isOpen, close } = useOverlay();
  const open = isOpen('search');
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useLockBodyScroll(open);
  useEscapeKey(open, close);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 400);
    // Clear the query when the overlay closes so it reopens fresh.
    return () => {
      clearTimeout(t);
      setQuery('');
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return SEARCH_DATA.filter(
      (item) => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q),
    );
  }, [query]);

  const onBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div className={`${styles.searchOverlay} ${open ? styles.active : ''}`} onClick={onBackdrop}>
      <div className={styles.searchContent}>
        <div className={styles.searchHeader}>
          <img src="/img/logo-1.png" alt="BEHNA" style={{ height: '60px', width: 'auto' }} />
          <span className={styles.searchCloseText} onClick={close}>
            CLOSE
          </span>
        </div>
        <div className={styles.searchMain}>
          <div className={styles.searchInputContainer}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for suits, sarees, accessories..."
              className={styles.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className={styles.searchResults}>
              {results && results.length === 0 && (
                <div className={styles.searchNoResults}>No results found</div>
              )}
              {results?.map((item) => (
                <div key={item.title} className={styles.searchResultItem}>
                  <div className={styles.searchResultCategory}>{item.category}</div>
                  <div className={styles.searchResultTitle}>{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
