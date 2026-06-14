import { useState } from 'react';
import { Award, Users, Heart, CheckCircle, Star, MapPin, Phone, Mail } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { MOCK_DOCTORS } from '../../data/memberData';

const TIMELINE = [
  { year: '2014', title: 'DentaCare Berdiri', desc: 'Klinik gigi DentaCare didirikan oleh Dr. Andi Susanto di Jakarta Selatan dengan 2 dental chair.' },
  { year: '2016', title: 'Ekspansi Layanan', desc: 'Menambah layanan orthodonti dan endodontik. Rekrut Dr. Rina Melati sebagai spesialis ortodonti.' },
  { year: '2018', title: 'Akreditasi Perdana', desc: 'Mendapatkan akreditasi KARS tingkat Paripurna — standar tertinggi klinik kesehatan Indonesia.' },
  { year: '2020', title: 'Digitalisasi CRM', desc: 'Meluncurkan sistem CRM digital untuk booking online, reminder otomatis, dan loyalty program.' },
  { year: '2022', title: 'Fasilitas Modern', desc: 'Renovasi klinik dengan peralatan CBCT scan dan laser dental terbaru. Kapasitas 6 dental chair.' },
  { year: '2024', title: 'DentaCare Platinum', desc: 'Mencapai 5.000+ pasien terdaftar. Meluncurkan program member digital dan aplikasi pasien.' },
];

const CERTS = [
  { name: 'Akreditasi KARS Paripurna', body: 'Komisi Akreditasi Rumah Sakit', year: '2023', icon: '🏅' },
  { name: 'ISO 9001:2015', body: 'Manajemen Mutu Pelayanan', year: '2022', icon: '📋' },
  { name: 'Sertifikasi Sterilisasi ADA', body: 'American Dental Association', year: '2023', icon: '🧼' },
  { name: 'Izin Operasional Dinkes DKI', body: 'Dinas Kesehatan DKI Jakarta', year: '2024', icon: '📜' },
  { name: 'Member PDGI', body: 'Persatuan Dokter Gigi Indonesia', year: '2014', icon: '⚕️' },
  { name: 'Sertifikat BPJS Kesehatan', body: 'BPJS Kesehatan', year: '2020', icon: '🏥' },
];

const FASILITAS = [
  { name: 'Digital X-Ray & CBCT Scan', icon: '🔬' },
  { name: 'Laser Dental Treatment', icon: '💡' },
  { name: 'Sterilisasi Autoclave', icon: '🧼' },
  { name: 'Anestesi Modern', icon: '💉' },
  { name: '6 Dental Chair Modern', icon: '🪑' },
  { name: 'Ruang Steril Berstandar', icon: '🏥' },
  { name: 'Sistem Antrian Digital', icon: '📱' },
  { name: 'Parkir Luas & Gratis', icon: '🅿️' },
];

