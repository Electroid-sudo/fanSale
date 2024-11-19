import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    domains: ['utfs.io'], // Add the allowed domains here
  },
};

export default nextConfig;
