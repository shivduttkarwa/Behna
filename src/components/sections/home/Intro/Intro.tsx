import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import styles from './Intro.module.css';

const LINES = [
  'Not just clothing.',
  'An expression of who you are.',
  'Curated ethnic wear,',
  'from the heart of Jaipur —',
  'for every woman who believes',
  'she deserves to feel beautiful.',
];

/** "Who We Are" statement — staggered lines beside a clip-wiped image. */
export default function Intro() {
  const ref = useRef<HTMLElement>(null);

  useReveal(ref, () => {
    const img = `.${styles.introImg}`;
    gsap.set(img, { clipPath: 'inset(0 0 0 100%)' });
    gsap.to(img, {
      scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
      clipPath: 'inset(0 0 0 0%)',
      duration: 1.2,
      ease: 'power3.inOut',
    });

    gsap.from(`.${styles.introLine}`, {
      scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
      y: 70,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.14,
    });
  });

  return (
    <section className={styles.introSection} ref={ref}>
      <div className={styles.introInner}>
        <div className="offers-badge">
          <span className="badge-text">Who We Are</span>
        </div>
        {LINES.map((line) => (
          <p className={styles.introLine} key={line}>
            {line}
          </p>
        ))}
      </div>
      <div className={styles.introImageSide}>
        <img src="/assets/collections/intro.jpg" alt="Behna Collection" className={styles.introImg} />
      </div>
    </section>
  );
}
