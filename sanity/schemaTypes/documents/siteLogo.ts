// schemas/documents/siteBranding.ts
import { defineType, defineField } from 'sanity';

export const siteLogo = defineType({
  name: 'siteLogo',
  title: 'Site Branding & Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'site',
      title: 'Site Key',
      type: 'string',
      description: 'e.g., oly, oly-auto, oly-properties, oly-services',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Oly', value: 'oly' },
          { title: 'Oly Auto', value: 'oly-auto' },
          { title: 'Oly Properties', value: 'oly-properties' },
          { title: 'Oly Services', value: 'oly-services' },
          { title: 'Oly Hiring', value: 'oly-hiring' },
        ],
        layout: 'dropdown',
      },
    }),

    // Logos
    defineField({
      name: 'logoLight',
      title: 'Logo (Light Background)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Background)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoMonochrome',
      title: 'Logo (Monochrome)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoMobile',
      title: 'Mobile Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoSVG',
      title: 'Logo (SVG)',
      type: 'file',
      options: { accept: '.svg' },
    }),

    // Favicon
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: { hotspot: true },
    }),

    // Meta info
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Accessibility text for logo image',
    }),
 


    // Timestamps
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: 'site',
      media: 'logoLight',
    },
    prepare(selection) {
      return {
        title: `Logo for ${selection.title}`,
        media: selection.media,
      };
    },
  },
});
