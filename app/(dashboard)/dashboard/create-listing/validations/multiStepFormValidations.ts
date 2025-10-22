import { z } from "zod";

export const categoriesValidations = z.object({
    // Set validations here
  });
  
  export const detailsValidations = z.object({
    condition: z.string({
      required_error: "Please select a condition.",
      invalid_type_error: "Condition must be a string.",
    }).refine((val) => val !== "" && val !== "Condition", {
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
    "Add Your Own Details": z.string().optional(),
  });
  
  export const 
  priceValidations = z.object({
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
  });
  
  export const bankAccountValidations = z.object({
    bankName: z.string({
      required_error: "Please enter a bank name.",
      invalid_type_error: "Bank name must be a string.",
    }).min(2, "Bank name must be at least 2 characters long."),
  
    accountHolder: z.string({
      required_error: "Please enter an account name.",
      invalid_type_error: "Account holder name must be a string.",
    }).min(2, "Account holder name must be at least 2 characters long."),
  
    accountNumber: z.string({
      required_error: "Please enter an account number.",
      invalid_type_error: "Account number must be a string.",
    }).regex(/^\d+$/, { message: "Account number must contain only digits." })
      .min(10, { message: "Account number must be at least 10 digits long." }),
  });
  
  export const descriptionValidations = z.object({
    title: z.string({
      required_error: "Title is required.",
      invalid_type_error: "Title must be a string.",
    }).min(5, "Title must be at least 5 characters long."),
  
    description: z.string()
      .max(600, "Description must be at most 600 characters long")
      .transform((val) => val.replace(/<[^>]*>?/gm, "")), // Remove HTML tags
  });
  
  export const uploadPhotosValidations = z.object({
    image: z.string().optional().refine((val) => val !== "", {
      message: "Please upload an image.",
    }),
  });
  
  export const uploadVideosValidations = z.object({
    video: z.string().optional().refine((val) => val !== "", {
      message: "Please upload a video.",
    }),
  });
  
  export const uploadAttachmentsValidations = z.object({
    attachment: z.string().optional().refine((val) => val !== "", {
      message: "Please upload an attachment.",
    }),
  });
  
  export const uploadMediaValidations = z.object({
    // Set validations here
  });
  
  export const locationValidations = z.object({
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
  });
  
  export const promoteYourAdValidations = z.object({
    // promotionDuration: z.string({
    //   required_error: "Please select a promotion duration.",
    //   invalid_type_error: "Promotion duration must be a string.",
    // }).refine((val) => val !== "Select Duration", {
    //   message: "Please select a valid promotion duration.",
    // }),
  });