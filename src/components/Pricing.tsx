"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(0,194,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#00c2ff]/10 text-[#00c2ff] border border-[#00c2ff]/20 mb-6">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Lead Intake Automation
          </h2>
          <p className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed">
            One service, two ways to get started. Lock in the founder's rate before spots fill up.
          </p>
        </motion.div>

        {/* Two-card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* Option 1 — Regular Price (secondary/faded) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
            className="rounded-2xl bg-[#0f1117] border border-white/6 p-8 opacity-70"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-6">
              Standard Pricing
            </p>

            {/* Setup fee */}
            <div className="mb-5 pb-5 border-b border-white/6">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Setup Fee</p>
              <div className="flex items-end gap-1.5">
                <span className="text-3xl font-extrabold text-white/40">$1,500</span>
                <span className="text-white/25 text-sm mb-1">one-time</span>
              </div>
            </div>

            {/* Monthly retainer */}
            <div className="mb-8">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Monthly Retainer</p>
              <div className="flex items-end gap-1.5">
                <span className="text-3xl font-extrabold text-white/40">$600</span>
                <span className="text-white/25 text-sm mb-1">/month</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                "Lead intake automation",
                "Missed call text-back",
                "Automated appointment booking",
                "CRM setup & management",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-white/30">
                  <CheckCircle2 className="w-4 h-4 text-white/20 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Option 2 — Founder's Deal (hero/highlighted) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.22 }}
            className="relative rounded-2xl border border-[#00c2ff]/30 p-8 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0f1117 0%, rgba(0,194,255,0.07) 100%)",
              boxShadow: "0 20px 60px rgba(0,194,255,0.1), 0 0 0 1px rgba(0,194,255,0.15)",
            }}
          >
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00c2ff] text-[#08090d] text-xs font-bold whitespace-nowrap">
                <Zap className="w-3 h-3" fill="currentColor" />
                Limited — 3 to 5 spots only
              </span>
            </div>

            <p className="text-xs font-bold tracking-widest uppercase text-[#00c2ff] mb-4 mt-2">
              Founder's Deal
            </p>

            {/* Scarcity headline */}
            <p className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-6 mt-4">
              ⚡ Only 3 to 5 spots available —{" "}
              <span className="text-[#00c2ff]">ever.</span>
            </p>

            {/* Setup fee */}
            <div className="mb-5 pb-5 border-b border-white/6">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Setup Fee</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-white">$600</span>
                <span className="text-white/40 text-sm mb-1.5">one-time</span>
                <span className="mb-1.5 text-xs line-through text-white/25">$1,500</span>
              </div>
            </div>

            {/* Monthly retainer */}
            <div className="mb-3">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Monthly Retainer</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-white">$150</span>
                <span className="text-white/40 text-sm mb-1.5">/month</span>
                <span className="mb-1.5 text-xs line-through text-white/25">$600/mo</span>
              </div>
            </div>

            {/* Urgency note */}
            <p className="text-xs text-[#00c2ff]/80 leading-relaxed mb-7">
              Only available for our first few clients. Price goes up once spots are filled.
            </p>

            <div className="flex flex-col gap-2.5 mb-8">
              {[
                "Lead intake automation",
                "Missed call text-back",
                "Automated appointment booking",
                "CRM setup & management",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2ff] shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#00c2ff] hover:bg-white text-[#08090d] font-semibold text-sm transition-all duration-200 glow-accent"
            >
              Claim Your Spot
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00c2ff] to-[#7b61ff]" />
          </motion.div>
        </div>

        {/* Coming soon footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-center text-sm text-white/25 mt-10"
        >
          Custom n8n workflows and full business automation — pricing coming soon.
        </motion.p>
      </div>
    </section>
  );
}
