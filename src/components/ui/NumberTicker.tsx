"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
} from "framer-motion";

type NumberTickerProps = {
  value: number;
  /** Sufijo, p.ej. "+" o "%". */
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  className?: string;
};

/**
 * Contador animado que corre una sola vez al entrar en viewport.
 */
export function NumberTicker({
  value,
  suffix = "",
  prefix = "",
  durationMs = 1600,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, value, durationMs, count]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      <motion.span aria-hidden>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
