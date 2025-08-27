// schemas/documents/seoMetadata.ts
import { defineType, defineField } from 'sanity';

// This schema stores SEO metadata for dynamic pages and listings across the websites.
export const seoMetadata = defineType({
  name: 'seoMetadata',
  title: 'SEO Metadata',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Page or Listing Reference',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'listing' }],
      description: 'Reference to the page or listing this metadata applies to.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: ['oly', 'oly-properties', 'oly-auto', 'oly-hiring', 'oly-services'],
      },
      description: 'Specify which platform site this metadata is for (multi-site SEO)',
      initialValue: 'oly',
    }),
    defineField({
      name: 'slugOverride',
      title: 'Canonical Slug',
      type: 'slug',
      description: 'Optional override for canonical slug used in SEO URLs.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'The SEO-optimized title that appears in search engine results.',
      validation: (Rule) => Rule.max(60).warning('Google typically displays up to 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      description: 'The SEO-optimized meta description for the page.',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Meta descriptions should be under 160 characters.'),
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Array of SEO keywords for search optimization (less important today).',
    }),

    // Open Graph / Social
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image used when sharing on Facebook or LinkedIn (1200x630 recommended).',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'twitterCardType',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Summary', value: 'summary' },
          { title: 'Summary with Large Image', value: 'summary_large_image' },
        ],
        layout: 'radio',
      },
      initialValue: 'summary_large_image',
      description: 'Controls how the content appears when shared on Twitter.',
    }),

    // Schema.org Structured Data (Optional)
    defineField({
      name: 'structuredData',
      title: 'Structured Data (JSON-LD)',
      type: 'text',
      description:
        'Custom JSON-LD structured data for enhanced SEO (used for rich results in Google).',
      rows: 6,
      validation: (Rule) => Rule.custom((val) => {
        if (!val) return true;
        try {
          JSON.parse(val);
          return true;
        } catch (e) {
          return 'Invalid JSON';
        }
      }),
    }),

    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'Timestamp of the last SEO metadata update.',
      readOnly: true,
    }),
  ],
});
