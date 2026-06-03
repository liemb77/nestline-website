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
              <img src="/logo.png" alt="NestLine" className="h-12 w-auto" />
            </a>
            <p className="text-sm text-white/30 max-w-xs leading-relaxed mb-6">{tx.tagline}</p>
            <a href="/get-started"
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
          <div className="flex items-center gap-5">
            <a href="https://www.linkedin.com/in/liem-blouin-99212a365/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:liem@nestlineautomation.ca" className="text-xs text-white/20 hover:text-white transition-colors duration-200">liem@nestlineautomation.ca</a>
            <div className="flex items-center gap-2 text-xs text-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />{tx.status}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
