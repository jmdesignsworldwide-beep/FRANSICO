import type { Metadata } from "next";
import { PageStub } from "@/components/sections/PageStub";

export const metadata: Metadata = {
  title: "Detailing y Lavado · Velocity Wash",
  description:
    "Lavado y encerado a mano, corrección de rayaduras, cerámica, tratamiento de ozono y restauración de faros. Velocity Wash by F&I WASH, Santiago.",
  alternates: { canonical: "/detailing" },
};

export default function DetailingPage() {
  return (
    <PageStub
      eyebrow="Velocity Wash · Detailing y Lavado"
      title="Detailing"
      description="Lavado y encerado a mano, cerámica, corrección de pintura y tratamiento de ozono. La página completa con los 8 servicios llega en la próxima tanda."
      accent="velocity"
    />
  );
}
