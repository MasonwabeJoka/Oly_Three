import { defineType, defineField } from 'sanity';

export const moreFromOlySection = defineType({
  name: 'moreFromOlySection',
  title: 'More from Oly Section',
  type: 'document',
  initialValue: {
    isActive: true,
    displayOrder: 1,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'More from Oly',
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
      initialValue: 1,
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
      name: 'sites',
      title: 'Network Sites',
      type: 'array',
        of: [
        { type: 'reference', to: [{ type: 'olySite' }] },
      ],
      validation: (Rule) => Rule.min(1).max(8).warning('Consider limiting to 4-6 sites for optimal display'),
      description: 'The network of classified sites to display in this section.',
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
      sitesCount: 'sites',
    },
    prepare(selection) {
      const { title, isActive, sitesCount } = selection;
      const count = Array.isArray(sitesCount) ? sitesCount.length : 0;
      
      return {
        title: title || 'More from Oly Section',
        subtitle: `${isActive ? 'Active' : 'Inactive'} - ${count} sites configured`,
      };
    },
  },
});