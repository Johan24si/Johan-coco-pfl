import { Users, Calendar, Clock, DollarSign, TrendingUp, ArrowRight, ShieldCheck, FileText, CreditCard, CalendarPlus, UserPlus } from 'lucide-react';
import { customers } from '../data/customers';
import { orders } from '../data/orders';
import PageHeader from '../components/PageHeader';
import { useNavigate } from 'react-router-dom';

// ── Konfigurasi badge status ──────────────────────────────────────────────────
const STATUS = {
  Selesai:  { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  Menunggu: { bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-400'   },
  Proses:   { bg: 'bg-sky-50',     text: 'text-sky-700',     dot: 'bg-sky-400'     },
  Batal:    { bg: 'bg-red-50',     text: 'text-red-700',     dot: 'bg-red-400'     },
  Tiba:     { bg: 'bg-teal-50',    text: 'text-teal-700',    dot: 'bg-teal-400'    },
  'Dalam Penanganan': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
  Terjadwal:{ bg: 'bg-gray-100',   text: 'text-gray-500',    dot: 'bg-gray-400'    },
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
  { label: 'Verifikasi Asuransi',    Icon: ShieldCheck,  path: '/asuransi'    },
  { label: 'Kirim Formulir via SMS', Icon: FileText,     path: '/formulir'    },
  { label: 'Proses Pembayaran',      Icon: CreditCard,   path: '/pembayaran'  },
  { label: 'Buat Jadwal Baru',       Icon: CalendarPlus, path: '/orders/baru' },
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
    },
  ];

  const jadwalTerkini = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <PageHeader
        title="Dashboard"
        subtitle="Selamat datang kembali, Dr. Andi Susanto 👋"
      />

      {/* ── Kartu Statistik ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        {kartuStat.map(({ label, nilai, sub, subIkon, subWarna, aksen, ikonBg, ikonWarna, Ikon }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className={`h-1 w-full ${aksen}`} />
            <div className="p-4">
              <div className={`w-9 h-9 ${ikonBg} rounded-lg flex items-center justify-center mb-3`}>
                <Ikon size={17} className={ikonWarna} />
              </div>
              <p className="text-2xl font-semibold text-gray-900 leading-none">{nilai}</p>
              <p className="text-xs text-gray-400 mt-1">{label}</p>
              <span className={`inline-flex items-center gap-1 text-[11px] font-medium mt-2 px-2 py-0.5 rounded-full ${subWarna}`}>
                {subIkon}{sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Grid Bawah ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Jadwal Hari Ini */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <span className="w-0.5 h-4 bg-cyan-500 rounded-full" />
              <h2 className="text-sm font-semibold text-gray-800">Jadwal Hari Ini</h2>
            </div>
            <button
              onClick={() => navigate('/orders')}
              className="text-xs text-cyan-600 font-medium hover:text-cyan-700 flex items-center gap-1"
            >
              Lihat semua <ArrowRight size={12} />
            </button>
          </div>

          <div className="divide-y divide-gray-50">
            {jadwalTerkini.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition-colors"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0">
                  {order.avatar}
                </div>

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
                  <button
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="text-xs px-3 py-1 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    Lihat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aksi Cepat */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-50">
            <span className="w-0.5 h-4 bg-cyan-500 rounded-full" />
            <h2 className="text-sm font-semibold text-gray-800">Aksi Cepat</h2>
          </div>

          <div className="p-3 flex flex-col gap-2">
            {/* Tombol utama */}
            <button
              onClick={() => navigate('/customers/baru')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <UserPlus size={16} />
              Tambah Pasien Walk-In
            </button>

            {/* Aksi sekunder */}
            {AKSI_CEPAT.map(({ label, Icon, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100"
              >
                <Icon size={16} className="text-cyan-500 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}