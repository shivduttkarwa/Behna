import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import { CATEGORIES } from '@/data/products';
import styles from './PopularCategories.module.css';

/** "Top Categories" grid of four rounded category tiles. */
export default function PopularCategories() {
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useReveal(ref, () => {
    gsap.from(`.${styles.categoryItem}`, {
      scrollTrigger: { trigger: ref.current, start: 'top 55%', toggleActions: 'play none none none' },
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.1,
    });
  });

  return (
    <section className={styles.popularSection} ref={ref}>
      <div className={styles.popularContainer}>
        <SectionHeader badge="Explore" title="Top Categories" className="offers-header" />
        <div className={styles.popularGrid}>
          {CATEGORIES.map((cat) => (
            <div className={styles.categoryItem} key={cat.name} onClick={() => navigate(cat.to)}>
              <div className={styles.categoryIcon}>
                <img src={cat.image} alt={cat.alt} className={styles.categoryImage} loading="lazy" />
              </div>
              <span className={styles.categoryName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
