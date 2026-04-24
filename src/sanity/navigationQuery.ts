/** Jedan dokument, fiksno id — kreira se prvi put u studiju. */
export const MAIN_MENU_ID = "main-menu";

/**
 * Tri nivoa podstavki (dovoljno za praktičan meni). Dodaj nivo u projekciji ako bude potrebno.
 * `coalesce` prazan niz za nov dokument / polje bez djece.
 */
export const mainMenuGROQ = `*[_id == $menuId][0]{
  "items": coalesce(items, [])[] {
    _key,
    title,
    url,
    openInNewTab,
    pageRef->{ slug },
    "children": coalesce(children, [])[] {
      _key,
      title,
      url,
      openInNewTab,
      pageRef->{ slug },
      "children": coalesce(children, [])[] {
        _key,
        title,
        url,
        openInNewTab,
        pageRef->{ slug }
      }
    }
  }
}`;
