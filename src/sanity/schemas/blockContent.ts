import { defineField } from "sanity";

/** Isti portable tekst + slike kao na blog postu */
export const portableBodyField = defineField({
  name: "body",
  title: "Body (tekst i slike)",
  type: "array",
  of: [
    { type: "block" },
    {
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alternativni tekst" }),
        defineField({ name: "caption", type: "string", title: "Opis ispod slike" }),
      ],
    },
  ],
});

/** Video, galerija, forma, full-width tekst, animirani tekst — isto kao post */
export const contentSectionsField = defineField({
  name: "sections",
  title: "Sekcije",
  type: "array",
  of: [
    {
      type: "object",
      name: "videoSection",
      title: "Video",
      fields: [
        defineField({
          name: "url",
          title: "Video URL",
          type: "url",
          description: "YouTube, Vimeo ili direktan link",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Opis",
          type: "string",
        }),
      ],
      preview: {
        select: { title: "caption", subtitle: "url" },
        prepare({ title, subtitle }) {
          return { title: `🎬 ${title ?? "Video"}`, subtitle };
        },
      },
    },
    {
      type: "object",
      name: "gallerySection",
      title: "Galerija slika",
      fields: [
        defineField({
          name: "images",
          title: "Slike",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Alternativni tekst", type: "string" }),
                defineField({ name: "caption", title: "Opis", type: "string" }),
              ],
            },
          ],
        }),
      ],
      preview: {
        select: { images: "images" },
        prepare({ images }) {
          const count = images?.length ?? 0;
          return { title: `🖼️ Galerija`, subtitle: `${count} slika` };
        },
      },
    },
    {
      type: "object",
      name: "fullWidthTextSection",
      title: "Full width text over image",
      fields: [
        defineField({
          name: "backgroundImage",
          title: "Background image",
          type: "image",
          options: { hotspot: true },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "text",
          title: "Tekst",
          type: "string",
        }),
      ],
      preview: {
        select: { media: "backgroundImage", text: "text" },
        prepare({ media, text }) {
          const first = text?.slice(0, 40) ?? "Full width text";
          return { title: `🖼 ${first}`, media };
        },
      },
    },
    {
      type: "object",
      name: "animationTextSection",
      title: "Animation text",
      fields: [
        defineField({
          name: "content",
          title: "Tekst",
          type: "array",
          of: [{ type: "block" }],
          description: "Tekst koji se pojavljuje sa scroll reveal animacijom",
        }),
      ],
      preview: {
        select: { content: "content" },
        prepare({ content }) {
          const first = content?.[0]?.children?.[0]?.text ?? "Animation text";
          return { title: `✨ ${first}` };
        },
      },
    },
    {
      type: "object",
      name: "formSection",
      title: "Forma (kontakt)",
      fields: [
        defineField({
          name: "heading",
          title: "Naslov iznad forme",
          type: "string",
        }),
        defineField({
          name: "nameLabel",
          title: "Label za polje ime",
          type: "string",
          initialValue: "Ime",
        }),
        defineField({
          name: "emailLabel",
          title: "Label za email",
          type: "string",
          initialValue: "Email",
        }),
        defineField({
          name: "messageLabel",
          title: "Label za poruku (textarea)",
          type: "string",
          initialValue: "Poruka",
        }),
        defineField({
          name: "submitLabel",
          title: "Tekst na dugmetu slanja",
          type: "string",
          initialValue: "Pošalji",
        }),
        defineField({
          name: "actionUrl",
          title: "URL za slanje (POST)",
          type: "url",
          description: "Npr. Formspree ili drugi endpoint. Ako je prazno, slanje se blokira uz poruku.",
        }),
      ],
      preview: {
        select: { heading: "heading", submitLabel: "submitLabel" },
        prepare({ heading, submitLabel }) {
          return {
            title: `📝 ${heading?.trim() || "Forma"}`,
            subtitle: submitLabel ?? "Pošalji",
          };
        },
      },
    },
  ],
});
