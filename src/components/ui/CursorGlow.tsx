"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  usePrefersReducedMotion,
  useHasPointer,
} from "@/hooks/usePrefersReducedMotion";

/**
 * Halo suave que sigue el cursor (toque premium en desktop).
 * Se desactiva en touch y con prefers-reduced-motion.
 * Renderiza con transform (GPU) y pointer-events none.
 */
export function CursorGlow() {
  const reduced = usePrefersReducedMotion();
  const hasPointer = useHasPointer();

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 180, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (reduced || !hasPointer) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 160);
      y.set(e.clientY - 160);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduced, hasPointer, x, y]);

  if (reduced || !hasPointer) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[55] hidden h-80 w-80 rounded-full opacity-60 blur-[80px] md:block"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(227,6,19,0.18),rgba(107,47,179,0.10)_45%,transparent_70%)]" />
    </motion.div>
  );
}
