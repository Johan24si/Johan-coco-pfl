import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('dentacare_member_token');
    const name = localStorage.getItem('dentacare_member_name');
    const email = localStorage.getItem('dentacare_member_email');
    const role = localStorage.getItem('dentacare_member_role');
    if (token && name && email && role) {
      setUser({ token, name, email, role });
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData) => {
    localStorage.setItem('dentacare_member_token', userData.token);
    localStorage.setItem('dentacare_member_name', userData.name);
    localStorage.setItem('dentacare_member_email', userData.email);
    localStorage.setItem('dentacare_member_role', userData.role);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('dentacare_member_token');
    localStorage.removeItem('dentacare_member_name');
    localStorage.removeItem('dentacare_member_email');
    localStorage.removeItem('dentacare_member_role');
    // Also clear old admin session key for compatibility
    localStorage.removeItem('isLoggedIn');
    setUser(null);
  }, []);

  const updateUser = useCallback((updatedData) => {
    const newUser = { ...user, ...updatedData };
    localStorage.setItem('dentacare_member_name', newUser.name);
    localStorage.setItem('dentacare_member_email', newUser.email);
    setUser(newUser);
  }, [user]);

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
