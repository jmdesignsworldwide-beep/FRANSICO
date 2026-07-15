import type { Metadata } from "next";
import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-8xl text-fi-red sm:text-9xl">404</p>
      <h1 className="mt-4 font-heading text-2xl font-semibold text-offwhite">
        Esta página se fue de ruta
      </h1>
      <p className="mt-3 max-w-md text-silver-muted">
        No encontramos lo que buscabas, pero tu carro sí encontrará su lugar con
        nosotros. Volvamos al inicio.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-fi-red px-7 py-3.5 font-heading font-semibold uppercase tracking-wide text-white shadow-glow-red transition-all hover:-translate-y-0.5 hover:bg-fi-red-glow"
        >
          <Home size={18} />
          Ir al inicio
        </Link>
        <a
          href={waLink("Hola F&I WASH, necesito ayuda.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-heading font-semibold uppercase tracking-wide text-offwhite transition-all hover:-translate-y-0.5 hover:border-fi-red/50"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>
    </section>
  );
}
