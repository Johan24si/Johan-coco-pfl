import { useAuthContext } from '../context/AuthContext';

export function useAuth() {
  const { user, login, logout, loading, updateUser } = useAuthContext();

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';
  const isMember = user?.role === 'member';

  const mockLogin = async (email, password) => {
    // Mock auth logic
    if (email === 'admin@dentacare.com' && password === 'admin123') {
      return { success: true, user: { token: 'admin-token-xyz', name: 'Administrator', email, role: 'admin' } };
    }
    if (email === 'pasien@dentacare.com' && password === 'member123') {
      return { success: true, user: { token: 'member-token-xyz', name: 'Budi Pasien', email, role: 'member' } };
    }
    // Check registered members in localStorage
    const registered = JSON.parse(localStorage.getItem('dentacare_registered_members') || '[]');
    const found = registered.find(m => m.email === email);
    if (!found) return { success: false, error: 'Akun tidak ditemukan. Silakan daftar.' };
    if (found.password !== password) return { success: false, error: 'Email atau kata sandi salah.' };
    return { success: true, user: { token: `member-token-${Date.now()}`, name: found.name, email, role: 'member' } };
  };

  const mockRegister = async (formData) => {
    const registered = JSON.parse(localStorage.getItem('dentacare_registered_members') || '[]');
    const existing = registered.find(m => m.email === formData.email);
    if (existing) return { success: false, error: 'Email sudah terdaftar.' };
    const newMember = { ...formData, id: Date.now(), registeredAt: new Date().toISOString() };
    registered.push(newMember);
    localStorage.setItem('dentacare_registered_members', JSON.stringify(registered));
    return {
      success: true,
      user: { token: `member-token-${Date.now()}`, name: formData.name, email: formData.email, role: 'member' }
    };
  };

  return { user, login, logout, loading, updateUser, isLoggedIn, isAdmin, isMember, mockLogin, mockRegister };
}
