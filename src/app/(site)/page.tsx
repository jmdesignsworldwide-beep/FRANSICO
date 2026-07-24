import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Divisions } from "@/components/sections/Divisions";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { WhyUs } from "@/components/sections/WhyUs";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "F&I WASH Auto Services en Santiago, RD: mecánica, gomas y balanceo + detailing y lavado Velocity Wash. Distribuidor autorizado Liqui Moly. Agenda por WhatsApp.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Divisions />
      <PromoBanner />
      <WhyUs />
    </>
  );
}
