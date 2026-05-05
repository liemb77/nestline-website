"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquareText, GitBranch, Settings2, CheckCircle2, Clock,
  CalendarCheck, Workflow, BarChart3, ArrowRight,
} from "lucide-react";

const processSteps = [
  { icon: CalendarCheck, n: "01", label: "Discovery Call",  desc: "We audit your current process" },
  { icon: GitBranch,     n: "02", label: "Custom Build",   desc: "We build your automation stack" },
  { icon: Workflow,      n: "03", label: "Launch & Test",  desc: "Live testing with real data" },
  { icon: BarChart3,     n: "04", label: "Optimize",       desc: "Ongoing refinement & support" },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="py-28 lg:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #080a0e 50%, #050505 100%)" }}>

      {/* Subtle green glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(0,232,135,0.05) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
            What We Build
          </span>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
            Three ways we put your
            <br />
            <span className="text-gradient">business on autopilot</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Each service is built custom for your trade, your tools, and your team.
            Real automation that fits how you actually work.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">

          {/* Card 1 — Lead Intake (active) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.1 }}
            className="group relative rounded-2xl glass glass-hover p-8 overflow-hidden flex flex-col gap-6"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/50 to-transparent" />

            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#00e887]/10 border border-[#00e887]/20 flex items-center justify-center">
                <MessageSquareText className="w-5 h-5 text-[#00e887]" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00e887]/10 text-[#00e887] border border-[#00e887]/20">
                Most Popular
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#00e887]/60 mb-2">
                Never miss a lead again
              </p>
              <h3 className="text-xl font-bold text-white mb-3">Lead Intake Automation</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Every inquiry from your website, Google, or Facebook gets captured,
                acknowledged instantly, and routed — automatically. 24/7.
              </p>
            </div>

            <ul className="flex flex-col gap-2.5 mt-auto">
              {[
                "Instant auto-reply via SMS & email",
                "CRM entry & lead scoring",
                "Missed call text-back",
                "Appointment booking flow",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                  <CheckCircle2 className="w-4 h-4 text-[#00e887] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-2 text-sm font-semibold text-[#00e887] hover:gap-3 transition-all duration-200 mt-1"
            >
              Get started
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </a>
          </motion.div>

          {/* Card 2 — Custom n8n (coming soon) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.2 }}
            className="relative rounded-2xl p-8 overflow-hidden flex flex-col gap-6 opacity-45 cursor-not-allowed select-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-white/20" />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/5 text-white/30 border border-white/8">
                <Clock className="w-3 h-3" />
                Coming Soon
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/20 mb-2">
                Your exact process, automated
              </p>
              <h3 className="text-xl font-bold text-white/35 mb-3">Custom n8n Workflows</h3>
              <p className="text-white/25 text-sm leading-relaxed">
                Full custom automation pipelines built around your exact process. Coming soon.
              </p>
            </div>
          </motion.div>

          {/* Card 3 — Business Process (coming soon) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.3 }}
            className="relative rounded-2xl p-8 overflow-hidden flex flex-col gap-6 opacity-45 cursor-not-allowed select-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center">
                <Settings2 className="w-5 h-5 text-white/20" />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/5 text-white/30 border border-white/8">
                <Clock className="w-3 h-3" />
                Coming Soon
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/20 mb-2">
                Systemize the whole operation
              </p>
              <h3 className="text-xl font-bold text-white/35 mb-3">Business Process Automation</h3>
              <p className="text-white/25 text-sm leading-relaxed">
                Audit your entire operation and automate the parts costing you time and money. Coming soon.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Process steps */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.45 }}
          className="rounded-2xl glass p-8 lg:p-12"
        >
          <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-white/25 mb-10">
            How It Works
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.label} className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#00e887]/8 border border-[#00e887]/15 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-[#00e887]" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold text-[#00e887]/60">
                    {step.n}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{step.label}</p>
                  <p className="text-xs text-white/35 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
