"use client";

import { motion } from "framer-motion";
import { BadgeCheck, CircleDot, Sparkles } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Franja diferenciadora de la página de Servicios:
 * respaldo Liqui Moly (distribuidor autorizado) + "¡Especial de Gomas!".
 * Combina border beam, pulse y marquee sin romper la estética.
 */
export function ServicesPromo() {
  return (
    <section aria-label="Especial de gomas y respaldo Liqui Moly" className="py-6">
      {/* Cinta marquee superior */}
      <div className="relative overflow-hidden border-y border-fi-red/25 bg-gradient-to-r from-fi-red/10 via-fi-red/20 to-fi-red/10 py-3">
        <Marquee>
          {["¡ESPECIAL DE GOMAS!", "MONTURA + BALANCEO", "DISTRIBUIDOR LIQUI MOLY", "NITRÓGENO DISPONIBLE"].map(
            (t, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2.5 whitespace-nowrap font-heading text-sm font-semibold uppercase tracking-widest text-offwhite"
              >
                <CircleDot size={16} className="text-fi-red" />
                {t}
                <span aria-hidden className="ml-6 text-fi-red/50">✦</span>
              </span>
            ),
          )}
        </Marquee>
      </div>

      {/* Tarjeta destacada */}
      <div className="container-page mt-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-carbon-700/60 p-8 backdrop-blur-sm sm:p-10"
        >
          <BorderBeam duration={9} />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fi-red/15 blur-3xl"
          />

          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            {/* Texto */}
            <div>
              <span className="inline-flex animate-pulse-glow items-center gap-2 rounded-full bg-fi-red px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                <Sparkles size={14} />
                ¡Especial de Gomas!
              </span>
              <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                Gomas nuevas, montura y balanceo{" "}
                <span className="text-fi-red">al mejor nivel</span>
              </h2>
              <p className="mt-4 max-w-lg text-silver-muted">
                Aprovecha nuestro especial de neumáticos y llévate el respaldo de
                aceites y aditivos <strong className="text-offwhite">Liqui Moly</strong>{" "}
                de origen alemán. Pregúntanos por la promo vigente.
              </p>
              <div className="mt-7">
                <WhatsAppButton
                  message="Hola F&I WASH, quiero información sobre el especial de gomas."
                  pulse={false}
                >
                  Aprovechar el especial
                </WhatsAppButton>
              </div>
            </div>

            {/* Badge Liqui Moly */}
            <div className="flex justify-center md:justify-end">
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass flex w-full max-w-xs flex-col items-center gap-3 rounded-2xl p-7 text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-fi-red/15 text-fi-red">
                  <BadgeCheck size={30} />
                </span>
                <p className="font-display text-2xl tracking-wide text-offwhite">
                  LIQUI MOLY
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fi-red">
                  Distribuidor Autorizado
                </p>
                <p className="text-xs text-silver-muted">
                  Lubricantes y aditivos alemanes de alta gama.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
