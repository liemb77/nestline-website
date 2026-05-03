"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,194,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial gradient glow */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_50%_20%] from-[rgba(0,194,255,0.12)] via-transparent to-transparent" />

      {/* Floating orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(0,194,255,0.08)_0%,transparent_70%)] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(123,97,255,0.08)_0%,transparent_70%)] pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 lg:gap-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#00c2ff]/10 text-[#00c2ff] border border-[#00c2ff]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c2ff] animate-pulse" />
              Automation for Contractors
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight max-w-5xl"
          >
            We Automate the Chaos{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text">So You Can Focus</span>
            <br className="hidden sm:block" />
            on the Work
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/55 max-w-2xl leading-relaxed"
          >
            NestLine builds done-for-you automation systems that handle your leads,
            follow-ups, and admin — so you stop losing money to disorganization.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <a
              href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#00c2ff] text-[#08090d] font-semibold text-base hover:bg-white transition-all duration-200 glow-accent"
            >
              Book a Free Strategy Call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="group flex items-center gap-2.5 px-7 py-4 rounded-full border border-white/10 text-white/70 font-medium text-base hover:border-white/25 hover:text-white transition-all duration-200 hover:bg-white/5"
            >
              <PlayCircle className="w-4 h-4" />
              See What We Build
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-6 text-sm text-white/35"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["P", "R", "L", "C"].map((letter, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#08090d] flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: `hsl(${i * 60 + 200}, 70%, 45%)`,
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span>Trusted by 50+ contractors</span>
            </div>
            <span className="hidden sm:block text-white/15">|</span>
            <span>⭐ 4.9/5 average rating</span>
            <span className="hidden sm:block text-white/15">|</span>
            <span>30-day results guarantee</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08090d] to-transparent pointer-events-none" />
    </section>
  );
}
