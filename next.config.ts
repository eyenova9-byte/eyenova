import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.tap.company https://*.tap.company https://*.skipcash.app https://apis.google.com https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https://images.unsplash.com https://res.cloudinary.com https://api.tap.company https://*.skipcash.app;
  font-src 'self' https://fonts.gstatic.com data:;
  connect-src 'self' https://api.tap.company https://api.skipcash.app https://*.firebaseio.com https://identitytoolkit.googleapis.com https://vitals.vercel-insights.com;
  frame-src 'self' https://tap.company https://*.tap.company https://*.skipcash.app;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://*.tap.company https://*.skipcash.app;
  frame-ancestors 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, " ").trim();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
