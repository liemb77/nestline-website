"use client";

import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const tx = t[lang].footer;

  const links = {
    [tx.company]: [
      { label: t[lang].nav.services,  href: "#services" },
      { label: t[lang].nav.pricing,   href: "#pricing" },
      { label: t[lang].nav.contact,   href: "#contact" },
      { label: t[lang].nav.websites,  href: "/websites" },
    ],
    [tx.trades]: [
      { label: lang === "en" ? "Plumbers"     : "Plombiers",      href: "#" },
      { label: lang === "en" ? "Roofers"      : "Couvreurs",      href: "#" },
      { label: lang === "en" ? "Landscapers"  : "Paysagistes",    href: "#" },
      { label: "HVAC",                                              href: "#" },
      { label: lang === "en" ? "Electricians" : "Électriciens",   href: "#" },
    ],
  };

  return (
    <footer className="relative border-t border-white/[0.05] pt-16 pb-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#00e887]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2">
            <a href="/" className="inline-flex items-center mb-5">
              <img src="/logo.svg" alt="NestLine" className="h-12 w-auto" />
            </a>
            <p className="text-sm text-white/30 max-w-xs leading-relaxed mb-6">{tx.tagline}</p>
            <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-primary text-sm font-bold">
              {tx.bookCall}
            </a>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/20 mb-5">{group}</p>
              <ul className="flex flex-col gap-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-white/35 hover:text-white transition-colors duration-200">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="divider mb-7" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">© {new Date().getFullYear()} NestLine Automation. {tx.copyright}</p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />{tx.status}
          </div>
        </div>
      </div>
    </footer>
  );
}
