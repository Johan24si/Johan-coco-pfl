import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Eye, Phone, Mail, Filter, CheckCircle, Clock, Activity, XCircle, MoreHorizontal, Edit2, Trash2, Calendar, FileText, Copy } from 'lucide-react';
import { customers } from '../data/customers';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Table from '../components/Table';
import InputField from '../components/InputField';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const statusConfig = {
  Selesai: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  Menunggu: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  // Mengubah Proses dari blue ke sky
  Proses: { bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500' },
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
  const [deleteTarget, setDeleteTarget] = useState(null);

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
          /* Menggunakan Button component */
          <Button type="primary" className="flex items-center gap-2">
            <Plus size={15} /> Tambah Pasien
          </Button>
        }
      />

      {/* Filters + Search (menggunakan Card & Button component) */}
      <Card className="!p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <Button
                key={f}
                type={activeFilter === f ? 'primary' : 'secondary'}
                className={`!px-3 !py-1.5 !rounded-lg !text-xs !font-medium ${
                  activeFilter === f
                    ? '!bg-sky-500 !text-white'
                    : '!bg-gray-100 !text-gray-600 hover:!bg-gray-200 !border-transparent'
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
              placeholder="Cari nama, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="[&_input]:pl-9 [&_input]:py-2 [&_input]:text-xs [&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500"
            />
          </div>
        </div>
      </Card>

      {/* Table (menggunakan Card & Table component) */}
      <Card noPadding className="overflow-hidden">
        <Table
          headers={['Pasien', 'Kontak', 'Kunjungan Terakhir', 'Perawatan', 'Status', 'Aksi']}
          className="[&_table]:border-0 [&_thead]:bg-gray-50/50 [&_th]:border-0 [&_th]:py-3.5 [&_th]:text-xs [&_th]:font-semibold [&_th]:text-gray-500 [&_th]:uppercase [&_th]:tracking-wide"
        >
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center text-gray-400 text-sm">
                Tidak ada pasien ditemukan
              </td>
            </tr>
          ) : (
            filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    {/* Menggunakan Avatar component */}
                    <Avatar name={c.name} className="!w-9 !h-9 !bg-gradient-to-br !from-sky-400 !to-sky-600 !text-white !text-xs" />
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
                  {/* ✅ Shadcn UI Dropdown Menu — menu aksi per pasien */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none">
                        <MoreHorizontal size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuLabel>Aksi untuk {c.name.split(' ')[0]}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => navigate(`/customers/${c.id}`)}>
                          <Eye size={14} className="text-sky-500" />
                          <span>Lihat Detail</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {}}>
                          <Edit2 size={14} className="text-amber-500" />
                          <span>Edit Data Pasien</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {}}>
                          <Calendar size={14} className="text-purple-500" />
                          <span>Buat Jadwal Baru</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => {}}>
                          <FileText size={14} className="text-emerald-500" />
                          <span>Catatan Medis</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigator.clipboard?.writeText(c.phone)}>
                          <Copy size={14} className="text-gray-400" />
                          <span>Salin No. Telepon</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive" onClick={() => setDeleteTarget(c)}>
                        <Trash2 size={14} />
                        <span>Hapus Pasien</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </Table>
        <div className="px-6 py-3.5 border-t border-gray-50 bg-gray-50/30">
          <p className="text-xs text-gray-400">Menampilkan {filtered.length} dari {customers.length} pasien</p>
        </div>
      </Card>

      {/* ✅ Shadcn UI AlertDialog — konfirmasi hapus pasien */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data Pasien?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda yakin ingin menghapus data <strong className="text-gray-700">{deleteTarget?.name}</strong>? Tindakan ini tidak dapat dibatalkan dan semua riwayat kunjungan pasien akan ikut terhapus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={() => setDeleteTarget(null)}>
              Ya, Hapus Pasien
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}