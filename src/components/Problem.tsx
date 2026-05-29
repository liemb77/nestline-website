"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneMissed, Clock, FileX, TrendingDown } from "lucide-react";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";

const problems = [
  {
    icon: PhoneMissed,
    stat: "48%",
    statLabel: "of leads never get a callback",
    title: "Leads slipping through",
    body: "A customer calls while you're on the job. By the time you call back, they've hired someone else. This happens dozens of times a year.",
  },
  {
    icon: Clock,
    stat: "10+ hrs",
    statLabel: "wasted on admin per week",
    title: "Hours lost to busywork",
    body: "Copy-pasting info, sending quote reminders, chasing invoice payments — hours every week, just gone.",
  },
  {
    icon: FileX,
    stat: "3×",
    statLabel: "more errors without systems",
    title: "No system, just chaos",
    body: "Sticky notes, texts, emails — your 'system' is scattered everywhere. Mistakes happen. Customers notice.",
  },
  {
    icon: TrendingDown,
    stat: "$40K+",
    statLabel: "average annual revenue leak",
    title: "Revenue leaking daily",
    body: "Every missed lead, every delayed invoice is money out the door. It compounds silently until you feel it hard.",
  },
];

export default function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="problem" ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(229,57,53,0.04) 0%, transparent 70%)" }} />

      <ScrollTiltWrapper>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="max-w-3xl mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            The Problem
          </span>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
            You're great at the trade.
            <br />
            <span className="text-white/25">The business side is killing you.</span>
          </h2>
          <p className="text-white/45 text-lg leading-relaxed max-w-xl">
            Every contractor we talk to has the same story. The work is there —
            but the admin, the follow-ups, the chaos? It's drowning out the growth.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as [number,number,number,number],
                delay: 0.15 + i * 0.1,
              }}
              className="group relative rounded-2xl glass glass-hover p-6 flex flex-col gap-5 overflow-hidden"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <p.icon className="w-5 h-5 text-red-400" />
              </div>

              {/* Stat */}
              <div>
                <p className="text-4xl font-extrabold text-white tracking-tight">{p.stat}</p>
                <p className="text-xs text-white/30 mt-1">{p.statLabel}</p>
              </div>

              {/* Text */}
              <div>
                <p className="text-sm font-bold text-white mb-2">{p.title}</p>
                <p className="text-xs text-white/40 leading-relaxed">{p.body}</p>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-red-500/0 via-red-500/40 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Bridge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-white/30 text-sm text-center"
        >
          Sound familiar?{" "}
          <a href="#services" className="text-[#00e887] hover:underline">
            Here's how we fix it →
          </a>
        </motion.p>

      </div>
      </ScrollTiltWrapper>
    </section>
  );
}
