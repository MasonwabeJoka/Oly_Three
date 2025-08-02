import { clerkMiddleware } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default clerkMiddleware({
  // routes that are accessible without authentication.
  publicRoutes: ['/', '/oly-feed','/listings', '/listings/:listing' , '/privacy-policy', '/terms-and-conditions','/help', '/api/webhook/clerk'],
  // routes that the authentication middleware will completely ignore
  ignoredRoutes: ['/api/webhook/clerk']
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};