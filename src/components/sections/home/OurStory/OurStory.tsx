import { useRef } from 'react';
import { gsap, typewriteEl } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import styles from './OurStory.module.css';

/** Founders' story — clip-revealed portrait beside a fading text column. */
export default function OurStory() {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useReveal(ref, () => {
    const scope = ref.current!;

    const img = `.${styles.storyImageSide}`;
    gsap.set(img, { clipPath: 'inset(0 100% 0 0)' });
    gsap.to(img, {
      scrollTrigger: { trigger: scope, start: 'top 75%', toggleActions: 'play none none none' },
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.2,
      ease: 'power3.inOut',
    });

    const textEls = `.${styles.storyLead}, .${styles.storyBody}, .${styles.storyFounders}`;
    gsap.set(textEls, { opacity: 0 });
    gsap.to(textEls, {
      scrollTrigger: { trigger: `.${styles.storyTextSide}`, start: 'top 75%', toggleActions: 'play none none none' },
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.15,
    });

    if (titleRef.current) {
      typewriteEl(titleRef.current, {
        trigger: titleRef.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      });
    }
  });

  return (
    <section className={styles.storySection} id="our-story" ref={ref}>
      <div className={styles.storyImageSide}>
        <img
          src="/assets/img/founders.jpg"
          alt="Anita and Indu — Founders of Behna"
          className={styles.storyImg}
        />
      </div>
      <div className={styles.storyTextSide}>
        <div className="offers-badge">
          <span className="badge-text">Our Story</span>
        </div>
        <h2 ref={titleRef} className={`section-title ${styles.storyTitle}`}>
          Two Sisters,
          <br />
          One Dream
        </h2>
        <p className={styles.storyLead}>
          Meet Anita and Indu — the heart and soul behind Behna Clothing Studio.
        </p>
        <p className={styles.storyBody}>
          Born in Didwana and now calling Jaipur home, Anita and Indu have always shared a deep love
          for beautiful clothing and the women who wear it. Like many women, they spent years putting
          their families first — devoted wives, devoted mothers.
        </p>
        <p className={styles.storyBody}>
          When their children grew up and needed them a little less, they decided it was finally their
          turn. Indu, a certified yoga instructor, and Anita, with her sharp eye for style, joined
          hands to build something entirely their own.
        </p>
        <p className={styles.storyBody}>
          Behna <em lang="hi">( बहना )</em> — meaning <em>sister</em> in Hindi — was born from that
          bond. A boutique built on trust, taste, and the belief that every woman deserves to feel
          beautiful in what she wears.
        </p>
        <div className={styles.storyFounders}>
          <span className={styles.storyFounderName}>Anita &amp; Indu</span>
          <span className={styles.storyFounderTitle}>Co-founders, Behna Clothing Studio</span>
        </div>
      </div>
    </section>
  );
}
