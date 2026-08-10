<xsl:stylesheet id="xsl" version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
<xsl:output method="html" indent="yes" encoding="UTF-8"/>
<xsl:template match="/">
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Al Sicomoro — Sitemap</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8f5f0; color: #2d2d2d; padding: 2rem; }
    h1 { font-size: 1.5rem; margin-bottom: .25rem; }
    .sub { color: #777; margin-bottom: 1.5rem; font-size: .875rem; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    th { background: #1a1a1a; color: #fff; font-size: .75rem; text-transform: uppercase; letter-spacing: .05em; padding: .75rem 1rem; text-align: left; }
    td { padding: .65rem 1rem; border-bottom: 1px solid #eee; font-size: .875rem; }
    tr:last-child td { border-bottom: none; }
    a { color: #b5651d; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .alt { font-size: .75rem; color: #999; }
    .prio { display: inline-block; background: #fce8d5; color: #9a4e14; padding: .15rem .5rem; border-radius: 4px; font-size: .75rem; font-weight: 600; }
    footer { margin-top: 2rem; font-size: .75rem; color: #aaa; }
  </style>
</head>
<body>
  <h1>Al Sicomoro — XML Sitemap</h1>
  <p class="sub">Generated <xsl:value-of select="s:urlset/s:url[1]/s:lastmod"/> · <xsl:value-of select="count(s:urlset/s:url)"/> indexed pages</p>
  <table>
    <thead>
      <tr><th>URL</th><th>Hreflang</th><th>Priority</th><th>Changefreq</th><th>Last Modified</th></tr>
    </thead>
    <tbody>
      <xsl:for-each select="s:urlset/s:url">
      <tr>
        <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
        <td class="alt">
          <xsl:for-each select="xhtml:link">
            <xsl:value-of select="@hreflang"/>: <xsl:value-of select="@href"/><xsl:if test="position() != last()"><br/></xsl:if>
          </xsl:for-each>
        </td>
        <td><span class="prio"><xsl:value-of select="s:priority"/></span></td>
        <td><xsl:value-of select="s:changefreq"/></td>
        <td><xsl:value-of select="s:lastmod"/></td>
      </tr>
      </xsl:for-each>
    </tbody>
  </table>
  <footer>This is an XML Sitemap — intended for search engines. Last regenerated: <xsl:value-of select="s:urlset/s:url[1]/s:lastmod"/></footer>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
