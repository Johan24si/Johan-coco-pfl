import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Clock, Activity, User, FileText, Edit2, Heart, Shield, CreditCard } from 'lucide-react';
import { customers } from '../data/customers';
import { orders } from '../data/orders';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Alert from '../components/Alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = customers.find((c) => c.id === parseInt(id));

  if (!patient) {
    return (
      <div className="text-center py-20">
        <Alert type="warning" className="max-w-md mx-auto mb-4">
          Pasien tidak ditemukan.
        </Alert>
        <Button type="primary" onClick={() => navigate('/customers')}>
          <ArrowLeft size={15} /> Kembali
        </Button>
      </div>
    );
  }

  const patientOrders = orders.filter((o) => o.patientId === patient.id);
  const formatFee = (fee) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(fee);

  const totalBiaya = patientOrders.reduce((sum, o) => sum + o.fee, 0);
  const selesaiCount = patientOrders.filter(o => o.status === 'Selesai').length;

  const infoItems = [
    { icon: Mail, label: 'Email', value: patient.email },
    { icon: Phone, label: 'Telepon', value: patient.phone },
    { icon: MapPin, label: 'Alamat', value: patient.address },
    { icon: Calendar, label: 'Tanggal Lahir', value: patient.dateOfBirth },
    { icon: User, label: 'Jenis Kelamin', value: patient.gender },
    { icon: Activity, label: 'Total Kunjungan', value: `${patient.totalVisits}x` },
  ];

  return (
    <div>
      {/* Back button (menggunakan Button component) */}
      <Button
        type="secondary"
        className="!bg-transparent !border-transparent !px-0 !text-sm !text-gray-500 hover:!text-sky-600 mb-6 group"
        onClick={() => navigate('/customers')}
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Daftar Pasien
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Patient Profile Card (menggunakan Card & Avatar component) */}
        <Card className="text-center">
          {/* Avatar (menggunakan Avatar component) */}
          <Avatar
            name={patient.name}
            className="!w-20 !h-20 !text-2xl !bg-gradient-to-br !from-sky-400 !to-sky-600 !text-white mx-auto mb-4 shadow-lg shadow-sky-100"
          />
          <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{patient.age} tahun · {patient.gender}</p>
          <div className="mt-3">
            <StatusBadge status={patient.status} />
          </div>
          {/* Badge Perawatan Aktif (menggunakan Alert component dengan style kustom) */}
          <div className="mt-4 p-3 bg-sky-50 rounded-xl border border-sky-100/50">
            <p className="text-xs text-sky-500 font-medium">Perawatan Aktif</p>
            <p className="text-sm font-semibold text-sky-700 mt-0.5">{patient.treatment}</p>
          </div>
          <Button
            type="secondary"
            className="w-full mt-4 justify-center hover:!text-sky-600 hover:!border-sky-200"
            onClick={() => {}}
          >
            <Edit2 size={14} /> Edit Profil
          </Button>
        </Card>

        {/* ✅ Detail Info menggunakan Shadcn UI Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="info" className="w-full">
            {/* ✅ Shadcn UI TabsList - navigasi tab */}
            <TabsList variant="line" className="w-full justify-start mb-4 border-b border-gray-100 pb-0">
              <TabsTrigger value="info" className="gap-1.5 text-sm">
                <User size={14} /> Informasi Pribadi
              </TabsTrigger>
              <TabsTrigger value="riwayat" className="gap-1.5 text-sm">
                <Calendar size={14} /> Riwayat Kunjungan
              </TabsTrigger>
              <TabsTrigger value="medis" className="gap-1.5 text-sm">
                <Heart size={14} /> Catatan Medis
              </TabsTrigger>
            </TabsList>

            {/* ✅ Tab 1: Informasi Pribadi */}
            <TabsContent value="info" className="space-y-5">
              <Card>
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={16} className="text-sky-500" /> Data Diri
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {infoItems.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                        <p className="text-sm text-gray-700 font-medium mt-0.5">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Ringkasan Statistik */}
              <div className="grid grid-cols-3 gap-3">
                <Card className="!p-4 text-center">
                  <div className="w-9 h-9 bg-sky-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Activity size={16} className="text-sky-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{patient.totalVisits}</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Total Kunjungan</p>
                </Card>
                <Card className="!p-4 text-center">
                  <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Shield size={16} className="text-emerald-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selesaiCount}</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Selesai</p>
                </Card>
                <Card className="!p-4 text-center">
                  <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <CreditCard size={16} className="text-amber-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{formatFee(totalBiaya)}</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Total Biaya</p>
                </Card>
              </div>
            </TabsContent>

            {/* ✅ Tab 2: Riwayat Kunjungan */}
            <TabsContent value="riwayat">
              <Card noPadding className="overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                  <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar size={16} className="text-sky-500" /> Riwayat Kunjungan
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">{patientOrders.length} kunjungan tercatat</p>
                </div>
                {patientOrders.length === 0 ? (
                  <Alert type="info" className="m-4">
                    Belum ada riwayat kunjungan
                  </Alert>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {patientOrders.map((o) => (
                      <div key={o.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                        {/* Dot indikator diubah ke sky-400 */}
                        <div className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800">{o.treatment}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{o.doctor} · {o.date}, {o.time}</p>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-sm font-semibold text-gray-700">{formatFee(o.fee)}</p>
                          <p className="text-xs text-gray-400">{o.duration}</p>
                        </div>
                        <StatusBadge status={o.status} />
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* ✅ Tab 3: Catatan Medis */}
            <TabsContent value="medis" className="space-y-4">
              <Card>
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText size={16} className="text-sky-500" /> Catatan Medis
                </h3>
                <Alert type="info" className="!bg-gray-50 !border-l-4 !border-sky-400 !border-t-0 !border-r-0 !border-b-0 !rounded-xl !text-gray-600 leading-relaxed">
                  {patient.notes}
                </Alert>
              </Card>

              {/* Info Tambahan */}
              <Card>
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart size={16} className="text-rose-500" /> Riwayat Kesehatan
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Kunjungan Terakhir</p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5">{patient.lastVisit}</p>
                    </div>
                    <Calendar size={16} className="text-gray-300" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Jadwal Selanjutnya</p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5">{patient.nextVisit || 'Belum dijadwalkan'}</p>
                    </div>
                    <Clock size={16} className="text-gray-300" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-sky-50 rounded-xl border border-sky-100/50">
                    <div>
                      <p className="text-xs text-sky-500 font-medium">Perawatan Aktif</p>
                      <p className="text-sm font-bold text-sky-700 mt-0.5">{patient.treatment}</p>
                    </div>
                    <Activity size={16} className="text-sky-300" />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}