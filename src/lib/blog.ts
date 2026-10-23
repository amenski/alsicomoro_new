import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Post = CollectionEntry<'blog'>;

// Entry ids are "<lang>/<file name>", from the folder layout in content.config.ts.
export const postLang = (post: Post) => post.id.split('/')[0] as Lang;
export const postSlug = (post: Post) => post.id.split('/')[1];

export const postPath = (lang: Lang, slug: string) =>
  `${lang === 'it' ? '' : '/en'}/blog/${slug}.html`;

/** Published posts in one language, newest first. Drafts are visible only in `astro dev`. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection(
    'blog',
    (post) => postLang(post) === lang && (import.meta.env.DEV || !post.data.draft)
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
