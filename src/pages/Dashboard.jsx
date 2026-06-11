import { Users, Calendar, Clock, DollarSign, TrendingUp, ArrowRight, ShieldCheck, FileText, CreditCard, CalendarPlus, UserPlus, Info } from 'lucide-react';
import { customers } from '../data/customers';
import { orders } from '../data/orders';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// ── Konfigurasi badge status ────c──────────────────────────────────────────────
const STATUS = {
  Selesai:  { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  Menunggu: { bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-400'   },
  Proses:   { bg: 'bg-sky-50',     text: 'text-sky-700',     dot: 'bg-sky-400'     },
  Batal:    { bg: 'bg-red-50',     text: 'text-red-700',     dot: 'bg-red-400'     },
  Tiba:     { bg: 'bg-teal-50',    text: 'text-teal-700',    dot: 'bg-teal-400'    },
  'Dalam Penanganan': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
  Terjadwal:{ bg: 'bg-gray-100',   text: 'text-gray-500',    dot: 'bg-gray-400'    },
};

// Map status ke Badge type
const STATUS_BADGE_TYPE = {
  Selesai: 'success',
  Menunggu: 'warning',
  Proses: 'primary',
  Batal: 'danger',
  Tiba: 'success',
  'Dalam Penanganan': 'primary',
  Terjadwal: 'secondary',
};

function BadgeStatus({ status }) {
  const cfg = STATUS[status] || STATUS['Menunggu'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}

// ── Aksi cepat ───────────────────────────────────────────────────────────────
const AKSI_CEPAT = [
  { label: 'Verifikasi Asuransi',    Icon: ShieldCheck,  path: '/asuransi',    tooltip: 'Cek dan verifikasi polis asuransi pasien' },
  { label: 'Kirim Formulir via SMS', Icon: FileText,     path: '/formulir',    tooltip: 'Kirim formulir pendaftaran ke HP pasien' },
  { label: 'Proses Pembayaran',      Icon: CreditCard,   path: '/pembayaran',  tooltip: 'Buka halaman kasir untuk pembayaran' },
  { label: 'Buat Jadwal Baru',       Icon: CalendarPlus, path: '/orders/baru', tooltip: 'Tambahkan jadwal kunjungan baru' },
];

// ── Komponen utama ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();

  const totalJadwal     = orders.filter(o => o.status !== 'Batal').length;
  const selesaiHariIni  = orders.filter(o => o.status === 'Selesai').length;
  const menunggu        = orders.filter(o => o.status === 'Menunggu').length;
  const totalPendapatan = 75; // ganti dengan kalkulasi nyata jika tersedia

  const persenSelesai = totalJadwal > 0
    ? Math.round((selesaiHariIni / totalJadwal) * 100)
    : 0;

  const kartuStat = [
    {
      label: 'Total Jadwal',
      nilai: totalJadwal,
      sub: '+12%',
      subIkon: <TrendingUp size={10} />,
      subWarna: 'bg-cyan-50 text-cyan-700',
      aksen: 'bg-cyan-400',
      ikonBg: 'bg-cyan-50',
      ikonWarna: 'text-cyan-600',
      Ikon: Calendar,
      tooltip: 'Total jadwal kunjungan yang aktif (tidak termasuk batal)',
    },
    {
      label: 'Selesai Hari Ini',
      nilai: selesaiHariIni,
      sub: `${persenSelesai}% selesai`,
      subWarna: 'bg-emerald-50 text-emerald-700',
      aksen: 'bg-emerald-400',
      ikonBg: 'bg-emerald-50',
      ikonWarna: 'text-emerald-600',
      Ikon: Users,
      tooltip: 'Jumlah pasien yang sudah selesai ditangani hari ini',
    },
    {
      label: 'Pendapatan Hari Ini',
      nilai: `Rp ${totalPendapatan}`,
      sub: '+8%',
      subIkon: <TrendingUp size={10} />,
      subWarna: 'bg-green-50 text-green-700',
      aksen: 'bg-green-400',
      ikonBg: 'bg-green-50',
      ikonWarna: 'text-green-600',
      Ikon: DollarSign,
      tooltip: 'Total pendapatan dari seluruh layanan hari ini',
    },
    {
      label: 'Pasien Menunggu',
      nilai: menunggu,
      sub: 'Sedang di klinik',
      subWarna: 'bg-amber-50 text-amber-700',
      aksen: 'bg-amber-400',
      ikonBg: 'bg-amber-50',
      ikonWarna: 'text-amber-600',
      Ikon: Clock,
      tooltip: 'Pasien yang sedang menunggu giliran di ruang tunggu',
    },
  ];

  const jadwalTerkini = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <PageHeader
        title="Dashboard"
        subtitle="Selamat datang kembali, Dr. Andi Susanto 👋"
      />

      {/* ── Kartu Statistik dengan Tooltip (Shadcn UI) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        {kartuStat.map(({ label, nilai, sub, subIkon, subWarna, aksen, ikonBg, ikonWarna, Ikon, tooltip }) => (
          <Card key={label} noPadding className="overflow-hidden">
            <div className={`h-1 w-full ${aksen}`} />
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 ${ikonBg} rounded-lg flex items-center justify-center`}>
                  <Ikon size={17} className={ikonWarna} />
                </div>
                {/* ✅ Shadcn UI Tooltip pada ikon info di kartu statistik */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-gray-300 hover:text-gray-500 transition-colors">
                      <Info size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-2xl font-semibold text-gray-900 leading-none">{nilai}</p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
              <Badge type={subWarna.includes('emerald') ? 'success' : subWarna.includes('amber') ? 'warning' : 'primary'} className="!text-[11px] !px-2 !py-0.5 mt-2">
                {subIkon}{sub}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Grid Bawah ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Jadwal Hari Ini (menggunakan Card component) */}
        <Card noPadding className="xl:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <span className="w-0.5 h-4 bg-cyan-500 rounded-full" />
              <h2 className="text-sm font-semibold text-gray-800">Jadwal Hari Ini</h2>
            </div>
            <Button type="primary" className="!bg-transparent !text-cyan-600 !px-0 !py-0 !text-xs font-medium hover:!text-cyan-700" onClick={() => navigate('/orders')}>
              Lihat semua <ArrowRight size={12} />
            </Button>
          </div>

          <div className="divide-y divide-gray-50">
            {jadwalTerkini.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition-colors"
              >
                {/* Avatar (menggunakan Avatar component) */}
                <Avatar name={order.patientName} className="!w-9 !h-9 !bg-gradient-to-br !from-cyan-400 !to-cyan-600 !text-white !text-[11px]" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{order.patientName}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {order.time} · {order.treatment} · {order.doctor}
                  </p>
                </div>

                {/* Status + Tombol Lihat */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <BadgeStatus status={order.status} />
                  <Button type="secondary" className="!text-xs !px-3 !py-1 !border-gray-200 !text-gray-500" onClick={() => navigate(`/orders/${order.id}`)}>
                    Lihat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Aksi Cepat dengan Tooltip (Shadcn UI) */}
        <Card noPadding className="overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-50">
            <span className="w-0.5 h-4 bg-cyan-500 rounded-full" />
            <h2 className="text-sm font-semibold text-gray-800">Aksi Cepat</h2>
          </div>

          <div className="p-3 flex flex-col gap-2">
            {/* Tombol utama dengan Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button type="primary" className="w-full !bg-cyan-500 hover:!bg-cyan-600 active:!bg-cyan-700 !px-4 !py-3 !rounded-lg justify-start" onClick={() => navigate('/customers/baru')}>
                    <UserPlus size={16} />
                    Tambah Pasien Walk-In
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Daftarkan pasien baru tanpa reservasi</p>
              </TooltipContent>
            </Tooltip>

            {/* ✅ Aksi sekunder dengan Shadcn UI Tooltip */}
            {AKSI_CEPAT.map(({ label, Icon, path, tooltip }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      type="secondary"
                      className="w-full !px-4 !py-2.5 !text-sm !text-gray-700 !bg-transparent !border-transparent hover:!bg-gray-50 hover:!border-gray-100 !rounded-lg justify-start"
                      onClick={() => navigate(path)}
                    >
                      <Icon size={16} className="text-cyan-500 flex-shrink-0" />
                      {label}
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}