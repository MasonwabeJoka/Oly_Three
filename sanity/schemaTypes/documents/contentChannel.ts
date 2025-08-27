import { defineType, defineField } from 'sanity'

export const contentChannel = defineType({
  name: 'contentChannel',
  title: 'Content Channel',
  type: 'document',
  fields: [
    defineField({
      name: 'channelName',
      title: 'Channel Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'channelName', maxLength: 96 },
    }),
    defineField({
      name: 'owner',
      title: 'Owner',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Channel Type',
      type: 'string',
      options: {
        list: [
          { title: 'Blog', value: 'blog' },
          { title: 'News/Media', value: 'news' },
          { title: 'Influencer/Personal', value: 'influencer' },
          { title: 'Podcast', value: 'podcast' },
          { title: 'Video', value: 'video' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),
    defineField({
      name: 'followers',
      title: 'Followers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'user' }] }],
    }),
    defineField({
      name: 'followersCount',
      title: 'Followers Count',
      type: 'number',
      readOnly: true,
    }),
    // defineField({
    //   name: 'samplePosts',
    //   title: 'Sample Posts',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'post' }] }],
    // }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})