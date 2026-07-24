import "server-only";

import { createServerSupabase } from "./supabase/server";
import { isSupabaseConfigured, SUPABASE_URL, PHOTOS_BUCKET } from "./supabase/config";

export type ServicePhoto = {
  id: string;
  serviceKey: string;
  url: string;
  alt: string;
};

/** URL pública de un objeto del bucket (bucket público). */
export function publicPhotoUrl(storagePath: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${PHOTOS_BUCKET}/${storagePath}`;
}

/**
 * Devuelve un mapa serviceKey → fotos, para pintar en la web pública.
 * Si Supabase no está configurado o hay error, devuelve un mapa vacío
 * (cada servicio usa entonces su fallback elegante).
 */
export async function getPhotosByService(): Promise<
  Record<string, ServicePhoto[]>
> {
  if (!isSupabaseConfigured) return {};

  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from("service_photos")
      .select("id, service_key, storage_path, alt_text, sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data) return {};

    const map: Record<string, ServicePhoto[]> = {};
    for (const row of data) {
      const photo: ServicePhoto = {
        id: row.id,
        serviceKey: row.service_key,
        url: publicPhotoUrl(row.storage_path),
        alt: row.alt_text ?? "",
      };
      (map[row.service_key] ??= []).push(photo);
    }
    return map;
  } catch {
    return {};
  }
}

/** Fotos del admin para el panel (incluye ids y storage_path para borrar). */
export type AdminPhoto = {
  id: string;
  serviceKey: string;
  storagePath: string;
  url: string;
  alt: string;
};

export async function getAdminPhotos(): Promise<AdminPhoto[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from("service_photos")
      .select("id, service_key, storage_path, alt_text, sort_order, created_at")
      .order("service_key", { ascending: true })
      .order("sort_order", { ascending: true });
    if (error || !data) return [];
    return data.map((row) => ({
      id: row.id,
      serviceKey: row.service_key,
      storagePath: row.storage_path,
      url: publicPhotoUrl(row.storage_path),
      alt: row.alt_text ?? "",
    }));
  } catch {
    return [];
  }
}
