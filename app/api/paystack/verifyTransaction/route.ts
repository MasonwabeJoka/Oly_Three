import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');
    
    if (!reference) {
      return NextResponse.json({ error: 'Transaction reference is required' }, { status: 400 });
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
        },
      }
    );
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return NextResponse.json({ error: 'Failed to verify transaction' }, { status: 500 });
  }
}
