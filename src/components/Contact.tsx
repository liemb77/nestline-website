"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].contact;

  return (
    <section id="contact" ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 100% 100%, rgba(0,232,135,0.05) 0%, transparent 65%)" }} />

      <ScrollTiltWrapper>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />{tx.badge}
              </span>
              <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
                {tx.headline1}<br /><span className="text-gradient">{tx.headline2}</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed mb-10 max-w-md">{tx.sub}</p>
              <div className="flex flex-col gap-3 mb-10">
                {[
                  { Icon: Mail,   text: "liem@trynestline.com" },
                  { Icon: MapPin, text: tx.location },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-white/40">
                    <div className="w-9 h-9 rounded-lg glass flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#00e887]" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="rounded-2xl glass p-4 text-center">
                  <p className="text-2xl font-extrabold text-white">14 {lang === "en" ? "days" : "jours"}</p>
                  <p className="text-xs text-white/30 mt-1">{tx.statLabel}</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.15 }}>
              <div className="relative rounded-2xl p-8 lg:p-10 flex flex-col gap-6 overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,232,135,0.04) 100%)", border: "1px solid rgba(0,232,135,0.15)" }}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/40 to-transparent" />
                <div>
                  <p className="text-lg font-bold text-white mb-2">{tx.cardTitle}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{tx.cardDesc}</p>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {tx.checklist.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/55">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <a href="#waitlist"
                  className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-xl btn-primary text-sm font-bold transition-all duration-200">
                  {tx.cta}<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <p className="text-xs text-white/20 text-center">{tx.disclaimer}</p>
              </div>
            </motion.div>

          </div>
        </div>
      </ScrollTiltWrapper>
    </section>
  );
}
