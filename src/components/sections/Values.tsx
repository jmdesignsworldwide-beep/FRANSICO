"use client";

import { motion } from "framer-motion";
import { Award, Handshake, Cpu, Headset } from "lucide-react";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";

const values = [
  {
    icon: Award,
    title: "Calidad",
    desc: "Repuestos y productos de marcas líderes, y mano de obra que respalda cada trabajo.",
  },
  {
    icon: Handshake,
    title: "Confianza",
    desc: "Diagnóstico honesto y precios claros. Te decimos lo que tu carro necesita, sin vueltas.",
  },
  {
    icon: Cpu,
    title: "Tecnología",
    desc: "Equipos y técnicas actuales para gomas, mecánica y detailing de alta gama.",
  },
  {
    icon: Headset,
    title: "Atención",
    desc: "Trato cercano y comunicación en todo momento. Tu tiempo y tu vehículo importan.",
  },
];

/**
 * Valores de la marca con iconos que reaccionan al hover.
 */
export function Values() {
  return (
    <section className="container-page py-20 sm:py-24">
      <StaggerReveal className="mx-auto mb-12 max-w-2xl text-center">
        <StaggerItem>
          <p className="eyebrow justify-center text-fi-red">
            <span className="h-px w-8 bg-fi-red" />
            Lo que nos mueve
          </p>
        </StaggerItem>
        <TextReveal
          text="Nuestros valores"
          className="mt-4 font-display text-4xl tracking-tight sm:text-5xl"
        />
      </StaggerReveal>

      <StaggerReveal
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.09}
      >
        {values.map((v) => {
          const Icon = v.icon;
          return (
            <StaggerItem key={v.title}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-carbon-700/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-fi-red/50 hover:shadow-glow-red"
              >
                {/* shine que cruza en hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-fi-red/10 text-fi-red transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-fi-red group-hover:text-white">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-offwhite">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-silver-muted">
                  {v.desc}
                </p>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerReveal>
    </section>
  );
}
