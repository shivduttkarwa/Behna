import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import styles from './WhyShopWithUs.module.css';

interface WhyItem {
  icon: string;
  name: string;
  desc: string;
}

const ITEMS: WhyItem[] = [
  {
    icon: 'ri-scissors-cut-line',
    name: 'We Make It Fit — Just For You',
    desc: "Found something you love but the fit isn't perfect? We alter and adjust your outfits in-store so every piece feels like it was made for your body.",
  },
  {
    icon: 'ri-refresh-line',
    name: 'Fresh Stock, Every Week',
    desc: "We keep things exciting. New styles arrive regularly so there's always something fresh to discover — whether you're dressing up or keeping it casual.",
  },
  {
    icon: 'ri-user-heart-line',
    name: 'Personal Styling, Always',
    desc: 'Not sure what suits you? Walk in and let us help. We genuinely enjoy helping women find outfits that make them feel their best — no pressure, just good advice.',
  },
  {
    icon: 'ri-heart-2-line',
    name: 'A Boutique That Cares',
    desc: "Run by two sisters who built this from the ground up, Behna isn't just a shop — it's a space where every woman is welcomed, valued, and dressed beautifully.",
  },
];

/** "Why Shop With Us" — four value props in a responsive grid. */
export default function WhyShopWithUs() {
  const ref = useRef<HTMLElement>(null);

  useReveal(ref, () => {
    gsap.set(`.${styles.whyItem}`, { opacity: 0 });
    gsap.to(`.${styles.whyItem}`, {
      scrollTrigger: { trigger: `.${styles.whyGrid}`, start: 'top 80%', toggleActions: 'play none none none' },
      opacity: 1,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.15,
    });
  });

  return (
    <section className={styles.whySection} ref={ref}>
      <SectionHeader badge="The Behna Difference" title="Why Shop With Us" className={styles.whyHeader} />
      <div className={styles.whyGrid}>
        {ITEMS.map((item) => (
          <div className={styles.whyItem} key={item.name}>
            <div className={styles.whyIcon}>
              <i className={item.icon} />
            </div>
            <h3 className={styles.whyName}>{item.name}</h3>
            <p className={styles.whyDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
