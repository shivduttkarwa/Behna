import { Link } from 'react-router-dom';
import { SHOP_LINKS } from '@/data/navigation';
import { INSTAGRAM_URL, YOUTUBE_URL } from '@/config/site';
import styles from './Footer.module.css';

/** Site footer — quote, shop links, socials and the oversized brand wordmark. */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTopRow}>
          <div className={`${styles.footerCol} ${styles.footerColQuote}`}>
            <p className={styles.footerQuote}>
              &ldquo;Dress the way
              <br />
              you feel.&rdquo;
            </p>
            <span className={styles.footerQuoteAttr}>— Behna Clothing Studio, Jaipur</span>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>Shop</h4>
            <ul className={styles.footerNav}>
              {SHOP_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>Follow Us</h4>
            <div className={styles.footerSocials}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
                title="Instagram"
              >
                <i className="ri-instagram-line" />
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
                title="YouTube"
              >
                <i className="ri-youtube-line" />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBrandDisplay}>BEHNA</div>

        <div className={styles.footerCopy}>
          <span>© 2026 Behna Clothing Studio. All rights reserved.</span>
          <span>Jaipur, Rajasthan</span>
        </div>
      </div>
    </footer>
  );
}
