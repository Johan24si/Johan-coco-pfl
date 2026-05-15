import { Outlet, Navigate } from 'react-router-dom';
import klinikImg from '../assets/dentacare.jpg';

export default function AuthLayout() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex">
      {/* ── Panel Kiri: Foto dengan Overlay Biru Baru ── */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src={klinikImg}
          alt="Klinik"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Menggunakan bg-[#22a1c4] atau sky-500 untuk mencocokkan gambar */}
        <div className="absolute inset-0 bg-[#22a1c4]/40 mix-blend-multiply" /> 
      </div>

      {/* ── Panel Kanan: Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-sm">
          {/* Outlet berisi form login/register */}
          <Outlet />
        </div>
        
        {/* Teks footer dengan aksen warna biru yang senada */}
        <p className="mt-8 text-xs text-gray-400 text-center">
          Dengan masuk, Anda menyetujui{' '}
          <span className="underline cursor-pointer text-[#22a1c4] hover:text-[#1a7d99] font-medium">
            Syarat Layanan
          </span>{' '}
          dan{' '}
          <span className="underline cursor-pointer text-[#22a1c4] hover:text-[#1a7d99] font-medium">
            Kebijakan Privasi
          </span>{' '}
          kami.
        </p>
      </div>
    </div>
  );
}