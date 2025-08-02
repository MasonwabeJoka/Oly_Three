"use server";
import { searchFormSchema } from "@/lib/validations/formValidations";

export async function searchAction(formData: FormData) {
  const data = {
    searchTerm: formData.get("searchTerm")?.toString() || "",
    locationSearch: formData.get("locationSearch")?.toString() || "",
  };

  const parsed = searchFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    };
  }

  // Perform search logic (e.g., query a database)
  // For now, return success
  return { success: true, data: parsed.data };
}