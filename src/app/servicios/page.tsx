import type { Metadata } from "next";
import { ServiciosView } from "./ServiciosView";

export const metadata: Metadata = {
  title: "Servicios: Mecánica, Gomas y Accesorios",
  description:
    "Mecánica automotriz, gomas y aros, y accesorios en F&I WASH, Santiago RD: cambio de aceite, alineación, balanceo, frenos, tren delantero, gomas nuevas y usadas, reparación de aros, lubricantes y más.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios: Mecánica, Gomas y Accesorios | F&I WASH Auto Services",
    description:
      "Todo para tu vehículo en un solo lugar: mecánica, gomas & aros y auto adorno en F&I WASH, Santiago. Distribuidor autorizado Liqui Moly.",
    url: "/servicios",
  },
};

export default function ServiciosPage() {
  return <ServiciosView />;
}
