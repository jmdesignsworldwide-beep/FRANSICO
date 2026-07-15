import type { Metadata } from "next";
import { PageStub } from "@/components/sections/PageStub";

export const metadata: Metadata = {
  title: "Servicios de Mecánica y Gomas",
  description:
    "Neumáticos, montura y balanceo, frenos, cambio de aceite Liqui Moly, baterías, tren delantero y más en F&I WASH, Santiago.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <PageStub
      eyebrow="F&I WASH · Mecánica y Gomas"
      title="Servicios"
      description="Neumáticos, balanceo, frenos, aceite Liqui Moly, baterías y tren delantero. La página completa con los 10 servicios llega en la próxima tanda."
      accent="red"
    />
  );
}
