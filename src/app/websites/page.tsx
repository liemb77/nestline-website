"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Smartphone, MapPin, Search, Gauge, Mail, Globe } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Globe,      label: "Custom design tailored to your trade" },
  { icon: Smartphone, label: "Fully mobile responsive" },
  { icon: Mail,       label: "Built-in contact form" },
  { icon: MapPin,     label: "Google Maps embed" },
  { icon: Search,     label: "SEO basics included" },
  { icon: Gauge,      label: "Fast load time, optimised images" },
];


const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.09 },
  }),
};

export default function WebsitesPage() {
  return (
    <div className="min-h-screen bg-[#08090d] text-[#f0f0f5] flex flex-col">

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#08090d]/90 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="NestLine Automation" className="h-16 lg:h-20 w-auto" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-white/55 hover:text-white transition-colors">Home</Link>
            <Link href="/#pricing" className="text-sm text-white/55 hover:text-white transition-colors">Pricing</Link>
            <Link href="/#contact" className="text-sm text-white/55 hover:text-white transition-colors">Contact</Link>
            <a
              href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#00c2ff] text-[#08090d] text-sm font-semibold hover:bg-white transition-colors duration-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </motion.nav>

      <main className="flex-1 pt-20">

        {/* ── Hero ── */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-24">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,194,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(0,194,255,0.1)_0%,transparent_65%)]" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-6"
            >
              <motion.span
                custom={0}
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#00c2ff]/10 text-[#00c2ff] border border-[#00c2ff]/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c2ff] animate-pulse" />
                Contractor Websites
              </motion.span>

              <motion.h1
                custom={1}
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight"
              >
                We Build Sites That{" "}
                <span className="gradient-text">Actually Convert</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={itemVariants}
                className="text-lg sm:text-xl text-white/55 max-w-2xl leading-relaxed"
              >
                Fast, clean, mobile-ready websites built for contractors who want to
                look professional and win more jobs online.
              </motion.p>

              <motion.a
                custom={3}
                variants={itemVariants}
                href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#00c2ff] text-[#08090d] font-semibold text-base hover:bg-white transition-all duration-200 mt-2"
                style={{ boxShadow: "0 0 30px rgba(0,194,255,0.25), 0 0 60px rgba(0,194,255,0.1)" }}
              >
                Get Your Website Built
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#08090d] to-transparent pointer-events-none" />
        </section>

        {/* ── Pricing cards ── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

              {/* Card 1 — One & Done */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.15 }}
                className="relative rounded-2xl border border-[#00c2ff]/25 p-8 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0f1117 0%, rgba(0,194,255,0.06) 100%)",
                  boxShadow: "0 24px 64px rgba(0,194,255,0.09), 0 0 0 1px rgba(0,194,255,0.12)",
                }}
              >
                <p className="text-xs font-bold tracking-widest uppercase text-[#00c2ff] mb-2">
                  One & Done
                </p>
                <h2 className="text-xl font-extrabold text-white mb-1">
                  One & Done
                </h2>
                <p className="text-white/45 text-sm mb-1">
                  Full custom website built for your trade. You own it completely — no strings attached.
                </p>
                <p className="text-xs font-semibold text-[#00c2ff]/80 mb-7">No monthly fees, ever.</p>

                <div className="flex items-end gap-2 mb-7 pb-7 border-b border-white/6">
                  <span className="text-5xl font-extrabold text-white">$1,500</span>
                  <span className="text-white/40 text-base mb-1.5">one-time</span>
                </div>

                <ul className="flex flex-col gap-3 mb-8">
                  {features.map(({ icon: Icon, label }, i) => (
                    <motion.li
                      key={label}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="flex items-center gap-3 text-sm text-white/70"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#00c2ff]/10 border border-[#00c2ff]/15 flex items-center justify-center shrink-0">
                        <Icon className="w-3 h-3 text-[#00c2ff]" />
                      </div>
                      {label}
                    </motion.li>
                  ))}
                </ul>

                <a
                  href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-[#00c2ff] hover:bg-white text-[#08090d] font-semibold text-sm transition-all duration-200"
                  style={{ boxShadow: "0 0 24px rgba(0,194,255,0.2)" }}
                >
                  Get Your Website Built
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00c2ff] to-[#7b61ff]" />
              </motion.div>

              {/* Card 2 — Build + Care */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.28 }}
                className="relative rounded-2xl border border-[#7b61ff]/25 p-8 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #0f1117 0%, rgba(123,97,255,0.06) 100%)",
                  boxShadow: "0 24px 64px rgba(123,97,255,0.08), 0 0 0 1px rgba(123,97,255,0.12)",
                }}
              >
                <p className="text-xs font-bold tracking-widest uppercase text-[#7b61ff] mb-2">
                  Build + Care
                </p>
                <h2 className="text-xl font-extrabold text-white mb-1">
                  Build + Care
                </h2>
                <p className="text-white/45 text-sm mb-7">
                  Same great website, plus we handle everything ongoing — updates, support, and tweaks every month.
                </p>

                <div className="mb-7 pb-7 border-b border-white/6">
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-extrabold text-white">$800</span>
                    <span className="text-white/40 text-base mb-1.5">one-time setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white/70">+$100</span>
                    <span className="text-white/35 text-sm">/month ongoing</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-8">
                  {features.map(({ icon: Icon, label }, i) => (
                    <motion.li
                      key={label}
                      custom={i + 6}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="flex items-center gap-3 text-sm text-white/70"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#7b61ff]/10 border border-[#7b61ff]/15 flex items-center justify-center shrink-0">
                        <Icon className="w-3 h-3 text-[#7b61ff]" />
                      </div>
                      {label}
                    </motion.li>
                  ))}
                </ul>

                <a
                  href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-[#7b61ff] hover:bg-white text-white hover:text-[#08090d] font-semibold text-sm transition-all duration-200"
                  style={{ boxShadow: "0 0 24px rgba(123,97,255,0.2)" }}
                >
                  Start With Care Plan
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7b61ff] to-[#b44dff]" />
              </motion.div>

            </div>

            {/* Bundle note */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 rounded-2xl bg-white/3 border border-white/6 px-6 py-5 text-center"
            >
              <p className="text-sm text-white/50 leading-relaxed">
                <span className="text-white font-semibold">Get the website + maintenance together</span>{" "}
                and save $150 on setup.{" "}
                <a
                  href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00c2ff] hover:underline font-medium"
                >
                  Book a call to claim the bundle deal.
                </a>
              </p>
            </motion.div>

            {/* Automation bundle note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-center text-sm text-white/25 mt-5 leading-relaxed"
            >
              Need automation + a website?{" "}
              <a
                href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00c2ff]/70 hover:text-[#00c2ff] hover:underline transition-colors"
              >
                Book a call to get a custom quote.
              </a>
            </motion.p>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="NestLine Automation" height="32" className="h-8 w-auto" />
          </Link>
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} NestLine Automation. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </footer>
    </div>
  );
}
