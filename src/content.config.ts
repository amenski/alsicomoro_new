import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per post. The folder is the language: blog/it/*.md is
// served at /blog/<file>.html, blog/en/*.md at /en/blog/<file>.html.
// How to write a post: src/content/blog/README.md.
const blog = defineCollection({
  // The id is always "<lang>/<file name>", even if the front matter has a `slug`.
  loader: glob({
    base: './src/content/blog',
    pattern: '{it,en}/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Root-absolute path to a file in public/, e.g. /images/kitfo.jpg.
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // File name (without .md) of the same post in the other language, if any.
    translation: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
