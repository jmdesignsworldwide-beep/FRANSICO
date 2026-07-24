import type { Metadata } from "next";
import { NosotrosView } from "./NosotrosView";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce F&I WASH Auto Services: el centro automotriz integral de Santiago que une mecánica, gomas y detailing (Velocity Wash) bajo un mismo techo. Distribuidor autorizado Liqui Moly.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Sobre Nosotros | F&I WASH Auto Services",
    description:
      "Mecánica, gomas y detailing premium en Santiago, bajo una sola marca. Alianzas con Liqui Moly y Multimodal Xpress.",
    url: "/nosotros",
  },
};

export default function NosotrosPage() {
  return <NosotrosView />;
}
