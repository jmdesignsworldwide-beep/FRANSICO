"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, SprayCan, ArrowUpRight } from "lucide-react";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import { BorderBeam } from "@/components/ui/BorderBeam";

const divisions = [
  {
    href: "/servicios",
    brand: "F&I WASH",
    title: "Mecánica y Gomas",
    desc: "Neumáticos, balanceo, frenos, aceite Liqui Moly, baterías y tren delantero. Diagnóstico honesto y trabajo garantizado.",
    icon: Wrench,
    accent: "red" as const,
  },
  {
    href: "/detailing",
    brand: "Velocity Wash",
    title: "Detailing y Lavado",
    desc: "Lavado y encerado a mano, corrección de pintura, cerámica, tratamiento de ozono y restauración de faros. Tu carro como nuevo.",
    icon: SprayCan,
    accent: "blue" as const,
  },
];

export function Divisions() {
  return (
    <section className="container-page py-20 sm:py-28">
      <StaggerReveal className="mb-12 text-center">
        <StaggerItem>
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-fi-red" />
            Dos divisiones, un solo estándar
          </p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            Todo lo que tu carro necesita
          </h2>
        </StaggerItem>
      </StaggerReveal>

      <StaggerReveal className="grid gap-6 md:grid-cols-2" stagger={0.12}>
        {divisions.map((d) => {
          const Icon = d.icon;
          const isRed = d.accent === "red";
          return (
            <StaggerItem key={d.href}>
              <motion.div whileHover={{ y: -8 }} className="h-full">
                <Link
                  href={d.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-carbon-700/60 p-8 backdrop-blur-sm transition-all duration-300 sm:p-10"
                >
                  <BorderBeam
                    duration={9}
                    colorFrom={isRed ? "#E30613" : "#2D6BE0"}
                    colorTo={isRed ? "#FF2436" : "#F2B441"}
                  />

                  {/* glow de fondo al hover */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                      isRed ? "bg-fi-red/25" : "bg-velocity/30"
                    }`}
                  />

                  <div className="relative flex items-start justify-between">
                    <div
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                        isRed
                          ? "bg-fi-red/15 text-fi-red"
                          : "bg-velocity/20 text-velocity-glow"
                      }`}
                    >
                      <Icon size={30} strokeWidth={1.75} />
                    </div>
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-full border border-white/10 text-silver transition-all duration-300 group-hover:border-white/30 group-hover:text-white ${
                        isRed
                          ? "group-hover:bg-fi-red/20"
                          : "group-hover:bg-velocity/20"
                      }`}
                    >
                      <ArrowUpRight size={20} />
                    </span>
                  </div>

                  <span
                    className={`relative mt-8 text-xs font-semibold uppercase tracking-[0.25em] ${
                      isRed ? "text-fi-red" : "text-velocity-glow"
                    }`}
                  >
                    {d.brand}
                  </span>
                  <h3 className="relative mt-2 font-display text-3xl tracking-tight text-offwhite sm:text-4xl">
                    {d.title}
                  </h3>
                  <p className="relative mt-4 flex-1 text-sm leading-relaxed text-silver-muted sm:text-base">
                    {d.desc}
                  </p>

                  <span className="relative mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-white">
                    Explorar servicios
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </Link>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerReveal>
    </section>
  );
}
