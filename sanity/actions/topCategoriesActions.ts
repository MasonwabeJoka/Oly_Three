import { groq } from 'next-sanity';
import  createClient  from '@sanity/client';
import ClientConfig from "../config/client-config"
import { Category } from '../Types/Category';

// Declare the client outside the function
const client = createClient(ClientConfig);

export const getTopCategories = async (fetch: string): Promise<Category> => {
    const category = await client.fetch(
     groq`${fetch}`
    );
   
    return category;
};
