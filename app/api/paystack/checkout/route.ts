import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { createClient } from '@sanity/client';
import { z } from 'zod';
import { fetchProducts } from '@/sanity/actions/fetchProducts';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  useCdn: true,
  apiVersion: '2023-08-05',
});

// Define input schema for checkout
const checkoutSchema = z.object({
  adIds: z.array(z.string()).min(1, "Product IDs cannot be empty"),
  email: z.string().email("Invalid email format"),
  userId: z.string().min(1, "User ID cannot be empty"),
});

// Calculate total amount including fees
const calculateTotalAmount = (price: number, olyFeePercent: number, payStackFeePercent: number) => {
  const olyFee = (olyFeePercent / 100) * price;
  const paystackFee = (payStackFeePercent / 100) * (price + olyFee) + 1;
  return price + olyFee + paystackFee;
};

// Handle checkout POST request
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const { adIds, email, userId } = checkoutSchema.parse(await request.json());

    // Fetch products from Sanity
    
    // const products = await client.fetch(
    //   `*[_type == "ad" && _id in $adIds && defined(priceId)] { _id, title, price, priceId }`,
    //   { adIds }
    // );

    const products = await fetchProducts(adIds);

    if (products.length === 0) {
      return NextResponse.json({ message: 'No valid products found' }, { status: 400 });
    }

    // Calculate total amount
    const totalAmount = products.reduce((sum, product) => 
      sum + calculateTotalAmount(product.price, 2.5, 2.9), 0);

    // Create transaction in Sanity
    const transaction = await client.create({
      _type: 'transaction',
      isPaid: false,
      userId,
      transactionId: 'PLACEHOLDER',
      products: products.map(({ _id, title, price, priceId }) => ({
        _key: _id, _type: 'product', title, price, priceId
      })),
    });

    // Create Paystack checkout session
    const { data } = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        amount: totalAmount * 100, // Convert to cents
        email,
        callback_url: `${process.env.BASE_URL}/thank-you`,
        metadata: { userId, transactionId: transaction._id },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Update Sanity transaction with Paystack reference
    await client.patch(transaction._id)
      .set({ transactionId: data.data.reference })
      .commit();

    return NextResponse.json({ url: data.data.authorization_url });

  } catch (error) {
    console.error('Checkout error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}