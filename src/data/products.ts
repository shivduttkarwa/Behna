/** Product / category data for the Home page. Images live under /public. */

export interface Slide {
  image: string;
  alt: string;
  name: string;
  badge?: string;
}

export interface Category {
  image: string;
  alt: string;
  name: string;
  /** react-router target for the category. */
  to: string;
}

export interface CuratedItem {
  image: string;
  alt: string;
  label: string;
}

export interface Offer {
  image: string;
  alt: string;
  badge: string;
  title: string;
  discount: string;
  description: string;
}

export const NEW_ARRIVALS: Slide[] = [
  { image: '/assets/img/suit-2.jpg', alt: 'Kurtis', name: 'Kurtis', badge: 'New Arrival' },
  { image: '/assets/img/co-ord-1.jpg', alt: 'Co-ord Sets', name: 'Co-ord Sets', badge: 'New Arrival' },
  { image: '/assets/img/anarkali.jpg', alt: 'Anarkali', name: 'Anarkali', badge: 'New Arrival' },
  { image: '/assets/img/f1.jpg', alt: 'Party Wear', name: 'Party Wear', badge: 'New Arrival' },
  { image: '/assets/img/suit-1.jpg', alt: 'Salwar Kameez', name: 'Salwar Kameez', badge: 'New Arrival' },
  { image: '/assets/img/f6.jpg', alt: 'Office Formals', name: 'Office Formals', badge: 'New Arrival' },
];

export const CATEGORIES: Category[] = [
  { image: '/assets/collections/3p-1.jpg', alt: '3 Piece Suits', name: '3 Piece Suits', to: '/collections#three-piece-suits' },
  { image: '/assets/collections/k1.jpg', alt: 'Kurtis', name: 'Kurtis', to: '/collections#kurtis' },
  { image: '/assets/img/anarkali.jpg', alt: 'Anarkali', name: 'Anarkali', to: '/collections#anarkali' },
  { image: '/assets/img/cord-3.jpg', alt: 'Co-ord Sets', name: 'Co-ord Sets', to: '/collections#co-ord-sets' },
];

export const CURATED: CuratedItem[] = [
  { image: '/assets/collections/k3.jpg', alt: 'Kurti Look', label: 'Kurtis' },
  { image: '/assets/img/f4.jpg', alt: 'Anarkali', label: 'Anarkali' },
  { image: '/assets/img/co ord set-2.jpg', alt: 'Co-ord Set', label: 'Co-ord Sets' },
  { image: '/assets/collections/diwali.jpg', alt: 'Party Wear', label: 'Party Wear' },
  { image: '/assets/img/f7.jpg', alt: 'Festive', label: 'Festive' },
  { image: '/assets/img/suit-2.jpg', alt: 'Salwar Kameez', label: 'Salwar Kameez' },
];

export const OFFERS: Offer[] = [
  {
    image: '/assets/img/suit-1.jpg',
    alt: 'Festive Collection',
    badge: 'FESTIVE SPECIAL',
    title: 'Festive Collection',
    discount: '10% OFF',
    description: 'Celebrate in style with our exclusive festive wear collection',
  },
  {
    image: '/assets/img/suit-2.jpg',
    alt: 'Designer Sarees',
    badge: 'TRENDING',
    title: 'Anarkali Collection',
    discount: '8% OFF',
    description: 'Elegant designs for every special occasion',
  },
  {
    image: '/assets/img/cord-3.jpg',
    alt: 'Cord Sets',
    badge: 'NEW ARRIVAL',
    title: 'Cord Sets',
    discount: '5% OFF',
    description: 'Modern comfort meets traditional elegance',
  },
];
