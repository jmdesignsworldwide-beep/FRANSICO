"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type Accent = "red" | "velocity";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Hero interno reutilizable para páginas de sección (Servicios, Detailing, etc.).
 * NO es el hero del home. Cambia el acento (rojo / morado) según la división.
 */
export function SectionHero({
  eyebrow,
  breadcrumbLabel,
  title,
  highlight,
  subtitle,
  accent = "red",
  waMessage,
}: {
  /** Texto pequeño superior (p. ej. "F&I WASH · Servicios"). */
  eyebrow: string;
  /** Etiqueta de la página actual para el breadcrumb (p. ej. "Servicios"). */
  breadcrumbLabel: string;
  /** Primera parte del título (color base). */
  title: string;
  /** Segunda parte del título, resaltada con el acento. */
  highlight: string;
  subtitle: string;
  accent?: Accent;
  waMessage?: string;
}) {
  const isRed = accent === "red";
  return (
    <section className="relative overflow-hidden">
      {/* Fondo: rejilla + destello del acento */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-fade [background-size:100%_100%,44px_44px,44px_44px] mask-fade-edges" />
        <div
          className={`absolute left-1/2 top-[-20%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-[120px] animate-float ${
            isRed ? "bg-fi-red/18" : "bg-velocity/18"
          }`}
        />
        <div
          className={`absolute right-[8%] top-[40%] h-56 w-56 rounded-full blur-[100px] animate-float [animation-delay:-3s] ${
            isRed ? "bg-fi-red/10" : "bg-velocity/12"
          }`}
        />
        {/* Toque dorado tipo destello de agua, solo en la división de detailing */}
        {!isRed ? (
          <div className="absolute left-[12%] top-[55%] h-40 w-40 rounded-full bg-gold/10 blur-[90px] animate-float [animation-delay:-1.5s]" />
        ) : null}
      </div>

      <div className="container-page relative flex min-h-[62vh] flex-col items-center justify-center py-24 text-center sm:min-h-[68vh]">
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Ruta de navegación"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <ol className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-silver-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Inicio
              </Link>
            </li>
            <ChevronRight size={13} aria-hidden className="text-white/30" />
            <li aria-current="page" className="text-white">
              {breadcrumbLabel}
            </li>
          </ol>
        </motion.nav>

        {/* Eyebrow */}
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={`eyebrow justify-center ${isRed ? "text-fi-red" : "text-velocity-glow"}`}
        >
          <span className={`h-px w-8 ${isRed ? "bg-fi-red" : "bg-velocity-glow"}`} />
          {eyebrow}
        </motion.p>

        {/* Título */}
        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl"
        >
          <span className="text-metal">{title}</span>{" "}
          <span
            className={`relative inline-block ${isRed ? "text-fi-red" : "text-velocity-glow"}`}
          >
            {highlight}
            <span
              aria-hidden
              className={`absolute -inset-x-1 -bottom-2 h-[3px] bg-gradient-to-r from-transparent to-transparent ${
                isRed ? "via-fi-red" : "via-velocity-glow"
              }`}
            />
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-2xl text-balance text-base text-silver-muted sm:text-lg"
        >
          {subtitle}
        </motion.p>

        {/* CTA WhatsApp */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-9"
        >
          <WhatsAppButton size="lg" message={waMessage} accent={accent}>
            {isRed ? "Cotizar por WhatsApp" : "Agendar por WhatsApp"}
          </WhatsAppButton>
        </motion.div>
      </div>
    </section>
  );
}
