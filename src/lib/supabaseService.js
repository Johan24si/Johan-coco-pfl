import { supabase } from './supabase';

// ─────────────────────────────────────────────────────────────────────────────
//  ADMIN AUTH
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Authenticate an admin against the `admins` table.
 * Returns { data: { id, name, email, role }, error: string|null }
 */
export async function adminLogin({ email, password }) {
  try {
    const { data, error } = await supabase
      .from('admins')
      .select('id, name, email, role')
      .eq('email', email.trim())
      .eq('password', password)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Email atau kata sandi admin salah.');

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  MEMBER AUTH
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Authenticate a member against the `members` table.
 * Returns { data: { id, name, email, phone, address }, error: string|null }
 */
export async function memberLogin({ email, password }) {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('id, name, email, phone, address')
      .eq('email', email.trim())
      .eq('password', password)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Email atau kata sandi salah.');

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

/**
 * Register a new member into the `members` table.
 * Fields: name, email, password, phone, address
 * Returns { data: member, error: string|null }
 */
export async function memberRegister({ name, email, password, phone = '', address = '' }) {
  try {
    // Prevent duplicate email
    const { data: existing } = await supabase
      .from('members')
      .select('id')
      .eq('email', email.trim())
      .maybeSingle();

    if (existing) throw new Error('Email ini sudah terdaftar. Gunakan email lain atau masuk.');

    const { data, error } = await supabase
      .from('members')
      .insert({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        address: address.trim(),
      })
      .select('id, name, email, phone, address')
      .single();

    if (error) throw new Error(error.message);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  MEMBER CRUD  (for Admin panel — Customers page)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all members.
 * Returns { data: Member[], error: string|null }
 */
export async function fetchAllMembers() {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('id, name, email, phone, address, created_at')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

/**
 * Create a new member (admin action).
 * Returns { data: Member, error: string|null }
 */
export async function createMember({ name, email, password, phone = '', address = '' }) {
  try {
    const { data: existing } = await supabase
      .from('members')
      .select('id')
      .eq('email', email.trim())
      .maybeSingle();

    if (existing) throw new Error('Email sudah terdaftar.');

    const { data, error } = await supabase
      .from('members')
      .insert({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        address: address.trim(),
      })
      .select('id, name, email, phone, address, created_at')
      .single();

    if (error) throw new Error(error.message);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

/**
 * Update a member row by id.
 * Returns { data: Member, error: string|null }
 */
export async function updateMember(id, updates) {
  try {
    const payload = {};
    if (updates.name !== undefined)    payload.name    = updates.name.trim();
    if (updates.email !== undefined)   payload.email   = updates.email.trim();
    if (updates.phone !== undefined)   payload.phone   = updates.phone.trim();
    if (updates.address !== undefined) payload.address = updates.address.trim();
    if (updates.password)              payload.password = updates.password;

    const { data, error } = await supabase
      .from('members')
      .update(payload)
      .eq('id', id)
      .select('id, name, email, phone, address, created_at')
      .single();

    if (error) throw new Error(error.message);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

/**
 * Delete a member by id.
 * Returns { error: string|null }
 */
export async function deleteMember(id) {
  try {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return { error: null };
  } catch (err) {
    return { error: err.message };
  }
}
