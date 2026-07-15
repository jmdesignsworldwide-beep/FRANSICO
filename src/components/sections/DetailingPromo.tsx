"use client";

import { motion } from "framer-motion";
import { Gift, Sparkles, Droplets, Trophy } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/**
 * Franja de la promo de fidelidad de Velocity Wash:
 * "6to lavado gratis · 12vo encerado gratis" — lema "Lava tu auto y gana".
 * Acento morado + dorado, con marquee, pulse y border beam.
 */
export function DetailingPromo() {
  return (
    <section aria-label="Promo de fidelidad Velocity Wash" className="py-6">
      {/* Cinta marquee superior morado/dorado */}
      <div className="relative overflow-hidden border-y border-velocity/30 bg-gradient-to-r from-velocity/10 via-velocity/25 to-velocity/10 py-3">
        <Marquee>
          {[
            "6TO LAVADO GRATIS",
            "12VO ENCERADO GRATIS",
            "LAVA TU AUTO Y GANA",
            "ACABADO PREMIUM",
          ].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 whitespace-nowrap font-heading text-sm font-semibold uppercase tracking-widest text-offwhite"
            >
              <Droplets size={16} className="text-velocity-glow" />
              {t}
              <span aria-hidden className="ml-6 text-gold/70">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Tarjeta destacada de la promo */}
      <div className="container-page mt-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-carbon-700/60 p-8 backdrop-blur-sm sm:p-10"
        >
          <BorderBeam duration={9} colorFrom="#6B2FB3" colorTo="#F2B441" />
          {/* glows de fondo morado + dorado */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-velocity/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-gold/10 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
            <div className="max-w-lg">
              <span className="inline-flex animate-pulse-glow-velocity items-center gap-2 rounded-full bg-velocity px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                <Trophy size={14} className="text-gold-glow" />
                Lava tu auto y gana
              </span>
              <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                El <span className="text-velocity-glow">6to lavado</span> y el{" "}
                <span className="text-gold">12vo encerado</span>… ¡van por la casa!
              </h2>
              <p className="mt-4 text-silver-muted">
                Premiamos tu fidelidad. Acumula tus visitas en Velocity Wash y
                disfruta lavados y encerados gratis mientras tu auto se mantiene
                impecable todo el año.
              </p>
            </div>

            {/* Contadores de la promo */}
            <div className="flex shrink-0 gap-4">
              {[
                { n: "6to", label: "Lavado gratis", icon: Droplets, tint: "velocity" as const },
                { n: "12vo", label: "Encerado gratis", icon: Sparkles, tint: "gold" as const },
              ].map((p) => {
                const Icon = p.icon;
                const isGold = p.tint === "gold";
                return (
                  <motion.div
                    key={p.label}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className={`glass flex w-28 flex-col items-center gap-2 rounded-2xl p-5 text-center sm:w-32 ${
                      isGold ? "ring-1 ring-gold/30" : "ring-1 ring-velocity/30"
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-lg ${
                        isGold
                          ? "bg-gold/15 text-gold"
                          : "bg-velocity/20 text-velocity-glow"
                      }`}
                    >
                      <Icon size={20} />
                    </span>
                    <span
                      className={`font-display text-3xl leading-none ${
                        isGold ? "text-gold" : "text-velocity-glow"
                      }`}
                    >
                      {p.n}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-silver-muted">
                      {p.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative mt-8 flex justify-center md:justify-start">
            <WhatsAppButton
              accent="velocity"
              message="Hola Velocity Wash, quiero información sobre la promo de lavados (6to gratis / 12vo encerado gratis)."
              pulse={false}
            >
              Quiero mi promo
            </WhatsAppButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
