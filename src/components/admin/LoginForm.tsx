"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { Loader2, LogIn, AlertCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signInAction } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-fi-red px-6 py-3.5 font-heading font-semibold uppercase tracking-wide text-white shadow-glow-red transition-all hover:-translate-y-0.5 hover:bg-fi-red-glow hover:shadow-glow-red-lg focus-visible:ring-2 focus-visible:ring-fi-red focus-visible:ring-offset-2 focus-visible:ring-offset-carbon disabled:opacity-70"
    >
      {/* brillo que barre al hover */}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
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
  const [showPw, setShowPw] = useState(false);

  return (
    <motion.form
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      action={formAction}
      className="space-y-4 rounded-2xl border border-white/10 bg-carbon-700/50 p-6 shadow-2xl backdrop-blur-xl"
    >
      {/* Correo */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-silver">
          Correo
        </label>
        <div className="group relative">
          <Mail
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-silver-muted transition-colors group-focus-within:text-fi-red"
          />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="correo@ejemplo.com"
            className="w-full rounded-xl border border-white/10 bg-carbon-800/80 py-3 pl-11 pr-4 text-offwhite outline-none transition-all placeholder:text-silver-muted/50 focus:border-fi-red/60 focus:shadow-glow-red"
          />
        </div>
      </div>

      {/* Contraseña */}
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-silver">
          Contraseña
        </label>
        <div className="group relative">
          <Lock
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-silver-muted transition-colors group-focus-within:text-fi-red"
          />
          <input
            id="password"
            name="password"
            type={showPw ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-carbon-800/80 py-3 pl-11 pr-11 text-offwhite outline-none transition-all placeholder:text-silver-muted/50 focus:border-fi-red/60 focus:shadow-glow-red"
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-silver-muted transition-colors hover:text-white"
          >
            {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      {state?.message ? (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-fi-red/30 bg-fi-red/10 px-3 py-2 text-sm text-fi-red-glow"
        >
          <AlertCircle size={16} className="shrink-0" />
          {state.message}
        </motion.p>
      ) : null}

      <SubmitButton />
    </motion.form>
  );
}
