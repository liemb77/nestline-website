"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

export default function Founder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].founder;

  return (
    <section id="founder" ref={ref} className="py-20 lg:py-28 relative overflow-hidden">
      <ScrollGlow />
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ee6a6] animate-pulse" />
            {tx.badge}
          </span>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] mb-6">
            {tx.headline} <span className="text-gradient">{tx.headlineGradient}</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">{tx.body}</p>
        </motion.div>
      </div>
    </section>
  );
}

function ScrollGlow() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(ellipse, rgba(46,230,166,0.03) 0%, transparent 70%)" }} />
  );
}