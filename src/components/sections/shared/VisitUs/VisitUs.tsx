import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import { MAPS_DIRECTIONS_URL, MAPS_EMBED_URL, whatsappLink } from '@/config/site';
import styles from './VisitUs.module.css';

const WHATSAPP_MSG = 'Hi Behna Clothing Studio! I would like to visit your store.';

/** "Find Us in Jaipur" — store details beside an embedded map. Used on both pages. */
export default function VisitUs() {
  const ref = useRef<HTMLElement>(null);

  useReveal(ref, () => {
    const els = `.${styles.visitTag}, .${styles.visitTitle}, .${styles.visitAddress}, .${styles.visitActions}`;
    gsap.set(els, { opacity: 0 });
    gsap.to(els, {
      scrollTrigger: { trigger: `.${styles.visitLeft}`, start: 'top 80%', toggleActions: 'play none none none' },
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.15,
    });
  });

  return (
    <section className={styles.visitSection} ref={ref}>
      <div className={styles.visitLeft}>
        <span className={styles.visitTag}>Come See Us</span>
        <h2 className={styles.visitTitle}>
          Find Us
          <br />
          in Jaipur
        </h2>
        <p className={styles.visitAddress}>
          Plot No. 60, Gandhi Path West
          <br />
          Lalarpura, Jaipur 302021
          <br />
          Rajasthan, India
        </p>
        <div className={styles.visitActions}>
          <a
            href={whatsappLink(WHATSAPP_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.visitBtn} ${styles.visitBtnPrimary}`}
          >
            <i className="ri-whatsapp-line" /> WhatsApp Us
          </a>
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.visitBtn} ${styles.visitBtnSecondary}`}
          >
            <i className="ri-map-pin-line" /> Get Directions
          </a>
        </div>
      </div>
      <div className={styles.visitRight}>
        <iframe
          src={MAPS_EMBED_URL}
          className={styles.visitMap}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Behna Clothing Studio Location"
        />
      </div>
    </section>
  );
}
