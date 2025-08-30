import { groq } from 'next-sanity';
import { Category } from '../Types/Category';
import { client } from '@/lib/client';


export const getTopCategories = async (fetch: string): Promise<Category> => {
    const category = await client.fetch(
     groq`${fetch}`
    );
   
    return category;
};
