/**
 * Configuración de Next.js con cabeceras de seguridad "Fort Knox".
 * CSP endurecida, HSTS, anti-clickjacking, nosniff, referrer y permisos.
 */

// Content-Security-Policy.
// - 'unsafe-inline' en style es necesario por los estilos inyectados por Framer Motion / Tailwind runtime.
// - Google Maps embed requiere frame-src + img-src de dominios de Google.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://maps.google.com https://*.google.com;
  font-src 'self' data:;
  frame-src 'self' https://www.google.com https://maps.google.com;
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
