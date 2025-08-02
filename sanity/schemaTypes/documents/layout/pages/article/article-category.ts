import { defineType, defineField } from "sanity"

export const articleCategory = defineType({
  name: "articleCategory",
  title: "Article Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
      description: "Name of the article category (max 80 characters).",
    }),
    defineField({
      name: "slug",
      title: "Category Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "URL-friendly identifier for the category.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
      description: "A brief description of the category (max 200 characters).",
    }),
    defineField({
      name: "parentCategory",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "articleCategory" }], // Self-reference for hierarchy
      description: "Optional: Assign a parent category for hierarchical organization.",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Optional icon representing this category.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "parentCategory.title",
      media: "icon",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title || "Untitled Category",
        subtitle: subtitle ? `Subcategory of: ${subtitle}` : "Top-level Category",
        media: media,
      }
    },
  },
})
