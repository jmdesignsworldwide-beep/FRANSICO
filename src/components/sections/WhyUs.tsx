"use client";

import { ShieldCheck, Clock, Award, Users, MapPin } from "lucide-react";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { SITE } from "@/lib/site";

const reasons = [
  {
    icon: Award,
    title: "Distribuidor Liqui Moly",
    desc: "Aceites y aditivos de origen alemán, autorizados y garantizados.",
  },
  {
    icon: ShieldCheck,
    title: "Trabajo garantizado",
    desc: "Diagnóstico honesto y mano de obra que respalda cada servicio.",
  },
  {
    icon: Clock,
    title: "Rápido y sin vueltas",
    desc: "Respetamos tu tiempo: entradas ágiles y comunicación clara.",
  },
];

const stats = [
  { value: 18, suffix: "", label: "Servicios especializados", icon: Award },
  { value: 2, suffix: "", label: "Divisiones bajo un techo", icon: MapPin },
  { value: 100, suffix: "%", label: "Enfoque en tu carro", icon: Users },
];

export function WhyUs() {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Columna izquierda: razones */}
        <div>
          <StaggerReveal>
            <StaggerItem>
              <p className="eyebrow">
                <span className="h-px w-8 bg-fi-red" />
                ¿Por qué F&amp;I WASH?
              </p>
            </StaggerItem>
            <StaggerItem>
              <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
                Confianza que se{" "}
                <span className="text-fi-red">nota</span> en cada detalle
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 max-w-lg text-silver-muted">
                No somos un taller más. Somos el centro automotriz donde tu
                vehículo recibe atención de nivel premium, de la mecánica al
                brillo final.
              </p>
            </StaggerItem>
          </StaggerReveal>

          <StaggerReveal className="mt-8 space-y-4">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <StaggerItem key={r.title}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-carbon-700/50 p-5 transition-colors duration-300 hover:border-fi-red/40">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fi-red/10 text-fi-red transition-colors group-hover:bg-fi-red group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-offwhite">
                        {r.title}
                      </h3>
                      <p className="mt-1 text-sm text-silver-muted">{r.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerReveal>

          <StaggerReveal className="mt-8">
            <StaggerItem>
              <CTAButton href="/contacto" variant="primary" size="lg">
                Visítanos o agenda
              </CTAButton>
            </StaggerItem>
          </StaggerReveal>
        </div>

        {/* Columna derecha: stats con number ticker */}
        <StaggerReveal className="grid gap-4 sm:grid-cols-2" stagger={0.12}>
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.label} className="sm:first:col-span-2">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-carbon-700/80 to-carbon-800 p-7">
                  <div
                    aria-hidden
                    className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-fi-red/10 blur-2xl"
                  />
                  <Icon size={22} className="mb-4 text-fi-red" />
                  <div className="font-display text-5xl tracking-tight text-metal">
                    <NumberTicker value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-silver-muted">{s.label}</p>
                </div>
              </StaggerItem>
            );
          })}
          <StaggerItem className="sm:col-span-2">
            <div className="flex items-center gap-3 rounded-2xl border border-velocity/30 bg-velocity/10 p-5">
              <MapPin size={20} className="shrink-0 text-velocity-glow" />
              <p className="text-sm text-silver">
                {SITE.address.short} — fácil de encontrar, frente al Politécnico
                La Esperanza.
              </p>
            </div>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
