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
      name: "scrollScaleSection",
      title: "Scroll scale (pun ekran)",
      fields: [
        defineField({
          name: "heading",
          title: "Naslov sekcije (pristupačnost)",
          type: "string",
        }),
        defineField({
          name: "panels",
          title: "Paneli",
          type: "array",
          description: "Npr. dva panela — prvi pa drugi skaliraju na pun ekran tokom skrola",
          of: [
            {
              type: "object",
              name: "scrollScalePanel",
              title: "Panel (slika + tekst preko)",
              fields: [
                defineField({
                  name: "backgroundImage",
                  title: "Slika (full cover)",
                  type: "image",
                  options: { hotspot: true },
                  description: "Cela pozadina panela, object-fit cover",
                }),
                defineField({
                  name: "imageAlt",
                  title: "Opis slike (alt)",
                  type: "string",
                }),
                defineField({
                  name: "textPlacement",
                  title: "Gde je tekst (asimetričan blok, nije 50/50)",
                  type: "string",
                  options: {
                    list: [
                      { title: "Desno, uži stub (prepor.)", value: "right" },
                      { title: "Levo, uži stub", value: "left" },
                    ],
                    layout: "radio",
                  },
                  initialValue: "right",
                }),
                defineField({ name: "title", title: "Naslov (preko slike)", type: "string" }),
                defineField({
                  name: "content",
                  title: "Tekst (preko slike)",
                  type: "array",
                  of: [{ type: "block" }],
                }),
              ],
              preview: {
                select: { title: "title" },
                prepare({ title }: { title?: string }) {
                  return { title: title?.trim() || "Panel" };
                },
              },
            },
          ],
          validation: (rule) => rule.min(2).max(6),
        }),
      ],
      preview: {
        select: { heading: "heading", panels: "panels" },
        prepare({ heading, panels }: { heading?: string; panels?: unknown[] }) {
          const n = Array.isArray(panels) ? panels.length : 0;
          return {
            title: `📐 ${heading?.trim() || "Scroll scale"}`,
            subtitle: `${n} panel${n === 1 ? "" : "a"}`,
          };
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
