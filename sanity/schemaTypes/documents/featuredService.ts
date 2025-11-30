import { defineType, defineField } from "sanity";

export const featuredService = defineType({
  name: "featuredService",
  title: "Featured Service",
  type: "document",
  description:
    "Represents a service that appears in the Featured Services section of the website.",
  fields: [
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      description:
        "Determines where the text will be positioned relative to the image. Can be textLeft or textRight.",
      options: {
        list: [
          { title: "Text Left", value: "textLeft" },
          { title: "Text Right", value: "textRight" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "textLeft",
    }),
    defineField({
      name: "path",
      title: "Path",
      type: "string",
      description:
        "The URL path where this service should link to when the CTA is clicked.",
      validation: (Rule: any) =>
        Rule.required().uri({ allowRelative: true }).error("Must be a valid path"),
      initialValue: "",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description:
        "Image that represents the featured service. This will appear alongside the text.",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      initialValue: {
        _type: "image",
        asset: {
          _ref: "",
          _type: "reference",
        },
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The main title of the featured service.",
      validation: (Rule) => Rule.required().max(100),
      initialValue: "",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A detailed description of the featured service.",
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(500),
      initialValue: "",
    }),
    defineField({
      name: "cta",
      title: "Call To Action (CTA)",
      type: "string",
      description:
        "Text for the call-to-action button, e.g., 'Get Pre-Qualified'.",
      validation: (Rule) => Rule.required().max(50),
      initialValue: "",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      description:
        "List of feature highlights for this service. Optional if no features apply.",
      of: [
        defineField({
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            defineField({
              name: "featureId",
              title: "Feature ID",
              type: "string",
              description: "Unique identifier for the feature.",
              validation: (Rule) => Rule.required(),
              initialValue: "",
            }),
            defineField({
              name: "featureText",
              title: "Feature Text",
              type: "string",
              description: "Short descriptive text for the feature.",
              validation: (Rule) => Rule.required(),
              initialValue: "",
            }),
          ],
          preview: {
            select: {
              title: "featureText",
            },
          },
        }),
      ],
      initialValue: [], validation: (Rule) => Rule.min(0), // Allow empty array but not null
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "layout",
      media: "image",
    },
  },
});