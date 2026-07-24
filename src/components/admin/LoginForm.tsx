"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2, LogIn, AlertCircle } from "lucide-react";
import { signInAction } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-fi-red px-6 py-3.5 font-heading font-semibold uppercase tracking-wide text-white shadow-glow-red transition-all hover:-translate-y-0.5 hover:bg-fi-red-glow focus-visible:ring-2 focus-visible:ring-fi-red focus-visible:ring-offset-2 focus-visible:ring-offset-carbon disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" /> Entrando…
        </>
      ) : (
        <>
          <LogIn size={18} /> Iniciar sesión
        </>
      )}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(signInAction, { ok: false });

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-white/10 bg-carbon-700/60 p-6 backdrop-blur-sm"
    >
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-silver">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-xl border border-white/10 bg-carbon-800/80 px-4 py-3 text-offwhite outline-none transition-all focus:border-fi-red/60 focus:shadow-glow-red"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm text-silver">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-white/10 bg-carbon-800/80 px-4 py-3 text-offwhite outline-none transition-all focus:border-fi-red/60 focus:shadow-glow-red"
        />
      </div>

      {state?.message ? (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-fi-red/30 bg-fi-red/10 px-3 py-2 text-sm text-fi-red-glow"
        >
          <AlertCircle size={16} className="shrink-0" />
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
