import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/providers/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CursorGlow } from "@/components/ui/CursorGlow";

/**
 * Layout del sitio público (navbar sticky + footer + smooth scroll + efectos
 * globales). El área /admin queda fuera de este grupo y no muestra este chrome.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Skip link accesible */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-fi-red focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>

      <ScrollProgress />
      <CursorGlow />
      <SmoothScroll>
        <Navbar />
        <main id="contenido" className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
