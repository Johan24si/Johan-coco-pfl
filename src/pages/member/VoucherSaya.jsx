import { useState } from 'react';
import { Copy, CheckCircle, Tag } from 'lucide-react';
import { MOCK_VOUCHERS } from '../../data/memberData';

function VoucherItem({ v }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(v.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAktif = v.category === 'aktif';

  const borderColor = isAktif ? 'border-cyan-200' : 'border-gray-200';
  const topBg = isAktif ? 'bg-gradient-to-r from-[#0891b2] to-teal-500' : 'bg-gradient-to-r from-gray-400 to-gray-500';

  return (
    <div className={`relative bg-white border-2 ${borderColor} rounded-3xl overflow-hidden shadow-sm ${isAktif ? 'hover:shadow-xl hover:-translate-y-1' : 'opacity-60'} transition-all duration-300`}>
      {/* Notch */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 ${isAktif ? 'bg-gray-50' : 'bg-gray-50'} rounded-full -translate-x-1/2 border-2 ${borderColor}`} />
      <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 ${isAktif ? 'bg-gray-50' : 'bg-gray-50'} rounded-full translate-x-1/2 border-2 ${borderColor}`} />

      {/* Top Section */}
      <div className={`${topBg} p-5 relative overflow-hidden`}>
        <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/10 rounded-full" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-xs font-medium mb-1">Nilai Voucher</p>
            <p className="text-3xl font-black text-white">{v.value}</p>
          </div>
          <div className="text-right">
            <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${
              isAktif ? 'bg-white/20 text-white' :
              v.category === 'terpakai' ? 'bg-blue-900/30 text-blue-200' :
              'bg-gray-900/30 text-gray-300'
            }`}>
              {isAktif ? '✓ Aktif' : v.category === 'terpakai' ? '✓ Terpakai' : '✕ Kadaluarsa'}
            </span>
          </div>
        </div>
        <h3 className="text-white font-bold mt-3">{v.title}</h3>
        <p className="text-white/70 text-sm mt-1">{v.desc}</p>
      </div>

      {/* Bottom Section */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400 mb-1">Kode Voucher</p>
            <p className="font-black text-gray-900 tracking-widest text-sm">{v.code}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-1">Berlaku s/d</p>
            <p className="text-xs font-semibold text-gray-700">{v.expired}</p>
          </div>
        </div>

        {isAktif && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-colors"
            >
              {copied ? <CheckCircle size={15} className="text-green-600" /> : <Copy size={15} />}
              {copied ? 'Tersalin!' : 'Salin Kode'}
            </button>
            <a href="/guest/booking" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#0891b2] text-white font-semibold text-sm rounded-xl hover:bg-cyan-700 transition-colors">
              <Tag size={15} /> Gunakan
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VoucherSaya() {
  const [tab, setTab] = useState('aktif');

  const filtered = MOCK_VOUCHERS.filter(v =>
    tab === 'semua' ? true : v.category === tab
  );

  const countByTab = {
    aktif: MOCK_VOUCHERS.filter(v => v.category === 'aktif').length,
    terpakai: MOCK_VOUCHERS.filter(v => v.category === 'terpakai').length,
    kadaluarsa: MOCK_VOUCHERS.filter(v => v.category === 'kadaluarsa').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Voucher Saya</h1>
        <p className="text-gray-500 text-sm">Kelola voucher diskon dan hadiah eksklusif Anda.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-cyan-50 border border-cyan-100 p-4 rounded-2xl text-center">
          <p className="text-2xl font-black text-[#0891b2]">{countByTab.aktif}</p>
          <p className="text-xs text-gray-500 mt-1">Voucher Aktif</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center">
          <p className="text-2xl font-black text-blue-600">{countByTab.terpakai}</p>
          <p className="text-xs text-gray-500 mt-1">Terpakai</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-center">
          <p className="text-2xl font-black text-gray-500">{countByTab.kadaluarsa}</p>
          <p className="text-xs text-gray-500 mt-1">Kadaluarsa</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'aktif', label: `🟢 Aktif (${countByTab.aktif})` },
          { id: 'terpakai', label: `🔵 Terpakai (${countByTab.terpakai})` },
          { id: 'kadaluarsa', label: `⚪ Kadaluarsa (${countByTab.kadaluarsa})` },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
              tab === t.id ? 'border-[#0891b2] text-[#0891b2]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Voucher List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">🎫</div>
          <p className="font-semibold text-gray-700 mb-1">Tidak ada voucher</p>
          <p className="text-gray-400 text-sm">Kunjungi klinik untuk mendapatkan voucher</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map(v => <VoucherItem key={v.id} v={v} />)}
        </div>
      )}

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 p-6 rounded-2xl flex gap-4 items-start">
        <div className="text-3xl">💡</div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Cara Mendapatkan Voucher</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Voucher <strong>Ulang Tahun</strong> dikirim otomatis di bulan lahir Anda</li>
            <li>• Voucher <strong>Follow-Up</strong> dikirim 1 jam setelah kunjungan</li>
            <li>• Tukar poin loyalitas di menu <strong>Loyalty Point</strong></li>
            <li>• Ikuti promo aktif di halaman <strong>Promo & Voucher</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
