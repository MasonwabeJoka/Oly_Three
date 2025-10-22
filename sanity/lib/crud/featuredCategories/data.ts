import {client} from "@/sanity/lib/client";
import {defineQuery} from "next-sanity";

// Query
export const featuredCategoriesQuery = defineQuery(`*[_type == "category" && isFeatured == true] {
  "id": _id,
    title,
    "displayTitle": coalesce(featuredTitle, title),// returns featuredTitle if it exists, otherwise title
  "image": image
}
`);

// Read 

export const getFeaturedCategories = async () => {
    try {
        const featuredCategories = await client.fetch(featuredCategoriesQuery);
        return featuredCategories;
    } catch (error) {
        console.error("Error fetching featuredCategories:", error);
        throw error;
    }
}