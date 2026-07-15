"use client";

import { Award, Car, Wrench, ShieldCheck } from "lucide-react";
import { SectionHero } from "@/components/sections/SectionHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ServicesPromo } from "@/components/sections/ServicesPromo";
import { StatsBand, type Stat } from "@/components/sections/StatsBand";
import { CTASection } from "@/components/sections/CTASection";
import { MECHANIC_SERVICES } from "@/lib/services";

const WA_MESSAGE =
  "Hola, quiero información sobre sus servicios de mecánica y gomas.";

/**
 * NOTA PARA FRANCISCO: las cifras de esta franja son placeholders razonables.
 * Reemplázalas con los datos reales del taller (años, vehículos atendidos, etc.).
 */
const STATS: Stat[] = [
  { icon: Award, value: 10, suffix: "+", label: "Años de experiencia" },
  { icon: Car, value: 5000, suffix: "+", label: "Vehículos atendidos" },
  { icon: Wrench, value: 10, suffix: "", label: "Servicios disponibles" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Trabajo garantizado" },
];

/**
 * Vista cliente de /servicios. Es cliente para que los datos con iconos de
 * lucide se pasen client→client (sin cruzar la frontera de serialización RSC).
 * La metadata SEO vive en el server component page.tsx.
 */
export function ServiciosView() {
  return (
    <>
      <SectionHero
        eyebrow="F&I WASH · Servicios"
        breadcrumbLabel="Servicios"
        title="Mecánica y"
        highlight="Gomas"
        subtitle="Servicio automotriz integral en Santiago: expertos en neumáticos, balanceo, frenos y mantenimiento con el respaldo de Liqui Moly. Tu carro, en manos que saben."
        accent="red"
        waMessage={WA_MESSAGE}
      />

      <ServicesGrid
        eyebrow="Todo bajo un mismo techo"
        title="Nuestros 10 servicios"
        subtitle="Desde tus gomas hasta el tren delantero, cubrimos cada detalle con precisión y honestidad."
        services={MECHANIC_SERVICES}
        accent="red"
      />

      <ServicesPromo />

      <StatsBand
        eyebrow="¿Por qué elegirnos?"
        title="Confianza técnica que se nota"
        subtitle="Trabajo garantizado, diagnóstico honesto y repuestos de calidad en cada servicio."
        stats={STATS}
        accent="red"
      />

      <CTASection
        title="¿Necesitas servicio para tu vehículo?"
        subtitle="Escríbenos y te cotizamos al momento. Agenda tu cita y déjanos tu carro en las mejores manos de Santiago."
        waMessage={WA_MESSAGE}
        accent="red"
      />
    </>
  );
}
