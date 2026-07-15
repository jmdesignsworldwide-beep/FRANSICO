"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const rand = (i: number, s: number) => {
  const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

/**
 * Escena "Showroom / Garaje premium" para la home.
 * Haz de luz que barre + polvo flotando + líneas neón rojas + reflejo de piso.
 */
export function ShowroomScene() {
  const reduced = usePrefersReducedMotion();

  const dust = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: `${rand(i, 1) * 100}%`,
        top: `${rand(i, 2) * 100}%`,
        size: 1 + Math.round(rand(i, 3) * 3),
        delay: `${rand(i, 4) * 6}s`,
        duration: `${6 + rand(i, 5) * 6}s`,
        hideMobile: i > 9,
      })),
    [],
  );

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Rejilla + destello */}
      <div className="absolute inset-0 bg-grid-fade [background-size:100%_100%,46px_46px,46px_46px] mask-fade-edges" />
      <div className="absolute left-1/2 top-[-10%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-fi-red/18 blur-[130px]" />

      {!reduced && (
        <>
          {/* Haz de luz de reflector que barre */}
          <div className="animate-sweep absolute -top-1/4 left-1/4 h-[150%] w-40 [animation-duration:9s] bg-gradient-to-b from-transparent via-white/[0.07] to-transparent blur-2xl" />
          <div className="animate-sweep absolute -top-1/4 left-1/2 h-[150%] w-24 [animation-delay:-4.5s] [animation-duration:11s] bg-gradient-to-b from-transparent via-fi-red/[0.10] to-transparent blur-2xl" />

          {/* Líneas neón rojas cruzando lento */}
          <motion.div
            className="absolute left-0 top-[30%] h-px w-full bg-gradient-to-r from-transparent via-fi-red/40 to-transparent"
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-0 top-[68%] h-px w-full bg-gradient-to-r from-transparent via-fi-red/30 to-transparent"
            animate={{ opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -2 }}
          />

          {/* Polvo/brillo flotando */}
          {dust.map((d, i) => (
            <span
              key={i}
              className={`animate-float absolute rounded-full bg-white/40 ${
                d.hideMobile ? "hidden sm:block" : ""
              }`}
              style={{
                left: d.left,
                top: d.top,
                width: d.size,
                height: d.size,
                animationDelay: d.delay,
                animationDuration: d.duration,
              }}
            />
          ))}
        </>
      )}

      {/* Reflejo de "piso" (profundidad) */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-fi-red/[0.06] to-transparent" />
    </div>
  );
}
