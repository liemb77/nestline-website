"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneMissed, Clock, FileX, TrendingDown } from "lucide-react";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

const icons = [PhoneMissed, Clock, FileX, TrendingDown];

export default function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].problem;

  return (
    <section id="problem" ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(229,57,53,0.04) 0%, transparent 70%)" }} />

      <ScrollTiltWrapper>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="max-w-3xl mb-16 lg:mb-20"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {tx.badge}
            </span>
            <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] leading-[1.06] mb-5">
              {tx.headline1}
              <br />
              <span className="text-white/25">{tx.headline2}</span>
            </h2>
            <p className="text-white/45 text-lg leading-relaxed max-w-xl">{tx.sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tx.cards.map((p, i) => {
              const Icon = icons[i];
              return (
                <motion.div key={p.title}
                  initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.15 + i * 0.1 }}
                  className="group relative rounded-2xl glass glass-hover p-6 flex flex-col gap-5 overflow-hidden"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="font-heading text-4xl text-white">{p.stat}</p>
                    <p className="text-xs text-white/30 mt-1">{p.statLabel}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-2">{p.title}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{p.body}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-red-500/0 via-red-500/40 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-white/30 text-sm text-center">
            {tx.bridgeText}{" "}
            <a href="#services" className="text-[#2ee6a6] hover:underline">{tx.bridgeLink}</a>
          </motion.p>
        </div>
      </ScrollTiltWrapper>
    </section>
  );
}
