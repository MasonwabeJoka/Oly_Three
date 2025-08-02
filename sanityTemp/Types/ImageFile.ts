import { z } from 'zod';

// ImageAsset type
const ImageAssetSchema = z.object({
  _ref: z.string(),
});

// ImageFile type
const ImageFileSchema = z.object({
  _id: z.string(),
  user: z.object({
    _ref: z.string(),
  }).optional(),
  image: z.object({
    alt: z.string().optional(),
    url: z.string(),
    aspectRatio: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    originalFilename: z.string().optional(),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }),
});

// Inferring the TypeScript types from the Zod schemas
export type ImageAsset = z.infer<typeof ImageAssetSchema>;
export type ImageFile = z.infer<typeof ImageFileSchema>;

// Exporting the schemas
export { ImageAssetSchema, ImageFileSchema };
