import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/get-started", destination: "/#waitlist", permanent: false },
    ];
  },
};

export default nextConfig;
