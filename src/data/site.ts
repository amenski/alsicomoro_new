// Single source of truth for values repeated across header, footer and JSON-LD.
// Change hours/phone/address here and every page follows.

export const site = {
  url: 'https://alsicomoro.com',
  name: 'Al Sicomoro',
  legalName: 'Al Sicomoro Ristorante',
  vat: 'P.IVA 14497570961',

  phone: {
    display: '02 2563527',
    href: 'tel:+39022563527',
    schema: '+39022563527',
  },

  whatsapp: {
    href: 'https://wa.me/393514313058',
  },

  address: {
    street: 'Via Panfilo Castaldi, 19',
    streetShort: 'Via P. Castaldi, 19',
    locality: 'Milano',
    region: 'MI',
    postalCode: '20124',
    country: 'IT',
  },

  geo: {
    latitude: 45.4773,
    longitude: 9.2055,
  },

  priceRange: '€€',
  servesCuisine: ['Eritrean', 'Ethiopian'],

  social: {
    instagram: 'https://www.instagram.com/al.sicomoro_',
    tiktok: 'https://www.tiktok.com/@al.sicomoro_',
    thefork: 'https://www.thefork.it/ristorante/ristorante-al-sicomoro-r860688',
  },

  images: {
    logo: '/images/logo.png',
    background: '/images/background.jpg',
    tree: '/images/tree.jpg',
    zigni: '/images/zigni-overhead.jpg',
  },

  // Mirrors the openingHoursSpecification in the original JSON-LD.
  openingHours: [
    { opens: '12:00', closes: '15:00' },
    { opens: '18:30', closes: '23:00' },
  ],
  openDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
} as const;
