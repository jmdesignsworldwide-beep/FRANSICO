"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deletePhotoAction } from "@/app/admin/actions";
import type { AdminPhoto } from "@/lib/photos";

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Eliminar foto"
      onClick={(e) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta foto?")) {
          e.preventDefault();
        }
      }}
      className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-carbon/80 text-white backdrop-blur transition-colors hover:bg-fi-red disabled:opacity-70"
    >
      {pending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}

export function PhotoCard({ photo }: { photo: AdminPhoto }) {
  const router = useRouter();
  const [state, formAction] = useFormState(deletePhotoAction, { ok: false });

  useEffect(() => {
    if (state.ok) router.refresh();
  }, [state, router]);

  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-carbon-800">
      <Image
        src={photo.url}
        alt={photo.alt || "Foto de servicio"}
        fill
        sizes="(max-width: 640px) 50vw, 200px"
        className="object-cover"
      />
      <form action={formAction}>
        <input type="hidden" name="id" value={photo.id} />
        <input type="hidden" name="storagePath" value={photo.storagePath} />
        <DeleteButton />
      </form>
      {state.message && !state.ok ? (
        <p className="absolute inset-x-0 bottom-0 bg-fi-red/90 px-2 py-1 text-center text-[11px] text-white">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
