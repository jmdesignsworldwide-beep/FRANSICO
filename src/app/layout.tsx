import type { Metadata, Viewport } from "next";
import { Anton, Oswald, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

/* Fuentes self-hosted por next/font (se sirven desde /_next → cumple CSP font-src 'self'). */
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Mecánica, Gomas y Detailing en Santiago`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "taller Santiago",
    "gomas Santiago",
    "balanceo",
    "cambio de aceite",
    "detailing República Dominicana",
    "lavado de carros Santiago",
    "Velocity Wash",
    "F&I WASH",
    "Liqui Moly Santiago",
  ],
  authors: [{ name: SITE.developer.name }],
  creator: SITE.developer.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Mecánica, Gomas y Detailing`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}`,
    description: SITE.description,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${oswald.variable} ${inter.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
