import { defineType, defineField } from 'sanity';

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'document',
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Configuration Title',
      type: 'string',
      initialValue: 'Listing Gallery Section',
      description: 'Internal title for this gallery configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this gallery section is currently active.',
    }),

    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          title: 'Gallery Image',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
                metadata: ['blurhash', 'lqip', 'palette'],
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                  description: 'Alternative text for accessibility and SEO.',
                }),
                defineField({
                  name: 'caption',
                  title: 'Image Caption',
                  type: 'string',
                  description: 'Optional caption displayed with the image.',
                }),
              ],
              validation: (Rule) => Rule.required(),
              description: 'The image file.',
            }),

            defineField({
              name: 'isPrimary',
              title: 'Primary Image',
              type: 'boolean',
              initialValue: false,
              description: 'Mark this as the main/hero image for the gallery.',
            }),

            defineField({
              name: 'imageType',
              title: 'Image Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Product Photo', value: 'product' },
                  { title: 'Detail Shot', value: 'detail' },
                  { title: 'Lifestyle Image', value: 'lifestyle' },
                  { title: 'Size Reference', value: 'size-reference' },
                  { title: 'Packaging', value: 'packaging' },
                  { title: 'Certificate/Document', value: 'document' },
                  { title: 'Other', value: 'other' },
                ],
              },
              initialValue: 'product',
              description: 'Type/category of this image.',
            }),

            defineField({
              name: 'sortOrder',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this image appears (lower numbers first).',
            }),

            defineField({
              name: 'showInThumbnails',
              title: 'Show in Thumbnails',
              type: 'boolean',
              initialValue: true,
              description: 'Whether this image appears in the thumbnail grid.',
            }),
          ],
          preview: {
            select: {
              title: 'image.alt',
              media: 'image',
              isPrimary: 'isPrimary',
              type: 'imageType',
            },
            prepare(selection) {
              const { title, media, isPrimary, type } = selection;
              return {
                title: title || 'Untitled Image',
                subtitle: `${isPrimary ? '⭐ Primary' : ''} ${type || 'product'}`,
                media: media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(20),
      description: 'Images to display in the gallery.',
    }),

   

    defineField({
      name: 'galleryMetadata',
      title: 'Gallery Metadata',
      type: 'object',
      fields: [
        defineField({
          name: 'showImageCounter',
          title: 'Show Image Counter',
          type: 'boolean',
          initialValue: true,
          description: 'Display current image number (e.g., "1 of 5").',
        }),

        defineField({
          name: 'showImageCaption',
          title: 'Show Image Captions',
          type: 'boolean',
          initialValue: false,
          description: 'Display captions below or over images.',
        }),

        defineField({
          name: 'showImageTags',
          title: 'Show Image Tags',
          type: 'boolean',
          initialValue: false,
          description: 'Display image tags for filtering/organization.',
        }),

        defineField({
          name: 'showDownloadOption',
          title: 'Show Download Option',
          type: 'boolean',
          initialValue: false,
          description: 'Allow users to download images.',
        }),

        defineField({
          name: 'showShareOption',
          title: 'Show Share Option',
          type: 'boolean',
          initialValue: false,
          description: 'Allow users to share individual images.',
        }),
      ],
      description: 'Metadata and additional information display options.',
    }),

    defineField({
      name: 'engagementMetrics',
      title: 'Engagement Metrics',
      type: 'object',
      fields: [
        defineField({
          name: 'showLikes',
          title: 'Show Likes/Hearts',
          type: 'boolean',
          initialValue: true,
          description: 'Display like count and heart icon.',
        }),

        defineField({
          name: 'showViews',
          title: 'Show View Count',
          type: 'boolean',
          initialValue: true,
          description: 'Display how many times the listing has been viewed.',
        }),

        defineField({
          name: 'showPostDate',
          title: 'Show Post Date',
          type: 'boolean',
          initialValue: true,
          description: 'Display when the listing was posted.',
        }),

        defineField({
          name: 'dateFormat',
          title: 'Date Format',
          type: 'string',
          options: {
            list: [
              { title: 'Relative (2 weeks ago)', value: 'relative' },
              { title: 'Absolute (Jan 15, 2024)', value: 'absolute' },
              { title: 'Short (15/01/24)', value: 'short' },
            ],
          },
          initialValue: 'relative',
          hidden: ({ parent }) => !parent?.showPostDate,
          description: 'Format for displaying the post date.',
        }),

      
      ],
      description: 'Engagement metrics display configuration.',
    }),


    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'trackImageViews',
          title: 'Track Image Views',
          type: 'boolean',
          initialValue: true,
          description: 'Track which images are viewed most.',
        }),

        defineField({
          name: 'trackImageInteractions',
          title: 'Track Image Interactions',
          type: 'boolean',
          initialValue: true,
          description: 'Track clicks, zooms, and other interactions.',
        }),

        defineField({
          name: 'trackGalleryEngagement',
          title: 'Track Gallery Engagement',
          type: 'boolean',
          initialValue: true,
          description: 'Track time spent viewing gallery and navigation patterns.',
        }),
      ],
      description: 'Analytics and tracking configuration.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this gallery configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      imagesCount: 'galleryImages',
      layoutType: 'galleryLayout.layoutType',
    },
    prepare(selection) {
      const { title, isActive, imagesCount, layoutType } = selection;
      const count = Array.isArray(imagesCount) ? imagesCount.length : 0;
      
      return {
        title: title || 'Gallery Configuration',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${count} images (${layoutType || 'main-thumbnails'})`,
        media: '🖼️',
      };
    },
  },
});