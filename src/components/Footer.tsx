import Link from "next/link";
import { Phone, MapPin, Instagram, MessageCircle, Mail, Lock } from "lucide-react";
import { SITE, NAV_LINKS, waLink } from "@/lib/site";
import { Logo } from "./ui/Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-carbon-800">
      {/* línea de acento superior */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-fi-red/60 to-transparent"
      />

      <div className="container-page grid grid-cols-1 gap-10 py-14 md:grid-cols-4">
        {/* Marca */}
        <div className="md:col-span-1">
          <Logo className="h-12 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver-muted">
            Mecánica, gomas y detailing premium en Santiago. Tu carro merece lo mejor.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de F&I WASH (@fyiwashrd)"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-silver transition-colors hover:border-fi-red/50 hover:text-white"
            >
              <Instagram size={18} />
              {SITE.social.instagramHandle}
            </a>
          </div>
        </div>

        {/* Navegación */}
        <nav aria-label="Enlaces del sitio">
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Navegación
          </h3>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-silver-muted transition-colors hover:text-fi-red"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm">
            {SITE.phones.map((p) => (
              <li key={p.tel}>
                <a
                  href={`tel:${p.tel}`}
                  className="inline-flex items-center gap-2 text-silver-muted transition-colors hover:text-fi-red"
                >
                  <Phone size={15} className="text-fi-red" />
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={waLink("Hola F&I WASH, quisiera más información.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-silver-muted transition-colors hover:text-[#25D366]"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Ubicación */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Ubicación
          </h3>
          <a
            href={SITE.maps.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-start gap-2 text-sm text-silver-muted transition-colors hover:text-fi-red"
          >
            <MapPin size={16} className="mt-0.5 shrink-0 text-fi-red" />
            <span>
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.city}, RD
            </span>
          </a>
        </div>
      </div>

      {/* Barra inferior: copyright del cliente + acceso admin */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-center gap-3 py-6 text-center text-xs text-silver-muted">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
          </p>
          <Link
            href="/admin"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-silver-muted transition-all hover:-translate-y-0.5 hover:border-fi-red/50 hover:text-white hover:shadow-glow-red"
          >
            <Lock size={13} className="text-fi-red transition-transform group-hover:scale-110" />
            Acceso administrador
          </Link>
        </div>
      </div>

      {/* Firma discreta del estudio (JM Nexus Designs) */}
      <div className="border-t border-white/5 bg-carbon">
        <div className="container-page flex flex-col items-center justify-center gap-x-2 gap-y-1 py-4 text-center text-[11px] text-silver-muted/80 sm:flex-row">
          <span>
            Diseñado por{" "}
            <span className="font-semibold text-silver">{SITE.developer.name}</span>
          </span>
          <span aria-hidden className="hidden text-white/15 sm:inline">·</span>
          <a
            href={`mailto:${SITE.developer.email}`}
            aria-label="Correo de JM Nexus Designs"
            className="group inline-flex items-center gap-1 transition-colors hover:text-white"
          >
            <Mail size={12} className="opacity-70" />
            <span className="relative">
              {SITE.developer.email}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-silver transition-all duration-300 group-hover:w-full" />
            </span>
          </a>
          <span aria-hidden className="hidden text-white/15 sm:inline">·</span>
          <a
            href={SITE.developer.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de JM Nexus Designs"
            className="group inline-flex items-center gap-1 transition-colors hover:text-white"
          >
            <Instagram size={12} className="opacity-70" />
            <span className="relative">
              {SITE.developer.instagramHandle}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-silver transition-all duration-300 group-hover:w-full" />
            </span>
          </a>
          <span aria-hidden className="hidden text-white/15 sm:inline">·</span>
          <a
            href={SITE.developer.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp de JM Nexus Designs"
            className="group inline-flex items-center gap-1 transition-colors hover:text-white"
          >
            <MessageCircle size={12} className="opacity-70" />
            <span className="relative">
              WhatsApp
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-silver transition-all duration-300 group-hover:w-full" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
