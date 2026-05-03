"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Workflow, GitBranch, Settings2, MessageSquareText, CalendarCheck, BarChart3, CheckCircle2, Clock } from "lucide-react";

const processSteps = [
  { icon: CalendarCheck, label: "Discovery Call", desc: "We audit your current process" },
  { icon: GitBranch, label: "Custom Build", desc: "We build your automation stack" },
  { icon: Workflow, label: "Launch & Test", desc: "Live testing with real data" },
  { icon: BarChart3, label: "Optimize", desc: "Ongoing refinement & support" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.15 },
  }),
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#0c0d12] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(123,97,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#00c2ff]/10 text-[#00c2ff] border border-[#00c2ff]/20 mb-6">
            What We Build
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Three ways we put your
            <br />
            <span className="gradient-text">business on autopilot</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Each service is built custom for your trade, your tools, and your team.
            No off-the-shelf templates — real automation that fits how you work.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">

          {/* Card 1 — Lead Intake Automation (active) */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="group relative rounded-2xl bg-[#0f1117] border border-white/5 p-8 overflow-hidden hover:border-white/10 transition-all duration-300"
            whileHover={{
              boxShadow: "0 20px 60px rgba(0,194,255,0.12)",
              y: -4,
              transition: { duration: 0.3 },
            }}
          >
            <span className="absolute top-6 right-6 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#00c2ff] to-[#0066ff] text-white">
              Most Popular
            </span>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00c2ff] to-[#0066ff] flex items-center justify-center mb-6 shadow-lg">
              <MessageSquareText className="w-6 h-6 text-white" />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2 bg-gradient-to-r from-[#00c2ff] to-[#0066ff] bg-clip-text text-transparent">
              Never miss a lead again
            </p>
            <h3 className="text-xl font-bold text-white mb-4">Lead Intake Automation</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Every inquiry from your website, Google, Facebook, or Angi gets captured,
              acknowledged instantly, and routed to the right place — automatically.
              Your potential customers get a fast response 24/7.
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                "Instant auto-reply via SMS & email",
                "CRM entry & lead scoring",
                "Missed call text-back",
                "Appointment booking flow",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-white/65">
                  <CheckCircle2 className="w-4 h-4 text-[#00c2ff] shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00c2ff] to-[#0066ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>

          {/* Card 2 — Custom n8n Workflows (coming soon) */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="relative rounded-2xl border border-white/4 p-8 overflow-hidden opacity-50 cursor-not-allowed select-none"
            style={{ background: "linear-gradient(135deg, #0d0e13 0%, #0f1015 100%)" }}
          >
            {/* Frosted overlay to reinforce disabled feel */}
            <div className="absolute inset-0 rounded-2xl bg-[#08090d]/30 pointer-events-none" />

            <span className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/6 text-white/40 border border-white/8">
              <Clock className="w-3 h-3" />
              Coming Soon
            </span>
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-6">
              <GitBranch className="w-6 h-6 text-white/25" />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2 text-white/25">
              Your exact process, automated
            </p>
            <h3 className="text-xl font-bold text-white/40 mb-4">Custom n8n Workflows</h3>
            <p className="text-white/30 text-sm leading-relaxed">
              Full custom automation pipelines built around your exact process. Coming soon.
            </p>
          </motion.div>

          {/* Card 3 — Business Process Automation (coming soon) */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="relative rounded-2xl border border-white/4 p-8 overflow-hidden opacity-50 cursor-not-allowed select-none"
            style={{ background: "linear-gradient(135deg, #0d0e13 0%, #0f1015 100%)" }}
          >
            <div className="absolute inset-0 rounded-2xl bg-[#08090d]/30 pointer-events-none" />

            <span className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/6 text-white/40 border border-white/8">
              <Clock className="w-3 h-3" />
              Coming Soon
            </span>
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-6">
              <Settings2 className="w-6 h-6 text-white/25" />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2 text-white/25">
              Systemize the whole operation
            </p>
            <h3 className="text-xl font-bold text-white/40 mb-4">Business Process Automation</h3>
            <p className="text-white/30 text-sm leading-relaxed">
              We audit your entire operation and automate the parts costing you time and money. Coming soon.
            </p>
          </motion.div>

        </div>

        {/* Process steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="rounded-2xl bg-[#0f1117] border border-white/5 p-8 lg:p-12"
        >
          <p className="text-center text-xs font-bold tracking-widest uppercase text-white/30 mb-10">
            How It Works
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center text-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#00c2ff]/10 border border-[#00c2ff]/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-[#00c2ff]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#00c2ff] text-[#08090d] text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{step.label}</p>
                  <p className="text-xs text-white/40 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
