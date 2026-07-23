import { type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useOverlay } from '@/context/OverlayContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { SHOP_LINKS, EXPLORE_LINKS } from '@/data/navigation';
import styles from './MenuOverlay.module.css';

/** Right-side sliding navigation drawer. */
export default function MenuOverlay() {
  const { isOpen, close } = useOverlay();
  const open = isOpen('menu');

  useLockBodyScroll(open);
  useEscapeKey(open, close);

  const onBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div className={`${styles.menuOverlay} ${open ? styles.active : ''}`} onClick={onBackdrop}>
      <div className={styles.menuContent}>
        <div className={styles.menuHeader}>
          <Link to="/" onClick={close}>
            <img src="/img/logo-1.png" alt="BEHNA" style={{ height: '90px', width: 'auto', display: 'block' }} />
          </Link>
          <span className={styles.menuCloseText} onClick={close}>
            CLOSE
          </span>
        </div>

        <div className={styles.menuItems}>
          <div className={styles.menuCategory}>
            <h3 className={styles.menuCategoryTitle}>Shop</h3>
            <ul className={styles.menuLinks}>
              <li>
                <Link to="/collections" onClick={close}>
                  All Collections
                </Link>
              </li>
              {SHOP_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} onClick={close}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.menuCategory}>
            <h3 className={styles.menuCategoryTitle}>Explore</h3>
            <ul className={styles.menuLinks}>
              {EXPLORE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} onClick={close}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
