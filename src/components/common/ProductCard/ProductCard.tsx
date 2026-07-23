import { whatsappLink } from '@/config/site';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  image: string;
  alt: string;
  name: string;
  /** Small pill label, e.g. "New Arrival". */
  badge?: string;
  /** When set, renders a WhatsApp "Enquire" link with this pre-filled message. */
  enquireMessage?: string;
}

/**
 * Image tile with a bottom gradient and title — the shared card used by
 * New Arrivals and every Collections slider.
 */
export default function ProductCard({ image, alt, name, badge, enquireMessage }: ProductCardProps) {
  return (
    <div className={styles.naCard}>
      <img src={image} alt={alt} className={styles.naImg} loading="lazy" />
      <div className={styles.naGradient} />
      <div className={styles.naContent}>
        {enquireMessage && (
          <a href={whatsappLink(enquireMessage)} target="_blank" rel="noopener noreferrer" className={styles.enquire}>
            <i className="ri-whatsapp-line" /> Enquire
          </a>
        )}
        {badge && <span className={styles.naBadge}>{badge}</span>}
        <h3 className={styles.naName}>{name}</h3>
      </div>
    </div>
  );
}
