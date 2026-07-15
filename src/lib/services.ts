/**
 * Catálogo de servicios de ambas divisiones.
 * Los iconos son referencias a lucide-react (se resuelven en el componente).
 */
import type { LucideIcon } from "lucide-react";
import {
  CircleDot,
  Gauge,
  RefreshCw,
  Radar,
  Wind,
  Droplets,
  Disc3,
  Wrench,
  BatteryCharging,
  GlassWater,
  Armchair,
  Sofa,
  SprayCan,
  Atom,
  Hand,
  Eraser,
  Lightbulb,
  Shield,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Mecánica y Gomas — F&I WASH (10 servicios). */
export const MECHANIC_SERVICES: Service[] = [
  {
    title: "Venta de neumáticos",
    description:
      "Gomas nuevas de las mejores marcas para cada tipo de vehículo, con asesoría experta.",
    icon: CircleDot,
  },
  {
    title: "Montura y balanceo",
    description:
      "Montaje profesional y balanceo de precisión para una conducción suave y segura.",
    icon: Gauge,
  },
  {
    title: "Rotación",
    description:
      "Rotación de neumáticos que maximiza la vida útil y el desgaste uniforme.",
    icon: RefreshCw,
  },
  {
    title: "Sensores TPMS",
    description:
      "Diagnóstico, programación y reemplazo de sensores de presión de tus gomas.",
    icon: Radar,
  },
  {
    title: "Llenado con nitrógeno",
    description:
      "Inflado con nitrógeno para presión estable, menor desgaste y mejor rendimiento.",
    icon: Wind,
  },
  {
    title: "Cambio de aceite y fluidos",
    description:
      "Aceites y fluidos Liqui Moly de alta gama con el intervalo exacto para tu motor.",
    icon: Droplets,
  },
  {
    title: "Servicio de frenos",
    description:
      "Pastillas, discos y sistema completo revisados para que frenes con total confianza.",
    icon: Disc3,
  },
  {
    title: "Mecánica tren delantero",
    description:
      "Suspensión, dirección y alineación para eliminar vibraciones y ruidos.",
    icon: Wrench,
  },
  {
    title: "Venta de baterías",
    description:
      "Baterías nuevas con instalación al momento y prueba de carga incluida.",
    icon: BatteryCharging,
  },
  {
    title: "Reparación de cristales",
    description:
      "Reparación de picaduras y grietas en el parabrisas antes de que se propaguen.",
    icon: GlassWater,
  },
];

/** Detailing y Lavado — Velocity Wash (8 servicios). */
export const DETAILING_SERVICES: Service[] = [
  {
    title: "Mantenimiento de leather",
    description:
      "Limpieza e hidratación profunda de cuero para que luzca y se sienta como nuevo.",
    icon: Armchair,
  },
  {
    title: "Lavado de interior",
    description:
      "Detallado interior completo: asientos, alfombras, plásticos y ventilación.",
    icon: Sofa,
  },
  {
    title: "Revitalización de pintura",
    description:
      "Descontaminación y realce del color para devolverle el brillo de fábrica.",
    icon: SprayCan,
  },
  {
    title: "Tratamiento de ozono",
    description:
      "Eliminación de olores y bacterias del habitáculo con tecnología de ozono.",
    icon: Atom,
  },
  {
    title: "Lavado y encerado a mano",
    description:
      "Lavado manual detallado y encerado que protege y da brillo espejo.",
    icon: Hand,
  },
  {
    title: "Corrección de rayaduras",
    description:
      "Pulido por capas que elimina micro-rayaduras y marcas de remolino.",
    icon: Eraser,
  },
  {
    title: "Brillado de pantalla (faros)",
    description:
      "Restauración de faros opacos o amarillentos para más luz y mejor estética.",
    icon: Lightbulb,
  },
  {
    title: "Aplicado de cerámica",
    description:
      "Recubrimiento cerámico que sella la pintura con protección de larga duración.",
    icon: Shield,
  },
];
