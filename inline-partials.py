#!/usr/bin/env python3
"""Inline partials/header.html and partials/footer.html into every page.

The site previously injected the header/footer with components.js (fetch on
empty <div id="site-header">). That left the static HTML with almost no
internal links (galleria.html and chi-siamo.html were orphans for crawlers
that don't render JS). This script bakes the partials into each page so the
nav/footer are real, crawlable links.

Idempotent: re-running replaces previously inlined content.

Run: python3 inline-partials.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent

PAGES_IT = ["index.html", "chi-siamo.html", "contatti.html", "galleria.html", "menu.html", "404.html"]
PAGES_EN = ["index.html", "chi-siamo.html", "contatti.html", "menu.html", "404.html"]

HEADER_RE = re.compile(r'<div id="site-header"[^>]*>[\s\S]*?</div>', re.M)
FOOTER_RE = re.compile(r'<div id="site-footer"[^>]*>[\s\S]*?</div>', re.M)

# Rewrites for en pages: partials are Italian (relative to site root), en
# pages live in /en/ so every relative path needs ../ and the brand home
# link should point at the English home.
def en_rewrite(html):
    return re.sub(r'(href|src)="([^"]*)"', _rewrite_attr, html)

def _rewrite_attr(m):
    attr, val = m.group(1), m.group(2)
    if val.startswith(("http", "#", "tel:", "mailto:", "data:")):
        return m.group(0)
    if val == "/":
        return f'{attr}="/en/"'
    return f'{attr}="../{val}"'


def inline(page, header_html, footer_html, en=False):
    path = ROOT / page
    html = path.read_text(encoding="utf-8")
    hdr = en_rewrite(header_html) if en else header_html
    ftr = en_rewrite(footer_html) if en else footer_html

    def replace_header(m):
        attrs = m.group(0)[len('<div id="site-header"'):m.group(0).index('>')]
        return f'<div id="site-header"{attrs}>\n{hdr}\n</div>'

    def replace_footer(m):
        attrs = m.group(0)[len('<div id="site-footer"'):m.group(0).index('>')]
        return f'<div id="site-footer"{attrs}>\n{ftr}\n</div>'

    new = HEADER_RE.sub(replace_header, html)
    new = FOOTER_RE.sub(replace_footer, new)
    if new == html:
        print(f"  WARN: no change for {page} (no #site-header/#site-footer div?)")
        return
    path.write_text(new, encoding="utf-8")
    print(f"  inlined {page}")


def main():
    header = (ROOT / "partials" / "header.html").read_text(encoding="utf-8")
    footer = (ROOT / "partials" / "footer.html").read_text(encoding="utf-8")
    print("Italian pages:")
    for p in PAGES_IT:
        inline(p, header, footer, en=False)
    print("English pages:")
    for p in PAGES_EN:
        inline(Path("en") / p, header, footer, en=True)


if __name__ == "__main__":
    main()
