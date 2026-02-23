import { z } from 'zod';

export const verificationSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  verificationCode: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{6}$/.test(val), 'Verification code must be 6 digits'),
  // idFile: z
  //   .any()
  //   .refine(
  //     (file) => file instanceof File && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) && file.size <= 5 * 1024 * 1024,
  //     'ID must be an image or PDF under 5MB'
  //   ),
  // selfie: z
  //   .string()
  //   .min(1, 'Selfie image is required')
  //   .refine((val) => val.startsWith('data:image'), 'Selfie must be an image'),
  businessName: z
    .string()
    .min(3, 'Business name must be at least 3 characters'),
  regNumber: z
    .string()
    .min(5, 'Registration number must be at least 5 characters'),
  taxNumber: z
    .string()
    .min(5, 'Tax number must be at least 5 characters'),
  street: z
    .string()
    .min(3, 'Street address must be at least 3 characters'),
  suburb: z
    .string()
    .min(3, 'Suburb must be at least 3 characters'),
  city: z
    .string()
    .min(3, 'City must be at least 3 characters'),
  province: z
    .string()
    .min(1, 'Province is required'),
  postalCode: z
    .string()
    .regex(/^\d{4,5}$/, 'Invalid postal code format'),
  repIdFile: z
    .any()
    .refine(
      (file) => file instanceof File && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) && file.size <= 5 * 1024 * 1024,
      'Representative ID must be an image or PDF under 5MB'
    ),
  repSelfie: z
    .string()
    .min(1, 'Representative selfie image is required')
    .refine((val) => val.startsWith('data:image'), 'Representative selfie must be an image'),
  repPhoneNumber: z
    .string()
    .min(1, 'Representative phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid representative phone number format'),
  repVerificationCode: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{6}$/.test(val), 'Representative verification code must be 6 digits'),
});