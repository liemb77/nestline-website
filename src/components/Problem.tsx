"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, PhoneMissed, FileX, TrendingDown, ArrowRight } from "lucide-react";

const problems = [
  {
    icon: PhoneMissed,
    title: "Leads slipping through the cracks",
    description:
      "A potential customer calls while you're on a job. By the time you call back, they've hired someone else. This happens dozens of times a year.",
    stat: "48%",
    statLabel: "of leads never get a callback",
  },
  {
    icon: Clock,
    title: "Hours lost to follow-up busywork",
    description:
      "Copy-pasting info into spreadsheets, sending quote reminders one by one, chasing down invoice payments — hours every week, gone.",
    stat: "10+ hrs",
    statLabel: "wasted on admin per week",
  },
  {
    icon: FileX,
    title: "No system, just chaos",
    description:
      "Sticky notes, voice memos, texts, emails — your 'system' is scattered everywhere. Mistakes happen. Customers notice. Reputation suffers.",
    stat: "3x",
    statLabel: "more errors without automation",
  },
  {
    icon: TrendingDown,
    title: "Revenue leaking every day",
    description:
      "Every unanswered lead, every missed follow-up, every delayed invoice is money walking out the door. It compounds silently until you feel it hard.",
    stat: "$40K+",
    statLabel: "average annual revenue leak",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 },
  }),
};

export default function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle top border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#00c2ff]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-500/10 text-red-400 border border-red-500/20 mb-6">
            The Reality for Most Contractors
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            You're great at the trade.
            <br />
            <span className="text-white/40">The business side is killing you.</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Every contractor we talk to has the same story. The work is there —
            but the admin, the follow-ups, the chaos? It's drowning out the growth.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="group relative rounded-2xl bg-[#0f1117] border border-white/5 p-6 hover:border-red-500/20 hover:bg-[#130f0f] transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center mb-5 group-hover:bg-red-500/15 transition-colors">
                <problem.icon className="w-5 h-5 text-red-400" />
              </div>

              {/* Stat */}
              <div className="mb-4">
                <span className="text-3xl font-extrabold text-white">{problem.stat}</span>
                <p className="text-xs text-white/40 mt-1">{problem.statLabel}</p>
              </div>

              {/* Content */}
              <h3 className="text-sm font-bold text-white mb-2">{problem.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bridge to solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="text-white/50 mb-5 text-base">
            Sound familiar? You don't have to keep running it this way.
          </p>
          <a
            href="#services"
            className="group inline-flex items-center gap-2 text-[#00c2ff] font-semibold text-sm hover:gap-3 transition-all duration-200"
          >
            See how we fix it
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
