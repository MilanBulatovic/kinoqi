import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { contentSectionsField, portableBodyField } from "./blockContent";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    orderRankField({ type: "post" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    contentSectionsField,
    defineField({
      name: "featured",
      title: "Istaknuto",
      type: "boolean",
      initialValue: false,
      description: "Prikaži ovaj post kao istaknut na početnoj stranici",
    }),
    defineField({
      name: "featuredLabel",
      title: "Oznaka istaknutog",
      type: "string",
      description: "Npr. 'Preporučeno', 'Novo', 'Popular'",
      hidden: ({ document }) => !document?.featured,
    }),
    defineField({
      name: "featuredOrder",
      title: "Redosled istaknutog",
      type: "number",
      description: "Manji broj = prikazuje se prvi",
      hidden: ({ document }) => !document?.featured,
    }),
    portableBodyField,
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});
