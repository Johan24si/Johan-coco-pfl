-- ============================================================
-- DentaCare CRM — Migration 002: RLS (Row Level Security)
-- Jalankan SETELAH 001_schema.sql
-- ============================================================

-- ──────────────────────────────────────────────────────────
-- HELPER FUNCTION
-- Cek apakah user yang login adalah admin.
-- security definer: bisa baca profiles tanpa rekursi RLS.
-- ──────────────────────────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ──────────────────────────────────────────────────────────
-- TIERS — publik read, admin write
-- ──────────────────────────────────────────────────────────
alter table public.tiers enable row level security;

drop policy if exists "tiers_select_public"    on public.tiers;
drop policy if exists "tiers_write_admin_only" on public.tiers;

create policy "tiers_select_public"
on public.tiers for select
using ( true );

create policy "tiers_write_admin_only"
on public.tiers for all
using ( public.is_admin() )
with check ( public.is_admin() );

-- ──────────────────────────────────────────────────────────
-- PROFILES
-- ──────────────────────────────────────────────────────────
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own_or_admin"  on public.profiles;
drop policy if exists "profiles_update_own_or_admin"  on public.profiles;
drop policy if exists "profiles_insert_trigger_only"  on public.profiles;
drop policy if exists "profiles_delete_admin_only"    on public.profiles;

-- SELECT: user lihat miliknya sendiri, admin lihat semua
create policy "profiles_select_own_or_admin"
on public.profiles for select
using ( auth.uid() = id or public.is_admin() );

-- UPDATE: user update profil sendiri, admin update semua
create policy "profiles_update_own_or_admin"
on public.profiles for update
using  ( auth.uid() = id or public.is_admin() )
with check ( auth.uid() = id or public.is_admin() );

-- INSERT: hanya via trigger (handle_new_user), admin juga boleh
create policy "profiles_insert_trigger_only"
on public.profiles for insert
with check ( public.is_admin() );

-- DELETE: hanya admin
create policy "profiles_delete_admin_only"
on public.profiles for delete
using ( public.is_admin() );

-- ──────────────────────────────────────────────────────────
-- PASIEN
-- ──────────────────────────────────────────────────────────
alter table public.pasien enable row level security;

drop policy if exists "pasien_select_own_or_admin"  on public.pasien;
drop policy if exists "pasien_insert_own_or_admin"  on public.pasien;
drop policy if exists "pasien_update_own_or_admin"  on public.pasien;
drop policy if exists "pasien_delete_admin_only"    on public.pasien;

create policy "pasien_select_own_or_admin"
on public.pasien for select
using ( public.is_admin() or profile_id = auth.uid() );

create policy "pasien_insert_own_or_admin"
on public.pasien for insert
with check ( public.is_admin() or profile_id = auth.uid() );

create policy "pasien_update_own_or_admin"
on public.pasien for update
using  ( public.is_admin() or profile_id = auth.uid() )
with check ( public.is_admin() or profile_id = auth.uid() );

create policy "pasien_delete_admin_only"
on public.pasien for delete
using ( public.is_admin() );

-- ──────────────────────────────────────────────────────────
-- LAYANAN — publik read (aktif), admin write
-- ──────────────────────────────────────────────────────────
alter table public.layanan enable row level security;

drop policy if exists "layanan_select_public"     on public.layanan;
drop policy if exists "layanan_write_admin_only"  on public.layanan;

create policy "layanan_select_public"
on public.layanan for select
using ( is_active = true or public.is_admin() );

create policy "layanan_write_admin_only"
on public.layanan for all
using  ( public.is_admin() )
with check ( public.is_admin() );

-- ──────────────────────────────────────────────────────────
-- JADWAL
-- ──────────────────────────────────────────────────────────
alter table public.jadwal enable row level security;

drop policy if exists "jadwal_select_own_or_admin"           on public.jadwal;
drop policy if exists "jadwal_insert_own_or_admin"           on public.jadwal;
drop policy if exists "jadwal_update_own_pending_or_admin"   on public.jadwal;
drop policy if exists "jadwal_delete_admin_only"             on public.jadwal;

create policy "jadwal_select_own_or_admin"
on public.jadwal for select
using ( public.is_admin() or member_id = auth.uid() );

create policy "jadwal_insert_own_or_admin"
on public.jadwal for insert
with check ( public.is_admin() or member_id = auth.uid() );

-- Admin bebas update; member hanya jadwal miliknya yang masih pending
create policy "jadwal_update_own_pending_or_admin"
on public.jadwal for update
using (
  public.is_admin()
  or (member_id = auth.uid() and status = 'pending')
)
with check (
  public.is_admin()
  or (member_id = auth.uid() and status in ('pending', 'cancelled'))
);

create policy "jadwal_delete_admin_only"
on public.jadwal for delete
using ( public.is_admin() );

-- ──────────────────────────────────────────────────────────
-- POINT_TRANSACTIONS — immutable, hanya insert via trigger
-- ──────────────────────────────────────────────────────────
alter table public.point_transactions enable row level security;

drop policy if exists "point_tx_select_own_or_admin"      on public.point_transactions;
drop policy if exists "point_tx_insert_admin_or_system"   on public.point_transactions;

create policy "point_tx_select_own_or_admin"
on public.point_transactions for select
using ( public.is_admin() or member_id = auth.uid() );

-- Insert hanya lewat trigger (security definer) atau admin
create policy "point_tx_insert_admin_or_system"
on public.point_transactions for insert
with check ( public.is_admin() );

-- UPDATE & DELETE tidak diizinkan (tidak ada policy → otomatis ditolak RLS)
