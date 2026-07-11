import type { Metadata } from "next";
import PrivacyPolicyClient from "./privacy-policy-client";

const SITE = "https://nestlineautomation.ca";

const META = {
  en: {
    title: "Privacy Policy",
    description:
      "How NestLine Automation collects, uses, and protects your personal information, in compliance with Quebec's Law 25 and Canada's PIPEDA.",
  },
  fr: {
    title: "Politique de confidentialité",
    description:
      "Comment NestLine Automation recueille, utilise et protège vos renseignements personnels, conformément à la Loi 25 du Québec et à la LPRPDE du Canada.",
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
      canonical: `${SITE}/${lang}/privacy-policy`,
      languages: {
        "en-CA": `${SITE}/en/privacy-policy`,
        "fr-CA": `${SITE}/fr/privacy-policy`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE}/${lang}/privacy-policy`,
    },
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}