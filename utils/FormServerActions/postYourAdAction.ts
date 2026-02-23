"use server";
import { FormData } from "@/app/(dashboard)/dashboard/create-listing/store/useFormStore";


// Placeholder server action for final form submission
export async function CreateAListingAction(formData: FormData) {
  // TODO: Implement real server-side logic (e.g., save to database)
  console.log("Server action received:", formData);
  return { success: true, message: "Ad submitted successfully" };
}