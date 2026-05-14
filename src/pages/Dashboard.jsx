import { Users, Calendar, Clock, TrendingUp, ArrowUpRight, CheckCircle, AlertCircle, XCircle, Activity } from 'lucide-react';
import { customers } from '../data/customers';
import { orders } from '../data/orders';
import PageHeader from '../components/PageHeader';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  Selesai: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', icon: CheckCircle },
  Menunggu: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500', icon: Clock },
  Proses: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', icon: Activity },
  Batal: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', icon: XCircle },
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

export default function Dashboard() {
  const navigate = useNavigate();
  const activePatients = customers.filter(c => c.status !== 'Batal').length;
  const todayOrders = orders.filter(o => o.status !== 'Batal').length;
  const pendingOrders = orders.filter(o => o.status === 'Menunggu').length;
  const completedToday = orders.filter(o => o.status === 'Selesai').length;

  const stats = [
    {
      label: 'Pasien Aktif',
      value: activePatients,
      change: '+12 bulan ini',
      icon: Users,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Jadwal Hari Ini',
      value: todayOrders,
      change: `${completedToday} selesai`,
      icon: Calendar,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Menunggu Konfirmasi',
      value: pendingOrders,
      change: '3 mendesak',
      icon: Clock,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      label: 'Total Tindakan',
      value: orders.length,
      change: 'Bulan Oktober',
      icon: TrendingUp,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Selamat datang kembali, Dr. Andi Susanto 👋"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-5 hover:shadow-card-hover transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${s.lightColor} rounded-xl flex items-center justify-center`}>
                  <Icon size={18} className={s.textColor} />
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                  <ArrowUpRight size={11} />
                  Aktif
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-0.5">{s.value}</p>
              <p className="text-sm text-gray-500 font-medium">{s.label}</p>
              <p className="text-xs text-gray-400 mt-1">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Appointments + Quick Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recent Appointments Table */}
        <div className="xl:col-span-2 card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Jadwal Terkini</h2>
              <p className="text-xs text-gray-400 mt-0.5">Daftar kunjungan pasien terbaru</p>
            </div>
            <button
              onClick={() => navigate('/orders')}
              className="text-xs text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1"
            >
              Lihat semua <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {order.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{order.patientName}</p>
                  <p className="text-xs text-gray-400 truncate">{order.treatment} · {order.time}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-gray-500">{order.date}</p>
                  <p className="text-xs text-gray-400">{order.doctor.replace('Dr. ', '')}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Recent Patients */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Pasien Baru</h2>
              <p className="text-xs text-gray-400 mt-0.5">Kunjungan terbaru</p>
            </div>
            <button
              onClick={() => navigate('/customers')}
              className="text-xs text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1"
            >
              Semua <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {customers.slice(0, 6).map((c) => (
              <div
                key={c.id}
                onClick={() => navigate(`/customers/${c.id}`)}
                className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50/50 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                  <p className="text-xs text-gray-400 truncate">{c.treatment}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
