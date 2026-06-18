import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Stethoscope, Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // useRef: menyimpan referensi ke elemen DOM dropdown profile
  // agar bisa mendeteksi klik di luar area dropdown
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect + useRef: menutup dropdown profile saat klik di luar elemennya
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/guest/login');
  };

  const isGuestPage = location.pathname === '/';

  // Only show this navbar on the guest page and auth pages, NOT on the dashboard where there are sidebars.
  // Actually, we show it on the landing page primarily.
  
  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/80 backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/guest" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0891b2] rounded-xl flex items-center justify-center shadow-md">
              <Stethoscope size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">DentaCare</h1>
              <p className="text-[11px] text-gray-500 mt-0.5">Klinik Gigi</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/guest" className="text-gray-600 hover:text-[#0891b2] font-medium transition-colors text-sm">Beranda</Link>
            <Link to="/guest/layanan" className="text-gray-600 hover:text-[#0891b2] font-medium transition-colors text-sm">Layanan</Link>
            <Link to="/guest/promo" className="text-gray-600 hover:text-[#0891b2] font-medium transition-colors text-sm">Promo</Link>
            <Link to="/guest/booking" className="text-gray-600 hover:text-[#0891b2] font-medium transition-colors text-sm">Booking</Link>
            <Link to="/guest/tentang" className="text-gray-600 hover:text-[#0891b2] font-medium transition-colors text-sm">Tentang</Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/guest/login" className="px-5 py-2.5 text-sm font-semibold text-[#0891b2] bg-white border border-[#0891b2] rounded-lg hover:bg-cyan-50 transition-colors">
                  Login
                </Link>
                <Link to="/guest/register" className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0891b2] rounded-lg shadow-md hover:bg-cyan-700 transition-colors">
                  Daftar
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileDropdownRef}>
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 p-1 pr-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0891b2] text-white flex items-center justify-center font-semibold text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name ? user.name.split(' ')[0] : 'Akun'}</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 flex flex-col z-50">
                    {user.role === 'admin' ? (
                      <Link to="/dashboard" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <LayoutDashboard size={16} /> Dashboard Klinik
                      </Link>
                    ) : (
                      <>
                        <Link to="/member/dashboard" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <LayoutDashboard size={16} /> Dashboard Pasien
                        </Link>
                        <Link to="/member/profil" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <User size={16} /> Profil Pasien
                        </Link>
                      </>
                    )}
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 w-full text-left"
                    >
                      <LogOut size={16} /> Keluar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-600 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 absolute w-full shadow-lg">
          {!user && isGuestPage && (
            <div className="flex flex-col gap-4 mb-6">
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-800">Beranda</a>
              <a href="#layanan" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-800">Layanan</a>
              <a href="#dokter" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-800">Dokter</a>
            </div>
          )}
          
          <div className="flex flex-col gap-3">
            {!user ? (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-500 font-medium px-1">Masuk / Daftar</p>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/guest/login" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-center text-sm font-semibold text-[#0891b2] border border-[#0891b2] rounded-lg">Masuk Pasien</Link>
                  <Link to="/guest/register" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-center text-sm font-semibold text-white bg-[#0891b2] rounded-lg">Daftar Pasien</Link>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-center text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">Login Klinik</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="py-2.5 text-center text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">Daftar Klinik</Link>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#0891b2] text-white flex items-center justify-center font-semibold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name || 'Akun'}</p>
                    <p className="text-sm text-gray-500">{user.email || ''}</p>
                  </div>
                </div>
                {user.role === 'admin' ? (
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-800 flex items-center gap-3"><LayoutDashboard size={18} /> Dashboard Klinik</Link>
                ) : (
                  <>
                    <Link to="/member/dashboard" onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-800 flex items-center gap-3"><LayoutDashboard size={18} /> Dashboard Pasien</Link>
                    <Link to="/member/profil" onClick={() => setMobileMenuOpen(false)} className="py-2 text-gray-800 flex items-center gap-3"><User size={18} /> Profil Pasien</Link>
                  </>
                )}
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="py-2 text-red-600 text-left flex items-center gap-3"><LogOut size={18} /> Keluar</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
