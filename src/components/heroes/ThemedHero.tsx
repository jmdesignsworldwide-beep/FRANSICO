"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import { ShowroomScene } from "./scenes/ShowroomScene";
import { MechanicScene } from "./scenes/MechanicScene";
import { WaterScene } from "./scenes/WaterScene";
import { TrajectoryScene } from "./scenes/TrajectoryScene";
import { SignalScene } from "./scenes/SignalScene";

export type HeroVariant = "home" | "mechanics" | "wash" | "about" | "contact";
type Accent = "red" | "blue";

/** Imagen de fondo temática opcional (foto stock o real del taller). */
export type HeroImage = {
  /** Ruta local (/images/heroes/...) o URL remota permitida (Unsplash/Pexels). */
  src: string;
  alt?: string;
  /** object-position (art direction), p. ej. "center" o "50% 30%". */
  position?: string;
  /** Placeholder blur mientras carga. */
  blurDataURL?: string;
  /** priority solo en el hero de la home. */
  priority?: boolean;
};

const scenes: Record<HeroVariant, () => ReactNode> = {
  home: () => <ShowroomScene />,
  mechanics: () => <MechanicScene />,
  wash: () => <WaterScene />,
  about: () => <TrajectoryScene />,
  contact: () => <SignalScene />,
};

/**
 * Hero base reutilizable con escena temática animada por página.
 * Capas (de atrás hacia adelante): FOTO (opcional, con Ken Burns + parallax +
 * overlay + tinte de marca) → escena animada → contenido/texto.
 * El texto siempre queda legible gracias al overlay oscuro.
 */
export function ThemedHero({
  variant,
  accent = "red",
  children,
  full = false,
  showScrollIndicator = false,
  image,
}: {
  variant: HeroVariant;
  accent?: Accent;
  children: ReactNode;
  /** true = pantalla completa (home); false = ~68vh (páginas de sección). */
  full?: boolean;
  showScrollIndicator?: boolean;
  image?: HeroImage;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  // La foto hace parallax más lento que la escena/contenido.
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const Scene = scenes[variant];
  const isRed = accent === "red";

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Capa de FOTO (opcional): Ken Burns + parallax + overlay + tinte de marca */}
      {image ? (
        <motion.div
          aria-hidden
          style={{ y: photoY }}
          className="absolute inset-0 -z-20"
        >
          <div className="absolute inset-0 animate-kenburns">
            <Image
              src={image.src}
              alt={image.alt ?? ""}
              fill
              priority={image.priority}
              sizes="100vw"
              placeholder={image.blurDataURL ? "blur" : "empty"}
              blurDataURL={image.blurDataURL}
              className="object-cover"
              style={{ objectPosition: image.position ?? "center" }}
            />
          </div>
          {/* Overlay oscuro para legibilidad (contraste AA) */}
          <div className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-carbon/65 to-carbon/90" />
          {/* Tinte sutil del acento para unificar con la identidad */}
          <div
            className={`absolute inset-0 mix-blend-soft-light ${
              isRed ? "bg-fi-red/20" : "bg-velocity/25"
            }`}
          />
        </motion.div>
      ) : null}

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
                isRed ? "bg-fi-red" : "bg-velocity-glow"
              }`}
            />
          </div>
        </motion.div>
      ) : null}
    </section>
  );
}
