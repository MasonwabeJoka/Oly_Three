import { authkitMiddleware } from '@workos-inc/authkit-nextjs';
import { NextResponse, type NextRequest } from 'next/server';


const authkit = authkitMiddleware({
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: [
      '/',
      '/listings',
      '/listings/:slug',
      '/api/webhooks/workos/users',
    ],
  },
});

export default async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/webhooks/workos/users') {
    return NextResponse.next();
  }

  return authkit(req);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
