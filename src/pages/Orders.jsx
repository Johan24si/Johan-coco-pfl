import { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Calendar, Clock, User, CheckCircle, XCircle, Activity, Eye, FileText, DollarSign, Stethoscope, RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Table from '../components/Table';
import InputField from '../components/InputField';
import { useClickOutside } from '../hooks/useClickOutside';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button as ShadcnButton } from '@/components/ui/button';
import { fetchAllJadwal, updateJadwalStatus } from '../lib/supabaseService';

const statusConfig = {
  completed: { label: 'Selesai', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  pending:   { label: 'Menunggu', bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  confirmed: { label: 'Proses', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  cancelled: { label: 'Batal', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig['pending'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
      {cfg.label}
    </span>
  );
}

const FILTERS = ['Semua', 'completed', 'pending', 'confirmed', 'cancelled'];
const FILTER_LABELS = { Semua: 'Semua', completed: 'Selesai', pending: 'Menunggu', confirmed: 'Proses', cancelled: 'Batal' };

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await fetchAllJadwal();
    if (err) setError(err);
    else setOrders(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const dialogRef = useClickOutside(() => {
    if (dialogOpen) setDialogOpen(false);
  });

  const formatFee = (fee) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(fee);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedOrder) return;
    setStatusUpdating(true);
    const { error } = await updateJadwalStatus(selectedOrder.id, newStatus);
    setStatusUpdating(false);
    
    if (error) {
      alert('Gagal update status: ' + error);
    } else {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: newStatus } : o));
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch = (o.pasien?.nama || '').toLowerCase().includes(q) ||
                        (o.layanan?.nama || '').toLowerCase().includes(q);
    const matchFilter = activeFilter === 'Semua' || o.status === activeFilter;
    return matchSearch && matchFilter;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
        <Loader2 size={32} className="animate-spin text-sky-400" />
        <p className="text-sm">Memuat data jadwal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <AlertCircle size={32} className="text-red-400" />
        <p className="text-sm text-gray-500">{error}</p>
        <Button type="secondary" className="!text-xs gap-1.5" onClick={loadData}>
          <RefreshCw size={13} />Coba Lagi
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Jadwal Kunjungan"
        subtitle={`${orders.length} total jadwal terdaftar`}
        action={
          <div className="flex gap-2">
            <Button type="secondary" onClick={loadData} className="!text-xs gap-1.5"><RefreshCw size={13}/> Refresh</Button>
            <Button type="primary"><Plus size={15} /> Buat Jadwal</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {FILTERS.filter(f => f !== 'Semua').map((status) => {
          const count = orders.filter(o => o.status === status).length;
          const cfg = statusConfig[status];
          return (
            <Card
              key={status}
              className={`!p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${activeFilter === status ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setActiveFilter(status)}
            >
              <p className={`text-2xl font-bold ${cfg.text}`}>{count}</p>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">{FILTER_LABELS[status]}</p>
            </Card>
          );
        })}
      </div>

      <Card className="!p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <Button
                key={f}
                type={activeFilter === f ? 'primary' : 'secondary'}
                className={`!px-3 !py-1.5 !rounded-lg !text-xs !font-medium ${activeFilter !== f ? '!bg-gray-100 !text-gray-600 hover:!bg-gray-200 !border-transparent' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {FILTER_LABELS[f]}
              </Button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
            <InputField
              type="text" placeholder="Cari pasien, perawatan..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="[&_input]:pl-9 [&_input]:py-2 [&_input]:text-xs"
            />
          </div>
        </div>
      </Card>

      <Card noPadding className="overflow-hidden">
        <Table headers={['Pasien', 'Tanggal & Waktu', 'Perawatan', 'Biaya', 'Status', 'Aksi']} className="[&_table]:border-0 [&_thead]:bg-gray-50/50 [&_th]:border-0 [&_th]:py-3.5 [&_th]:px-5 [&_th]:text-xs [&_th]:font-semibold [&_th]:text-gray-500 [&_th]:uppercase [&_th]:tracking-wide">
          {filtered.length === 0 ? (
            <tr><td colSpan={6} className="py-12 text-center text-gray-400 text-sm">Tidak ada jadwal ditemukan</td></tr>
          ) : (
            filtered.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={o.pasien?.nama || '?'} className="!w-8 !h-8 !bg-gradient-to-br !from-blue-400 !to-blue-600 !text-white !text-[11px]" />
                    <span className="font-medium text-gray-800 text-sm">{o.pasien?.nama}</span>
                  </div>
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <Calendar size={13} className="text-gray-400" />{new Date(o.tanggal).toLocaleDateString('id-ID')}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                    <Clock size={11} className="text-gray-300" />{o.jam_mulai}
                  </div>
                </td>
                <td className="py-3.5 px-5">
                  <p className="text-sm font-medium text-gray-800">{o.layanan?.nama}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[140px]">{o.catatan || '-'}</p>
                </td>
                <td className="py-3.5 px-5">
                  <span className="text-sm font-semibold text-gray-800">{formatFee(o.layanan?.harga || 0)}</span>
                </td>
                <td className="py-3.5 px-5">
                  <StatusBadge status={o.status} />
                </td>
                <td className="py-3.5 px-5">
                  <button onClick={() => handleViewOrder(o)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors">
                    <Eye size={12} /> Detail
                  </button>
                </td>
              </tr>
            ))
          )}
        </Table>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Stethoscope size={18} className="text-sky-500" /> Detail Kunjungan
                </DialogTitle>
                <DialogDescription>Informasi lengkap untuk jadwal pasien</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Avatar name={selectedOrder.pasien?.nama} className="!w-11 !h-11 !bg-gradient-to-br !from-sky-400 !to-sky-600 !text-white !text-sm" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{selectedOrder.pasien?.nama}</p>
                    <p className="text-xs text-gray-500">{selectedOrder.pasien?.telepon || '-'}</p>
                  </div>
                  <div className="ml-auto"><StatusBadge status={selectedOrder.status} /></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0 mt-0.5"><Stethoscope size={13} className="text-sky-500" /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Perawatan</p>
                      <p className="text-xs font-semibold text-gray-800 mt-0.5">{selectedOrder.layanan?.nama}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5"><Calendar size={13} className="text-amber-500" /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Tanggal</p>
                      <p className="text-xs font-semibold text-gray-800 mt-0.5">{new Date(selectedOrder.tanggal).toLocaleDateString('id-ID')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-50 to-cyan-50 rounded-xl border border-sky-100/50">
                  <div className="flex items-center gap-2"><DollarSign size={15} className="text-sky-600" /> <span className="text-xs text-gray-600 font-medium">Total Biaya</span></div>
                  <span className="text-base font-bold text-sky-700">{formatFee(selectedOrder.layanan?.harga || 0)}</span>
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                <select 
                  className="px-3 py-2 border rounded-md text-sm outline-none focus:border-sky-500"
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={statusUpdating}
                >
                  <option value="pending">Menunggu (Pending)</option>
                  <option value="confirmed">Proses (Confirmed)</option>
                  <option value="completed">Selesai (Completed)</option>
                  <option value="cancelled">Batal (Cancelled)</option>
                </select>
                {statusUpdating && <Loader2 size={16} className="animate-spin text-gray-400" />}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
