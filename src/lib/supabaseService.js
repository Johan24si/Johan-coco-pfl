import { supabase } from './supabase';

// ─────────────────────────────────────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
/** Setiap Rp 10.000 = 1 poin. Ubah nilai ini untuk mengkonfigurasi sistem poin. */
export const POINTS_PER_IDR = 10000;

// ─────────────────────────────────────────────────────────────────────────────
//  AUTH — Supabase Auth (menggantikan query langsung ke tabel admins/members)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Login untuk admin maupun member menggunakan Supabase Auth.
 * Setelah sign in, ambil profile untuk mendapatkan role.
 * Returns { data: { session, profile }, error: string|null }
 */
export async function signIn({ email, password }) {
  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({ email: email.trim(), password });

    if (authError) throw new Error(authError.message);

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, email, phone, role, points, tier_id, tiers(name, discount_percentage)')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw new Error('Gagal memuat profil. ' + profileError.message);

    return { data: { session: authData.session, profile }, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

/**
 * Register member baru menggunakan Supabase Auth.
 * Trigger `handle_new_user` otomatis membuat profil dengan role='member'.
 * Returns { data: { session, profile }, error: string|null }
 */
export async function signUpMember({ fullName, email, password, phone = '' }) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          phone: phone.trim(),
        },
      },
    });

    if (authError) throw new Error(authError.message);

    // Supabase mungkin perlu konfirmasi email — cek session
    if (!authData.session) {
      // Email confirmation required
      return {
        data: { requiresEmailConfirmation: true, email: email.trim() },
        error: null,
      };
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, email, phone, role, points, tier_id')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw new Error('Gagal memuat profil baru.');

    return { data: { session: authData.session, profile }, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

/**
 * Logout (sign out dari Supabase Auth).
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('[signOut]', error.message);
}

/**
 * Ambil session aktif (dipakai saat app pertama load / refresh).
 * Returns { session, profile } atau null.
 */
export async function getActiveSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) return null;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, email, phone, role, points, tier_id, tiers(name, min_points, discount_percentage)')
      .eq('id', session.user.id)
      .single();

    if (profileError) return null;
    return { session, profile };
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  PROFILES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Ambil profil milik user yang sedang login (termasuk data tier).
 */
export async function fetchMyProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: 'Tidak ada sesi aktif.' };

  const { data, error } = await supabase
    .from('profiles')
    .select('*, tiers(id, name, min_points, discount_percentage, benefits)')
    .eq('id', user.id)
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

/**
 * Update profil (hanya kolom yang diizinkan: full_name, phone).
 * Kolom role, points, tier_id TIDAK bisa diubah dari sini.
 */
export async function updateMyProfile({ fullName, phone }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: 'Tidak ada sesi aktif.' };

  const { data, error } = await supabase
    .from('profiles')
    .update({ full_name: fullName?.trim(), phone: phone?.trim() })
    .eq('id', user.id)
    .select('id, full_name, email, phone, role, points, tier_id')
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

/**
 * Admin: ambil semua profil user.
 */
export async function fetchAllProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, tiers(name)')
    .order('created_at', { ascending: false });

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

/**
 * Admin: ubah role user.
 */
export async function updateUserRole(userId, role) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)
    .select('id, full_name, email, role')
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

