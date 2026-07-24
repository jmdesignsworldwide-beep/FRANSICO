import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabase } from "@/lib/supabase/server";
import { getAdminPhotos } from "@/lib/photos";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { UnauthorizedNotice } from "@/components/admin/UnauthorizedNotice";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5 text-center text-sm text-silver-muted">
        El portal aún no está conectado a la base de datos.
      </div>
    );
  }

  const supabase = createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Sin sesión → login (el middleware ya protege, esto es defensa en profundidad).
  if (!user) redirect("/admin/login");

  // Verificar que sea admin en la allowlist (no solo estar autenticado).
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin !== true) {
    return <UnauthorizedNotice />;
  }

  const photos = await getAdminPhotos();

  return <AdminPanel photos={photos} adminEmail={user.email ?? ""} />;
}
