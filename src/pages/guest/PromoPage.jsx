import { useState, useEffect } from 'react';
import { Tag, Clock, Copy, CheckCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { MOCK_PROMOS, MOCK_VOUCHERS } from '../../data/memberData';

function CountdownBadge({ targetDate }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const end = new Date('2026-06-30T23:59:59');
      const diff = Math.max(0, end - now);
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-white/80 text-xs">Berakhir dalam:</span>
      {[
        { v: time.d, l: 'Hari' },
        { v: time.h, l: 'Jam' },
        { v: time.m, l: 'Mnt' },
        { v: time.s, l: 'Dtk' },
      ].map((t, i) => (
        <div key={i} className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 text-center min-w-[40px]">
          <div className="text-white font-bold text-base leading-none">{String(t.v).padStart(2, '0')}</div>
          <div className="text-white/70 text-[10px]">{t.l}</div>
        </div>
      ))}
    </div>
  );
}

function VoucherCard({ v }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(v.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAktif = v.category === 'aktif';
  const isTerpakai = v.category === 'terpakai';

  return (
    <div className={`relative bg-white border-2 rounded-3xl overflow-hidden transition-all ${
      isAktif ? 'border-cyan-200 hover:shadow-xl hover:-translate-y-1' : 'border-gray-200 opacity-60'
    }`}>
      {/* Notch kiri-kanan */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-50 rounded-full -translate-x-1/2 border-2 border-gray-200" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-50 rounded-full translate-x-1/2 border-2 border-gray-200" />

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full mb-2 ${
              isAktif ? 'bg-green-100 text-green-700' :
              isTerpakai ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-500'
            }`}>
              {isAktif ? 'Aktif' : isTerpakai ? 'Terpakai' : 'Kadaluarsa'}
            </span>
            <h3 className="text-base font-bold text-gray-900">{v.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{v.desc}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <p className="text-2xl font-black text-[#0891b2]">{v.value}</p>
          </div>
        </div>

        {/* Garis putus */}
        <div className="border-t-2 border-dashed border-gray-200 my-4" />

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400 mb-1">Kode Voucher</p>
            <p className="font-bold text-gray-900 tracking-widest text-sm">{v.code}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-1">Berlaku s/d</p>
            <p className="text-xs font-semibold text-gray-600">{v.expired}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PromoPage() {
  const [filter, setFilter] = useState('semua');
  const [activeDetail, setActiveDetail] = useState(null);

  const filtered = filter === 'semua'
    ? MOCK_PROMOS
    : filter === 'aktif'
    ? MOCK_PROMOS.filter(p => p.category === 'aktif')
    : MOCK_PROMOS.filter(p => p.category === 'berakhir');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-[#0891b2] via-cyan-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full mb-6 backdrop-blur-sm">
            🎁 Promo & Voucher
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hemat Lebih Banyak<br />Senyum Lebih Sehat
          </h1>
          <p className="text-cyan-100 text-lg max-w-2xl mx-auto">
            Nikmati promo eksklusif, voucher diskon, dan reward loyalitas khusus untuk member DentaCare.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { id: 'semua', label: 'Semua Promo' },
            { id: 'aktif', label: '🟢 Aktif' },
            { id: 'berakhir', label: '⏰ Sudah Berakhir' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                filter === f.id
                  ? 'bg-[#0891b2] text-white border-[#0891b2] shadow-lg shadow-cyan-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-cyan-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Promo Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map(promo => (
            <div
              key={promo.id}
              className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                promo.category === 'berakhir' ? 'opacity-60 grayscale' : ''
              }`}
              onClick={() => setActiveDetail(promo)}
            >
              {/* Card Top */}
              <div className={`bg-gradient-to-br ${promo.color} p-7 relative overflow-hidden`}>
                <div className="absolute -top-4 -right-4 text-8xl opacity-20">{promo.image}</div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`${promo.badgeColor} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                      {promo.badge}
                    </span>
                    <span className="text-white/70 text-xs">{promo.category === 'berakhir' ? '✕ Berakhir' : '✓ Aktif'}</span>
                  </div>
                  <div className="text-5xl mb-3">{promo.image}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{promo.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{promo.desc}</p>
                  {promo.countdown && promo.category === 'aktif' && <CountdownBadge />}
                </div>
              </div>

              {/* Card Bottom */}
              <div className="bg-white p-5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={14} />
                    <span>Berlaku s/d {promo.expired}</span>
                  </div>
                  <button className="text-[#0891b2] font-semibold hover:underline text-sm">
                    Detail →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voucher Section */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Voucher Tersedia</h2>
            <p className="text-gray-500">Voucher eksklusif untuk member DentaCare — daftar sekarang untuk mendapatkannya.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {MOCK_VOUCHERS.filter(v => v.category === 'aktif').map(v => (
              <VoucherCard key={v.id} v={v} />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {activeDetail && (
        <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className={`bg-gradient-to-br ${activeDetail.color} p-6 rounded-2xl mb-6 relative overflow-hidden`}>
              <div className="absolute -top-4 -right-4 text-7xl opacity-20">{activeDetail.image}</div>
              <div className="text-4xl mb-3">{activeDetail.image}</div>
              <h2 className="text-2xl font-bold text-white mb-1">{activeDetail.title}</h2>
              <p className="text-white/80 text-sm">{activeDetail.desc}</p>
            </div>
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Syarat & Ketentuan:</p>
              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">{activeDetail.syarat}</p>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2"><Clock size={14} /> Berlaku s/d {activeDetail.expired}</div>
              <span className={`${activeDetail.badgeColor} text-white text-xs px-3 py-1 rounded-full`}>{activeDetail.badge}</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setActiveDetail(null)} className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50">Tutup</button>
              <a href="/guest/booking" className="flex-1 py-3 bg-[#0891b2] text-white font-semibold rounded-xl text-center hover:bg-cyan-700">Gunakan Promo</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
