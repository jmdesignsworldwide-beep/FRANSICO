"use client";

import { useMemo, useState } from "react";
import { LogOut, ImageIcon, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { UploadForm } from "./UploadForm";
import { PhotoCard } from "./PhotoCard";
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-10 w-auto" />
          <div>
            <h1 className="font-heading text-lg font-semibold">Fotos de servicios</h1>
            <p className="text-xs text-silver-muted">{adminEmail}</p>
          </div>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-offwhite transition-colors hover:border-fi-red/50 hover:text-white"
          >
            <LogOut size={16} /> Salir
          </button>
        </form>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Selector de servicio */}
        <aside>
          <label
            htmlFor="service-select"
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-silver-muted"
          >
            Servicio
          </label>
          {/* Móvil: dropdown nativo */}
          <div className="relative lg:hidden">
            <select
              id="service-select"
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/10 bg-carbon-800/80 px-4 py-3 pr-10 text-offwhite outline-none focus:border-fi-red/60"
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
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-silver-muted"
            />
          </div>

          {/* Desktop: lista agrupada */}
          <div className="hidden max-h-[70vh] space-y-5 overflow-y-auto pr-1 lg:block">
            {SERVICE_GROUPS.map((g) => (
              <div key={g.label}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-silver-muted">
                  {g.label}
                </p>
                <ul className="space-y-1">
                  {g.services.map((s) => {
                    const active = s.key === selectedKey;
                    const n = countByKey[s.key] ?? 0;
                    return (
                      <li key={s.key}>
                        <button
                          type="button"
                          onClick={() => setSelectedKey(s.key)}
                          className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            active
                              ? "bg-fi-red/15 text-white ring-1 ring-fi-red/40"
                              : "text-silver hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span>{s.title}</span>
                          <span
                            className={`rounded-full px-1.5 text-[11px] ${
                              n > 0 ? "bg-fi-red/20 text-fi-red-glow" : "text-silver-muted"
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
            ))}
          </div>
        </aside>

        {/* Panel del servicio seleccionado */}
        <section>
          <h2 className="font-display text-2xl tracking-tight">
            {selectedService.title}
          </h2>
          <p className="mt-1 text-sm text-silver-muted">
            {photosForSelected.length} foto(s) publicada(s)
          </p>

          {/* Subir */}
          <div className="mt-5">
            <UploadForm serviceKey={selectedKey} />
          </div>

          {/* Fotos actuales */}
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-silver-muted">
              Fotos actuales
            </h3>
            {photosForSelected.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 py-12 text-center text-silver-muted">
                <ImageIcon size={28} className="opacity-60" />
                <p className="text-sm">Aún no hay fotos para este servicio.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {photosForSelected.map((photo) => (
                  <PhotoCard key={photo.id} photo={photo} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
