"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogOut, ImageIcon, ExternalLink, Images } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { UploadForm } from "./UploadForm";
import { PhotoCard } from "./PhotoCard";
import { ToastProvider } from "./Toast";
import { signOutAction } from "@/app/admin/actions";
import { SERVICE_GROUPS } from "@/lib/services";
import type { AdminPhoto } from "@/lib/photos";

export function AdminPanel({
  photos,
  adminEmail,
}: {
  photos: AdminPhoto[];
  adminEmail: string;
}) {
  const [selectedKey, setSelectedKey] = useState<string>(
    SERVICE_GROUPS[0].services[0].key,
  );

  const selectedService = useMemo(() => {
    for (const g of SERVICE_GROUPS) {
      const s = g.services.find((x) => x.key === selectedKey);
      if (s) return s;
    }
    return SERVICE_GROUPS[0].services[0];
  }, [selectedKey]);

  const photosForSelected = useMemo(
    () => photos.filter((p) => p.serviceKey === selectedKey),
    [photos, selectedKey],
  );

  const countByKey = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of photos) m[p.serviceKey] = (m[p.serviceKey] ?? 0) + 1;
    return m;
  }, [photos]);

  const totalPhotos = photos.length;
  const SelIcon = selectedService.icon;

  return (
    <ToastProvider>
      {/* Fondo temático sutil */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-fade [background-size:100%_100%,44px_44px,44px_44px] opacity-40" />
        <div className="absolute left-1/2 top-[-10%] h-96 w-[42rem] -translate-x-1/2 rounded-full bg-fi-red/10 blur-[130px]" />
      </div>

      {/* Header glass sticky */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-carbon/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-auto sm:h-10" />
            <div className="hidden sm:block">
              <h1 className="font-heading text-base font-semibold leading-tight">
                Fotos de servicios
              </h1>
              <p className="text-xs text-silver-muted">{adminEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-silver transition-colors hover:border-fi-red/40 hover:text-white sm:inline-flex"
            >
              <ExternalLink size={15} /> Ver sitio
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-offwhite transition-all hover:-translate-y-0.5 hover:border-fi-red/50 hover:text-white"
              >
                <LogOut size={16} /> Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Resumen */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-fi-red/10 px-4 py-1.5 text-sm font-semibold text-fi-red-glow ring-1 ring-fi-red/30">
            <Images size={15} />
            {totalPhotos} foto{totalPhotos === 1 ? "" : "s"} en total
          </span>
          <p className="text-sm text-silver-muted">
            Elige un servicio y sube o gestiona sus fotos.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* ── Selector de servicio ── */}
          <aside>
            {/* Móvil: dropdown */}
            <div className="lg:hidden">
              <label
                htmlFor="service-select"
                className="mb-2 block text-xs font-semibold uppercase tracking-widest text-silver-muted"
              >
                Servicio
              </label>
              <select
                id="service-select"
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-carbon-800/80 px-4 py-3 text-offwhite outline-none focus:border-fi-red/60 focus:shadow-glow-red"
              >
                {SERVICE_GROUPS.map((g) => (
                  <optgroup key={g.label} label={g.label}>
                    {g.services.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.title} ({countByKey[s.key] ?? 0})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Desktop: lista visual con iconos + badges */}
            <div className="hidden max-h-[calc(100vh-9rem)] space-y-5 overflow-y-auto pr-1 lg:block">
              {SERVICE_GROUPS.map((g) => {
                const isVelocity = g.division === "velocity";
                return (
                  <div key={g.label}>
                    <p
                      className={`mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest ${
                        isVelocity ? "text-velocity-glow" : "text-silver-muted"
                      }`}
                    >
                      <span
                        className={`h-px w-4 ${isVelocity ? "bg-velocity-glow" : "bg-white/20"}`}
                      />
                      {g.label}
                    </p>
                    <ul className="space-y-1">
                      {g.services.map((s) => {
                        const active = s.key === selectedKey;
                        const n = countByKey[s.key] ?? 0;
                        const Icon = s.icon;
                        return (
                          <li key={s.key}>
                            <button
                              type="button"
                              onClick={() => setSelectedKey(s.key)}
                              className="group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors"
                            >
                              {active ? (
                                <motion.span
                                  layoutId="admin-active"
                                  className="absolute inset-0 -z-10 rounded-xl bg-fi-red/15 ring-1 ring-fi-red/40"
                                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                              ) : null}
                              <span
                                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                                  active
                                    ? "bg-fi-red text-white"
                                    : "bg-white/5 text-silver-muted group-hover:text-white"
                                }`}
                              >
                                <Icon size={16} />
                              </span>
                              <span
                                className={`flex-1 truncate ${active ? "text-white" : "text-silver group-hover:text-white"}`}
                              >
                                {s.title}
                              </span>
                              <span
                                className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-[11px] font-semibold ${
                                  n > 0
                                    ? "bg-[#25D366]/15 text-[#7ff0a8]"
                                    : "text-silver-muted/60"
                                }`}
                              >
                                {n}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* ── Servicio seleccionado ── */}
          <section>
            <motion.div
              key={selectedKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-fi-red/10 text-fi-red">
                  <SelIcon size={24} />
                </span>
                <div>
                  <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
                    {selectedService.title}
                  </h2>
                  <p className="text-sm text-silver-muted">
                    {photosForSelected.length} foto(s) publicada(s)
                  </p>
                </div>
              </div>

              {/* Subir */}
              <UploadForm serviceKey={selectedKey} />

              {/* Fotos actuales */}
              <div className="mt-8">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-silver-muted">
                  Fotos actuales
                </h3>
                {photosForSelected.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-carbon-700/30 py-14 text-center text-silver-muted">
                    <ImageIcon size={30} className="opacity-50" />
                    <p className="text-sm">Aún no hay fotos para este servicio.</p>
                    <p className="text-xs text-silver-muted/60">
                      Sube la primera con el recuadro de arriba.
                    </p>
                  </div>
                ) : (
                  <motion.div
                    layout
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
                  >
                    {photosForSelected.map((photo) => (
                      <PhotoCard key={photo.id} photo={photo} />
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </ToastProvider>
  );
}
