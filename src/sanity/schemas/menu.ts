import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const menu = defineType({
  name: "menu",
  title: "Menu",
  type: "document",
  fields: [
    orderRankField({ type: "menu" }),
    defineField({
      name: "title",
      title: "Naziv linka",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      description: "Interni URL (npr. /blog, /kontakt) ili eksterni (npr. https://example.com). Ako je postavljeno, ima prioritet nad poljem Stranica ispod.",
    }),
    defineField({
      name: "pageRef",
      title: "Stranica",
      type: "reference",
      to: [{ type: "page" }],
      description: "Izaberi stranicu iz sekcije Stranice",
    }),
    defineField({
      name: "order",
      title: "Redosled",
      type: "number",
      description: "Manji broj = prikazuje se prvi",
      initialValue: 0,
    }),
    defineField({
      name: "openInNewTab",
      title: "Otvori u novom tabu",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Redosled",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "url",
    },
  },
});
