
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Authentication removed - allowing all requests
  // You may want to implement alternative authentication here

  // Allow all requests to proceed
  return NextResponse.next();
}

// Specify the paths you want to protect
export const config = {
  matcher: ['/api/:path*', '/checkout/:path*'], // Adjust paths as needed
};
