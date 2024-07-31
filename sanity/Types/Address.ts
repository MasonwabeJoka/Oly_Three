import { z } from 'zod';
import { PortableTextBlockSchema } from "./PortableTextBlock";

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// GeoPoint type
const GeoPointSchema = z.object({
  _type: z.literal('geopoint'),
  lat: z.number(),
  lng: z.number(),
  alt: z.number().optional(),
  // Include additional fields if needed
});

// Address type
const AddressSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  isBillingAddress: z.boolean(),           
  isShippingAddress: z.boolean(),
  userId: ReferenceSchema,
  additionalInfo: z.array(PortableTextBlockSchema).optional(),
  location: GeoPointSchema.optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  // Add any other relevant fields as needed
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type GeoPoint = z.infer<typeof GeoPointSchema>;
export type PortableTextBlock = z.infer<typeof PortableTextBlockSchema>;
export type Address = z.infer<typeof AddressSchema>;

// Exporting the schemas
export { ReferenceSchema, GeoPointSchema, AddressSchema };
