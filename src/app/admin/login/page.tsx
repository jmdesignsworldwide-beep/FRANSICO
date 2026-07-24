import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/ui/Logo";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16">
      {/* ── Fondo temático animado ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* rejilla */}
        <div className="absolute inset-0 bg-grid-fade [background-size:100%_100%,46px_46px,46px_46px] opacity-50" />
        {/* glows rojos con pulso suave */}
        <div className="absolute left-1/2 top-[-12%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-fi-red/15 blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[26rem] w-[26rem] rounded-full bg-fi-red/10 blur-[130px] animate-float" />
        <div className="absolute right-[-8%] top-1/3 h-[22rem] w-[22rem] rounded-full bg-velocity/10 blur-[130px] animate-float [animation-delay:2s]" />
        {/* viñeta */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_55%,#0D0D0D_100%)]" />
      </div>

      {/* Volver al sitio */}
      <Link
        href="/"
        className="group absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-silver-muted backdrop-blur-sm transition-all hover:border-fi-red/40 hover:text-white sm:left-6 sm:top-6"
      >
        <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
        Volver al sitio
      </Link>

      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          {/* Logo con halo */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-fi-red/25 blur-2xl"
            />
            <Logo className="h-16 w-auto" />
          </div>
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-fi-red/25 bg-fi-red/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-fi-red-glow">
              <ShieldCheck size={13} />
              Área privada
            </span>
            <h1 className="font-display text-3xl tracking-tight">
              Panel de administración
            </h1>
            <p className="mt-1.5 text-sm text-silver-muted">
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

        <p className="mt-6 text-center text-xs text-silver-muted/70">
          Conexión segura · F&amp;I WASH Auto Services
        </p>
      </div>
    </div>
  );
}
