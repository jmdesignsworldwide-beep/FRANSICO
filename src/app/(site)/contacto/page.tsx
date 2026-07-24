import type { Metadata } from "next";
import { ContactoView } from "./ContactoView";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto y Ubicación",
  description:
    "Contacta a F&I WASH Auto Services en Santiago, RD: WhatsApp 809-443-9750, teléfonos, dirección y mapa. Av. Estrella Sadhalá No. 58, frente al Politécnico La Esperanza.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto y Ubicación | F&I WASH Auto Services",
    description:
      "Escríbenos por WhatsApp, llámanos o visítanos en Santiago. Mecánica, gomas y detailing premium.",
    url: "/contacto",
  },
};

/**
 * Datos estructurados LocalBusiness (schema.org) para SEO local.
 * NOTA: no incluimos coordenadas geo ni horario porque no están confirmados;
 * Google geocodifica la dirección. Añadir geo/openingHours cuando Francisco los dé.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}/favicon.svg`,
  telephone: SITE.phones.map((p) => p.tel),
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.line1,
    addressLocality: SITE.address.city,
    addressRegion: "Santiago",
    addressCountry: "DO",
  },
  areaServed: "Santiago, República Dominicana",
  hasMap: SITE.maps.link,
  department: [
    { "@type": "AutoRepair", name: "F&I WASH — Mecánica y Gomas" },
    { "@type": "AutoWash", name: "Velocity Wash — Detailing y Lavado" },
  ],
};

export default function ContactoPage() {
  return (
    <>
      {/* JSON-LD LocalBusiness (SEO local) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactoView />
    </>
  );
}
