import { z } from 'zod';

// Define the schema for the icon field
const IconSchema = z.object({
  _type: z.literal('image'),
  asset: z.object({
    _ref: z.string(), // Reference to the image asset
  }),
  hotspot: z.object({
    x: z.number(),
    y: z.number(),
    height: z.number(),
    width: z.number(),
  }).optional(), // Optional hotspot data
});

// Define the schema for the SocialMediaLink
const SocialMediaLinkSchema = z.object({
  platform: z.string(), // Name of the social media platform
  url: z.string().url(), // URL to the social media profile
  icon: IconSchema.optional(), // Optional field for the image
});

// Infer TypeScript types from Zod schema
export type Icon = z.infer<typeof IconSchema>;
export type SocialMediaLink = z.infer<typeof SocialMediaLinkSchema>;

// Export schemas
export { IconSchema, SocialMediaLinkSchema };
