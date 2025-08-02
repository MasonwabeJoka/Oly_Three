import { defineType, defineField } from "sanity"

export const featuredArticleSection = defineType({
  name: "featuredArticleSection",
  title: "Featured Article Section",
  type: "document", // Can be 'document' if you want to manage multiple featured sections, or 'object' if always embedded
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Featured Article",
      description: "Internal title for this featured article configuration.",
    }),
    defineField({
      name: "articleReference",
      title: "Featured Article",
      type: "reference",
      to: [{ type: "articlePage" }], // Reference to your existing articlePage schema
      validation: (Rule) => Rule.required(),
      description: "Select the article to feature prominently.",
    }),
    defineField({
      name: "showReadArticleButton",
      title: "Show 'Read Article' Button",
      type: "boolean",
      initialValue: true,
      description: "Display a 'Read Article' button on the featured section.",
    }),
    defineField({
      name: "overlayColor",
      title: "Overlay Color",
      type: "string",
      options: {
        list: [
          { title: "Dark", value: "dark" },
          { title: "Light", value: "light" },
          { title: "Gradient", value: "gradient" },
        ],
      },
      initialValue: "dark",
      description: "Color of the overlay on the featured article image.",
    }),
    defineField({
      name: "overlayOpacity",
      title: "Overlay Opacity",
      type: "number",
      validation: (Rule) => Rule.min(0).max(1).precision(0.1),
      initialValue: 0.5,
      description: "Opacity of the image overlay (0.0 to 1.0).",
    }),
  ],
  preview: {
    select: {
      title: "title",
      articleTitle: "articleReference.title",
      articleAuthor: "articleReference.articleMeta.author.name",
      media: "articleReference.heroSection.heroImage",
    },
    prepare(selection) {
      const { title, articleTitle, articleAuthor, media } = selection
      return {
        title: title || "Featured Article Section",
        subtitle: articleTitle
          ? `Featuring: "${articleTitle}" by ${articleAuthor || "Unknown"}`
          : "No article selected",
        media: media,
      }
    },
  },
})
