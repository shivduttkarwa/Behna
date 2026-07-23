import { useReady } from '@/context/ReadyContext';
import { useScrolled } from '@/hooks/useScrolled';
import { PHONE_PRIMARY, whatsappLink } from '@/config/site';
import styles from './FabStack.module.css';

const WHATSAPP_MSG =
  'Hi Behna Clothing Studio! I saw your collection and would love to know more.';

/** Floating WhatsApp / Call / Back-to-top buttons, bottom-right. */
export default function FabStack() {
  const { ready } = useReady();
  const showBackToTop = useScrolled(300);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={`${styles.fabStack} ${ready ? styles.visible : ''}`}>
      <a
        href={whatsappLink(WHATSAPP_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.fab} ${styles.fabWhatsapp}`}
        title="Chat on WhatsApp"
      >
        <i className="ri-whatsapp-line" />
      </a>
      <a href={`tel:${PHONE_PRIMARY}`} className={`${styles.fab} ${styles.fabCall}`} title="Call Us">
        <i className="ri-phone-line" />
      </a>
      <button
        className={`${styles.backToTop} ${showBackToTop ? styles.visible : ''}`}
        onClick={scrollToTop}
        title="Back to top"
      >
        <i className="ri-arrow-up-line" />
      </button>
    </div>
  );
}
