import { Link } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import CtaButton from '@/components/common/CtaButton/CtaButton';

/** Simple 404 fallback for unknown routes. */
export default function NotFoundPage() {
  useDocumentMeta({
    title: 'Page Not Found | Behna Clothing Studio',
    description: 'The page you are looking for could not be found.',
    canonical: 'https://behna.in/',
  });

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 className="section-title">Page Not Found</h1>
      <p style={{ color: 'var(--color-text-soft)', maxWidth: '32rem' }}>
        The page you're looking for doesn't exist or may have moved.
      </p>
      <CtaButton to="/" variant="dark">
        Back to Home
      </CtaButton>
      <Link to="/collections" style={{ color: 'var(--color-ink)', textDecoration: 'underline' }}>
        Browse Collections
      </Link>
    </section>
  );
}
