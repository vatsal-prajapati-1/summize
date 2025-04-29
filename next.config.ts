import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000", "https://*.loca.lt"],
  experimental: {
    serverComponentsExternalPackages: ["..."],
  },
  maxDuration: 60,
  /* config options here */
};

export default nextConfig;
