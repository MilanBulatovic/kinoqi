import type { SanityMediaSection } from "./mediaSections";

/** Slika u mreži `images[]` na dokumentu galerije (isti oblik kao u gallery sekciji). */
export type GalleryGridImage = {
  _key: string;
  src?: string | null;
  asset?: { url?: string } | null;
  alt?: string;
  caption?: string;
};

export type GalleryBodyBlock =
  | {
      _type: "block";
      _key: string;
      style?: string;
      children?: Array<{ text: string; _type: string; marks?: string[] }>;
    }
  | {
      _type: "image";
      _key: string;
      asset?: { url: string };
      alt?: string;
    };

/** Jedna galerija za `/galerija/[slug]` — odgovara GROQ-u u `galerija/[slug].astro`. */
export type GalleryPageData = {
  title: string;
  description?: string;
  publishedAt?: string;
  coverImage?: { asset: { url: string }; alt?: string };
  body?: GalleryBodyBlock[];
  sections?: SanityMediaSection[];
  images?: GalleryGridImage[];
};
