import { z } from 'zod';

// Define the schema for the entire FormData structure
const formDataSchema = z.object({
  // Required in step1, so treat as required non-empty string
  selectACategory: z.string().min(1, { message: "Please select a category" }),

  // Details section
  details: z.object({
    condition: z.string().min(1, { message: "Condition is required" }),
  }),

  // Price section
  price: z.object({
    pricingOption: z.string().min(1, { message: "Pricing option is required" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
  }),

  // Create Account section
  createAccount: z.object({
    bankName: z.string().min(1, { message: "Bank name is required" }),
    accountHolder: z.string().min(1, { message: "Account holder name is required" }),
    accountNumber: z.string().min(1, { message: "Account number is required" }),
  }),

  // Title and Description section
  titleAndDescription: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
  }),

  // Upload Media section (booleans, no additional constraints)
  uploadMedia: z.object({
    uploadPhotos: z.boolean(),
    uploadVideos: z.boolean(),
    uploadAttachments: z.boolean(),
  }),

  // Location section
  location: z.object({
    province: z.string().min(1, { message: "Province is required" }),
    city: z.string().min(1, { message: "City is required" }),
    suburb: z.string().min(1, { message: "Suburb is required" }),
    customLocation: z.string().optional(),
  }),

  // Promote Your Ad section
  promoteYourAd: z.object({
    promotionDuration: z.string().min(1, { message: "Promotion duration is required" }),
  }),

  // Optional review field
  reviewYourAd: z.string().optional(),
});

// Export the inferred TypeScript type for use in your form
export type FormDataSchema = z.infer<typeof formDataSchema>;

// Export the schema for use with React Hook Form
export { formDataSchema };