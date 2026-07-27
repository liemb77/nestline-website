import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Ads and AI Consulting service pages were merged into the home page
  // (2026-07-24) — redirect any existing links/bookmarks/search results instead
  // of letting them 404.
  async redirects() {
    return [
      { source: "/en/ads", destination: "/en", permanent: true },
      { source: "/fr/ads", destination: "/fr", permanent: true },
      { source: "/en/ai-consulting", destination: "/en", permanent: true },
      { source: "/fr/ai-consulting", destination: "/fr", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
