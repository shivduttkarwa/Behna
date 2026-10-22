import { useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import CtaButton from '@/components/common/CtaButton/CtaButton';
import { MAPS_DIRECTIONS_URL, whatsappLink } from '@/config/site';
import { COLLECTIONS } from '@/data/collections';
import ProductReel, { type ReelItem } from './ProductReel';
import styles from './Intro.module.css';

const REEL: ReelItem[] = COLLECTIONS.flatMap((collection) =>
  collection.products.slice(0, 2).map((product) => ({ ...product, collection })),
);

const CHAPTER_START = COLLECTIONS.map((c) => REEL.findIndex((item) => item.collection.id === c.id));

const WHATSAPP_MSG = "Hi Behna! I'd like to know more about your collection.";

/** "Who We Are" — short brand statement beside a product reel with collection chapters. */
export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const [reelIndex, setReelIndex] = useState(0);
  const currentId = REEL[reelIndex].collection.id;

  useReveal(ref, () => {
    const trigger = { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' };

    gsap.from(`.${styles.introText} > *, .${styles.introActions}`, {
      scrollTrigger: trigger,
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
    });

    gsap.from(`.${styles.chapter}`, {
      scrollTrigger: trigger,
      x: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.08,
      delay: 0.2,
    });

    gsap.fromTo(
      `.${styles.reel}`,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        scrollTrigger: trigger,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.1,
        ease: 'power3.inOut',
        clearProps: 'clipPath',
      },
    );
  });

  return (
    <section className={styles.introSection} ref={ref}>
      <div className={styles.introInner}>
        <div className={styles.introText}>
          <div className="offers-badge">
            <span className="badge-text">Who We Are</span>
          </div>
          <h2 className={styles.introTitle}>
            Not just clothing.
            <br />
            An expression of <em>who you are.</em>
          </h2>
          <p className={styles.introCopy}>
            Curated ethnic wear from the heart of Jaipur — handpicked by two sisters for every woman who
            deserves to feel beautiful.
          </p>
        </div>

        <div className={styles.introActions}>
          <div className={styles.ctaRow}>
            <CtaButton to="/collections" variant="dark" className={styles.introCta}>
              Explore Collections
            </CtaButton>
            <a href={whatsappLink(WHATSAPP_MSG)} target="_blank" rel="noopener noreferrer" className={styles.chatLink}>
              <i className="ri-whatsapp-line" /> Chat with us
            </a>
          </div>
          <div className={styles.introInfo}>
            <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
              <i className="ri-map-pin-line" /> Gandhi Path West, Jaipur
            </a>
            <span>
              <i className="ri-time-line" /> Mon–Sat 10:30 AM – 10 PM · Sun 1 – 10 PM
            </span>
          </div>
        </div>

        <ol className={styles.chapters} aria-label="Jump to a collection in the reel">
          {COLLECTIONS.map((c, i) => {
            const isCurrent = c.id === currentId;
            return (
              <li className={styles.chapter} key={c.id}>
                <button
                  type="button"
                  className={`${styles.chapterBtn} ${isCurrent ? styles.isCurrent : ''}`}
                  aria-current={isCurrent || undefined}
                  onClick={() => setReelIndex(CHAPTER_START[i])}
                >
                  <span className={styles.chapterNum}>{c.num}</span>
                  <span className={styles.chapterBody}>
                    <span className={styles.chapterTitle}>{c.title}</span>
                    <span className={styles.chapterSub}>{c.subtitle}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <ProductReel items={REEL} index={reelIndex} onIndexChange={setReelIndex} className={styles.reel} />
      </div>
    </section>
  );
}
