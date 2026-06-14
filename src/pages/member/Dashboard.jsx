import { useState } from 'react';
import { Calendar, Clock, ArrowRight, UserPlus, FileText, CheckCircle, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  // Form Booking State
  const [booking, setBooking] = useState({ dokter: '', layanan: '', tanggal: '', waktu: '' });
  
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!booking.dokter || !booking.layanan || !booking.tanggal || !booking.waktu) {
      showToast('Harap lengkapi semua data booking!');
      return;
    }
    showToast('Jadwal berhasil dibooking!');
    setBooking({ dokter: '', layanan: '', tanggal: '', waktu: '' });
  };

  const todayStr = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  const slots = ['08.00', '09.00', '10.00', '11.00', '13.00', '14.00', '15.00', '16.00'];

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-8 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-5">
          <CheckCircle size={20} className="text-green-400" />
          <p className="font-medium text-sm">{toastMessage}</p>
        </div>
      )}

      {/* Greeting Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Selamat datang, {user?.name.split(' ')[0]}! 👋</h1>
        <p className="text-gray-500">{todayStr}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Kartu Jadwal Berikutnya */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-200/50 rounded-full blur-3xl"></div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-[#0891b2] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">Jadwal Berikutnya</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Kontrol Behel</h3>
                <p className="text-gray-600 font-medium mb-4 flex items-center gap-2">
                  <UserPlus size={16} className="text-[#0891b2]" /> Dr. Andi Susanto
                </p>
                <div className="flex items-center gap-4 text-sm font-semibold text-gray-800 bg-white px-4 py-2.5 rounded-xl border border-cyan-50 inline-flex shadow-sm">
                  <span className="flex items-center gap-2"><Calendar size={16} className="text-[#0891b2]" /> Selasa, 16 Juni 2026</span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-2"><Clock size={16} className="text-[#0891b2]" /> 10.30 WIB</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 min-w-[140px]">
                <div className="text-center mb-1">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">Terkonfirmasi</span>
                </div>
                <Link to="/member/jadwal" className="px-4 py-2.5 bg-white text-gray-800 text-sm font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-center shadow-sm">
                  Lihat Detail
                </Link>
                <button className="px-4 py-2.5 text-red-500 text-sm font-bold rounded-xl hover:bg-red-50 transition-colors text-center">
                  Batalkan Jadwal
                </button>
              </div>
            </div>
          </div>

          {/* Form Booking Cepat */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-[#0891b2]">
                <Plus size={18} />
              </span>
              Booking Jadwal Baru
            </h2>
            
            <form onSubmit={handleBooking} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dokter Spesialis</label>
                  <select value={booking.dokter} onChange={e => setBooking({...booking, dokter: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all">
                    <option value="">Pilih Dokter</option>
                    <option value="Dr. Andi Susanto">Dr. Andi Susanto (Gigi Umum)</option>
                    <option value="Dr. Rina Melati">Dr. Rina Melati (Orthodontis)</option>
                    <option value="Dr. Budi Santoso">Dr. Budi Santoso (Bedah Mulut)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Layanan Perawatan</label>
                  <select value={booking.layanan} onChange={e => setBooking({...booking, layanan: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all">
                    <option value="">Pilih Layanan</option>
                    <option value="Scaling">Pembersihan Gigi (Scaling)</option>
                    <option value="Tambal">Tambal Gigi</option>
                    <option value="Cabut">Cabut Gigi</option>
                    <option value="Behel">Konsultasi / Kontrol Behel</option>
                    <option value="Pemutihan">Pemutihan Gigi (Bleaching)</option>
                    <option value="Akar">Perawatan Saluran Akar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                <input type="date" value={booking.tanggal} onChange={e => setBooking({...booking, tanggal: e.target.value})} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Waktu Tersedia</label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {slots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setBooking({...booking, waktu: slot})}
                      className={`py-2 rounded-lg text-sm font-medium transition-colors border ${
                        booking.waktu === slot 
                          ? 'bg-[#0891b2] text-white border-[#0891b2]' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-[#0891b2] hover:text-[#0891b2]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button type="submit" className="w-full py-3.5 bg-[#0891b2] text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-100">
                  Konfirmasi Booking
                </button>
              </div>
            </form>
          </div>
          
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Statistik */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-sm mb-1">Total Kunjungan</p>
              <p className="text-2xl font-bold text-gray-900">8<span className="text-sm font-normal text-gray-400 ml-1">kali</span></p>
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-sm mb-1">Status Member</p>
              <p className="text-lg font-bold text-emerald-600">Aktif</p>
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm col-span-2">
              <p className="text-gray-500 text-sm mb-1">Kunjungan Terakhir</p>
              <p className="text-lg font-bold text-gray-900">12 Mei 2026</p>
            </div>
          </div>

          {/* Riwayat Terakhir */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">Riwayat Terakhir</h2>
              <Link to="/member/riwayat" className="text-sm text-[#0891b2] hover:underline font-medium">Lihat semua</Link>
            </div>

            <div className="space-y-4">
              {[
                { date: '12 Mei 2026', title: 'Pembersihan Gigi', doc: 'Dr. Rina Melati' },
                { date: '10 Apr 2026', title: 'Konsultasi Behel', doc: 'Dr. Andi Susanto' },
                { date: '15 Mar 2026', title: 'Tambal Gigi', doc: 'Dr. Budi Santoso' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-[#0891b2]">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500 mb-1">{item.doc}</p>
                    <p className="text-[11px] font-medium text-gray-400">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
