import { useRef, type ReactNode } from 'react';
import { typewriteEl } from '@/lib/gsap';
import { useReveal } from '@/hooks/useReveal';

interface SectionHeaderProps {
  /** Eyebrow text in the small badge above the title. */
  badge?: ReactNode;
  title: string;
  /** Extra class(es) for the wrapping .section-header (e.g. a section-specific modifier). */
  className?: string;
  /** Extra class(es) for the .section-title element. */
  titleClassName?: string;
}

/**
 * Centered section heading: an optional eyebrow badge over an uppercase title
 * that reveals character-by-character on scroll (as in the original). Uses the
 * global `.section-header` / `.offers-badge` / `.section-title` primitives.
 */
export default function SectionHeader({ badge, title, className, titleClassName }: SectionHeaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useReveal(titleRef, () => {
    if (titleRef.current) {
      typewriteEl(titleRef.current, {
        trigger: titleRef.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      });
    }
  });

  return (
    <div className={`section-header ${className ?? ''}`.trim()}>
      {badge && (
        <div className="offers-badge">
          <span className="badge-text">{badge}</span>
        </div>
      )}
      <h2 ref={titleRef} className={`section-title ${titleClassName ?? ''}`.trim()}>
        {title}
      </h2>
    </div>
  );
}
