import type { SanityMediaSection } from "./mediaSections";

/** Stavke `body[]` na CMS stranici (portable tekst + slike iz GROQ `body[]{ ..., asset->{ url } }`). */
export type CmsPageBodyBlock = {
  _type: string;
  _key: string;
  style?: string;
  children?: Array<{ text: string; _type: string; marks?: string[] }>;
  asset?: { url: string };
  alt?: string;
  caption?: string;
};

/** Jedna stranica za `/[slug]` — odgovara GROQ-u u `pages/[slug].astro`. */
export type CmsPageData = {
  title: string;
  description?: string;
  body?: CmsPageBodyBlock[];
  sections?: SanityMediaSection[];
};
