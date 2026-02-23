import { defineType, defineField } from "sanity"

export const sellerSection = defineType({
  name: "sellerSection",
  title: "Seller Section",
  type: "document",
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Seller Configuration Title",
      type: "string",
      initialValue: "Listing Seller Section",
      description: "Internal title for this seller configuration.",
    }),

    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this seller section is currently active.",
    }),

    defineField({
      name: "sellerInfo",
      title: "Seller Information",
      type: "object",
      fields: [
        defineField({
          name: "displayName",
          title: "Display Name",
          type: "string",
          validation: (Rule) => Rule.required(),
          description: "Seller name displayed to users.",
        }),

        defineField({
          name: "profileImage",
          title: "Profile Image",
          type: "image",
          options: {
            hotspot: true,
            metadata: ["blurhash", "lqip", "palette"],
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Alternative text for accessibility.",
            }),
          ],
          description: "Seller profile photo.",
        }),

        defineField({
          name: "contactNumber",
          title: "Contact Number",
          type: "string",
          description: "Phone number displayed to users.",
        }),

        defineField({
          name: "onlineStatus",
          title: "Show Online Status",
          type: "boolean",
          initialValue: true,
          description: "Display online/offline indicator.",
        }),

        defineField({
          name: "verificationBadge",
          title: "Show Verification Badge",
          type: "boolean",
          initialValue: false,
          description: "Display verification checkmark.",
        }),

        defineField({
          name: "sellerRating",
          title: "Seller Rating",
          type: "number",
          validation: (Rule) => Rule.min(0).max(5),
          description: "Seller rating out of 5 stars.",
        }),

        defineField({
          name: "totalSales",
          title: "Total Sales Count",
          type: "number",
          description: "Number of completed sales.",
        }),
      ],
      description: "Basic seller information and credentials.",
    }),

    defineField({
      name: "actionButtons",
      title: "Action Buttons",
      type: "object",
      fields: [
        defineField({
          name: "showChatButton",
          title: "Show Chat Button",
          type: "boolean",
          initialValue: true,
          description: "Display chat/message button.",
        }),

        defineField({
          name: "chatButtonText",
          title: "Chat Button Text",
          type: "string",
          initialValue: "Chat",
          hidden: ({ parent }) => !parent?.showChatButton,
          description: "Text for the chat button.",
        }),

        defineField({
          name: "showFollowButton",
          title: "Show Follow Button",
          type: "boolean",
          initialValue: true,
          description: "Display follow/unfollow button.",
        }),

        defineField({
          name: "followButtonText",
          title: "Follow Button Text",
          type: "string",
          initialValue: "Follow",
          hidden: ({ parent }) => !parent?.showFollowButton,
          description: "Text for the follow button.",
        }),

        defineField({
          name: "showShopButton",
          title: "Show Shop Button",
          type: "boolean",
          initialValue: true,
          description: "Display link to seller shop.",
        }),

        defineField({
          name: "shopButtonText",
          title: "Shop Button Text",
          type: "string",
          initialValue: "Shop",
          hidden: ({ parent }) => !parent?.showShopButton,
          description: "Text for the shop button.",
        }),

        defineField({
          name: "buttonStyle",
          title: "Button Style",
          type: "string",
          options: {
            list: [
              { title: "Primary (Filled)", value: "primary" },
              { title: "Secondary (Outlined)", value: "secondary" },
              { title: "Ghost (Text Only)", value: "ghost" },
            ],
          },
          initialValue: "primary",
          description: "Visual style for action buttons.",
        }),
      ],
      description: "Configuration for seller action buttons.",
    }),

    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        defineField({
          name: "showSocialLinks",
          title: "Show Social Links",
          type: "boolean",
          initialValue: true,
          description: "Display social media icons.",
        }),

        defineField({
          name: "facebookUrl",
          title: "Facebook URL",
          type: "url",
          hidden: ({ parent }) => !parent?.showSocialLinks,
          description: "Facebook profile or page URL.",
        }),

        defineField({
          name: "instagramUrl",
          title: "Instagram URL",
          type: "url",
          hidden: ({ parent }) => !parent?.showSocialLinks,
          description: "Instagram profile URL.",
        }),

        defineField({
          name: "twitterUrl",
          title: "Twitter/X URL",
          type: "url",
          hidden: ({ parent }) => !parent?.showSocialLinks,
          description: "Twitter/X profile URL.",
        }),

        defineField({
          name: "youtubeUrl",
          title: "YouTube URL",
          type: "url",
          hidden: ({ parent }) => !parent?.showSocialLinks,
          description: "YouTube channel URL.",
        }),

        defineField({
          name: "socialIconStyle",
          title: "Social Icon Style",
          type: "string",
          options: {
            list: [
              { title: "Outlined", value: "outlined" },
              { title: "Filled", value: "filled" },
              { title: "Minimal", value: "minimal" },
            ],
          },
          initialValue: "outlined",
          hidden: ({ parent }) => !parent?.showSocialLinks,
          description: "Visual style for social media icons.",
        }),
      ],
      description: "Social media links and display options.",
    }),

    defineField({
      name: "reportListing",
      title: "Report Listing",
      type: "object",
      fields: [
        defineField({
          name: "showReportButton",
          title: "Show Report Button",
          type: "boolean",
          initialValue: true,
          description: "Display report listing option.",
        }),

        defineField({
          name: "reportButtonText",
          title: "Report Button Text",
          type: "string",
          initialValue: "Report Ad",
          hidden: ({ parent }) => !parent?.showReportButton,
          description: "Text for the report button.",
        }),

        defineField({
          name: "reportButtonPosition",
          title: "Report Button Position",
          type: "string",
          options: {
            list: [
              { title: "Bottom of Seller Section", value: "bottom" },
              { title: "Below Social Links", value: "below-social" },
              { title: "Separate Section", value: "separate" },
            ],
          },
          initialValue: "bottom",
          hidden: ({ parent }) => !parent?.showReportButton,
          description: "Position of the report button.",
        }),
      ],
      description: "Report listing functionality.",
    }),

 

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: new Date().toISOString(),
      description: "When this seller configuration was published.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      isActive: "isActive",
      sellerName: "sellerInfo.displayName",
      showChat: "actionButtons.showChatButton",
      showFollow: "actionButtons.showFollowButton",
    },
    prepare(selection) {
      const { title, isActive, sellerName, showChat, showFollow } = selection
      const buttonsCount = [showChat, showFollow].filter(Boolean).length

      return {
        title: title || "Seller Configuration",
        subtitle: `${isActive ? "✅ Active" : "❌ Inactive"} - ${sellerName || "No seller"} (${buttonsCount} buttons)`,
        media: "👤",
      }
    },
  },
})
