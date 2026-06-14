import { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';

const STATUS_FLOW = [
  { id: 'confirmed', label: 'Booking Diterima', icon: '📋', desc: 'Jadwal kunjungan Anda telah dikonfirmasi oleh klinik.', color: 'bg-blue-500', lightColor: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'waiting', label: 'Sedang Menunggu', icon: '⏳', desc: 'Anda dalam antrian. Harap datang 10 menit lebih awal.', color: 'bg-amber-500', lightColor: 'bg-amber-50 border-amber-200 text-amber-700' },
  { id: 'examining', label: 'Sedang Diperiksa', icon: '🦷', desc: 'Dokter sedang memeriksa dan melakukan perawatan.', color: 'bg-purple-500', lightColor: 'bg-purple-50 border-purple-200 text-purple-700' },
  { id: 'followup', label: 'Tindak Lanjut', icon: '💊', desc: 'Menunggu resep obat atau tindakan lanjutan dari dokter.', color: 'bg-orange-500', lightColor: 'bg-orange-50 border-orange-200 text-orange-700' },
  { id: 'done', label: 'Selesai', icon: '✅', desc: 'Perawatan selesai. Terima kasih telah mempercayai DentaCare!', color: 'bg-green-500', lightColor: 'bg-green-50 border-green-200 text-green-700' },
];

const MOCK_VISITS = [
  { id: 'T001', service: 'Kontrol Behel', doc: 'Dr. Andi Susanto', date: 'Selasa, 16 Jun 2026', time: '10.30 WIB', status: 'confirmed', noAntrian: 5 },
  { id: 'T002', service: 'Pembersihan Gigi', doc: 'Dr. Rina Melati', date: 'Senin, 22 Jun 2026', time: '14.00 WIB', status: 'waiting', noAntrian: 12 },
];

export default function TrackingStatus() {
  const [selected, setSelected] = useState(MOCK_VISITS[0]);

  const currentIdx = STATUS_FLOW.findIndex(s => s.id === selected.status);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Tracking Kunjungan</h1>
        <p className="text-gray-500 text-sm">Pantau status kunjungan Anda secara real-time.</p>
      </div>

      {/* Visit selector */}
      <div className="grid sm:grid-cols-2 gap-4">
        {MOCK_VISITS.map(v => (
          <button
            key={v.id}
            onClick={() => setSelected(v)}
            className={`text-left p-5 rounded-2xl border-2 transition-all ${
              selected.id === v.id
                ? 'border-[#0891b2] bg-cyan-50'
                : 'border-gray-100 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">#{v.id}</span>
              {selected.id === v.id && <CheckCircle size={16} className="text-[#0891b2]" />}
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{v.service}</h3>
            <p className="text-sm text-gray-500">{v.doc}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Clock size={12} />{v.time}</span>
              <span>{v.date}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Status Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{selected.service}</h2>
            <p className="text-gray-500 text-sm">{selected.doc} · {selected.date}</p>
          </div>
          <div className="text-center bg-[#0891b2] text-white rounded-2xl px-4 py-3">
            <p className="text-xs font-medium mb-0.5">No. Antrian</p>
            <p className="text-2xl font-black">{selected.noAntrian}</p>
          </div>
        </div>

        {/* Current Status Badge */}
        <div className={`flex items-center gap-3 p-4 rounded-2xl border mb-8 ${STATUS_FLOW[currentIdx]?.lightColor}`}>
          <span className="text-2xl">{STATUS_FLOW[currentIdx]?.icon}</span>
          <div>
            <p className="font-bold">{STATUS_FLOW[currentIdx]?.label}</p>
            <p className="text-sm opacity-80">{STATUS_FLOW[currentIdx]?.desc}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {STATUS_FLOW.map((s, i) => {
            const isDone = i < currentIdx;
            const isCurrent = i === currentIdx;
            const isPending = i > currentIdx;

            return (
              <div key={s.id} className="flex gap-4 items-start">
                {/* Indicator */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all ${
                    isDone ? 'bg-green-500 border-green-500 text-white'
                    : isCurrent ? `${s.color} border-transparent text-white ring-4 ring-offset-2 ring-cyan-200`
                    : 'bg-gray-100 border-gray-200 text-gray-400'
                  }`}>
                    {isDone ? '✓' : s.icon}
                  </div>
                  {i < STATUS_FLOW.length - 1 && (
                    <div className={`w-0.5 h-8 mt-1 ${isDone || isCurrent ? 'bg-[#0891b2]' : 'bg-gray-200'}`} />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-4 flex-1 ${isPending ? 'opacity-40' : ''}`}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`font-bold text-sm ${isCurrent ? 'text-[#0891b2]' : isDone ? 'text-green-700' : 'text-gray-500'}`}>
                      {s.label}
                    </p>
                    {isCurrent && (
                      <span className="w-2 h-2 bg-[#0891b2] rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-6 flex items-start gap-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl">
          <AlertCircle size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Status diperbarui secara real-time oleh petugas klinik. Harap tunggu panggilan dari dokter.
          </p>
        </div>
      </div>
    </div>
  );
}
