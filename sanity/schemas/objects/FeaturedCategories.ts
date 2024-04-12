import { defineType, defineField } from "sanity";


export const FeaturedCategories = defineType({
    name: "FeaturedCategories",
    title: "Select Categories",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),

   
    ]
})