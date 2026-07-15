"use client";

import type { ReactNode } from "react";

/**
 * Marquee infinito y accesible. Duplica el contenido para un loop sin costuras.
 * Se pausa al hacer hover (pointer) para no marear.
 */
export function Marquee({
  children,
  className = "",
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={`group flex overflow-hidden ${className}`}
      role="marquee"
      aria-label="Anuncios en movimiento"
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={`flex shrink-0 items-center gap-8 pr-8 animate-marquee ${
            pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
          }`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
