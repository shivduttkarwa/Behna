import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register plugins once for the whole app.
gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

/** Split an element into character spans (SplitText, with a manual fallback). */
export function getChars(el: HTMLElement): Element[] {
  try {
    const split = new SplitText(el, { type: 'chars', aria: 'auto' });
    return split.chars;
  } catch {
    const text = el.textContent ?? '';
    el.innerHTML = '';
    el.setAttribute('aria-label', text);
    return [...text].map((char) => {
      const span = document.createElement('span');
      span.style.cssText = 'display:inline-block;white-space:pre;';
      span.textContent = char;
      el.appendChild(span);
      return span;
    });
  }
}

/** Typewriter-style character reveal, optionally driven by a ScrollTrigger. */
export function typewriteEl(el: HTMLElement, scrollTriggerConfig?: ScrollTrigger.Vars) {
  gsap.set(el, { opacity: 1 });
  const chars = getChars(el);
  gsap.from(chars, {
    scrollTrigger: scrollTriggerConfig ?? undefined,
    opacity: 0,
    duration: 0.001,
    ease: 'none',
    stagger: 0.02,
  });
}
