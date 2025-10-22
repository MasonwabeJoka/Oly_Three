import  createClient  from '@sanity/client';
import ClientConfig from '@/sanityTemp/config/client-config';
import { NextRequest, NextResponse } from 'next/server';

const client = createClient(ClientConfig);

export async function POST(req: NextRequest) {
    const body = await req.json();
    // Authentication removed - no longer using Clerk
    const user = null;
    const { 
        
        category, 
        title, 
        description, 
        price, 
        pricingOption, 
        images,
        videos,
        attachments,
        location,
        featuredImage,
        postedOn,
        details,
        features,
        condition,
        quantity,
        promotions,
        bids,
     } = body;
  
    try {
      // Create a new classified listing document in Sanity
      const result = await client.create({
        _type: 'ad',
        user: user?.id ,
        category, 
        title, 
        description, 
        price, 
        pricingOption, 
        images,
        videos,
        attachments,
        location,
        featuredImage,
        postedOn,
        details,
        features,
        condition,
        quantity,
        promotions,
        bids,
      });
  
      return NextResponse.json({ message: 'Listing created', result }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
    }
  }