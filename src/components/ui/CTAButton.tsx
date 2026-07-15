import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "velocity";
type Size = "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold uppercase tracking-wide transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-carbon disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-fi-red text-white shadow-glow-red hover:shadow-glow-red-lg hover:-translate-y-0.5 hover:bg-fi-red-glow focus-visible:ring-fi-red",
  velocity:
    "bg-velocity text-white shadow-glow-velocity hover:shadow-glow-velocity-lg hover:-translate-y-0.5 hover:bg-velocity-glow focus-visible:ring-velocity",
  outline:
    "border border-white/20 bg-white/5 text-offwhite backdrop-blur-sm hover:border-fi-red/60 hover:bg-white/10 hover:-translate-y-0.5 focus-visible:ring-fi-red",
  ghost:
    "text-silver hover:text-white hover:bg-white/5 focus-visible:ring-white/40",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, sizes[size], variants[variant], className]
    .filter(Boolean)
    .join(" ");
}

/**
 * Botón CTA que se resuelve como <Link> interno o <a> externo según el href.
 * Nunca hay botones muertos: siempre requiere href real.
 */
export function CTAButton({
  href,
  external,
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  ariaLabel,
}: BaseProps & {
  href: string;
  external?: boolean;
  ariaLabel?: string;
}) {
  const isExternal =
    external ??
    (href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("https://wa.me"));

  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes(variant, size, className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes(variant, size, className)}>
      {content}
    </Link>
  );
}
