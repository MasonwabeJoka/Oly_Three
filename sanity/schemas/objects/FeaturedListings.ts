import { defineType, defineField } from "sanity";

export const FeaturedListings = defineType({
    name: "FeaturedListings",
    title: "Featured Listings",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),

    ]
})