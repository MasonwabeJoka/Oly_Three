import { z } from 'zod';
import { PortableTextBlockSchema } from './PortableTextBlock'; // Import PortableTextBlock schema

// Define the Image schema
const ImageSchema = z.object({
  _type: z.literal('image'),
  asset: z.object({
    _ref: z.string(),
    _type: z.literal('reference'),
  }),
  hotspot: z.any().optional(), // Define as per your requirements
});

// Define the Slide schema
const SlideSchema = z.object({
  image: ImageSchema,
  text: z.array(PortableTextBlockSchema), // Text content in Portable Text format
  // Include any other fields as needed
});

// Inferring the TypeScript type from the Zod schema
export type Slide = z.infer<typeof SlideSchema>;

// Exporting the schema
export { SlideSchema };
