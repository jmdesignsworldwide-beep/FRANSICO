"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const rand = (i: number, s: number) => {
  const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/**
 * Escena "Trayectoria / Confianza" para /nosotros.
 * Líneas que se dibujan solas (draw-on) + partículas lentas + destellos.
 * Más "asentada" y elegante que las demás.
 */
export function TrajectoryScene() {
  const reduced = usePrefersReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${rand(i, 1) * 100}%`,
        top: `${rand(i, 2) * 100}%`,
        size: 1 + Math.round(rand(i, 3) * 3),
        delay: `${rand(i, 4) * 6}s`,
        duration: `${7 + rand(i, 5) * 6}s`,
        hideMobile: i > 7,
      })),
    [],
  );

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.5,
      transition: {
        pathLength: { duration: 2.4, delay: 0.3 + i * 0.4, ease: "easeInOut" as const },
        opacity: { duration: 0.4, delay: 0.3 + i * 0.4 },
      },
    }),
  };

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fade [background-size:100%_100%,46px_46px,46px_46px] mask-fade-edges" />
      <div className="absolute left-1/2 top-[-12%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-fi-red/16 blur-[120px]" />

      {!reduced && (
        <>
          {/* Líneas de trayectoria que se dibujan solas */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            fill="none"
          >
            {[
              "M -50 480 C 250 400, 350 200, 650 260 S 1050 180, 1100 120",
              "M -50 200 C 200 260, 400 460, 700 420 S 1000 500, 1080 460",
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke={i === 0 ? "#E30613" : "#8A8F98"}
                strokeWidth="1.5"
                custom={i}
                variants={draw}
                initial="hidden"
                animate="visible"
              />
            ))}
          </svg>

          {/* Nodos que laten en la trayectoria */}
          {[
            { x: "35%", y: "43%" },
            { x: "65%", y: "43%" },
            { x: "70%", y: "70%" },
          ].map((n, i) => (
            <motion.span
              key={i}
              className="absolute h-2 w-2 rounded-full bg-fi-red shadow-glow-red"
              style={{ left: n.x, top: n.y }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
            />
          ))}

          {/* Partículas lentas */}
          {particles.map((p, i) => (
            <span
              key={i}
              className={`animate-float absolute rounded-full bg-white/30 ${
                p.hideMobile ? "hidden sm:block" : ""
              }`}
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
        </>
      )}
    </div>
  );
}
