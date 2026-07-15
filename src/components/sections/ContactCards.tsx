"use client";

import type { Ref } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import { useTilt } from "@/hooks/useTilt";
import { SITE, waLink } from "@/lib/site";

/** Card con tilt 3D + shine + icono animado. `href` la hace accionable. */
function ContactCard({
  icon: Icon,
  title,
  href,
  external,
  children,
  accentIcon = "text-fi-red",
}: {
  icon: typeof MessageCircle;
  title: string;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  accentIcon?: string;
}) {
  const tilt = useTilt(7);

  const inner = (
    <motion.div
      ref={tilt.ref as Ref<HTMLDivElement>}
      {...tilt.handlers}
      style={tilt.style}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-carbon-700/70 p-6 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 [transform-style:preserve-3d] hover:border-fi-red/50 hover:shadow-glow-red"
    >
      {/* shine */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <div className="mb-4 flex items-start justify-between">
        <span
          className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-fi-red/10 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-fi-red group-hover:text-white ${accentIcon}`}
        >
          <Icon size={26} strokeWidth={1.75} />
        </span>
        {href ? (
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-silver transition-all duration-300 group-hover:border-fi-red/40 group-hover:text-white">
            <ArrowUpRight size={18} />
          </span>
        ) : null}
      </div>
      <h3 className="font-heading text-lg font-semibold text-offwhite">{title}</h3>
      <div className="mt-1 text-sm text-silver-muted">{children}</div>
    </motion.div>
  );

  if (!href) return inner;

  if (external) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block h-full"
      >
        {inner}
      </a>
    );
  }
  return (
    <a href={href} className="block h-full">
      {inner}
    </a>
  );
}

export function ContactCards() {
  return (
    <section className="container-page py-16 sm:py-20">
      <StaggerReveal
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.09}
      >
        <StaggerItem className="h-full">
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp"
            href={waLink("Hola, quiero información / agendar un servicio")}
            external
            accentIcon="text-[#25D366]"
          >
            Respuesta rápida. Escríbenos y te atendemos al momento.
            <span className="mt-2 block font-semibold text-offwhite">
              {SITE.whatsapp.display}
            </span>
          </ContactCard>
        </StaggerItem>

        <StaggerItem className="h-full">
          <ContactCard icon={Phone} title="Llámanos">
            <span className="flex flex-col gap-1.5">
              {SITE.phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-offwhite transition-colors hover:text-fi-red"
                >
                  <Phone size={13} className="text-fi-red" />
                  {p.display}
                </a>
              ))}
            </span>
          </ContactCard>
        </StaggerItem>

        <StaggerItem className="h-full">
          <ContactCard
            icon={MapPin}
            title="Cómo llegar"
            href={SITE.maps.link}
            external
          >
            {SITE.address.line1}, {SITE.address.city}. Toca para abrir en Google
            Maps.
          </ContactCard>
        </StaggerItem>

        <StaggerItem className="h-full">
          <ContactCard icon={Clock} title="Horario">
            {/* NOTA PARA FRANCISCO: confirmar/ajustar el horario real del taller. */}
            <span className="flex flex-col gap-1">
              {SITE.hours.map((h) => (
                <span key={h.day} className="flex justify-between gap-2">
                  <span>{h.day}</span>
                  <span className="text-offwhite">{h.time}</span>
                </span>
              ))}
              <span className="mt-1 text-[11px] italic text-silver-muted/70">
                *Horario referencial — confirmar con el taller.
              </span>
            </span>
          </ContactCard>
        </StaggerItem>
      </StaggerReveal>
    </section>
  );
}
