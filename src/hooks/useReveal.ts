import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Runs GSAP animation `setup` inside a context scoped to `scope`, so every
 * tween / ScrollTrigger it creates is automatically cleaned up on unmount.
 * Selectors passed to gsap inside `setup` are scoped to the element.
 */
export function useReveal(
  scope: RefObject<HTMLElement | null>,
  setup: (self: gsap.Context) => void,
  deps: unknown[] = [],
): void {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const ctx = gsap.context(setup, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
