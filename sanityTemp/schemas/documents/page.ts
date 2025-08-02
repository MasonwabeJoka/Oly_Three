import { defineType, defineField } from 'sanity';

export const page = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                slugify: input => input
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')
                                    .slice(0, 200)
            },
            description: 'A user-friendly URL segment to represent this page, generated from the title.',
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'The title of the page.',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A brief description or summary of the page.',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'The main content of the page.',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'The main image of the page.',
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'The SEO-friendly title for the page.',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            description: 'The SEO-friendly description for the page.',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            description: 'The date and time when the page was published.',
        }),
  
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
            description: 'Categories this page belongs to.',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Tags associated with the page for search optimization and categorization.',
        }),
        defineField({
            name: 'relatedPages',
            title: 'Related Pages',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'page' }] }],
            description: 'Other pages related to this one.',
        }),
        defineField({
            name: 'callToAction',
            title: 'Call to Action',
            type: 'string',
            description: 'A call to action message for the page.',
        }),
        defineField({
            name: 'socialMediaLinks',
            title: 'Social Media Links',
            type: 'array',
            of: [{ type: 'url' }],
            description: 'Links to related social media profiles or pages.',
        }),
        defineField({
            name: 'commentsEnabled',
            title: 'Comments Enabled',
            type: 'boolean',
            description: 'Indicates whether comments are enabled for the page.',
        }),
        defineField({
            name: 'metaRobots',
            title: 'Meta Robots',
            type: 'string',
            description: 'Instructions for search engine robots, like noindex or nofollow.',
        }),
        defineField({
            name: 'canonicalUrl',
            title: 'Canonical URL',
            type: 'url',
            description: 'The canonical URL of the page for SEO purposes.',
        }),
        defineField({
            name: 'structuredData',
            title: 'Structured Data',
            type: 'text',
            description: 'JSON-LD structured data snippet for rich search results.',
        }),
        defineField({
            name: 'customScripts',
            title: 'Custom Scripts',
            type: 'array',
            of: [{ type: 'text' }],
            description: 'Custom scripts for analytics or other page functionalities.',
        }),
        // Add any other fields that might be specific to your website's needs
    ],
});
