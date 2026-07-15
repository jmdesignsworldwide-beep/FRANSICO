"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import { ShowroomScene } from "./scenes/ShowroomScene";
import { MechanicScene } from "./scenes/MechanicScene";
import { WaterScene } from "./scenes/WaterScene";
import { TrajectoryScene } from "./scenes/TrajectoryScene";
import { SignalScene } from "./scenes/SignalScene";

export type HeroVariant = "home" | "mechanics" | "wash" | "about" | "contact";
type Accent = "red" | "velocity";

const scenes: Record<HeroVariant, () => ReactNode> = {
  home: () => <ShowroomScene />,
  mechanics: () => <MechanicScene />,
  wash: () => <WaterScene />,
  about: () => <TrajectoryScene />,
  contact: () => <SignalScene />,
};

/**
 * Hero base reutilizable con escena temática animada por página.
 * Comparte estructura (escena + parallax + spotlight + overlay de legibilidad +
 * scroll indicator); solo cambian la escena de fondo, el acento y el contenido.
 * El contenido (eyebrow, título, CTAs) se pasa como children.
 */
export function ThemedHero({
  variant,
  accent = "red",
  children,
  full = false,
  showScrollIndicator = false,
}: {
  variant: HeroVariant;
  accent?: Accent;
  children: ReactNode;
  /** true = pantalla completa (home); false = ~68vh (páginas de sección). */
  full?: boolean;
  showScrollIndicator?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const Scene = scenes[variant];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Escena temática con parallax */}
      <motion.div style={{ y: sceneY }} className="absolute inset-0 -z-10">
        <Scene />
      </motion.div>

      {/* Overlay para asegurar legibilidad del texto sobre la escena */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-carbon/40 via-carbon/20 to-carbon/70"
      />

      {/* Spotlight que sigue el cursor (desktop) */}
      <Spotlight accent={accent} />

      {/* Contenido */}
      <div
        className={`container-page relative flex flex-col items-center justify-center py-24 text-center ${
          full ? "min-h-[calc(100vh-5rem)]" : "min-h-[62vh] sm:min-h-[68vh]"
        }`}
      >
        {children}
      </div>

      {/* Indicador de scroll */}
      {showScrollIndicator ? (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className={`h-1.5 w-1.5 rounded-full ${
                accent === "red" ? "bg-fi-red" : "bg-velocity-glow"
              }`}
            />
          </div>
        </motion.div>
      ) : null}
    </section>
  );
}
