import { defineType, defineField } from "sanity";

export const Home = defineType({
    name: "Home",
    title: "Home",
    type: "document",
    fields: [
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: '/',
            },
        }),
        defineField({
            name: "sections",
            title: "Sections",
            type: "array",
            of: [
                {type: 'HeroSection'},
                {type: 'Features'},
                {type: 'FeaturedCategories'},
                {type: 'FeaturedListings'},
                {type: 'Blog'},
                {type: 'SponsoredArticles'}
            ]
        })
    ]
})