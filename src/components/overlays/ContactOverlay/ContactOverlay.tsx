import { type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useOverlay } from '@/context/OverlayContext';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import {
  INSTAGRAM_URL,
  YOUTUBE_URL,
  MAPS_DIRECTIONS_URL,
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  PHONE_PRIMARY_DISPLAY,
  PHONE_SECONDARY_DISPLAY,
} from '@/config/site';
import styles from './ContactOverlay.module.css';

/** Left-side sliding contact panel — store details, phones and socials. */
export default function ContactOverlay() {
  const { isOpen, close } = useOverlay();
  const open = isOpen('contact');

  useLockBodyScroll(open);
  useEscapeKey(open, close);

  const onBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div className={`${styles.contactOverlay} ${open ? styles.active : ''}`} onClick={onBackdrop}>
      <div className={styles.contactContent}>
        <div className={styles.contactHeader}>
          <Link to="/" onClick={close}>
            <img src="/img/logo-1.png" alt="BEHNA" style={{ height: '90px', width: 'auto', display: 'block' }} />
          </Link>
          <span className={styles.contactCloseText} onClick={close}>
            CLOSE
          </span>
        </div>

        <div className={styles.contactDetails}>
          <div className={styles.contactSection}>
            <h3 className={styles.contactSectionTitle}>Visit Our Store</h3>
            <div className={styles.contactInfo}>
              <strong>Behna Clothing Studio</strong>
              <br />
              Plot No. 60, Gandhi Path West
              <br />
              Lalarpura, Jaipur 302021
              <br />
              India
            </div>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactDirectionsBtn}
            >
              <i className="ri-map-pin-line" /> Get Directions
            </a>
          </div>

          <div className={styles.contactSection}>
            <h3 className={styles.contactSectionTitle}>Call Us</h3>
            <div className={styles.contactInfo}>
              <strong>Phone:</strong> <a href={`tel:${PHONE_PRIMARY}`}>{PHONE_PRIMARY_DISPLAY}</a>
              <br />
              <strong>Phone:</strong> <a href={`tel:${PHONE_SECONDARY}`}>{PHONE_SECONDARY_DISPLAY}</a>
              <br />
              <strong>WhatsApp:</strong> <a href={`tel:${PHONE_PRIMARY}`}>{PHONE_PRIMARY_DISPLAY}</a>
              <br />
              <strong>Hours:</strong> Mon-Sat: 10:30 AM – 10 PM
              <br />
              <strong>Sunday:</strong> 1 PM – 10 PM
            </div>
          </div>

          <div className={styles.contactSection}>
            <h3 className={styles.contactSectionTitle}>Follow Us</h3>
            <div className={styles.contactSocials}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="Instagram">
                <i className="ri-instagram-line" />
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className={styles.socialLink} title="YouTube">
                <i className="ri-youtube-line" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
