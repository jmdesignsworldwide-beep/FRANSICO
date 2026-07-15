"use client";

import { motion } from "framer-motion";
import { Construction, ArrowLeft } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type Accent = "red" | "blue";

/**
 * Encabezado de página reutilizable para las rutas que aún se construyen
 * en la próxima tanda. Mantiene el navbar funcionando end-to-end y luce
 * premium en vez de una página en blanco.
 */
export function PageStub({
  eyebrow,
  title,
  description,
  accent = "red",
}: {
  eyebrow: string;
  title: string;
  description: string;
  accent?: Accent;
}) {
  const isRed = accent === "red";
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-fade [background-size:100%_100%,44px_44px,44px_44px] mask-fade-edges" />
        <div
          className={`absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full blur-[110px] ${
            isRed ? "bg-fi-red/15" : "bg-velocity/15"
          }`}
        />
      </div>

      <div className="container-page flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className={`eyebrow justify-center ${
              isRed ? "text-fi-red" : "text-velocity-glow"
            }`}
          >
            <span
              className={`h-px w-8 ${isRed ? "bg-fi-red" : "bg-velocity-glow"}`}
            />
            {eyebrow}
          </span>

          <h1 className="mt-5 font-display text-5xl tracking-tight sm:text-7xl">
            {title}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-silver-muted">
            {description}
          </p>

          <div className="glass mx-auto mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-silver">
            <Construction
              size={15}
              className={isRed ? "text-fi-red" : "text-velocity-glow"}
            />
            Contenido completo en camino
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton
              size="lg"
              message="Hola F&I WASH, quisiera más información."
            >
              Escríbenos por WhatsApp
            </WhatsAppButton>
            <CTAButton
              href="/"
              variant="outline"
              size="lg"
              icon={<ArrowLeft size={18} />}
            >
              Volver al inicio
            </CTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
