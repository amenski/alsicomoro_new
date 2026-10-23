// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `build.format: 'preserve'` is required: `'file'` would emit `/en.html` for
// `src/pages/en/index.astro`, breaking the live `/en/` URL. `'preserve'` keeps
// `menu.astro` → `menu.html` and `en/index.astro` → `en/index.html`.
//
// The sitemap integration normalizes URLs to extensionless form even with
// `preserve`, so `serialize` puts the `.html` endings back (for <loc> and for
// every hreflang link). Without it each entry points at a URL with no file
// behind it and would 404.
export default defineConfig({
  site: 'https://alsicomoro.com',
  // `inlineStylesheets: 'always'` inlines the CSS into each page so it is not a
  // render-blocking request (Lighthouse flagged /_astro/BaseLayout.*.css).
  build: { format: 'preserve', inlineStylesheets: 'always' },
  // Self-hosted fonts. They used to come from fonts.googleapis.com, a
  // render-blocking round trip of about 1.2 s. The files are static (one per
  // weight/style) because a variable woff2 would make the local provider infer
  // a single weight for the whole axis. `<Font>` in BaseLayout emits the
  // @font-face rules and preloads only the two faces the first screen uses.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'DM Serif Display',
      cssVariable: '--serif',
      fallbacks: ['Times New Roman', 'serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/dm-serif-display-400.woff2'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/dm-serif-display-400-italic.woff2'],
            weight: 400,
            style: 'italic',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Manrope',
      cssVariable: '--sans',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [300, 400, 500, 600, 700].map((weight) => ({
          src: [`./src/assets/fonts/manrope-${weight}.woff2`],
          weight,
          style: 'normal',
          display: 'swap',
        })),
      },
    },
  ],
  // Compression drops newline-only whitespace between inline elements, which
  // renders as a visible space on the original pages ("IT / EN", map card link).
  compressHTML: false,
  // The CSS minifier collapses `backdrop-filter` + `-webkit-backdrop-filter` to
  // the prefixed one only, so Chrome loses the blur — and `.nav` stops being the
  // containing block the mobile drawer is positioned against. Ship CSS as written.
  vite: { build: { cssMinify: false } },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it-IT', en: 'en-US' },
      },
      // Galleria is noindex and the 404 pages must never be listed. The
      // integration strips `.html` before filtering, so match the bare path.
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\.html$/, '');
        return !['/galleria', '/404', '/en/404'].includes(path);
      },
      customPages: ['https://alsicomoro.com/Menu_9.pdf'],
      serialize(item) {
        item.url = withHtml(item.url);
        if (item.links) {
          item.links = item.links.map((link) => ({ ...link, url: withHtml(link.url) }));
        }
        return item;
      },
    }),
  ],
});

/** Restore the real, on-disk URL for a sitemap entry. */
function withHtml(url) {
  const { pathname } = new URL(url);

  if (pathname.endsWith('.pdf')) return url;
  if (pathname === '/') return url;
  if (pathname === '/en' || pathname === '/en/') return url.replace(/\/en\/?$/, '/en/');

  return url.replace(pathname, `${pathname.replace(/\/$/, '')}.html`);
}
