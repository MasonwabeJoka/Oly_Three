import { groq } from 'next-sanity';
import  createClient  from '@sanity/client';
import ClientConfig from "../config/client-config"
import { Category } from '../Types/Category';

// Declare the client outside the function
const client = createClient(ClientConfig);

export const getCategories = async (): Promise<Category> => {
    const categories = await client.fetch(
     groq`*[_type == "category" && (order == 1 || order == 2)] {
      _id,
      title,
      "image": image.asset->url,
      "slug": slug.current,
      "subcategories": childrenCategories[]->title,
      "parentCategory": parentCategory->,
     }[0..9]`
    );

    return categories;
};
