import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

// Query
export const listingViewsQuery = defineQuery(`*[_type == "listing" && _id == $id][0]{
    _id,
  views,
}`);

// Read 

export const getListingViews = async (id: string) => {
try {
    const views = await client.withConfig({ useCdn: false }).fetch(listingViewsQuery, { id });
    return views;
  } catch (error) {
    console.error("Error fetching listing views:", error);
    throw error;
  }
}