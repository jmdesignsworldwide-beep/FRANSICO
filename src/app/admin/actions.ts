"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { PHOTOS_BUCKET, isSupabaseConfigured } from "@/lib/supabase/config";
import { ALL_SERVICE_KEYS } from "@/lib/services";
import { rateLimit } from "@/lib/rateLimit";
import {
  detectImageType,
  safeObjectName,
  MAX_FILE_BYTES,
} from "@/lib/imageValidation";

type ActionResult = { ok: boolean; message?: string };

function clientIp(): string {
  const h = headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

/** Verifica sesión + que el usuario sea admin (allowlist en BD). */
async function requireAdmin() {
  const supabase = createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, admin: false as const };
  const { data: admin } = await supabase.rpc("is_admin");
  return { supabase, user, admin: admin === true };
}

/** Login con email + contraseña (Supabase Auth). Errores genéricos. */
export async function signInAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, message: "El portal aún no está configurado." };
  }

  // Rate limit por IP para frenar fuerza bruta.
  const rl = rateLimit(`login:${clientIp()}`, 8, 60_000);
  if (!rl.ok) {
    return {
      ok: false,
      message: "Demasiados intentos. Espera un momento e inténtalo de nuevo.",
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    return { ok: false, message: "Ingresa tu correo y contraseña." };
  }

  const supabase = createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // Mensaje genérico: no revelar si el correo existe.
    return { ok: false, message: "Correo o contraseña incorrectos." };
  }

  redirect("/admin");
}

export async function signOutAction(): Promise<void> {
  const supabase = createServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/** Sube una o varias fotos a un servicio. Valida MIME real, tamaño y admin. */
export async function uploadPhotosAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { supabase, user, admin } = await requireAdmin();
  if (!user || !admin) return { ok: false, message: "No autorizado." };

  const rl = rateLimit(`upload:${user.id}`, 30, 60_000);
  if (!rl.ok) {
    return { ok: false, message: "Vas muy rápido. Espera unos segundos." };
  }

  const serviceKey = String(formData.get("serviceKey") ?? "");
  if (!ALL_SERVICE_KEYS.includes(serviceKey)) {
    return { ok: false, message: "Servicio no válido." };
  }

  const files = formData
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) {
    return { ok: false, message: "Selecciona al menos una foto." };
  }
  if (files.length > 10) {
    return { ok: false, message: "Máximo 10 fotos a la vez." };
  }

  let uploaded = 0;
  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) {
      return { ok: false, message: `"${file.name}" supera los 5 MB.` };
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    const detected = detectImageType(bytes);
    if (!detected) {
      return {
        ok: false,
        message: "Solo se permiten imágenes JPG, PNG o WEBP.",
      };
    }

    const objectName = safeObjectName(serviceKey, detected.ext);

    // Subida vía sesión del admin → Storage RLS vuelve a validar que sea admin.
    const { error: upErr } = await supabase.storage
      .from(PHOTOS_BUCKET)
      .upload(objectName, bytes, {
        contentType: detected.mime,
        upsert: false,
      });
    if (upErr) {
      return { ok: false, message: "No se pudo subir la foto. Inténtalo de nuevo." };
    }

    // Registro en la tabla (RLS valida admin + created_by).
    const { error: dbErr } = await supabase.from("service_photos").insert({
      service_key: serviceKey,
      storage_path: objectName,
      alt_text: `Foto de ${serviceKey}`,
    });
    if (dbErr) {
      // Rollback del objeto si falla el insert.
      await supabase.storage.from(PHOTOS_BUCKET).remove([objectName]);
      return { ok: false, message: "No se pudo guardar la foto. Inténtalo de nuevo." };
    }
    uploaded += 1;
  }

  revalidatePath("/servicios");
  revalidatePath("/detailing");
  revalidatePath("/admin");
  return { ok: true, message: `${uploaded} foto(s) subida(s).` };
}

/** Borra una foto (objeto de Storage + registro). Solo admin. */
export async function deletePhotoAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { supabase, user, admin } = await requireAdmin();
  if (!user || !admin) return { ok: false, message: "No autorizado." };

  const rl = rateLimit(`delete:${user.id}`, 40, 60_000);
  if (!rl.ok) {
    return { ok: false, message: "Vas muy rápido. Espera unos segundos." };
  }

  const id = String(formData.get("id") ?? "");
  const storagePath = String(formData.get("storagePath") ?? "");
  if (!id || !storagePath) {
    return { ok: false, message: "Foto no válida." };
  }

  // Borrar el registro (RLS valida admin).
  const { error: dbErr } = await supabase
    .from("service_photos")
    .delete()
    .eq("id", id);
  if (dbErr) {
    return { ok: false, message: "No se pudo eliminar la foto." };
  }

  // Borrar el objeto de Storage.
  await supabase.storage.from(PHOTOS_BUCKET).remove([storagePath]);

  revalidatePath("/servicios");
  revalidatePath("/detailing");
  revalidatePath("/admin");
  return { ok: true, message: "Foto eliminada." };
}
