import { defineType, defineField } from "sanity";


export const Blog = defineType({
    name: "Blog",
    title: "Blog",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),

    ]
})