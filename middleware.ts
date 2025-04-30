import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  // routes that are accessible without authentication.
    publicRoutes: ['/', '/oly-feed','/listings', '/privacy-policy', '/terms-and-conditions','/help', '/api/webhook/clerk'],
    // publicRoutes: ['/test','/api/uploadthing','/dashboard/messages/contacts','/dashboard/settings/preferences','/dashboard/settings/account-verification','/dashboard/settings/profile-settings','/dashboard/settings/password-settings','/dashboard/settings','/dashboard/notifications','/dashboard/liked-ads','/dashboard/my-ads/promote-your-ads','/dashboard/my-ads','/dashboard','/dashboard/messages','/dashboard/post-your-ad/ad-description','/dashboard/post-your-ad/select-a-category','/dashboard/post-your-ad/home','/dashboard/post-your-ad/price','/dashboard/post-your-ad/location','/dashboard/post-your-ad/features','/dashboard/post-your-ad/other','/listing','/dashboard/post-your-ad/details','/listings','/dashboard/post-your-ad/upload-media/upload-photos','/dashboard/post-your-ad/upload-media/upload-videos', '/dashboard/post-your-ad/upload-media/upload-attachments','/dashboard/post-your-ad/upload-media','/dashboard/messages','/', '/oly-feed','/listings', '/privacy-policy', '/terms-and-conditions','/help', '/api/webhook/clerk'],
    
    // routes that the authentication middleware will completely ignore
    ignoredRoutes: ['/api/webhook/clerk']
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};