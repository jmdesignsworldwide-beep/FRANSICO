import type { Metadata } from "next";
import { DetailingView } from "./DetailingView";

export const metadata: Metadata = {
  title: "Detailing y Lavado · Velocity Wash",
  description:
    "Detailing y lavado premium en Santiago con Velocity Wash: lavado express y premium, lavado y encerado, lavado de chasis y motor, detallado interior y exterior, y limpieza de llantas. 6to lavado gratis.",
  alternates: { canonical: "/detailing" },
  openGraph: {
    title: "Detailing y Lavado | Velocity Wash · F&I WASH",
    description:
      "Los 8 servicios de detailing y lavado de Velocity Wash en Santiago. Promo: 6to lavado gratis y 12vo encerado gratis. Agenda por WhatsApp.",
    url: "/detailing",
  },
};

export default function DetailingPage() {
  return <DetailingView />;
}
