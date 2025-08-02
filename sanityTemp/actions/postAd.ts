'use server';
import  createClient  from '@sanity/client';
import ClientConfig from "../config/client-config";
import { Ad } from '../Types/Ad';
const client = createClient(ClientConfig);

export async function postAd(ad: Ad, userId: string) {

   await client.create({
        _type: 'ad',
        ...ad,
        user: { _type: 'reference', _ref: userId },
      });
}
  