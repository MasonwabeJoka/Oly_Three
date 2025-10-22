import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

// Query
export const moreFromOlyQuery = defineQuery(`*[_type == "moreFromOlySection"][0] {
  title,
   sites[] -> {
     _id,
     _type,
     path,
     siteName,
     "imageUrl": image.asset->url
   }
}`);

// Read 

export const getMoreFromOly = async () => {
try {
     const data = await client.fetch(moreFromOlyQuery);
    return data;
  } catch (error) {
    console.error("Error fetching listing getMoreFromOly data:", error);
    throw error;
  }
}