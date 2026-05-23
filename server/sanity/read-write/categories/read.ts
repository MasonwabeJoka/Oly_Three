import { client } from "@/server/sanity/client";
import { defineQuery } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";


// Query
export const categoriesQuery = defineQuery(`*[_type == "category" && level == 0][0]{
  title,
  "categories": subcategories[]->{
    _id,
    title,
    slug {
      current
    },
    "secondLevelSubcategories": subcategories[]->{
      _id,
      title,
      slug {
        current
      }
    },
    
    "thirdLevelSubcategories": subcategories[]->subcategories[]->{
      _id,
      title,
      slug {
        current
      }
    }
  },

 
    
  
}`)



// Read

export const getCategories = async () => {
    "use cache";
    cacheTag("categories");
    cacheLife("hours");

    try {
        const categories = await client.fetch(categoriesQuery);
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}


// create

// update

// delete
