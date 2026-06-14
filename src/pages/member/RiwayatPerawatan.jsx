import { useState } from 'react';
import { Download, ChevronDown, ChevronUp, FileText, CheckCircle, Pill, Eye, Shield } from 'lucide-react';
import { MOCK_RIWAYAT_DETAIL } from '../../data/memberData';

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-start text-sm gap-4">
      <span className="text-gray-500 flex-shrink-0">{label}</span>
      <span className="font-semibold text-gray-900 text-right">{value}</span>
    </div>
  );
}

export default function RiwayatPerawatan() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('Semua');
  const [search, setSearch] = useState('');

  const years = ['Semua', '2026', '2025'];

  const filtered = MOCK_RIWAYAT_DETAIL.filter(r => {
    const matchYear = filter === 'Semua' || r.date.includes(filter);
    const matchSearch = r.service.toLowerCase().includes(search.toLowerCase()) ||
      r.doc.toLowerCase().includes(search.toLowerCase());
    return matchYear && matchSearch;
  });

  const totalBiaya = MOCK_RIWAYAT_DETAIL.reduce((sum, r) => {
    return sum + parseInt(r.cost.replace(/\D/g, ''));
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Riwayat Perawatan</h1>
          <p className="text-gray-500 text-sm">Catatan lengkap perawatan gigi Anda bersama DentaCare.</p>
        </div>
        <button
          onClick={() => alert('Fitur download PDF segera hadir!')}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 shadow-sm"
        >
          <Download size={16} /> Unduh PDF
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm">
          <p className="text-2xl font-black text-[#0891b2]">{MOCK_RIWAYAT_DETAIL.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total Kunjungan</p>
        </div>
        <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm">
          <p className="text-2xl font-black text-emerald-600">
            +{MOCK_RIWAYAT_DETAIL.reduce((a, b) => a + b.poin, 0)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Total Poin</p>
        </div>
        <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm">
          <p className="text-lg font-black text-gray-900">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalBiaya)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Total Biaya</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Cari layanan atau dokter..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none"
        />
        <div className="flex gap-2">
          {years.map(y => (
            <button
              key={y}
              onClick={() => setFilter(y)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
                filter === y ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-semibold text-gray-700">Tidak ada hasil</p>
          <p className="text-sm text-gray-400 mt-1">Coba ubah kata kunci atau filter tahun</p>
        </div>
      )}

      {/* Records */}
      <div className="space-y-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            {/* Summary Row */}
            <button
              className="w-full p-5 text-left flex items-center gap-4 hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === r.id ? null : r.id)}
            >
              <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText size={22} className="text-[#0891b2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900">{r.service}</h3>
                  {r.bpjs && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full flex items-center gap-1">
                      <Shield size={10} /> BPJS
                    </span>
                  )}
                  {r.hasRontgen && (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full flex items-center gap-1">
                      <Eye size={10} /> Rontgen
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{r.doc} · {r.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-900">{r.cost}</p>
                <div className="flex items-center justify-end gap-1 text-xs text-emerald-600 mt-0.5">
                  <CheckCircle size={11} /> Lunas
                </div>
              </div>
              <div className="ml-2 text-gray-400">
                {expanded === r.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>

            {/* Expanded Detail */}
            {expanded === r.id && (
              <div className="border-t border-gray-100 p-5 space-y-5 bg-gray-50/50">
                {/* Tindakan */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 bg-[#0891b2] text-white rounded-full text-xs flex items-center justify-center">🦷</span>
                    Tindakan yang Dilakukan
                  </h4>
                  <ul className="space-y-2">
                    {r.tindakan.map((t, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Obat */}
                {r.obat.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 bg-purple-500 text-white rounded-full text-xs flex items-center justify-center">💊</span>
                      Resep / Obat
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {r.obat.map((o, i) => (
                        <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 text-sm font-medium rounded-xl border border-purple-100">
                          💊 {o}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Catatan Dokter */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 bg-amber-500 text-white rounded-full text-xs flex items-center justify-center">📝</span>
                    Catatan Dokter
                  </h4>
                  <p className="text-sm text-gray-600 bg-amber-50 border border-amber-100 p-4 rounded-xl italic leading-relaxed">
                    "{r.catatan}"
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold">
                    ⭐ +{r.poin} poin didapatkan
                  </div>
                  {r.hasRontgen && (
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 text-sm font-semibold rounded-xl hover:bg-purple-200 transition-colors">
                      <Eye size={14} /> Lihat Foto Rontgen
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
