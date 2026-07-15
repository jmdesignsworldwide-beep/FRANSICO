import type { Variants, Transition } from "framer-motion";

/**
 * Lenguaje de movimiento único del proyecto.
 * Mismos easings y duraciones base en todas las páginas; solo cambia el color
 * de acento. Importa estas variants en vez de redefinirlas por componente.
 */

/** Curva de easing estándar (suave, sin rebote). */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = {
  duration: 0.6,
  ease: EASE,
};

/** Aparición hacia arriba. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

/** Aparición con desenfoque (blur-in) para títulos con carácter. */
export const blurIn: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Contenedor que escalona a sus hijos. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Item para usar dentro de staggerContainer. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

/** Reveal de palabra/línea (para TextReveal). */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

/** Hover premium de card (elevación). Combinar con shine/tilt en el componente. */
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.3, ease: EASE } },
};

/** Viewport por defecto para whileInView (una sola vez, con margen). */
export const inViewport = { once: true, margin: "-80px" } as const;
