
import { z } from "zod";

export const searchFormSchema = z.object({
    searchTerm: z
      .string()
      .min(1, "Search term field cannot be empty.")
      .min(3, "Search term must be at least 3 characters long.")
      .refine((val) => val.trim().length > 0, "Search term cannot be only spaces."),
    locationSearch: z
      .string()
      .min(1, "Location field cannot be empty.")
      .min(3, "Location must be at least 3 characters long.")
      .refine((val) => val.trim().length > 0, "Location cannot be only spaces."),
  });

export const feedbackFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name field cannot be empty.")
    .min(3, "Name must be at least 3 characters long.")
    .refine((val) => val.trim().length > 0, "Name cannot be only spaces."),
  email: z
    .string()
    .min(1, "Email field cannot be empty.")
    .email("Invalid email format.")
    .refine((val) => val.trim().length > 0, "Email cannot be only spaces."),
  message: z
    .string()
    .min(1, "Message field cannot be empty.")
    .min(3, "Message must be at least 3 characters long.")
    .max(1200, "Message cannot be more than 1200 characters long.")
    .refine((val) => val.trim().length > 0, "Message cannot be only spaces."),
});

export const passwordSchema = z.object({
  oldPassword: z.string().min(8, "Password must be at least 8 characters long"),
  newPassword: z.string().min(8, "Password must be at least 8 characters long").refine((password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  }, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" }),
  reenterPassword: z.string().min(8, "Password must be at least 8 characters long")
}).refine((data) => data.newPassword === data.reenterPassword, {
  message: "Passwords don't match",
  path: ["reenterPassword"], // Set the path of the error
});

export const profileSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, apostrophes, and hyphens" }),
  
  lastName: z.string()
    .min(2, { message: "Last Name must be at least 2 characters long" })
    .max(50, { message: "Last Name must be at most 50 characters long" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Last Name can only contain letters, spaces, apostrophes, and hyphens" }),
  
  email: z.string()
    .email({ message: "Must be a valid email address" }),
  
  phone: z.string()
    .min(10, { message: "Phone number must be at least 10 digits long" })
    .max(15, { message: "Phone number must be at most 15 digits long" })
    .regex(/^[0-9]+$/, { message: "Phone number can only contain digits" }),
  
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((password) => {
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    }, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" }),
  
  socialMediaUrl: z.string()
    .url({ message: "Must be a valid URL" })
    .optional()
});




export const multiStepFormSchema = z.object({ 
  category: z.string({
    required_error: "Please select a category.",
    invalid_type_error: "Category must be a string.",
  }),

  condition: z.string({
    required_error: "Please select a condition.",
    invalid_type_error: "Condition must be a string.",
  })

  .refine((val) => val !== "" && val !== "Condition", {
    message: "Please select a valid condition.",
  }),

  selectDetail: z.string().optional(),

  detail: z.string({
    required_error: "Please select a condition.",
    invalid_type_error: "Condition must be a string.",
  }).refine((val) => val !== "", {
    message: "Please select an option.",
  }),

  moreDetails: z.string().optional(),

  editDetail: z.string().optional(),

  selectFeature: z.string().optional(),

  feature: z.string({
    required_error: "Please select a condition.",
    invalid_type_error: "Condition must be a string.",
  }).refine((val) => val !== "", {
    message: "Feature Error Message",
  }),

  price: z.number({
    required_error: "Price is required.",
    invalid_type_error: "Price must be a number.",
  }).positive({
    message: "Price must be greater than 0.",
  }),

  pricingOption: z.string({
    required_error: "Please select a pricing option.",
    invalid_type_error: "Pricing option must be a string.",
  }).refine((val) => val !== "" && val !== "Select Pricing Option", {
    message: "Please select a valid pricing option.",
  }),

  bankName: z.string({
    required_error: "Please enter a bank name.",
    invalid_type_error: "Bank name must be a string.",
  }).min(2, "Bank name must be at least 2 characters long."),

  accountName: z.string({
    required_error: "Please enter an account name.",
    invalid_type_error: "Account name must be a string.",
  }).min(2, "Account name must be at least 2 characters long."),

  accountNumber: z.string({
    required_error: "Please enter an account number.",
    invalid_type_error: "Account number must be a string.",
  }).regex(/^\d{10,}$/, "Account number must be at least 10 digits long."),

  title: z.string({
    required_error: "Title is required.",
    invalid_type_error: "Title must be a string.",
  }).min(5, "Title must be at least 5 characters long."),

  description: z
  .string()
  .max(600, "Description must be at most 600 characters long")
  .transform((val) => val.replace(/<[^>]*>?/gm, "")), // Then transform to remove HTML tags

  image: z.string().optional().refine((val) => val !== "", {
    message: "Please upload an image.",
  }),

  video: z.string().optional().refine((val) => val !== "", {
    message: "Please upload a video.",
  }),

  attachment: z.string().optional().refine((val) => val !== "", {
    message: "Please upload an attachment.",
  }),

  province: z.string({
    required_error: "Please select a province.",
    invalid_type_error: "Province must be a string.",
  }).refine((val) => val !== "Province", {
    message: "Please select a valid province.",
  }),

  city: z.string({
    required_error: "Please select a city.",
    invalid_type_error: "City must be a string.",
  }).refine((val) => val !== "City", {
    message: "Please select a valid city.",
  }),

  suburb: z.string({
    required_error: "Please select a suburb.",
    invalid_type_error: "Suburb must be a string.",
  }).refine((val) => val !== "Suburb", {
    message: "Please select a valid suburb.",
  }),

  customLocation: z.string().optional().refine((val) => val !== "", {
    message: "Please provide a custom location.",
  }),

  promotionDuration: z.string({
    required_error: "Please select a promotion duration.",
    invalid_type_error: "Promotion duration must be a string.",
  }).refine((val) => val !== "Select Duration", {
    message: "Please select a valid promotion duration.",
  }),

  "Reason for Selling": z.string().optional(),
  "Accessories Included": z.string().optional(),
  "Warranty Information": z.string().optional(),
  "Ownership": z.string().optional(),
  "Condition": z.string().optional(),
  "History": z.string().optional(),
  "Customizations": z.string().optional(),
  "Maintenance History": z.string().optional(),
  "Compatibility": z.string().optional(),
  "Original Packaging": z.string().optional(),
  "Usage History": z.string().optional(),
  "Storage": z.string().optional(),
  "Original Purchase Date": z.string().optional(),
  "Upgrades": z.string().optional(),
  "Additional Features": z.string().optional(),
  "Service Records": z.string().optional(),
  "User Manual Availability": z.string().optional(),
  "Manufacturer Support": z.string().optional(),
  "Compatibility with Accessories": z.string().optional(),
  "Packaging Condition": z.string().optional(),
  "Product History": z.string().optional(),
  "Transferability": z.string().optional(),
  "Pet/Smoke Exposure": z.string().optional(),
  "Regulatory Compliance": z.string().optional(),
  "Special Features": z.string().optional(),
  "Documentation": z.string().optional(),
  "Certification": z.string().optional(),
  "Age": z.string().optional(),
  "Environmental Impact": z.string().optional(),
  "Known Issues": z.string().optional(),
  "Define Your Own Detail": z.string().optional(),
});


