import { z } from 'zod';

// Define the schema for Reference
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Define the schema for Image
const ImageSchema = z.object({
  _type: z.literal('image'),
  asset: ReferenceSchema,
  hotspot: z
    .object({
      x: z.number().optional(),
      y: z.number().optional(),
      height: z.number().optional(),
      width: z.number().optional(),
    })
    .optional(), // Optional hotspot data
});

// Define the schema for File
const FileSchema = z.object({
  _type: z.literal('file'),
  asset: ReferenceSchema,
  // Include additional file properties as necessary
});

// Define the schema for Upload
const UploadSchema = z.object({
  _id: z.string(),
  _createdAt: z.string().transform((dateString) => new Date(dateString)), // Transform string to Date object
  image: ImageSchema.optional(), // Optional, for image file
  video: FileSchema.optional(), // Optional, for video file
  attachment: FileSchema.optional(), // Optional, for general file attachments
  file: FileSchema, // General file uploaded by the user
  description: z.string(), // Brief description of the upload
  uploadedBy: ReferenceSchema, // Reference to a 'user' document
  uploadDate: z.string(), // Date in ISO format
  tags: z.array(z.string()), // Array of strings for tags
  preview: ImageSchema.optional(), // Optional, preview image or thumbnail
  // Include any other fields as needed
});

// Infer TypeScript types from Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type File = z.infer<typeof FileSchema>;
export type Upload = z.infer<typeof UploadSchema>;

// Export schemas
export {
  ReferenceSchema,
  ImageSchema,
  FileSchema,
  UploadSchema,
};
