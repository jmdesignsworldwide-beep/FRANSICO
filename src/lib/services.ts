/**
 * Catálogo de servicios (datos reales del negocio, consolidados sin duplicados).
 * Los iconos son referencias a lucide-react (se resuelven en el componente).
 */
import type { LucideIcon } from "lucide-react";
import {
  CircleDot,
  CircleDashed,
  Gauge,
  RefreshCw,
  Radar,
  Wind,
  Droplets,
  Droplet,
  Disc3,
  Disc2,
  Wrench,
  Hammer,
  Crosshair,
  Cog,
  BatteryCharging,
  GlassWater,
  Package,
  FlaskConical,
  Snowflake,
  ShoppingBag,
  Leaf,
  Zap,
  Sparkles,
  Wand2,
  Car,
  SprayCan,
  Armchair,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Mecánica Automotriz — F&I WASH. */
export const MECHANIC_SERVICES: Service[] = [
  {
    title: "Cambio de aceite y fluidos",
    description:
      "Aceites y fluidos de alta gama con el intervalo exacto para tu motor.",
    icon: Droplets,
  },
  {
    title: "Mecánica básica",
    description: "Diagnóstico y mantenimiento general para que ruedes tranquilo.",
    icon: Wrench,
  },
  {
    title: "Alineación",
    description:
      "Alineación de precisión que cuida tus gomas y mejora el manejo.",
    icon: Crosshair,
  },
  {
    title: "Tren delantero",
    description:
      "Suspensión y dirección revisadas para eliminar vibraciones y ruidos.",
    icon: Cog,
  },
  {
    title: "Servicio de frenos",
    description:
      "Pastillas, discos y sistema completo para que frenes con total confianza.",
    icon: Disc3,
  },
  {
    title: "Sensores TPMS",
    description:
      "Diagnóstico, programación y reemplazo de sensores de presión de gomas.",
    icon: Radar,
  },
  {
    title: "Llenado con nitrógeno",
    description:
      "Inflado con nitrógeno para presión estable y mejor rendimiento.",
    icon: Wind,
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
      "Reparación de picaduras y grietas en el parabrisas antes de que crezcan.",
    icon: GlassWater,
  },
];

/** Gomas & Aros — F&I WASH. */
export const TIRES_SERVICES: Service[] = [
  {
    title: "Gomas nuevas",
    description:
      "Neumáticos nuevos de las mejores marcas para cada tipo de vehículo.",
    icon: CircleDot,
  },
  {
    title: "Gomas usadas",
    description: "Gomas usadas en buen estado, revisadas y a buen precio.",
    icon: CircleDashed,
  },
  {
    title: "Montura y balanceo",
    description:
      "Montaje profesional y balanceo de precisión para un manejo suave.",
    icon: Gauge,
  },
  {
    title: "Rotación",
    description:
      "Rotación de neumáticos que maximiza la vida útil y el desgaste uniforme.",
    icon: RefreshCw,
  },
  {
    title: "Reparación de aros",
    description: "Reparamos aros golpeados o dañados para devolverles la forma.",
    icon: Hammer,
  },
  {
    title: "Rectificación de aros",
    description:
      "Rectificado que corrige deformaciones y elimina vibraciones al rodar.",
    icon: Disc2,
  },
  {
    title: "Piezas",
    description: "Piezas y repuestos para gomas y aros cuando los necesites.",
    icon: Package,
  },
];

/** Auto Adorno / Accesorios — F&I WASH. */
export const ACCESSORIES_SERVICES: Service[] = [
  {
    title: "Lubricantes",
    description: "Lubricantes de calidad para cada componente de tu vehículo.",
    icon: Droplet,
  },
  {
    title: "Aceites",
    description: "Amplia gama de aceites para motor y transmisión.",
    icon: FlaskConical,
  },
  {
    title: "Coolant",
    description: "Refrigerante para mantener tu motor a la temperatura ideal.",
    icon: Snowflake,
  },
  {
    title: "Accesorios",
    description: "Accesorios para equipar y personalizar tu carro.",
    icon: ShoppingBag,
  },
  {
    title: "Aromatizantes",
    description: "Aromatizantes para que tu vehículo huela siempre a nuevo.",
    icon: Leaf,
  },
];

/** Detailing y Lavado — Velocity Wash. */
export const DETAILING_SERVICES: Service[] = [
  {
    title: "Lavado express",
    description: "Limpieza rápida y efectiva: entras, te relajas y sales impecable.",
    icon: Zap,
  },
  {
    title: "Lavado premium",
    description:
      "Lavado detallado de nivel superior para un acabado impecable.",
    icon: Sparkles,
  },
  {
    title: "Lavado y encerado",
    description:
      "Lavado con encerado que protege la pintura y da brillo espejo.",
    icon: Wand2,
  },
  {
    title: "Lavado de chasis",
    description: "Limpieza de los bajos del vehículo para quitar barro y sales.",
    icon: Car,
  },
  {
    title: "Lavado de motor",
    description:
      "Limpieza del compartimento del motor con productos seguros.",
    icon: Cog,
  },
  {
    title: "Detallado exterior",
    description:
      "Descontaminación y realce de la pintura para un exterior como nuevo.",
    icon: SprayCan,
  },
  {
    title: "Detallado interior",
    description:
      "Detallado profundo de asientos, alfombras, plásticos y ventilación.",
    icon: Armchair,
  },
  {
    title: "Limpieza de llantas y rines",
    description: "Llantas y rines libres de suciedad, con brillo y protección.",
    icon: Disc3,
  },
];
