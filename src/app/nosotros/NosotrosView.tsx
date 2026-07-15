"use client";

import { Award, Car, Wrench, Smile } from "lucide-react";
import { SectionHero } from "@/components/sections/SectionHero";
import { AboutStory } from "@/components/sections/AboutStory";
import { Divisions } from "@/components/sections/Divisions";
import { Values } from "@/components/sections/Values";
import { StatsBand, type Stat } from "@/components/sections/StatsBand";
import { Alliances } from "@/components/sections/Alliances";
import { LocationTeaser } from "@/components/sections/LocationTeaser";
import { CTASection } from "@/components/sections/CTASection";

const WA_MESSAGE = "Hola, quiero más información sobre F&I WASH";

/**
 * NOTA PARA FRANCISCO: las cifras son placeholders razonables.
 * Reemplázalas con los datos reales (años, vehículos, clientes, etc.).
 */
const STATS: Stat[] = [
  { icon: Award, value: 10, suffix: "+", label: "Años de experiencia" },
  { icon: Car, value: 5000, suffix: "+", label: "Vehículos atendidos" },
  { icon: Wrench, value: 18, suffix: "", label: "Servicios disponibles" },
  { icon: Smile, value: 100, suffix: "%", label: "Enfoque en el cliente" },
];

/**
 * Vista cliente de /nosotros. Cliente para pasar iconos lucide client→client
 * (sin cruzar la frontera RSC). La metadata SEO vive en page.tsx (server).
 * Hereda todo el módulo maestro de animaciones vía los componentes compartidos.
 */
export function NosotrosView() {
  return (
    <>
      <SectionHero
        eyebrow="F&I WASH · Sobre Nosotros"
        breadcrumbLabel="Nosotros"
        title="Más que un taller,"
        highlight="tu aliado"
        subtitle="Somos el centro automotriz integral de Santiago: mecánica, gomas y detailing premium bajo un mismo techo, con la confianza y el respaldo que tu vehículo merece."
        accent="red"
        waMessage={WA_MESSAGE}
        secondaryHref="/contacto"
        secondaryLabel="Contáctanos"
      />

      <AboutStory />

      <Divisions />

      <Values />

      <StatsBand
        eyebrow="En números"
        title="Trayectoria que respalda"
        subtitle="Cifras que reflejan nuestro compromiso con cada vehículo que pasa por nuestras manos."
        stats={STATS}
        accent="red"
      />

      <Alliances />

      <LocationTeaser />

      <CTASection
        title="¿Conversamos sobre tu vehículo?"
        subtitle="Cuéntanos qué necesita tu carro y te asesoramos sin compromiso. Estamos en Santiago, listos para atenderte."
        waMessage={WA_MESSAGE}
        accent="red"
      />
    </>
  );
}
