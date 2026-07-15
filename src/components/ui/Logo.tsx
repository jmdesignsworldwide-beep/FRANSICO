import Image from "next/image";

/**
 * Logo oficial de F&I WASH Auto Services (PNG transparente).
 * Se integra en navbar, hero y footer. `next/image` con dimensiones intrínsecas
 * evita layout shift; la altura se controla por `className` (por defecto h-10).
 */
export function Logo({
  className = "h-10 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
  /** @deprecated el tagline ya viene en el propio logo. */
  showTagline?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="F&I WASH Auto Services"
      width={900}
      height={722}
      priority={priority}
      className={`w-auto object-contain ${className}`}
    />
  );
}
