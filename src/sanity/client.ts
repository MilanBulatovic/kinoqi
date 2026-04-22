import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: import.meta.env.PROD,
});

export function urlFor(source: { asset: { _ref: string } }) {
  // Manually construct Sanity image URL
  const ref = source.asset._ref;
  const [, id, dimensions, format] = ref.split("-");
  return `https://cdn.sanity.io/images/${import.meta.env.PUBLIC_SANITY_PROJECT_ID}/${import.meta.env.PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}`;
}
