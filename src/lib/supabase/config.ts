/**
 * Configuración de Supabase leída de variables de entorno.
 * - La URL y la ANON KEY son públicas (pueden ir al cliente) y funcionan con RLS.
 * - La SERVICE_ROLE_KEY es SOLO server-side (nunca NEXT_PUBLIC, nunca en el cliente).
 *
 * `isSupabaseConfigured` permite que el sitio compile y funcione aunque las claves
 * aún no estén puestas (los datos de fotos caen a un fallback elegante).
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Nombre del bucket de Storage para las fotos de servicios. */
export const PHOTOS_BUCKET = "service-photos";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
