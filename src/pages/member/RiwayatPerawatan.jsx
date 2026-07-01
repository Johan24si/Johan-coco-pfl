import { useState, useEffect } from 'react';
import { Download, ChevronDown, ChevronUp, FileText, CheckCircle, Eye, Shield, Loader2, AlertCircle } from 'lucide-react';
import { fetchMyJadwal } from '../../lib/supabaseService';

export default function RiwayatPerawatan() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('Semua');
  const [search, setSearch] = useState('');
  
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { data, error } = await fetchMyJadwal();
      if (error) {
        setError(error);
      } else {
        // Hanya ambil yang sudah selesai (completed)
        setRiwayat(data?.filter(j => j.status === 'completed') || []);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const years = ['Semua', ...new Set(riwayat.map(r => new Date(r.tanggal).getFullYear().toString()))];

  const filtered = riwayat.filter(r => {
    const yearStr = new Date(r.tanggal).getFullYear().toString();
    const matchYear = filter === 'Semua' || yearStr === filter;
    const matchSearch = r.layanan?.nama?.toLowerCase().includes(search.toLowerCase());
    return matchYear && matchSearch;
  });

  const totalBiaya = filtered.reduce((sum, r) => sum + (r.layanan?.harga || 0), 0);
  const totalPoin = filtered.reduce((sum, r) => sum + (r.poin_didapat || 0), 0);

  const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  if (loading) {
    return <div className="flex items-center justify-center py-24"><Loader2 size={32} className="animate-spin text-cyan-600" /></div>;
  }

  if (error) {
    return <div className="flex flex-col items-center justify-center py-24 gap-3 text-red-500"><AlertCircle size={32} /> <p>{error}</p></div>;
  }

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
          <p className="text-2xl font-black text-[#0891b2]">{filtered.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total Kunjungan</p>
        </div>
        <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm">
          <p className="text-2xl font-black text-emerald-600">+{totalPoin}</p>
          <p className="text-xs text-gray-500 mt-1">Total Poin</p>
        </div>
        <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm">
          <p className="text-lg font-black text-gray-900">{formatRupiah(totalBiaya)}</p>
          <p className="text-xs text-gray-500 mt-1">Total Biaya</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Cari nama layanan..."
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
          <p className="font-semibold text-gray-700">Tidak ada riwayat</p>
          <p className="text-sm text-gray-400 mt-1">Belum ada catatan perawatan yang selesai.</p>
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
                  <h3 className="font-bold text-gray-900">{r.layanan?.nama}</h3>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                    Selesai
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(r.tanggal).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-900">{formatRupiah(r.layanan?.harga || 0)}</p>
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
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 bg-amber-500 text-white rounded-full text-xs flex items-center justify-center">📝</span>
                    Catatan Perawatan
                  </h4>
                  <p className="text-sm text-gray-600 bg-amber-50 border border-amber-100 p-4 rounded-xl italic leading-relaxed">
                    "{r.catatan || 'Tidak ada catatan khusus.'}"
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold">
                    ⭐ +{r.poin_didapat || 0} poin didapatkan
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
