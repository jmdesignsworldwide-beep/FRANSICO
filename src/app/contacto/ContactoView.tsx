"use client";

import { SectionHero } from "@/components/sections/SectionHero";
import { ContactCards } from "@/components/sections/ContactCards";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactClosing } from "@/components/sections/ContactClosing";

const WA_MESSAGE = "Hola, quiero información / agendar un servicio";

/**
 * Vista cliente de /contacto. Cierra el sitio con el máximo nivel de animación.
 * La metadata SEO y los datos estructurados LocalBusiness viven en page.tsx (server).
 */
export function ContactoView() {
  return (
    <>
      <SectionHero
        eyebrow="F&I WASH · Contacto"
        breadcrumbLabel="Contacto"
        variant="contact"
        title="Hablemos,"
        highlight="estamos aquí"
        subtitle="Escríbenos, llámanos o visítanos en Santiago. Te atendemos con gusto y sin fricción: elige el canal que prefieras."
        accent="red"
        waMessage={WA_MESSAGE}
      />

      <ContactCards />

      <MapEmbed />

      <ContactForm />

      <ContactClosing />
    </>
  );
}
