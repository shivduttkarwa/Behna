import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '@/lib/gsap';
import { INSTAGRAM_URL, whatsappLink } from '@/config/site';
import type { Collection, CollectionProduct } from '@/data/collections';
import styles from './ProductReel.module.css';

export interface ReelItem extends CollectionProduct {
  collection: Collection;
}

interface ProductReelProps {
  items: ReelItem[];
  index: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

const DURATION = 4.5;

/** Story-style auto-playing product reel — tap sides to skip, hover or button to pause. */
export default function ProductReel({ items, index, onIndexChange, className }: ProductReelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [frames, setFrames] = useState({ current: index, previous: -1 });
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);

  const count = items.length;
  const item = items[index];
  const paused = userPaused || hovered || !inView;

  if (frames.current !== index) {
    setFrames({ current: index, previous: frames.current });
  }

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    fillRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { scaleX: i < index ? 1 : 0 });
    });
    const tl = gsap.timeline({ paused: true, onComplete: () => onIndexChange((index + 1) % count) });
    tl.to(fillRefs.current[index], { scaleX: 1, duration: DURATION, ease: 'none' }, 0);
    const img = imgRefs.current[index];
    if (img && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tl.fromTo(img, { scale: 1 }, { scale: 1.12, duration: DURATION, ease: 'none' }, 0);
    }
    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, [index, count, onIndexChange]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (paused) tl.pause();
    else tl.play();
  }, [paused, index]);

  const go = (i: number) => onIndexChange((i + count) % count);

  return (
    <div
      ref={rootRef}
      className={`${styles.reel} ${className ?? ''}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label="Product reel"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {items.map((it, i) => {
        const isActive = i === index;
        const isLeaving = i === frames.previous;
        if (!isActive && !isLeaving && i !== (index + 1) % count) return null;
        return (
          <div
            key={i}
            className={`${styles.frame} ${isActive ? styles.isActive : isLeaving ? styles.isLeaving : ''}`}
            aria-hidden={!isActive}
          >
            <img
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              src={it.image}
              alt={it.alt}
              className={styles.frameImg}
            />
          </div>
        );
      })}

      <div className={styles.shade} />

      <button type="button" className={`${styles.tap} ${styles.tapPrev}`} aria-label="Previous product" onClick={() => go(index - 1)} />
      <button type="button" className={`${styles.tap} ${styles.tapNext}`} aria-label="Next product" onClick={() => go(index + 1)} />

      <div className={styles.top}>
        <div className={styles.segments}>
          {items.map((_, i) => (
            <span className={styles.segment} key={i}>
              <span
                ref={(el) => {
                  fillRefs.current[i] = el;
                }}
                className={styles.segmentFill}
              />
            </span>
          ))}
        </div>
        <div className={styles.meta}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.handle}>
            <img src="/assets/img/favicon.svg" alt="" className={styles.avatar} />
            <span>behna_clothing_studio_jaipur</span>
          </a>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? 'Play reel' : 'Pause reel'}
          >
            <i className={userPaused ? 'ri-play-fill' : 'ri-pause-fill'} />
          </button>
        </div>
      </div>

      <div className={styles.caption} key={index}>
        <span className={styles.tag}>
          {item.collection.num} · {item.collection.title}
        </span>
        <h3 className={styles.name}>{item.name}</h3>
        <div className={styles.actions}>
          <a href={whatsappLink(item.enquire)} target="_blank" rel="noopener noreferrer" className={styles.enquire}>
            <i className="ri-whatsapp-line" /> Enquire
          </a>
          <Link to={`/collections#${item.collection.id}`} className={styles.viewAll}>
            View all <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </div>
  );
}
