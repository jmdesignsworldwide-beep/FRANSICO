"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ArrowRight, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { SITE } from "@/lib/site";

/**
 * Adelanto de ubicación con dirección destacada y CTAs a /contacto y al mapa.
 * El mapa embebido completo vive en /contacto.
 */
export function LocationTeaser() {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-carbon-700/50 p-8 backdrop-blur-sm sm:p-12">
        {/* glow + patrón sutil */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-fi-red/15 blur-3xl"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <ScrollReveal>
              <p className="eyebrow">
                <span className="h-px w-8 bg-fi-red" />
                Dónde estamos
              </p>
            </ScrollReveal>
            <TextReveal
              text="Fácil de encontrar en Santiago"
              className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl"
            />
            <ScrollReveal delay={0.05}>
              <p className="mt-5 flex items-start gap-3 text-silver">
                <MapPin size={20} className="mt-0.5 shrink-0 text-fi-red" />
                <span>
                  {SITE.address.line1}
                  <br />
                  <span className="text-silver-muted">{SITE.address.line2}</span>
                  <br />
                  <span className="text-silver-muted">
                    {SITE.address.city}, RD
                  </span>
                </span>
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/contacto" variant="primary" icon={<ArrowRight size={18} />}>
                  Ver contacto y mapa
                </CTAButton>
                <CTAButton
                  href={SITE.maps.link}
                  variant="outline"
                  icon={<Navigation size={18} />}
                >
                  Cómo llegar
                </CTAButton>
              </div>
            </ScrollReveal>
          </div>

          {/* Tarjeta visual con pin animado */}
          <ScrollReveal>
            <div className="relative grid aspect-video place-items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-carbon-700 to-carbon-800">
              {/* anillos de pulso */}
              <div aria-hidden className="absolute">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fi-red/40"
                    initial={{ scale: 0.4, opacity: 0.6 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
              <div className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl bg-fi-red text-white shadow-glow-red">
                <MapPin size={30} />
              </div>
              {/* teléfonos rápidos */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-2">
                {SITE.phones.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-silver transition-colors hover:text-fi-red"
                  >
                    <Phone size={12} className="text-fi-red" />
                    {p.display}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
