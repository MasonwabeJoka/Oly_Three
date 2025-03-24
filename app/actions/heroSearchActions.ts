'use server';

export async function searchAction(formData: FormData): Promise<void> {
  const searchTerm = formData.get("searchTerm")?.toString();
  const locationSearch = formData.get("locationSearch")?.toString();
  
  // Add your search logic here
  console.log("Search data:", { searchTerm, locationSearch });
}