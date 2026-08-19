"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CircleCheck, Zap } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CaseStudies from "@/components/CaseStudies";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: i * 0.09 },
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
        ctx.fillStyle = `rgba(46,230,166,${p.o})`;
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

export default function WebsitesClient() {
  const pricingRef = useRef(null);
  const inView = useInView(pricingRef, { once: true, margin: "-80px" });
  const { lang, href } = useLanguage();
  const tx = t[lang].websites;

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden py-24">
          {/* Subtle green radial glow — same style as main page sections */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(46,230,166,0.05) 0%, transparent 65%)" }} />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
              <motion.span custom={0} variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ee6a6] animate-pulse" />
                {tx.badge}
              </motion.span>

              <motion.h1 custom={1} variants={itemVariants}
                className="font-heading text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.06]">
                {tx.headline}<span className="text-gradient">{tx.headlineGradient}</span>
              </motion.h1>

              <motion.p custom={2} variants={itemVariants}
                className="text-lg sm:text-xl text-white/40 max-w-2xl leading-relaxed">
                {tx.sub}
              </motion.p>

              <motion.a custom={3} variants={itemVariants}
                href="https://book.nestlineautomation.ca/" target="_blank" rel="noopener noreferrer"
               
                className="group flex items-center gap-2.5 px-7 py-4 rounded-full btn-primary text-sm font-bold mt-2">
                {tx.heroCta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        </section>

        {/* ── Pricing section ── */}
        <section ref={pricingRef} className="relative py-20 lg:py-28 overflow-hidden">
          {/* Accent grid lines */}
          <style>{`
            .ws-accent{position:absolute;inset:0;pointer-events:none;opacity:.5}
            .ws-accent .hl,.ws-accent .vl{position:absolute;background:#1a2e24}
            .ws-accent .hl{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%;animation:wsDrawX .8s ease forwards}
            .ws-accent .vl{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%;animation:wsDrawY .9s ease forwards}
            .ws-accent .hl:nth-child(1){top:20%;animation-delay:.1s}
            .ws-accent .hl:nth-child(2){top:55%;animation-delay:.2s}
            .ws-accent .hl:nth-child(3){top:85%;animation-delay:.3s}
            .ws-accent .vl:nth-child(4){left:20%;animation-delay:.25s}
            .ws-accent .vl:nth-child(5){left:50%;animation-delay:.35s}
            .ws-accent .vl:nth-child(6){left:80%;animation-delay:.45s}
            @keyframes wsDrawX{to{transform:scaleX(1)}}
            @keyframes wsDrawY{to{transform:scaleY(1)}}
          `}</style>
          <div aria-hidden className="ws-accent">
            <div className="hl"/><div className="hl"/><div className="hl"/>
            <div className="vl"/><div className="vl"/><div className="vl"/>
          </div>
          <PricingParticles />
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_50%_at_50%_0%,rgba(46,230,166,0.05),transparent_60%)]" />

          <ScrollTiltWrapper>
            <div className="relative max-w-4xl mx-auto px-6 lg:px-8">

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2ee6a6] animate-pulse" />
                  {tx.pricingBadge}
                </span>
                <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[1.06] mb-5">
                  {tx.pricingHeadline}
                </h2>
                <p className="text-white/40 text-lg max-w-md mx-auto leading-relaxed">
                  {tx.pricingDesc}
                </p>
              </motion.div>

              {/* Cards */}
              <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">

                {/* Standard */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.15 }}
                  className="relative flex-1 max-w-sm">
                  <Card className="h-full flex flex-col border-[#2ee6a6]/30 bg-zinc-900/80 backdrop-blur"
                    style={{ boxShadow: "0 0 60px rgba(46,230,166,0.08), 0 20px 40px rgba(0,0,0,0.4)" }}>
                    <CardHeader>
                      <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#2ee6a6] mb-1">{tx.standard.tag}</p>
                      <CardTitle className="font-heading text-zinc-50 text-xl">{tx.standard.title}</CardTitle>
                      <p className="text-sm text-zinc-400">{tx.standard.desc}</p>
                      <div className="pt-2 space-y-1">
                        <div>
                          <span className="font-heading text-4xl text-white">$1,500</span>
                          <span className="text-zinc-500 text-sm ml-2">{tx.standard.setupLabel}</span>
                        </div>
                        <div>
                          <span className="text-2xl font-bold text-zinc-300">+ $150</span>
                          <span className="text-zinc-500 text-sm ml-2">{tx.standard.monthlyLabel}</span>
                        </div>
                        <p className="text-xs text-[#2ee6a6]/60 font-semibold pt-0.5">{tx.standard.note}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Separator className="mb-5 bg-zinc-800" />
                      <ul className="space-y-3">
                        {tx.standard.features.map((label) => (
                          <li key={label} className="flex items-center gap-2.5 text-zinc-200 text-sm">
                            <CircleCheck className="size-4 text-[#2ee6a6] shrink-0" />{label}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full rounded-xl bg-[#2ee6a6] text-[#050505] font-bold hover:bg-[#2ee6a6]/90"
                        style={{ boxShadow: "0 0 30px rgba(46,230,166,0.3)" }}>
                        <a href="https://book.nestlineautomation.ca/" target="_blank" rel="noopener noreferrer">
                          {tx.standard.cta}<ArrowRight className="ml-2 size-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

              </div>

              {/* Bundle callout */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-10 rounded-2xl border border-[#2ee6a6]/20 bg-[#2ee6a6]/5 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2ee6a6]/10 border border-[#2ee6a6]/20 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-[#2ee6a6]" fill="currentColor" />
                  </div>
                  <p className="text-sm text-white/60">
                    {tx.bundleNote}{" "}
                    <span className="text-[#2ee6a6] font-bold">{tx.bundleHighlight}</span>
                  </p>
                </div>
                <a href="https://book.nestlineautomation.ca/" target="_blank" rel="noopener noreferrer"
                  className="shrink-0 text-xs font-bold px-4 py-2 rounded-full bg-[#2ee6a6] text-[#050505] hover:bg-[#2ee6a6]/90 transition-colors whitespace-nowrap">
                  {tx.bundleCta} →
                </a>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.5 }}
                className="text-center text-xs text-white/20 mt-6 leading-relaxed">
                {tx.footerNote}{" "}
                <a href="https://book.nestlineautomation.ca/" target="_blank" rel="noopener noreferrer"
                  className="text-[#2ee6a6]/60 hover:text-[#2ee6a6] hover:underline transition-colors">
                  {tx.footerLink}
                </a>
              </motion.p>

            </div>
          </ScrollTiltWrapper>
        </section>

        <CaseStudies />

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href={href("/")} className="flex items-center">
            <img src="/logo.png" alt="NestLine Automation" className="h-10 w-auto" />
          </Link>
          <p className="text-xs text-white/20">© {new Date().getFullYear()} NestLine Automation. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ee6a6] animate-pulse" />
            All systems operational
          </div>
        </div>
      </footer>
    </>
  );
}
