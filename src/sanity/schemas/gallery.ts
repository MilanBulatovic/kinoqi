import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { contentSectionsField, portableBodyField } from "./blockContent";

export const gallery = defineType({
  name: "gallery",
  title: "Galerija",
  type: "document",
  fields: [
    orderRankField({ type: "gallery" }),
    defineField({
      name: "title",
      title: "Naziv",
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
      title: "Opis",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Naslovna slika",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternativni tekst",
          type: "string",
        }),
      ],
    }),
    portableBodyField,
    defineField({
      ...contentSectionsField,
      description: "Dodaj stavke: video, galerija slika, tekst preko cele širine, animirani tekst.",
    }),
    defineField({
      name: "images",
      title: "Slike (mreža)",
      description: "Opciono: jednostavna mreža ispod sadržaja. Za video, punu širinu i sl. koristi polje „Sekcije”.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternativni tekst",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Opis slike",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Datum objave",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
  },
});
