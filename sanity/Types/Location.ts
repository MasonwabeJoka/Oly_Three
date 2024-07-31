import { z } from 'zod';

// GeoPoint type
const GeoPointSchema = z.object({
  _type: z.literal('geopoint'),
  lat: z.number(),
  lng: z.number(),
  alt: z.number().optional(), // Optional altitude
});

// Location type
const LocationSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  coordinates: GeoPointSchema,
  address: z.string(),
  suburb: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  postalCode: z.string(),
  // Add any additional fields as needed here
});

// Inferring the TypeScript types from the Zod schemas
export type GeoPoint = z.infer<typeof GeoPointSchema>;
export type Location = z.infer<typeof LocationSchema>;

// Exporting the schemas
export { GeoPointSchema, LocationSchema };
