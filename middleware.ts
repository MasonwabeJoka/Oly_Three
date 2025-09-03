// import { clerkMiddleware } from "@clerk/nextjs/server";

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
// export default clerkMiddleware({
//   // routes that are accessible without authentication.
//   publicRoutes: ['/', '/oly-feed','/listings', '/listings/:listing' , '/privacy-policy', '/terms-and-conditions','/help', '/api/webhook/clerk'],
//   // routes that the authentication middleware will completely ignore
//   ignoredRoutes: ['/api/webhook/clerk']
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };


import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)','/','/listings', '/listings/:listing' , '/privacy-policy', '/terms-and-conditions','/help', '/api/webhooks/clerk', '/api/test-route', '/api/hello', '/api/populate-categories'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}