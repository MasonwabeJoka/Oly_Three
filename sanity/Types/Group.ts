import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

export type Group = {
    _id: string;
    _createdAt: Date;
    title: string;
    description: PortableTextBlock[]; // Assuming the description is in Portable Text format
    category: string;
    members: Reference[]; // Array of references to 'user' documents
    createdBy: Reference; // Reference to a 'user' document
    createdAt: string; // Date in ISO format
    updatedAt: string; // Date in ISO format
    isActive: boolean;
};
import { z } from 'zod';
import { PortableTextBlockSchema } from "./PortableTextBlock"; // Assuming PortableTextBlockSchema is defined and exported in this file

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Group type
const GroupSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  title: z.string(),
  description: z.array(PortableTextBlockSchema), // Assuming the description is in Portable Text format
  category: z.string(),
  members: z.array(ReferenceSchema), // Array of references to 'user' documents
  createdBy: ReferenceSchema, // Reference to a 'user' document
  createdAt: z.string().date(), // Date in ISO format
  updatedAt: z.string().date(), // Date in ISO format
  isActive: z.boolean(),
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type Group = z.infer<typeof GroupSchema>;

// Exporting the schemas
export { ReferenceSchema, GroupSchema };
