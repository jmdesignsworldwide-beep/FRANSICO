"use client";

import { motion } from "framer-motion";
import { Wrench, SprayCan, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Logo } from "@/components/ui/Logo";
import { inViewport } from "@/lib/motion";

/**
 * Bloque "Quiénes somos": narrativa + composición visual animada.
 *
 * NOTA PARA FRANCISCO: el texto es general y profesional a propósito
 * (no inventamos año de fundación, número de empleados ni cifras).
 * Cuando tengas la historia real, la incorporamos aquí.
 */
export function AboutStory() {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Texto */}
        <div>
          <ScrollReveal>
            <p className="eyebrow">
              <span className="h-px w-8 bg-fi-red" />
              Quiénes somos
            </p>
          </ScrollReveal>

          <TextReveal
            text="Una sola casa para todo tu vehículo"
            className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl"
          />

          <div className="mt-6 space-y-4 text-silver-muted">
            <ScrollReveal delay={0.05}>
              <p>
                F&amp;I WASH Auto Services nació con una idea clara: reunir bajo un
                mismo techo todo lo que tu carro necesita, con un servicio a la
                altura de los mejores. En Santiago, somos el centro automotriz
                donde la mecánica, las gomas y el detailing se hacen bien, a la
                primera y con honestidad.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                Unimos dos especialidades en una sola marca:{" "}
                <strong className="text-offwhite">F&amp;I WASH</strong> para
                mecánica y gomas, y{" "}
                <strong className="text-velocity-glow">Velocity Wash</strong> para
                el detailing y lavado premium. Dos equipos, un mismo estándar de
                calidad y atención.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p>
                Respaldados por marcas líderes como Liqui Moly, cuidamos cada
                vehículo como si fuera nuestro: diagnóstico claro, trabajo
                garantizado y ese acabado que se nota.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Composición visual animada (sin foto: abstracto premium) */}
        <ScrollReveal direction="left">
          <motion.div
            whileHover={{ y: -6 }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-carbon-700/60 backdrop-blur-sm"
          >
            <BorderBeam duration={10} />
            {/* gradientes animados */}
            <div
              aria-hidden
              className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-fi-red/25 blur-3xl animate-float"
            />
            <div
              aria-hidden
              className="absolute -bottom-12 -right-8 h-52 w-52 rounded-full bg-velocity/20 blur-3xl animate-float [animation-delay:-3s]"
            />

            {/* contenido central */}
            <div className="relative flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
              <Logo className="h-24 w-auto sm:h-28" />
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { icon: Wrench, label: "Mecánica", tint: "text-fi-red" },
                  { icon: SprayCan, label: "Detailing", tint: "text-velocity-glow" },
                  { icon: ShieldCheck, label: "Garantía", tint: "text-fi-red" },
                ].map((chip, i) => {
                  const Icon = chip.icon;
                  return (
                    <motion.span
                      key={chip.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={inViewport}
                      transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                      className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-offwhite"
                    >
                      <Icon size={16} className={chip.tint} />
                      {chip.label}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
