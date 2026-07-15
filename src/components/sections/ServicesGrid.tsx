"use client";

import { ServiceCard } from "@/components/ui/ServiceCard";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import type { Service } from "@/lib/services";

type Accent = "red" | "blue";

/**
 * Grid animado de servicios con scroll reveal escalonado.
 * Reutilizable entre Servicios (rojo) y Detailing (azul).
 */
export function ServicesGrid({
  eyebrow,
  title,
  subtitle,
  services,
  accent = "red",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  services: Service[];
  accent?: Accent;
}) {
  const isRed = accent === "red";
  return (
    <section className="container-page py-20 sm:py-24">
      <StaggerReveal className="mx-auto mb-12 max-w-2xl text-center">
        <StaggerItem>
          <p
            className={`eyebrow justify-center ${isRed ? "text-fi-red" : "text-velocity-glow"}`}
          >
            <span className={`h-px w-8 ${isRed ? "bg-fi-red" : "bg-velocity-glow"}`} />
            {eyebrow}
          </p>
        </StaggerItem>
        <TextReveal
          text={title}
          className="mt-4 font-display text-4xl tracking-tight sm:text-5xl"
        />
        {subtitle ? (
          <StaggerItem>
            <p className="mt-4 text-silver-muted">{subtitle}</p>
          </StaggerItem>
        ) : null}
      </StaggerReveal>

      {/* Grid escalonado: 1 col móvil, 2 tablet, 3 desktop */}
      <StaggerReveal
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.07}
      >
        {services.map((service, i) => (
          <ServiceCard
            key={service.title}
            service={service}
            accent={accent}
            index={i}
          />
        ))}
      </StaggerReveal>
    </section>
  );
}
