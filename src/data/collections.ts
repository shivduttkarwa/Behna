/** Collections page data — five categories, each a slider of product cards. */

export interface CollectionProduct {
  image: string;
  alt: string;
  name: string;
  /** Exact WhatsApp enquiry text (kept verbatim from the original markup). */
  enquire: string;
  badge?: string;
}

export interface Collection {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  /** Base class prefix used for the section's Swiper (e.g. "suits"). */
  key: string;
  products: CollectionProduct[];
}

const ENQ = 'Hi Behna! I am interested in ';

export const COLLECTIONS: Collection[] = [
  {
    id: 'three-piece-suits',
    num: '01',
    title: '3 Piece Suits',
    subtitle: 'Complete ensemble sets — top, bottom & dupatta',
    key: 'suits',
    products: [
      { image: '/assets/img/f7.jpg', alt: '3 Piece Suit 1', name: 'Classic Cotton Set', enquire: `${ENQ}the 3 Piece Suit 1.` },
      { image: '/assets/collections/3p2.jpg', alt: '3 Piece Suit 2', name: 'Embroidered Set', enquire: `${ENQ}the 3 Piece Suit 2.` },
      { image: '/assets/collections/3p3.jpg', alt: '3 Piece Suit 3', name: 'Ethnic Print Set', enquire: `${ENQ}the 3 Piece Suit 3.` },
      { image: '/assets/collections/3p5.jpg', alt: '3 Piece Suit 5', name: 'Floral Print Set', enquire: `${ENQ}the 3 Piece Suit 5.` },
      { image: '/assets/collections/3p6.jpg', alt: '3 Piece Suit 6', name: 'Silk Blend Set', enquire: `${ENQ}the 3 Piece Suit 6.` },
    ],
  },
  {
    id: 'kurtis',
    num: '02',
    title: 'Kurtis',
    subtitle: 'Everyday elegance — from casual to festive',
    key: 'kurtis',
    products: [
      { image: '/assets/collections/k4.jpg', alt: 'Kurti 1', name: 'Printed Kurti', enquire: `${ENQ}the Printed Kurti.` },
      { image: '/assets/collections/k2.jpg', alt: 'Kurti 2', name: 'Block Print Kurti', enquire: `${ENQ}the Block Print Kurti.` },
      { image: '/assets/collections/k3.jpg', alt: 'Kurti 3', name: 'Casual Kurti', enquire: `${ENQ}the Casual Kurti.` },
      { image: '/assets/collections/k1.jpg', alt: 'Kurti 4', name: 'Embroidered Kurti', enquire: `${ENQ}the Embroidered Kurti.` },
    ],
  },
  {
    id: 'anarkali',
    num: '03',
    title: 'Anarkali',
    subtitle: 'Flowing silhouettes with timeless grace',
    key: 'anarkali',
    products: [
      { image: '/assets/img/f3.jpg', alt: 'Classic Anarkali', name: 'Classic Anarkali', enquire: `${ENQ}the Classic Anarkali.` },
      { image: '/assets/img/f4.jpg', alt: 'Zari Work Anarkali', name: 'Zari Work Anarkali', enquire: `${ENQ}the Zari Work Anarkali.` },
      { image: '/assets/collections/an1.jpg', alt: 'Flared Anarkali', name: 'Flared Anarkali', enquire: `${ENQ}the Flared Anarkali.` },
      { image: '/assets/collections/an2.jpg', alt: 'Printed Anarkali', name: 'Printed Anarkali', enquire: `${ENQ}the Printed Anarkali.` },
    ],
  },
  {
    id: 'co-ord-sets',
    num: '04',
    title: 'Co-ord Sets',
    subtitle: 'Perfectly matched separates — effortlessly styled',
    key: 'coords',
    products: [
      { image: '/assets/img/co-ord-1.jpg', alt: 'Pastel Co-ord Set', name: 'Pastel Co-ord', enquire: `${ENQ}the Pastel Co-ord Set.` },
      { image: '/assets/collections/co1.jpg', alt: 'Printed Co-ord Set', name: 'Printed Co-ord', enquire: `${ENQ}the Printed Co-ord Set.` },
      { image: '/assets/img/cord-3.jpg', alt: 'Crop Co-ord Set', name: 'Crop Co-ord', enquire: `${ENQ}the Crop Co-ord Set.` },
      { image: '/assets/collections/co4.jpg', alt: 'Floral Co-ord Set', name: 'Floral Co-ord', enquire: `${ENQ}the Floral Co-ord Set.` },
    ],
  },
  {
    id: 'festival-wears',
    num: '05',
    title: 'Festival Wears',
    subtitle: 'Dressed for Diwali, Navratri & every celebration',
    key: 'festival',
    products: [
      { image: '/assets/collections/diwali.jpg', alt: 'Diwali Special', name: 'Diwali Special', enquire: `${ENQ}the Diwali Special.` },
      { image: '/assets/img/f2.jpg', alt: 'Wedding Guest', name: 'Wedding Guest', enquire: `${ENQ}the Wedding Guest outfit.` },
      { image: '/assets/img/f3.jpg', alt: 'Navratri Collection', name: 'Navratri Collection', enquire: `${ENQ}the Navratri Collection.` },
      { image: '/assets/img/f4.jpg', alt: 'Sangeet Night', name: 'Sangeet Night', enquire: `${ENQ}the Sangeet Night outfit.` },
      { image: '/assets/img/f5.jpg', alt: 'Festival Glam', name: 'Festival Glam', enquire: `${ENQ}the Festival Glam outfit.` },
      { image: '/assets/collections/an1.jpg', alt: 'Bridal Guest', name: 'Bridal Guest', enquire: `${ENQ}the Bridal Guest outfit.` },
      { image: '/assets/img/f7.jpg', alt: 'Ethnic Chic', name: 'Ethnic Chic', enquire: `${ENQ}the Ethnic Chic outfit.` },
      { image: '/assets/img/party.jpg', alt: 'Party Wear', name: 'Party Wear', enquire: `${ENQ}the Party Wear.`, badge: 'Festival' },
    ],
  },
];
