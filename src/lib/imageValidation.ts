import "server-only";

/** Tamaño máximo por archivo (5 MB). */
export const MAX_FILE_BYTES = 5 * 1024 * 1024;

type Detected = { mime: "image/jpeg" | "image/png" | "image/webp"; ext: "jpg" | "png" | "webp" };

/**
 * Detecta el tipo REAL de imagen leyendo los magic bytes (no el nombre ni el
 * Content-Type del cliente). Rechaza cualquier cosa que no sea jpeg/png/webp
 * (nada de SVG con scripts, ni ejecutables renombrados).
 */
export function detectImageType(bytes: Uint8Array): Detected | null {
  // JPEG: FF D8 FF
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", ext: "jpg" };
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return { mime: "image/png", ext: "png" };
  }
  // WEBP: "RIFF"...."WEBP"
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return { mime: "image/webp", ext: "webp" };
  }
  return null;
}

/** Genera un nombre de archivo seguro (ignora por completo el nombre del cliente). */
export function safeObjectName(serviceKey: string, ext: string): string {
  const safeKey = serviceKey.replace(/[^a-z0-9_]/gi, "").slice(0, 40) || "servicio";
  // crypto.randomUUID está disponible en el runtime de Node/Edge de Next.
  const rand = crypto.randomUUID();
  return `${safeKey}/${rand}.${ext}`;
}
