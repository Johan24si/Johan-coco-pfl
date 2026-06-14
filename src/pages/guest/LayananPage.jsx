import { useState } from 'react';
import { Clock, Tag, ChevronRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { MOCK_SERVICES, MOCK_DOCTORS } from '../../data/memberData';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { id: 'semua', label: 'Semua Layanan' },
  { id: 'umum', label: 'Perawatan Umum' },
  { id: 'spesialis', label: 'Spesialis' },
  { id: 'estetik', label: 'Estetik & Kosmetik' },
];

export default function LayananPage() {
  const [cat, setCat] = useState('semua');
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const filtered = cat === 'semua' ? MOCK_SERVICES : MOCK_SERVICES.filter(s => s.category === cat);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-[#0891b2] via-cyan-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full mb-6 backdrop-blur-sm">
            🦷 Layanan Kami
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Solusi Lengkap<br />Kesehatan Gigi Anda
          </h1>
          <p className="text-cyan-100 text-lg max-w-2xl mx-auto">
            10 jenis layanan perawatan gigi dari dokter spesialis berpengalaman dengan teknologi dental modern.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                cat === c.id
                  ? 'bg-[#0891b2] text-white border-[#0891b2] shadow-lg shadow-cyan-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#0891b2] hover:text-[#0891b2]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(service => (
            <div
              key={service.id}
              className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              onClick={() => setSelected(service)}
            >
              {/* Tag */}
              {service.tag && (
                <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full mb-4 ${service.tagColor}`}>
                  {service.tag}
                </span>
              )}

              {/* Icon */}
              <div className="text-5xl mb-5">{service.icon}</div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0891b2] transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {service.desc}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Tag size={14} className="text-[#0891b2]" />
                  <span className="font-semibold text-gray-900">Mulai {service.price}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock size={14} />
                  <span>{service.duration}</span>
                </div>
              </div>

              <button
                onClick={e => { e.stopPropagation(); navigate('/guest/booking', { state: { service: service.name } }); }}
                className="w-full py-3 bg-gradient-to-r from-[#0891b2] to-teal-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-cyan-100 flex items-center justify-center gap-2"
              >
                Booking Sekarang <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* BPJS Banner */}
        <div className="mt-14 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6">
          <div className="text-5xl">🏥</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900">Menerima BPJS Kesehatan</h3>
              <span className="px-3 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">BPJS</span>
            </div>
            <p className="text-gray-600 text-sm">
              DentaCare menerima pasien BPJS Kesehatan untuk layanan Pemeriksaan Umum, Tambal Gigi, Cabut Gigi, dan Scaling. Hubungi kami untuk informasi lebih lanjut.
            </p>
          </div>
          <a href="https://wa.me/6281234567890" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl whitespace-nowrap hover:bg-green-700 transition-colors">
            Tanya via WhatsApp
          </a>
        </div>
      </div>

      {/* Modal Detail */}
      {selected && (
        <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-4xl mb-2">{selected.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900">{selected.name}</h2>
                {selected.tag && (
                  <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full mt-2 ${selected.tagColor}`}>
                    {selected.tag}
                  </span>
                )}
              </div>
              <button onClick={() => setSelected(null)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">✕</button>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{selected.desc}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-cyan-50 border border-cyan-100 p-4 rounded-2xl">
                <p className="text-xs text-gray-500 mb-1">Estimasi Biaya</p>
                <p className="text-lg font-bold text-[#0891b2]">Mulai {selected.price}</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                <p className="text-xs text-gray-500 mb-1">Estimasi Durasi</p>
                <p className="text-lg font-bold text-gray-900">{selected.duration}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">Dokter yang Menangani:</p>
              <div className="flex flex-wrap gap-2">
                {MOCK_DOCTORS.slice(0, 2).map(d => (
                  <div key={d.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${d.color} text-white text-sm`}>
                    <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center text-xs font-bold">{d.initials}</div>
                    {d.name.split(' ').slice(0,2).join(' ')}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setSelected(null)} className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50">
                Tutup
              </button>
              <button
                onClick={() => { setSelected(null); navigate('/guest/booking', { state: { service: selected.name } }); }}
                className="flex-1 py-3 bg-[#0891b2] text-white font-semibold rounded-xl hover:bg-cyan-700"
              >
                Booking Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
