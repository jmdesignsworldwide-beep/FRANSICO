/**
 * Marca F&I WASH construida con tipografía + acento rojo.
 * Sin dependencia de imágenes externas: nítido a cualquier tamaño y rápido.
 */
export function Logo({
  className = "",
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Emblema */}
      <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-fi-red shadow-glow-red">
        <span className="font-display text-lg leading-none text-white">F</span>
        <span
          aria-hidden
          className="absolute inset-0 rounded-lg ring-1 ring-white/20"
        />
      </span>
      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl tracking-wide text-offwhite">
          F&amp;I <span className="text-fi-red">WASH</span>
        </span>
        {showTagline ? (
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.28em] text-silver-muted">
            Auto Services
          </span>
        ) : null}
      </span>
    </span>
  );
}
