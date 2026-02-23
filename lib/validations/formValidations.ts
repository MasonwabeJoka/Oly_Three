import { z } from 'zod';

export const detailsFormSchema = z.object({
  condition: z.string().optional(),
  accessoriesIncluded: z.array(z.string()).optional(),
  warrantyInformation: z.string().optional(),
  history: z.string().optional(),
  customizations: z.string().optional(),
  maintenanceHistory: z.string().optional(),
  compatibility: z.string().optional(),
  originalPackaging: z.string().optional(),
  usageHistory: z.string().optional(),
  storage: z.string().optional(),
  originalPurchaseDate: z.string().optional(),
  reasonForSelling: z.string().optional(),
  additionalFeatures: z.string().optional(),
  serviceRecords: z.string().optional(),
  userManualAvailability: z.string().optional(),
  manufacturerSupport: z.string().optional(),
  compatibilityWithAccessories: z.string().optional(),
  packagingCondition: z.string().optional(),
  productHistory: z.string().optional(),
  transferability: z.string().optional(),
  petSmokeExposure: z.string().optional(),
  regulatoryCompliance: z.string().optional(),
  specialFeatures: z.string().optional(),
  documentation: z.string().optional(),
  certification: z.string().optional(),
  age: z.string().optional(),
  ownership: z.string().optional(),
  environmentalImpact: z.string().optional(),
  knownIssues: z.string().optional(),
  upgrades: z.string().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  socialMediaName: z.string().optional(),
  socialMediaUrl: z.string().url().optional().or(z.literal("")),
  avatarFile: z.instanceof(File).optional(),
});

export const searchFormSchema = z.object({
  searchTerm: z.string().optional(),
  categories: z.string().optional(),
  locationSearch: z.string().optional(),
});

export const passwordSchema = z.object({
  currentPassword: z.string().min(8, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const feedbackFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  feedback: z.string().min(1, "Feedback is required"),
  type: z.enum(["bug-report", "feature-request", "general"]),
  email: z.string().email("Invalid email").optional(),
});

export const multiStepFormSchema = z.object({
  step1: z.string().optional(),
  step2: z.string().optional(),
  step3: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type DetailsFormData = z.infer<typeof detailsFormSchema>;
export type SearchFormData = z.infer<typeof searchFormSchema>;
export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
export type MultiStepFormData = z.infer<typeof multiStepFormSchema>;