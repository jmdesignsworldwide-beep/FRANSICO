"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { waLink } from "@/lib/site";

type Errors = Partial<Record<"nombre" | "telefono" | "mensaje", string>>;

const SERVICIOS = [
  "Mecánica",
  "Gomas y balanceo",
  "Detailing / Lavado",
  "Otro",
] as const;

/**
 * Formulario de contacto — Opción A (sin backend):
 * al enviar, arma un mensaje y abre WhatsApp con los datos pre-cargados.
 * Cero manejo de datos en servidor = cero superficie de ataque.
 * Incluye honeypot anti-spam y validación en vivo del lado del cliente.
 */
export function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState<string>(SERVICIOS[0]);
  const [mensaje, setMensaje] = useState("");
  const [honeypot, setHoneypot] = useState(""); // trampa anti-bots (debe quedar vacío)
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const validate = (): boolean => {
    const e: Errors = {};
    if (nombre.trim().length < 2) e.nombre = "Ingresa tu nombre.";
    if (telefono.trim().length < 7) e.telefono = "Ingresa un teléfono válido.";
    if (mensaje.trim().length < 5) e.mensaje = "Cuéntanos un poco más.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (honeypot) return; // bot detectado: no hacemos nada
    if (!validate()) return;

    setStatus("sending");
    const msg = `Hola F&I WASH, soy ${nombre.trim()}.
Teléfono: ${telefono.trim()}
Servicio de interés: ${servicio}
Mensaje: ${mensaje.trim()}`;

    // Pequeño delay para mostrar el estado de carga, luego abrir WhatsApp.
    window.setTimeout(() => {
      window.open(waLink(msg), "_blank", "noopener,noreferrer");
      setStatus("sent");
    }, 700);
  };

  const fieldBase =
    "peer w-full rounded-xl border border-white/10 bg-carbon-800/80 px-4 pb-2.5 pt-6 text-offwhite placeholder-transparent outline-none transition-all duration-300 focus:border-fi-red/60 focus:shadow-glow-red";
  const labelBase =
    "pointer-events-none absolute left-4 top-4 text-sm text-silver-muted transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-fi-red peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-fi-red" />
            Escríbenos
          </p>
        </ScrollReveal>
        <TextReveal
          text="Cuéntanos qué necesita tu carro"
          className="mt-4 font-display text-4xl tracking-tight sm:text-5xl"
        />
        <ScrollReveal delay={0.05}>
          <p className="mt-4 text-silver-muted">
            Completa el formulario y te contactamos por WhatsApp para ayudarte.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1} className="mx-auto mt-10 max-w-2xl">
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-carbon-700/50 p-6 backdrop-blur-sm sm:p-8"
        >
          <BorderBeam duration={12} />

          {/* Honeypot: oculto para humanos, tentador para bots */}
          <div className="absolute -left-[9999px]" aria-hidden>
            <label>
              No llenar
              <input
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Nombre */}
            <div className="relative">
              <input
                id="nombre"
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                aria-invalid={!!errors.nombre}
                className={fieldBase}
              />
              <label htmlFor="nombre" className={labelBase}>
                Nombre
              </label>
              {errors.nombre ? (
                <p className="mt-1 text-xs text-fi-red-glow">{errors.nombre}</p>
              ) : null}
            </div>

            {/* Teléfono */}
            <div className="relative">
              <input
                id="telefono"
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                aria-invalid={!!errors.telefono}
                className={fieldBase}
              />
              <label htmlFor="telefono" className={labelBase}>
                Teléfono
              </label>
              {errors.telefono ? (
                <p className="mt-1 text-xs text-fi-red-glow">{errors.telefono}</p>
              ) : null}
            </div>
          </div>

          {/* Servicio */}
          <div className="relative mt-5">
            <label
              htmlFor="servicio"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-silver-muted"
            >
              Servicio de interés
            </label>
            <select
              id="servicio"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-carbon-800/80 px-4 py-3.5 text-offwhite outline-none transition-all duration-300 focus:border-fi-red/60 focus:shadow-glow-red"
            >
              {SERVICIOS.map((s) => (
                <option key={s} value={s} className="bg-carbon-800">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Mensaje */}
          <div className="relative mt-5">
            <textarea
              id="mensaje"
              rows={4}
              placeholder="Mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              aria-invalid={!!errors.mensaje}
              className={`${fieldBase} resize-none`}
            />
            <label htmlFor="mensaje" className={labelBase}>
              ¿En qué te ayudamos?
            </label>
            {errors.mensaje ? (
              <p className="mt-1 text-xs text-fi-red-glow">{errors.mensaje}</p>
            ) : null}
          </div>

          {/* Botón enviar con estados */}
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-fi-red px-8 py-4 font-heading font-semibold uppercase tracking-wide text-white shadow-glow-red transition-all duration-300 hover:-translate-y-0.5 hover:bg-fi-red-glow focus-visible:ring-2 focus-visible:ring-fi-red focus-visible:ring-offset-2 focus-visible:ring-offset-carbon disabled:opacity-70 sm:w-auto"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              {status === "sending" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Abriendo WhatsApp…
                </>
              ) : status === "sent" ? (
                <>
                  <CheckCircle2 size={18} /> ¡Listo! Continúa en WhatsApp
                </>
              ) : (
                <>
                  <Send size={18} /> Enviar por WhatsApp
                </>
              )}
            </button>
            <p className="text-center text-xs text-silver-muted sm:text-right">
              Se abrirá WhatsApp con tu mensaje listo para enviar.
            </p>
          </div>
        </motion.form>
      </ScrollReveal>
    </section>
  );
}
