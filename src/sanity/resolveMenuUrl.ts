type MenuItemLike = {
  url?: string;
  pageRef?: { slug?: { current?: string } };
};

/** Isti odnos kao ranije: header = `/stranica`, futer = `/stranice/stranica`. */
export function resolveMenuItemUrl(item: MenuItemLike, mode: "header" | "footer"): string {
  if (item.url) {
    return item.url;
  }
  const s = item.pageRef?.slug?.current;
  if (s) {
    return mode === "footer" ? `/stranice/${s}` : `/${s}`;
  }
  return "#";
}
