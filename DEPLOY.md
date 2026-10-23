# Deploy

Astro static site served by nginx. Deploying = building locally, then copying
`dist/` to the server's web root. There is no server-side build and no runtime
templating: every page is a finished `.html` file in `dist/`.

## Build

```bash
npm ci
npm run build          # → dist/
npm run preview        # sanity-check the built site on :4321
```

`build.format` is `'preserve'`, so the output paths match the live URLs exactly:

| Source | Output |
| --- | --- |
| `src/pages/index.astro` | `dist/index.html` → `/` |
| `src/pages/menu.astro` | `dist/menu.html` → `/menu.html` |
| `src/pages/en/index.astro` | `dist/en/index.html` → `/en/` |

Do not change `build.format` to `'file'`: it would emit `/en.html` and break the
live `/en/` URL.

## Caching strategy

Two different kinds of asset, two different policies:

- **`/_astro/*`** — JavaScript and CSS bundles. Filenames contain a content hash,
  so they can be cached forever. **Preferred:**
  ```nginx
  location /_astro/ {
      add_header Cache-Control "public, max-age=31536000, immutable";
  }
  ```
- **Everything else** (`*.html`, `images/*`, `Menu_9.pdf`, …) — stable filenames,
  not content-hashed, so use **revalidate-with-304** instead of cache-forever:
  ```nginx
  location ~* \.html$ {
      add_header Cache-Control "no-cache";
  }

  location ~* \.(png|jpe?g|gif|svg|webp|ico|woff2?)$ {
      add_header Cache-Control "public, max-age=604800, must-revalidate";
  }

  location = /Menu_9.pdf {
      add_header Cache-Control "public, max-age=604800, must-revalidate";
  }
  ```

  `Cache-Control: no-cache` means *"cache it, but check freshness before using
  it"* — not *"don't cache"*. nginx generates `ETag` / `Last-Modified` by
  default, so an unchanged file returns a small `304` and an edited file returns
  a full `200` on the next request.

## nginx config

Inside the `server { }` block:

```nginx
    # Hashed bundles: cache forever
    location /_astro/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # HTML: always revalidate
    location ~* \.html$ {
        add_header Cache-Control "no-cache";
    }

    # Images and the menu PDF: modest cache, still revalidated
    location ~* \.(png|jpe?g|gif|svg|webp|ico|woff2?)$ {
        add_header Cache-Control "public, max-age=604800, must-revalidate";
    }

    # Branded error pages, per language
    error_page 404 /404.html;
    location /en/ {
        error_page 404 /en/404.html;
    }

    # Legacy Squarespace redirects + /sitemap.xml -> /sitemap-index.xml
    include /path/to/nginx-redirects.conf;
```

`nginx-redirects.conf` (repo root) holds exact-match 301s for old Squarespace
URLs (`/about`, `/menu`, `/gallery`, `/contact`) that still rank in Google but
would 404, plus `/sitemap.xml` → `/sitemap-index.xml` for Search Console.

Config changes need a reload: `sudo nginx -t && sudo systemctl reload nginx`.

## Deploy steps

```bash
npm ci && npm run build
rsync -av dist/ <server>:/opt/alsicomoro/
```

Use **no `--delete`** on the first Astro deploy, so nothing is removed before you
have checked the result. Then delete the obsolete server files by hand:

```
components.js  i18n.js  partials/  en/partials/
strategia.html  css/main.css  update-sitemap.sh  sitemap.xml
```

- `css/main.css` is now `/_astro/*.css`; the old path is dead.
- `sitemap.xml` is replaced by `sitemap-index.xml` + `sitemap-0.xml`.
- **Remove the server cron that runs `update-sitemap.sh`.** Otherwise it keeps
  rewriting a stale `/opt/alsicomoro/sitemap.xml` that nothing links to.

Reload nginx only if the config changed.

## Post-deploy checks

```bash
for p in / /menu.html /chi-siamo.html /contatti.html /galleria.html /404.html \
         /en/ /en/menu.html /en/chi-siamo.html /en/contatti.html /en/404.html; do
  printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' https://alsicomoro.com$p)" "$p"
done
curl -s -o /dev/null -w '%{http_code}\n' https://alsicomoro.com/about        # 301
curl -s -o /dev/null -w '%{http_code}\n' https://alsicomoro.com/sitemap.xml  # 301
curl -s -o /dev/null -w '%{http_code}\n' https://alsicomoro.com/nope         # 404 + branded page
```

Then submit `sitemap-index.xml` in Google Search Console.

## How to add a page

1. Create `src/pages/<name>.astro`.
2. Wrap the markup in the layout and pass the head props:
   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   ---
   <BaseLayout
     lang="it"
     page="contatti"
     title="…"
     description="…"
     ogImage="/images/background.jpg"
     ogImageAlt="…"
   >
     …markup…
   </BaseLayout>
   ```
3. Add the EN twin at `src/pages/en/<name>.astro` if there is one.
4. Add the path to `src/i18n/ui.ts`: the `PageKey` union, `paths`, and
   `toggleTargets` (where the language toggle should go from that page).
5. Nav/footer links come from `Header.astro` / `Footer.astro`, which read
   `paths`, so nothing is copied by hand. Phone, hours, address and social URLs
   live in `src/data/site.ts` and feed the header, footer **and** the JSON-LD.

No page repeats the `<head>`, the header or the footer — that is what caused the
August banner loss this rewrite removes.
