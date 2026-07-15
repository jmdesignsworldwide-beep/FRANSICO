"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { NAV_LINKS, waLink } from "@/lib/site";
import { Logo } from "./ui/Logo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Glass más marcado al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Navegación principal"
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-carbon/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between md:h-20">
          {/* Logo → inicio */}
          <Link
            href="/"
            aria-label="F&I WASH Auto Services — Ir al inicio"
            className="shrink-0 rounded-lg"
          >
            <Logo />
          </Link>

          {/* Links desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "text-white"
                        : "text-silver-muted hover:text-white"
                    }`}
                  >
                    {link.label}
                    {/* Underline animado en hover (solo cuando no está activo) */}
                    {!active ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 bg-fi-red transition-transform duration-300 group-hover:scale-x-100"
                      />
                    ) : null}
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-fi-red/15 ring-1 ring-fi-red/40"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA WhatsApp desktop */}
          <div className="hidden md:block">
            <a
              href={waLink("Hola F&I WASH, quisiera más información.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-carbon shadow-glow-red transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FBE5A]"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
          </div>

          {/* Botón hamburguesa (móvil) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-offwhite md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-carbon/95 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              className="container-page flex flex-col gap-2 py-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-xl border px-5 py-4 text-lg font-heading font-semibold transition-colors ${
                        active
                          ? "border-fi-red/40 bg-fi-red/15 text-white"
                          : "border-white/10 bg-white/5 text-silver hover:text-white"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className={`h-2 w-2 rounded-full ${
                          active ? "bg-fi-red" : "bg-white/20"
                        }`}
                      />
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="mt-4"
              >
                <a
                  href={waLink("Hola F&I WASH, quisiera más información.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 text-lg font-heading font-semibold text-carbon"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
