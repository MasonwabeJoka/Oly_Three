import { z } from 'zod';
import { PortableTextBlockSchema } from './PortableTextBlock';

// Project type
const ProjectSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
  url: z.string().url(),
  content: z.array(PortableTextBlockSchema), // Using PortableTextBlockSchema
});

// Inferring the TypeScript type from the Zod schema
export type Project = z.infer<typeof ProjectSchema>;

// Exporting the schema
export { ProjectSchema };
