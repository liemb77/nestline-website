"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

export default function CaseStudies() {
  const { lang } = useLanguage();
  const tx = t[lang].caseStudies;

  return (
    <section id="case-studies" className="relative py-20 lg:py-28 overflow-hidden border-t border-white/[0.05]">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_50%_at_50%_0%,rgba(46,230,166,0.05),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ee6a6] animate-pulse" />
            {tx.badge}
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
            {tx.headline}<span className="text-gradient">{tx.headlineGradient}</span>
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto leading-relaxed">{tx.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {tx.items.map((item, i) => (
            <motion.div
              key={item.domain}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="rounded-2xl border border-[#2ee6a6]/30 bg-zinc-900/80 backdrop-blur overflow-hidden"
              style={{ boxShadow: "0 0 60px rgba(46,230,166,0.08), 0 20px 40px rgba(0,0,0,0.4)" }}
            >
              {/* Browser chrome + screenshot, click through to live site */}
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-950/80 border-b border-white/[0.06]">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-3 px-3 py-1 rounded-md bg-white/[0.04] text-[11px] text-white/40 font-mono truncate">
                    {item.domain}
                  </span>
                </div>
                <div className="relative aspect-[16/10] bg-zinc-950">
                  <img
                    src={item.image}
                    alt={`${item.clientName}, website homepage screenshot`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>

              {/* Structured breakdown */}
              <div className="flex flex-col gap-5 px-6 py-6">
                <div>
                  <p className="text-white font-bold text-lg">{item.clientName}</p>
                  <p className="text-white/40 text-xs mt-1">{item.clientType}</p>
                  <p className="flex items-center gap-1.5 text-white/30 text-xs mt-1">
                    <MapPin className="w-3 h-3" />{item.location}
                  </p>
                </div>

                <div className="flex flex-col gap-3 text-sm">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/25 mb-1">
                      {lang === "en" ? "The problem" : "Le problème"}
                    </p>
                    <p className="text-white/55 leading-relaxed">{item.problem}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/25 mb-1">
                      {lang === "en" ? "What we built" : "Ce qu'on a construit"}
                    </p>
                    <p className="text-white/55 leading-relaxed">{item.solution}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#2ee6a6]/60 mb-1">
                      {lang === "en" ? "Result" : "Résultat"}
                    </p>
                    <p className="text-white/70 leading-relaxed">{item.result}</p>
                  </div>
                </div>

                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2ee6a6] text-[#050505] text-sm font-bold hover:bg-[#2ee6a6]/90 transition-colors">
                  {tx.cta}<ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}