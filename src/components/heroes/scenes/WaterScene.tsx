"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** pseudo-random determinista por índice (evita mismatch de hidratación) */
const rand = (i: number, s: number) => {
  const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/**
 * Escena "Agua / Wash / Brillo líquido" para /detailing (Velocity Wash).
 * Burbujas que suben + gotas que resbalan + caustics morados + ripples + shine.
 * Ligera en móvil (menos piezas) y con fallback estático en reduced-motion.
 */
export function WaterScene() {
  const reduced = usePrefersReducedMotion();

  const bubbles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${rand(i, 1) * 100}%`,
        size: 6 + Math.round(rand(i, 2) * 20),
        delay: `${rand(i, 3) * 8}s`,
        duration: `${6 + rand(i, 4) * 7}s`,
        hideMobile: i > 7,
      })),
    [],
  );

  const drops = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        left: `${5 + rand(i, 5) * 90}%`,
        top: `${rand(i, 6) * 30}%`,
        delay: `${rand(i, 7) * 6}s`,
        duration: `${3.5 + rand(i, 8) * 3}s`,
        hideMobile: i > 4,
      })),
    [],
  );

  // Fallback estático premium
  if (reduced) {
    return (
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-velocity/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[110px]" />
      </div>
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Caustics: manchas de luz morada que respiran y se desplazan */}
      <motion.div
        className="absolute left-1/2 top-[-10%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-velocity/25 blur-[120px]"
        animate={{ x: [-40, 40, -40], scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[12%] top-[35%] h-72 w-72 rounded-full bg-velocity-glow/20 blur-[100px]"
        animate={{ y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: -3 }}
      />
      <motion.div
        className="absolute bottom-[8%] left-[14%] h-56 w-56 rounded-full bg-gold/12 blur-[90px]"
        animate={{ x: [0, 26, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: -5 }}
      />

      {/* Ripples: ondas concéntricas ocasionales */}
      {[0, 1, 2].map((i) => (
        <div
          key={`rip-${i}`}
          className="absolute"
          style={{ left: `${20 + i * 28}%`, top: `${30 + (i % 2) * 30}%` }}
        >
          {[0, 1].map((j) => (
            <motion.span
              key={j}
              className="absolute h-16 w-16 rounded-full border border-velocity-glow/30"
              initial={{ scale: 0.2, opacity: 0.5 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3 + j * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      ))}

      {/* Burbujas que suben */}
      {bubbles.map((b, i) => (
        <span
          key={`b-${i}`}
          className={`animate-bubble absolute bottom-0 rounded-full border border-white/20 bg-velocity-glow/10 ${
            b.hideMobile ? "hidden sm:block" : ""
          }`}
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}

      {/* Gotas que resbalan */}
      {drops.map((d, i) => (
        <span
          key={`d-${i}`}
          className={`animate-drip absolute h-4 w-1 rounded-full bg-gradient-to-b from-velocity-glow/60 to-transparent ${
            d.hideMobile ? "hidden sm:block" : ""
          }`}
          style={{
            left: d.left,
            top: d.top,
            animationDelay: d.delay,
            animationDuration: d.duration,
          }}
        />
      ))}

      {/* Shine tipo reflejo en pintura encerada */}
      <motion.div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
        animate={{ x: ["-120%", "320%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
      />
    </div>
  );
}
