import { useState } from 'react';
import { Search, Plus, Calendar, Clock, User, CheckCircle, XCircle, Activity } from 'lucide-react';
import { orders } from '../data/orders';
import PageHeader from '../components/PageHeader';

const statusConfig = {
  Selesai: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  Menunggu: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  Proses: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  Batal: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig['Menunggu'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
      {status}
    </span>
  );
}

const FILTERS = ['Semua', 'Selesai', 'Menunggu', 'Proses', 'Batal'];

export default function Orders() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.patientName.toLowerCase().includes(search.toLowerCase()) ||
      o.treatment.toLowerCase().includes(search.toLowerCase()) ||
      o.doctor.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'Semua' || o.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const formatFee = (fee) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(fee);

  return (
    <div>
      <PageHeader
        title="Jadwal Kunjungan"
        subtitle={`${orders.length} total jadwal terdaftar`}
        action={
          <button className="btn-primary">
            <Plus size={15} /> Buat Jadwal
          </button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {FILTERS.filter(f => f !== 'Semua').map((status) => {
          const count = orders.filter(o => o.status === status).length;
          const cfg = statusConfig[status];
          return (
            <div
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`card p-4 cursor-pointer transition-all duration-200 hover:shadow-card-hover ${activeFilter === status ? 'ring-2 ring-blue-500' : ''}`}
            >
              <p className={`text-2xl font-bold ${cfg.text}`}>{count}</p>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">{status}</p>
            </div>
          );
        })}
      </div>

      {/* Filters + Search */}
      <div className="card p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeFilter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pasien, perawatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 py-2 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {['ID', 'Pasien', 'Tanggal & Waktu', 'Perawatan', 'Dokter', 'Biaya', 'Status'].map((h) => (
                  <th key={h} className="text-left py-3.5 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 text-sm">Tidak ada jadwal ditemukan</td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{o.id}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                          {o.avatar}
                        </div>
                        <span className="font-medium text-gray-800 text-sm">{o.patientName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <Calendar size={13} className="text-gray-400" />{o.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                        <Clock size={11} className="text-gray-300" />{o.time} · {o.duration}
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <p className="text-sm font-medium text-gray-800">{o.treatment}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[140px]">{o.notes}</p>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <User size={12} className="text-gray-400" />
                        <span className="text-xs">{o.doctor.replace('Dr. ', '')}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="text-sm font-semibold text-gray-800">{formatFee(o.fee)}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3.5 border-t border-gray-50 bg-gray-50/30">
          <p className="text-xs text-gray-400">Menampilkan {filtered.length} dari {orders.length} jadwal</p>
        </div>
      </div>
    </div>
  );
}
