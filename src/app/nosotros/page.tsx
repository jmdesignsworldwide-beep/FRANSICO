import type { Metadata } from "next";
import { PageStub } from "@/components/sections/PageStub";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce F&I WASH Auto Services: historia, propuesta de valor y alianzas con Liqui Moly y Multimodal Xpress en Santiago, RD.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <PageStub
      eyebrow="Sobre Nosotros"
      title="Nosotros"
      description="Nuestra historia, propuesta de valor y alianzas (Liqui Moly, Multimodal Xpress). El contenido completo llega en la próxima tanda."
      accent="red"
    />
  );
}
