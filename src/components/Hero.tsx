"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const { lang } = useLanguage();
  const tx = t[lang].hero;

  const orbY      = useTransform(scrollYProgress, [0, 1], ["0%",  "-30%"]);
  const orbScale  = useTransform(scrollYProgress, [0, 1], [1,      0.75]);
  const orbOpacity= useTransform(scrollYProgress, [0, 0.7],[1,     0]);
  const textY     = useTransform(scrollYProgress, [0, 1], ["0%",  "-12%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4],[1,   0]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const word = {
    hidden:  { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  };
  const fadeUp = {
    hidden:  { opacity: 0, y: 24 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.7 + i * 0.12 } }),
  };

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Orb */}
      <motion.div
        style={{ y: orbY, scale: orbScale, opacity: orbOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="animate-blob relative">
          <div className="absolute rounded-full" style={{ inset: "-80px", background: "radial-gradient(circle, rgba(0,232,135,0.12) 0%, rgba(0,194,255,0.06) 50%, transparent 75%)", filter: "blur(60px)" }} />
          <div className="w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] rounded-full relative"
            style={{ background: "radial-gradient(circle at 36% 34%, rgba(180,255,220,0.95) 0%, rgba(0,232,135,0.85) 18%, rgba(0,194,255,0.6) 45%, rgba(0,60,180,0.4) 68%, rgba(0,5,20,0.95) 88%)", boxShadow: "0 0 120px rgba(0,232,135,0.3), 0 0 250px rgba(0,232,135,0.12), inset 0 0 80px rgba(0,0,0,0.5)" }}>
            <div className="absolute rounded-full" style={{ top: "11%", left: "16%", width: "28%", height: "20%", background: "rgba(255,255,255,0.28)", filter: "blur(10px)" }} />
            <div className="absolute rounded-full" style={{ top: "60%", right: "12%", width: "18%", height: "14%", background: "rgba(0,194,255,0.25)", filter: "blur(16px)" }} />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-24"
      >
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-[0.18em] uppercase text-white/50 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
          {tx.badge}
        </motion.div>

        <motion.h1 variants={container} initial="hidden" animate="visible"
          className="text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[1.02] tracking-tight mb-8 flex flex-wrap justify-center gap-x-[0.3em]">
          {tx.words.map((w, i) => (
            <motion.span key={i} variants={word} className={i === tx.words.length - 1 ? "text-gradient" : ""}>
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-4">
          {tx.sub}
        </motion.p>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-full btn-primary text-[#050505] text-sm font-bold">
            {tx.cta1}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#services" className="flex items-center gap-2 px-8 py-4 rounded-full btn-ghost text-sm font-medium">
            {tx.cta2}
          </a>
        </motion.div>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-12 text-xs text-white/30">
          <span>{tx.social}</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
        <span className="text-[11px] tracking-[0.2em] uppercase">{tx.scroll}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
}
