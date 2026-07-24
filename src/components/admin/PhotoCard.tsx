"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, Loader2, Check } from "lucide-react";
import { deletePhotoAction } from "@/app/admin/actions";
import { useToast } from "./Toast";
import type { AdminPhoto } from "@/lib/photos";

function ConfirmDelete() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Confirmar eliminación"
      className="inline-flex items-center gap-1.5 rounded-full bg-fi-red px-4 py-2 text-xs font-semibold text-white shadow-glow-red transition-colors hover:bg-fi-red-glow disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 size={14} className="animate-spin" /> Borrando…
        </>
      ) : (
        <>
          <Check size={14} /> Eliminar
        </>
      )}
    </button>
  );
}

export function PhotoCard({ photo }: { photo: AdminPhoto }) {
  const router = useRouter();
  const { push } = useToast();
  const [state, formAction] = useFormState(deletePhotoAction, { ok: false });
  const [confirming, setConfirming] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.ok) {
      push("success", state.message ?? "Foto eliminada.");
      router.refresh();
    } else if (state.message) {
      push("error", state.message);
      setConfirming(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-carbon-800"
    >
      <Image
        src={photo.url}
        alt={photo.alt || "Foto de servicio"}
        fill
        sizes="(max-width: 640px) 50vw, 200px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradiente + botón borrar (visible en hover / touch) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {!confirming ? (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          aria-label="Eliminar foto"
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-carbon/80 text-white opacity-0 backdrop-blur transition-all hover:bg-fi-red focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Trash2 size={16} />
        </button>
      ) : null}

      {/* Confirmación inline (sin window.confirm) */}
      <AnimatePresence>
        {confirming ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-carbon/85 p-3 text-center backdrop-blur-sm"
          >
            <p className="text-xs font-medium text-offwhite">
              ¿Eliminar esta foto?
            </p>
            <div className="flex items-center gap-2">
              <form action={formAction}>
                <input type="hidden" name="id" value={photo.id} />
                <input type="hidden" name="storagePath" value={photo.storagePath} />
                <ConfirmDelete />
              </form>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-full border border-white/15 px-4 py-2 text-xs text-silver transition-colors hover:text-white"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
