import { defineField, defineType } from "sanity";

/** Jedna stavke menija; u Studiju ugniježđen `items` daje jasan vizuelni nivo (uvlačenje). */
export const menuItem = defineType({
  name: "menuItem",
  title: "Meni stavka",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Naziv",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      description:
        "Interni (npr. /blog) ili spoljašnji. Ako je ispunjeno, ima prednost ispod 'Stranica'.",
    }),
    defineField({
      name: "pageRef",
      title: "Stranica",
      type: "reference",
      to: [{ type: "page" }],
    }),
    defineField({
      name: "openInNewTab",
      title: "Novi tab",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "children",
      title: "Podstavke",
      type: "array",
      of: [{ type: "menuItem" }],
      options: { layout: "list" },
      description: "Dodatni linkovi ispod ove stavke — u listi su uvučeno ispod roditelja.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      childCount: "children",
    },
    prepare: ({ title, childCount }) => {
      const n = Array.isArray(childCount) ? childCount.length : 0;
      return {
        title: title || "Bez naslova",
        subtitle: n > 0 ? `↳ ${n} podstav${n === 1 ? "ka" : "ki"}` : "Glavna stavka",
      };
    },
  },
});
