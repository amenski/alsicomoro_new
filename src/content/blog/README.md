# Blog posts

One Markdown file per post. The folder is the language:

| File | URL |
| --- | --- |
| `it/injera-fatta-in-casa.md` | `/blog/injera-fatta-in-casa.html` |
| `en/homemade-injera.md` | `/en/blog/homemade-injera.html` |

The file name is the URL, so use lowercase words joined by hyphens and do not
rename a file after it is published.

## Front matter

```markdown
---
title: Injera fatta in casa
description: Come prepariamo ogni giorno l'injera con farina di teff. # meta description, ~150 characters
date: 2026-11-02
updatedDate: 2026-11-10        # optional
image: /images/zigni-overhead.jpg   # optional, a file in public/
imageAlt: Injera con zighinì       # optional
translation: homemade-injera       # optional, file name of the same post in the other language
draft: true                        # optional; drafts show in `npm run dev` only
---

Text in Markdown. Use `##` for section headings (the title is already the page's h1).
```

The Blog link in the nav and the `/blog.html` list page appear automatically once a
language has at least one post that is not a draft. Italian is the main
language; add an English post only when it is worth translating.

Publish = `npm run build` and deploy (see DEPLOY.md). The sitemap updates itself.
