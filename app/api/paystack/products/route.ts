import { NextRequest, NextResponse } from 'next/server';
import  createClient  from '@sanity/client';
import { z } from 'zod';
import { getAuth } from '@clerk/nextjs/server';
import { postAd } from '@/sanityTemp/actions/postAd';
import { AdSchema } from '@/sanityTemp/Types/Ad';



// Define the input schema for product operations
const adSchema = z.object({
  adId: z.string().optional(),
  ad: AdSchema,
  operation: z.enum(['create', 'update']),
});


// Handler for product operations
export async function POST(request: NextRequest) {
  try {
    // Get authentication information
    // const { userId } = getAuth(request);

    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Parse and validate the request body
    const body = await request.json();
    const parsedBody = adSchema.parse(body);
    const { adId, ad, operation } = parsedBody;

    if (operation === 'create') {
      // Create a new product in Sanity
      // const newProduct = await client.create({
      //   _type: 'product',
      //   ...ad,
      //   user: { _type: 'reference', _ref: userId },
      // });

      const newAd = await postAd(ad, adId);

      // Integrate with Paystack for creating a new product (if required)
      // Example: Add product creation code for Paystack here

      return NextResponse.json({ message: 'Product created successfully', ad: newAd }, { status: 200 });
    } else if (operation === 'update') {
      // Update the product in Sanity
      const updatedProduct = await client.patch(adId!)
        .set(ad)
        .commit();

      // Integrate with Paystack for updating the product (if required)
      // Example: Add product update code for Paystack here

      return NextResponse.json({ message: 'Product updated successfully', product: updatedProduct }, { status: 200 });
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return NextResponse.json({ message: 'Invalid request', errors: error.errors }, { status: 400 });
    }
    // Log and return internal server error
    console.error('Product operation error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
