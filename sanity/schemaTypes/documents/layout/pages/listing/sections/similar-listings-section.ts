import { defineType, defineField } from "sanity"

export const similarListingsSection = defineType({
  name: "similarListingsSection",
  title: "Similar Listings Section",
  type: "document",
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Similar Listings Configuration Title",
      type: "string",
      initialValue: "Similar Listings Section",
      description: "Internal title for this similar listings configuration.",
    }),

    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this similar listings section is currently active.",
    }),

    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      initialValue: "Similar Listings",
      description: "Title displayed above the similar listings.",
    }),

    defineField({
      name: "recommendationSettings",
      title: "Recommendation Settings",
      type: "object",
      fields: [
        defineField({
          name: "matchingCriteria",
          title: "Matching Criteria",
          type: "array",
          of: [
            {
              type: "string",
              options: {
                list: [
                  { title: "Same Category", value: "category" },
                  { title: "Similar Price Range", value: "price-range" },
                  { title: "Same Brand", value: "brand" },
                  { title: "Same Seller", value: "seller" },
                  { title: "Similar Tags", value: "tags" },
                  { title: "Same Location", value: "location" },
                  { title: "Similar Condition", value: "condition" },
                ],
              },
            },
          ],
          initialValue: ["category", "price-range"],
          description: "Criteria used to find similar listings.",
        }),

        defineField({
          name: "maxListings",
          title: "Maximum Listings to Show",
          type: "number",
          initialValue: 6,
          validation: (Rule) => Rule.min(2).max(20),
          description: "Maximum number of similar listings to display.",
        }),

        defineField({
          name: "priceRangeTolerance",
          title: "Price Range Tolerance (%)",
          type: "number",
          initialValue: 30,
          validation: (Rule) => Rule.min(10).max(100),
          description: "Percentage tolerance for price matching (e.g., 30% means ±30% of current price).",
        }),

        defineField({
          name: "excludeCurrentSeller",
          title: "Exclude Current Seller",
          type: "boolean",
          initialValue: false,
          description: "Exclude listings from the same seller.",
        }),

        defineField({
          name: "sortBy",
          title: "Sort Similar Listings By",
          type: "string",
          options: {
            list: [
              { title: "Relevance Score", value: "relevance" },
              { title: "Price (Low to High)", value: "price-asc" },
              { title: "Price (High to Low)", value: "price-desc" },
              { title: "Newest First", value: "date-desc" },
              { title: "Most Popular", value: "popularity" },
              { title: "Random", value: "random" },
            ],
          },
          initialValue: "relevance",
          description: "How to sort the similar listings.",
        }),
      ],
      description: "Settings for finding and ranking similar listings.",
    }),

    defineField({
      name: "displaySettings",
      title: "Display Settings",
      type: "object",
      fields: [
        defineField({
          name: "layout",
          title: "Layout Style",
          type: "string",
          options: {
            list: [
              { title: "Horizontal Carousel", value: "carousel" },
              { title: "Grid Layout", value: "grid" },
              { title: "Vertical List", value: "list" },
            ],
          },
          initialValue: "carousel",
          description: "How similar listings are displayed.",
        }),

        defineField({
          name: "itemsPerRow",
          title: "Items Per Row",
          type: "number",
          options: {
            list: [
              { title: "2 Items", value: 2 },
              { title: "3 Items", value: 3 },
              { title: "4 Items", value: 4 },
              { title: "5 Items", value: 5 },
              { title: "6 Items", value: 6 },
            ],
          },
          initialValue: 3,
          hidden: ({ parent }) => parent?.layout === "list",
          description: "Number of items to show per row.",
        }),

        defineField({
          name: "showScrollButtons",
          title: "Show Scroll Buttons",
          type: "boolean",
          initialValue: true,
          hidden: ({ parent }) => parent?.layout !== "carousel",
          description: "Display left/right scroll buttons for carousel.",
        }),

        defineField({
          name: "autoScroll",
          title: "Auto Scroll",
          type: "boolean",
          initialValue: false,
          hidden: ({ parent }) => parent?.layout !== "carousel",
          description: "Automatically scroll through listings.",
        }),

        defineField({
          name: "scrollInterval",
          title: "Auto Scroll Interval (seconds)",
          type: "number",
          initialValue: 5,
          validation: (Rule) => Rule.min(3).max(10),
          hidden: ({ parent }) => parent?.layout !== "carousel" || !parent?.autoScroll,
          description: "Time between automatic scrolls.",
        }),

        defineField({
          name: "showViewAllButton",
          title: 'Show "View All" Button',
          type: "boolean",
          initialValue: true,
          description: "Display button to view all similar listings.",
        }),

        defineField({
          name: "viewAllButtonText",
          title: "View All Button Text",
          type: "string",
          initialValue: "View All Similar Items",
          hidden: ({ parent }) => !parent?.showViewAllButton,
          description: "Text for the view all button.",
        }),
      ],
      description: "Visual display configuration.",
    }),



    defineField({
      name: "analytics",
      title: "Analytics",
      type: "object",
      fields: [
        defineField({
          name: "trackClicks",
          title: "Track Card Clicks",
          type: "boolean",
          initialValue: true,
          description: "Track when users click on similar listings.",
        }),

        defineField({
          name: "trackImpressions",
          title: "Track Impressions",
          type: "boolean",
          initialValue: true,
          description: "Track when similar listings are viewed.",
        }),

        defineField({
          name: "trackScrolling",
          title: "Track Carousel Scrolling",
          type: "boolean",
          initialValue: false,
          description: "Track carousel navigation behavior.",
        }),
      ],
      description: "Analytics and tracking configuration.",
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: new Date().toISOString(),
      description: "When this similar listings configuration was published.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      isActive: "isActive",
      sectionTitle: "sectionTitle",
      maxListings: "recommendationSettings.maxListings",
      layout: "displaySettings.layout",
    },
    prepare(selection) {
      const { title, isActive, sectionTitle, maxListings, layout } = selection

      return {
        title: title || "Similar Listings Configuration",
        subtitle: `${isActive ? "✅ Active" : "❌ Inactive"} - ${maxListings || 6} items (${layout || "carousel"})`,
        media: "🔗",
      }
    },
  },
})
