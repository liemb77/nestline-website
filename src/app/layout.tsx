import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { LanguageProvider } from "@/contexts/language-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nestlineautomation.ca"),
  title: {
    default: "NestLine Automation — Automation Agency in Montreal, Quebec",
    template: "%s | NestLine Automation",
  },
  description:
    "NestLine Automation is a Montreal-based automation agency helping Quebec contractors stop losing leads and automate their business. Agence d'automatisation à Montréal pour entrepreneurs au Québec.",
  keywords: [
    "automation agency Montreal",
    "automation agency Quebec",
    "agence automatisation Montréal",
    "agence automatisation Québec",
    "business automation Quebec",
    "contractor automation Montreal",
    "lead automation Quebec",
    "workflow automation Montreal",
    "agence automatisation entrepreneurs Québec",
    "automatisation entreprise Montréal",
    "n8n automation agency Canada",
    "NestLine Automation",
    "missed call automation Quebec",
    "plumber automation Montreal",
    "roofer automation Quebec",
    "HVAC automation Montreal",
  ],
  authors: [{ name: "NestLine Automation", url: "https://nestlineautomation.ca" }],
  creator: "NestLine Automation",
  publisher: "NestLine Automation",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: {
    canonical: "https://nestlineautomation.ca",
    languages: {
      "en-CA": "https://nestlineautomation.ca",
      "fr-CA": "https://nestlineautomation.ca",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    alternateLocale: "fr_CA",
    url: "https://nestlineautomation.ca",
    siteName: "NestLine Automation",
    title: "NestLine Automation — Automation Agency in Montreal, Quebec",
    description: "We build done-for-you automation systems for Quebec contractors. Stop losing leads, automate follow-ups, and grow your business on autopilot.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NestLine Automation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NestLine Automation — Automation Agency in Montreal, Quebec",
    description: "We build done-for-you automation systems for Quebec contractors. Stop losing leads, automate follow-ups.",
    images: ["/og-image.png"],
  },
  other: {
    "geo.region": "CA-QC",
    "geo.placename": "Montreal, Quebec, Canada",
    "geo.position": "45.5017;-73.5673",
    "ICBM": "45.5017, -73.5673",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://nestlineautomation.ca/#organization",
        "name": "NestLine Automation",
        "url": "https://nestlineautomation.ca",
        "logo": "https://nestlineautomation.ca/logo.png",
        "email": "liem@nestlineautomation.ca",
        "sameAs": [
          "https://www.linkedin.com/in/liem-blouin-99212a365/",
          "https://www.instagram.com/nestlineautomation/",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://nestlineautomation.ca/#localbusiness",
        "name": "NestLine Automation",
        "description": "Automation agency for contractors in Quebec, Canada. We build lead intake, missed call, and follow-up automation systems.",
        "url": "https://nestlineautomation.ca",
        "email": "liem@nestlineautomation.ca",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Saint-Mathieu",
          "addressRegion": "QC",
          "addressCountry": "CA",
          "postalCode": "J0L 2H0",
        },
        "areaServed": [
          { "@type": "City", "name": "Montreal" },
          { "@type": "City", "name": "Laval" },
          { "@type": "City", "name": "Longueuil" },
          { "@type": "City", "name": "Quebec City" },
          { "@type": "City", "name": "Gatineau" },
          { "@type": "State", "name": "Quebec" },
        ],
        "knowsAbout": ["Business Automation", "Lead Management", "Workflow Automation", "n8n", "CRM Automation"],
        "serviceType": "Business Process Automation",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f0f0f5]">
        <LanguageProvider>
          {/* Fixed fluid-particles canvas — sits behind all page content */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <FluidParticlesBackground
              particleCount={1800}
              noiseIntensity={0.003}
              particleSize={{ min: 0.4, max: 1.8 }}
              className="w-full h-full"
            />
          </div>

          {/* Page content sits above the canvas */}
          <div className="relative z-10 flex flex-col min-h-full">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
