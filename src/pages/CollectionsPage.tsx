import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import CollectionsHero from '@/components/sections/collections/CollectionsHero/CollectionsHero';
import CollectionSection from '@/components/sections/collections/CollectionSection/CollectionSection';
import CollectionsCta from '@/components/sections/collections/CollectionsCta/CollectionsCta';
import VisitUs from '@/components/sections/shared/VisitUs/VisitUs';
import { COLLECTIONS } from '@/data/collections';

const COLLECTIONS_META = {
  title: 'All Collections | Kurtis, Anarkali, Co-ord Sets — Behna Clothing Studio Jaipur',
  description:
    "Explore all collections at Behna Clothing Studio, Jaipur — 3 Piece Suits, Kurtis, Anarkali, Co-ord Sets & Festival Wears. Handcrafted traditional women's clothing in Jaipur, Rajasthan.",
  canonical: 'https://behna.in/collections',
  ogTitle: 'All Collections | Behna Clothing Studio Jaipur',
  ogDescription:
    '3 Piece Suits, Kurtis, Anarkali, Co-ord Sets & Festival Wears — handcrafted ethnic wear for women. Behna Clothing Studio, Jaipur.',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Collections — Behna Clothing Studio',
    url: 'https://behna.in/collections',
    description:
      'Complete ethnic wear collection including 3 Piece Suits, Kurtis, Anarkali, Co-ord Sets and Festival Wears at Behna Clothing Studio, Jaipur.',
    publisher: {
      '@type': 'ClothingStore',
      name: 'Behna Clothing Studio',
      url: 'https://behna.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot No. 60, Gandhi Path West, Lalarpura',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        postalCode: '302021',
        addressCountry: 'IN',
      },
      telephone: '+917231042253',
    },
  },
};

export default function CollectionsPage() {
  useDocumentMeta(COLLECTIONS_META);

  return (
    <>
      <CollectionsHero />
      {COLLECTIONS.map((collection, index) => (
        <CollectionSection key={collection.id} collection={collection} index={index} />
      ))}
      <CollectionsCta />
      <VisitUs />
    </>
  );
}
