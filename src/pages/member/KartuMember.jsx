import { Stethoscope, Download, Share2, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function KartuMember() {
  const { user } = useAuth();
  
  // Generate ID based on name and timestamp roughly
  const memberId = `DTC-2026-${(user?.name || 'USER').substring(0, 3).toUpperCase()}88`;

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Kartu Member Digital</h1>
        <p className="text-gray-500 text-sm">Tunjukkan kartu ini saat kunjungan untuk mendapatkan diskon.</p>
      </div>

      {/* Kartu Visual */}
      <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-3xl overflow-hidden shadow-2xl group transition-transform hover:-translate-y-2 duration-500">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0891b2] via-[#0e7490] to-[#164e63]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3"></div>

        {/* Card Content */}
        <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                <Stethoscope size={18} className="text-white" />
              </div>
              <span className="text-white font-bold tracking-wide">DentaCare</span>
            </div>
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase">KARTU MEMBER</span>
          </div>

          {/* Middle / Info */}
          <div>
            <div className="w-12 h-8 rounded bg-gradient-to-r from-yellow-200 to-yellow-400 opacity-90 mb-6 flex items-center px-2 shadow-inner">
              <div className="w-full h-4 border border-yellow-600/30 rounded-sm opacity-50"></div>
            </div>
            
            <h2 className="text-2xl font-bold text-white tracking-widest shadow-black/10 drop-shadow-md">
              {memberId}
            </h2>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/60 text-[10px] uppercase mb-1">Nama Pasien</p>
              <p className="text-white font-bold text-lg leading-none">{user?.name || 'Budi Santoso'}</p>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="bg-white p-1 rounded-md mb-2 opacity-90">
                <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-white">
                  <span className="text-[10px] font-bold text-black">QR</span>
                </div>
              </div>
              <p className="text-white/60 text-[8px] uppercase">Berlaku Sejak: Jan 2026</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-[#0891b2] text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-200">
          <Download size={18} /> Unduh Kartu
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
          <Share2 size={18} /> Bagikan
        </button>
      </div>

      {/* Keuntungan */}
      <div className="bg-cyan-50 border border-cyan-100 p-6 rounded-2xl max-w-2xl mx-auto mt-12">
        <h3 className="font-bold text-gray-900 mb-4 text-center">Keuntungan Member Anda</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <CheckCircle className="text-[#0891b2] mx-auto mb-2" size={24} />
            <p className="text-xs font-medium text-gray-700">Diskon Khusus 10%</p>
          </div>
          <div>
            <CheckCircle className="text-[#0891b2] mx-auto mb-2" size={24} />
            <p className="text-xs font-medium text-gray-700">Prioritas Booking</p>
          </div>
          <div>
            <CheckCircle className="text-[#0891b2] mx-auto mb-2" size={24} />
            <p className="text-xs font-medium text-gray-700">Riwayat Digital</p>
          </div>
          <div>
            <CheckCircle className="text-[#0891b2] mx-auto mb-2" size={24} />
            <p className="text-xs font-medium text-gray-700">Support 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
