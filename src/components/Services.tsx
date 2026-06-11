"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquareText, Globe, Megaphone, CheckCircle2, CalendarCheck, Workflow, BarChart3, ArrowRight } from "lucide-react";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

const stepIcons = [CalendarCheck, Globe, Workflow, BarChart3];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].services;

  return (
    <section id="services" ref={ref} className="py-28 lg:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #080a0e 50%, #050505 100%)" }}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(0,232,135,0.05) 0%, transparent 60%)" }} />

      <ScrollTiltWrapper>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="text-center mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
              {tx.badge}
            </span>
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
              {tx.headline1}<br />
              <span className="text-gradient">{tx.headline2}</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">{tx.sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">
            {/* Card 1 */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.1 }}
              className="group relative rounded-2xl glass glass-hover p-8 overflow-hidden flex flex-col gap-6">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/50 to-transparent" />
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#00e887]/10 border border-[#00e887]/20 flex items-center justify-center">
                  <MessageSquareText className="w-5 h-5 text-[#00e887]" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00e887]/10 text-[#00e887] border border-[#00e887]/20">{tx.card1.badge}</span>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#00e887]/60 mb-2">{tx.card1.tag}</p>
                <h3 className="text-xl font-bold text-white mb-3">{tx.card1.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{tx.card1.desc}</p>
              </div>
              <ul className="flex flex-col gap-2.5 mt-auto">
                {tx.card1.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                    <CheckCircle2 className="w-4 h-4 text-[#00e887] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <a href="/get-started"
                className="group/btn flex items-center gap-2 text-sm font-semibold text-[#00e887] hover:gap-3 transition-all duration-200 mt-1">
                {tx.card1.cta}<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </motion.div>

            {/* Card 2 — Website Design */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.2 }}
              className="group relative rounded-2xl glass glass-hover p-8 overflow-hidden flex flex-col gap-6">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/50 to-transparent" />
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#00e887]/10 border border-[#00e887]/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#00e887]" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00e887]/10 text-[#00e887] border border-[#00e887]/20">{tx.card2.badge}</span>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#00e887]/60 mb-2">{tx.card2.tag}</p>
                <h3 className="text-xl font-bold text-white mb-3">{tx.card2.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{tx.card2.desc}</p>
              </div>
              <ul className="flex flex-col gap-2.5 mt-auto">
                {tx.card2.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                    <CheckCircle2 className="w-4 h-4 text-[#00e887] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
                className="group/btn flex items-center gap-2 text-sm font-semibold text-[#00e887] hover:gap-3 transition-all duration-200 mt-1">
                {tx.card2.cta}<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </motion.div>

            {/* Card 3 — Ads Management */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.3 }}
              className="group relative rounded-2xl glass glass-hover p-8 overflow-hidden flex flex-col gap-6">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/50 to-transparent" />
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#00e887]/10 border border-[#00e887]/20 flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-[#00e887]" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00e887]/10 text-[#00e887] border border-[#00e887]/20">{tx.card3.badge}</span>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#00e887]/60 mb-2">{tx.card3.tag}</p>
                <h3 className="text-xl font-bold text-white mb-3">{tx.card3.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{tx.card3.desc}</p>
              </div>
              <ul className="flex flex-col gap-2.5 mt-auto">
                {tx.card3.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                    <CheckCircle2 className="w-4 h-4 text-[#00e887] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <a href="/ads"
                className="group/btn flex items-center gap-2 text-sm font-semibold text-[#00e887] hover:gap-3 transition-all duration-200 mt-1">
                {tx.card3.cta}<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Process steps */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.45 }}
            className="rounded-2xl glass p-8 lg:p-12">
            <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-white/25 mb-10">{tx.processTitle}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {tx.steps.map((step, i) => {
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
  );
}
