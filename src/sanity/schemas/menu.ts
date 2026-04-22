import { defineField, defineType } from "sanity";

export const menu = defineType({
  name: "menu",
  title: "Menu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Naziv linka",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Eksterni URL",
      type: "string",
      description: "Koristi samo za vanjske linkove (npr. https://example.com). Za interne stranice koristi polje ispod.",
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
