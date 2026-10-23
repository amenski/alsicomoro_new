// All header/footer/aria strings plus the page path map.
// The toggle needs to know the twin URL of the current page, which the path map
// answers. Galleria has no EN page, so its alternate is /en/.

export type Lang = 'it' | 'en';

export type PageKey =
  | 'index'
  | 'menu'
  | 'chi-siamo'
  | 'contatti'
  | 'galleria'
  | 'blog'
  | '404';

// Canonical URL of each page in each language. Galleria has no EN page, so the
// EN entry repeats the IT path: EN nav still links to it.
export const paths: Record<PageKey, Record<Lang, string>> = {
  index: { it: '/', en: '/en/' },
  menu: { it: '/menu.html', en: '/en/menu.html' },
  'chi-siamo': { it: '/chi-siamo.html', en: '/en/chi-siamo.html' },
  contatti: { it: '/contatti.html', en: '/en/contatti.html' },
  galleria: { it: '/galleria.html', en: '/galleria.html' },
  blog: { it: '/blog.html', en: '/en/blog.html' },
  '404': { it: '/404.html', en: '/en/404.html' },
};

export const ui = {
  it: {
    htmlLang: 'it',
    ogLocale: 'it_IT',
    ogLocaleAlternate: 'en_US',

    navAriaLabel: 'Navigazione principale',
    brandAriaLabel: 'Al Sicomoro — home',
    topbarHours: 'Aperto · Mar–Dom 12:00–15:00 · 18:30–23:00',

    langToggleAriaLabel: 'Change language',

    nav: {
      index: 'Home',
      'chi-siamo': 'Chi Siamo',
      menu: 'Menu',
      galleria: 'Galleria',
      blog: 'Blog',
      contatti: 'Contatti',
    },
    navCta: 'Prenota un tavolo',
    prenotaShort: 'Prenota',

    menuToggleOpen: 'Apri menu',
    menuToggleClose: 'Chiudi menu',

    footer: {
      blurb:
        "Ristorante eritreo ed etiope nel cuore di Milano. Cucina di casa, ricette tramandate, ospitalità del Corno d'Africa.",
      navigate: 'Naviga',
      visit: 'Visita',
      services: 'Servizi',
      links: {
        'chi-siamo': 'La storia',
        menu: 'Menu',
        galleria: 'Galleria',
        contatti: 'Contatti',
      },
      thefork: 'Prenotazione TheFork',
      privateEvents: 'Eventi privati',
      coffeeCeremony: 'Cerimonia del caffè',
      copyright: '© 2026 Al Sicomoro · P.IVA 14497570961 · Tutti i diritti riservati',
    },

    whatsappAriaLabel: 'Prenota su WhatsApp',
    whatsappTooltip: 'Prenota su WhatsApp',
    mobileCtaAriaLabel: 'Azioni rapide',
    mobileCtaCall: 'Chiama',
    mobileCtaBook: 'Prenota',

    blog: {
      title: 'Blog | Al Sicomoro – Cucina eritrea a Milano',
      description:
        'Storie, ricette e tradizioni della cucina eritrea ed etiope dal ristorante Al Sicomoro, Milano Porta Venezia.',
      eyebrow: 'Il blog',
      heading: 'Storie dalla nostra tavola',
      lead: 'Ricette, ingredienti e tradizioni del Corno d’Africa, raccontati da Porta Venezia.',
      readMore: 'Leggi',
      back: 'Tutti gli articoli',
      ctaHeading: 'Vieni ad assaggiare',
      ctaText: 'Martedì–domenica, a pranzo e a cena, in Via Panfilo Castaldi 19.',
    },
  },

  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    ogLocaleAlternate: 'it_IT',

    navAriaLabel: 'Main navigation',
    brandAriaLabel: 'Al Sicomoro — home',
    topbarHours: 'Open · Tue–Sun 12:00–15:00 · 18:30–23:00',

    langToggleAriaLabel: 'Change language',

    nav: {
      index: 'Home',
      'chi-siamo': 'About',
      menu: 'Menu',
      galleria: 'Gallery',
      blog: 'Blog',
      contatti: 'Contact',
    },
    navCta: 'Book a table',
    prenotaShort: 'Book',

    menuToggleOpen: 'Open menu',
    menuToggleClose: 'Close menu',

    footer: {
      blurb:
        'Eritrean and Ethiopian restaurant in the heart of Milan. Home cooking, handed-down recipes, Horn of Africa hospitality.',
      navigate: 'Navigate',
      visit: 'Visit',
      services: 'Services',
      links: {
        'chi-siamo': 'Our story',
        menu: 'Menu',
        galleria: 'Gallery',
        contatti: 'Contact',
      },
      thefork: 'TheFork reservations',
      privateEvents: 'Private events',
      coffeeCeremony: 'Coffee ceremony',
      copyright: '© 2026 Al Sicomoro · P.IVA 14497570961 · All rights reserved',
    },

    whatsappAriaLabel: 'Book via WhatsApp',
    whatsappTooltip: 'Book via WhatsApp',
    mobileCtaAriaLabel: 'Quick actions',
    mobileCtaCall: 'Call',
    mobileCtaBook: 'Book',

    blog: {
      title: 'Blog | Al Sicomoro – Eritrean food in Milan',
      description:
        'Stories, recipes and traditions of Eritrean and Ethiopian cooking from Al Sicomoro restaurant, Milan Porta Venezia.',
      eyebrow: 'The blog',
      heading: 'Stories from our table',
      lead: 'Recipes, ingredients and traditions of the Horn of Africa, told from Porta Venezia.',
      readMore: 'Read',
      back: 'All posts',
      ctaHeading: 'Come and taste it',
      ctaText: 'Tuesday to Sunday, lunch and dinner, at Via Panfilo Castaldi 19.',
    },
  },
} as const;

// The language toggle's target. This is NOT simply "the other language's path of
// this page": galleria has no EN page, so IT galleria points at /en/, and the EN
// 404 points back at the IT 404.
export const toggleTargets: Record<PageKey, Record<Lang, string>> = {
  index: { it: '/en/', en: '/' },
  menu: { it: '/en/menu.html', en: '/menu.html' },
  'chi-siamo': { it: '/en/chi-siamo.html', en: '/chi-siamo.html' },
  contatti: { it: '/en/contatti.html', en: '/contatti.html' },
  galleria: { it: '/en/', en: '/galleria.html' },
  // Fallback only: blog pages pass their own target (the twin post or list, if any).
  blog: { it: '/en/', en: '/' },
  '404': { it: '/en/404.html', en: '/404.html' },
};

/** The twin-language URL for the language toggle, from the current language. */
export function alternatePath(page: PageKey, lang: Lang): string {
  return toggleTargets[page][lang];
}
