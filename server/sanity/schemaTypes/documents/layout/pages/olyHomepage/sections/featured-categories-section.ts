import { defineType, defineField } from 'sanity';

export const featuredCategoriesSection = defineType({
  name: 'featuredCategoriesSection',
  title: 'Featured Categories Section',
  type: 'document',
  initialValue: {
    isActive: true,
    displayOrder: 2,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Featured Categories',
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
      initialValue: 2,
      description: 'Order in which this section appears on the homepage (lower numbers appear first).',
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Optional subtitle or description text below the main title.',
      rows: 2,
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
      categoriesCount: 'categories',
    },
    prepare(selection) {
      const { title, isActive, categoriesCount } = selection;
      const count = Array.isArray(categoriesCount) ? categoriesCount.length : 0;
      
      return {
        title: title || 'Featured Categories Section',
        // subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${count} categories configured`,
        // media: '📂',
      };
    },
  },
});