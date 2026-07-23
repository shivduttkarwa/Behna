import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './CtaButton.module.css';

interface CtaButtonProps {
  children: ReactNode;
  /** Internal route (react-router). Provide either `to` or `href`. */
  to?: string;
  /** External / absolute URL. */
  href?: string;
  variant?: 'light' | 'dark';
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

/** Rectangular uppercase call-to-action button; renders a Link or an anchor. */
export default function CtaButton({
  children,
  to,
  href,
  variant = 'light',
  className,
  onClick,
  target,
  rel,
}: CtaButtonProps) {
  const cls = `${styles.heroButton} ${variant === 'dark' ? styles.dark : ''} ${className ?? ''}`.trim();

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} onClick={onClick} target={target} rel={rel}>
      {children}
    </a>
  );
}
