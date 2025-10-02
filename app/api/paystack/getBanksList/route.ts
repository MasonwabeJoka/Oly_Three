import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get('country') || 'south africa';

  try {
    const response = await axios.get('https://api.paystack.co/bank?country=south africa&enabled_for_verification=true', {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`, // Ensure your .env.local file contains PAYSTACK_SECRET_KEY
      },
    });
   
    const filteredBanks = response.data.data.filter((bank: any) => bank.country.toLowerCase() === country.toLowerCase());
    return NextResponse.json(filteredBanks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch banks' }, { status: 500 });
  }
}
