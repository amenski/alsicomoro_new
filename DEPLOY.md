# Deploy

Static site served by nginx. Deploying = copying the files to the server's web
root. There is **no build step** and **no cache-busting query strings** — nginx
handles cache freshness via response headers.

## Caching strategy

Asset filenames are stable (`components.js`, `css/main.css`, …), not
content-hashed. So the correct approach is **revalidate-with-304**, not
cache-forever:

- `Cache-Control: no-cache` means *"cache it, but check freshness before using
  it"* — not *"don't cache"*.
- nginx auto-generates `ETag` / `Last-Modified` (defaults), so an unchanged file
  returns a tiny `304 Not Modified` (no body re-sent), and an edited file
  returns a full `200` on the next request automatically.

Result: edits show up immediately after you copy the file — no hashes, no query
strings, nothing to run before deploy.

> Note: `components.js` fetches `partials/header.html` and `partials/footer.html`
> at runtime. They're `.html`, so the `\.html$` rule below already covers them.

## nginx config

Add to your `server { }` block:

```nginx
    # HTML + runtime-fetched partials: always revalidate
    location ~* \.html$ {
        add_header Cache-Control "no-cache";
    }

    # JS/CSS: stable filenames -> revalidate (304s keep it cheap)
    location ~* \.(js|css)$ {
        add_header Cache-Control "no-cache";
    }

    # Images/fonts/icons: modest cache, still revalidated
    location ~* \.(png|jpe?g|gif|svg|webp|ico|woff2?)$ {
        add_header Cache-Control "public, max-age=604800, must-revalidate";
    }
```

`etag on;` and `Last-Modified` are nginx defaults — conditional requests work
with no extra config.

### Custom 404 page

To serve the branded 404 page (`404.html` / `en/404.html`) on unknown URLs:

```nginx
    error_page 404 /404.html;
```

### Legacy Squarespace redirects

`nginx-redirects.conf` (repo root) holds exact-match 301 redirects for old
Squarespace URLs (`/about`, `/menu`, `/gallery`, `/contact`) that still rank
in Google but 404 on the current site. Include it inside the `server { }`
block:

```nginx
    include /path/to/nginx-redirects.conf;
```

This is a **config change**, so nginx must be reloaded for it to take effect
(see Deploy steps below): `sudo nginx -t && sudo systemctl reload nginx`.

## Deploy steps

1. Copy the changed files to the nginx web root.
2. Reload nginx **only if you changed the config** (not needed for content):
   `sudo nginx -t && sudo systemctl reload nginx`

The next visitor picks up changed files automatically via revalidation.
