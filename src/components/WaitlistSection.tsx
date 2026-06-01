"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Flame, Users } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

type FormData = {
  name: string; email: string; businessName: string;
  phone: string; city: string; trade: string; service: string; challenge: string;
};

const inputClass = "w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#00e887]/50";
const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };
const selectStyle = { background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" };

export default function WaitlistSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].waitlist;

  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<FormData>({ name: "", email: "", businessName: "", phone: "", city: "", trade: "", service: "", challenge: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData(prev => ({ ...prev, [field]: e.target.value }));

  async function handleStep2(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "waitlist", lang }),
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
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,232,135,0.04) 100%)", border: "1px solid rgba(0,232,135,0.15)" }}>

          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/40 to-transparent" />

          {/* Step indicator */}
          {status !== "success" && (
            <div className="flex items-center gap-3 px-8 lg:px-12 pt-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                    step >= s ? "bg-[#00e887] text-[#050505]" : "bg-white/8 text-white/30 border border-white/10"
                  }`}>{s}</div>
                  {s === 1 && <div className={`h-px w-8 transition-all duration-500 ${step === 2 ? "bg-[#00e887]/60" : "bg-white/10"}`} />}
                </div>
              ))}
              <span className="text-xs text-white/30 ml-1">
                {lang === "en" ? `Step ${step} of 2` : `Étape ${step} sur 2`}
              </span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="p-8 lg:p-12 text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#00e887]/10 border border-[#00e887]/25 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7 text-[#00e887]" />
                </div>
                <p className="text-2xl font-bold text-white mb-3">{tx.successHeadline}</p>
                <p className="text-white/40 text-base max-w-sm mx-auto">{tx.successSub}</p>
              </motion.div>

            ) : step === 1 ? (
              <motion.div key="step1"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* Perks */}
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
                    <Users className="w-3.5 h-3.5" />{tx.joinedCount}
                  </div>
                </div>

                {/* Step 1 form */}
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="flex flex-col gap-4">
                  <input type="text" required value={data.name} onChange={set("name")}
                    placeholder={tx.namePlaceholder} className={inputClass} style={inputStyle} />
                  <input type="email" required value={data.email} onChange={set("email")}
                    placeholder={tx.emailPlaceholder} className={inputClass} style={inputStyle} />
                  <button type="submit"
                    className="group flex items-center justify-center gap-2.5 w-full py-4 rounded-xl btn-primary text-sm font-bold transition-all duration-200">
                    {tx.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </motion.div>

            ) : (
              <motion.div key="step2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className="p-8 lg:p-12">

                <div className="mb-8">
                  <p className="text-lg font-bold text-white mb-1">{tx.step2Title}</p>
                  <p className="text-white/40 text-sm">{tx.step2Sub}</p>
                </div>

                <form onSubmit={handleStep2} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" required value={data.businessName} onChange={set("businessName")}
                      placeholder={tx.businessPlaceholder} className={inputClass} style={inputStyle} />
                    <input type="tel" required value={data.phone} onChange={set("phone")}
                      placeholder={tx.phonePlaceholder} className={inputClass} style={inputStyle} />
                  </div>

                  <input type="text" required value={data.city} onChange={set("city")}
                    placeholder={tx.cityPlaceholder} className={inputClass} style={inputStyle} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select required value={data.trade} onChange={set("trade")}
                      className={`${inputClass} cursor-pointer`} style={selectStyle}>
                      <option value="" disabled>{tx.tradeLabel}</option>
                      {tx.trades.map((tr) => <option key={tr} value={tr}>{tr}</option>)}
                    </select>
                    <select required value={data.service} onChange={set("service")}
                      className={`${inputClass} cursor-pointer`} style={selectStyle}>
                      <option value="" disabled>{tx.serviceLabel}</option>
                      {tx.services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <select required value={data.challenge} onChange={set("challenge")}
                    className={`${inputClass} cursor-pointer`} style={selectStyle}>
                    <option value="" disabled>{tx.challengeLabel}</option>
                    {tx.challenges.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(1)}
                      className="px-5 py-4 rounded-xl text-sm font-medium text-white/40 hover:text-white transition-colors"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      ←
                    </button>
                    <button type="submit" disabled={status === "submitting"}
                      className="group flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl btn-primary text-sm font-bold transition-all duration-200 disabled:opacity-60">
                      {status === "submitting" ? tx.submitting : tx.submitApp}
                      {status !== "submitting" && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                    </button>
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-400 text-center">
                      {lang === "en" ? "Something went wrong. Try again." : "Une erreur est survenue. Réessayez."}
                    </p>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
