import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Clock, Activity, User, FileText, Edit2 } from 'lucide-react';
import { customers } from '../data/customers';
import { orders } from '../data/orders';

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
        <p className="text-gray-400 text-lg">Pasien tidak ditemukan.</p>
        <button onClick={() => navigate('/customers')} className="btn-primary mt-4">
          <ArrowLeft size={15} /> Kembali
        </button>
      </div>
    );
  }

  const patientOrders = orders.filter((o) => o.patientId === patient.id);
  const formatFee = (fee) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(fee);

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
      {/* Back button */}
      <button
        onClick={() => navigate('/customers')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-sky-600 mb-6 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Daftar Pasien
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Patient Profile Card */}
        <div className="card p-6 text-center">
          {/* Gradient Avatar diubah ke sky */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg shadow-sky-100">
            {patient.avatar}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{patient.age} tahun · {patient.gender}</p>
          <div className="mt-3">
            <StatusBadge status={patient.status} />
          </div>
          {/* Badge Perawatan Aktif diubah ke sky */}
          <div className="mt-4 p-3 bg-sky-50 rounded-xl border border-sky-100/50">
            <p className="text-xs text-sky-500 font-medium">Perawatan Aktif</p>
            <p className="text-sm font-semibold text-sky-700 mt-0.5">{patient.treatment}</p>
          </div>
          <button className="w-full mt-4 btn-secondary justify-center hover:text-sky-600 hover:border-sky-200 transition-colors">
            <Edit2 size={14} /> Edit Profil
          </button>
        </div>

        {/* Detail Info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Info Grid */}
          <div className="card p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User size={16} className="text-sky-500" /> Informasi Pribadi
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
          </div>

          {/* Notes */}
          <div className="card p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText size={16} className="text-sky-500" /> Catatan Medis
            </h3>
            <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4 leading-relaxed border-l-4 border-sky-400">
              {patient.notes}
            </p>
          </div>

          {/* Visit History */}
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Calendar size={16} className="text-sky-500" /> Riwayat Kunjungan
              </h3>
            </div>
            {patientOrders.length === 0 ? (
              <p className="text-center py-8 text-gray-400 text-sm">Belum ada riwayat kunjungan</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}