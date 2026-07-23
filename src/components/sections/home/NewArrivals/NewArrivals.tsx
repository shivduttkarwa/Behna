import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import ProductCard from '@/components/common/ProductCard/ProductCard';
import CtaButton from '@/components/common/CtaButton/CtaButton';
import { NEW_ARRIVALS } from '@/data/products';
import styles from './NewArrivals.module.css';

/** "Just In" carousel of new-arrival categories with a bottom-to-top clip reveal. */
export default function NewArrivals() {
  const ref = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  useReveal(ref, () => {
    const scope = ref.current;
    if (!scope) return;

    const cards = gsap.utils
      .toArray<HTMLElement>(scope.querySelectorAll('.swiper-slide'))
      .map((s) => s.firstElementChild)
      .filter(Boolean) as HTMLElement[];

    if (cards.length) {
      gsap.set(cards, { clipPath: 'inset(100% 0 0 0)' });
      gsap.to(cards, {
        scrollTrigger: { trigger: scope, start: 'top 80%', toggleActions: 'play none none none' },
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.12,
        onComplete: () => swiperRef.current?.autoplay?.start(),
      });
    }

    // Autoplay only while the section is in view.
    ScrollTrigger.create({
      trigger: scope,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => swiperRef.current?.autoplay?.start(),
      onLeave: () => swiperRef.current?.autoplay?.stop(),
      onEnterBack: () => swiperRef.current?.autoplay?.start(),
      onLeaveBack: () => swiperRef.current?.autoplay?.stop(),
    });
  });

  return (
    <section className={styles.naSection} id="new-arrivals" ref={ref}>
      <SectionHeader badge="Just In" title="New Arrivals" className={styles.naSectionHeader} />

      <Swiper
        className={styles.naSwiper}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        loop={false}
        speed={800}
        grabCursor
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1440: { slidesPerView: 4, spaceBetween: 24 },
        }}
        onSwiper={(s) => {
          swiperRef.current = s;
          s.autoplay?.stop();
        }}
      >
        {NEW_ARRIVALS.map((item) => (
          <SwiperSlide key={item.name}>
            <ProductCard image={item.image} alt={item.alt} name={item.name} badge={item.badge} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.viewAll}>
        <CtaButton to="/collections" variant="dark">
          VIEW ALL COLLECTIONS
        </CtaButton>
      </div>
    </section>
  );
}
