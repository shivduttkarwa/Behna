import { useOverlay } from '@/context/OverlayContext';
import { useScrolled } from '@/hooks/useScrolled';
import styles from './Header.module.css';

/**
 * Fixed top navigation. Transparent over the hero, frosted-white once scrolled.
 * "Contact Us" and "Menu" open their respective slide-in overlays.
 */
export default function Header() {
  const scrolled = useScrolled(10);
  const { open } = useOverlay();

  return (
    <header id="header" className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.navContainer}>
        <div className={styles.navLeft}>
          <span className={styles.contactText} onClick={() => open('contact')}>
            <span className={styles.contactIcon}>+</span>CONTACT US
          </span>
        </div>
        <div className={styles.navRight}>
          <div className={styles.navIcons}>
            <span className={styles.menuText} onClick={() => open('menu')}>
              MENU
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
