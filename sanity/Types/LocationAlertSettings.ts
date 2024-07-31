import { z } from 'zod';

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// LocationAlertSettings type
const LocationAlertSettingsSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  userId: ReferenceSchema, // Reference to a 'user' document
  alertLocations: z.array(ReferenceSchema), // Array of references to 'location' documents
  alertTypes: z.array(z.string()), // Array of strings representing alert types
  // Add any additional fields as needed here
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type LocationAlertSettings = z.infer<typeof LocationAlertSettingsSchema>;

// Exporting the schemas
export { ReferenceSchema, LocationAlertSettingsSchema };
