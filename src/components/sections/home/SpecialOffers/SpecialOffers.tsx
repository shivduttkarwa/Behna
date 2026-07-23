import { Fragment, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import { useCountdown } from '@/hooks/useCountdown';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import { OFFERS } from '@/data/products';
import styles from './SpecialOffers.module.css';

/** Discount offer carousel over a full-bleed black countdown timer. */
export default function SpecialOffers() {
  const ref = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const time = useCountdown(24);

  useReveal(ref, () => {
    const scope = ref.current;
    if (!scope) return;

    const cards = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll(`.${styles.offerCard}`));
    if (cards.length) {
      gsap.set(cards, { clipPath: 'inset(100% 0 0 0)' });
      gsap.to(cards, {
        scrollTrigger: { trigger: `.${styles.offersSwiper}`, start: 'top 80%', toggleActions: 'play none none none' },
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.12,
      });
    }

    const units = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll(`.${styles.timerUnit}`));
    if (units.length) {
      gsap.set(units, { opacity: 0 });
      gsap.to(units, {
        scrollTrigger: { trigger: `.${styles.offersTimer}`, start: 'top 90%', toggleActions: 'play none none none' },
        opacity: 1,
        duration: 0.6,
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

  const units: Array<[string, string]> = [
    [time.days, 'Days'],
    [time.hours, 'Hours'],
    [time.minutes, 'Minutes'],
    [time.seconds, 'Seconds'],
  ];

  return (
    <section className={styles.specialOffers} ref={ref}>
      <div className={styles.offersContainer}>
        <SectionHeader badge="LIMITED TIME" title="Special Offers" className={styles.offersHeader} />

        <div className={styles.offersGrid}>
          <Swiper
            className={styles.offersSwiper}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            loop={false}
            speed={600}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            onSwiper={(s) => {
              swiperRef.current = s;
              s.autoplay?.stop();
            }}
          >
            {OFFERS.map((offer) => (
              <SwiperSlide key={offer.title}>
                <div className={styles.offerCard}>
                  <div className={styles.cardBackground}>
                    <img src={offer.image} alt={offer.alt} className={styles.cardBgImage} loading="lazy" />
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardBadge}>{offer.badge}</div>
                    <h3 className={styles.cardTitle}>{offer.title}</h3>
                    <p className={styles.cardDiscount}>{offer.discount}</p>
                    <p className={styles.cardDescription}>{offer.description}</p>
                  </div>
                  <div className={styles.cardDecoration}>
                    <div className={styles.floatingElement} />
                    <div className={styles.floatingElement} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles.offersTimer}>
          <div className={styles.timerContent}>
            <span className={styles.timerLabel}>Offer ends in:</span>
            <div className={styles.timerDisplay}>
              {units.map(([value, label], i) => (
                <Fragment key={label}>
                  <div className={styles.timerUnit}>
                    <span className={styles.timerNumber}>{value}</span>
                    <span className={styles.timerText}>{label}</span>
                  </div>
                  {i < units.length - 1 && <div className={styles.timerSeparator}>:</div>}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
