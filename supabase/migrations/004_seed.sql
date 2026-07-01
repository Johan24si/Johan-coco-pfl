-- ============================================================
-- DentaCare CRM — Migration 004: Seed Data
-- Jalankan SETELAH 003_triggers.sql
-- ============================================================

-- ──────────────────────────────────────────────────────────
-- TIERS — data awal (idempotent dengan ON CONFLICT)
-- ──────────────────────────────────────────────────────────
insert into public.tiers (name, min_points, discount_percentage, benefits)
values
  ('Bronze',   0,    0,   'Akses dasar member DentaCare'),
  ('Silver',   100,  5,   'Diskon 5% semua layanan + prioritas jadwal'),
  ('Gold',     500,  10,  'Diskon 10% + konsultasi gratis 1x/bulan'),
  ('Platinum', 1500, 15,  'Diskon 15% + layanan VIP + free scaling 2x/tahun')
on conflict (name) do update
  set min_points          = excluded.min_points,
      discount_percentage = excluded.discount_percentage,
      benefits            = excluded.benefits;

-- ──────────────────────────────────────────────────────────
-- LAYANAN — data awal klinik (idempotent)
-- ──────────────────────────────────────────────────────────
insert into public.layanan (nama, deskripsi, harga, durasi_menit, kategori, is_active)
values
  ('Pemeriksaan Umum',
   'Pemeriksaan menyeluruh kondisi gigi dan gusi oleh dokter spesialis.',
   100000, 45, 'Umum', true),

  ('Tambal Gigi (Komposit)',
   'Menutup lubang pada gigi menggunakan bahan komposit sewarna gigi.',
   200000, 60, 'Umum', true),

  ('Cabut Gigi',
   'Pencabutan gigi bermasalah, sisa akar, atau gigi bungsu.',
   250000, 45, 'Umum', true),

  ('Scaling (Karang Gigi)',
   'Pembersihan karang gigi untuk mencegah radang gusi.',
   150000, 60, 'Pencegahan', true),

  ('Perawatan Saluran Akar',
   'Menyelamatkan gigi terinfeksi parah agar tidak perlu dicabut.',
   800000, 120, 'Spesialis', true),

  ('Pemutihan Gigi (Bleaching)',
   'Mencerahkan warna gigi menggunakan teknologi laser bleaching.',
   500000, 90, 'Estetika', true),

  ('Pasang Behel (Orthodonti)',
   'Meratakan susunan gigi menggunakan kawat gigi.',
   5000000, 90, 'Spesialis', true),

  ('Implan Gigi',
   'Penggantian gigi yang hilang secara permanen dengan implan titanium.',
   8000000, 120, 'Spesialis', true),

  ('Veneer Gigi',
   'Lapisan porselen tipis untuk mempercantik senyum.',
   2500000, 90, 'Estetika', true),

  ('Perawatan Gusi (Periodontal)',
   'Perawatan radang dan penyakit gusi untuk menjaga gigi tetap kuat.',
   350000, 75, 'Spesialis', true)
on conflict do nothing;

-- ──────────────────────────────────────────────────────────
-- CATATAN: Akun admin pertama harus dibuat via:
--
--   1. Supabase Dashboard → Authentication → Add User
--      (masukkan email + password)
--
--   2. Lalu jalankan SQL berikut di SQL Editor Supabase
--      untuk set role = 'admin' pada profil yang terbuat:
--
--      UPDATE public.profiles
--      SET role = 'admin'
--      WHERE email = 'admin@dentacare.com';
--
-- Atau gunakan form Register dengan field hidden initial_role='admin'
-- dan set manual setelahnya via SQL Editor.
-- ──────────────────────────────────────────────────────────
