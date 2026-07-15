"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion, useHasPointer } from "./usePrefersReducedMotion";

/**
 * Hook reutilizable para tilt 3D siguiendo el cursor dentro de un elemento.
 * Devuelve el ref, los estilos de transform y los handlers.
 * Se apaga en touch y con prefers-reduced-motion.
 */
export function useTilt(max = 8) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const hasPointer = useHasPointer();
  const enabled = !reduced && hasPointer;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  };

  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return {
    ref,
    enabled,
    handlers: { onMouseMove, onMouseLeave },
    style: enabled
      ? { rotateX: srx, rotateY: sry, transformPerspective: 900 }
      : undefined,
  };
}
