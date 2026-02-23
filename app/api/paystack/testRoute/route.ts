import { NextRequest, NextResponse } from 'next/server';
import { createAd } from '@/sanityTemp/actions/createAd';

export async function POST(req: NextRequest) {
  try {
    const adData = await req.json();
    // const newAd = await createAd(adData);
    return NextResponse.json(adData, { status: 201 });
  } catch (error: unknown) {
    console.error('Failed to create ad:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Failed to create ad', error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
