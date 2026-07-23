import { useRef } from 'react';
import { gsap, getChars } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import { useReady } from '@/context/ReadyContext';
import CtaButton from '@/components/common/CtaButton/CtaButton';
import styles from './Hero.module.css';

/**
 * Full-viewport hero. The title reveals character-by-character, then the
 * subtitle and button fade in — sequenced to start after the intro logo zoom,
 * exactly like the original `initTextAnimations` timeline.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { ready } = useReady();

  useReveal(
    ref,
    () => {
      if (!ready) return;
      const scope = ref.current;
      if (!scope) return;

      const title = scope.querySelector<HTMLElement>(`.${styles.heroCollection}`);
      const subtitle = scope.querySelector<HTMLElement>(`.${styles.heroSubtitle}`);
      const buttons = scope.querySelector<HTMLElement>(`.${styles.heroButtons}`);
      if (!title) return;

      // Logo zoom finishes at ~1.0s; the title starts just after.
      const titleDelay = 1.0 + 0.05;
      gsap.set(title, { opacity: 1 });
      const chars = getChars(title);
      const titleDuration = chars.length * 0.025;

      gsap.from(chars, { opacity: 0, duration: 0.001, ease: 'none', stagger: 0.025, delay: titleDelay });
      if (subtitle) {
        gsap.to(subtitle, { opacity: 1, duration: 0.7, ease: 'power2.out', delay: titleDelay + titleDuration });
      }
      if (buttons) {
        gsap.to(buttons, { opacity: 1, duration: 0.6, ease: 'power2.out', delay: titleDelay + titleDuration + 0.35 });
      }
    },
    [ready],
  );

  const scrollToArrivals = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} ref={ref}>
      <img src="/assets/img/cta.jpg" alt="Behna Collection" className={styles.heroVideo} />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <h2 className={styles.heroCollection}>Timeless Elegance</h2>
        <p className={styles.heroSubtitle}>
          Discover the finest collection of traditional women's apparel from Jaipur
        </p>
        <div className={styles.heroButtons}>
          <CtaButton href="#new-arrivals" onClick={scrollToArrivals}>
            EXPLORE
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
