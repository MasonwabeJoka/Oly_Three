import { defineType, defineField } from "sanity"

export const featuredArticleSection = defineType({
  name: "featuredArticleSection",
  title: "Featured Article Section",
  type: "document", 
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
      to: [{ type: "articlePage" }],       
      validation: (Rule) => Rule.required(),
      description: "Select the article to feature prominently.",
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
