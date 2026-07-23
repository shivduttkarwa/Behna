import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useReady } from '@/context/ReadyContext';
import styles from './LogoTransform.module.css';

const SCROLL_THRESHOLD = 10;

/**
 * The floating BEHNA wordmark that sits centred over the hero and shrinks /
 * inverts to a compact dark logo as the page scrolls — a 1:1 port of the
 * original scroll-driven transform, plus the GSAP zoom-in on first paint.
 */
export default function LogoTransform() {
  const masterRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { ready } = useReady();

  // Scroll-driven size / position / colour transform.
  useEffect(() => {
    const master = masterRef.current;
    const img = imgRef.current;
    if (!master || !img) return;

    const onScroll = () => {
      const header = document.getElementById('header');
      if (!header) return;
      const scrollPosition = window.scrollY;
      const scrollRatio = Math.min(scrollPosition / SCROLL_THRESHOLD, 1);

      if (scrollPosition > SCROLL_THRESHOLD) {
        const baseHeight = window.innerWidth > 768 ? 240 : 200;
        const newHeight = baseHeight - (baseHeight - 120) * scrollRatio;
        const filterValue = 1 - scrollRatio;

        const startTopPx = window.innerHeight * 0.05;
        const endTopPx = (header.offsetHeight - newHeight) / 2;
        const topPx = startTopPx + (endTopPx - startTopPx) * scrollRatio;

        master.style.top = `${topPx}px`;
        img.style.height = `${newHeight}px`;
        img.style.filter = `brightness(${filterValue}) invert(${filterValue})`;
      } else {
        master.style.top = '5vh';
        img.style.height = window.innerWidth > 768 ? '240px' : '200px';
        img.style.filter = 'brightness(0) invert(1)';
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intro zoom-in — runs once the preloader finishes (or immediately on return).
  useEffect(() => {
    if (!ready || !masterRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        masterRef.current,
        { scale: 0.45, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.7)', delay: 0.15 },
      );
    });
    return () => ctx.revert();
  }, [ready]);

  return (
    <div className={styles.logoMaster} ref={masterRef}>
      <div className={`${styles.mainLogo}`}>
        <Link to="/" style={{ display: 'block', pointerEvents: 'auto' }}>
          <img src="/img/logo-1.png" alt="BEHNA" ref={imgRef} />
        </Link>
      </div>
    </div>
  );
}
