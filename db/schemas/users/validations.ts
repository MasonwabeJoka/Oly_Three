import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  socialMediaName: z.string().optional(),
  socialMediaUrl: z.string().url().optional().or(z.literal("")),
  avatarFile: z.instanceof(File).optional(),
});