"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneCall, Map, FileText, Hammer, LifeBuoy } from "lucide-react";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

const stepIcons = [PhoneCall, Map, FileText, Hammer, LifeBuoy];

export default function BookingProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].process;

  return (
    <section id="process" ref={ref} className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #080a0e 50%, #050505 100%)" }}>
      <ScrollTiltWrapper>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ee6a6] animate-pulse" />
              {tx.badge}
            </span>
            <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[1.06]">
              {tx.headline}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {tx.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div key={step.title}
                  initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 + i * 0.08 }}
                  className="relative rounded-2xl glass glass-hover p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#2ee6a6]/10 border border-[#2ee6a6]/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#2ee6a6]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#2ee6a6]/50">0{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1.5">{step.title}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollTiltWrapper>
    </section>
  );
}