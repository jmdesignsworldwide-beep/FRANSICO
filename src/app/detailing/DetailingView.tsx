"use client";

import { Sparkles, Car, ShieldCheck, Droplets } from "lucide-react";
import { SectionHero } from "@/components/sections/SectionHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { DetailingPromo } from "@/components/sections/DetailingPromo";
import { StatsBand, type Stat } from "@/components/sections/StatsBand";
import { CTASection } from "@/components/sections/CTASection";
import { DETAILING_SERVICES } from "@/lib/services";

const WA_MESSAGE =
  "Hola, quiero agendar un servicio de detailing / lavado para mi vehículo.";

/**
 * NOTA PARA FRANCISCO: las cifras de esta franja son placeholders razonables.
 * Reemplázalas con los datos reales de Velocity Wash (autos detallados, años, etc.).
 */
const STATS: Stat[] = [
  { icon: Car, value: 3000, suffix: "+", label: "Autos detallados" },
  { icon: Sparkles, value: 8, suffix: "", label: "Servicios de detailing" },
  { icon: Droplets, value: 100, suffix: "%", label: "Acabado a mano" },
  { icon: ShieldCheck, value: 12, suffix: " meses", label: "Protección cerámica" },
];

/**
 * Vista cliente de /detailing (Velocity Wash). Es cliente para pasar los datos
 * con iconos de lucide client→client (sin cruzar la frontera RSC). La metadata
 * SEO vive en el server component page.tsx.
 * Acento morado + dorado, hermano visual de /servicios (rojo).
 */
export function DetailingView() {
  return (
    <>
      <SectionHero
        eyebrow="Velocity Wash · Detailing & Lavado"
        breadcrumbLabel="Detailing"
        title="Detailing y"
        highlight="Lavado"
        subtitle="Cuidado profesional, protección y brillo de alta gama para tu vehículo en Santiago. Velocity Wash: tu auto como nuevo, por dentro y por fuera."
        accent="velocity"
        waMessage={WA_MESSAGE}
      />

      <ServicesGrid
        eyebrow="Brillo de principio a fin"
        title="Nuestros 8 servicios"
        subtitle="Del cuero al último detalle de pintura: acabado impecable con productos premium y manos expertas."
        services={DETAILING_SERVICES}
        accent="velocity"
      />

      <DetailingPromo />

      <StatsBand
        eyebrow="¿Por qué nuestro detailing?"
        title="Acabado que se siente premium"
        subtitle="Productos de alta gama, técnica profesional y protección que dura. Cada auto sale como recién estrenado."
        stats={STATS}
        accent="velocity"
      />

      <CTASection
        title="¿Listo para devolverle el brillo a tu auto?"
        subtitle="Agenda tu detailing o lavado con Velocity Wash y deja que tu vehículo luzca como el primer día."
        waMessage={WA_MESSAGE}
        accent="velocity"
      />
    </>
  );
}
