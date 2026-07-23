import { useEffect, useRef, useState } from 'react';
import { useReady } from '@/context/ReadyContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import styles from './Preloader.module.css';

const VISIT_KEY = 'behna_visited';
const LOADING_LETTERS = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];

/** True on a genuine reload (F5 / hard refresh) rather than a fresh navigation. */
function isReload(): boolean {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === 'reload';
}

/**
 * Full-screen intro preloader. Shows on first visit (and on reload); on a
 * return visit within the same session it is skipped and content shows at once
 * — mirroring the original jQuery preloader logic.
 */
export default function Preloader() {
  const { markReady } = useReady();
  // Decide once, synchronously, whether the preloader should show at all.
  const [visible, setVisible] = useState<boolean>(() => {
    const isReturn = !!sessionStorage.getItem(VISIT_KEY) && !isReload();
    return !isReturn;
  });
  const [loaded, setLoaded] = useState(false);
  const timers = useRef<number[]>([]);

  useLockBodyScroll(visible && !loaded);

  useEffect(() => {
    if (!visible) {
      markReady();
      return;
    }

    const push = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    // Hold for 3s, then run the curtain, reveal content and start animations.
    push(() => {
      sessionStorage.setItem(VISIT_KEY, '1');
      setLoaded(true);
      push(() => markReady(), 400);
      // Remove from the DOM once the curtain transition (0.7s + 0.3s) finishes.
      push(() => setVisible(false), 1000);
    }, 3000);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.ctnPreloader} ${loaded ? styles.loaded : ''}`}>
      <div className={styles.animationPreloader}>
        <div className={styles.spinner} />
        <div className={styles.txtLoading}>
          {LOADING_LETTERS.map((letter, i) => (
            <span key={i} data-text-preloader={letter} className={styles.lettersLoading}>
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div className={`${styles.loaderSection} ${styles.sectionLeft}`} />
      <div className={`${styles.loaderSection} ${styles.sectionRight}`} />
    </div>
  );
}
