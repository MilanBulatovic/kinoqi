import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { contentSectionsField, portableBodyField } from "./blockContent";

export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    orderRankField({ type: "page" }),
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Meta opis",
      type: "text",
      rows: 2,
    }),
    defineField({
      ...portableBodyField,
      title: "Sadržaj",
    }),
    defineField({
      ...contentSectionsField,
      title: "Sekcije",
      description: "Dodaj stavke: video, galerija slika, tekst preko cele širine, animirani tekst — isto kao na blog postu.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
    prepare({ title, subtitle }) {
      return { title, subtitle: `/${subtitle}` };
    },
  },
});
