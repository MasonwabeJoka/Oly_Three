import { defineType, defineField } from "sanity"

export const articleSidebar = defineType({
  name: "articleSidebar",
  title: "Article Sidebar Configuration",
  type: "document", // Or 'object' if always embedded, but 'document' allows standalone management
  fields: [
    defineField({
      name: "title",
      title: "Configuration Title",
      type: "string",
      initialValue: "Default Article Sidebar",
      description: "Internal title for this sidebar configuration.",
    }),
    defineField({
      name: "showSidebar",
      title: "Show Sidebar",
      type: "boolean",
      initialValue: true,
      description: "Display sidebar with related content and ads.",
    }),
    defineField({
      name: "relatedArticles",
      title: "Related Articles Section",
      type: "object",
      fields: [
        defineField({
          name: "showRelatedArticles",
          title: "Show Related Articles",
          type: "boolean",
          initialValue: true,
          description: "Display related articles in sidebar.",
        }),
        defineField({
          name: "relatedArticlesTitle",
          title: "Related Articles Title",
          type: "string",
          initialValue: "Related Articles",
          hidden: ({ parent }) => !parent?.showRelatedArticles,
          description: "Title for the related articles section.",
        }),
        defineField({
          name: "maxRelatedArticles",
          title: "Max Related Articles",
          type: "number",
          initialValue: 5,
          validation: (Rule) => Rule.min(1).max(10),
          hidden: ({ parent }) => !parent?.showRelatedArticles,
          description: "Maximum number of related articles to show.",
        }),
        defineField({
          name: "relatedBy",
          title: "Related By",
          type: "string",
          options: {
            list: [
              { title: "Category", value: "category" },
              { title: "Tags", value: "tags" },
              { title: "Author", value: "author" },
              { title: "Manual Selection", value: "manual" },
            ],
          },
          initialValue: "category",
          hidden: ({ parent }) => !parent?.showRelatedArticles,
          description: "How to determine related articles.",
        }),
        defineField({
          name: "manualRelatedArticles",
          title: "Manual Related Articles",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "articlePage" }], // Reference to the main article schema
            },
          ],
          validation: (Rule) => Rule.max(10),
          hidden: ({ parent }) => parent?.relatedBy !== "manual",
          description: "Manually selected related articles.",
        }),
      ],
      hidden: ({ parent }) => !parent?.showSidebar,
      description: "Related articles configuration for the sidebar.",
    }),
    defineField({
      name: "sidebarAds",
      title: "Sidebar Advertisements",
      type: "object",
      fields: [
        defineField({
          name: "showAds",
          title: "Show Ads in Sidebar",
          type: "boolean",
          initialValue: false,
          description: "Display advertisements in the sidebar.",
        }),
        defineField({
          name: "adSectionReference",
          title: "Ad Section Reference",
          type: "reference",
          to: [{ type: "adSection" }], // Reference to your existing adSection schema
          hidden: ({ parent }) => !parent?.showAds,
          description: "Reference to ad section configuration.",
        }),
        defineField({
          name: "adPositions",
          title: "Ad Positions",
          type: "array",
          of: [
            {
              type: "string",
              options: {
                list: [
                  { title: "Top of Sidebar", value: "top" },
                  { title: "Middle of Sidebar", value: "middle" },
                  { title: "Bottom of Sidebar", value: "bottom" },
                  { title: "Between Related Articles", value: "between-articles" },
                ],
              },
            },
          ],
          hidden: ({ parent }) => !parent?.showAds,
          description: "Where to place ads in the sidebar.",
        }),
      ],
      hidden: ({ parent }) => !parent?.showSidebar,
      description: "Sidebar advertisement configuration.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      showSidebar: "showSidebar",
      showRelatedArticles: "relatedArticles.showRelatedArticles",
      showAds: "sidebarAds.showAds",
    },
    prepare(selection) {
      const { title, showSidebar, showRelatedArticles, showAds } = selection
      let subtitle = showSidebar ? "Enabled" : "Disabled"
      if (showSidebar) {
        if (showRelatedArticles) subtitle += " | Related Articles"
        if (showAds) subtitle += " | Ads"
      }
      return {
        title: title || "Sidebar Configuration",
        subtitle: subtitle,
      }
    },
  },
})
