import { defineField, defineType } from "sanity";

export const sponsoredArticle = defineType({
  name: "sponsoredArticle",
  title: "Sponsored Article TEMP",
  type: "document", // Or 'object' if always embedded, but 'document' allows standalone management
  fields: [
    defineField({
      name: "sponsoredArticleTEMP",
      title: "Sponsored Article TEMP",
      type: "string",

      description: "TEMP",
    }),
],
})