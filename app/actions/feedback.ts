
"use server";
import { z } from "zod";

export async function feedbackAction(formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const message = formData.get("message")?.toString();
  const attachment = formData.get("attachment");

  // Server-side validation
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    message: z.string().min(1, "Message is required").max(500, "Message cannot exceed 500 characters"),
    attachment: z.any().optional(), // Handle file validation if needed
  });

  try {
    schema.parse({ name, email, message, attachment });
    console.log("Server received:", { name, email, message, attachment });
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, errors: [{ message: "Server error" }] };
  }
}