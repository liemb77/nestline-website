"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, CircleCheck, Clock, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";

const foundersFeatures = [
  "Lead intake automation",
  "Missed call text-back",
  "Automated appointment booking",
  "CRM setup & management",
  "Automated Google review requests",
];

const growthFeatures = [
  "Missed call → instant client response",
  "Quote sent → automatic follow-up sequence",
  "Job booked → reminders to client & crew",
  "Job done → Google review request sent",
  "Invoice unpaid → automated payment reminders",
  "Every Monday → business summary delivered to you",
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Particle canvas — same rising-dot effect as pricing-cards component
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
      const count = Math.floor((w * h) / 10000);
      for (let i = 0; i < count; i++) parts.push(make());
    };

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) {
          p.x = Math.random() * w;
          p.y = h + Math.random() * 40;
          p.v = Math.random() * 0.3 + 0.05;
          p.o = Math.random() * 0.25 + 0.08;
        }
        // Use NestLine green tint instead of white
        ctx.fillStyle = `rgba(0,232,135,${p.o})`;
        ctx.fillRect(p.x, p.y, 0.7, 2.2);
      });
      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => { setSize(); init(); });
    ro.observe(canvas.parentElement || document.body);
    init();
    raf = requestAnimationFrame(draw);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative py-28 lg:py-36 overflow-hidden"
    >
      {/* Accent grid lines — same animation as pricing-cards */}
      <style>{`
        .pricing-accent{position:absolute;inset:0;pointer-events:none;opacity:.5}
        .pricing-accent .hl,.pricing-accent .vl{position:absolute;background:#1a2e24}
        .pricing-accent .hl{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%;animation:pDrawX .8s ease forwards}
        .pricing-accent .vl{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%;animation:pDrawY .9s ease forwards}
        .pricing-accent .hl:nth-child(1){top:20%;animation-delay:.1s}
        .pricing-accent .hl:nth-child(2){top:55%;animation-delay:.2s}
        .pricing-accent .hl:nth-child(3){top:85%;animation-delay:.3s}
        .pricing-accent .vl:nth-child(4){left:20%;animation-delay:.25s}
        .pricing-accent .vl:nth-child(5){left:50%;animation-delay:.35s}
        .pricing-accent .vl:nth-child(6){left:80%;animation-delay:.45s}
        @keyframes pDrawX{to{transform:scaleX(1)}}
        @keyframes pDrawY{to{transform:scaleY(1)}}
      `}</style>

      {/* Accent lines */}
      <div aria-hidden className="pricing-accent">
        <div className="hl" /><div className="hl" /><div className="hl" />
        <div className="vl" /><div className="vl" /><div className="vl" />
      </div>

      {/* Rising particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_50%_at_50%_0%,rgba(0,232,135,0.05),transparent_60%)]" />

      <ScrollTiltWrapper>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
              Pricing
            </span>
            <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.06] mb-5">
              Simple, transparent pricing
            </h2>
            <p className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed">
              Lock in the founder's rate — only 3 spots left.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">

            {/* Founder's Deal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.15 }}
              className="relative flex-1 max-w-sm"
            >
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
                  style={{ background: "#00e887", color: "#050505" }}>
                  <Zap className="w-3 h-3" fill="currentColor" />
                  Only 3 spots left
                </span>
              </div>

              <Card className="h-full flex flex-col border-[#00e887]/30 bg-zinc-900/80 backdrop-blur"
                style={{ boxShadow: "0 0 60px rgba(0,232,135,0.08), 0 20px 40px rgba(0,0,0,0.4)" }}>
                <CardHeader className="pt-8">
                  <CardTitle className="text-zinc-50 text-xl">Founder's Deal</CardTitle>
                  <p className="text-sm text-zinc-400">Locked-in rate for our first 3 clients — never available again.</p>

                  {/* Pricing grid */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Setup</p>
                      <span className="text-3xl font-extrabold text-white">$600</span>
                      <span className="text-zinc-500 text-xs ml-1">one-time</span>
                      <p className="text-xs line-through text-zinc-600 mt-0.5">was $1,500</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Monthly</p>
                      <span className="text-3xl font-extrabold text-white">$150</span>
                      <span className="text-zinc-500 text-xs ml-1">/mo</span>
                      <p className="text-xs line-through text-zinc-600 mt-0.5">was $600/mo</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <Separator className="mb-5 bg-zinc-800" />
                  <ul className="space-y-3">
                    {foundersFeatures.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-zinc-200 text-sm">
                        <CircleCheck className="size-4 text-[#00e887] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button asChild className="w-full rounded-xl bg-[#00e887] text-[#050505] font-bold hover:bg-[#00e887]/90"
                    style={{ boxShadow: "0 0 30px rgba(0,232,135,0.3)" }}>
                    <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noreferrer">
                      Claim Your Spot
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Growth Plan — Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.28 }}
              className="relative flex-1 max-w-sm md:translate-y-2 opacity-60"
            >
              <Card className="h-full flex flex-col border-zinc-800 bg-zinc-900/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-zinc-300 text-xl">Growth Plan</CardTitle>
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                      <Clock className="w-3 h-3" />
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500">From first call to final payment — fully automated.</p>
                  <span className="text-2xl font-bold text-zinc-400 pt-1">Pricing TBD</span>
                </CardHeader>

                <CardContent className="flex-1">
                  <Separator className="mb-5 bg-zinc-800" />
                  <ul className="space-y-3">
                    {growthFeatures.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-zinc-400 text-sm">
                        <CircleCheck className="size-4 text-zinc-600 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button asChild variant="outline"
                    className="w-full rounded-xl border-zinc-700 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200">
                    <a href="https://cal.com/liem-blouin/discovery?overlayCalendar=true" target="_blank" rel="noreferrer">
                      Book a Call
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

          </div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-xs text-white/20 mt-10"
          >
            No long-term contracts · Cancel anytime · Results in 14 days or we keep working
          </motion.p>

        </div>
      </ScrollTiltWrapper>
    </section>
  );
}
