import { defineField, defineType } from "sanity"

export const category = defineType({
  name: "category",
  title: "Category",
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
      name: "path",
      title: "Full Path",
      type: "string",
      description: 'The complete hierarchical path (e.g., "Oly/Appliances/Domestic Appliances")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "The parent category in the hierarchy",
    }),
    defineField({
      name: "subcategories",
      title: "Subcategories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      description: "Direct child categories",
      readOnly: true, // This will be populated automatically
    }),
    defineField({
      name: "level",
      title: "Hierarchy Level",
      type: "number",
      description: "The depth level in the hierarchy (0 for root categories)",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "isRoot",
      title: "Is Root Category",
      type: "boolean",
      description: "Whether this is a top-level category",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Category Icon",
      type: "image",
      description: "Icon to represent this category",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      description: "Photo to represent this category (alternative to icon)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Whether this category is active and visible to users",
      initialValue: true,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Category",
      type: "boolean",
      description: "Whether to feature this category prominently",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Order within the same level",
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "SEO title for this category page",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 2,
          description: "SEO description for this category page",
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          description: "SEO keywords for this category",
        }),
      ],
    }),
    defineField({
      name: "customAttributes",
      title: "Custom Attributes",
      type: "array",
      description: "Category-specific fields that listings in this category should have",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Attribute Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "type",
              title: "Field Type",
              type: "string",
              options: {
                list: [
                  { title: "Text", value: "text" },
                  { title: "Number", value: "number" },
                  { title: "Boolean", value: "boolean" },
                  { title: "Select", value: "select" },
                  { title: "Date", value: "date" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "required",
              title: "Required",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "options",
              title: "Options",
              type: "array",
              of: [{ type: "string" }],
              description: "Options for select fields",
              hidden: ({ parent }) => parent?.type !== "select",
            }),
          ],
          preview: {
            select: {
              name: "name",
              type: "type",
              required: "required",
            },
            prepare({ name, type, required }) {
              return {
                title: name,
                subtitle: `${type}${required ? " (required)" : ""}`,
              }
            },
          },
        },
      ],
    
    }),
    defineField({
      name: "itemCount",
      title: "Item Count",
      type: "number",
      description: "Number of active listings in this category (auto-calculated)",
      readOnly: true,
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      path: "path",
      level: "level",
      isActive: "isActive",
      isFeatured: "isFeatured",
      media: "icon",
      image: "image",
    },
    prepare(selection) {
      const { title, path, level, isActive, isFeatured, media, image } = selection
      const indent = "  ".repeat(level || 0)
      const status = !isActive ? " (Inactive)" : isFeatured ? " ⭐" : ""
      return {
        title: `${indent}${title}${status}`,
        subtitle: path,
        media: media || image,
      }
    },
  },
  orderings: [
    {
      title: "Hierarchy Order",
      name: "hierarchyOrder",
      by: [
        { field: "level", direction: "asc" },
        { field: "order", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
})
