import { defineType, defineField } from "sanity";

export const HeroSection = defineType({
    name: "HeroSection",
    title: "Hero Section",
    type: "object",
    fields: [
    
        defineField({
            name: "text",
            title: "Text",
            type: "string",
        }),

    ]
})











