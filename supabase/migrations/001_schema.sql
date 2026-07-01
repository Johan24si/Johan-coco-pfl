-- ============================================================
-- DentaCare CRM — Migration 001: Schema
-- Run order: 001 → 002 → 003 → 004
-- ============================================================

-- ──────────────────────────────────────────────────────────
-- 1. TIERS (referensi, dibuat dulu karena profiles FK ke tiers)
-- ──────────────────────────────────────────────────────────
create table if not exists public.tiers (
  id                  uuid        primary key default gen_random_uuid(),
  name                text        not null unique,
  min_points          integer     not null default 0,
  discount_percentage numeric(5,2) not null default 0,
  benefits            text,
  created_at          timestamptz not null default now()
);

comment on table public.tiers is
  'Tabel referensi tier member (Bronze, Silver, Gold, Platinum).';

-- ──────────────────────────────────────────────────────────
-- 2. PROFILES (perluasan auth.users, 1:1)
-- ──────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  full_name   text        not null default '',
  email       text        not null default '',
  phone       text,
  role        text        not null default 'member'
                check (role in ('admin', 'member')),
  points      integer     not null default 0,
  tier_id     uuid        references public.tiers(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is
  'Data profil user — perluasan auth.users. Guest tidak punya baris di sini.';

-- ──────────────────────────────────────────────────────────
-- 3. PASIEN (data pasien klinik)
-- ──────────────────────────────────────────────────────────
create table if not exists public.pasien (
  id              uuid        primary key default gen_random_uuid(),
  profile_id      uuid        references public.profiles(id) on delete set null,
  nama            text        not null,
  email           text,
  telepon         text,
  alamat          text,
  tanggal_lahir   date,
  jenis_kelamin   text        check (jenis_kelamin in ('L', 'P')),
  catatan_medis   text,
  created_by      uuid        references public.profiles(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.pasien is
  'Data pasien klinik. profile_id null = pasien walk-in tanpa akun member.';

-- ──────────────────────────────────────────────────────────
-- 4. LAYANAN (jasa klinik)
-- ──────────────────────────────────────────────────────────
create table if not exists public.layanan (
  id            uuid        primary key default gen_random_uuid(),
  nama          text        not null,
  deskripsi     text,
  harga         numeric(12,2) not null default 0,
  durasi_menit  integer     not null default 30,
  kategori      text,
  image_url     text,
  is_active     boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.layanan is 'Daftar layanan / jasa yang ditawarkan klinik.';

-- ──────────────────────────────────────────────────────────
-- 5. JADWAL (booking/appointment — transaksi utama)
-- ──────────────────────────────────────────────────────────
create table if not exists public.jadwal (
  id           uuid        primary key default gen_random_uuid(),
  pasien_id    uuid        not null references public.pasien(id) on delete restrict,
  layanan_id   uuid        not null references public.layanan(id) on delete restrict,
  member_id    uuid        references public.profiles(id) on delete set null,
  tanggal      date        not null,
  jam_mulai    time        not null,
  jam_selesai  time,
  status       text        not null default 'pending'
                 check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  catatan      text,
  poin_didapat integer     not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.jadwal is
  'Booking / appointment. Juga berfungsi sebagai sumber riwayat pesanan member.';

create index if not exists idx_jadwal_pasien  on public.jadwal(pasien_id);
create index if not exists idx_jadwal_member  on public.jadwal(member_id);
create index if not exists idx_jadwal_tanggal on public.jadwal(tanggal);
create index if not exists idx_jadwal_status  on public.jadwal(status);

-- ──────────────────────────────────────────────────────────
-- 6. POINT_TRANSACTIONS (riwayat poin member)
-- ──────────────────────────────────────────────────────────
create table if not exists public.point_transactions (
  id          uuid        primary key default gen_random_uuid(),
  member_id   uuid        not null references public.profiles(id) on delete cascade,
  jadwal_id   uuid        references public.jadwal(id) on delete set null,
  points      integer     not null,
  type        text        not null check (type in ('earn', 'redeem', 'adjustment')),
  description text,
  created_at  timestamptz not null default now()
);

comment on table public.point_transactions is
  'Riwayat perolehan/penukaran poin. Immutable — tidak boleh di-update/delete.';

create index if not exists idx_point_tx_member on public.point_transactions(member_id);
create index if not exists idx_point_tx_jadwal on public.point_transactions(jadwal_id);
