"use client";

import { createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";

export type Lang = "en" | "fr";

export const LOCALES: Lang[] = ["en", "fr"];
export const DEFAULT_LOCALE: Lang = "en";

interface LangCtx {
  lang: Lang;
  toggle: () => void;
  /** Prefixes an internal absolute path with the current locale. Anchors, mailto:, and external URLs pass through unchanged. */
  href: (path: string) => string;
}

const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function toggle() {
    const other: Lang = lang === "en" ? "fr" : "en";
    const segments = pathname.split("/");
    // segments[0] is "" (leading slash), segments[1] is the locale
    segments[1] = other;
    router.push(segments.join("/") || `/${other}`);
  }

  function href(path: string) {
    if (path.startsWith("#") || path.startsWith("http") || path.startsWith("mailto:")) {
      return path;
    }
    if (path === "/") return `/${lang}`;
    return `/${lang}${path}`;
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, href }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}