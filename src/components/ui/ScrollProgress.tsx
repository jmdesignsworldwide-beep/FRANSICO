"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra fina de progreso de scroll, fija arriba.
 * Usa scaleX (transform) para 60fps; con suavizado de spring.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-fi-red via-velocity-glow to-gold"
    />
  );
}
