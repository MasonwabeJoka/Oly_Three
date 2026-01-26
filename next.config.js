/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  cacheComponents: false, 
  serverExternalPackages: ["mongoose", "isomorphic-dompurify", "jsdom"],
  turbopack: {},
  sassOptions: {
    api: "modern-compiler",
    silenceDeprecations: ["legacy-js-api"],
    includePaths: ['./styles'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "workoscdn.com",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "oly-images.gumlet.io",
      },
    ],
    localPatterns: [
      {
        pathname: '/assets/**',
        search: '?*', // Allows query strings under /assets/
      },
      {
        pathname: '/**', // Allows all root-level images (e.g., /logo.png)
        search: '', // No query strings required
      },
    ],
  },
};

export default nextConfig;