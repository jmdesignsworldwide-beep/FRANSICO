"use client";

import { Sparkles, Car, ShieldCheck, Droplets } from "lucide-react";
import { SectionHero } from "@/components/sections/SectionHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { DetailingPromo } from "@/components/sections/DetailingPromo";
import { StatsBand, type Stat } from "@/components/sections/StatsBand";
import { CTASection } from "@/components/sections/CTASection";
import { DETAILING_SERVICES } from "@/lib/services";
import { HERO_IMAGES } from "@/lib/heroImages";

const WA_MESSAGE =
  "Hola, quiero agendar un servicio de detailing / lavado para mi vehículo.";

/**
 * NOTA PARA FRANCISCO: las cifras de esta franja son placeholders razonables.
 * Reemplázalas con los datos reales de Velocity Wash (autos detallados, años, etc.).
 */
const STATS: Stat[] = [
  { icon: Car, value: 3000, suffix: "+", label: "Autos lavados y detallados" },
  { icon: Sparkles, value: 8, suffix: "", label: "Servicios de lavado" },
  { icon: Droplets, value: 100, suffix: "%", label: "Acabado a mano" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Cuidado garantizado" },
];

/**
 * Vista cliente de /detailing (Velocity Wash). Es cliente para pasar los datos
 * con iconos de lucide client→client (sin cruzar la frontera RSC). La metadata
 * SEO vive en el server component page.tsx.
 * Acento AZUL + dorado (identidad real de Velocity Wash), hermano de /servicios (rojo).
 */
export function DetailingView() {
  return (
    <>
      <SectionHero
        eyebrow="Velocity Wash · Especialista en detallado"
        breadcrumbLabel="Detailing"
        variant="wash"
        title="Tu auto"
        highlight="como nuevo"
        subtitle="Nuestro lavado exprés hace que la limpieza del coche sea fácil: conduce dentro, relájate y sal con un coche impecable. Cuidado profesional y brillo de alta gama en Santiago."
        accent="blue"
        waMessage={WA_MESSAGE}
        image={HERO_IMAGES.detailing}
      />

      <ServicesGrid
        eyebrow="Brillo de principio a fin"
        title="Lavado y detallado"
        subtitle="Del lavado express al detallado profundo: acabado impecable con productos premium y manos expertas."
        services={DETAILING_SERVICES}
        accent="blue"
      />

      <DetailingPromo />

      <StatsBand
        eyebrow="¿Por qué nuestro detailing?"
        title="Acabado que se siente premium"
        subtitle="Productos de alta gama, técnica profesional y protección que dura. Cada auto sale como recién estrenado."
        stats={STATS}
        accent="blue"
      />

      <CTASection
        title="¿Listo para devolverle el brillo a tu auto?"
        subtitle="Agenda tu detailing o lavado con Velocity Wash y deja que tu vehículo luzca como el primer día."
        waMessage={WA_MESSAGE}
        accent="blue"
      />
    </>
  );
}
