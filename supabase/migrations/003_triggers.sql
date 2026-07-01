-- ============================================================
-- DentaCare CRM — Migration 003: Triggers & Functions
-- Jalankan SETELAH 002_rls.sql
-- ============================================================

-- ──────────────────────────────────────────────────────────
-- TRIGGER 1: Auto-create profile saat user baru Register
-- ──────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.email, ''),
    new.raw_user_meta_data->>'phone',
    -- Jika email match pattern admin seed, beri role admin; default member
    case
      when new.raw_user_meta_data->>'initial_role' = 'admin' then 'admin'
      else 'member'
    end
  );
  return new;
end;
$$;

-- Hapus trigger lama jika ada, lalu buat ulang
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ──────────────────────────────────────────────────────────
-- TRIGGER 2: Otomatis beri poin saat status jadwal → completed
-- ──────────────────────────────────────────────────────────
-- Konstanta: Rp 10.000 = 1 poin (mudah diubah di sini)
-- Formula: floor(harga / POINTS_PER_IDR)
-- ──────────────────────────────────────────────────────────
create or replace function public.handle_jadwal_completed()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_harga      numeric;
  v_poin       integer;
  v_new_points integer;
  v_new_tier   uuid;
  -- Konstanta: setiap Rp 10.000 = 1 poin
  POINTS_PER_IDR constant numeric := 10000;
begin
  -- Hanya proses saat status berubah MENJADI 'completed'
  -- dan jadwal memiliki member_id (bukan walk-in tanpa akun)
  if new.status = 'completed'
     and (old.status is distinct from 'completed')
     and new.member_id is not null
  then
    -- Ambil harga layanan
    select harga into v_harga
    from public.layanan
    where id = new.layanan_id;

    -- Hitung poin yang didapat
    v_poin := greatest(0, floor(coalesce(v_harga, 0) / POINTS_PER_IDR)::integer);

    if v_poin > 0 then
      -- 1. Catat transaksi poin
      insert into public.point_transactions
        (member_id, jadwal_id, points, type, description)
      values
        (new.member_id, new.id, v_poin, 'earn',
         'Poin dari jadwal selesai #' || new.id::text);

      -- 2. Simpan berapa poin didapat ke baris jadwal (untuk tampilan histori)
      update public.jadwal
      set poin_didapat = v_poin, updated_at = now()
      where id = new.id;

      -- 3. Update akumulasi poin di profile
      update public.profiles
      set points      = points + v_poin,
          updated_at  = now()
      where id = new.member_id
      returning points into v_new_points;

      -- 4. Tentukan tier baru (tier tertinggi dengan min_points <= total poin)
      select id into v_new_tier
      from public.tiers
      where min_points <= v_new_points
      order by min_points desc
      limit 1;

      -- 5. Update tier di profile (hanya jika ada tier yang sesuai)
      if v_new_tier is not null then
        update public.profiles
        set tier_id    = v_new_tier,
            updated_at = now()
        where id = new.member_id;
      end if;
    end if;
  end if;

  return new;
end;
$$;

-- Hapus trigger lama jika ada, lalu buat ulang
drop trigger if exists on_jadwal_completed on public.jadwal;

create trigger on_jadwal_completed
  after update on public.jadwal
  for each row execute function public.handle_jadwal_completed();

-- ──────────────────────────────────────────────────────────
-- TRIGGER 3: Update updated_at otomatis
-- ──────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Terapkan ke semua tabel yang punya kolom updated_at
drop trigger if exists set_updated_at on public.profiles;
drop trigger if exists set_updated_at on public.pasien;
drop trigger if exists set_updated_at on public.layanan;
drop trigger if exists set_updated_at on public.jadwal;

create trigger set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.pasien
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.layanan
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.jadwal
  for each row execute function public.set_updated_at();
