
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Get user authentication information
  const { userId } = getAuth(req);

  // If user is not authenticated, redirect to login page
  if (!userId) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to proceed if user is authenticated
  return NextResponse.next();
}

// Specify the paths you want to protect
export const config = {
  matcher: ['/api/:path*', '/checkout/:path*'], // Adjust paths as needed
};
