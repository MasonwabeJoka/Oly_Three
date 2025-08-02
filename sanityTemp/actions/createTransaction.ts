'use server';
import { groq } from 'next-sanity';
import  createClient  from '@sanity/client';
import ClientConfig from "../config/client-config";
import { Ad } from '../Types/Ad';
import {z} from 'zod';
import { fromZodError } from 'zod-validation-error';
import {useAuth} from "@clerk/nextjs";
import { fetchProducts } from './fetchProducts';

const client = createClient(ClientConfig);


const createTransaction = async () => {

    const { userId } = useAuth();

    const products = await fetchProducts(['bd85d922-e71a-462c-a2b2-658540353700']);
    try {
        client.create({
            _type: 'transaction',
            isPaid: false,
            userId,
            transactionId: 'PLACEHOLDER',
            products: products.map(({ _id, title, price, priceId }) => ({
              _key: _id, _type: 'ad', title, price, priceId
            })),
        })

    } catch (error) {

    if (error instanceof z.ZodError) {
        const zodError = fromZodError(error);
        console.error('Validation failed:', zodError.message);
        throw new Error('Validation failed');
        } else {
        console.error('Error creating transaction:', error);
        throw new Error('Failed to create transaction');
        }
    }
    
}