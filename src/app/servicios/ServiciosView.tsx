"use client";

import { Award, Car, Wrench, ShieldCheck } from "lucide-react";
import { SectionHero } from "@/components/sections/SectionHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ServicesPromo } from "@/components/sections/ServicesPromo";
import { StatsBand, type Stat } from "@/components/sections/StatsBand";
import { CTASection } from "@/components/sections/CTASection";
import {
  MECHANIC_SERVICES,
  TIRES_SERVICES,
  ACCESSORIES_SERVICES,
} from "@/lib/services";
import { HERO_IMAGES } from "@/lib/heroImages";

const WA_MESSAGE =
  "Hola, quiero información sobre sus servicios de mecánica, gomas y accesorios.";

const TOTAL_SERVICES =
  MECHANIC_SERVICES.length + TIRES_SERVICES.length + ACCESSORIES_SERVICES.length;

/**
 * NOTA PARA FRANCISCO: las cifras de esta franja son placeholders razonables.
 * Reemplázalas con los datos reales del taller (años, vehículos atendidos, etc.).
 */
const STATS: Stat[] = [
  { icon: Award, value: 10, suffix: "+", label: "Años de experiencia" },
  { icon: Car, value: 5000, suffix: "+", label: "Vehículos atendidos" },
  { icon: Wrench, value: TOTAL_SERVICES, suffix: "", label: "Servicios disponibles" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Trabajo garantizado" },
];

/**
 * Vista cliente de /servicios (F&I WASH). Organiza los servicios reales en
 * tres bloques: Mecánica Automotriz, Gomas & Aros y Auto Adorno / Accesorios.
 */
export function ServiciosView() {
  return (
    <>
      <SectionHero
        eyebrow="F&I WASH · Servicios"
        breadcrumbLabel="Servicios"
        variant="mechanics"
        title="Todo para tu"
        highlight="vehículo"
        subtitle="Mecánica, gomas y accesorios en un solo lugar. Servicio automotriz integral en Santiago con el respaldo de Liqui Moly. Tu carro, en manos que saben."
        accent="red"
        waMessage={WA_MESSAGE}
        image={HERO_IMAGES.servicios}
      />

      <ServicesGrid
        eyebrow="Mecánica Automotriz"
        title="Mecánica y mantenimiento"
        subtitle="Del cambio de aceite al tren delantero: cubrimos cada detalle con precisión y honestidad."
        services={MECHANIC_SERVICES}
        accent="red"
      />

      <ServicesGrid
        eyebrow="Gomas & Aros"
        title="Gomas, aros y balanceo"
        subtitle="Gomas nuevas y usadas, montura, balanceo, reparación y rectificación de aros."
        services={TIRES_SERVICES}
        accent="red"
      />

      <ServicesGrid
        eyebrow="Auto Adorno & Accesorios"
        title="Todo para equipar tu carro"
        subtitle="Lubricantes, aceites, coolant, accesorios y aromatizantes de calidad."
        services={ACCESSORIES_SERVICES}
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
