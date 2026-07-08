"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CircleCheck, Search, Users, Target, TrendingUp, Zap, BarChart3 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

const statIcons = [Target, TrendingUp, Zap, BarChart3];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.09 },
  }),
};

function PricingParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const setSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      const h = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    type P = { x: number; y: number; v: number; o: number };
    let parts: P[] = [];
    let raf = 0;
    const make = (): P => ({
      x: Math.random() * (canvas.width / (window.devicePixelRatio || 1)),
      y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)),
      v: Math.random() * 0.3 + 0.05,
      o: Math.random() * 0.25 + 0.08,
    });
    const init = () => {
      parts = [];
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      for (let i = 0; i < Math.floor((w * h) / 10000); i++) parts.push(make());
    };
    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) { p.x = Math.random() * w; p.y = h + 40; p.v = Math.random() * 0.3 + 0.05; p.o = Math.random() * 0.25 + 0.08; }
        ctx.fillStyle = `rgba(0,232,135,${p.o})`;
        ctx.fillRect(p.x, p.y, 0.7, 2.2);
      });
      raf = requestAnimationFrame(draw);
    };
    const ro = new ResizeObserver(() => { setSize(); init(); });
    ro.observe(canvas.parentElement || document.body);
    init(); raf = requestAnimationFrame(draw);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" />;
}

