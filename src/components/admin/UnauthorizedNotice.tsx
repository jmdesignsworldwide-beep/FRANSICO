import { ShieldAlert } from "lucide-react";
import { signOutAction } from "@/app/admin/actions";

/** Sesión válida pero sin permisos de admin. */
export function UnauthorizedNotice() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 text-center">
      <ShieldAlert size={40} className="text-fi-red" />
      <div>
        <h1 className="font-display text-2xl">Sin acceso</h1>
        <p className="mt-2 max-w-sm text-sm text-silver-muted">
          Tu cuenta no tiene permisos de administrador. Si crees que es un error,
          contacta al desarrollador.
        </p>
      </div>
      <form action={signOutAction}>
        <button
          type="submit"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-offwhite transition-colors hover:border-fi-red/50"
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}
