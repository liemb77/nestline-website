"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Users, CheckCircle2, ArrowRight, Target, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

const statIcons = [Target, TrendingUp, Zap, BarChart3];

export default function AdsManagement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].ads;

  return (
    <section id="ads" ref={ref} className="py-28 lg:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #080b12 50%, #050505 100%)" }}>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(0,194,255,0.04) 0%, transparent 60%)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 100% 100%, rgba(0,232,135,0.04) 0%, transparent 60%)" }} />

      <ScrollTiltWrapper>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            {/* Google Ads */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
              className="group relative rounded-2xl glass glass-hover p-8 overflow-hidden flex flex-col gap-6">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/50 to-transparent" />
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#00e887]/10 border border-[#00e887]/20 flex items-center justify-center">
                  <Search className="w-5 h-5 text-[#00e887]" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00e887]/10 text-[#00e887] border border-[#00e887]/20">{tx.google.badge}</span>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#00e887]/60 mb-2">{tx.google.tag}</p>
                <h3 className="text-xl font-bold text-white mb-3">{tx.google.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{tx.google.desc}</p>
              </div>
              <ul className="flex flex-col gap-2.5 mt-auto">
                {tx.google.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                    <CheckCircle2 className="w-4 h-4 text-[#00e887] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist"
                className="group/btn flex items-center gap-2 text-sm font-semibold text-[#00e887] hover:gap-3 transition-all duration-200 mt-1">
                {tx.cta}<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </motion.div>

            {/* Meta Ads */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
              className="group relative rounded-2xl glass glass-hover p-8 overflow-hidden flex flex-col gap-6">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00c2ff]/50 to-transparent" />
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#00c2ff]/10 border border-[#00c2ff]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#00c2ff]" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00c2ff]/10 text-[#00c2ff] border border-[#00c2ff]/20">{tx.meta.badge}</span>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#00c2ff]/60 mb-2">{tx.meta.tag}</p>
                <h3 className="text-xl font-bold text-white mb-3">{tx.meta.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{tx.meta.desc}</p>
              </div>
              <ul className="flex flex-col gap-2.5 mt-auto">
                {tx.meta.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                    <CheckCircle2 className="w-4 h-4 text-[#00c2ff] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist"
                className="group/btn flex items-center gap-2 text-sm font-semibold text-[#00c2ff] hover:gap-3 transition-all duration-200 mt-1">
                {tx.cta}<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Why it works panel */}
          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.35 }}
            className="rounded-2xl glass p-8 lg:p-12">
            <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-white/25 mb-10">{tx.whyTitle}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {tx.stats.map((stat, i) => {
                const Icon = statIcons[i];
                return (
                  <div key={stat.label} className="flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#00e887]/8 border border-[#00e887]/15 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#00e887]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{stat.label}</p>
                      <p className="text-xs text-white/35 mt-1">{stat.desc}</p>
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
