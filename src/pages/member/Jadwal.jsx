import { useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';

const MOCK_JADWAL = [
  { id: 1, type: 'Mendatang', date: 'Selasa, 16 Juni 2026', time: '10.30 WIB', doc: 'Dr. Andi Susanto', service: 'Kontrol Behel', status: 'Terkonfirmasi', color: 'bg-green-100 text-green-700' },
  { id: 2, type: 'Mendatang', date: 'Senin, 22 Juni 2026', time: '14.00 WIB', doc: 'Dr. Rina Melati', service: 'Pembersihan Gigi', status: 'Menunggu', color: 'bg-amber-100 text-amber-700' },
  { id: 3, type: 'Selesai', date: '12 Mei 2026', time: '09.00 WIB', doc: 'Dr. Rina Melati', service: 'Pembersihan Gigi', status: 'Selesai', color: 'bg-blue-100 text-blue-700' },
  { id: 4, type: 'Selesai', date: '10 Apr 2026', time: '11.00 WIB', doc: 'Dr. Andi Susanto', service: 'Konsultasi Behel', status: 'Selesai', color: 'bg-blue-100 text-blue-700' },
  { id: 5, type: 'Dibatalkan', date: '05 Mar 2026', time: '15.00 WIB', doc: 'Dr. Budi Santoso', service: 'Cabut Gigi', status: 'Dibatalkan', color: 'bg-red-100 text-red-700' },
];

export default function Jadwal() {
  const [tab, setTab] = useState('Mendatang');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const filtered = MOCK_JADWAL.filter(j => j.type === tab);

  const openCancelModal = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmCancel = () => {
    alert("Jadwal berhasil dibatalkan.");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Jadwal Saya</h1>
        <p className="text-gray-500 text-sm">Kelola jadwal kunjungan Anda ke DentaCare.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-6">
        {['Mendatang', 'Selesai', 'Dibatalkan'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-[#0891b2] text-[#0891b2]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Calendar size={24} />
            </div>
            <p className="text-gray-500 font-medium">Tidak ada jadwal {tab.toLowerCase()}.</p>
          </div>
        ) : (
          filtered.map(j => (
            <div key={j.id} className="bg-white border border-gray-100 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="flex gap-5 items-start md:items-center">
                <div className="w-16 h-16 bg-cyan-50 rounded-xl flex flex-col items-center justify-center text-[#0891b2] flex-shrink-0">
                  <span className="text-xs font-bold uppercase">{j.date.split(' ')[1] ? j.date.split(' ')[0].replace(',', '') : j.date.split(' ')[1]}</span>
                  <span className="text-xl font-black leading-none">{j.date.split(' ')[1] || j.date.split(' ')[0]}</span>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${j.color}`}>{j.status}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{j.service}</h3>
                  <p className="text-gray-500 text-sm mb-2">{j.doc}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-600">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-400" /> {j.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-gray-400" /> {j.time}</span>
                  </div>
                </div>
              </div>

              {tab === 'Mendatang' && (
                <div className="flex items-center gap-3 md:border-l md:border-gray-100 md:pl-6">
                  <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">Ubah</button>
                  <button onClick={() => openCancelModal(j.id)} className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100">Batal</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal Batal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Batalkan Jadwal?</h3>
            <p className="text-sm text-gray-500 mb-6">Apakah Anda yakin ingin membatalkan jadwal ini? Tindakan ini tidak dapat diurungkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50">Tutup</button>
              <button onClick={confirmCancel} className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700">Ya, Batalkan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
