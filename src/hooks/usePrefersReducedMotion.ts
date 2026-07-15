"use client";

import { useEffect, useState } from "react";

/**
 * Devuelve true si el usuario pidió reducir el movimiento (accesibilidad).
 * Todos los efectos JS pesados (cursor, partículas, tilt, smooth scroll)
 * deben apagarse o atenuarse cuando esto es true.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Detecta punteros finos (mouse). Los efectos de cursor solo aplican aquí. */
export function useHasPointer(): boolean {
  const [hasPointer, setHasPointer] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setHasPointer(mq.matches);
    const onChange = () => setHasPointer(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return hasPointer;
}
