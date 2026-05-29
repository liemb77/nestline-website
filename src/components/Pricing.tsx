"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Zap, CheckCircle2, Clock } from "lucide-react";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";

const features = [
  "Lead intake automation",
  "Missed call text-back",
  "Automated appointment booking",
  "CRM setup & management",
  "Automated Google review requests",
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(0,232,135,0.04) 0%, transparent 65%)" }} />

      <ScrollTiltWrapper>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

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
            Simple, transparent pricing
          </h2>
          <p className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed">
            Lock in the founder's rate — only 3 spots left.
          </p>
        </motion.div>

        {/* Two-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">

          {/* LEFT — Founder's Deal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.1 }}
            className="relative rounded-2xl p-8 lg:p-10 overflow-hidden flex flex-col"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,232,135,0.06) 100%)",
              border: "1px solid rgba(0,232,135,0.25)",
              boxShadow: "0 0 80px rgba(0,232,135,0.08), 0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* Floating badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full btn-primary text-xs font-bold whitespace-nowrap">
                <Zap className="w-3 h-3" fill="currentColor" />
                Only 3 spots left
              </span>
            </div>

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/60 to-transparent" />

            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#00e887] mb-3 mt-2">
              Founder's Deal
            </p>

            <p className="text-xl font-extrabold text-white leading-snug mb-8">
              Locked-in rate for our first 3 clients —{" "}
              <span className="text-gradient">never available again.</span>
            </p>

            {/* Pricing row */}
            <div className="grid grid-cols-2 gap-5 pb-7 mb-6 border-b border-white/[0.06]">
              <div>
                <p className="text-xs text-white/35 uppercase tracking-widest mb-2">Setup Fee</p>
                <span className="text-4xl font-extrabold text-white">$600</span>
                <span className="text-white/35 text-sm ml-1.5">one-time</span>
                <p className="text-xs line-through text-white/20 mt-1">was $1,500</p>
              </div>
              <div>
                <p className="text-xs text-white/35 uppercase tracking-widest mb-2">Monthly</p>
                <span className="text-4xl font-extrabold text-white">$150</span>
                <span className="text-white/35 text-sm ml-1.5">/mo</span>
                <p className="text-xs line-through text-white/20 mt-1">was $600/month</p>
              </div>
            </div>

            <p className="text-xs text-[#00e887]/60 mb-6 leading-relaxed">
              Only 3 spots at this price. Once they're gone, the rate goes up permanently.
            </p>

            {/* Features */}
            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
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

          {/* RIGHT — Growth Plan Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.22 }}
            className="relative rounded-2xl glass p-8 lg:p-10 overflow-hidden flex flex-col opacity-70"
          >
            {/* Coming soon badge */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/5 text-white/35 border border-white/10">
              <Clock className="w-3 h-3" />
              Coming Soon
            </div>

            <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/25 mb-3">
              Growth Plan
            </p>

            <h3 className="text-xl font-bold text-white mb-4 pr-24">
              Full Business Automation System
            </h3>

            <p className="text-white/35 text-sm leading-relaxed mb-8">
              From first call to final payment — fully automated.
            </p>

            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
              {[
                "Missed call → instant client response",
                "Quote sent → automatic follow-up sequence",
                "Job booked → reminders to client & crew",
                "Job done → Google review request sent",
                "Invoice unpaid → automated payment reminders",
                "Every Monday → business summary delivered to you",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/25">
                  <CheckCircle2 className="w-4 h-4 text-white/15 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Book a Call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

        </div>
      </div>
      </ScrollTiltWrapper>
    </section>
  );
}
