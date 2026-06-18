import { useState } from 'react';
import { Search, Plus, Calendar, Clock, User, CheckCircle, XCircle, Activity, Eye, FileText, DollarSign, Stethoscope } from 'lucide-react';
import { orders } from '../data/orders';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Table from '../components/Table';
import InputField from '../components/InputField';

// ✅ Import 3 custom hooks yang sudah dibuat
import { useSearch } from '../hooks/useSearch';           // Hook 1: useState
import { useLocalStorage } from '../hooks/useLocalStorage'; // Hook 2: useEffect + useState
import { useClickOutside } from '../hooks/useClickOutside'; // Hook 3: useRef + useEffect
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button as ShadcnButton } from '@/components/ui/button';

const statusConfig = {
  Selesai: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  Menunggu: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  Proses: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  Batal: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

const STATUS_BADGE_TYPE = {
  Selesai: 'success',
  Menunggu: 'warning',
  Proses: 'primary',
  Batal: 'danger',
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
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  /**
   * 🔵 HOOK 1 — useSearch (menggunakan useState di dalamnya)
   * Mengelola state pencarian & filter sekaligus, dan
   * mengembalikan data yang sudah difilter secara otomatis.
   */
  const { search, setSearch, activeFilter, setActiveFilter, filtered } = useSearch(
    orders,
    ['patientName', 'treatment', 'doctor'], // field yang dicari
    'Semua'                                  // filter awal
  );

  /**
   * 🟢 HOOK 2 — useLocalStorage (menggunakan useState + useEffect di dalamnya)
   * Menyimpan filter terakhir yang dipilih user ke localStorage,
   * sehingga saat halaman di-refresh, filter tidak reset ke 'Semua'.
   */
  const [savedFilter, setSavedFilter] = useLocalStorage('orders_last_filter', 'Semua');

  /**
   * 🔴 HOOK 3 — useClickOutside (menggunakan useRef + useEffect di dalamnya)
   * Mendeteksi klik di luar area dialog detail order,
   * lalu menutup dialog secara otomatis.
   */
  const dialogRef = useClickOutside(() => {
    if (dialogOpen) setDialogOpen(false);
  });

  const formatFee = (fee) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(fee);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  return (
    <div>
      <PageHeader
        title="Jadwal Kunjungan"
        subtitle={`${orders.length} total jadwal terdaftar`}
        action={
          <Button type="primary">
            <Plus size={15} /> Buat Jadwal
          </Button>
        }
      />

      {/* Summary cards (menggunakan Card & Badge component) */}
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
              <p className="text-xs text-gray-500 mt-0.5 font-medium">{status}</p>
            </Card>
          );
        })}
      </div>

      {/* Filters + Search (menggunakan Card & Button component) */}
      <Card className="!p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <Button
                key={f}
                type={activeFilter === f ? 'primary' : 'secondary'}
                className={`!px-3 !py-1.5 !rounded-lg !text-xs !font-medium ${activeFilter !== f ? '!bg-gray-100 !text-gray-600 hover:!bg-gray-200 !border-transparent' : ''
                  }`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
            <InputField
              type="text"
              placeholder="Cari pasien, perawatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="[&_input]:pl-9 [&_input]:py-2 [&_input]:text-xs"
            />
          </div>
        </div>
      </Card>

      {/* Orders Table (menggunakan Card & Table component) */}
      <Card noPadding className="overflow-hidden">
        <Table headers={['ID', 'Pasien', 'Tanggal & Waktu', 'Perawatan', 'Dokter', 'Biaya', 'Status', 'Aksi']} className="[&_table]:border-0 [&_thead]:bg-gray-50/50 [&_th]:border-0 [&_th]:py-3.5 [&_th]:px-5 [&_th]:text-xs [&_th]:font-semibold [&_th]:text-gray-500 [&_th]:uppercase [&_th]:tracking-wide">
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">Tidak ada jadwal ditemukan</td>
            </tr>
          ) : (
            filtered.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                <td className="py-3.5 px-5">
                  <Badge type="secondary" className="!bg-gray-100 !text-gray-500 !rounded !text-xs !font-mono !px-2 !py-0.5">{o.id}</Badge>
                </td>
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={o.patientName} className="!w-8 !h-8 !bg-gradient-to-br !from-blue-400 !to-blue-600 !text-white !text-[11px]" />
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
                {/* ✅ Tombol Detail yang membuka Shadcn UI Dialog */}
                <td className="py-3.5 px-5">
                  <button
                    onClick={() => handleViewOrder(o)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors"
                  >
                    <Eye size={12} /> Detail
                  </button>
                </td>
              </tr>
            ))
          )}
        </Table>
        <div className="px-6 py-3.5 border-t border-gray-50 bg-gray-50/30">
          <p className="text-xs text-gray-400">Menampilkan {filtered.length} dari {orders.length} jadwal</p>
        </div>
      </Card>

      {/* ✅ Shadcn UI Dialog untuk Detail Order */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Stethoscope size={18} className="text-sky-500" />
                  Detail Kunjungan
                </DialogTitle>
                <DialogDescription>
                  Informasi lengkap untuk jadwal <span className="font-semibold text-foreground">{selectedOrder.id}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {/* Info Pasien */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Avatar name={selectedOrder.patientName} className="!w-11 !h-11 !bg-gradient-to-br !from-sky-400 !to-sky-600 !text-white !text-sm" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{selectedOrder.patientName}</p>
                    <p className="text-xs text-gray-500">ID Pasien: {selectedOrder.patientId}</p>
                  </div>
                  <div className="ml-auto">
                    <StatusBadge status={selectedOrder.status} />
                  </div>
                </div>

                {/* Detail Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Stethoscope size={13} className="text-sky-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Perawatan</p>
                      <p className="text-xs font-semibold text-gray-800 mt-0.5">{selectedOrder.treatment}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={13} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Dokter</p>
                      <p className="text-xs font-semibold text-gray-800 mt-0.5">{selectedOrder.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calendar size={13} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Tanggal</p>
                      <p className="text-xs font-semibold text-gray-800 mt-0.5">{selectedOrder.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock size={13} className="text-purple-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Waktu & Durasi</p>
                      <p className="text-xs font-semibold text-gray-800 mt-0.5">{selectedOrder.time} · {selectedOrder.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Biaya */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-sky-50 to-cyan-50 rounded-xl border border-sky-100/50">
                  <div className="flex items-center gap-2">
                    <DollarSign size={15} className="text-sky-600" />
                    <span className="text-xs text-gray-600 font-medium">Total Biaya</span>
                  </div>
                  <span className="text-base font-bold text-sky-700">{formatFee(selectedOrder.fee)}</span>
                </div>

                {/* Catatan */}
                {selectedOrder.notes && (
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <FileText size={12} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Catatan</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>

              <DialogFooter showCloseButton>
                <ShadcnButton variant="default" size="sm" className="bg-sky-500 hover:bg-sky-600">
                  <FileText size={14} />
                  Cetak Kwitansi
                </ShadcnButton>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
