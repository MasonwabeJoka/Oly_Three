'use server'
import { revalidatePath } from 'next/cache';
import { groq } from 'next-sanity';
import { createClient } from '@sanity/client';
import ClientConfig from "../config/client-config"

const client = createClient(ClientConfig);
export const getUser = async () => { 
    try {
        const query = groq`*[_type == "user"]`;

        const user = await client.fetch(query);
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
    }
}