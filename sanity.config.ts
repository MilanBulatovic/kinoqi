import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "kinoqi",
  title: "Kinoqi",

  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Sadržaj")
          .items([
            orderableDocumentListDeskItem({
              type: "post",
              title: "Postovi",
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: "gallery",
              title: "Galerija",
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: "page",
              title: "Stranice",
              S,
              context,
            }),
            S.listItem()
              .id("link-main-menu")
              .title("Meni (navigacija)")
              .child(
                S.document()
                  .schemaType("mainMenu")
                  .documentId("main-menu")
                  .title("Navigacioni meni"),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !["post", "gallery", "page", "mainMenu"].includes(item.getId() ?? "")
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
