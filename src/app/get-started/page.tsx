"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Check, MessageSquareText, Globe, Megaphone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const serviceIcons = [MessageSquareText, Globe, Megaphone];

const inputCls =
  "w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:border-[#00e887]/50 focus:ring-1 focus:ring-[#00e887]/30";

const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const selectStyle = {
  background: "#0d0f12",
  border: "1px solid rgba(255,255,255,0.08)",
};

// ─── Mini Ticker ─────────────────────────────────────────────────────────────

function Ticker({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative py-4 overflow-hidden border-y border-white/[0.05]"
      style={{ background: "rgba(255,255,255,0.015)" }}>
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg,#050505,transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg,#050505,transparent)" }} />
      <div className="animate-marquee flex gap-10 w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-white/25 whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-[#00e887]/50" />{item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  icon: Icon, title, desc, selected, onClick,
}: { icon: React.ElementType; title: string; desc: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="relative text-left rounded-2xl p-6 w-full flex flex-col gap-4 overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        background: selected
          ? "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,rgba(0,232,135,0.1) 100%)"
          : "rgba(255,255,255,0.028)",
        border: selected ? "1px solid rgba(0,232,135,0.45)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: selected ? "0 0 60px rgba(0,232,135,0.1), 0 8px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {/* Top shimmer when selected */}
      {selected && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/60 to-transparent" />
      )}

      {/* Check badge */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "#00e887" }}
          >
            <Check className="w-3.5 h-3.5 text-[#050505]" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
        selected ? "bg-[#00e887]/15 border border-[#00e887]/30" : "bg-white/4 border border-white/8"
      }`}>
        <Icon className={`w-5 h-5 ${selected ? "text-[#00e887]" : "text-white/35"}`} />
      </div>

      <div>
        <p className={`font-bold text-base mb-1.5 transition-colors duration-200 ${selected ? "text-white" : "text-white/70"}`}>
          {title}
        </p>
        <p className={`text-sm leading-relaxed transition-colors duration-200 ${selected ? "text-white/55" : "text-white/30"}`}>
          {desc}
        </p>
      </div>
    </motion.button>
  );
}

// ─── Form Field Components ────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold tracking-wide text-white/45 uppercase">{label}</label>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GetStartedPage() {
  const { lang } = useLanguage();
  const tx = t[lang].getStarted;

  const [selectedServiceIdx, setSelectedServiceIdx] = useState<number | null>(null);
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    service: "",
    firstName: "",
    businessName: "",
    trade: "",
    monthlyLeads: "",
    problem: "",
    phone: "",
    email: "",
  });

  // When a service card is clicked, pre-fill the dropdown and scroll to form
  const handleServiceSelect = (idx: number) => {
    setSelectedServiceIdx(idx);
    setForm((f) => ({ ...f, service: tx.form.services[idx] }));
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);

    // Read values directly from the DOM — avoids any stale closure / state issue
    const fd = new FormData(formRef.current!);
    const payload = {
      first_name:    fd.get("first_name")    as string,
      business_name: fd.get("business_name") as string,
      trade:         fd.get("trade")         as string,
      service:       fd.get("service")       as string,
      monthly_leads: fd.get("monthly_leads") as string,
      problem:       fd.get("problem")       as string,
      phone:         fd.get("phone")         as string,
      email:         fd.get("email")         as string,
      submitted_at:  new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const formComplete =
    form.service && form.firstName && form.businessName &&
    form.trade && form.monthlyLeads && form.problem &&
    form.phone && form.email;

  return (
    <>
      <Navbar />

      <main className="pt-[72px] min-h-screen">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center py-24 lg:py-32 overflow-hidden text-center px-6">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 30%,rgba(0,232,135,0.07) 0%,transparent 65%)" }} />

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}
            className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">

            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-[0.18em] uppercase text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
              {tx.hero.badge}
            </motion.span>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease }}
              className="text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight">
              {tx.hero.headline.split(" ").map((word, i, arr) => (
                <span key={i} className={i === arr.length - 1 ? "text-gradient" : ""}>
                  {word}{i < arr.length - 1 ? " " : ""}
                </span>
              ))}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }}
              className="text-lg sm:text-xl text-white/40 max-w-2xl leading-relaxed">
              {tx.hero.sub}
            </motion.p>

            {/* Animated down arrow */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-1 text-white/20 mt-2">
              <span className="text-[11px] tracking-[0.2em] uppercase">{lang === "en" ? "Select a service" : "Choisissez un service"}</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Ticker ────────────────────────────────────────────────────────── */}
        <Ticker items={tx.ticker} />

        {/* ── Service Selector ──────────────────────────────────────────────── */}
        <section className="py-16 lg:py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease }} className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{tx.services.title}</h2>
              <p className="text-white/40 text-sm">{tx.services.sub}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tx.services.cards.map((card, i) => {
                const Icon = serviceIcons[i];
                return (
                  <motion.div key={card.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: i * 0.1 }}>
                    <ServiceCard
                      icon={Icon}
                      title={card.title}
                      desc={card.desc}
                      selected={selectedServiceIdx === i}
                      onClick={() => handleServiceSelect(i)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Form (appears after card selection) ───────────────────────────── */}
        <AnimatePresence>
          {selectedServiceIdx !== null && !submitted && (
            <motion.section
              ref={formSectionRef}
              key="form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease }}
              className="py-4 pb-24 px-6"
            >
              <div className="max-w-2xl mx-auto">
                {/* Form card */}
                <div className="relative rounded-2xl p-8 lg:p-10 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg,rgba(255,255,255,0.03) 0%,rgba(0,232,135,0.05) 100%)",
                    border: "1px solid rgba(0,232,135,0.2)",
                    boxShadow: "0 0 80px rgba(0,232,135,0.06),0 20px 60px rgba(0,0,0,0.4)",
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/40 to-transparent" />

                  <div className="mb-8">
                    <h3 className="text-xl font-extrabold text-white mb-1">{tx.form.title}</h3>
                    <p className="text-sm text-white/35">{tx.form.sub}</p>
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Service */}
                    <Field label={tx.form.serviceLabel}>
                      <select name="service" value={form.service} onChange={set("service")} required
                        className={`${inputCls} rounded-xl px-4 py-3`} style={selectStyle}>
                        <option value="">{tx.form.placeholder.select}</option>
                        {tx.form.services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>

                    {/* First name + Business name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label={tx.form.firstNameLabel}>
                        <input name="first_name" type="text" value={form.firstName} onChange={set("firstName")} required
                          placeholder={tx.form.placeholder.name}
                          className={inputCls} style={inputStyle} />
                      </Field>
                      <Field label={tx.form.businessLabel}>
                        <input name="business_name" type="text" value={form.businessName} onChange={set("businessName")} required
                          placeholder={tx.form.placeholder.business}
                          className={inputCls} style={inputStyle} />
                      </Field>
                    </div>

                    {/* Trade */}
                    <Field label={tx.form.tradeLabel}>
                      <select name="trade" value={form.trade} onChange={set("trade")} required
                        className={inputCls} style={selectStyle}>
                        <option value="">{tx.form.placeholder.select}</option>
                        {tx.form.trades.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>

                    {/* Monthly leads + Problem */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label={tx.form.leadsLabel}>
                        <select name="monthly_leads" value={form.monthlyLeads} onChange={set("monthlyLeads")} required
                          className={inputCls} style={selectStyle}>
                          <option value="">{tx.form.placeholder.select}</option>
                          {tx.form.leadRanges.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>
                      <Field label={tx.form.problemLabel}>
                        <select name="problem" value={form.problem} onChange={set("problem")} required
                          className={inputCls} style={selectStyle}>
                          <option value="">{tx.form.placeholder.select}</option>
                          {tx.form.problems.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>
                    </div>

                    {/* Phone + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label={tx.form.phoneLabel}>
                        <input name="phone" type="tel" value={form.phone} onChange={set("phone")} required
                          placeholder={tx.form.placeholder.phone}
                          className={inputCls} style={inputStyle} />
                      </Field>
                      <Field label={tx.form.emailLabel}>
                        <input name="email" type="email" value={form.email} onChange={set("email")} required
                          placeholder={tx.form.placeholder.email}
                          className={inputCls} style={inputStyle} />
                      </Field>
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-400/90 text-center">
                        {lang === "en"
                          ? <>Something went wrong. Contact us: <a href="mailto:liem@trynestline.com" className="underline hover:text-red-300">liem@trynestline.com</a></>
                          : <>Une erreur s'est produite. Contactez-nous : <a href="mailto:liem@trynestline.com" className="underline hover:text-red-300">liem@trynestline.com</a></>}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={!formComplete || submitting}
                      whileHover={formComplete && !submitting ? { y: -1 } : {}}
                      whileTap={formComplete && !submitting ? { scale: 0.98 } : {}}
                      className="group w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 mt-2 disabled:opacity-40 disabled:cursor-not-allowed btn-primary"
                    >
                      {submitting ? tx.form.submitting : tx.form.submit}
                      {!submitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                    </motion.button>

                    <p className="text-center text-xs text-white/20">
                      {lang === "en"
                        ? "No spam. No obligation. We review every submission personally."
                        : "Aucun spam. Aucune obligation. Nous examinons chaque soumission personnellement."}
                    </p>
                  </form>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Post-Submit Success ────────────────────────────────────────────── */}
        <AnimatePresence>
          {submitted && (
            <motion.section
              key="success"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="py-8 pb-24 px-6"
            >
              <div className="max-w-3xl mx-auto">

                {/* Checkmark + headline */}
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: "rgba(0,232,135,0.15)", border: "2px solid rgba(0,232,135,0.4)" }}
                  >
                    <CheckCircle2 className="w-9 h-9 text-[#00e887]" />
                  </motion.div>

                  <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease }}
                    className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                    {lang === "en"
                      ? <>You&apos;re all set, <span className="text-gradient">{form.firstName}</span>!</>
                      : <>Vous êtes prêt, <span className="text-gradient">{form.firstName}</span>&nbsp;!</>}
                  </motion.h2>

                  <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6, ease }}
                    className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
                    {lang === "en"
                      ? "Book your free call below."
                      : "Réservez votre appel gratuit ci-dessous."}
                  </motion.p>
                </div>

                {/* Cal.com booking embed */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
                  <p className="text-center text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
                    {tx.success.bookingLabel}
                  </p>
                  <div className="relative rounded-2xl overflow-hidden"
                    style={{ border: "1px solid rgba(0,232,135,0.2)", boxShadow: "0 0 60px rgba(0,232,135,0.06)" }}>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/40 to-transparent" />
                    <iframe
                      src="https://cal.com/liem-blouin/discovery"
                      className="w-full"
                      style={{ height: "700px", border: "none", display: "block", background: "#0a0b0d" }}
                      title="Book a strategy call"
                    />
                  </div>
                </motion.div>

              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </main>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="NestLine Automation" className="h-10 w-auto" />
          </a>
          <p className="text-xs text-white/20">© {new Date().getFullYear()} NestLine Automation. {lang === "en" ? "All rights reserved." : "Tous droits réservés."}</p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
            {lang === "en" ? "All systems operational" : "Tous les systèmes opérationnels"}
          </div>
        </div>
      </footer>
    </>
  );
}
