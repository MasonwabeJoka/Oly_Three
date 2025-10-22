import { defineType, defineField } from 'sanity';

export const olyArticlesSection = defineType({
  name: 'olyArticlesSection',
  title: 'Oly Articles Section',
  type: 'document',
  initialValue: {
    isActive: true,
    displayOrder: 5,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Oly Articles',
      description: 'The main heading for this section.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this section is currently displayed on the homepage.',
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 5,
      description: 'Order in which this section appears on the homepage (lower numbers appear first).',
    }),

    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      description: 'Automatically fetches the 10 most recent articles for this section.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'olyArticle' }],
        },
      ],
      validation: (Rule) => Rule.max(10).warning('This field will automatically include up to 10 articles.'),
      readOnly: true, // Prevents manual editing to enforce automatic fetching
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this section configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, isActive } = selection;
      return {
        title: title || 'Oly Articles Section',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - Auto (10 articles)`,
      };
    },
  },
});