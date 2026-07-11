import type { Metadata } from "next";
import AdsClient from "./ads-client";

const SITE = "https://nestlineautomation.ca";

// NOTE: metadata mirrors the current page copy (contractor-focused ads management with
// fixed pricing). That positioning is flagged as needing Liem's confirmation — see the
// site audit summary. Revisit this metadata if the page content changes.
const META = {
  en: {
    title: "Google & Meta Ads Management",
    description:
      "We manage your Google and Meta ad campaigns so you get a steady flow of qualified leads, without wasting budget on clicks that don't convert.",
  },
  fr: {
    title: "Gestion de publicités Google et Meta",
    description:
      "On gère vos campagnes publicitaires Google et Meta pour obtenir un flux constant de prospects qualifiés, sans gaspiller votre budget sur des clics inefficaces.",
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
      canonical: `${SITE}/${lang}/ads`,
      languages: {
        "en-CA": `${SITE}/en/ads`,
        "fr-CA": `${SITE}/fr/ads`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE}/${lang}/ads`,
    },
  };
}

export default function AdsPage() {
  return <AdsClient />;
}