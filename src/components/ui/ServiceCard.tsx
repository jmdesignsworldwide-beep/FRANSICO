"use client";

import { motion } from "framer-motion";
import type { Service } from "@/lib/services";

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
 * Tarjeta de servicio con hover: elevación + glow + escala del icono.
 * El acento (rojo o morado) cambia según la división.
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

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 26 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-carbon-700/70 p-6 backdrop-blur-sm transition-all duration-300 ${a.ring} ${a.glow}`}
    >
      {/* blob de luz decorativo en la esquina */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${a.blob}`}
      />

      <div
        className={`relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${a.iconWrap}`}
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
