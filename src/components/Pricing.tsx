"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollTiltWrapper } from "@/components/ui/scroll-tilt-wrapper";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/translations";

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
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    type P = { x: number; y: number; v: number; o: number };
    let parts: P[] = []; let raf = 0;
    const make = (): P => ({ x: Math.random() * (canvas.width / (window.devicePixelRatio || 1)), y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)), v: Math.random() * 0.3 + 0.05, o: Math.random() * 0.25 + 0.08 });
    const init = () => { parts = []; const w = canvas.width / (window.devicePixelRatio || 1); const h = canvas.height / (window.devicePixelRatio || 1); for (let i = 0; i < Math.floor((w * h) / 10000); i++) parts.push(make()); };
    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1); const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => { p.y -= p.v; if (p.y < 0) { p.x = Math.random() * w; p.y = h + 40; p.v = Math.random() * 0.3 + 0.05; p.o = Math.random() * 0.25 + 0.08; } ctx.fillStyle = `rgba(46,230,166,${p.o})`; ctx.fillRect(p.x, p.y, 0.7, 2.2); });
      raf = requestAnimationFrame(draw);
    };
    const ro = new ResizeObserver(() => { setSize(); init(); }); ro.observe(canvas.parentElement || document.body);
    init(); raf = requestAnimationFrame(draw);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" />;
}

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLanguage();
  const tx = t[lang].pricing;

  return (
    <section id="pricing" ref={ref} className="relative py-28 lg:py-36 overflow-hidden">
      <style>{`
        .pricing-accent{position:absolute;inset:0;pointer-events:none;opacity:.5}
        .pricing-accent .hl,.pricing-accent .vl{position:absolute;background:#1a2e24}
        .pricing-accent .hl{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%;animation:pDrawX .8s ease forwards}
        .pricing-accent .vl{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%;animation:pDrawY .9s ease forwards}
        .pricing-accent .hl:nth-child(1){top:20%;animation-delay:.1s}.pricing-accent .hl:nth-child(2){top:55%;animation-delay:.2s}.pricing-accent .hl:nth-child(3){top:85%;animation-delay:.3s}
        .pricing-accent .vl:nth-child(4){left:20%;animation-delay:.25s}.pricing-accent .vl:nth-child(5){left:50%;animation-delay:.35s}.pricing-accent .vl:nth-child(6){left:80%;animation-delay:.45s}
        @keyframes pDrawX{to{transform:scaleX(1)}}@keyframes pDrawY{to{transform:scaleY(1)}}
      `}</style>
      <div aria-hidden className="pricing-accent">
        <div className="hl"/><div className="hl"/><div className="hl"/>
        <div className="vl"/><div className="vl"/><div className="vl"/>
      </div>
      <PricingParticles />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_50%_at_50%_0%,rgba(46,230,166,0.05),transparent_60%)]" />

      <ScrollTiltWrapper>
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ee6a6] animate-pulse" />{tx.badge}
            </span>
            <h2 className="font-heading text-[clamp(2.2rem,5vw,4rem)] leading-[1.06] mb-5">{tx.headline}</h2>
            <p className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed">{tx.sub}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.15 }}
            className="relative max-w-2xl mx-auto">
            <Card className="border-[#2ee6a6]/30 bg-zinc-900/80 backdrop-blur"
              style={{ boxShadow: "0 0 60px rgba(46,230,166,0.08), 0 20px 40px rgba(0,0,0,0.4)" }}>
              <CardHeader className="pt-8 text-center">
                <CardTitle className="font-heading text-zinc-50 text-2xl">{tx.title}</CardTitle>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">{tx.note}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-2">
                  {[tx.monthly, tx.setup, tx.adSpend].map((item) => (
                    <div key={item.label} className="text-center sm:text-left">
                      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">{item.label}</p>
                      <span className="font-heading text-3xl text-white">{item.price}</span>
                      <p className="text-zinc-500 text-xs mt-1">{item.unit}</p>
                    </div>
                  ))}
                </div>
                <Separator className="my-6 bg-zinc-800" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {tx.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-zinc-200 text-sm">
                      <CircleCheck className="size-4 text-[#2ee6a6] shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full rounded-xl bg-[#2ee6a6] text-[#050505] font-bold hover:bg-[#2ee6a6]/90" style={{ boxShadow: "0 0 30px rgba(46,230,166,0.3)" }}>
                  <a href="https://book.nestlineautomation.ca/" target="_blank" rel="noopener noreferrer">
                    {tx.cta}<ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-xs text-white/20 mt-10">{tx.footer}</motion.p>
        </div>
      </ScrollTiltWrapper>
    </section>
  );
}
