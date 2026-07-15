import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const iconSizes: Record<Size, number> = { sm: 16, md: 18, lg: 22 };

/**
 * Botón de WhatsApp con shimmer + pulse-glow. Abre wa.me con mensaje opcional.
 * Verde de WhatsApp para reconocimiento inmediato, sin romper la paleta.
 */
export function WhatsAppButton({
  message,
  children = "Escríbenos por WhatsApp",
  size = "md",
  className = "",
  pulse = true,
  accent = "red",
}: {
  message?: string;
  children?: React.ReactNode;
  size?: Size;
  className?: string;
  pulse?: boolean;
  /** Tinte del halo (pulse-glow) para armonizar con la división. */
  accent?: "red" | "velocity";
}) {
  const pulseClass =
    accent === "velocity" ? "animate-pulse-glow-velocity" : "animate-pulse-glow";
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#25D366] font-heading font-semibold uppercase tracking-wide text-carbon shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FBE5A] focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-carbon ${
        pulse ? pulseClass : ""
      } ${sizes[size]} ${className}`}
    >
      {/* barrido shimmer */}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <MessageCircle size={iconSizes[size]} className="relative z-10" />
      <span className="relative z-10">{children}</span>
    </a>
  );
}
