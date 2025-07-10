import { z } from 'zod';

const formDataSchema = z.object({
category: z.object({
  main: z.string(), // Allow empty initially
  subcategory: z.string(), // Allow empty initially
}).refine((data) => data.main !== "" && data.subcategory !== "", {
  message: "Both main category and subcategory are required",
  path: ["category"], // Trigger at the category level
}),

  // Details section
  details: z.object({
    condition: z.string().min(1, { message: "Condition is required" }),
  }),
  // Price section
  price: z.object({
    pricingOption: z.string().min(1, { message: "Pricing option is required" }),
    amount: z.number().positive({ message: "Price must be a positive number" }),
    startingPrice: z.number().positive({ message: "Starting price must be a positive number" }).optional(),
    buyNowPrice: z.number().positive({ message: "Buy Now price must be a positive number" }).optional(),
    startTime: z.string().optional(),
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
    promotionDuration: z.string().optional(),
  }),
  // Optional review field
  reviewYourAd: z.string().optional(),
});

// Export the inferred TypeScript type for use in your form
export type FormDataSchema = z.infer<typeof formDataSchema>;

// Export the schema for use with React Hook Form
export { formDataSchema };