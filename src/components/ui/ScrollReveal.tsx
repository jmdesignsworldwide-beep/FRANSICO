"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Retraso en segundos (para escalonar elementos). */
  delay?: number;
  /** Dirección de entrada. */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Etiqueta HTML a renderizar. */
  as?: "div" | "section" | "li" | "article" | "span";
};

const OFFSET = 28;

/**
 * Envuelve contenido para que aparezca con un reveal suave al entrar en viewport.
 * Respeta prefers-reduced-motion automáticamente (Framer lo maneja vía CSS reset global).
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
}: ScrollRevealProps) {
  const initialOffset = {
    up: { y: OFFSET },
    down: { y: -OFFSET },
    left: { x: OFFSET },
    right: { x: -OFFSET },
    none: {},
  }[direction];

  const variants: Variants = {
    hidden: { opacity: 0, ...initialOffset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Contenedor que escalona (stagger) la aparición de sus hijos directos
 * envueltos en <StaggerItem>.
 */
export function StaggerReveal({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const initialOffset = {
    up: { y: OFFSET },
    down: { y: -OFFSET },
    left: { x: OFFSET },
    right: { x: -OFFSET },
  }[direction];

  const item: Variants = {
    hidden: { opacity: 0, ...initialOffset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
