# Portal de fotos /admin — Configuración de Supabase (F&I WASH)

Guía para conectar el portal de administración. Solo tú (con acceso a la cuenta de
Supabase y de Vercel) puedes hacer estos pasos: por seguridad, las claves nunca deben
pasar por el chat ni subirse al repositorio.

> El sitio público funciona sin Supabase (las fotos usan un fallback elegante).
> Estos pasos habilitan el login del admin y la gestión de fotos.

---

## 1) Crear el proyecto Supabase
1. Entra a https://supabase.com → **New project**.
2. Elige nombre y una **contraseña de base de datos** fuerte (guárdala en tu gestor).
3. Región cercana (p. ej. East US).

## 2) Ejecutar el esquema (tabla + RLS + Storage)
1. En Supabase → **SQL Editor** → **New query**.
2. Copia y pega TODO el contenido de `supabase/migrations/0001_service_photos.sql`.
3. **Run**. Debe terminar sin errores. Esto crea:
   - Tabla `service_photos` con **RLS + FORCE** (lectura pública, escritura solo admin).
   - Tabla `app_admins` (allowlist de administradores).
   - Función `is_admin()` (SECURITY DEFINER con search_path fijo).
   - Bucket de Storage `service-photos` (lectura pública, subir/borrar solo admin, máx 5 MB, solo jpeg/png/webp).

## 3) Crear el usuario admin (Francisco)
1. Supabase → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Pon el correo de Francisco y una **contraseña fuerte**. Marca "Auto Confirm User".
3. **Deshabilitar el registro público:** Authentication → **Providers/Settings** →
   desactiva **Allow new users to sign up** (Enable sign ups = OFF). Solo debe existir este usuario.

## 4) Registrar al admin en la allowlist
En **SQL Editor**, ejecuta (reemplaza el correo):
```sql
insert into public.app_admins (user_id)
select id from auth.users where email = 'CORREO_DEL_ADMIN'
on conflict do nothing;
```

## 5) Configurar las variables de entorno
En Supabase → **Project Settings → API** copia:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

En **Vercel → tu proyecto → Settings → Environment Variables**, añade esas dos
(Production + Preview). **No** necesitas la `service_role` para que el portal funcione
(la app usa RLS con la sesión del admin). Si algún día la usas para scripts, ponla como
`SUPABASE_SERVICE_ROLE_KEY` **sin** el prefijo `NEXT_PUBLIC` y nunca la expongas.

Vuelve a desplegar (redeploy) para que tome las variables.

## 6) Ejecutar el Security Advisor (paso de cierre obligatorio)
Supabase → **Advisors → Security Advisor** → **Run**. Debe salir **limpio** (sin warnings).
El esquema ya viene preparado para eso (RLS+FORCE en todas las tablas, funciones con
`search_path` fijo, políticas restrictivas). Si aparece algún aviso, corrígelo antes de
dar por terminada la configuración.

## 7) Probar
1. Entra a `https://TU-DOMINIO/admin` → te redirige a `/admin/login`.
2. Inicia sesión con el correo/contraseña de Francisco.
3. Elige un servicio, sube una foto (JPG/PNG/WEBP ≤ 5 MB) y bórrala para probar.
4. Abre `/servicios` o `/detailing`: la foto aparece en la tarjeta del servicio
   (en ~1 min por la revalidación, o al instante tras subir por la revalidación on-demand).

---

## Seguridad (resumen de lo que ya está aplicado)
- **RLS + FORCE** en `service_photos` y `app_admins`; escritura solo para el admin de la allowlist.
- **Storage**: lectura pública del bucket; subir/borrar solo admin; límite 5 MB; solo imágenes.
- **Validación server-side**: tipo real por *magic bytes* (jpeg/png/webp), tamaño máx, nombre
  de archivo generado por el servidor (se ignora el nombre del cliente).
- **Rate limiting** en login/subida/borrado.
- **Middleware** protege `/admin/*` con verificación server-side.
- **Sin registro público**; un solo admin.
- La app **no usa `service_role`** (menor superficie): toda escritura pasa por RLS con la sesión.
- Cabeceras de seguridad (CSP con `*.supabase.co`, HSTS, X-Frame-Options, nosniff, etc.).

## Credenciales
Entrega el correo y la contraseña de Francisco por un **canal seguro** (no por chat ni en el
repo). Recomiéndale cambiar la contraseña desde su primer acceso si lo desea.
