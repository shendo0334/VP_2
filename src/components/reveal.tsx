"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

export function Reveal({ children, className, delay = 0 }: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -32px 0px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={inView && reducedMotion === false ? { y: [16, 0], opacity: [0.72, 1] } : undefined}
      transition={{ duration: 0.68, delay, ease: [0.21, 0.7, 0.26, 1] }}
    >
      {children}
    </motion.div>
  );
}
