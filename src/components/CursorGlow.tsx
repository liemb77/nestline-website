"use client";

import { useEffect, useRef } from "react";

/**
 * Soft white light that trails the cursor with a slight lag, plus a faint
 * technical grid that's invisible on the black background until the light
 * passes over it. Fixed site-wide (mounted once in the root layout).
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const glowEl = glowRef.current;
    const gridEl = gridRef.current;
    if (!glowEl || !gridEl) return;

    const root = document.documentElement;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    let active = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!active) {
        active = true;
        glowEl.classList.add("active");
        gridEl.classList.add("active");
      }
    };
    const onLeave = () => {
      active = false;
      glowEl.classList.remove("active");
      gridEl.classList.remove("active");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const loop = () => {
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      root.style.setProperty("--mx", `${current.x}px`);
      root.style.setProperty("--my", `${current.y}px`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={gridRef} className="grid-reveal" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  );
}