import { useState } from 'react';
import { Download, CheckCircle, FileText } from 'lucide-react';

const MOCK_RIWAYAT = [
  { id: 1, date: '12 Mei 2026', doc: 'Dr. Rina Melati', service: 'Pembersihan Gigi', notes: 'Karang gigi ringan, gusi sehat.', cost: 'Rp 150.000', status: 'Lunas' },
  { id: 2, date: '10 Apr 2026', doc: 'Dr. Andi Susanto', service: 'Konsultasi Behel', notes: 'Rencana pemasangan kawat gigi atas bawah.', cost: 'Rp 200.000', status: 'Lunas' },
  { id: 3, date: '15 Mar 2026', doc: 'Dr. Budi Santoso', service: 'Tambal Gigi', notes: 'Tambalan komposit gigi geraham belakang.', cost: 'Rp 350.000', status: 'Lunas' },
  { id: 4, date: '05 Feb 2026', doc: 'Dr. Andi Susanto', service: 'Pemeriksaan Rutin', notes: 'Gigi berlubang kecil, perlu ditambal.', cost: 'Rp 100.000', status: 'Lunas' },
  { id: 5, date: '12 Nov 2025', doc: 'Dr. Rina Melati', service: 'Pembersihan Gigi', notes: 'Pembersihan tahunan selesai.', cost: 'Rp 150.000', status: 'Lunas' },
];

export default function Riwayat() {
  const [filter, setFilter] = useState('Semua');

  const handleDownload = () => {
    alert("Fitur segera hadir");
  };

  const filtered = filter === 'Semua' 
    ? MOCK_RIWAYAT 
    : MOCK_RIWAYAT.filter(r => r.date.includes(filter));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Riwayat Perawatan</h1>
          <p className="text-gray-500 text-sm">Catatan lengkap perawatan gigi Anda.</p>
        </div>
        <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 shadow-sm">
          <Download size={16} /> Unduh PDF
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['Semua', '2026', '2025'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${filter === f ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table/List */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Perawatan</th>
                <th className="px-6 py-4 font-medium">Dokter</th>
                <th className="px-6 py-4 font-medium">Catatan</th>
                <th className="px-6 py-4 font-medium text-right">Biaya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-[#0891b2]" />
                      {r.service}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{r.doc}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 min-w-[200px]">{r.notes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-bold text-gray-900">{r.cost}</div>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-600 font-medium mt-0.5">
                      <CheckCircle size={10} /> {r.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
             <div className="text-center py-12 text-gray-500">Tidak ada riwayat untuk filter ini.</div>
          )}
        </div>
      </div>
    </div>
  );
}
