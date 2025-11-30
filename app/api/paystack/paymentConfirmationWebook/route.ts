// app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import sanityClient from '@sanity/client';
import crypto from 'crypto';

// Initialize Sanity client
const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-08-05',
});

export async function POST(request: Request) {
  const sig = request.headers.get('x-paystack-signature') as string;
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ message: 'Webhook secret not configured' }, { status: 500 });
  }
  const payload = await request.json();

  const hmac = crypto.createHmac('sha512', secret);
  const digest = hmac.update(JSON.stringify(payload)).digest('hex');

  if (digest !== sig) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
  }

  try {
    const { data } = payload;

    if (data.status === 'success') {
      // Update transaction in Sanity
      await client
        .patch(data.metadata.transactionId)
        .set({ isPaid: true })
        .commit();
    }

    return NextResponse.json({ message: 'Webhook received' });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
