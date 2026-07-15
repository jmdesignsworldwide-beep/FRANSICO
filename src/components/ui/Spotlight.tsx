"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  usePrefersReducedMotion,
  useHasPointer,
} from "@/hooks/usePrefersReducedMotion";

type Accent = "red" | "blue";

const tint: Record<Accent, string> = {
  red: "rgba(227,6,19,0.16)",
  blue: "rgba(45,107,224,0.20)",
};

/**
 * Foco de luz que ilumina la zona donde está el cursor, dentro del hero.
 * El elemento padre debe ser `relative`. Desktop only + reduced-motion aware.
 */
export function Spotlight({ accent = "red" }: { accent?: Accent }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const hasPointer = useHasPointer();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.5 });

  const enabled = !reduced && hasPointer;
  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(e.clientX - rect.left - 250);
        y.set(e.clientY - rect.top - 250);
      }}
      className="pointer-events-auto absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{
          x: sx,
          y: sy,
          background: `radial-gradient(circle, ${tint[accent]}, transparent 60%)`,
        }}
        className="h-[500px] w-[500px] rounded-full blur-2xl"
      />
    </div>
  );
}
