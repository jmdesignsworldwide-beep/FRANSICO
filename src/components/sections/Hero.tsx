"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { Spotlight } from "@/components/ui/Spotlight";
import { HeroFX } from "@/components/ui/HeroFX";
import { SITE } from "@/lib/site";

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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Fondo: gradiente animado + rejilla desvanecida (parallax) */}
      <motion.div style={{ y: bgY }} aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-fade [background-size:100%_100%,44px_44px,44px_44px] mask-fade-edges" />
        <div className="absolute left-1/2 top-[-10%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-fi-red/20 blur-[120px] animate-float" />
        <div className="absolute right-[10%] top-[30%] h-72 w-72 rounded-full bg-velocity/15 blur-[100px] animate-float [animation-delay:-3s]" />
        <HeroFX accent="red" />
      </motion.div>

      {/* Spotlight que sigue el cursor (desktop) */}
      <Spotlight accent="red" />

      <div className="container-page relative flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-20 text-center">
        {/* eyebrow */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-silver">
            <Sparkles size={14} className="text-fi-red" />
            Santiago · República Dominicana
          </span>
        </motion.div>

        {/* Título gigante */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="text-metal">F&amp;I</span>{" "}
          <span className="relative inline-block text-fi-red">
            WASH
            <span
              aria-hidden
              className="absolute -inset-x-2 -bottom-2 h-[3px] bg-gradient-to-r from-transparent via-fi-red to-transparent"
            />
          </span>
          <span className="mt-2 block text-2xl font-heading font-medium tracking-wide text-silver sm:text-3xl lg:text-4xl">
            Auto Services
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-2xl text-balance text-base text-silver-muted sm:text-lg"
        >
          Mecánica y gomas de precisión + detailing y lavado profesional{" "}
          <span className="text-velocity-glow">Velocity Wash</span>. Todo tu
          carro, bajo un mismo techo y al más alto nivel.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
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
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm"
        >
          <CTAButton href="/servicios" variant="ghost" icon={<ArrowRight size={16} />}>
            Ver mecánica y gomas
          </CTAButton>
          <span aria-hidden className="text-white/20">•</span>
          <CTAButton href="/detailing" variant="ghost" icon={<ArrowRight size={16} />}>
            Ver detailing y lavado
          </CTAButton>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
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
            className="h-1.5 w-1.5 rounded-full bg-fi-red"
          />
        </div>
      </motion.div>
    </section>
  );
}
