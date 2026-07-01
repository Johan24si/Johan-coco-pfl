import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, ClipboardList, CreditCard,
  LogOut, User, Menu, X, Star, Tag, Bell, MapPin, Stethoscope, ChevronDown
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';

const mainNavItems = [
  { path: '/member/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/member/jadwal', icon: Calendar, label: 'Jadwal' },
  { path: '/member/riwayat', icon: ClipboardList, label: 'Riwayat' },
  { path: '/member/loyalty', icon: Star, label: 'Loyalty Point' },
];

const moreNavItems = [
  { path: '/member/voucher', icon: Tag, label: 'Voucher Saya' },
  { path: '/member/tracking', icon: MapPin, label: 'Tracking Kunjungan' },
  { path: '/member/notifikasi', icon: Bell, label: 'Notifikasi & CRM' },
  { path: '/member/kartu', icon: CreditCard, label: 'Kartu Member' },
  { path: '/member/profil', icon: User, label: 'Profil' },
];

export default function MemberNavbar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const moreDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setMoreDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/guest" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#0891b2] rounded-xl flex items-center justify-center flex-shrink-0">
              <Stethoscope size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-none">DentaCare</p>
              <p className="text-[10px] text-gray-400">Patient Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {mainNavItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-cyan-50 text-[#0891b2]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Dropdown More */}
            <div className="relative ml-1" ref={moreDropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition-colors ${
                  moreDropdownOpen || moreNavItems.some(i => window.location.pathname === i.path)
                    ? 'bg-cyan-50 text-[#0891b2]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Lainnya <ChevronDown size={14} />
              </button>
              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                  {moreNavItems.map(({ path, icon: Icon, label }) => (
                    <NavLink
                      key={path}
                      to={path}
                      onClick={() => setMoreDropdownOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          isActive
                            ? 'text-[#0891b2] bg-cyan-50/50 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      <Icon size={16} />
                      {label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* User & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0891b2] to-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {getInitials(user?.name)}
                </div>
                <span className="text-sm font-semibold text-gray-700">{user?.name ? user.name.split(' ')[0] : 'Akun'}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 flex flex-col">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <NavLink to="/member/profil" onClick={() => setProfileDropdownOpen(false)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <User size={16} /> Edit Profil
                  </NavLink>
                  <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 w-full text-left">
                    <LogOut size={16} /> Keluar
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 absolute w-full shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0891b2] to-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {getInitials(user?.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 py-1">Menu Utama</p>
            {[...mainNavItems, ...moreNavItems].map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-cyan-50 text-[#0891b2]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Icon size={18} className={window.location.pathname === path ? 'text-[#0891b2]' : 'text-gray-400'} />
                {label}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut size={18} />
              Keluar dari Akun
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
