"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CalendarCheck, Globe, Workflow, BarChart3 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

const stepIcons = [CalendarCheck, Globe, Workflow, BarChart3];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.09 },
  }),
};

export default function AiConsultingPage() {
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].aiConsulting;
  const stx = t[lang].services;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tx.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden py-24">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(0,232,135,0.05) 0%, transparent 65%)" }} />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
              <motion.span custom={0} variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
                {tx.badge}
              </motion.span>

              <motion.h1 custom={1} variants={itemVariants}
                className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.06] tracking-tight">
                {tx.headline}<span className="text-gradient">{tx.headlineGradient}</span>
              </motion.h1>

              <motion.p custom={2} variants={itemVariants}
                className="text-lg sm:text-xl text-white/40 max-w-2xl leading-relaxed">
                {tx.sub}
              </motion.p>

              <motion.a custom={3} variants={itemVariants}
                href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-7 py-4 rounded-full btn-primary text-sm font-bold mt-2">
                {tx.heroCta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        </section>

        {/* ── How It Works ── */}
        <section ref={processRef} className="py-20 lg:py-28 relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, #050505 0%, #080a0e 50%, #050505 100%)" }}>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(0,232,135,0.05) 0%, transparent 60%)" }} />

          <ScrollTiltWrapper>
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="rounded-2xl glass p-8 lg:p-12"
              >
                <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-white/25 mb-10">{stx.processTitle}</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {stx.steps.map((step, i) => {
                    const Icon = stepIcons[i];
                    return (
                      <div key={step.label} className="flex flex-col items-center text-center gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl bg-[#00e887]/8 border border-[#00e887]/15 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-[#00e887]" />
                          </div>
                          <span className="absolute -top-2 -right-2 text-[10px] font-bold text-[#00e887]/60">0{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{step.label}</p>
                          <p className="text-xs text-white/35 mt-1">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </ScrollTiltWrapper>
        </section>

        {/* ── Pricing (full tier breakdown) ── */}
        <Pricing />

        {/* ── FAQ ── */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-white/25 mb-10">{tx.faqTitle}</p>
            <div className="flex flex-col gap-3">
              {tx.faq.map((item) => (
                <details key={item.q} className="group rounded-xl glass px-6 py-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-bold text-white">
                    {item.q}
                    <span className="text-[#00e887] text-lg leading-none transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-sm text-white/45 leading-relaxed mt-3">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="NestLine Automation" className="h-10 w-auto" />
          </Link>
          <p className="text-xs text-white/20">© {new Date().getFullYear()} NestLine Automation. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
            All systems operational
          </div>
        </div>
      </footer>
    </>
  );
}
