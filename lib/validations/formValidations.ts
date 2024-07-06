
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

export const detailsFormSchema = z.object({
  condition: z.string({
    required_error: "Please select a condition.",
    invalid_type_error: "Condition must be a string.",
  }).refine((val) => val !== "", {
    message: "Please select an option.",
  }),
  chooseDetail: z.string({
    required_error: "Please select a condition.",
    invalid_type_error: "Condition must be a string.",
  }).refine((val) => val !== "", {
    message: "Please select an option.",
  }),
  detail: z.string({
    required_error: "Please select a condition.",
    invalid_type_error: "Condition must be a string.",
  }).refine((val) => val !== "", {
    message: "Please select an option.",
  }),
  moreDetails: z.string().optional(),
  editDetail: z.string().optional(),
});


