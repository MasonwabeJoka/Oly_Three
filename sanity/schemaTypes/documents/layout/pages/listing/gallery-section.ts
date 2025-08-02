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

            defineField({
              name: 'imageQuality',
              title: 'Image Quality',
              type: 'string',
              options: {
                list: [
                  { title: 'High Quality', value: 'high' },
                  { title: 'Medium Quality', value: 'medium' },
                  { title: 'Low Quality', value: 'low' },
                ],
              },
              initialValue: 'high',
              description: 'Quality setting for image optimization.',
            }),

            defineField({
              name: 'tags',
              title: 'Image Tags',
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                layout: 'tags',
              },
              description: 'Tags for organizing and filtering images.',
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
      name: 'galleryLayout',
      title: 'Gallery Layout',
      type: 'object',
      fields: [
        defineField({
          name: 'layoutType',
          title: 'Layout Type',
          type: 'string',
          options: {
            list: [
              { title: 'Main + Thumbnails (Current)', value: 'main-thumbnails' },
              { title: 'Grid Layout', value: 'grid' },
              { title: 'Carousel/Slider', value: 'carousel' },
              { title: 'Masonry Layout', value: 'masonry' },
              { title: 'Single Image', value: 'single' },
            ],
          },
          initialValue: 'main-thumbnails',
          description: 'Overall layout style for the gallery.',
        }),

        defineField({
          name: 'mainImageRatio',
          title: 'Main Image Aspect Ratio',
          type: 'string',
          options: {
            list: [
              { title: '16:9 (Widescreen)', value: '16:9' },
              { title: '4:3 (Standard)', value: '4:3' },
              { title: '1:1 (Square)', value: '1:1' },
              { title: '3:2 (Photo)', value: '3:2' },
              { title: 'Auto (Original)', value: 'auto' },
            ],
          },
          initialValue: '4:3',
          hidden: ({ parent }) => parent?.layoutType !== 'main-thumbnails',
          description: 'Aspect ratio for the main image.',
        }),

        defineField({
          name: 'thumbnailCount',
          title: 'Visible Thumbnail Count',
          type: 'number',
          initialValue: 4,
          validation: (Rule) => Rule.min(2).max(8),
          hidden: ({ parent }) => parent?.layoutType !== 'main-thumbnails',
          description: 'Number of thumbnails to show before "Show All" button.',
        }),

        defineField({
          name: 'thumbnailPosition',
          title: 'Thumbnail Position',
          type: 'string',
          options: {
            list: [
              { title: 'Right Side', value: 'right' },
              { title: 'Bottom', value: 'bottom' },
              { title: 'Left Side', value: 'left' },
            ],
          },
          initialValue: 'right',
          hidden: ({ parent }) => parent?.layoutType !== 'main-thumbnails',
          description: 'Position of thumbnail images relative to main image.',
        }),

        defineField({
          name: 'gridColumns',
          title: 'Grid Columns',
          type: 'number',
          options: {
            list: [
              { title: '2 Columns', value: 2 },
              { title: '3 Columns', value: 3 },
              { title: '4 Columns', value: 4 },
              { title: '5 Columns', value: 5 },
            ],
          },
          initialValue: 3,
          hidden: ({ parent }) => parent?.layoutType !== 'grid',
          description: 'Number of columns in grid layout.',
        }),

        defineField({
          name: 'imageSpacing',
          title: 'Image Spacing',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'small',
          description: 'Spacing between images in the gallery.',
        }),
      ],
      description: 'Layout configuration for the gallery.',
    }),

    defineField({
      name: 'galleryControls',
      title: 'Gallery Controls',
      type: 'object',
      fields: [
        defineField({
          name: 'showAllImagesButton',
          title: 'Show "Show All Images" Button',
          type: 'boolean',
          initialValue: true,
          description: 'Display button to view all images in modal/lightbox.',
        }),

        defineField({
          name: 'showAllButtonText',
          title: 'Show All Button Text',
          type: 'string',
          initialValue: 'Show All Images',
          hidden: ({ parent }) => !parent?.showAllImagesButton,
          description: 'Text for the show all images button.',
        }),

        defineField({
          name: 'showAllButtonPosition',
          title: 'Show All Button Position',
          type: 'string',
          options: {
            list: [
              { title: 'Over Last Thumbnail', value: 'overlay' },
              { title: 'Below Thumbnails', value: 'below' },
              { title: 'Separate Button', value: 'separate' },
            ],
          },
          initialValue: 'overlay',
          hidden: ({ parent }) => !parent?.showAllImagesButton,
          description: 'Position of the show all images button.',
        }),

        defineField({
          name: 'enableZoom',
          title: 'Enable Image Zoom',
          type: 'boolean',
          initialValue: true,
          description: 'Allow users to zoom into images on hover/click.',
        }),

        defineField({
          name: 'enableFullscreen',
          title: 'Enable Fullscreen View',
          type: 'boolean',
          initialValue: true,
          description: 'Allow users to view images in fullscreen mode.',
        }),

        defineField({
          name: 'enableImageNavigation',
          title: 'Enable Image Navigation',
          type: 'boolean',
          initialValue: true,
          description: 'Show previous/next arrows for image navigation.',
        }),

        defineField({
          name: 'autoplaySlideshow',
          title: 'Autoplay Slideshow',
          type: 'boolean',
          initialValue: false,
          description: 'Automatically cycle through images.',
        }),

        defineField({
          name: 'slideshowInterval',
          title: 'Slideshow Interval (seconds)',
          type: 'number',
          initialValue: 5,
          validation: (Rule) => Rule.min(2).max(10),
          hidden: ({ parent }) => !parent?.autoplaySlideshow,
          description: 'Time between automatic image changes.',
        }),
      ],
      description: 'Interactive controls and features for the gallery.',
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

        defineField({
          name: 'metricsPosition',
          title: 'Metrics Position',
          type: 'string',
          options: {
            list: [
              { title: 'Bottom Left of Gallery', value: 'bottom-left' },
              { title: 'Bottom Right of Gallery', value: 'bottom-right' },
              { title: 'Below Gallery', value: 'below' },
              { title: 'Above Gallery', value: 'above' },
            ],
          },
          initialValue: 'bottom-left',
          description: 'Position of engagement metrics relative to gallery.',
        }),
      ],
      description: 'Engagement metrics display configuration.',
    }),

    defineField({
      name: 'galleryStyle',
      title: 'Gallery Style',
      type: 'object',
      fields: [
        defineField({
          name: 'borderRadius',
          title: 'Image Border Radius',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
              { title: 'Extra Large', value: 'xl' },
            ],
          },
          initialValue: 'medium',
          description: 'Corner rounding for gallery images.',
        }),

        defineField({
          name: 'imageShadow',
          title: 'Image Shadow',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'small',
          description: 'Drop shadow for gallery images.',
        }),

        defineField({
          name: 'hoverEffect',
          title: 'Image Hover Effect',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Scale Up', value: 'scale' },
              { title: 'Brightness', value: 'brightness' },
              { title: 'Overlay', value: 'overlay' },
              { title: 'Zoom', value: 'zoom' },
            ],
          },
          initialValue: 'scale',
          description: 'Effect when hovering over images.',
        }),

        defineField({
          name: 'backgroundColor',
          title: 'Gallery Background',
          type: 'string',
          options: {
            list: [
              { title: 'Transparent', value: 'transparent' },
              { title: 'White', value: 'white' },
              { title: 'Light Gray', value: 'light-gray' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'transparent',
          description: 'Background color of the gallery section.',
        }),

        defineField({
          name: 'customBackgroundColor',
          title: 'Custom Background Color',
          type: 'string',
          description: 'Hex color code for custom background',
          hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
        }),

        defineField({
          name: 'galleryPadding',
          title: 'Gallery Padding',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'medium',
          description: 'Padding around the gallery section.',
        }),
      ],
      description: 'Visual styling options for the gallery.',
    }),

    defineField({
      name: 'responsiveSettings',
      title: 'Responsive Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'mobileLayout',
          title: 'Mobile Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Single Image + Dots', value: 'single-dots' },
              { title: 'Swipe Carousel', value: 'swipe' },
              { title: 'Stacked Images', value: 'stacked' },
              { title: 'Grid (2 columns)', value: 'grid-2' },
            ],
          },
          initialValue: 'swipe',
          description: 'How gallery is displayed on mobile devices.',
        }),

        defineField({
          name: 'tabletLayout',
          title: 'Tablet Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Same as Desktop', value: 'desktop' },
              { title: 'Same as Mobile', value: 'mobile' },
              { title: 'Adapted Layout', value: 'adapted' },
            ],
          },
          initialValue: 'adapted',
          description: 'How gallery is displayed on tablet devices.',
        }),

        defineField({
          name: 'mobileImageHeight',
          title: 'Mobile Image Height',
          type: 'string',
          options: {
            list: [
              { title: 'Auto', value: 'auto' },
              { title: '250px', value: '250px' },
              { title: '300px', value: '300px' },
              { title: '400px', value: '400px' },
              { title: '50vh', value: '50vh' },
            ],
          },
          initialValue: '300px',
          description: 'Height of images on mobile devices.',
        }),

        defineField({
          name: 'enableSwipeGestures',
          title: 'Enable Swipe Gestures',
          type: 'boolean',
          initialValue: true,
          description: 'Allow swiping to navigate images on touch devices.',
        }),
      ],
      description: 'Responsive behavior settings.',
    }),

    defineField({
      name: 'accessibility',
      title: 'Accessibility',
      type: 'object',
      fields: [
        defineField({
          name: 'enableKeyboardNavigation',
          title: 'Enable Keyboard Navigation',
          type: 'boolean',
          initialValue: true,
          description: 'Allow navigation using arrow keys.',
        }),

        defineField({
          name: 'announceImageChanges',
          title: 'Announce Image Changes',
          type: 'boolean',
          initialValue: true,
          description: 'Announce image changes to screen readers.',
        }),

        defineField({
          name: 'focusManagement',
          title: 'Focus Management',
          type: 'boolean',
          initialValue: true,
          description: 'Properly manage focus for keyboard users.',
        }),
      ],
      description: 'Accessibility features and settings.',
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