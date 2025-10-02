/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },

  serverExternalPackages: ["mongoose"],

  sassOptions: {
    api: "modern-compiler",
    silenceDeprecations: ["legacy-js-api"],
  },

  devIndicators: {
    pprIsrStatus: true,
    position: "bottom-right",
  },

  // Single images configuration block
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
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
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
  },

  distDir: "build",
};

export default nextConfig;