// ─────────────────────────────────────────────────────────────────────────────
//  TIERS
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchTiers() {
  const { data, error } = await supabase
    .from('tiers')
    .select('*')
    .order('min_points', { ascending: true });

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

// ─────────────────────────────────────────────────────────────────────────────
//  LAYANAN
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchLayanan({ includeInactive = false } = {}) {
  let query = supabase
    .from('layanan')
    .select('*')
    .order('kategori', { ascending: true })
    .order('nama', { ascending: true });

  if (!includeInactive) query = query.eq('is_active', true);

  const { data, error } = await query;
  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function createLayanan(payload) {
  const { data, error } = await supabase
    .from('layanan')
    .insert(payload)
    .select('*')
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function updateLayanan(id, payload) {
  const { data, error } = await supabase
    .from('layanan')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function deleteLayanan(id) {
  // Soft delete — set is_active = false agar tidak merusak relasi jadwal
  const { error } = await supabase
    .from('layanan')
    .update({ is_active: false })
    .eq('id', id);

  if (error) return { error: error.message };
  return { error: null };
}

// ─────────────────────────────────────────────────────────────────────────────
//  PASIEN
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchAllPasien() {
  const { data, error } = await supabase
    .from('pasien')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

/** Member: ambil data pasien miliknya sendiri. */
export async function fetchMyPasien() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: 'Tidak ada sesi.' };

  const { data, error } = await supabase
    .from('pasien')
    .select('*')
    .eq('profile_id', user.id)
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function createPasien(payload) {
  const { data, error } = await supabase
    .from('pasien')
    .insert(payload)
    .select('*')
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function updatePasien(id, payload) {
  const { data, error } = await supabase
    .from('pasien')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function deletePasien(id) {
  const { error } = await supabase.from('pasien').delete().eq('id', id);
  if (error) return { error: error.message };
  return { error: null };
}

// ─────────────────────────────────────────────────────────────────────────────
//  JADWAL
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchAllJadwal() {
  const { data, error } = await supabase
    .from('jadwal')
    .select(`
      *,
      pasien(id, nama, email, telepon),
      layanan(id, nama, harga, durasi_menit, kategori),
      profiles!jadwal_member_id_fkey(id, full_name, email)
    `)
    .order('tanggal', { ascending: false })
    .order('jam_mulai', { ascending: false });

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

/** Member: ambil semua jadwal miliknya (semua status). */
export async function fetchMyJadwal() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: 'Tidak ada sesi.' };

  const { data, error } = await supabase
    .from('jadwal')
    .select(`
      *,
      pasien(id, nama),
      layanan(id, nama, harga, durasi_menit, kategori)
    `)
    .eq('member_id', user.id)
    .order('tanggal', { ascending: false })
    .order('jam_mulai', { ascending: false });

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

/** Member: ambil jadwal mendatang (pending/confirmed). */
export async function fetchUpcomingJadwal() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: 'Tidak ada sesi.' };

  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('jadwal')
    .select(`
      *,
      pasien(id, nama),
      layanan(id, nama, durasi_menit)
    `)
    .eq('member_id', user.id)
    .in('status', ['pending', 'confirmed'])
    .gte('tanggal', today)
    .order('tanggal', { ascending: true })
    .order('jam_mulai', { ascending: true })
    .limit(5);

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function createJadwal(payload) {
  const { data, error } = await supabase
    .from('jadwal')
    .insert(payload)
    .select('*')
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function updateJadwalStatus(id, status) {
  const { data, error } = await supabase
    .from('jadwal')
    .update({ status })
    .eq('id', id)
    .select('*')
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function updateJadwal(id, payload) {
  const { data, error } = await supabase
    .from('jadwal')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function deleteJadwal(id) {
  const { error } = await supabase.from('jadwal').delete().eq('id', id);
  if (error) return { error: error.message };
  return { error: null };
}

// ─────────────────────────────────────────────────────────────────────────────
//  POINT TRANSACTIONS
// ─────────────────────────────────────────────────────────────────────────────

/** Member: ambil riwayat poin miliknya. */
export async function fetchMyPointTransactions() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: 'Tidak ada sesi.' };

  const { data, error } = await supabase
    .from('point_transactions')
    .select('*, jadwal(tanggal, layanan(nama))')
    .eq('member_id', user.id)
    .order('created_at', { ascending: false });

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

// ─────────────────────────────────────────────────────────────────────────────
//  LEGACY — dipertahankan untuk backward compatibility
//  (halaman yang belum dimigrasi masih bisa pakai ini)
// ─────────────────────────────────────────────────────────────────────────────

/** @deprecated Gunakan signIn() + fetchAllPasien() sebagai gantinya */
export async function adminLogin({ email, password }) {
  const result = await signIn({ email, password });
  if (result.error) return { data: null, error: result.error };
  if (result.data.profile.role !== 'admin') {
    await signOut();
    return { data: null, error: 'Akun ini bukan akun admin.' };
  }
  return {
    data: {
      id: result.data.profile.id,
      name: result.data.profile.full_name,
      email: result.data.profile.email,
      role: result.data.profile.role,
    },
    error: null,
  };
}

/** @deprecated Gunakan signIn() sebagai gantinya */
export async function memberLogin({ email, password }) {
  const result = await signIn({ email, password });
  if (result.error) return { data: null, error: result.error };
  if (result.data.profile.role !== 'member') {
    await signOut();
    return { data: null, error: 'Akun ini bukan akun member.' };
  }
  return {
    data: {
      id: result.data.profile.id,
      name: result.data.profile.full_name,
      email: result.data.profile.email,
      role: result.data.profile.role,
    },
    error: null,
  };
}

/** @deprecated Gunakan fetchAllPasien() / fetchMyPasien() sebagai gantinya */
export async function fetchAllMembers() {
  return fetchAllPasien();
}

/** @deprecated */
export async function createMember(payload) {
  return createPasien({
    nama: payload.name,
    email: payload.email,
    telepon: payload.phone,
    alamat: payload.address,
  });
}

/** @deprecated */
export async function updateMember(id, updates) {
  return updatePasien(id, {
    nama: updates.name,
    email: updates.email,
    telepon: updates.phone,
    alamat: updates.address,
  });
}

/** @deprecated */
export async function deleteMember(id) {
  return deletePasien(id);
}
