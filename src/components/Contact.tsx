"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";


export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#0c0d12] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(0,194,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#00c2ff]/10 text-[#00c2ff] border border-[#00c2ff]/20 mb-6">
              Let's Talk
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Ready to stop losing
              <br />
              <span className="gradient-text">leads and time?</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10">
              Book a free 30-minute strategy call. We'll audit your current process,
              identify where you're leaking revenue, and show you exactly what we'd
              build — no pressure, no obligation.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-4 mb-10">
              {[
                { icon: Mail, label: "liem@trynestline.com" },
                { icon: MapPin, label: "Serving contractors across North America" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-white/50">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#00c2ff]" />
                  </div>
                  {label}
                </div>
              ))}
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "50+", label: "Contractors served" },
                { value: "94%", label: "Retention rate" },
                { value: "14 days", label: "To first results" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/4 border border-white/5 p-4 text-center"
                >
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.15 }}
          >
            <div className="rounded-2xl bg-[#0f1117] border border-white/8 p-8 lg:p-10 flex flex-col gap-6">
              <p className="text-lg font-bold text-white">Get your free strategy call</p>
              <p className="text-white/50 text-sm leading-relaxed -mt-2">
                Book a free 30-minute call. We'll audit your current process, identify where
                you're leaking revenue, and show you exactly what we'd build — no pressure,
                no obligation.
              </p>
              <a
                href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-[#00c2ff] hover:bg-white text-[#08090d] font-semibold text-sm transition-all duration-200 glow-accent"
              >
                Book My Free Strategy Call
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="text-xs text-white/25 text-center">
                No spam. No obligation. Just a real conversation about your business.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
