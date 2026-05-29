"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollTiltWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps any section content with a scroll-scrubbed 3D tilt that goes from
 * rotateX(18°) → rotateX(0°) as the section enters the viewport — the same
 * effect as the Aceternity ContainerScroll but without the fixed tall container.
 */
export function ScrollTiltWrapper({ children, className }: ScrollTiltWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotateX  = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const opacity  = useTransform(scrollYProgress, [0, 0.35], [0.25, 1]);
  const scale    = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div
      ref={ref}
      style={{ perspective: "1200px" }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          opacity,
          scale,
          y: translateY,
          transformOrigin: "top center",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
