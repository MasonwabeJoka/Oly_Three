import {defineQuery} from "next-sanity";
import {client} from "@/sanity/lib/client";


// Query
export const featuredCategoriesSectionQuery = defineQuery(`
  *[_type == "featuredCategoriesSection" && isActive == true][0] {
    _id,
    title,
    callToAction,
    featuredCategories[]{
        _key,
        isActive,
        sortOrder,
        featuredPriority,
        overrideTitle,
        overrideUrl,
        overrideImage,
        "category": categoryRef->{
        _id,
        title,
        slug,
        path,
        "image": image.asset->url,
        isActive,
        order
        },
        // computed displayTitle - prefer overrideTitle, then referenced title, else blank
        "displayTitle": coalesce(overrideTitle, categoryRef->title),
        // computed displayImage - prefer overrideImage, then referenced image
        "displayImage": coalesce(overrideImage, categoryRef->image.asset->url)
    }
  }
`)

// Read 
export const getFeaturedCategoriesSection = async () => {
    try {
        const featuredCategoriesSection = await client.fetch(featuredCategoriesSectionQuery);
        return featuredCategoriesSection;
    } catch (error) {
        console.error("Error fetching featuredCategoriesSection:", error);
        throw error;
    }
}