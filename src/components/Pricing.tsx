"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { NestlinePricing } from "@/components/ui/interactive-pricing-component";

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-0 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(0,232,135,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
            Pricing
          </span>

          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
            Simple, transparent pricing
          </h2>

          <p className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed">
            Lock in the founder's rate before spots fill up.
          </p>
        </motion.div>

        {/* ── Pricing cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            delay: 0.1,
          }}
        >
          <NestlinePricing />
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-white/20 mt-10"
        >
          No long-term contracts. Cancel anytime. Results in 14 days or we keep working until you see them.
        </motion.p>
      </div>
    </section>
  );
}
