"use client";

import type { CSSProperties } from "react";

type BorderBeamProps = {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
};

/**
 * Haz de luz que recorre el borde del contenedor padre (estilo Magic UI).
 * El padre debe ser `relative` y tener `overflow-hidden` + borde redondeado.
 */
export function BorderBeam({
  size = 220,
  duration = 8,
  delay = 0,
  colorFrom = "#E30613",
  colorTo = "#FF2436",
  className = "",
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": `${duration}s`,
          "--delay": `-${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] ${className}`}
    >
      <div
        className="absolute aspect-square animate-border-beam [animation-delay:var(--delay)] [background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] [offset-anchor:90%_50%] [offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]"
        style={{
          width: "calc(var(--size) * 1px)",
          offsetDistance: "0%",
        }}
      />
    </div>
  );
}
