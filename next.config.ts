import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.target = 'node';
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // Using "*" as a wildcard allows any hostname with HTTPS.
        // Note: This may have security implications.
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
  // other Next.js config options here
};

export default nextConfig;
