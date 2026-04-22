/** Slika iz GROQ-a: `src: asset->url` i/ili `asset->{ url }` */
export type GalleryImageLike = {
  src?: string | null;
  asset?: { url?: string } | null;
};

export function galleryImageSrc(img: GalleryImageLike): string {
  const s = img.src ?? img.asset?.url;
  return typeof s === "string" && s.length > 0 ? s : "";
}
