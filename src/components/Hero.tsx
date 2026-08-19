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

  const textY     = useTransform(scrollYProgress, [0, 1], ["0%",  "-12%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4],[1,   0]);
  const blobOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Liquid glass blobs — each scrubs from its resting position to a different
  // spot/scale as you scroll through the hero, same mechanic as the orb before,
  // just three independent shapes instead of one.
  const b1X = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const b1Y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const b1S = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  const b2X = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const b2Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const b2S = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // b3 is centered via a baked-in -220px offset (half its 440px size) rather
  // than a CSS translate(-50%,-50%), so it can share the style object with the
  // scroll-driven x/y motion values without the two fighting over `transform`.
  const b3X = useTransform(scrollYProgress, [0, 1], [-220, -100]);
  const b3Y = useTransform(scrollYProgress, [0, 1], [-220, -320]);
  const b3S = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

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

      {/* Liquid glass blobs — scroll-scrubbed background */}
      <motion.div style={{ opacity: blobOpacity }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: b1X, y: b1Y, scale: b1S, top: "-180px", left: "-140px", width: "620px", height: "620px" }}
          className="blob blob-green"
        />
        <motion.div
          style={{ x: b2X, y: b2Y, scale: b2S, right: "-160px", bottom: "-220px", width: "680px", height: "680px" }}
          className="blob blob-white"
        />
        <motion.div
          style={{ x: b3X, y: b3Y, scale: b3S, top: "32%", left: "42%", width: "440px", height: "440px" }}
          className="blob blob-green-soft"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-24"
      >
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-[0.18em] uppercase text-white/50 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2ee6a6] animate-pulse" />
          {tx.badge}
        </motion.div>

        <motion.h1 variants={container} initial="hidden" animate="visible"
          className="font-heading text-[clamp(3rem,8vw,7rem)] leading-[0.95] mb-8 flex flex-wrap justify-center gap-x-[0.3em]">
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
          <a href="https://book.nestlineautomation.ca/"
            target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-full btn-primary text-sm font-bold">
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
