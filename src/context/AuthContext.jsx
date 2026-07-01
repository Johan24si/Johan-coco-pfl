import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { signOut, getActiveSession } from '../lib/supabaseService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);  // profile dari tabel profiles
  const [loading, setLoading] = useState(true);

  // ── Konversi profile Supabase ke format yang dipakai di seluruh app ──
  const buildUser = (profile) => {
    if (!profile) return null;
    return {
      id:    profile.id,
      name:  profile.full_name,
      email: profile.email,
      phone: profile.phone,
      role:  profile.role,
      points: profile.points ?? 0,
      tier_id: profile.tier_id,
      tier:  profile.tiers ?? null,
    };
  };

  // ── Load session saat app pertama kali mount ──
  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      const sessionData = await getActiveSession();
      if (isMounted) {
        setUser(sessionData ? buildUser(sessionData.profile) : null);
        setLoading(false);
      }
    };

    loadSession();

    // ── Listen perubahan auth state (login, logout, token refresh) ──
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        if (event === 'SIGNED_OUT' || !session) {
          setUser(null);
          setLoading(false);
          return;
        }

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Ambil profile terbaru dari DB
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*, tiers(id, name, min_points, discount_percentage)')
            .eq('id', session.user.id)
            .single();

          if (!error && profile && isMounted) {
            setUser(buildUser(profile));
          }
          if (isMounted) setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Simpan user ke context setelah login berhasil.
   * Dipanggil dari halaman Login setelah mendapat profile dari Supabase.
   */
  const login = useCallback((profile) => {
    setUser(buildUser(profile));
  }, []);

  /**
   * Logout: sign out dari Supabase + clear context.
   */
  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
    // Hapus juga key legacy localStorage jika masih ada
    ['dentacare_session', 'isLoggedIn',
     'dentacare_member_token', 'dentacare_member_name',
     'dentacare_member_email', 'dentacare_member_role'].forEach((k) =>
      localStorage.removeItem(k)
    );
  }, []);

  /**
   * Update user di context (misal setelah edit profil).
   */
  const updateUser = useCallback((updatedFields) => {
    setUser((prev) => prev ? { ...prev, ...updatedFields } : prev);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
