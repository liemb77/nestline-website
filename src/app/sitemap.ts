import type { MetadataRoute } from "next";

const SITE = "https://nestlineautomation.ca";
const LOCALES = ["en", "fr"] as const;

const PAGES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/ai-consulting", changeFrequency: "monthly", priority: 0.9 },
  { path: "/websites", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ads", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE}/en${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        "en-CA": `${SITE}/en${path}`,
        "fr-CA": `${SITE}/fr${path}`,
      },
    },
  })).flatMap((entry) =>
    // Emit one entry per locale (each locale's URL is a distinct indexable page),
    // each carrying the same hreflang alternates.
    LOCALES.map((locale) => ({
      ...entry,
      url: entry.url.replace("/en", `/${locale}`),
    }))
  );
}