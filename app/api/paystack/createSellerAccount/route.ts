import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface SellerDetails {
  businessName: string;
  bankCode: string;
  accountNumber: string;
  percentageCharge: number;
}

export async function POST(request: NextRequest) {
  try {
    const sellerDetails: SellerDetails = await request.json();
    
    if (!sellerDetails.businessName || !sellerDetails.bankCode || !sellerDetails.accountNumber || sellerDetails.percentageCharge === undefined) {
      return NextResponse.json({ error: 'Invalid seller details' }, { status: 400 });
    }

    const response = await axios.post(
      'https://api.paystack.co/subaccount',
      {
        business_name: sellerDetails.businessName,
        bank_code: sellerDetails.bankCode,
        account_number: sellerDetails.accountNumber,
        percentage_charge: sellerDetails.percentageCharge,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error creating subaccount:', error);
    return NextResponse.json({ error: 'Failed to create subaccount' }, { status: 500 });
  }
}
