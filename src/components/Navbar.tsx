"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { lang, toggle } = useLanguage();
  const tx = t[lang].nav;

  const baseLinks = [
    { label: tx.problem,  href: "#problem" },
    { label: tx.services, href: "#services" },
    { label: tx.pricing,  href: "#pricing" },
    { label: tx.websites, href: "/websites" },
    { label: tx.contact,  href: "#contact" },
  ];

  const links = baseLinks.map((l) =>
    l.href.startsWith("#") && !isHome ? { ...l, href: `/${l.href}` } : l
  );

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt="NestLine" className="h-16 lg:h-20 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                l.href === "/websites" && pathname === "/websites"
                  ? "text-white"
                  : "text-white/45 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA + lang toggle + mobile button */}
        <div className="flex items-center gap-3">
          {/* Language toggle — always visible */}
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="flex items-center gap-1 px-4 py-2 rounded-full font-bold text-sm transition-all duration-200"
            style={{
              background: "rgba(0,232,135,0.10)",
              border: "1px solid rgba(0,232,135,0.35)",
              color: "#00e887",
            }}
          >
            <span style={{ opacity: lang === "en" ? 1 : 0.4 }}>EN</span>
            <span style={{ opacity: 0.35, margin: "0 2px" }}>|</span>
            <span style={{ opacity: lang === "fr" ? 1 : 0.4 }}>FR</span>
          </button>

          <Link
            href="/get-started"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full btn-primary text-sm font-bold"
          >
            {lang === "en" ? "Get Started" : "Commencer"}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white/50 hover:text-white transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              {/* Mobile lang toggle */}
              <button
                onClick={toggle}
                className="self-start flex items-center gap-1 px-4 py-2 rounded-full font-bold text-sm transition-all duration-200"
                style={{ background: "rgba(0,232,135,0.10)", border: "1px solid rgba(0,232,135,0.35)", color: "#00e887" }}
              >
                <span style={{ opacity: lang === "en" ? 1 : 0.4 }}>EN</span>
                <span style={{ opacity: 0.35, margin: "0 2px" }}>|</span>
                <span style={{ opacity: lang === "fr" ? 1 : 0.4 }}>FR</span>
              </button>
              <Link
                href="/get-started"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex justify-center py-3 rounded-full btn-primary text-sm font-bold"
              >
                {lang === "en" ? "Get Started" : "Commencer"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
