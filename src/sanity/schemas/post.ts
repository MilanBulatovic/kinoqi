import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
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
    defineField({
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
              const first = text?.[0]?.children?.[0]?.text ?? "Full width text";
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
      ],
    }),
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
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});
