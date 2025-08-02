import { defineType, defineField } from "sanity"

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Full name of the author.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "URL-friendly identifier for the author.",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the author image.",
        }),
      ],
      description: "Profile picture of the author.",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
      ],
      description: "A short biography of the author.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineField({
          name: "socialLink",
          title: "Social Link",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Twitter", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                  { title: "Website", value: "website" },
                  { title: "Other", value: "other" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ["http", "https", "mailto", "tel"],
                }),
            }),
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
            },
            prepare(selection) {
              const { platform, url } = selection
              return {
                title: platform ? `${platform.charAt(0).toUpperCase() + platform.slice(1)}` : "Social Link",
                subtitle: url,
              }
            },
          },
        }),
      ],
      description: "Links to the author's social media profiles or personal website.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || "Untitled Author",
        media: media,
      }
    },
  },
})
