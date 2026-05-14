import { Outlet, Navigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';

export default function AuthLayout() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/30 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-300/40 blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Stethoscope size={20} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl">DentaCare</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Kelola Klinik Gigi<br />dengan Lebih Mudah
          </h2>
          <p className="text-blue-200 text-base leading-relaxed">
            Platform manajemen klinik gigi terpadu untuk dokter dan staf agar lebih produktif dan efisien.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: '500+', label: 'Pasien Aktif' },
            { value: '98%', label: 'Kepuasan' },
            { value: '10th', label: 'Berpengalaman' },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-blue-200 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope size={16} className="text-white" />
            </div>
            <span className="text-blue-600 font-bold text-lg">DentaCare</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
