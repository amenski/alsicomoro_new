#!/bin/bash
# Generate sitemap.xml with today's lastmod, then refresh the date on each
# daily cron run to signal freshness to crawlers.
#
# Run: bash update-sitemap.sh  (cron: daily)

set -e
SITEMAP="/opt/alsicomoro/sitemap.xml"
TODAY=$(date +%Y-%m-%d)

# it page -> en page ('' when the page has no English version)
IT_PAGES=(
  "/" "/en/"
  "/menu.html" "/en/menu.html"
  "/chi-siamo.html" "/en/chi-siamo.html"
  "/contatti.html" "/en/contatti.html"
  "/galleria.html" ""
)
EN_PAGES=( "/en/" )

# Assets without locale alternates
ASSETS=( "/Menu_9.pdf" )

alternates() {
  # $1 = it path, $2 = en path (may be empty)
  local it="$1" en="$2"
  if [ -n "$en" ]; then
    echo "    <xhtml:link rel=\"alternate\" hreflang=\"it\" href=\"https://alsicomoro.com${it}\" />"
    echo "    <xhtml:link rel=\"alternate\" hreflang=\"en\" href=\"https://alsicomoro.com${en}\" />"
    echo "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"https://alsicomoro.com${it}\" />"
  else
    echo "    <xhtml:link rel=\"alternate\" hreflang=\"it\" href=\"https://alsicomoro.com${it}\" />"
    echo "    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"https://alsicomoro.com${it}\" />"
  fi
}

{
cat <<'HEADER'
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
HEADER

for ((i = 0; i < ${#IT_PAGES[@]}; i += 2)); do
  it="${IT_PAGES[i]}"
  en="${IT_PAGES[i + 1]}"
  echo "  <url>"
  echo "    <loc>https://alsicomoro.com${it}</loc>"
  echo "    <lastmod>${TODAY}</lastmod>"
  alternates "$it" "$en"
  echo "  </url>"
done

for en in "${EN_PAGES[@]}"; do
  echo "  <url>"
  echo "    <loc>https://alsicomoro.com${en}</loc>"
  echo "    <lastmod>${TODAY}</lastmod>"
  alternates "/" "$en"
  echo "  </url>"
done

for a in "${ASSETS[@]}"; do
  echo "  <url>"
  echo "    <loc>https://alsicomoro.com${a}</loc>"
  echo "    <lastmod>${TODAY}</lastmod>"
  echo "  </url>"
done

echo "</urlset>"
} > "$SITEMAP"

echo "Wrote $SITEMAP ($(grep -c '<loc>' "$SITEMAP") URLs, lastmod ${TODAY})"
