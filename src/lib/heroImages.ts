import type { HeroImage } from "@/components/heroes/ThemedHero";

/**
 * Imágenes de fondo de los heroes.
 *
 * CÓMO ACTIVAR (Marien elige la foto por página):
 *  1) Opción A — foto en el repo (recomendado): coloca el archivo optimizado en
 *     /public/images/heroes/<pagina>.webp y pon:
 *         home: { src: "/images/heroes/home.webp", alt: "...", priority: true }
 *  2) Opción B — URL remota (Unsplash/Pexels): pega la URL directa (con
 *     ?w=2400&q=80&fm=webp) — los dominios ya están permitidos en next.config + CSP:
 *         detailing: { src: "https://images.unsplash.com/photo-XXXX?w=2400&q=80&fm=webp", alt: "..." }
 *
 * Mientras estén en `undefined`, cada hero muestra solo su escena animada (como ahora).
 * `position` permite art direction (p. ej. "50% 35%" para enfocar el sujeto en móvil).
 */
export const HERO_IMAGES: Record<
  "home" | "servicios" | "detailing" | "nosotros" | "contacto",
  HeroImage | undefined
> = {
  home: undefined,
  servicios: undefined,
  detailing: undefined,
  nosotros: undefined,
  contacto: undefined,
};
