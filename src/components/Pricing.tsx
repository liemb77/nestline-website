"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";

const features = [
  "Lead intake automation",
  "Missed call text-back",
  "Automated appointment booking",
  "CRM setup & management",
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      {/* Cyan ambient */}
      <div className="absolute bottom-0 left-0 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(0,232,135,0.04) 0%, transparent 65%)" }} />

      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
            Pricing
          </span>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
            Lead Intake Automation
          </h2>
          <p className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed">
            One service, two ways to get started. Lock in the founder's rate before spots fill up.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">

          {/* Standard */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.1 }}
            className="rounded-2xl glass p-8 opacity-60"
          >
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/25 mb-7">
              Standard Pricing
            </p>

            <div className="pb-6 mb-6 border-b border-white/[0.06]">
              <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Setup Fee</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-white/35">$1,500</span>
                <span className="text-white/20 text-sm mb-1">one-time</span>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Monthly Retainer</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-white/35">$600</span>
                <span className="text-white/20 text-sm mb-1">/month</span>
              </div>
            </div>

            <ul className="flex flex-col gap-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/25">
                  <CheckCircle2 className="w-4 h-4 text-white/15 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Founder's Deal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.22 }}
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,232,135,0.05) 100%)",
              border: "1px solid rgba(0,232,135,0.25)",
              boxShadow: "0 0 60px rgba(0,232,135,0.08), 0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* Floating badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full btn-primary text-xs font-bold whitespace-nowrap">
                <Zap className="w-3 h-3" fill="currentColor" />
                Limited — 3 to 5 spots only
              </span>
            </div>

            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/60 to-transparent" />

            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#00e887] mb-3 mt-2">
              Founder's Deal
            </p>

            <p className="text-xl font-extrabold text-white leading-snug mb-6">
              ⚡ Only 3 to 5 spots available —{" "}
              <span className="text-gradient">ever.</span>
            </p>

            <div className="pb-6 mb-5 border-b border-white/[0.06]">
              <p className="text-xs text-white/35 uppercase tracking-widest mb-2">Setup Fee</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-extrabold text-white">$600</span>
                <span className="text-white/35 text-sm mb-1.5">one-time</span>
                <span className="mb-1.5 text-xs line-through text-white/20">$1,500</span>
              </div>
            </div>

            <div className="mb-2">
              <p className="text-xs text-white/35 uppercase tracking-widest mb-2">Monthly Retainer</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-extrabold text-white">$150</span>
                <span className="text-white/35 text-sm mb-1.5">/month</span>
                <span className="mb-1.5 text-xs line-through text-white/20">$600/mo</span>
              </div>
            </div>

            <p className="text-xs text-[#00e887]/60 mb-7 leading-relaxed">
              Only available for our first few clients. Price goes up once spots are filled.
            </p>

            <ul className="flex flex-col gap-2.5 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/65">
                  <CheckCircle2 className="w-4 h-4 text-[#00e887] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 w-full py-4 rounded-xl btn-primary text-sm font-bold transition-all duration-200"
            >
              Claim Your Spot
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/40 to-transparent" />
          </motion.div>
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-sm text-white/20 mt-10"
        >
          Custom n8n workflows and full business automation — pricing coming soon.
        </motion.p>

      </div>
    </section>
  );
}
