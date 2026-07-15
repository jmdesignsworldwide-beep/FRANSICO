"use client";

import type { LucideIcon } from "lucide-react";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";

type Accent = "red" | "velocity";

export type Stat = {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

/**
 * Franja de estadísticas con number tickers (sección de confianza).
 * Reutilizable entre páginas cambiando el acento.
 */
export function StatsBand({
  eyebrow,
  title,
  subtitle,
  stats,
  accent = "red",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  stats: Stat[];
  accent?: Accent;
}) {
  const isRed = accent === "red";
  const accentText = isRed ? "text-fi-red" : "text-velocity-glow";
  const accentBg = isRed ? "bg-fi-red" : "bg-velocity-glow";

  return (
    <section className="container-page py-20 sm:py-24">
      <StaggerReveal className="mx-auto mb-12 max-w-2xl text-center">
        <StaggerItem>
          <p className={`eyebrow justify-center ${accentText}`}>
            <span className={`h-px w-8 ${accentBg}`} />
            {eyebrow}
          </p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            {title}
          </h2>
        </StaggerItem>
        {subtitle ? (
          <StaggerItem>
            <p className="mt-4 text-silver-muted">{subtitle}</p>
          </StaggerItem>
        ) : null}
      </StaggerReveal>

      <StaggerReveal
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        stagger={0.1}
      >
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <StaggerItem key={s.label}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-carbon-700/80 to-carbon-800 p-6 text-center transition-colors duration-300 hover:border-white/20 sm:text-left">
                <div
                  aria-hidden
                  className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${
                    isRed ? "bg-fi-red/15" : "bg-velocity/20"
                  }`}
                />
                <div
                  className={`mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl sm:mx-0 ${
                    isRed ? "bg-fi-red/10" : "bg-velocity/15"
                  } ${accentText}`}
                >
                  <Icon size={20} />
                </div>
                <div className="font-display text-4xl tracking-tight text-metal sm:text-5xl">
                  <NumberTicker value={s.value} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <p className="mt-2 text-sm text-silver-muted">{s.label}</p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerReveal>
    </section>
  );
}
