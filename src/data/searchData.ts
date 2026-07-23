export interface SearchItem {
  category: string;
  title: string;
  type: 'product';
}

/** Static catalogue used by the search overlay's client-side filter. */
export const SEARCH_DATA: SearchItem[] = [
  { category: 'Kurtis', title: 'Embroidered Cotton Kurti', type: 'product' },
  { category: 'Kurtis', title: 'Mirror Work Kurti', type: 'product' },
  { category: 'Kurtis', title: 'Bandhani Print Kurti', type: 'product' },
  { category: 'Kurtis', title: 'Printed Flared Kurti', type: 'product' },
  { category: 'Co-ord Sets', title: 'Printed Co-ord Set', type: 'product' },
  { category: 'Co-ord Sets', title: 'Embroidered Co-ord Set', type: 'product' },
  { category: 'Co-ord Sets', title: 'Cotton Co-ord Set', type: 'product' },
  { category: 'Co-ord Sets', title: 'Designer Co-ord Set', type: 'product' },
  { category: 'Anarkali', title: 'Silk Anarkali Suit', type: 'product' },
  { category: 'Anarkali', title: 'Georgette Anarkali', type: 'product' },
  { category: 'Anarkali', title: 'Embroidered Anarkali', type: 'product' },
  { category: 'Anarkali', title: 'Floor-Length Anarkali', type: 'product' },
  { category: 'Party Wear', title: 'Sequin Party Suit', type: 'product' },
  { category: 'Party Wear', title: 'Heavy Embroidered Gown', type: 'product' },
  { category: 'Party Wear', title: 'Designer Lehenga Set', type: 'product' },
  { category: 'Party Wear', title: 'Velvet Party Wear', type: 'product' },
  { category: 'Salwar Kameez', title: 'Cotton Salwar Kameez', type: 'product' },
  { category: 'Salwar Kameez', title: 'Silk Salwar Kameez', type: 'product' },
  { category: 'Salwar Kameez', title: 'Punjabi Suit Set', type: 'product' },
  { category: 'Salwar Kameez', title: 'Straight-Cut Salwar Kameez', type: 'product' },
  { category: 'Office Formals', title: 'Formal Kurti with Pants', type: 'product' },
  { category: 'Office Formals', title: 'Straight Kurta Set', type: 'product' },
  { category: 'Office Formals', title: 'Linen Office Co-ord', type: 'product' },
  { category: 'Office Formals', title: 'Classic Formal Suit', type: 'product' },
];
