
import { defineType, defineField } from "sanity";

export const Features = defineType({
    name: "Features",
    title: "Features",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
   
        defineField({
            name: "slide",
            title: "Slide",
            type: "array",
            of: [
                {type: 'slide'}, 
            ]
        }),

    ]
})