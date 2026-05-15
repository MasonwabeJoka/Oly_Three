
"use server";
import { z } from "zod";
import { ratelimit } from "@/lib/upstash/rate-limit";
import { headers } from "next/headers";

export async function feedbackAction(formData: FormData) {
  const ip = (await headers()).get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  if (!success) return { success: false, errors: [{ message: 'Too many requests' }] };

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const message = formData.get("message")?.toString();
  const attachment = formData.get("attachment");

  // Server-side validation
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    message: z.string().min(1, "Message is required").max(500, "Message cannot exceed 500 characters"),
    attachment: z.instanceof(File).optional()
   .refine(
     (file) => !file || file.size <= 5 * 1024 * 1024, 
     { message: "File size must be less than 5MB" }
   )
   .refine(
     (file) => !file || ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
     { message: "File must be JPEG, PNG, or PDF" }
   ),
  });

  try {
    schema.parse({ name, email, message, attachment });
  
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, errors: [{ message: "Server error" }] };
  }
}