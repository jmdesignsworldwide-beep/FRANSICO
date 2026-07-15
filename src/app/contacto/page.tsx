import type { Metadata } from "next";
import { PageStub } from "@/components/sections/PageStub";

export const metadata: Metadata = {
  title: "Contacto y Ubicación",
  description:
    "Visítanos en Av. Estrella Sadhalá No. 58, Santiago, RD. Teléfonos 809-443-9750 y 809-735-8398. Agenda por WhatsApp.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <PageStub
      eyebrow="Contacto y Ubicación"
      title="Contacto"
      description="Dirección, teléfonos clickeables, WhatsApp y mapa de Google. La página completa con el mapa embebido llega en la próxima tanda."
      accent="red"
    />
  );
}
