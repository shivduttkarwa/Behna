import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import type { NavigationOptions } from 'swiper/types';
import { gsap, ScrollTrigger, typewriteEl } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import { TESTIMONIALS } from '@/data/testimonials';
import styles from './Testimonials.module.css';

/** Customer testimonial carousel with external nav arrows and pagination. */
export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  useReveal(ref, () => {
    const scope = ref.current!;

    if (titleRef.current) {
      typewriteEl(titleRef.current, {
        trigger: titleRef.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      });
    }

    const subtitle = scope.querySelector<HTMLElement>(`.${styles.testimonialsSubtitle}`);
    if (subtitle) {
      gsap.from(subtitle, {
        scrollTrigger: { trigger: subtitle, start: 'top 90%', toggleActions: 'play none none none' },
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    const cards = gsap.utils.toArray<HTMLElement>(
      scope.querySelectorAll(`.swiper-slide:not(.swiper-slide-duplicate) .${styles.testimonialCard}`),
    );
    if (cards.length) {
      gsap.set(cards, { opacity: 0 });
      gsap.to(cards, {
        scrollTrigger: { trigger: `.${styles.testimonialsSwiper}`, start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.15,
      });
    }

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
    <section className={styles.testimonialsSection} ref={ref}>
      <div className={styles.testimonialsContainer}>
        <div className={styles.testimonialsHeader}>
          <h2 className={styles.testimonialsTitle}>
            <span ref={titleRef} className={`section-title ${styles.testimonialsMain}`}>
              Loved by Many
            </span>
            <span className={styles.testimonialsSubtitle}>Authentic Reviews from Real Customers</span>
          </h2>
        </div>

        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialsControlsWrap}>
            <div className={styles.tBtn} ref={prevRef}>
              <i className="ri-arrow-left-s-line" />
            </div>
            <Swiper
              className={styles.testimonialsSwiper}
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              loop
              speed={600}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
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
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              onSwiper={(s) => {
                swiperRef.current = s;
                s.autoplay?.stop();
              }}
            >
              {TESTIMONIALS.map((t) => (
                <SwiperSlide key={t.name}>
                  <div className={styles.testimonialCard}>
                    <div className={styles.testimonialContent}>
                      <div className={styles.testimonialStars}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i key={i} className="ri-star-fill" />
                        ))}
                      </div>
                      <p className={styles.testimonialText}>{t.text}</p>
                      <div className={styles.testimonialAuthor}>
                        <h4 className={styles.authorName}>{t.name}</h4>
                        <span className={styles.authorLocation}>{t.location}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.tBtn} ref={nextRef}>
              <i className="ri-arrow-right-s-line" />
            </div>
          </div>
          <div className={styles.tPagination} ref={paginationRef} />
        </div>
      </div>
    </section>
  );
}
