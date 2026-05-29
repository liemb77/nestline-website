"use client";

import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function DashboardShowcase() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,232,135,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <ContainerScroll
        titleComponent={
          <div className="mb-6 px-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase glass text-white/40 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e887] animate-pulse" />
              Built for contractors
            </span>

            <h2 className="text-[clamp(2rem,5vw,3.8rem)] font-extrabold tracking-tight leading-[1.06] text-white mb-4">
              Your entire business,{" "}
              <br className="hidden sm:block" />
              <span
                style={{
                  background: "linear-gradient(135deg, #00e887 0%, #00c2ff 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                running on autopilot.
              </span>
            </h2>

            <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              One dashboard. Every lead, follow-up, booking, and review request —
              automated and tracked in real time.
            </p>
          </div>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80"
          alt="NestLine automation dashboard"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full w-full object-top"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
}
