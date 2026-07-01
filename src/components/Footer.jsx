import { Stethoscope } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#0891b2] rounded-xl flex items-center justify-center">
              <Stethoscope size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-none">DentaCare</h1>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-6">Senyum Sehat, Hidup Lebih Baik. Memberikan pelayanan dokter gigi terbaik untuk Anda dan keluarga.</p>
        </div>
        
        <div>
          <h3 className="text-white font-bold mb-6">Layanan</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Pembersihan Gigi</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tambal Gigi</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cabut Gigi</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Orthodonti (Behel)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pemutihan Gigi</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-bold mb-6">Jam Operasional</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span>Senin - Jumat:</span> <span className="text-white">08.00 - 20.00</span></li>
            <li className="flex justify-between"><span>Sabtu:</span> <span className="text-white">09.00 - 15.00</span></li>
            <li className="flex justify-between"><span>Minggu:</span> <span className="text-red-400">Tutup</span></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-bold mb-6">Kontak</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="mt-1 font-bold text-[#0891b2]">WA</span>
              <span>0812-3456-7890</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 font-bold text-[#0891b2]">@</span>
              <span>info@dentacare.com</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 font-bold text-[#0891b2]">📍</span>
              <span>Jl. Sehat Selalu No. 88, Jakarta Selatan 12345</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
        © 2026 DentaCare - Klinik Gigi. All rights reserved.
      </div>
    </footer>
  );
}
