import { z } from 'zod';
import { PortableTextBlockSchema } from "./PortableTextBlock"; // Assuming PortableTextBlockSchema is defined and exported in this file

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// AuditEntry type
const AuditEntrySchema = z.object({
  actionDate: z.string().date(), // Date in ISO format
  action: z.string(),
  actionBy: ReferenceSchema,
  comments: z.array(PortableTextBlockSchema), // Assuming the comments are in Portable Text format
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type AuditEntry = z.infer<typeof AuditEntrySchema>;

// Exporting the schemas
export { ReferenceSchema, AuditEntrySchema };
