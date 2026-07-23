import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import styles from './AboutCta.module.css';

/** Full-bleed "Dress the Way You Feel" banner with a staggered content reveal. */
export default function AboutCta() {
  const ref = useRef<HTMLDivElement>(null);

  useReveal(ref, () => {
    const els = `.${styles.aboutCtaTitle}, .${styles.aboutCtaSub}, .${styles.aboutCtaBtn}`;
    gsap.set(els, { opacity: 0 });
    gsap.to(els, {
      scrollTrigger: { trigger: `.${styles.aboutCtaContent}`, start: 'top 80%', toggleActions: 'play none none none' },
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.15,
    });
  });

  return (
    <div className={styles.aboutCtaBanner} ref={ref}>
      <img src="/assets/collections/hero2500.jpg" alt="Behna Collection" className={styles.aboutCtaBg} />
      <div className={styles.aboutCtaOverlay} />
      <div className={styles.aboutCtaContent}>
        <h2 className={styles.aboutCtaTitle}>Dress the Way You Feel</h2>
        <p className={styles.aboutCtaSub}>
          Kurtis · Co-ord Sets · Anarkali · Party Wear · Salwar Kameez · Office Formals
        </p>
        <Link to="/collections" className={styles.aboutCtaBtn}>
          Explore All Styles
        </Link>
      </div>
    </div>
  );
}
