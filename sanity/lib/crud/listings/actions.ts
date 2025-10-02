'use server';

import { redirect } from 'next/navigation';

export async function listingsSearchAction(formData: FormData): Promise<void> {
  const searchTerm = formData.get("searchTerm")?.toString() || '';
  const locationSearch = formData.get("locationSearch")?.toString() || '';
  
  // Build the URL with search parameters
  const params = new URLSearchParams();
  
  if (searchTerm.trim()) {
    params.set('searchTerm', searchTerm.trim());
  }
  
  if (locationSearch.trim()) {
    params.set('locationSearch', locationSearch.trim());
  }
  
  const queryString = params.toString();
  const url = queryString ? `/listings?${queryString}` : '/listings';
  
  // Redirect to the listings page with search parameters
  redirect(url);
}
