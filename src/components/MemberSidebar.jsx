import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, ClipboardList, CreditCard,
  LogOut, User, X, Star, Tag, Bell, MapPin, Stethoscope
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

const navItems = [
  { path: '/member/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/member/jadwal', icon: Calendar, label: 'Jadwal Saya' },
  { path: '/member/tracking', icon: MapPin, label: 'Tracking Kunjungan' },
  { path: '/member/riwayat', icon: ClipboardList, label: 'Riwayat Perawatan' },
  { path: '/member/loyalty', icon: Star, label: 'Loyalty Point' },
  { path: '/member/voucher', icon: Tag, label: 'Voucher Saya' },
  { path: '/member/notifikasi', icon: Bell, label: 'Notifikasi & CRM' },
  { path: '/member/kartu', icon: CreditCard, label: 'Kartu Member' },
  { path: '/member/profil', icon: User, label: 'Profil' },
];

const guestLinks = [
  { path: '/guest', label: 'Beranda' },
  { path: '/guest/layanan', label: 'Layanan' },
  { path: '/guest/promo', label: 'Promo & Voucher' },
  { path: '/guest/booking', label: 'Booking Online' },
  { path: '/guest/tentang', label: 'Tentang Kami' },
];

export default function MemberSidebar({ isMobileOpen, setIsMobileOpen }) {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/guest/login', { replace: true });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-[270px] bg-white border-r border-gray-100 flex flex-col z-50 transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

        {/* Mobile Close */}
        <button
          className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-1"
          onClick={() => setIsMobileOpen(false)}
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-gray-100">
          <div className="w-9 h-9 bg-[#0891b2] rounded-xl flex items-center justify-center flex-shrink-0">
            <Stethoscope size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 leading-none">DentaCare</p>
            <p className="text-xs text-gray-400">Patient Portal</p>
          </div>
        </div>

        {/* Profile Header */}
        <div className="px-4 py-4 flex gap-3 items-center border-b border-gray-100">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0891b2] to-teal-500 flex items-center justify-center text-white text-base font-bold shadow-md flex-shrink-0">
            {getInitials(user?.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Member Aktif · Gold
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Menu Utama</p>
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-cyan-50 text-[#0891b2] font-semibold'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} className={isActive ? 'text-[#0891b2]' : 'text-gray-400'} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}

          <div className="pt-4 pb-1">
            <p className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Halaman Publik</p>
          </div>
          {guestLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={17} />
            Keluar dari Akun
          </button>
        </div>
      </aside>
    </>
  );
}
