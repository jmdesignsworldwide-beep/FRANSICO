"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { inViewport } from "@/lib/motion";
import { SITE } from "@/lib/site";

/**
 * Mapa de Google embebido con lazy-load real: el iframe solo se monta cuando
 * la sección entra en viewport (IntersectionObserver), evitando afectar el LCP.
 * Marco glass con border beam + botón para abrir direcciones en Google Maps.
 */
export function MapEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">
            <span className="h-px w-8 bg-fi-red" />
            Nuestra ubicación
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
            Visítanos en Santiago
          </h2>
          <p className="mt-3 flex items-start gap-2 text-sm text-silver-muted">
            <MapPin size={16} className="mt-0.5 shrink-0 text-fi-red" />
            {SITE.address.full}
          </p>
        </div>
        <CTAButton
          href={SITE.maps.link}
          variant="outline"
          icon={<Navigation size={18} />}
        >
          Abrir en Google Maps
        </CTAButton>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewport}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-carbon-700/60 sm:aspect-[21/9]"
      >
        <BorderBeam duration={12} />
        {inView ? (
          <iframe
            title={`Ubicación de ${SITE.name} en Google Maps`}
            src={SITE.maps.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full grayscale-[0.3] contrast-[1.1] transition-all duration-500 hover:grayscale-0"
            style={{ border: 0 }}
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center gap-2 text-silver-muted">
            <Loader2 size={18} className="animate-spin" />
            Cargando mapa…
          </div>
        )}
      </motion.div>
    </section>
  );
}
