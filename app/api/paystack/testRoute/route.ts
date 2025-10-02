import { NextRequest, NextResponse } from 'next/server';
import { createAd } from '@/sanityTemp/actions/createAd';

export async function POST(req: NextRequest) {
  try {
    const adData = await req.json();
    // const newAd = await createAd(adData);
    return NextResponse.json(adData, { status: 201 });
  } catch (error) {
    console.error('Failed to create ad:', error);
    return NextResponse.json({ message: 'Failed to create ad', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
