import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import { whatsappLink } from '@/config/site';
import styles from './CollectionsCta.module.css';

const WHATSAPP_MSG = 'Hi Behna! I would love to explore your collection.';

/** Full-bleed "Wear the Art of Rajasthan" closing banner. */
export default function CollectionsCta() {
  const ref = useRef<HTMLElement>(null);

  useReveal(ref, () => {
    const els = `.${styles.collCtaTag}, .${styles.collCtaTitle}, .${styles.collCtaSub}, .${styles.collCtaBtn}`;
    gsap.set(els, { opacity: 0 });
    gsap.to(els, {
      scrollTrigger: { trigger: `.${styles.collCtaContent}`, start: 'top 80%', toggleActions: 'play none none none' },
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.15,
    });
  });

  return (
    <section className={styles.collCta} ref={ref}>
      <img src="/assets/collections/cta-3.jpg" alt="Behna Clothing Studio" className={styles.collCtaBg} />
      <div className={styles.collCtaOverlay} />
      <div className={styles.collCtaContent}>
        <p className={styles.collCtaTag}>Handcrafted in Jaipur</p>
        <h2 className={styles.collCtaTitle}>Wear the Art of Rajasthan</h2>
        <p className={styles.collCtaSub}>
          Visit our studio or reach out on WhatsApp — we'd love to dress you.
        </p>
        <a href={whatsappLink(WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className={styles.collCtaBtn}>
          ENQUIRE NOW
        </a>
      </div>
    </section>
  );
}
