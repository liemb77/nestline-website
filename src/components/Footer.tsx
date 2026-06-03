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
            <a href="https://www.instagram.com/nestlineautomation/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors duration-200" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
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
