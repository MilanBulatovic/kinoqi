import { defineField, defineType } from "sanity";

/** Jedan dokument za celo drvo menija: hijerarhija = ugniježđen niz u Studiju (WP-olik prikaz). */
export const mainMenu = defineType({
  name: "mainMenu",
  title: "Meni (navigacija)",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Stavke",
      type: "array",
      of: [{ type: "menuItem" }],
      options: { layout: "list" },
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Navigacioni meni",
      subtitle: "Stablo linkova (ugniježđavanje = podstavke)",
    }),
  },
});
