"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { UploadCloud, Loader2, X, ImagePlus } from "lucide-react";
import { uploadPhotosAction } from "@/app/admin/actions";
import { useToast } from "./Toast";

type Preview = { url: string; name: string };

function SubmitButton({ count }: { count: number }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || count === 0}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-fi-red px-7 py-3 text-sm font-heading font-semibold uppercase tracking-wide text-white shadow-glow-red transition-all hover:-translate-y-0.5 hover:bg-fi-red-glow disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" /> Subiendo…
        </>
      ) : (
        <>
          <UploadCloud size={16} className="transition-transform group-hover:-translate-y-0.5" />
          {count > 0 ? `Subir ${count} foto${count === 1 ? "" : "s"}` : "Subir fotos"}
        </>
      )}
    </button>
  );
}

export function UploadForm({ serviceKey }: { serviceKey: string }) {
  const router = useRouter();
  const { push } = useToast();
  const [state, formAction] = useFormState(uploadPhotosAction, { ok: false });
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Al terminar (éxito o error) mostramos un toast; en éxito refrescamos.
  useEffect(() => {
    if (state.message) {
      push(state.ok ? "success" : "error", state.message);
    }
    if (state.ok) {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
      setPreviews([]);
      formRef.current?.reset();
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Al cambiar de servicio, limpiar previsualizaciones colgantes.
  useEffect(() => {
    setPreviews((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return [];
    });
    formRef.current?.reset();
  }, [serviceKey]);

  const buildPreviews = (files: FileList | null) => {
    if (!files) return;
    const imgs = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imgs.length > 10) {
      push("error", "Máximo 10 fotos a la vez. Se tomarán las primeras 10.");
    }
    setPreviews((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return imgs.slice(0, 10).map((f) => ({
        url: URL.createObjectURL(f),
        name: f.name,
      }));
    });
  };

  const clearAll = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews([]);
    formRef.current?.reset();
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-2xl border border-white/10 bg-carbon-700/50 p-4 sm:p-5"
    >
      <input type="hidden" name="serviceKey" value={serviceKey} />

      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (inputRef.current && e.dataTransfer.files.length) {
            inputRef.current.files = e.dataTransfer.files;
            buildPreviews(e.dataTransfer.files);
          }
        }}
        onClick={() => inputRef.current?.click()}
        animate={{ scale: dragOver ? 1.01 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-dashed px-4 py-9 text-center transition-colors ${
          dragOver
            ? "border-fi-red/70 bg-fi-red/10"
            : "border-white/15 hover:border-fi-red/40 hover:bg-white/[0.02]"
        }`}
      >
        <span
          className={`grid h-14 w-14 place-items-center rounded-2xl transition-colors ${
            dragOver ? "bg-fi-red text-white" : "bg-fi-red/10 text-fi-red"
          }`}
        >
          <UploadCloud size={26} />
        </span>
        <div>
          <p className="text-sm font-medium text-offwhite">
            {dragOver ? "Suelta para agregar" : "Arrastra fotos aquí o toca para elegir"}
          </p>
          <p className="mt-1 text-xs text-silver-muted">
            JPG, PNG o WEBP · máx. 5 MB · hasta 10 fotos
          </p>
        </div>
        <input
          ref={inputRef}
          name="files"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => buildPreviews(e.target.files)}
        />
      </motion.div>

      <AnimatePresence>
        {previews.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-silver-muted">
                <ImagePlus size={13} />
                {previews.length} lista{previews.length === 1 ? "" : "s"} para subir
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1 text-xs text-silver-muted transition-colors hover:text-white"
              >
                <X size={13} /> Quitar todo
              </button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
              <AnimatePresence>
                {previews.map((p) => (
                  <motion.div
                    key={p.url}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-carbon-800"
                  >
                    {/* preview local; next/image no aplica a blobs de vista previa */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.url}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-carbon/90 to-transparent px-1.5 pb-1 pt-4 text-[10px] text-silver">
                      {p.name}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-4 flex items-center gap-3">
        <SubmitButton count={previews.length} />
        {previews.length === 0 ? (
          <p className="text-xs text-silver-muted">
            Elige o arrastra tus fotos para empezar.
          </p>
        ) : null}
      </div>
    </form>
  );
}
