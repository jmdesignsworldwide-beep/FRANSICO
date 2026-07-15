"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { SITE } from "@/lib/site";

type Accent = "red" | "velocity";

/**
 * Bloque de cierre reutilizable con CTA fuerte.
 * WhatsApp grande + botón secundario a /contacto.
 */
export function CTASection({
  title,
  subtitle,
  waMessage,
  accent = "red",
}: {
  title: string;
  subtitle: string;
  waMessage?: string;
  accent?: Accent;
}) {
  const isRed = accent === "red";
  return (
    <section className="container-page py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-carbon-700/60 px-6 py-14 text-center backdrop-blur-sm sm:px-12 sm:py-20"
      >
        <BorderBeam
          duration={10}
          colorFrom={isRed ? "#E30613" : "#6B2FB3"}
          colorTo={isRed ? "#FF2436" : "#F2B441"}
        />
        {/* glow de fondo */}
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full blur-[100px] ${
            isRed ? "bg-fi-red/20" : "bg-velocity/20"
          }`}
        />

        <h2 className="relative mx-auto max-w-2xl font-display text-4xl leading-tight tracking-tight sm:text-6xl">
          {title}
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-balance text-silver-muted sm:text-lg">
          {subtitle}
        </p>

        <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppButton size="lg" message={waMessage} accent={accent}>
            Escríbenos por WhatsApp
          </WhatsAppButton>
          <CTAButton
            href="/contacto"
            variant="outline"
            size="lg"
            icon={<ArrowRight size={18} />}
          >
            Ver contacto y ubicación
          </CTAButton>
        </div>

        <p className="relative mt-8 inline-flex items-center gap-2 text-sm text-silver-muted">
          <MapPin size={15} className={isRed ? "text-fi-red" : "text-velocity-glow"} />
          {SITE.address.short}
        </p>
      </motion.div>
    </section>
  );
}
