/**
 * Fuente única de verdad para los datos del negocio.
 * Cualquier teléfono, dirección o enlace debe leerse desde aquí para evitar
 * inconsistencias y botones muertos.
 */

export const SITE = {
  name: "F&I WASH Auto Services",
  shortName: "F&I WASH",
  detailingBrand: "Velocity Wash",
  tagline: "Todo para tu vehículo en un solo lugar",
  description:
    "Centro automotriz premium en Santiago, RD. Mecánica, gomas, aros y accesorios (F&I WASH) + detailing y lavado profesional (Velocity Wash). Distribuidor autorizado Liqui Moly.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fiwash.com.do",

  address: {
    line1: "Av. Estrella Sadhalá No. 58",
    line2: "Frente al Politécnico La Esperanza, Entrada Cerro Alto",
    city: "Santiago de los Caballeros",
    country: "República Dominicana",
    full: "Av. Estrella Sadhalá No. 58 (frente al Politécnico La Esperanza), Entrada Cerro Alto, Santiago, República Dominicana",
    short: "Av. Estrella Sadhalá No. 58, Santiago, RD",
  },

  phones: [
    { display: "809-443-9750", tel: "+18094439750" },
    { display: "809-735-8398", tel: "+18097358398" },
  ],

  // WhatsApp principal
  whatsapp: {
    number: "18094439750",
    display: "809-443-9750",
    link: "https://wa.me/18094439750",
  },

  // Enlace de mapa embebido (Google Maps) y enlace directo para abrir en la app
  maps: {
    embed:
      "https://www.google.com/maps?q=Av.+Estrella+Sadhal%C3%A1+58,+Santiago,+Rep%C3%BAblica+Dominicana&output=embed",
    link: "https://maps.google.com/?q=Av.+Estrella+Sadhal%C3%A1+58,+Santiago,+Rep%C3%BAblica+Dominicana",
  },

  hours: [
    { day: "Lunes – Viernes", time: "8:00 AM – 6:00 PM" },
    { day: "Sábado", time: "8:00 AM – 4:00 PM" },
    { day: "Domingo", time: "Cerrado" },
  ],

  social: {
    instagram: "https://instagram.com/fyiwashrd",
    instagramHandle: "@fyiwashrd",
  },

  partners: [
    {
      name: "Liqui Moly",
      role: "Distribuidor Autorizado",
    },
    {
      name: "Multimodal Xpress",
      role: "Courier aliado",
    },
  ],

  developer: {
    name: "JM Nexus Designs",
    email: "jm.nexus.designs@gmail.com",
    instagram: "https://instagram.com/jm.nexus.designs",
    instagramHandle: "@jm.nexus.designs",
    whatsapp: "https://wa.me/18494421919",
    whatsappDisplay: "849-442-1919",
  },
} as const;

/** Genera un enlace de WhatsApp con mensaje pre-cargado. */
export function waLink(message?: string): string {
  const base = SITE.whatsapp.link;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Rutas de navegación (usadas por Navbar + Footer + sitemap). */
export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/detailing", label: "Detailing" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;
