import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [];
  },
  images: {
    domains: ["localhost", "127.0.0.1", "social-media-z48c.onrender.com"],
  },
  
};

export default nextConfig;
