import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { LanguageProvider, type Lang } from "@/contexts/language-context";
import CookieConsent from "@/components/CookieConsent";
import ChatWidget from "@/components/ChatWidget";
import CursorGlow from "@/components/CursorGlow";

// Defined locally rather than imported from the "use client" language-context
// module — importing that const array into generateStaticParams broke Next's
// static page-data collection step (LOCALES resolved as non-array at build time).
const LOCALES: Lang[] = ["en", "fr"];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

function hasLocale(lang: string): lang is Lang {
  return (LOCALES as string[]).includes(lang);
}

const SITE = "https://nestlineautomation.ca";

const META = {
  en: {
    title: "NestLine Automation: AI Consulting Agency in Montreal, Quebec",
    description:
      "NestLine is a Montreal-based AI consulting agency helping Quebec businesses save time and grow faster with custom AI systems, websites, and ad management.",
    ogLocale: "en_CA",
  },
  fr: {
    title: "NestLine Automation : Agence de Consultation IA à Montréal, Québec",
    description:
      "NestLine est une agence de consultation IA basée à Montréal qui aide les entreprises du Québec à gagner du temps et à croître grâce à des systèmes IA sur mesure, des sites web et la gestion de publicités.",
    ogLocale: "fr_CA",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = hasLocale(rawLang) ? rawLang : "en";
  const m = META[lang];
  const other: Lang = lang === "en" ? "fr" : "en";

  return {
    metadataBase: new URL(SITE),
    title: { default: m.title, template: `%s | NestLine Automation` },
    description: m.description,
    authors: [{ name: "NestLine Automation", url: SITE }],
    creator: "NestLine Automation",
    publisher: "NestLine Automation",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: `${SITE}/${lang}`,
      languages: {
        "en-CA": `${SITE}/en`,
        "fr-CA": `${SITE}/fr`,
      },
    },
    openGraph: {
      type: "website",
      locale: m.ogLocale,
      alternateLocale: META[other].ogLocale,
      url: `${SITE}/${lang}`,
      siteName: "NestLine Automation",
      title: m.title,
      description: m.description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NestLine Automation" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: ["/og-image.png"],
    },
    icons: { icon: "/favicon.ico" },
    other: {
      "geo.region": "CA-QC",
      "geo.placename": "Montreal, Quebec, Canada",
      "geo.position": "45.5017;-73.5673",
      "ICBM": "45.5017, -73.5673",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!hasLocale(rawLang)) notFound();
  const lang = rawLang as Lang;

  // TODO: replace with Liem's current LinkedIn URL — old one (liem-blouin-99212a365)
  // kept as a placeholder pending confirmation, flagged separately in the site audit.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        "name": "NestLine Automation",
        "url": SITE,
        "logo": `${SITE}/logo.png`,
        "email": "liem@nestlineautomation.ca",
        "sameAs": [
          "https://www.linkedin.com/in/liem-blouin-99212a365/",
          "https://www.instagram.com/nestlineautomation/",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE}/#localbusiness`,
        "name": "NestLine Automation",
        "description":
          "Montreal-based AI consulting agency helping Quebec businesses save time and grow faster. We build custom AI systems, websites, and manage ad campaigns.",
        "url": SITE,
        "email": "liem@nestlineautomation.ca",
        "telephone": "+15143866281",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Montreal",
          "addressRegion": "QC",
          "addressCountry": "CA",
        },
        "areaServed": [
          { "@type": "City", "name": "Montreal" },
          { "@type": "City", "name": "Laval" },
          { "@type": "City", "name": "Longueuil" },
          { "@type": "City", "name": "Quebec City" },
          { "@type": "City", "name": "Gatineau" },
          { "@type": "State", "name": "Quebec" },
        ],
        "knowsAbout": ["AI Consulting", "Business Automation", "Lead Management", "Workflow Automation", "n8n", "CRM Automation"],
        "serviceType": "AI Consulting",
      },
    ],
  };

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f0f0f5]">
        <LanguageProvider lang={lang}>
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

          {/* Cursor-follow light + hidden grid reveal — sits above everything */}
          <CursorGlow />

          <CookieConsent />
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}