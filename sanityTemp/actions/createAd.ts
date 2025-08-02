'use server';

import  createClient  from '@sanity/client';
import ClientConfig from '../config/client-config';
import { AdSchema } from '../Types/Ad';

const client = createClient(ClientConfig);

export const createAd = async (adData: any) => {
  try {
    // Validate the ad data against the schema
    const ad = AdSchema.parse(adData);

    // Prepare the ad data for Sanity
    const newAd = {
      _type: 'ad',
      ...ad,
    };

    // Create the ad in Sanity
    const result = await client.create(newAd);
    return result;
  } catch (error) {
    // Handle validation or API errors
    console.error('Failed to create ad:', error);
    throw new Error('Failed to create ad');
  }
};