export default function TentangKami() {
  const [activeTab, setActiveTab] = useState('profil');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-[#0891b2] via-cyan-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full mb-6 backdrop-blur-sm">
            🏥 Tentang DentaCare
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Klinik Gigi Terpercaya<br />di Jakarta Selatan
          </h1>
          <p className="text-cyan-100 text-lg max-w-2xl mx-auto">
            Lebih dari 10 tahun kami memberikan pelayanan kesehatan gigi profesional dengan standar medis internasional dan teknologi dental terdepan.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5.000+', label: 'Pasien Terdaftar', icon: '👥' },
              { value: '4', label: 'Dokter Spesialis', icon: '👨‍⚕️' },
              { value: '10+', label: 'Tahun Pengalaman', icon: '📅' },
              { value: '4.9 ⭐', label: 'Rating Google', icon: '🌟' },
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="text-3xl font-bold text-[#0891b2] mb-1">{s.value}</p>
                <p className="text-gray-500 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'profil', label: 'Profil & Visi Misi' },
              { id: 'sejarah', label: 'Sejarah' },
              { id: 'dokter', label: 'Tim Dokter' },
              { id: 'fasilitas', label: 'Fasilitas & Sertifikasi' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#0891b2] text-[#0891b2]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* PROFIL & VISI MISI */}
        {activeTab === 'profil' && (
          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-cyan-50 text-[#0891b2] text-xs font-bold uppercase tracking-wider rounded-full mb-4">Profil Klinik</span>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">DentaCare — Klinik Gigi Modern Berbasis Digital</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  DentaCare adalah klinik gigi modern yang berdiri sejak 2014, berlokasi di Jakarta Selatan. Kami menggabungkan keahlian medis dokter spesialis berpengalaman dengan teknologi dental terkini untuk memberikan pelayanan kesehatan gigi yang optimal.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Sebagai klinik berbasis CRM digital, kami berkomitmen memberikan pengalaman pasien yang personal — mulai dari booking online, reminder otomatis, loyalty program, hingga riwayat perawatan digital yang mudah diakses.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Dengan akreditasi KARS Paripurna dan ISO 9001:2015, DentaCare menjadi pilihan utama keluarga di Jakarta Selatan untuk perawatan gigi yang aman, nyaman, dan profesional.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Pendiri', value: 'Dr. Andi Susanto, drg.', icon: '👨‍⚕️' },
                  { label: 'Berdiri', value: '2014', icon: '📅' },
                  { label: 'Lokasi', value: 'Jakarta Selatan', icon: '📍' },
                  { label: 'Status', value: 'Terakreditasi KARS', icon: '🏅' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className="font-bold text-gray-900 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visi Misi */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[#0891b2] to-teal-600 p-8 rounded-3xl text-white">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Heart size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Visi</h3>
                <p className="text-cyan-50 leading-relaxed">
                  Menjadi klinik gigi digital terpercaya dan terdepan di Indonesia, yang memberikan pelayanan kesehatan gigi berstandar internasional dengan pendekatan personal berbasis teknologi CRM.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl">
                <div className="w-12 h-12 bg-cyan-50 text-[#0891b2] rounded-2xl flex items-center justify-center mb-6">
                  <Award size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi</h3>
                <ul className="space-y-3">
                  {[
                    'Memberikan perawatan gigi yang aman, nyaman & efektif',
                    'Mengutamakan kepuasan dan kepercayaan pasien',
                    'Menggunakan teknologi dental terkini',
                    'Membangun hubungan jangka panjang dengan pasien',
                    'Meningkatkan kesadaran kesehatan gigi masyarakat',
                  ].map((m, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-[#0891b2] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SEJARAH */}
        {activeTab === 'sejarah' && (
          <div>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Perjalanan DentaCare</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Dari klinik kecil di Jakarta Selatan, menjadi klinik gigi digital terpercaya dengan ribuan pasien setia.</p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />
              <div className="space-y-8">
                {TIMELINE.map((item, i) => (
                  <div key={i} className={`flex flex-col md:flex-row gap-6 md:gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`flex-1 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                      <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <span className="inline-block px-3 py-1 bg-cyan-50 text-[#0891b2] text-sm font-bold rounded-full mb-3">{item.year}</span>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-12 h-12 bg-[#0891b2] text-white rounded-full items-center justify-center font-bold text-sm flex-shrink-0 z-10 shadow-lg shadow-cyan-200">
                      {item.year.slice(2)}
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TIM DOKTER */}
        {activeTab === 'dokter' && (
          <div>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Tim Dokter & Tenaga Medis</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Didukung oleh dokter spesialis berpengalaman lulusan universitas terbaik Indonesia.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {MOCK_DOCTORS.map((doc) => (
                <div key={doc.id} className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="flex gap-6 items-start">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${doc.color} text-white flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                      {doc.initials}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{doc.name}</h3>
                      <p className="text-[#0891b2] font-semibold text-sm mb-3">{doc.spec}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg border border-gray-100">📚 {doc.lulusan}</span>
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg border border-gray-100">⏱️ {doc.pengalaman}</span>
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg border border-gray-100">👥 {doc.pasien}+ Pasien</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-xl">
                        <span>📅</span>
                        <span>{doc.jadwal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-5 border-t border-gray-100">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#fbbf24" className="text-yellow-400" />)}
                      <span className="text-xs text-gray-500 ml-1">5.0</span>
                    </div>
                    <a href="/guest/booking" className="px-4 py-2 bg-[#0891b2] text-white text-sm font-semibold rounded-xl hover:bg-cyan-700 transition-colors">
                      Booking →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FASILITAS & SERTIFIKASI */}
        {activeTab === 'fasilitas' && (
          <div className="space-y-14">
            <div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Fasilitas Klinik</h2>
                <p className="text-gray-500">Peralatan dental modern berstandar internasional</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {FASILITAS.map((f, i) => (
                  <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl text-center hover:shadow-md transition-shadow hover:border-cyan-200">
                    <div className="text-4xl mb-3">{f.icon}</div>
                    <p className="text-sm font-semibold text-gray-800">{f.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Sertifikasi & Akreditasi</h2>
                <p className="text-gray-500">Diakui secara nasional dan internasional</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {CERTS.map((cert, i) => (
                  <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                    <div className="text-3xl flex-shrink-0">{cert.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{cert.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{cert.body}</p>
                      <span className="inline-block px-2.5 py-0.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full">Aktif {cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lokasi */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl text-white">
              <h3 className="text-2xl font-bold mb-6">Lokasi & Kontak</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#0891b2] rounded-xl flex items-center justify-center flex-shrink-0"><MapPin size={20} /></div>
                  <div>
                    <p className="font-semibold mb-1">Alamat</p>
                    <p className="text-gray-300 text-sm">Jl. Sehat Selalu No. 88, Kebayoran Baru, Jakarta Selatan 12345</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#0891b2] rounded-xl flex items-center justify-center flex-shrink-0"><Phone size={20} /></div>
                  <div>
                    <p className="font-semibold mb-1">WhatsApp</p>
                    <p className="text-gray-300 text-sm">0812-3456-7890</p>
                    <p className="text-gray-300 text-sm">Senin – Sabtu, 08.00 – 20.00</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[#0891b2] rounded-xl flex items-center justify-center flex-shrink-0"><Mail size={20} /></div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <p className="text-gray-300 text-sm">info@dentacare.com</p>
                    <p className="text-gray-300 text-sm">cs@dentacare.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
