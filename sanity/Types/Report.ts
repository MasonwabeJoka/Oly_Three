import { z } from 'zod';
import { PortableTextBlockSchema } from './PortableTextBlock'; // Import PortableTextBlock schema

// Define the Reference schema
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Define the Report schema
const ReportSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  reportedBy: ReferenceSchema, // Reference to a 'user' document
  reportedUser: ReferenceSchema, // Reference to a 'user' document
  reason: z.array(PortableTextBlockSchema), // Reason for the report, in Portable Text format
  details: z.array(PortableTextBlockSchema), // Additional details, in Portable Text format
  createdAt: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }), // Date in ISO format
});

// Inferring the TypeScript type from the Zod schema
export type Report = z.infer<typeof ReportSchema>;

// Exporting the schema
export { ReportSchema };
