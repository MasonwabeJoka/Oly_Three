"use server";
import { z } from "zod";

export async function searchAction(formData: FormData) {
  const searchTerm = formData.get("searchTerm")?.toString();
  const locationSearch = formData.get("locationSearch")?.toString();

  const schema = z.object({
    searchTerm: z.string().min(1, "Search term is required"),
    locationSearch: z.string().min(1, "Location is required"),
  });

  try {
    schema.parse({ searchTerm, locationSearch });
    console.log("Server received:", { searchTerm, locationSearch });
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, errors: [{ message: "Server error" }] };
  }
}