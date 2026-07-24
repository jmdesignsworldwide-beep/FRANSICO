import { isSupabaseConfigured } from "@/lib/supabase/config";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/ui/Logo";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Logo className="h-14 w-auto" />
          <div>
            <h1 className="font-display text-2xl tracking-tight">
              Panel de administración
            </h1>
            <p className="mt-1 text-sm text-silver-muted">
              Acceso solo para el personal autorizado.
            </p>
          </div>
        </div>

        {isSupabaseConfigured ? (
          <LoginForm />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-carbon-700/60 p-6 text-center text-sm text-silver-muted">
            El portal aún no está conectado a la base de datos. Configura las
            variables de Supabase para habilitar el acceso.
          </div>
        )}
      </div>
    </div>
  );
}
