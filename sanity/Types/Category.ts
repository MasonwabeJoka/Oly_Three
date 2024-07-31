import { z } from 'zod';
import { PortableTextBlockSchema } from "./PortableTextBlock"; 
// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Slug type
const SlugSchema = z.object({
  _type: z.literal('slug'),
  current: z.string(),
});

// ForegroundColour type
const ForegroundColourSchema = z.object({
  foreground: z.string(),
});

// Category type
const CategorySchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  slug: SlugSchema,
  title: z.string(),
  description: z.array(PortableTextBlockSchema),
  nickName: z.string().optional(),
  mainCategory: z.string().optional(),
  parentCategory: z.lazy(() => CategorySchema).optional(), // Recursive definition
  childrenCategories: z.array(z.lazy(() => CategorySchema)).optional(), // Recursive definition
  order: z.number().optional(),
  breadCrumbs: z.array(z.string()).optional(),
  featured: z.boolean(),
  displayOrder: z.number().optional(),
  image: z.object({
    _type: z.literal('image'),
    asset: ReferenceSchema,
  }).optional(),
  foreground: ForegroundColourSchema.optional(),
  icon: z.string().optional(),
  creationDate: z.string().date(), // Date in ISO format
  lastUpdated: z.string().date(), // Date in ISO format
  createdBy: ReferenceSchema,
  seoTitle: z.array(PortableTextBlockSchema).optional(),
  seoDescription: z.array(PortableTextBlockSchema).optional(),
  relatedCategories: z.array(ReferenceSchema).optional(),
  keywords: z.array(z.string()).optional(),
  visibility: z.enum(['public', 'private']),
  audience: z.string().optional(),
  geographicalFocus: z.string().optional(),
  averageDailyViews: z.number().optional(),
  subscriberCount: z.number().optional(),
  accessRestrictions: z.array(z.string()).optional(),
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type Slug = z.infer<typeof SlugSchema>;
export type ForegroundColour = z.infer<typeof ForegroundColourSchema>;
export type Category = z.infer<typeof CategorySchema>;

// Exporting the schemas
export { ReferenceSchema, SlugSchema, ForegroundColourSchema, CategorySchema };
