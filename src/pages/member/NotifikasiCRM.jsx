import { useState } from 'react';
import { Bell, CheckCircle, BellOff, Zap } from 'lucide-react';
import { MOCK_NOTIFICATIONS, CRM_AUTOMATIONS } from '../../data/memberData';

export default function NotifikasiCRM() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  const [tab, setTab] = useState('notifikasi');

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Notifikasi & CRM</h1>
          <p className="text-gray-500 text-sm">Notifikasi personal dan otomasi CRM untuk Anda.</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm text-[#0891b2] font-semibold hover:underline flex items-center gap-1">
            <CheckCircle size={15} /> Tandai semua dibaca
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-6">
        {[
          { id: 'notifikasi', label: `Notifikasi (${unreadCount} baru)` },
          { id: 'crm', label: 'CRM Automation' },
          { id: 'journey', label: 'Patient Journey' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              tab === t.id ? 'border-[#0891b2] text-[#0891b2]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* NOTIFIKASI TAB */}
      {tab === 'notifikasi' && (
        <div className="space-y-3">
          {notifs.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <BellOff size={40} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada notifikasi.</p>
            </div>
          )}
          {notifs.map(n => (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`border-2 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md ${
                n.read ? 'bg-white border-gray-100 opacity-70' : `${n.color} border-opacity-100`
              }`}
            >
              <div className="flex gap-4 items-start">
                <div className="text-3xl flex-shrink-0">{n.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-sm">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 bg-[#0891b2] rounded-full animate-pulse flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{n.msg}</p>
                  <p className="text-xs text-gray-400 mt-2">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CRM AUTOMATION TAB */}
      {tab === 'crm' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#0891b2]/10 to-teal-50 border border-cyan-100 p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Zap size={20} className="text-[#0891b2]" />
              <h3 className="font-bold text-gray-900">CRM Automation Aktif</h3>
            </div>
            <p className="text-sm text-gray-600">
              Sistem DentaCare secara otomatis mengirimkan reminder, voucher, dan notifikasi personal berdasarkan perilaku dan jadwal Anda.
            </p>
          </div>

          <div className="grid gap-4">
            {CRM_AUTOMATIONS.map(a => (
              <div key={a.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${a.color}`}>
                  {a.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900">{a.title}</h3>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                      a.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {a.status === 'aktif' ? '● Aktif' : '⏰ Terjadwal'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{a.trigger}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-500">Channel:</span>
                    {a.channel.split(' + ').map(ch => (
                      <span key={ch} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                        {ch === 'WhatsApp' ? '💬' : '📧'} {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PATIENT JOURNEY TAB */}
      {tab === 'journey' && (
        <div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="font-bold text-gray-900 mb-2">Perjalanan Pasien DentaCare</h2>
            <p className="text-sm text-gray-500">Inilah pengalaman yang akan Anda rasakan sebagai pasien setia DentaCare.</p>
          </div>

          <div className="space-y-4">
            {[
              { step: 1, title: 'Pasien Baru Daftar', icon: '👋', color: 'bg-blue-500', desc: 'Daftar member gratis via website', done: true },
              { step: 2, title: 'Booking Online', icon: '📅', color: 'bg-cyan-500', desc: 'Pilih dokter, layanan & jadwal', done: true },
              { step: 3, title: 'Reminder Otomatis', icon: '🔔', color: 'bg-purple-500', desc: 'WhatsApp & email H-1 sebelum jadwal', done: true },
              { step: 4, title: 'Kunjungan Klinik', icon: '🏥', color: 'bg-teal-500', desc: 'Check-in digital, perawatan profesional', done: true },
              { step: 5, title: 'Poin Loyalitas', icon: '⭐', color: 'bg-amber-500', desc: 'Poin otomatis masuk setelah kunjungan', done: true },
              { step: 6, title: 'Voucher Follow-Up', icon: '🎫', color: 'bg-pink-500', desc: 'Voucher diskon dikirim otomatis', done: false, current: true },
              { step: 7, title: 'Reminder Kontrol', icon: '📱', color: 'bg-orange-500', desc: 'Pengingat otomatis 6 bulan kemudian', done: false },
              { step: 8, title: 'Pasien Setia 👑', icon: '👑', color: 'bg-gradient-to-r from-amber-500 to-yellow-400', desc: 'Gold → Platinum → VIP Member', done: false },
            ].map((item, i) => (
              <div key={item.step} className="flex gap-4 items-stretch">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl text-white flex-shrink-0 ${
                    item.done ? item.color : item.current ? item.color + ' ring-4 ring-offset-2 ring-cyan-200' : 'bg-gray-200'
                  }`}>
                    {item.done ? '✓' : item.icon}
                  </div>
                  {i < 7 && <div className={`w-0.5 flex-1 my-1 ${item.done ? 'bg-[#0891b2]' : 'bg-gray-200'}`} />}
                </div>
                <div className={`flex-1 pb-4 ${!item.done && !item.current ? 'opacity-40' : ''}`}>
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-400">LANGKAH {item.step}</span>
                      {item.done && <span className="text-xs text-green-600 font-semibold">✓ Selesai</span>}
                      {item.current && <span className="text-xs text-[#0891b2] font-semibold animate-pulse">● Anda di sini</span>}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-0.5">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
