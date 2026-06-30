# Al Sicomoro — TODO

Tracking gaps that need owner input, photos, or a follow-up commit.

## Needs photos / copy from the owner

- **Real dish photos** — menu rotates 3 stock-feeling images (`zigni-overhead.jpg`, `shiro.jpg`, `vegan.jpg`). A photo per dish (or at least 6–8 hero dishes) would lift the whole site.
- **Owner story** — Rachel's Google review names Zaid and Giulia. A short "meet the family" paragraph + portrait on `chi-siamo.html` would humanize the brand.
- **Galleria content** — `galleria.html` currently shows "Coming soon" placeholders. Either fill with real photos (interior, food, events) or hide the nav link until ready.
- **Open Graph image** — `og:image` currently points to existing photos. A dedicated 1200×630 social preview image (logo + tagline over a hero photo) would render better on WhatsApp/Facebook.

## Code-only follow-ups (next sessions)

- **Privacy + Cookie pages** — footer links currently dead (`href="#"`). Italy/EU requires both. Generic minimal templates would unblock launch.
- **Cookie banner** — required by Italian law once analytics is added (currently none, so not urgent).
- **404 page** — Nginx falls back to default; a branded `404.html` is a 10-min job.
- **English i18n coverage** — `i18n.js` dictionary has gaps for newer content (reviews, recent menu additions). Audit and fill.
- **Analytics** — none installed. If/when added, pair with the cookie banner.

## Done (recent)

- ✅ OG / Twitter Card meta on all 5 pages
- ✅ Schema.org Restaurant + BreadcrumbList JSON-LD on all pages
- ✅ Favicon set (16/32/180/192/512 + ICO + manifest)
- ✅ `sitemap.xml` + `robots.txt`
- ✅ Real Google + TheFork reviews on homepage
- ✅ Header/footer extracted to shared partials
