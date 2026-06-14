import { useState } from 'react';
import { TrendingUp, Gift, ArrowUpCircle, ArrowDownCircle, Star } from 'lucide-react';
import { MOCK_LOYALTY } from '../../data/memberData';

export default function LoyaltyPoint() {
  const { totalPoin, level, nextLevel, nextLevelPoin, history, rewards } = MOCK_LOYALTY;
  const [redeemModal, setRedeemModal] = useState(null);
  const [toast, setToast] = useState('');
  const [tab, setTab] = useState('semua');

  const progress = Math.min((totalPoin / nextLevelPoin) * 100, 100);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleRedeem = (reward) => {
    if (totalPoin < reward.poin) {
      showToast('Poin Anda tidak cukup untuk menukarkan reward ini.');
      return;
    }
    showToast(`🎉 Berhasil menukar "${reward.name}"! Cek voucher Anda.`);
    setRedeemModal(null);
  };

  const filtered = tab === 'semua' ? history
    : tab === 'masuk' ? history.filter(h => h.type === 'masuk')
    : history.filter(h => h.type === 'keluar');

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-6 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50">
          <Star size={16} className="text-yellow-400" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Loyalty Point Saya</h1>
        <p className="text-gray-500 text-sm">Kumpulkan poin dari setiap kunjungan dan tukarkan dengan reward eksklusif.</p>
      </div>

      {/* Point Card */}
      <div className="bg-gradient-to-br from-[#0891b2] via-cyan-600 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-cyan-200 text-sm font-medium mb-1">Total Poin Anda</p>
              <p className="text-5xl font-black">{totalPoin.toLocaleString()}</p>
              <p className="text-cyan-200 text-sm mt-1">Poin</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1.5 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                👑 {level}
              </span>
            </div>
          </div>

          {/* Progress to next level */}
          <div>
            <div className="flex justify-between text-xs text-cyan-200 mb-2">
              <span>Menuju {nextLevel}</span>
              <span>{totalPoin} / {nextLevelPoin} poin</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5">
              <div
                className="bg-white h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-cyan-200 mt-2">
              Kurang <strong className="text-white">{(nextLevelPoin - totalPoin).toLocaleString()} poin</strong> lagi untuk naik ke {nextLevel}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Poin Masuk', value: `+${history.filter(h => h.type === 'masuk').reduce((a, b) => a + b.poin, 0)}`, icon: <ArrowUpCircle size={20} className="text-green-500" />, color: 'bg-green-50' },
          { label: 'Poin Keluar', value: `${history.filter(h => h.type === 'keluar').reduce((a, b) => a + b.poin, 0)}`, icon: <ArrowDownCircle size={20} className="text-red-500" />, color: 'bg-red-50' },
          { label: 'Total Transaksi', value: history.length, icon: <TrendingUp size={20} className="text-blue-500" />, color: 'bg-blue-50' },
        ].map((s, i) => (
          <div key={i} className={`${s.color} border border-gray-100 p-4 rounded-2xl text-center`}>
            <div className="flex justify-center mb-2">{s.icon}</div>
            <p className="text-lg font-black text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Rewards */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">🎁 Tukar Reward</h2>
          <span className="text-sm text-gray-500">Poin Anda: <strong className="text-[#0891b2]">{totalPoin}</strong></span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {rewards.map(r => {
            const canRedeem = totalPoin >= r.poin;
            return (
              <div
                key={r.id}
                className={`bg-white border rounded-2xl p-5 text-center transition-all ${
                  canRedeem
                    ? 'border-gray-100 hover:shadow-lg hover:border-[#0891b2] cursor-pointer'
                    : 'border-gray-100 opacity-50'
                }`}
                onClick={() => canRedeem && setRedeemModal(r)}
              >
                <div className="text-4xl mb-3">{r.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{r.name}</h3>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold">
                  <Star size={12} fill="currentColor" />
                  {r.poin} poin
                </div>
                <p className="text-xs text-gray-400 mt-2">Stok: {r.stock}</p>
                {canRedeem && (
                  <button className="mt-3 w-full py-2 bg-[#0891b2] text-white text-sm font-semibold rounded-xl hover:bg-cyan-700 transition-colors">
                    Tukar
                  </button>
                )}
                {!canRedeem && (
                  <p className="mt-3 text-xs text-red-400 font-medium">Poin kurang {r.poin - totalPoin}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Riwayat Poin</h2>
          <div className="flex gap-2">
            {['semua', 'masuk', 'keluar'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  tab === t ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {filtered.map((item, i) => (
            <div key={item.id} className={`flex items-center gap-4 px-5 py-4 ${i > 0 ? 'border-t border-gray-50' : ''} hover:bg-gray-50 transition-colors`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.type === 'masuk' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {item.type === 'masuk'
                  ? <ArrowUpCircle size={20} className="text-green-600" />
                  : <ArrowDownCircle size={20} className="text-red-500" />
                }
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.desc}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
              <span className={`font-black text-base ${item.type === 'masuk' ? 'text-green-600' : 'text-red-500'}`}>
                {item.type === 'masuk' ? '+' : ''}{item.poin}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Redeem Modal */}
      {redeemModal && (
        <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="text-6xl mb-4">{redeemModal.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{redeemModal.name}</h3>
            <p className="text-gray-500 mb-6">
              Tukar <strong className="text-amber-600">{redeemModal.poin} poin</strong> untuk mendapatkan reward ini?<br/>
              Sisa poin: <strong>{totalPoin - redeemModal.poin}</strong>
            </p>
            <div className="flex gap-3">
              <button onClick={() => setRedeemModal(null)} className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50">
                Batal
              </button>
              <button onClick={() => handleRedeem(redeemModal)} className="flex-1 py-3 bg-[#0891b2] text-white font-bold rounded-xl hover:bg-cyan-700">
                Tukar Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
