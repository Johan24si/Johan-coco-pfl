import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Calendar, Wrench,
  LogOut, Stethoscope, ChevronRight, Layers,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/customers', icon: Users, label: 'Pasien' },
  { path: '/orders', icon: Calendar, label: 'Jadwal' },
  { path: '/service', icon: Wrench, label: 'Layanan' },
  { path: '/components', icon: Layers, label: 'Components' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        {/* Mengubah bg-blue-600 menjadi bg-sky-500 */}
        <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center shadow-md shadow-sky-100">
          <Stethoscope size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-900 leading-none">DentaCare</h1>
          <p className="text-[10px] text-gray-400 mt-0.5">Klinik Gigi</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">Menu Utama</p>
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
              ${isActive
                ? 'bg-sky-50 text-sky-600' // Mengubah blue-50 dan blue-600 menjadi sky
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  {/* Mengubah warna icon aktif ke sky-600 */}
                  <Icon size={17} className={isActive ? 'text-sky-600' : 'text-gray-400 group-hover:text-gray-600'} />
                  <span>{label}</span>
                </div>
                {/* Mengubah Chevron aktif ke sky-400 */}
                {isActive && <ChevronRight size={14} className="text-sky-400" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors">
          {/* Mengubah gradient avatar dari blue ke sky */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">Dr. Andi Susanto</p>
            <p className="text-xs text-gray-400 truncate">Dokter Gigi</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Keluar"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}