"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].team;
  const members = [tx.liem, tx.justin];

  return (
    <section id="team" ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,232,135,0.04) 0%, transparent 70%)" }} />

      <ScrollTiltWrapper>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center mb-16 lg:mb-20"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
              {tx.badge}
            </span>
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
              {tx.headline}<span className="text-gradient">{tx.headlineGradient}</span>
            </h2>
            <p className="text-white/45 text-lg leading-relaxed max-w-xl mx-auto">{tx.sub}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {members.map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.15 + i * 0.12 }}
                className="group relative rounded-2xl glass glass-hover p-8 flex flex-col items-center text-center gap-4 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/50 to-transparent" />
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-extrabold text-[#050505]"
                  style={{ background: "linear-gradient(135deg, #00e887 0%, #00c2ff 100%)" }}>
                  {member.initials}
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{member.name}</p>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#00e887]/70 mt-1">{member.role}</p>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollTiltWrapper>
    </section>
  );
}
