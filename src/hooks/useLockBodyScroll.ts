import { useEffect } from 'react';

/**
 * Locks page scroll while `locked` is true by toggling the global
 * `.no-scroll-y` body class. Safely stacks — the class is only removed
 * when no lock is active.
 */
let lockCount = 0;

export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    lockCount += 1;
    document.body.classList.add('no-scroll-y');
    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) document.body.classList.remove('no-scroll-y');
    };
  }, [locked]);
}
