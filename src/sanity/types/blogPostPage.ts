import type { SanityMediaSection, SanityPortableTextSpan } from "./mediaSections";

/** Jedan post za `/blog/[slug]` — odgovara GROQ projekciji u `blog/[slug].astro`. */
export type BlogPostPageData = {
  title: string;
  publishedAt?: string;
  excerpt?: string;
  mainImage?: { asset: { url: string }; alt?: string };
  sections?: SanityMediaSection[];
  body?: SanityPortableTextSpan[];
};
