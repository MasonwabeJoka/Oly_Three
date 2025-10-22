import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing Sanity connection...');

    const results: any = {
      config: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
        hasToken: !!process.env.SANITY_SECRET_TOKEN,
        tokenLength: process.env.SANITY_SECRET_TOKEN?.length
      }
    };

    // Just test environment variables for now
    results.envTest = {
      hasProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      hasDataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
      hasApiVersion: !!process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      hasToken: !!process.env.SANITY_SECRET_TOKEN,
    };

    return NextResponse.json({
      success: true,
      ...results
    });
  } catch (error) {
    console.error('Sanity test error:', error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      config: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
        hasToken: !!process.env.SANITY_SECRET_TOKEN
      }
    }, { status: 500 });
  }
}
