"use client";

import { motion } from "framer-motion";
import { wordReveal, inViewport } from "@/lib/motion";

/**
 * Revela un título palabra por palabra con blur-in + fade-up al entrar en viewport.
 * Accesible: el texto completo queda como aria-label; las palabras animadas van
 * marcadas aria-hidden para que el lector de pantalla lea la frase de una vez.
 */
export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
}) {
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };

  return (
    <MotionTag
      className={className}
      aria-label={text}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={inViewport}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          variants={wordReveal}
          className="inline-block"
          style={{ marginRight: i < words.length - 1 ? "0.25em" : 0 }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
