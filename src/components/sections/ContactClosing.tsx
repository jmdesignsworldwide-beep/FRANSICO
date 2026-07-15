"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { inViewport } from "@/lib/motion";
import { SITE } from "@/lib/site";

/**
 * Cierre de la página de contacto: invitación final + redes.
 * NOTA PARA FRANCISCO: Instagram real @fyiwashrd ya enlazado; añadir más redes si las hay.
 */
export function ContactClosing() {
  return (
    <section className="container-page py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewport}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-carbon-700/60 px-6 py-14 text-center backdrop-blur-sm sm:px-12 sm:py-20"
      >
        <BorderBeam duration={10} />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-fi-red/20 blur-[100px]"
        />

        <h2 className="relative mx-auto max-w-2xl font-display text-4xl leading-tight tracking-tight sm:text-6xl">
          Tu carro, en las mejores manos de Santiago
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-balance text-silver-muted sm:text-lg">
          Escríbenos por WhatsApp y agenda hoy mismo. Estamos listos para
          atenderte.
        </p>

        <div className="relative mt-9 flex justify-center">
          <Magnetic strength={0.4}>
            <WhatsAppButton
              size="lg"
              message="Hola, quiero información / agendar un servicio"
            >
              Escríbenos por WhatsApp
            </WhatsAppButton>
          </Magnetic>
        </div>

        {/* Redes reales */}
        <div className="relative mt-8 flex items-center justify-center">
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de F&I WASH (@fyiwashrd)"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-silver transition-all duration-300 hover:-translate-y-0.5 hover:border-fi-red/50 hover:text-white"
          >
            <Instagram size={18} />
            {SITE.social.instagramHandle}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
