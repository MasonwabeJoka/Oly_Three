import { z } from 'zod';

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// LocationEntry type
const LocationEntrySchema = z.object({
  location: ReferenceSchema, // Reference to a 'location' document
  timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date format",
  }), // Date in ISO format
});

// LocationHistory type
const LocationHistorySchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  userId: ReferenceSchema, // Reference to a 'user' document
  locations: z.array(LocationEntrySchema), // Array of location entries
  // Add any additional fields as needed here
});

// Inferring the TypeScript types from the Zod schemas
export type Reference = z.infer<typeof ReferenceSchema>;
export type LocationEntry = z.infer<typeof LocationEntrySchema>;
export type LocationHistory = z.infer<typeof LocationHistorySchema>;

// Exporting the schemas
export { ReferenceSchema, LocationEntrySchema, LocationHistorySchema };
