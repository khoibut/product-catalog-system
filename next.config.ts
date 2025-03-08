import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.target = 'node';
    }
    return config;
  },
  // other Next.js config options here
};

export default nextConfig;