export default function AdsPage() {
  const platformRef = useRef(null);
  const pricingRef = useRef(null);
  const platformInView = useInView(platformRef, { once: true, margin: "-80px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].ads;

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden py-24">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(0,232,135,0.05) 0%, transparent 65%)" }} />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(0,194,255,0.04) 0%, transparent 60%)" }} />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
              <motion.span custom={0} variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
                {tx.badge}
              </motion.span>

              <motion.h1 custom={1} variants={itemVariants}
                className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.06] tracking-tight">
                {tx.headline1}<br />
                <span className="text-gradient">{tx.headline2}</span>
              </motion.h1>

              <motion.p custom={2} variants={itemVariants}
                className="text-lg sm:text-xl text-white/40 max-w-2xl leading-relaxed">
                {tx.sub}
              </motion.p>

              <motion.a custom={3} variants={itemVariants}
                href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-7 py-4 rounded-full btn-primary text-sm font-bold mt-2">
                {tx.heroCta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        </section>

        {/* ── Platform cards + Why it works ── */}
        <section ref={platformRef} className="py-20 lg:py-28 relative overflow-hidden"
          style={{ background: "linear-gradient(180deg, #050505 0%, #080b12 50%, #050505 100%)" }}>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 100% 100%, rgba(0,232,135,0.04) 0%, transparent 60%)" }} />

          <ScrollTiltWrapper>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
                {/* Google Ads */}
                <motion.div initial={{ opacity: 0, y: 40 }} animate={platformInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
                  className="group relative rounded-2xl glass glass-hover p-8 overflow-hidden flex flex-col gap-6">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e887]/50 to-transparent" />
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#00e887]/10 border border-[#00e887]/20 flex items-center justify-center">
                      <Search className="w-5 h-5 text-[#00e887]" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00e887]/10 text-[#00e887] border border-[#00e887]/20">{tx.google.badge}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#00e887]/60 mb-2">{tx.google.tag}</p>
                    <h3 className="text-xl font-bold text-white mb-3">{tx.google.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{tx.google.desc}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5 mt-auto">
                    {tx.google.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                        <CircleCheck className="w-4 h-4 text-[#00e887] shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
                    className="group/btn flex items-center gap-2 text-sm font-semibold text-[#00e887] hover:gap-3 transition-all duration-200 mt-1">
                    {tx.cta}<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </motion.div>

                {/* Meta Ads */}
                <motion.div initial={{ opacity: 0, y: 40 }} animate={platformInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
                  className="group relative rounded-2xl glass glass-hover p-8 overflow-hidden flex flex-col gap-6">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00c2ff]/50 to-transparent" />
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#00c2ff]/10 border border-[#00c2ff]/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#00c2ff]" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00c2ff]/10 text-[#00c2ff] border border-[#00c2ff]/20">{tx.meta.badge}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#00c2ff]/60 mb-2">{tx.meta.tag}</p>
                    <h3 className="text-xl font-bold text-white mb-3">{tx.meta.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{tx.meta.desc}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5 mt-auto">
                    {tx.meta.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                        <CircleCheck className="w-4 h-4 text-[#00c2ff] shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
                    className="group/btn flex items-center gap-2 text-sm font-semibold text-[#00c2ff] hover:gap-3 transition-all duration-200 mt-1">
                    {tx.cta}<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </motion.div>
              </div>

              {/* Why it works */}
              <motion.div initial={{ opacity: 0, y: 32 }} animate={platformInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.35 }}
                className="rounded-2xl glass p-8 lg:p-12">
                <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-white/25 mb-10">{tx.whyTitle}</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {tx.stats.map((stat, i) => {
                    const Icon = statIcons[i];
                    return (
                      <div key={stat.label} className="flex flex-col items-center text-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#00e887]/8 border border-[#00e887]/15 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#00e887]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{stat.label}</p>
                          <p className="text-xs text-white/35 mt-1">{stat.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

            </div>
          </ScrollTiltWrapper>
        </section>

        {/* ── Pricing ── */}
        <section ref={pricingRef} className="relative py-20 lg:py-28 overflow-hidden">
          <style>{`
            .ads-accent{position:absolute;inset:0;pointer-events:none;opacity:.5}
            .ads-accent .hl,.ads-accent .vl{position:absolute;background:#1a2e24}
            .ads-accent .hl{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%;animation:adsDrawX .8s ease forwards}
            .ads-accent .vl{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%;animation:adsDrawY .9s ease forwards}
            .ads-accent .hl:nth-child(1){top:20%;animation-delay:.1s}
            .ads-accent .hl:nth-child(2){top:55%;animation-delay:.2s}
            .ads-accent .hl:nth-child(3){top:85%;animation-delay:.3s}
            .ads-accent .vl:nth-child(4){left:20%;animation-delay:.25s}
            .ads-accent .vl:nth-child(5){left:50%;animation-delay:.35s}
            .ads-accent .vl:nth-child(6){left:80%;animation-delay:.45s}
            @keyframes adsDrawX{to{transform:scaleX(1)}}
            @keyframes adsDrawY{to{transform:scaleY(1)}}
          `}</style>
          <div aria-hidden className="ads-accent">
            <div className="hl"/><div className="hl"/><div className="hl"/>
            <div className="vl"/><div className="vl"/><div className="vl"/>
          </div>
          <PricingParticles />
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_50%_at_50%_0%,rgba(0,232,135,0.05),transparent_60%)]" />

          <ScrollTiltWrapper>
            <div className="relative max-w-4xl mx-auto px-6 lg:px-8">

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="text-center mb-14">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
                  {tx.pricingBadge}
                </span>
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
                  {tx.pricingHeadline}
                </h2>
                <p className="text-white/40 text-lg max-w-md mx-auto leading-relaxed">
                  {tx.pricingDesc}
                </p>
              </motion.div>

              <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">

                {/* Starter */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.15 }}
                  className="relative flex-1 max-w-sm">
                  <Card className="h-full flex flex-col border-[#00e887]/30 bg-zinc-900/80 backdrop-blur"
                    style={{ boxShadow: "0 0 60px rgba(0,232,135,0.08), 0 20px 40px rgba(0,0,0,0.4)" }}>
                    <CardHeader>
                      <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#00e887] mb-1">{tx.starter.tag}</p>
                      <CardTitle className="text-zinc-50 text-xl">{tx.starter.title}</CardTitle>
                      <p className="text-sm text-zinc-400">{tx.starter.desc}</p>
                      <div className="pt-2 space-y-1">
                        <div>
                          <span className="text-4xl font-extrabold text-white">$400</span>
                          <span className="text-zinc-500 text-sm ml-2">{tx.starter.priceLabel}</span>
                        </div>
                        <p className="text-xs text-[#00e887]/60 font-semibold pt-0.5">{tx.starter.priceNote}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Separator className="mb-5 bg-zinc-800" />
                      <ul className="space-y-3">
                        {tx.starter.features.map((label) => (
                          <li key={label} className="flex items-center gap-2.5 text-zinc-200 text-sm">
                            <CircleCheck className="size-4 text-[#00e887] shrink-0" />{label}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full rounded-xl bg-[#00e887] text-[#050505] font-bold hover:bg-[#00e887]/90"
                        style={{ boxShadow: "0 0 30px rgba(0,232,135,0.3)" }}>
                        <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noopener noreferrer">
                          {tx.starter.cta}<ArrowRight className="ml-2 size-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Full Stack */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.28 }}
                  className="relative flex-1 max-w-sm md:translate-y-2">
                  <Card className="h-full flex flex-col border-zinc-800 bg-zinc-900/50 backdrop-blur">
                    <CardHeader>
                      <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#00c2ff] mb-1">{tx.full.tag}</p>
                      <CardTitle className="text-zinc-50 text-xl">{tx.full.title}</CardTitle>
                      <p className="text-sm text-zinc-400">{tx.full.desc}</p>
                      <div className="pt-2">
                        <span className="text-4xl font-extrabold text-white">{tx.full.price}</span>
                        <p className="text-xs text-zinc-500 mt-1">{tx.full.priceNote}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Separator className="mb-5 bg-zinc-800" />
                      <ul className="space-y-3">
                        {tx.full.features.map((label) => (
                          <li key={label} className="flex items-center gap-2.5 text-zinc-200 text-sm">
                            <CircleCheck className="size-4 text-[#00c2ff] shrink-0" />{label}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline"
                        className="w-full rounded-xl border-[#00c2ff]/30 bg-[#00c2ff]/10 text-[#00c2ff] hover:bg-[#00c2ff]/20 hover:text-[#00c2ff]">
                        <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noopener noreferrer">
                          {tx.full.cta}<ArrowRight className="ml-2 size-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

              </div>

              <motion.p initial={{ opacity: 0 }} animate={pricingInView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.5 }}
                className="text-center text-xs text-white/20 mt-8 leading-relaxed">
                {tx.footerNote}{" "}
                <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noopener noreferrer"
                  className="text-[#00e887]/60 hover:text-[#00e887] hover:underline transition-colors">
                  {tx.footerLink}
                </a>
              </motion.p>

            </div>
          </ScrollTiltWrapper>
        </section>

      </main>

      <footer className="border-t border-white/[0.05] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="NestLine Automation" className="h-10 w-auto" />
          </Link>
          <p className="text-xs text-white/20">© {new Date().getFullYear()} NestLine Automation. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
            All systems operational
          </div>
        </div>
      </footer>
    </>
  );
}
