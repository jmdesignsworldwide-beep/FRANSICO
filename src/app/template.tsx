"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * template.tsx se re-monta en CADA navegación (a diferencia de layout.tsx),
 * por lo que es el lugar ideal para la transición de entrada de página.
 * El botón atrás/adelante del navegador sigue funcionando normalmente porque
 * usamos <Link> y no interceptamos la navegación.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
