import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

/**
 * Cliente de Supabase para el servidor (Server Components, Server Actions, Route Handlers).
 * Usa la anon key + la sesión del usuario en cookies → RLS decide qué puede hacer.
 * NUNCA usa la service_role: toda escritura la valida RLS con la sesión del admin.
 */
export function createServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // En Server Components no se pueden setear cookies; el middleware
          // refresca la sesión. Se ignora de forma segura.
        }
      },
    },
  });
}

/** Devuelve el usuario autenticado (verificado en el servidor) o null. */
export async function getServerUser() {
  const supabase = createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}
