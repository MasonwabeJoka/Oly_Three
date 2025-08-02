
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
    categories: z.string().optional(), 
  });

export const feedbackFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  attachment: z.any().optional() // Add this line for file attachments
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
  avatarFile: z.instanceof(File).optional(),
  name: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" })
    .max(15, { message: "Phone number must be at most 15 digits long" })
    .regex(/^[0-9]+$/, { message: "Phone number can only contain digits" })
    .optional()
    .or(z.literal("")),
  socialMediaName: z.string().optional().or(z.literal("")),
  socialMediaUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
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
  
// `z.coerce.number` allows Zod to automatically convert string inputs to numbers.
  price: z.coerce.number({
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

  startingPrice: z.coerce.number({
    required_error: "Starting price is required.",
    invalid_type_error: "Starting price must be a number.",
  }).nonnegative({
    message: "Starting price must be 0 or greater.",
  }),

  reservePrice: z.coerce.number({
    required_error: "Reserve price is required.",
    invalid_type_error: "Reserve price must be a number.",
  }).nonnegative({
    message: "Reserve price must be 0 or greater.",
  }).optional(),

  buyNowPrice: z.coerce.number({
    required_error: "Buy Now price is required.",
    invalid_type_error: "Buy Now price must be a number.",
  }).positive({
    message: "Buy Now price must be greater than 0.",
  }).optional(),

  bidIncrement: z.coerce.number({
    required_error: "Bid increment is required.",
    invalid_type_error: "Bid increment must be a number.",
  }).positive({
    message: "Bid increment must be greater than 0.",
  }),

  startTime: z.coerce.date({
    required_error: "Start time is required.",
    invalid_type_error: "Start time must be a valid date and time.",
  }).min(new Date(), {
    message: "Start time must be in the future.",
  }),

  endTime: z.string({
    required_error: "End time is required.",
    invalid_type_error: "End time must be a string.",
  }).refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, {
    message: "End time must be a valid date and time.",
  }),

  bankName: z.string({
    required_error: "Please enter a bank name.",
    invalid_type_error: "Bank name must be a string.",
  }).min(2, "Bank name must be at least 2 characters long."),

  accountHolder: z.string({
    required_error: "Please enter an account name.",
    invalid_type_error: "Account holder name must be a string.",
  }).min(2, "Account holder name must be at least 2 characters long."),

  accountNumber: z
  .string({
    required_error: "Please enter an account number.",
    invalid_type_error: "Account number must be a string.",
  })
  .regex(/^\d+$/, { message: "Account number must contain only digits." })
  .min(10, { message: "Account number must be at least 10 digits long." }),

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
  }).refine((val) => val !== "" && val !== "Select your province", {
    message: "Please select a valid province.",
  }),

  city: z.string({
    required_error: "Please select a city.",
    invalid_type_error: "City must be a string.",
  }).refine((val) => val !== "" && val !== "Select your city", {
    message: "Please select a valid city.",
  }),

  suburb: z.string({
    required_error: "Please select a suburb.",
    invalid_type_error: "Suburb must be a string.",
  }).refine((val) => val !== "" && val !== "Select your Suburb", {
    message: "Please select a valid suburb.",
  }),

  customLocation: z.string().optional(),
  promotionDuration: z.string().optional(),

  // promotionDuration: z.string({
  //   required_error: "Please select a promotion duration.",
  //   invalid_type_error: "Promotion duration must be a string.",
  // }).refine((val) => val !== "Select Duration", {
  //   message: "Please select a valid promotion duration.",
  // }),

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


