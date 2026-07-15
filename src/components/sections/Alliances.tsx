"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Truck } from "lucide-react";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { SITE } from "@/lib/site";

const alliances = [
  {
    icon: BadgeCheck,
    name: "Liqui Moly",
    role: "Distribuidor Autorizado",
    desc: "Lubricantes y aditivos alemanes de alta gama, con respaldo oficial de la marca.",
  },
  {
    icon: Truck,
    name: "Multimodal Xpress",
    role: "Courier Aliado",
    desc: "Logística y envíos confiables que agilizan la llegada de piezas y repuestos.",
  },
];

/**
 * Alianzas y respaldo de marca con badges animados (pulse + border beam).
 */
export function Alliances() {
  return (
    <section className="container-page py-20 sm:py-24">
      <StaggerReveal className="mx-auto mb-12 max-w-2xl text-center">
        <StaggerItem>
          <p className="eyebrow justify-center text-fi-red">
            <span className="h-px w-8 bg-fi-red" />
            Respaldo de marca
          </p>
        </StaggerItem>
        <TextReveal
          text="Aliados que nos respaldan"
          className="mt-4 font-display text-4xl tracking-tight sm:text-5xl"
        />
        <StaggerItem>
          <p className="mt-4 text-silver-muted">
            Trabajamos con marcas y socios de primer nivel para darte un servicio
            en el que puedes confiar.
          </p>
        </StaggerItem>
      </StaggerReveal>

      <StaggerReveal className="grid gap-6 md:grid-cols-2" stagger={0.14}>
        {alliances.map((al) => {
          const Icon = al.icon;
          return (
            <StaggerItem key={al.name}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative flex h-full items-start gap-5 overflow-hidden rounded-3xl border border-white/10 bg-carbon-700/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-fi-red/40 hover:shadow-glow-red"
              >
                <BorderBeam duration={11} />
                <span className="grid h-16 w-16 shrink-0 animate-pulse-glow place-items-center rounded-2xl bg-fi-red/15 text-fi-red transition-transform duration-300 group-hover:scale-110">
                  <Icon size={30} />
                </span>
                <div>
                  <h3 className="font-display text-2xl tracking-wide text-offwhite">
                    {al.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-fi-red">
                    {al.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-silver-muted">
                    {al.desc}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerReveal>

      {/* nota de respaldo */}
      <StaggerReveal className="mt-6">
        <StaggerItem>
          <p className="text-center text-xs text-silver-muted">
            {SITE.name} — {SITE.address.short}
          </p>
        </StaggerItem>
      </StaggerReveal>
    </section>
  );
}
