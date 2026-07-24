-- ============================================================================
-- F&I WASH — Portal de fotos de servicios (Supabase)
-- Ejecutar en: Supabase → SQL Editor (una sola vez).
-- Estándar Fort Knox: RLS + FORCE, escritura solo para admins autenticados,
-- funciones SECURITY DEFINER con search_path fijo, Storage con políticas alineadas.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1) Allowlist de administradores (un solo admin: Francisco)
--    El registro público está DESHABILITADO; el admin se crea desde el panel de
--    Supabase (Authentication → Users) y su id se inserta aquí.
-- ----------------------------------------------------------------------------
create table if not exists public.app_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.app_admins enable row level security;
alter table public.app_admins force row level security;

-- Nadie puede leer/escribir esta tabla vía la API (solo se gestiona por SQL/panel).
-- Sin políticas => acceso denegado por defecto con RLS activo. La función is_admin()
-- (SECURITY DEFINER) es la única que la consulta.

-- ----------------------------------------------------------------------------
-- 2) Función is_admin(): true si el usuario actual está en la allowlist.
--    SECURITY DEFINER + search_path fijo (evita secuestro de search_path).
-- ----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.app_admins a where a.user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ----------------------------------------------------------------------------
-- 3) Tabla de fotos de servicios
-- ----------------------------------------------------------------------------
create table if not exists public.service_photos (
  id uuid primary key default gen_random_uuid(),
  service_key text not null,
  storage_path text not null unique,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  created_by uuid not null default auth.uid() references auth.users (id)
);

create index if not exists service_photos_service_key_idx
  on public.service_photos (service_key, sort_order);

alter table public.service_photos enable row level security;
alter table public.service_photos force row level security;

-- SELECT: público (las fotos se muestran en la web). Solo lectura.
drop policy if exists "service_photos_public_read" on public.service_photos;
create policy "service_photos_public_read"
  on public.service_photos
  for select
  to anon, authenticated
  using (true);

-- INSERT: solo admin autenticado, y el created_by debe ser él mismo.
drop policy if exists "service_photos_admin_insert" on public.service_photos;
create policy "service_photos_admin_insert"
  on public.service_photos
  for insert
  to authenticated
  with check (public.is_admin() and created_by = auth.uid());

-- UPDATE: solo admin (p. ej. reordenar / alt_text).
drop policy if exists "service_photos_admin_update" on public.service_photos;
create policy "service_photos_admin_update"
  on public.service_photos
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- DELETE: solo admin.
drop policy if exists "service_photos_admin_delete" on public.service_photos;
create policy "service_photos_admin_delete"
  on public.service_photos
  for delete
  to authenticated
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- 4) Bucket de Storage (lectura pública; escritura solo admin)
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'service-photos',
  'service-photos',
  true,                                  -- lectura pública (las fotos son públicas)
  5242880,                               -- 5 MB máximo
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Lectura pública SOLO de este bucket.
drop policy if exists "service_photos_storage_read" on storage.objects;
create policy "service_photos_storage_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'service-photos');

-- Subir: solo admin autenticado.
drop policy if exists "service_photos_storage_insert" on storage.objects;
create policy "service_photos_storage_insert"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'service-photos' and public.is_admin());

-- Actualizar: solo admin.
drop policy if exists "service_photos_storage_update" on storage.objects;
create policy "service_photos_storage_update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'service-photos' and public.is_admin())
  with check (bucket_id = 'service-photos' and public.is_admin());

-- Borrar: solo admin.
drop policy if exists "service_photos_storage_delete" on storage.objects;
create policy "service_photos_storage_delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'service-photos' and public.is_admin());

-- ----------------------------------------------------------------------------
-- 5) Registrar al admin (HACER DESPUÉS de crear el usuario en Auth → Users):
--    Reemplaza el email por el de Francisco y ejecuta:
--
--    insert into public.app_admins (user_id)
--    select id from auth.users where email = 'CORREO_DEL_ADMIN'
--    on conflict do nothing;
-- ----------------------------------------------------------------------------
