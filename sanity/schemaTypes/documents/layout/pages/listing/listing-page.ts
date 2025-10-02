import { defineType, defineField } from "sanity"

export const listingPage = defineType({
  name: "listingPage",
  title: "Listing Page",
  type: "document",
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Page Configuration Title",
      type: "string",
      initialValue: "Main Listing Page Configuration",
      description: "Internal title for this page configuration.",
    }),

    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this page configuration is currently active.",
    }),

      defineField({
      name: "sectionConfiguration",
      title: "Section Configuration",
      type: "object",
      fields: [
        defineField({
          name: "enabledSections",
          title: "Enabled Sections",
          type: "array",
          of: [
            {
              type: "string",
              options: {
                list: [
                  { title: "Gallery Section", value: "gallery" },
                  { title: "Seller Section", value: "seller" },
                  { title: "Product Details Section", value: "product-details" },
                  { title: "Product Specifications Section", value: "specifications" },
                  { title: "Features Section", value: "features" },
                  { title: "Similar Listings Section", value: "similar-listings" },
                ],
              },
            },
          ],
          initialValue: ["gallery", "seller", "product-details", "specifications", "features", "similar-listings"],
          description: "Which sections to display on the listing page.",
        }),

        defineField({
          name: "sectionOrder",
          title: "Section Display Order",
          type: "array",
          of: [
            {
              type: "string",
              options: {
                list: [
                  { title: "Gallery Section", value: "gallery" },
                  { title: "Seller Section", value: "seller" },
                  { title: "Product Details Section", value: "product-details" },
                  { title: "Product Specifications Section", value: "specifications" },
                  { title: "Features Section", value: "features" },
                  { title: "Similar Listings Section", value: "similar-listings" },
                ],
              },
            },
          ],
          initialValue: ["gallery", "product-details", "specifications", "features", "similar-listings"],
          description: "Order in which sections appear on the page (seller section position is fixed).",
        }),

        defineField({
          name: "conditionalSections",
          title: "Conditional Section Display",
          type: "object",
          fields: [
            defineField({
              name: "hideSpecsIfEmpty",
              title: "Hide Specifications if Empty",
              type: "boolean",
              initialValue: true,
              description: "Hide specifications section if no specs are provided.",
            }),

            defineField({
              name: "hideFeaturesIfEmpty",
              title: "Hide Features if Empty",
              type: "boolean",
              initialValue: true,
              description: "Hide features section if no features are provided.",
            }),

            defineField({
              name: "hideSimilarIfNone",
              title: "Hide Similar Listings if None Found",
              type: "boolean",
              initialValue: true,
              description: "Hide similar listings section if no similar items found.",
            }),

            defineField({
              name: "showSellerSectionForOwnListings",
              title: "Show Seller Section for Own Listings",
              type: "boolean",
              initialValue: false,
              description: "Show seller section even when viewing own listings.",
            }),
          ],
          description: "Rules for when to show/hide sections.",
        }),
      ],
      description: "Configuration for which sections to display and in what order.",
    }),

    defineField({
      name: "pageMetadata",
      title: "Page Metadata",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
          description: "SEO title for the listing page (max 60 characters).",
        }),

        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
          description: "SEO description for the listing page (max 160 characters).",
        }),

        defineField({
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          options: {
            hotspot: true,
          },
          description: "Image used when sharing the listing on social media.",
        }),

        defineField({
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
          description: "Canonical URL for SEO purposes.",
        }),
      ],
      description: "SEO and social sharing metadata.",
    }),

  




    defineField({
      name: "interactionSettings",
      title: "Interaction Settings",
      type: "object",
      fields: [
        defineField({
          name: "enableBreadcrumbs",
          title: "Enable Breadcrumbs",
          type: "boolean",
          initialValue: true,
          description: "Show navigation breadcrumbs at top of page.",
        }),

        defineField({
          name: "enableBackButton",
          title: "Enable Back Button",
          type: "boolean",
          initialValue: true,
          description: "Show back button to return to search results.",
        }),

        defineField({
          name: "enableShareButton",
          title: "Enable Share Button",
          type: "boolean",
          initialValue: true,
          description: "Show button to share the listing.",
        }),

        defineField({
          name: "enableFavoriteButton",
          title: "Enable Favorite Button",
          type: "boolean",
          initialValue: true,
          description: "Show button to add listing to favorites.",
        }),

        defineField({
          name: "enablePrintButton",
          title: "Enable Print Button",
          type: "boolean",
          initialValue: false,
          description: "Show button to print the listing.",
        }),

        defineField({
          name: "enableQuickActions",
          title: "Enable Quick Actions Menu",
          type: "boolean",
          initialValue: true,
          description: "Show floating action menu with quick options.",
        }),
      ],
      description: "User interaction and navigation features.",
    }),

 
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: new Date().toISOString(),
      description: "When this page configuration was published.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      isActive: "isActive",
      enabledSections: "sectionConfiguration.enabledSections",
    },
    prepare(selection) {
      const { title, isActive, enabledSections } = selection
      const sectionCount = Array.isArray(enabledSections) ? enabledSections.length : 0

      return {
        title: title || "Main Listing Page Configuration",
        subtitle: `${isActive ? "✅ Active" : "❌ Inactive"} - ${sectionCount} sections enabled`,
        media: "📄",
      }
    },
  },
})
