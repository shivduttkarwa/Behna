import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { gsap } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import CtaButton from '@/components/common/CtaButton/CtaButton';
import { CURATED } from '@/data/products';
import styles from './Curated.module.css';

const POSITIONS = [styles.item1, styles.item2, styles.item3, styles.item4, styles.item5, styles.item6];

/**
 * "Curated Collection" — an editorial masonry grid on desktop that collapses to
 * a swipeable carousel on mobile (Swiper is disabled at ≥769px via breakpoint).
 */
export default function Curated() {
  const ref = useRef<HTMLElement>(null);

  useReveal(ref, () => {
    gsap.from(`.${styles.curatedItem}`, {
      scrollTrigger: { trigger: ref.current, start: 'top 65%', toggleActions: 'play none none none' },
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
    });
  });

  return (
    <section className={styles.curatedSection} id="curated-collection" ref={ref}>
      <SectionHeader badge="Handpicked" title="Curated Collection" className={styles.curatedHeader} />

      <Swiper
        className={styles.curatedSwiper}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        loop
        pagination={{ el: `.${styles.curatedPagination}`, clickable: true }}
        navigation
        breakpoints={{ 769: { enabled: false } }}
      >
        {CURATED.map((item, i) => (
          <SwiperSlide key={item.label} className={`${styles.curatedItem} ${POSITIONS[i]}`}>
            <img src={item.image} alt={item.alt} className={styles.curatedImg} loading="lazy" />
            <div className={styles.curatedOverlay}>
              <span>{item.label}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.curatedPagination} />
      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <CtaButton to="/collections" variant="dark">
          VIEW ALL COLLECTIONS
        </CtaButton>
      </div>
    </section>
  );
}
