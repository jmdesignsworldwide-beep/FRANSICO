/**
 * Catálogo de servicios (datos reales del negocio, consolidados sin duplicados).
 * Los iconos son referencias a lucide-react (se resuelven en el componente).
 * `key` es un identificador estable usado para asociar fotos (portal admin + web).
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
  /** Identificador estable (no cambiar: enlaza las fotos del admin). */
  key: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Mecánica Automotriz — F&I WASH. */
export const MECHANIC_SERVICES: Service[] = [
  {
    key: "cambio_aceite",
    title: "Cambio de aceite y fluidos",
    description:
      "Aceites y fluidos de alta gama con el intervalo exacto para tu motor.",
    icon: Droplets,
  },
  {
    key: "mecanica_basica",
    title: "Mecánica básica",
    description: "Diagnóstico y mantenimiento general para que ruedes tranquilo.",
    icon: Wrench,
  },
  {
    key: "alineacion",
    title: "Alineación",
    description:
      "Alineación de precisión que cuida tus gomas y mejora el manejo.",
    icon: Crosshair,
  },
  {
    key: "tren_delantero",
    title: "Tren delantero",
    description:
      "Suspensión y dirección revisadas para eliminar vibraciones y ruidos.",
    icon: Cog,
  },
  {
    key: "frenos",
    title: "Servicio de frenos",
    description:
      "Pastillas, discos y sistema completo para que frenes con total confianza.",
    icon: Disc3,
  },
  {
    key: "sensores_tpms",
    title: "Sensores TPMS",
    description:
      "Diagnóstico, programación y reemplazo de sensores de presión de gomas.",
    icon: Radar,
  },
  {
    key: "nitrogeno",
    title: "Llenado con nitrógeno",
    description:
      "Inflado con nitrógeno para presión estable y mejor rendimiento.",
    icon: Wind,
  },
  {
    key: "baterias",
    title: "Venta de baterías",
    description:
      "Baterías nuevas con instalación al momento y prueba de carga incluida.",
    icon: BatteryCharging,
  },
  {
    key: "cristales",
    title: "Reparación de cristales",
    description:
      "Reparación de picaduras y grietas en el parabrisas antes de que crezcan.",
    icon: GlassWater,
  },
];

/** Gomas & Aros — F&I WASH. */
export const TIRES_SERVICES: Service[] = [
  {
    key: "gomas_nuevas",
    title: "Gomas nuevas",
    description:
      "Neumáticos nuevos de las mejores marcas para cada tipo de vehículo.",
    icon: CircleDot,
  },
  {
    key: "gomas_usadas",
    title: "Gomas usadas",
    description: "Gomas usadas en buen estado, revisadas y a buen precio.",
    icon: CircleDashed,
  },
  {
    key: "montura_balanceo",
    title: "Montura y balanceo",
    description:
      "Montaje profesional y balanceo de precisión para un manejo suave.",
    icon: Gauge,
  },
  {
    key: "rotacion",
    title: "Rotación",
    description:
      "Rotación de neumáticos que maximiza la vida útil y el desgaste uniforme.",
    icon: RefreshCw,
  },
  {
    key: "reparacion_aros",
    title: "Reparación de aros",
    description: "Reparamos aros golpeados o dañados para devolverles la forma.",
    icon: Hammer,
  },
  {
    key: "rectificacion_aros",
    title: "Rectificación de aros",
    description:
      "Rectificado que corrige deformaciones y elimina vibraciones al rodar.",
    icon: Disc2,
  },
  {
    key: "piezas",
    title: "Piezas",
    description: "Piezas y repuestos para gomas y aros cuando los necesites.",
    icon: Package,
  },
];

/** Auto Adorno / Accesorios — F&I WASH. */
export const ACCESSORIES_SERVICES: Service[] = [
  {
    key: "lubricantes",
    title: "Lubricantes",
    description: "Lubricantes de calidad para cada componente de tu vehículo.",
    icon: Droplet,
  },
  {
    key: "aceites",
    title: "Aceites",
    description: "Amplia gama de aceites para motor y transmisión.",
    icon: FlaskConical,
  },
  {
    key: "coolant",
    title: "Coolant",
    description: "Refrigerante para mantener tu motor a la temperatura ideal.",
    icon: Snowflake,
  },
  {
    key: "accesorios",
    title: "Accesorios",
    description: "Accesorios para equipar y personalizar tu carro.",
    icon: ShoppingBag,
  },
  {
    key: "aromatizantes",
    title: "Aromatizantes",
    description: "Aromatizantes para que tu vehículo huela siempre a nuevo.",
    icon: Leaf,
  },
];

/** Detailing y Lavado — Velocity Wash. */
export const DETAILING_SERVICES: Service[] = [
  {
    key: "lavado_express",
    title: "Lavado express",
    description: "Limpieza rápida y efectiva: entras, te relajas y sales impecable.",
    icon: Zap,
  },
  {
    key: "lavado_premium",
    title: "Lavado premium",
    description:
      "Lavado detallado de nivel superior para un acabado impecable.",
    icon: Sparkles,
  },
  {
    key: "lavado_encerado",
    title: "Lavado y encerado",
    description:
      "Lavado con encerado que protege la pintura y da brillo espejo.",
    icon: Wand2,
  },
  {
    key: "lavado_chasis",
    title: "Lavado de chasis",
    description: "Limpieza de los bajos del vehículo para quitar barro y sales.",
    icon: Car,
  },
  {
    key: "lavado_motor",
    title: "Lavado de motor",
    description:
      "Limpieza del compartimento del motor con productos seguros.",
    icon: Cog,
  },
  {
    key: "detallado_exterior",
    title: "Detallado exterior",
    description:
      "Descontaminación y realce de la pintura para un exterior como nuevo.",
    icon: SprayCan,
  },
  {
    key: "detallado_interior",
    title: "Detallado interior",
    description:
      "Detallado profundo de asientos, alfombras, plásticos y ventilación.",
    icon: Armchair,
  },
  {
    key: "llantas_rines",
    title: "Limpieza de llantas y rines",
    description: "Llantas y rines libres de suciedad, con brillo y protección.",
    icon: Disc3,
  },
];

/** Grupos de servicios para el portal admin (todos, organizados por división). */
export const SERVICE_GROUPS: {
  label: string;
  division: "fi" | "velocity";
  services: Service[];
}[] = [
  { label: "Mecánica Automotriz", division: "fi", services: MECHANIC_SERVICES },
  { label: "Gomas & Aros", division: "fi", services: TIRES_SERVICES },
  { label: "Auto Adorno / Accesorios", division: "fi", services: ACCESSORIES_SERVICES },
  { label: "Detailing y Lavado (Velocity Wash)", division: "velocity", services: DETAILING_SERVICES },
];

/** Todas las claves válidas de servicio (para validar en el servidor). */
export const ALL_SERVICE_KEYS: readonly string[] = SERVICE_GROUPS.flatMap((g) =>
  g.services.map((s) => s.key),
);

/** Busca el título legible de un servicio por su clave. */
export function serviceLabel(key: string): string {
  for (const g of SERVICE_GROUPS) {
    const s = g.services.find((x) => x.key === key);
    if (s) return s.title;
  }
  return key;
}
