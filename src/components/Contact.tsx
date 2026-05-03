"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle2, Mail, MapPin, Loader2 } from "lucide-react";

const tradeOptions = [
  "Plumbing",
  "Roofing",
  "Landscaping / Lawn Care",
  "HVAC",
  "Electrical",
  "General Contracting",
  "Painting",
  "Pest Control",
  "Other",
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    trade: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    window.open("https://cal.com/liem-blouin/discovery?overlayCalendar=true", "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#00c2ff]/50 focus:bg-white/8 transition-all duration-200";

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
            <div className="rounded-2xl bg-[#0f1117] border border-white/8 p-8 lg:p-10">
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-5 py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message sent!</h3>
                  <p className="text-white/50 text-sm max-w-xs leading-relaxed">
                    We'll reach out within 1 business day to schedule your free strategy call.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <p className="text-lg font-bold text-white mb-1">Get your free strategy call</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/40 font-medium mb-1.5 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Mike Johnson"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 font-medium mb-1.5 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="mike@yourbusiness.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/40 font-medium mb-1.5 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 font-medium mb-1.5 block">
                        Your Trade *
                      </label>
                      <select
                        name="trade"
                        value={form.trade}
                        onChange={handleChange}
                        required
                        className={`${inputClass} cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select your trade
                        </option>
                        {tradeOptions.map((t) => (
                          <option key={t} value={t} className="bg-[#0f1117]">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/40 font-medium mb-1.5 block">
                      What's your biggest pain point? *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="e.g. I miss too many leads when I'm on jobs, or I spend 3 hours on admin every evening..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-[#00c2ff] hover:bg-white text-[#08090d] font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed glow-accent mt-1"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Book My Free Strategy Call
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-white/25 text-center">
                    No spam. No obligation. Just a real conversation about your business.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
