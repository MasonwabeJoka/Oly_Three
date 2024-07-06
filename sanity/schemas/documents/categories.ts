import { defineType, defineField } from 'sanity';

export const category = defineType({
    name: 'category',
    title: 'Categories',
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
                                 .slice(0, 200), 
            },
            description: 'A user-friendly URL segment to represent this category, generated from the title.',
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'The name of the category or subcategory.',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'A brief description of the category or subcategory.',
        }),

        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true, 
            },
            description: 'An image representing the category.',
        }),
        defineField({
            name: 'parentCategory',
            title: 'Parent Category',
            type: 'reference',
            to: [{ type: 'category' }],
            description: 'The parent category under which this category falls. Leave this empty for main categories.',
        }),
        defineField({
            name: 'childrenCategories',
            title: 'Children Categories',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
            description: 'The child category above which this category is. Leave this empty for main categories.',
        }),
        defineField({
            name: 'relatedCategories',
            title: 'Related Categories',
            type: 'array',
            of: [{ type: 'category' }],
            description: 'Other categories related to this one.',
        }),
        defineField({
            name: 'breadCrumbs',
            title: 'Bread Crumbs',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'A list bread crumbs leading up to this category, used for navigation.'
        }),

        defineField({
            name: 'mainCategory',
            title: 'Main Category',
            type: 'string',
            description: 'The main category under which the current category falls (e.g. Properties, For Sale, Jobs, Service etc.).',
        }),
     
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'The order of the category in the hierarchy of categories.',
        }),

        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Indicates whether a category should be featured on the homepage .',
        }),
  
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'The SEO-friendly title for the category.',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'The SEO-friendly description for the category.',
        }),
     
        defineField({
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Keywords associated with the category for search optimization.',
        }),
        defineField({
            name: 'nickName',
            title: 'Nick Name',
            type: 'string',
            description: 'An alternative name made of parent categories of the current category.',
        }),
     

        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'An icon identifier for the category, for use in UI elements.',
        }),
 
        defineField({
            name: 'creationDate',
            title: 'Creation Date',
            type: 'datetime',
            description: 'The date and time when the category was created.',
        }),
        defineField({
            name: 'lastUpdated',
            title: 'Last Updated',
            type: 'datetime',
            description: 'The date and time when the category was last updated.',
        }),

        defineField({
            name: 'createdBy',
            title: 'Created By',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who created the category.',
        }),
 

        defineField({
            name: 'visibility',
            title: 'Visibility',
            type: 'string',
            options: {
                list: [
                    { title: 'Public', value: 'public' },
                    { title: 'Private', value: 'private' },
                ],
            },
            description: 'Visibility status of the category (public or private).',
        }),
        defineField({
            name: 'audience',
            title: 'Audience',
            type: 'string',
            description: 'The intended audience for the category.',
        }),
        defineField({
            name: 'geographicalFocus',
            title: 'Geographical Focus',
            type: 'string',
            description: 'Geographical area that the category primarily focuses on.',
        }),
        defineField({
            name: 'averageDailyViews',
            title: 'Average Daily Views',
            type: 'number',
            description: 'Average number of daily views for the category.',
        }),
        defineField({
            name: 'subscriberCount',
            title: 'Subscriber Count',
            type: 'number',
            description: 'Number of users who have subscribed to the category.',
        }),
        defineField({
            name: 'accessRestrictions',
            title: 'Access Restrictions',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Any restrictions on accessing the category (like age restrictions).',
        }),
        
    ],
});

