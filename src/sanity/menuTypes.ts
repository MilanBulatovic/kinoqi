/** Odgovara GROQ projekciji u `navigationQuery.ts` (do tri nivoa ugnježdenosti). */
export type MainMenuItem = {
  _key: string;
  title: string;
  url?: string;
  openInNewTab?: boolean;
  pageRef?: { slug?: { current: string } };
  children?: MainMenuItem[] | null;
};
