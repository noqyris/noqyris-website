import type { NextConfig } from "next";

// Baseline security headers, applied to every route. Intentionally no
// Content-Security-Policy yet — a correct CSP must account for the inline
// splash-gate script, Vercel Analytics, and Next's inline styles, so it needs
// dedicated testing (see docs/LAUNCH.md). These are all safe without it.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // /open was folded into /changelog — keep old links and shares alive.
    return [
      { source: "/open", destination: "/changelog", permanent: true },
      { source: "/sr/open", destination: "/sr/changelog", permanent: true },
      // Products are hidden for now (temporary — they'll return), so send any
      // /products links to the changelog. Remove these to bring products back.
      { source: "/products", destination: "/changelog", permanent: false },
      { source: "/products/:slug*", destination: "/changelog", permanent: false },
      { source: "/sr/products", destination: "/sr/changelog", permanent: false },
      {
        source: "/sr/products/:slug*",
        destination: "/sr/changelog",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
