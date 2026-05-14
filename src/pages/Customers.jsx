import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Eye, Phone, Mail, Filter, CheckCircle, Clock, Activity, XCircle } from 'lucide-react';
import { customers } from '../data/customers';
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

export default function Customers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.treatment.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'Semua' || c.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <PageHeader
        title="Data Pasien"
        subtitle={`${customers.length} total pasien terdaftar`}
        action={
          <button className="btn-primary">
            <Plus size={15} /> Tambah Pasien
          </button>
        }
      />

      {/* Filters + Search */}
      <div className="card p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeFilter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              placeholder="Cari nama, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9 py-2 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left py-3.5 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pasien</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Kontak</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Kunjungan Terakhir</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Perawatan</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-sm">
                    Tidak ada pasien ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {c.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{c.name}</p>
                          <p className="text-xs text-gray-400">{c.gender} · {c.age} tahun</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Mail size={11} className="text-gray-400" />{c.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Phone size={11} className="text-gray-300" />{c.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden lg:table-cell">
                      <p className="text-sm text-gray-700">{c.lastVisit}</p>
                      <p className="text-xs text-gray-400">{c.totalVisits}x kunjungan</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-sm text-gray-700 font-medium">{c.treatment}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => navigate(`/customers/${c.id}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Eye size={12} /> Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3.5 border-t border-gray-50 bg-gray-50/30">
          <p className="text-xs text-gray-400">Menampilkan {filtered.length} dari {customers.length} pasien</p>
        </div>
      </div>
    </div>
  );
}
