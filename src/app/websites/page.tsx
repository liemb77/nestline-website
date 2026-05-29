"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CircleCheck, Smartphone, MapPin, Search, Gauge, Mail, Globe } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";

const features = [
  { icon: Globe,      label: "Custom design tailored to your trade" },
  { icon: Smartphone, label: "Fully mobile responsive" },
  { icon: Mail,       label: "Built-in contact form" },
  { icon: MapPin,     label: "Google Maps embed" },
  { icon: Search,     label: "SEO basics included" },
  { icon: Gauge,      label: "Fast load time, optimised images" },
];

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

export default function WebsitesPage() {
  const pricingRef = useRef(null);
  const inView = useInView(pricingRef, { once: true, margin: "-80px" });

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden py-24">
          {/* Subtle green radial glow — same style as main page sections */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(0,232,135,0.05) 0%, transparent 65%)" }} />

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
              <motion.span custom={0} variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
                Contractor Websites
              </motion.span>

              <motion.h1 custom={1} variants={itemVariants}
                className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.06] tracking-tight">
                Sites That{" "}
                <span className="text-gradient">Actually Convert</span>
              </motion.h1>

              <motion.p custom={2} variants={itemVariants}
                className="text-lg sm:text-xl text-white/40 max-w-2xl leading-relaxed">
                Fast, clean, mobile-ready websites built for contractors who want to
                look professional and win more jobs online.
              </motion.p>

              <motion.a custom={3} variants={itemVariants}
                href="https://cal.com/liem-blouin/discovery?overlayCalendar=true"
                target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-7 py-4 rounded-full btn-primary text-sm font-bold mt-2">
                Get Your Website Built
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
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_50%_at_50%_0%,rgba(0,232,135,0.05),transparent_60%)]" />

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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
                  Website Pricing
                </span>
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
                  Pick your plan
                </h2>
                <p className="text-white/40 text-lg max-w-md mx-auto leading-relaxed">
                  Own it outright or let us handle everything ongoing.
                </p>
              </motion.div>

              {/* Cards */}
              <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">

                {/* Standard */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.15 }}
                  className="relative flex-1 max-w-sm"
                >
                  <Card className="h-full flex flex-col border-[#00e887]/30 bg-zinc-900/80 backdrop-blur"
                    style={{ boxShadow: "0 0 60px rgba(0,232,135,0.08), 0 20px 40px rgba(0,0,0,0.4)" }}>
                    <CardHeader>
                      <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#00e887] mb-1">Standard</p>
                      <CardTitle className="text-zinc-50 text-xl">Built for your trade</CardTitle>
                      <p className="text-sm text-zinc-400">Fast, clean, mobile-ready website. You own it — we handle the build.</p>
                      <div className="pt-2 space-y-1">
                        <div>
                          <span className="text-4xl font-extrabold text-white">$1,500</span>
                          <span className="text-zinc-500 text-sm ml-2">setup</span>
                        </div>
                        <div>
                          <span className="text-2xl font-bold text-zinc-300">+ $100</span>
                          <span className="text-zinc-500 text-sm ml-2">/month maintenance</span>
                        </div>
                        <p className="text-xs text-[#00e887]/60 font-semibold pt-0.5">Updates, support & tweaks included.</p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Separator className="mb-5 bg-zinc-800" />
                      <ul className="space-y-3">
                        {features.map(({ label }) => (
                          <li key={label} className="flex items-center gap-2.5 text-zinc-200 text-sm">
                            <CircleCheck className="size-4 text-[#00e887] shrink-0" />
                            {label}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full rounded-xl bg-[#00e887] text-[#050505] font-bold hover:bg-[#00e887]/90"
                        style={{ boxShadow: "0 0 30px rgba(0,232,135,0.3)" }}>
                        <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noreferrer">
                          Get Your Website Built
                          <ArrowRight className="ml-2 size-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Premium / Custom Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.28 }}
                  className="relative flex-1 max-w-sm md:translate-y-2"
                >
                  <Card className="h-full flex flex-col border-zinc-800 bg-zinc-900/50 backdrop-blur">
                    <CardHeader>
                      <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#00c2ff] mb-1">Premium</p>
                      <CardTitle className="text-zinc-50 text-xl">High-value brands</CardTitle>
                      <p className="text-sm text-zinc-400">
                        For businesses that need something beyond the standard — custom scope, premium design, and a quote built around your goals.
                      </p>
                      <div className="pt-2">
                        <span className="text-4xl font-extrabold text-white">Custom</span>
                        <p className="text-xs text-zinc-500 mt-1">Pricing discussed on call · No surprises</p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Separator className="mb-5 bg-zinc-800" />
                      <ul className="space-y-3">
                        {[
                          "Everything in Standard",
                          "Premium custom design",
                          "Advanced functionality & integrations",
                          "Brand strategy consultation",
                          "Priority turnaround",
                          "Dedicated ongoing support",
                        ].map((label) => (
                          <li key={label} className="flex items-center gap-2.5 text-zinc-200 text-sm">
                            <CircleCheck className="size-4 text-[#00c2ff] shrink-0" />
                            {label}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline"
                        className="w-full rounded-xl border-[#00c2ff]/30 bg-[#00c2ff]/10 text-[#00c2ff] hover:bg-[#00c2ff]/20 hover:text-[#00c2ff]">
                        <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noreferrer">
                          Book a Call for a Quote
                          <ArrowRight className="ml-2 size-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-center text-xs text-white/20 mt-8 leading-relaxed"
              >
                Need a website + automation together?{" "}
                <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noreferrer"
                  className="text-[#00e887]/60 hover:text-[#00e887] hover:underline transition-colors">
                  Book a call for a bundled quote.
                </a>
              </motion.p>

            </div>
          </ScrollTiltWrapper>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="NestLine Automation" className="h-10 w-auto" />
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
