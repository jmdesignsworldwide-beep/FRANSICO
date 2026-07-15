import { Gift, Sparkles, CircleDot } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";

const promos = [
  { icon: Gift, text: "6to lavado GRATIS" },
  { icon: Sparkles, text: "12vo encerado GRATIS" },
  { icon: CircleDot, text: "¡Especial de Gomas!" },
  { icon: Gift, text: "Distribuidor autorizado Liqui Moly" },
];

export function PromoBanner() {
  return (
    <section aria-label="Promociones vigentes" className="relative py-4">
      {/* franja con degradado rojo */}
      <div className="relative overflow-hidden border-y border-fi-red/30 bg-gradient-to-r from-fi-red/10 via-fi-red/20 to-fi-red/10 py-4">
        <Marquee>
          {promos.map((promo, i) => {
            const Icon = promo.icon;
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2.5 whitespace-nowrap font-heading text-sm font-semibold uppercase tracking-widest text-offwhite"
              >
                <Icon size={18} className="text-fi-red" />
                {promo.text}
                <span aria-hidden className="ml-6 text-fi-red/50">
                  ✦
                </span>
              </span>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}
