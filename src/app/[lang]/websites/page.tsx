import type { Metadata } from "next";
import WebsitesClient from "./websites-client";

const SITE = "https://nestlineautomation.ca";

const META = {
  en: {
    title: "Website Design for Small Businesses",
    description:
      "Fast, clean, mobile-ready websites starting at $1,500 + $150/month. Built for small businesses that want to look professional and convert more visitors.",
  },
  fr: {
    title: "Conception de sites web pour petites entreprises",
    description:
      "Sites web rapides, propres et adaptés aux mobiles à partir de 1 500 $ + 150 $/mois. Conçus pour les petites entreprises qui veulent une image professionnelle.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang === "fr" ? "fr" : "en";
  const m = META[lang];
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE}/${lang}/websites`,
      languages: {
        "en-CA": `${SITE}/en/websites`,
        "fr-CA": `${SITE}/fr/websites`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE}/${lang}/websites`,
    },
  };
}

export default function WebsitesPage() {
  return <WebsitesClient />;
}