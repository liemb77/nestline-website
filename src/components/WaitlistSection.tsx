"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Flame, Users } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

export default function WaitlistSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].waitlist;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "waitlist", lang }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="waitlist" ref={ref} className="py-28 lg:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #04080d 50%, #050505 100%)" }}>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
          style={{ background: "radial-gradient(ellipse, rgba(0,232,135,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-12">

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
            <Flame className="w-3.5 h-3.5 text-[#00e887]" />
            {tx.badge}
          </span>

          <div className="flex items-center justify-center gap-3 mb-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === 0 ? "bg-[#00e887] animate-pulse" : "bg-[#00e887]/20 border border-[#00e887]/30"}`} />
            ))}
            <span className="text-sm font-semibold text-[#00e887]/80 ml-1">3 {tx.spotsLeft}</span>
          </div>

          <h2 className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold tracking-tight leading-[1.04] mb-5">
            {tx.headline1}<br />
            <span className="text-gradient">{tx.headline2}</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">{tx.sub}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.15 }}
          className="relative rounded-2xl p-8 lg:p-12 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,232,135,0.04) 100%)", border: "1px solid rgba(0,232,135,0.15)" }}>

          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/40 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/25">
                {lang === "en" ? "What you get" : "Ce que vous obtenez"}
              </p>
              <ul className="flex flex-col gap-3">
                {tx.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-[#00e887] shrink-0" />{perk}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 mt-4 text-xs text-white/25">
                <Users className="w-3.5 h-3.5" />
                {tx.joinedCount}
              </div>
            </div>

            <div>
              {status === "success" ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-[#00e887]/10 border border-[#00e887]/25 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#00e887]" />
                  </div>
                  <p className="text-xl font-bold text-white mb-2">{tx.successHeadline}</p>
                  <p className="text-white/40 text-sm">{tx.successSub}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={tx.namePlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder:text-white/25 outline-none transition-colors"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={tx.emailPlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder:text-white/25 outline-none transition-colors"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-xl btn-primary text-sm font-bold transition-all duration-200 disabled:opacity-60"
                  >
                    {status === "submitting" ? tx.submitting : tx.cta}
                    {status !== "submitting" && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                  </button>
                  {status === "error" && (
                    <p className="text-xs text-red-400 text-center">
                      {lang === "en" ? "Something went wrong. Try again." : "Une erreur est survenue. Réessayez."}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
