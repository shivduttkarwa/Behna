import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, getChars } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import { COLLECTIONS } from '@/data/collections';
import styles from './CollectionsHero.module.css';

/** Collections landing hero with a sequenced intro timeline and anchor nav. */
export default function CollectionsHero() {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useReveal(ref, () => {
    const scope = ref.current!;
    const breadcrumb = scope.querySelector<HTMLElement>(`.${styles.collBreadcrumb}`);
    const sub = scope.querySelector<HTMLElement>(`.${styles.collHeroSub}`);
    const navLinks = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll(`.${styles.collHeroNav} a`));

    const tl = gsap.timeline({ delay: 0.3 });
    if (breadcrumb) tl.to(breadcrumb, { opacity: 1, duration: 0.4, ease: 'power2.out' });

    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 1 });
      const chars = getChars(titleRef.current);
      gsap.set(chars, { opacity: 0 });
      tl.to(chars, { opacity: 1, duration: 0.001, ease: 'none', stagger: 0.04 }, '+=0.1');
    }

    if (sub) tl.to(sub, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    if (navLinks.length) tl.to(navLinks, { opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.1 }, '-=0.2');
  });

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.collHero} ref={ref}>
      <img src="/assets/collections/col-hero.jpg" alt="All Collections" className={styles.collHeroBg} />
      <div className={styles.collHeroOverlay} />
      <div className={styles.collHeroContent}>
        <div className={styles.collBreadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Collections</span>
        </div>
        <h1 ref={titleRef} className={styles.collHeroTitle}>
          All Collections
        </h1>
        <p className={styles.collHeroSub}>Handcrafted styles from Jaipur's finest clothing studio</p>
        <div className={styles.collHeroNav}>
          {COLLECTIONS.map((c) => (
            <a key={c.id} href={`#${c.id}`} onClick={(e) => onNavClick(e, c.id)}>
              {c.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
