import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";


// Query
export const categoriesQuery = defineQuery(`*[_type == "category" ][0]{
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