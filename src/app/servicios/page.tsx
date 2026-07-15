import type { Metadata } from "next";
import { ServiciosView } from "./ServiciosView";

export const metadata: Metadata = {
  title: "Servicios de Mecánica y Gomas",
  description:
    "Venta de neumáticos, montura y balanceo, sensores TPMS, nitrógeno, cambio de aceite Liqui Moly, frenos, tren delantero, baterías y reparación de cristales en F&I WASH, Santiago RD.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios de Mecánica y Gomas | F&I WASH Auto Services",
    description:
      "Los 10 servicios de mecánica y gomas de F&I WASH en Santiago. Distribuidor autorizado Liqui Moly. Cotiza por WhatsApp.",
    url: "/servicios",
  },
};

export default function ServiciosPage() {
  return <ServiciosView />;
}
