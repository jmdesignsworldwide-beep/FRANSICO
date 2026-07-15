"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Service } from "@/lib/services";
import {
  usePrefersReducedMotion,
  useHasPointer,
} from "@/hooks/usePrefersReducedMotion";
import { staggerItem } from "@/lib/motion";

type Accent = "red" | "velocity";

const accentMap = {
  red: {
    ring: "hover:border-fi-red/50",
    glow: "hover:shadow-glow-red",
    iconWrap:
      "bg-fi-red/10 text-fi-red group-hover:bg-fi-red group-hover:text-white",
    blob: "bg-fi-red/20",
  },
  velocity: {
    ring: "hover:border-velocity-glow/60",
    glow: "hover:shadow-glow-velocity",
    iconWrap:
      "bg-velocity/15 text-velocity-glow group-hover:bg-velocity group-hover:text-white",
    blob: "bg-velocity/25",
  },
} as const;

/**
 * Tarjeta de servicio con:
 * - entrada escalonada (variants staggerItem)
 * - hover: elevación + glow del acento + escala/rotación del icono
 * - shine que cruza el borde superior en hover
 * - tilt 3D sutil siguiendo el cursor (desktop; off en touch/reduced-motion)
 */
export function ServiceCard({
  service,
  accent = "red",
  index = 0,
}: {
  service: Service;
  accent?: Accent;
  index?: number;
}) {
  const a = accentMap[accent];
  const Icon = service.icon;

  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const hasPointer = useHasPointer();
  const tiltEnabled = !reduced && hasPointer;

  // Tilt 3D basado en la posición del cursor dentro de la card.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!tiltEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 8); // rotación en Y por desplazamiento horizontal
    rx.set(-py * 8); // rotación en X por desplazamiento vertical
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      variants={staggerItem}
      whileHover={{ y: -6 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={
        tiltEnabled
          ? { rotateX: srx, rotateY: sry, transformPerspective: 900 }
          : undefined
      }
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-carbon-700/70 p-6 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 [transform-style:preserve-3d] ${a.ring} ${a.glow}`}
    >
      {/* Shine que cruza en hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />

      {/* blob de luz decorativo en la esquina */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${a.blob}`}
      />

      <div
        className={`relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 ${a.iconWrap}`}
      >
        <Icon size={26} strokeWidth={1.75} aria-hidden />
      </div>

      <h3 className="relative mb-2 font-heading text-lg font-semibold text-offwhite">
        {service.title}
      </h3>
      <p className="relative text-sm leading-relaxed text-silver-muted">
        {service.description}
      </p>

      {/* índice fantasma decorativo */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-4 font-display text-4xl leading-none text-white/[0.03] transition-colors duration-300 group-hover:text-white/[0.06]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.article>
  );
}
