import { defineType, defineField } from "sanity"

export const articlePage = defineType({
  name: "articlePage",
  title: "Article Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Article Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
      description: "Main title of the article (max 100 characters).",
    }),

    defineField({
      name: "slug",
      title: "Article Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "URL-friendly version of the title.",
    }),

    defineField({
      name: "excerpt",
      title: "Article Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
      description: "Brief summary of the article (max 200 characters).",
    }),

    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "heroImage",
          title: "Hero Image",
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
              description: "Alternative text for the hero image.",
            }),
            defineField({
              name: "caption",
              title: "Image Caption",
              type: "string",
              description: "Optional caption for the hero image.",
            }),
          ],
          validation: (Rule) => Rule.required(),
          description: "Main hero image for the article.",
        }),

        defineField({
          name: "heroOverlay",
          title: "Hero Overlay",
          type: "object",
          fields: [
            defineField({
              name: "showOverlay",
              title: "Show Text Overlay",
              type: "boolean",
              initialValue: true,
              description: "Display text overlay on hero image.",
            }),
            defineField({
              name: "overlayText",
              title: "Overlay Text",
              type: "string",
              hidden: ({ parent }) => !parent?.showOverlay,
              description: "Text to display over the hero image.",
            }),
            defineField({
              name: "overlayPosition",
              title: "Overlay Position",
              type: "string",
              options: {
                list: [
                  { title: "Top Left", value: "top-left" },
                  { title: "Top Center", value: "top-center" },
                  { title: "Top Right", value: "top-right" },
                  { title: "Center Left", value: "center-left" },
                  { title: "Center", value: "center" },
                  { title: "Center Right", value: "center-right" },
                  { title: "Bottom Left", value: "bottom-left" },
                  { title: "Bottom Center", value: "bottom-center" },
                  { title: "Bottom Right", value: "bottom-right" },
                ],
              },
              initialValue: "center",
              hidden: ({ parent }) => !parent?.showOverlay,
              description: "Position of the overlay text.",
            }),
          ],
          description: "Hero image overlay settings.",
        }),
      ],
      description: "Hero section configuration.",
    }),

    defineField({
      name: "articleMeta",
      title: "Article Metadata",
      type: "object",
      fields: [
        defineField({
          name: "author",
          title: "Author",
          type: "reference",
          to: [{ type: "author" }],
          validation: (Rule) => Rule.required(),
          description: "Author of the article.",
        }),

        defineField({
          name: "publishedAt",
          title: "Published Date",
          type: "datetime",
          validation: (Rule) => Rule.required(),
          description: "When the article was published.",
        }),

        defineField({
          name: "updatedAt",
          title: "Last Updated",
          type: "datetime",
          description: "When the article was last updated.",
        }),

        defineField({
          name: "readingTime",
          title: "Reading Time (minutes)",
          type: "number",
          validation: (Rule) => Rule.min(1).max(60),
          description: "Estimated reading time in minutes.",
        }),

        defineField({
          name: "category",
          title: "Article Category",
          type: "reference",
          to: [{ type: "articleCategory" }],
          validation: (Rule) => Rule.required(),
          description: "Primary category for this article.",
        }),

        defineField({
          name: "tags",
          title: "Tags",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
          validation: (Rule) => Rule.max(10),
          description: "Tags for the article (max 10).",
        }),
      ],
      description: "Article metadata and publishing information.",
    }),

    defineField({
      name: "content",
      title: "Article Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                  {
                    title: "Open in new tab",
                    name: "blank",
                    type: "boolean",
                  },
                ],
              },
            ],
          },
        },
        {
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
              description: "Alternative text for the image.",
            }),
            defineField({
              name: "caption",
              title: "Image Caption",
              type: "string",
              description: "Caption displayed below the image.",
            }),
            defineField({
              name: "imageSize",
              title: "Image Size",
              type: "string",
              options: {
                list: [
                  { title: "Small", value: "small" },
                  { title: "Medium", value: "medium" },
                  { title: "Large", value: "large" },
                  { title: "Full Width", value: "full" },
                ],
              },
              initialValue: "large",
              description: "Size of the image in the article.",
            }),
          ],
        },
        // Re-embedded Code Block
        defineField({
          name: "codeBlock",
          title: "Code Block",
          type: "object",
          fields: [
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  { title: "JavaScript", value: "javascript" },
                  { title: "TypeScript", value: "typescript" },
                  { title: "HTML", value: "html" },
                  { title: "CSS", value: "css" },
                  { title: "Python", value: "python" },
                  { title: "JSON", value: "json" },
                  { title: "Bash", value: "bash" },
                  { title: "Markdown", value: "markdown" },
                  { title: "SQL", value: "sql" },
                  { title: "PHP", value: "php" },
                  { title: "Ruby", value: "ruby" },
                  { title: "Java", value: "java" },
                  { title: "C#", value: "csharp" },
                  { title: "Go", value: "go" },
                ],
              },
              description: "Programming language for syntax highlighting.",
            }),
            defineField({
              name: "code",
              title: "Code",
              type: "text",
              rows: 10,
              validation: (Rule) => Rule.required(),
              description: "The code content.",
            }),
            defineField({
              name: "filename",
              title: "Filename",
              type: "string",
              description: "Optional filename to display above the code block.",
            }),
            defineField({
              name: "highlightedLines",
              title: "Highlighted Lines",
              type: "array",
              of: [{ type: "number" }],
              description: "Optional: List of line numbers to highlight (e.g., [1, 5-7]).",
            }),
          ],
        }),
        // Re-embedded Callout Box
        defineField({
          name: "calloutBox",
          title: "Callout Box",
          type: "object",
          fields: [
            defineField({
              name: "type",
              title: "Callout Type",
              type: "string",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Success", value: "success" },
                  { title: "Error", value: "error" },
                  { title: "Note", value: "note" },
                ],
              },
              initialValue: "info",
              description: "Type of callout box (e.g., info, warning, success).",
            }),
            defineField({
              name: "title",
              title: "Callout Title",
              type: "string",
              description: "Optional title for the callout box.",
            }),
            defineField({
              name: "content",
              title: "Callout Content",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [],
                  marks: {
                    decorators: [
                      { title: "Strong", value: "strong" },
                      { title: "Emphasis", value: "em" },
                    ],
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
              description: "Main content of the callout box.",
            }),
            defineField({
              name: "icon",
              title: "Custom Icon",
              type: "image",
              description: "Optional custom icon for the callout box.",
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
      description: "Main content of the article.",
    }),

    defineField({
      name: "sidebarConfig",
      title: "Sidebar Configuration",
      type: "reference",
      to: [{ type: "articleSidebar" }],
      description: "Reference to the article sidebar configuration.",
    }),

    defineField({
      name: "commentsConfig",
      title: "Comments Configuration",
      type: "reference",
      to: [{ type: "commentsSection" }],
      description: "Reference to the comments system configuration.",
    }),

    defineField({
      name: "seoSettings",
      title: "SEO Settings",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
          description: "SEO title for the article (max 60 characters). Defaults to article title if empty.",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
          description: "SEO description for the article (max 160 characters). Defaults to excerpt if empty.",
        }),
        defineField({
          name: "focusKeyword",
          title: "Focus Keyword",
          type: "string",
          description: "Primary keyword for SEO optimization.",
        }),
        defineField({
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
          description: "Canonical URL if this article was originally published elsewhere.",
        }),
        defineField({
          name: "noIndex",
          title: "No Index",
          type: "boolean",
          initialValue: false,
          description: "Prevent search engines from indexing this article.",
        }),
      ],
      description: "SEO settings for the article.",
    }),

    defineField({
      name: "socialSharing",
      title: "Social Sharing",
      type: "object",
      fields: [
        defineField({
          name: "enableSharing",
          title: "Enable Social Sharing",
          type: "boolean",
          initialValue: true,
          description: "Show social sharing buttons.",
        }),
        defineField({
          name: "shareImage",
          title: "Social Share Image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          description: "Custom image for social media sharing. Defaults to hero image if empty.",
        }),
        defineField({
          name: "shareTitle",
          title: "Social Share Title",
          type: "string",
          description: "Custom title for social sharing. Defaults to article title if empty.",
        }),
        defineField({
          name: "shareDescription",
          title: "Social Share Description",
          type: "text",
          rows: 2,
          description: "Custom description for social sharing. Defaults to excerpt if empty.",
        }),
      ],
      description: "Social media sharing configuration.",
    }),

    defineField({
      name: "publishStatus",
      title: "Publish Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Scheduled", value: "scheduled" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "draft",
      description: "Current status of the article.",
    }),

    defineField({
      name: "scheduledPublishAt",
      title: "Scheduled Publish Date",
      type: "datetime",
      hidden: ({ document }) => document?.publishStatus !== "scheduled",
      description: "When to automatically publish this article.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "articleMeta.author.name",
      media: "heroSection.heroImage",
      publishStatus: "publishStatus",
      publishedAt: "articleMeta.publishedAt",
    },
    prepare(selection) {
      const { title, author, media, publishStatus, publishedAt } = selection
      const publishDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : "Not set"

      return {
        title: title || "Untitled Article",
        subtitle: `${publishStatus} - By ${author || "Unknown"} - ${publishDate}`,
        media: media,
      }
    },
  },
})
