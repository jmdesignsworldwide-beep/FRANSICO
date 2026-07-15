"use client";

import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Accent = "red" | "velocity";

const dot: Record<Accent, string> = {
  red: "bg-fi-red/40",
  velocity: "bg-velocity-glow/40",
};

/**
 * Capa de fondo del hero: partículas flotantes + meteoros sutiles.
 * - Posiciones deterministas (pseudo-random por índice) → sin mismatch de hidratación.
 * - Se atenúa con prefers-reduced-motion (sin animación).
 * - Ligero: pocas piezas, solo transform/opacity (60fps).
 */
export function HeroFX({ accent = "red" }: { accent?: Accent }) {
  const reduced = usePrefersReducedMotion();

  // Pseudo-random determinista basado en el índice.
  const rand = (i: number, seed: number) => {
    const v = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: `${rand(i, 1) * 100}%`,
        top: `${rand(i, 2) * 100}%`,
        size: 2 + Math.round(rand(i, 3) * 3),
        delay: `${rand(i, 4) * 6}s`,
        duration: `${5 + rand(i, 5) * 5}s`,
      })),
    [],
  );

  const meteors = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        left: `${10 + rand(i, 7) * 80}%`,
        top: `${rand(i, 8) * 40}%`,
        delay: `${rand(i, 9) * 8}s`,
        duration: `${3 + rand(i, 10) * 4}s`,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Partículas flotantes */}
      {particles.map((p, i) => (
        <span
          key={`p-${i}`}
          className={`absolute rounded-full ${dot[accent]} ${reduced ? "" : "animate-float"}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Meteoros: solo si no hay reduced-motion, y menos en móvil */}
      {!reduced &&
        meteors.map((m, i) => (
          <span
            key={`m-${i}`}
            className={`animate-meteor absolute h-0.5 w-0.5 rounded-full bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)] ${
              i > 3 ? "hidden md:block" : ""
            }`}
            style={{
              left: m.left,
              top: m.top,
              animationDelay: m.delay,
              animationDuration: m.duration,
            }}
          >
            <span className="absolute right-0 top-1/2 h-px w-16 -translate-y-1/2 bg-gradient-to-r from-white/60 to-transparent" />
          </span>
        ))}
    </div>
  );
}
