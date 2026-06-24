import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

// Session key for localStorage
const SESSION_KEY = 'dentacare_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Save user session. userData should include: { id, name, email, role }
   */
  const login = useCallback((userData) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    // Keep legacy key for MainLayouts guard compatibility
    if (userData.role === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
    }
    setUser(userData);
  }, []);

  /**
   * Clear session completely.
   */
  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('isLoggedIn');
    // Also clear old individual keys for safety
    ['dentacare_member_token', 'dentacare_member_name',
     'dentacare_member_email', 'dentacare_member_role'].forEach((k) =>
      localStorage.removeItem(k)
    );
    setUser(null);
  }, []);

  /**
   * Update the in-memory and stored user fields (e.g. after profile edit).
   */
  const updateUser = useCallback((updatedData) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedData };
      localStorage.setItem(SESSION_KEY, JSON.stringify(next));
      return next;
    });
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
