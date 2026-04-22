import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Users",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Ime i prezime",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Biografija",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "age",
      title: "Godine",
      type: "number",
    }),
    defineField({
      name: "active",
      title: "Aktivan",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Datum i vrijeme objave",
      type: "datetime",
    }),
    defineField({
      name: "date",
      title: "Datum rođenja",
      type: "date",
    }),
    defineField({
      name: "url",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
