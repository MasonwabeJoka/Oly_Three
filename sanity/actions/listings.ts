"use server";

import { redirect } from "next/navigation";

export async function listingsSearchAction(formData: FormData): Promise<void> {
  const searchTerm = formData.get("searchTerm")?.toString() || "";
  const locationSearch = formData.get("locationSearch")?.toString() || "";

  const params = new URLSearchParams();
  if (searchTerm.trim()) params.set("searchTerm", searchTerm.trim());
  if (locationSearch.trim()) params.set("locationSearch", locationSearch.trim());

  const queryString = params.toString();
  redirect(queryString ? `/listings?${queryString}` : "/listings");
}
