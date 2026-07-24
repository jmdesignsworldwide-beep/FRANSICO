"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { uploadPhotosAction } from "@/app/admin/actions";

function SubmitButton({ count }: { count: number }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || count === 0}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-fi-red px-6 py-3 text-sm font-heading font-semibold uppercase tracking-wide text-white shadow-glow-red transition-all hover:-translate-y-0.5 hover:bg-fi-red-glow disabled:opacity-50"
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" /> Subiendo…
        </>
      ) : (
        <>
          <UploadCloud size={16} /> Subir {count > 0 ? `(${count})` : ""}
        </>
      )}
    </button>
  );
}

export function UploadForm({ serviceKey }: { serviceKey: string }) {
  const router = useRouter();
  const [state, formAction] = useFormState(uploadPhotosAction, { ok: false });
  const [previews, setPreviews] = useState<{ url: string; name: string }[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Al terminar con éxito: refrescar la lista de fotos y limpiar previews.
  useEffect(() => {
    if (state.ok) {
      setPreviews([]);
      formRef.current?.reset();
      router.refresh();
    }
  }, [state, router]);

  const buildPreviews = (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 10)
      .map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    setPreviews(list);
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-2xl border border-white/10 bg-carbon-700/50 p-5"
    >
      <input type="hidden" name="serviceKey" value={serviceKey} />

      <div
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
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
          dragOver
            ? "border-fi-red/60 bg-fi-red/5"
            : "border-white/15 hover:border-fi-red/40"
        }`}
      >
        <UploadCloud size={26} className="text-fi-red" />
        <p className="text-sm text-offwhite">
          Arrastra fotos aquí o toca para elegir
        </p>
        <p className="text-xs text-silver-muted">
          JPG, PNG o WEBP · máx. 5 MB · hasta 10 fotos
        </p>
        <input
          ref={inputRef}
          name="files"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => buildPreviews(e.target.files)}
        />
      </div>

      {previews.length > 0 ? (
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {previews.map((p, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-lg border border-white/10"
            >
              {/* preview local; next/image no aplica a blobs de vista previa */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.url}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <SubmitButton count={previews.length} />
        {previews.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              setPreviews([]);
              formRef.current?.reset();
            }}
            className="inline-flex items-center gap-1 text-xs text-silver-muted hover:text-white"
          >
            <X size={14} /> Quitar selección
          </button>
        ) : null}
      </div>

      {state.message ? (
        <p
          role="status"
          className={`mt-3 flex items-center gap-2 text-sm ${
            state.ok ? "text-[#25D366]" : "text-fi-red-glow"
          }`}
        >
          {state.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
