import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

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
    defineField({
      name: "images",
      title: "Slike",
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
