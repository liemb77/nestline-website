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
    <div className="min-h-screen flex flex-col" style={{ background: "#050505" }}>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="NestLine Automation" className="h-16 lg:h-20 w-auto" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[13px] font-medium text-white/45 hover:text-white tracking-wide transition-colors duration-200">Home</Link>
            <Link href="/#pricing" className="text-[13px] font-medium text-white/45 hover:text-white tracking-wide transition-colors duration-200">Pricing</Link>
            <Link href="/#contact" className="text-[13px] font-medium text-white/45 hover:text-white tracking-wide transition-colors duration-200">Contact</Link>
            <a
              href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full btn-primary text-sm"
            >
              Book a Call
            </a>
          </div>
        </div>
      </motion.nav>

      <main className="flex-1 pt-[72px]">

        {/* Hero */}
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden py-24">
          {/* Grid bg */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,232,135,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,232,135,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(0,232,135,0.07) 0%, transparent 60%)" }} />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div initial="hidden" animate="visible" className="flex flex-col items-center gap-6">

              <motion.span
                custom={0}
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
                Contractor Websites
              </motion.span>

              <motion.h1
                custom={1}
                variants={itemVariants}
                className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.06] tracking-tight"
              >
                Sites That{" "}
                <span className="text-gradient">Actually Convert</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={itemVariants}
                className="text-lg sm:text-xl text-white/40 max-w-2xl leading-relaxed"
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
                className="group flex items-center gap-2.5 px-7 py-4 rounded-full btn-primary text-sm font-bold mt-2"
              >
                Get Your Website Built
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        </section>

        {/* Pricing cards */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">

              {/* One & Done */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.15 }}
                className="relative rounded-2xl p-8 overflow-hidden flex flex-col gap-6"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,232,135,0.05) 100%)",
                  border: "1px solid rgba(0,232,135,0.2)",
                  boxShadow: "0 20px 60px rgba(0,232,135,0.06)",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/40 to-transparent" />

                <div>
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#00e887] mb-3">One &amp; Done</p>
                  <h2 className="text-xl font-extrabold text-white mb-2">Own it completely</h2>
                  <p className="text-white/35 text-sm leading-relaxed">Full custom website built for your trade. You own it — no strings attached.</p>
                  <p className="text-xs font-semibold text-[#00e887]/60 mt-2">No monthly fees, ever.</p>
                </div>

                <div className="pb-6 border-b border-white/[0.06]">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-extrabold text-white">$1,500</span>
                    <span className="text-white/30 text-base mb-1.5">one-time</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3">
                  {features.map(({ icon: Icon, label }, i) => (
                    <motion.li
                      key={label}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="flex items-center gap-3 text-sm text-white/55"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#00e887]/8 border border-[#00e887]/15 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[#00e887]" />
                      </div>
                      {label}
                    </motion.li>
                  ))}
                </ul>

                <a
                  href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-xl btn-primary text-sm font-bold"
                >
                  Get Your Website Built
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/30 to-transparent" />
              </motion.div>

              {/* Build + Care */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.28 }}
                className="relative rounded-2xl glass p-8 overflow-hidden flex flex-col gap-6"
              >
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#00c2ff] mb-3">Build + Care</p>
                  <h2 className="text-xl font-extrabold text-white mb-2">We handle everything</h2>
                  <p className="text-white/35 text-sm leading-relaxed">Same great website, plus we handle updates, support, and tweaks every month.</p>
                </div>

                <div className="pb-6 border-b border-white/[0.06]">
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-extrabold text-white">$800</span>
                    <span className="text-white/30 text-base mb-1.5">setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white/55">+$100</span>
                    <span className="text-white/25 text-sm">/month ongoing</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3">
                  {features.map(({ icon: Icon, label }, i) => (
                    <motion.li
                      key={label}
                      custom={i + 6}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="flex items-center gap-3 text-sm text-white/55"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#00c2ff]/8 border border-[#00c2ff]/15 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[#00c2ff]" />
                      </div>
                      {label}
                    </motion.li>
                  ))}
                </ul>

                <a
                  href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    background: "rgba(0,194,255,0.15)",
                    border: "1px solid rgba(0,194,255,0.3)",
                    color: "#00c2ff",
                  }}
                >
                  Start With Care Plan
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>

            </div>

            {/* Bundle note */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 rounded-2xl glass px-6 py-5 text-center"
            >
              <p className="text-sm text-white/40 leading-relaxed">
                <span className="text-white font-semibold">Get the website + maintenance together</span>{" "}
                and save $150 on setup.{" "}
                <a
                  href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00e887] hover:underline font-medium"
                >
                  Book a call to claim the bundle deal.
                </a>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-center text-sm text-white/20 mt-5 leading-relaxed"
            >
              Need automation + a website?{" "}
              <a
                href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00e887]/60 hover:text-[#00e887] hover:underline transition-colors"
              >
                Book a call to get a custom quote.
              </a>
            </motion.p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="NestLine Automation" className="h-10 w-auto" />
          </Link>
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} NestLine Automation. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
            All systems operational
          </div>
        </div>
      </footer>

    </div>
  );
}
