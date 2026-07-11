import type { Metadata } from "next";
import AiConsultingClient from "./ai-consulting-client";

const SITE = "https://nestlineautomation.ca";

const META = {
  en: {
    title: "AI Consulting for Small Businesses",
    description:
      "Done-for-you AI systems for lead capture, customer service, and business automation — built around how your business actually works, custom-quoted after a free discovery call.",
  },
  fr: {
    title: "Consultation IA pour petites entreprises",
    description:
      "Des systèmes IA clé en main pour la capture de prospects, le service client et l'automatisation d'entreprise — construits sur mesure, devis personnalisé après un appel découverte gratuit.",
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
      canonical: `${SITE}/${lang}/ai-consulting`,
      languages: {
        "en-CA": `${SITE}/en/ai-consulting`,
        "fr-CA": `${SITE}/fr/ai-consulting`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE}/${lang}/ai-consulting`,
    },
  };
}

export default function AiConsultingPage() {
  return <AiConsultingClient />;
}