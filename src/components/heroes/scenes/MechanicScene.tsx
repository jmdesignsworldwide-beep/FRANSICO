"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const rand = (i: number, s: number) => {
  const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/** Engranaje SVG reutilizable. */
function Gear({ className, teeth = 10 }: { className?: string; teeth?: number }) {
  const points = Array.from({ length: teeth }, (_, i) => {
    const a = (i / teeth) * Math.PI * 2;
    const outer = 50;
    const inner = 40;
    const w = 0.28;
    const x1 = 50 + outer * Math.cos(a - w);
    const y1 = 50 + outer * Math.sin(a - w);
    const x2 = 50 + outer * Math.cos(a + w);
    const y2 = 50 + outer * Math.sin(a + w);
    const na = a + Math.PI / teeth;
    const x3 = 50 + inner * Math.cos(na + w);
    const y3 = 50 + inner * Math.sin(na + w);
    const x4 = 50 + inner * Math.cos(na - w);
    const y4 = 50 + inner * Math.sin(na - w);
    return `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <polygon points={points} fill="currentColor" />
      <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="6" />
    </svg>
  );
}

/**
 * Escena "Mecánico / Taller técnico" para /servicios.
 * Engranajes girando a distinta velocidad + rejilla blueprint + chispas metálicas.
 */
export function MechanicScene() {
  const reduced = usePrefersReducedMotion();

  const sparks = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: `${rand(i, 3) * 100}%`,
        top: `${rand(i, 4) * 100}%`,
        delay: `${rand(i, 5) * 5}s`,
        hideMobile: i > 6,
      })),
    [],
  );

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Rejilla blueprint */}
      <div className="absolute inset-0 bg-grid-fade [background-size:100%_100%,40px_40px,40px_40px] opacity-70 mask-fade-edges" />

      {/* Destello base */}
      <div className="absolute left-1/2 top-[-15%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-fi-red/16 blur-[120px]" />

      {!reduced && (
        <>
          {/* Engranajes */}
          <div className="absolute -left-16 top-10 h-64 w-64 animate-[spin_26s_linear_infinite] text-silver/[0.07]">
            <Gear className="h-full w-full" teeth={12} />
          </div>
          <div className="absolute -right-10 bottom-0 h-48 w-48 animate-[spin_18s_linear_infinite_reverse] text-fi-red/[0.10]">
            <Gear className="h-full w-full" teeth={10} />
          </div>
          <div className="absolute right-[22%] top-[12%] hidden h-28 w-28 animate-[spin_14s_linear_infinite] text-silver/[0.06] sm:block">
            <Gear className="h-full w-full" teeth={8} />
          </div>

          {/* Chispas metálicas ocasionales */}
          {sparks.map((s, i) => (
            <motion.span
              key={i}
              className={`absolute h-1 w-1 rounded-full bg-fi-red-glow shadow-[0_0_6px_1px_rgba(255,36,54,0.6)] ${
                s.hideMobile ? "hidden sm:block" : ""
              }`}
              style={{ left: s.left, top: s.top }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 2.5,
                delay: parseFloat(s.delay),
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
