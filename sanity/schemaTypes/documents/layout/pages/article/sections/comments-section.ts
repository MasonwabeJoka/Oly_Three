import { defineType, defineField } from "sanity"

export const commentsSection = defineType({
  name: "commentsSection",
  title: "Comments Section Configuration",
  type: "document", // Or 'object' if it's always embedded, but 'document' allows standalone management
  fields: [
    defineField({
      name: "title",
      title: "Configuration Title",
      type: "string",
      initialValue: "Default Comments Configuration",
      description: "Internal title for this comments configuration.",
    }),
    defineField({
      name: "enableComments",
      title: "Enable Comments",
      type: "boolean",
      initialValue: true,
      description: "Allow comments on articles using this configuration.",
    }),
    defineField({
      name: "commentSystem",
      title: "Comment System",
      type: "string",
      options: {
        list: [
          { title: "Built-in Comments", value: "builtin" },
          { title: "Disqus", value: "disqus" },
          { title: "Facebook Comments", value: "facebook" },
          { title: "Custom System", value: "custom" },
        ],
      },
      initialValue: "builtin",
      hidden: ({ parent }) => !parent?.enableComments,
      description: "Which comment system to use for articles.",
    }),
    defineField({
      name: "moderateComments",
      title: "Moderate Comments",
      type: "boolean",
      initialValue: true,
      hidden: ({ parent }) => !parent?.enableComments,
      description: "Require approval before comments are published.",
    }),
    defineField({
      name: "allowGuestComments",
      title: "Allow Guest Comments",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => !parent?.enableComments,
      description: "Allow comments from non-registered users.",
    }),
    defineField({
      name: "disqusShortname",
      title: "Disqus Shortname",
      type: "string",
      hidden: ({ parent }) => parent?.commentSystem !== "disqus" || !parent?.enableComments,
      description: "Your Disqus shortname for integration.",
    }),
    defineField({
      name: "facebookAppId",
      title: "Facebook App ID",
      type: "string",
      hidden: ({ parent }) => parent?.commentSystem !== "facebook" || !parent?.enableComments,
      description: "Your Facebook App ID for integration.",
    }),
    defineField({
      name: "customSystemEndpoint",
      title: "Custom System API Endpoint",
      type: "url",
      hidden: ({ parent }) => parent?.commentSystem !== "custom" || !parent?.enableComments,
      description: "API endpoint for your custom comment system.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      enableComments: "enableComments",
      commentSystem: "commentSystem",
    },
    prepare(selection) {
      const { title, enableComments, commentSystem } = selection
      return {
        title: title || "Comments Configuration",
        subtitle: enableComments ? `Enabled (${commentSystem})` : "Disabled",
      }
    },
  },
})
