'use server';
import { groq } from 'next-sanity';
import  createClient  from '@sanity/client';
import ClientConfig from "../config/client-config";
import { Ad } from '../Types/Ad';
import {z} from 'zod';
import { fromZodError } from 'zod-validation-error';

const client = createClient(ClientConfig);
