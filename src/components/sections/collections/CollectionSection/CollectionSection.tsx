import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { NavigationOptions } from 'swiper/types';
import { gsap, typewriteEl } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import ProductCard from '@/components/common/ProductCard/ProductCard';
import type { Collection } from '@/data/collections';
import styles from './CollectionSection.module.css';

interface CollectionSectionProps {
  collection: Collection;
  /** Position in the list — odd indexes get the cream background. */
  index: number;
}

/** A single collection category: numbered heading + a product-card carousel. */
export default function CollectionSection({ collection, index }: CollectionSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useReveal(ref, () => {
    const scope = ref.current!;

    // Cards clip-reveal bottom to top.
    const cards = gsap.utils
      .toArray<HTMLElement>(scope.querySelectorAll('.swiper-slide'))
      .map((s) => s.firstElementChild)
      .filter(Boolean) as HTMLElement[];
    if (cards.length) {
      gsap.set(cards, { clipPath: 'inset(100% 0 0 0)' });
      gsap.to(cards, {
        scrollTrigger: { trigger: `.${styles.collSwiper}`, start: 'top 80%', toggleActions: 'play none none none' },
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.12,
      });
    }

    if (titleRef.current) {
      typewriteEl(titleRef.current, { trigger: titleRef.current, start: 'top 88%', toggleActions: 'play none none none' });
    }
    if (subRef.current) {
      gsap.set(subRef.current, { opacity: 0 });
      gsap.to(subRef.current, {
        scrollTrigger: { trigger: subRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  });

  return (
    <section
      className={`${styles.collSection} ${index % 2 === 1 ? styles.cream : ''}`}
      id={collection.id}
      ref={ref}
    >
      <div className={styles.collSectionHead}>
        <span className={styles.collNum}>{collection.num}</span>
        <div className={styles.collTitleGroup}>
          <h2 ref={titleRef}>{collection.title}</h2>
          <p ref={subRef}>{collection.subtitle}</p>
        </div>
        <div className={styles.collDivider} />
      </div>

      <div className={styles.collSliderWrap}>
        <div className={styles.collBtn} ref={prevRef}>
          <i className="ri-arrow-left-s-line" />
        </div>
        <Swiper
          className={styles.collSwiper}
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={16}
          loop={false}
          speed={700}
          grabCursor
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          navigation={{ prevEl: null, nextEl: null }}
          onBeforeInit={(swiper) => {
            const nav = swiper.params.navigation as NavigationOptions;
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
            if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
              swiper.params.pagination.el = paginationRef.current;
            }
          }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1440: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {collection.products.map((p) => (
            <SwiperSlide key={p.name}>
              <ProductCard image={p.image} alt={p.alt} name={p.name} badge={p.badge} enquireMessage={p.enquire} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.collBtn} ref={nextRef}>
          <i className="ri-arrow-right-s-line" />
        </div>
      </div>
      <div className={styles.collPagination} ref={paginationRef} />
    </section>
  );
}
