import { defineType, defineField } from "sanity"

export const articleCard = defineType({
  name: "articleCard",
  title: "Article Card",
  type: "object", // This will be used as an object type within an array or as a reference
  fields: [
    defineField({
      name: "articleReference",
      title: "Article",
      type: "reference",
      to: [{ type: "articlePage" }], // Reference to your existing articlePage schema
      validation: (Rule) => Rule.required(),
      description: "Select the article to display in this card.",
    }),
    defineField({
      name: "showAuthorAvatar",
      title: "Show Author Avatar",
      type: "boolean",
      initialValue: true,
      description: "Display the author's avatar on the card.",
    }),
    defineField({
      name: "showAuthorName",
      title: "Show Author Name",
      type: "boolean",
      initialValue: true,
      description: "Display the author's name on the card.",
    }),
    defineField({
      name: "showCategoryTag",
      title: "Show Category Tag",
      type: "boolean",
      initialValue: true,
      description: "Display the article's primary category as a tag.",
    }),
    defineField({
      name: "cardLayout",
      title: "Card Layout",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Compact", value: "compact" },
          { title: "Minimal", value: "minimal" },
        ],
      },
      initialValue: "default",
      description: "Choose a layout style for this article card.",
    }),
  ],
  preview: {
    select: {
      title: "articleReference.title",
      author: "articleReference.articleMeta.author.name",
      category: "articleReference.articleMeta.category.title",
      media: "articleReference.heroSection.heroImage",
    },
    prepare(selection) {
      const { title, author, category, media } = selection
      return {
        title: title || "Untitled Article Card",
        subtitle: `${author ? `By ${author}` : "Unknown Author"}${category ? ` in ${category}` : ""}`,
        media: media,
      }
    },
  },
})
