import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/dashboard/account",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/dashboard/inbox",
        permanent: false,
      },
      {
        source: "/projects",
        destination: "/marketplace",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
