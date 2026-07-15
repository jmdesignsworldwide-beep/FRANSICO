"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CTAButton } from "@/components/ui/CTAButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { ThemedHero, type HeroVariant } from "@/components/heroes/ThemedHero";

type Accent = "red" | "velocity";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Hero interno reutilizable para páginas de sección.
 * Envuelve <ThemedHero> con la escena temática de cada página y aporta el
 * contenido (breadcrumb, eyebrow, título con reveal, subtítulo, CTAs magnéticos).
 */
export function SectionHero({
  eyebrow,
  breadcrumbLabel,
  title,
  highlight,
  subtitle,
  accent = "red",
  variant,
  waMessage,
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string;
  breadcrumbLabel: string;
  title: string;
  highlight: string;
  subtitle: string;
  accent?: Accent;
  /** Escena temática del hero (mechanics / wash / about / contact). */
  variant: HeroVariant;
  waMessage?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const isRed = accent === "red";

  return (
    <ThemedHero variant={variant} accent={accent}>
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

      {/* CTAs */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Magnetic strength={0.4}>
          <WhatsAppButton size="lg" message={waMessage} accent={accent}>
            {isRed ? "Cotizar por WhatsApp" : "Agendar por WhatsApp"}
          </WhatsAppButton>
        </Magnetic>
        {secondaryHref && secondaryLabel ? (
          <Magnetic strength={0.3}>
            <CTAButton
              href={secondaryHref}
              variant="outline"
              size="lg"
              icon={<ArrowRight size={18} />}
            >
              {secondaryLabel}
            </CTAButton>
          </Magnetic>
        ) : null}
      </motion.div>
    </ThemedHero>
  );
}
