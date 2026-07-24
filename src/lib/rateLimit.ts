import "server-only";

/**
 * Rate limiter simple en memoria (ventana deslizante por clave).
 * Suficiente para un portal de un solo admin y bajo tráfico.
 * Nota: en serverless es por-instancia; para límites estrictos usar un store
 * compartido (p. ej. una tabla en Supabase o Upstash).
 */
type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now >= entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterMs: 0 };
  }

  if (entry.count >= limit) {
    return { ok: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { ok: true, retryAfterMs: 0 };
}
