/** Shared navigation link data used by the header menu and the footer. */

export interface NavLink {
  label: string;
  /** react-router `to` target (may include a hash). */
  to: string;
}

export const SHOP_LINKS: NavLink[] = [
  { label: '3 Piece Suits', to: '/collections#three-piece-suits' },
  { label: 'Kurtis', to: '/collections#kurtis' },
  { label: 'Anarkali', to: '/collections#anarkali' },
  { label: 'Co-ord Sets', to: '/collections#co-ord-sets' },
  { label: 'Festival Wears', to: '/collections#festival-wears' },
];

export const EXPLORE_LINKS: NavLink[] = [
  { label: 'New Arrivals', to: '/#new-arrivals' },
  { label: 'Curated Collection', to: '/#curated-collection' },
  { label: 'Our Story', to: '/#our-story' },
];
