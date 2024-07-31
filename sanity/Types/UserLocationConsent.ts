import { z } from 'zod';
import { PortableTextBlockSchema } from './PortableTextBlock'; // Assuming you have this schema

// Reference schema
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// UserLocationConsent schema
const UserLocationConsentSchema = z.object({
  _id: z.string(),
  _createdAt: z.string().transform(date => new Date(date)), // Transform string to Date object
  userId: ReferenceSchema, // Reference to a 'user' document
  consentGiven: z.boolean(), // Indicates if the user has given consent
  consentTimestamp: z.string(), // Date in ISO format
  consentDetails: z.array(PortableTextBlockSchema), // Details about the consent in Portable Text format
  // Include any other fields as needed
});

// Export the schema and inferred type
export { UserLocationConsentSchema };

// Define and export the inferred TypeScript type
type UserLocationConsent = z.infer<typeof UserLocationConsentSchema>;
export type { UserLocationConsent };
