import { defineType, defineField } from "sanity";


export const SponsoredArticles = defineType({
    name: "SponsoredArticles",
    title: "Sponsored Articles",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),

    ]
})