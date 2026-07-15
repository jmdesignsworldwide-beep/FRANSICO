"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { Logo } from "@/components/ui/Logo";
import { ThemedHero } from "@/components/heroes/ThemedHero";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <ThemedHero variant="home" accent="red" full showScrollIndicator>
      {/* eyebrow */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-silver">
          <Sparkles size={14} className="text-fi-red" />
          Santiago · República Dominicana
        </span>
      </motion.div>

      {/* Logo oficial (grande, integrado a la escena) */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-8"
      >
        <Logo
          priority
          className="h-28 w-auto drop-shadow-[0_0_35px_rgba(227,6,19,0.35)] sm:h-40 lg:h-48"
        />
      </motion.div>

      {/* Eslogan oficial */}
      <motion.h1
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-7 max-w-3xl font-display text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl"
      >
        Todo para tu vehículo{" "}
        <span className="text-fi-red">en un solo lugar</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-5 max-w-2xl text-balance text-base text-silver-muted sm:text-lg"
      >
        Mecánica, gomas y accesorios + detailing y lavado profesional{" "}
        <span className="text-velocity-glow">Velocity Wash</span>. Bajo un mismo
        techo y al más alto nivel.
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
          <WhatsAppButton
            size="lg"
            message="Hola F&I WASH, quisiera agendar una cita."
          >
            Escríbenos por WhatsApp
          </WhatsAppButton>
        </Magnetic>
        <Magnetic strength={0.3}>
          <CTAButton
            href="/contacto"
            variant="outline"
            size="lg"
            icon={<Calendar size={18} />}
          >
            Agendar cita
          </CTAButton>
        </Magnetic>
      </motion.div>

      {/* Accesos rápidos a divisiones */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm"
      >
        <CTAButton href="/servicios" variant="ghost" icon={<ArrowRight size={16} />}>
          Ver mecánica y gomas
        </CTAButton>
        <span aria-hidden className="text-white/20">
          •
        </span>
        <CTAButton href="/detailing" variant="ghost" icon={<ArrowRight size={16} />}>
          Ver detailing y lavado
        </CTAButton>
      </motion.div>
    </ThemedHero>
  );
}
