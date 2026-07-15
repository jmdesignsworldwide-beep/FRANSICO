"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const rand = (i: number, s: number) => {
  const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/**
 * Escena "Señal / Conexión / Ubicación" para /contacto.
 * Ondas de radar concéntricas desde un punto + red de puntos que conectan.
 */
export function SignalScene() {
  const reduced = usePrefersReducedMotion();

  // Nodos de la "constelación"
  const nodes = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        x: 8 + rand(i, 1) * 84,
        y: 8 + rand(i, 2) * 84,
        hideMobile: i > 5,
      })),
    [],
  );

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fade [background-size:100%_100%,46px_46px,46px_46px] mask-fade-edges" />
      <div className="absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-fi-red/16 blur-[120px]" />

      {!reduced && (
        <>
          {/* Ondas de radar desde el centro-superior */}
          <div className="absolute left-1/2 top-[38%] -translate-x-1/2">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fi-red/30"
                initial={{ scale: 0.2, opacity: 0.55 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeOut",
                }}
              />
            ))}
            {/* Punto emisor que late */}
            <motion.span
              className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fi-red shadow-glow-red"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Red de puntos conectados */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {nodes.map((n, i) => {
              const m = nodes[(i + 1) % nodes.length];
              return (
                <motion.line
                  key={`l-${i}`}
                  x1={n.x}
                  y1={n.y}
                  x2={m.x}
                  y2={m.y}
                  stroke="#E30613"
                  strokeWidth="0.15"
                  className={n.hideMobile ? "hidden sm:block" : ""}
                  animate={{ opacity: [0.05, 0.25, 0.05] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
            {nodes.map((n, i) => (
              <circle
                key={`n-${i}`}
                cx={n.x}
                cy={n.y}
                r="0.5"
                fill="#C7CBD1"
                className={n.hideMobile ? "hidden sm:block" : ""}
                opacity="0.4"
              />
            ))}
          </svg>
        </>
      )}
    </div>
  );
}
