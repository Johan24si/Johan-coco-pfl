import { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, ArrowRight, Star, Trophy, TrendingUp, Plus, Loader2, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { fetchMyProfile, fetchUpcomingJadwal, fetchTiers, fetchLayanan, fetchMyPasien, createJadwal } from '../../lib/supabaseService';
import { supabase } from '../../lib/supabase';

// ─── Status badge ─────────────────────────────────────────────────────────────
const STATUS_CFG = {
  pending:   { label: 'Menunggu',    bg: 'bg-amber-100',   text: 'text-amber-700' },
  confirmed: { label: 'Terkonfirmasi', bg: 'bg-green-100', text: 'text-green-700' },
  completed: { label: 'Selesai',     bg: 'bg-gray-100',    text: 'text-gray-600' },
  cancelled: { label: 'Dibatalkan',  bg: 'bg-red-100',     text: 'text-red-600' },
};

export default function Dashboard() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [profile, setProfile]         = useState(null);
  const [upcomingJadwal, setUpcoming] = useState([]);
  const [tiers, setTiers]             = useState([]);
  const [layananList, setLayananList] = useState([]);
  const [myPasien, setMyPasien]       = useState(null);
  const [loading, setLoading]         = useState(true);
  const [toast, setToast]             = useState('');

  // Form booking cepat
  const [booking, setBooking] = useState({ layanan_id: '', tanggal: '', jam_mulai: '' });
  const [bookingLoading, setBookingLoading] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    const [profileRes, upcomingRes, tiersRes, layananRes, pasienRes] = await Promise.all([
      fetchMyProfile(),
      fetchUpcomingJadwal(),
      fetchTiers(),
      fetchLayanan(),
      fetchMyPasien(),
    ]);

    if (profileRes.data) setProfile(profileRes.data);
    if (upcomingRes.data) setUpcoming(upcomingRes.data);
    if (tiersRes.data)   setTiers(tiersRes.data);
    if (layananRes.data) setLayananList(layananRes.data);
    if (pasienRes.data)  setMyPasien(pasienRes.data);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // ── Hitung progress tier ──────────────────────────────────────────────────
  const currentPoints = profile?.points ?? 0;
  const currentTier   = profile?.tiers ?? tiers.find((t) => t.min_points <= currentPoints && (tiers.find((t2) => t2.min_points > currentPoints && t2.min_points > t.min_points) !== undefined));
  const sortedTiers   = [...tiers].sort((a, b) => a.min_points - b.min_points);
  const nextTier      = sortedTiers.find((t) => t.min_points > currentPoints);
  const prevTierMin   = currentTier?.min_points ?? 0;
  const progressPct   = nextTier
    ? Math.min(100, Math.round(((currentPoints - prevTierMin) / (nextTier.min_points - prevTierMin)) * 100))
    : 100;

  // ── Booking cepat ──────────────────────────────────────────────────────────
  const slots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!booking.layanan_id || !booking.tanggal || !booking.jam_mulai) {
      showToast('Harap lengkapi layanan, tanggal, dan waktu!');
      return;
    }
    if (!myPasien) {
      showToast('Anda belum melengkapi data pasien. Silakan isi di halaman Profil.');
      return;
    }

    setBookingLoading(true);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      const { error } = await createJadwal({
        pasien_id:  myPasien.id,
        layanan_id: booking.layanan_id,
        member_id:  authUser.id,
        tanggal:    booking.tanggal,
        jam_mulai:  booking.jam_mulai,
        status:     'pending',
      });

      if (error) throw new Error(error);
      showToast('✅ Jadwal berhasil dibooking! Menunggu konfirmasi admin.');
      setBooking({ layanan_id: '', tanggal: '', jam_mulai: '' });
      loadData(); // refresh jadwal mendatang
    } catch (err) {
      showToast('Gagal membuat jadwal: ' + (err.message ?? 'Coba lagi.'));
    } finally {
      setBookingLoading(false);
    }
  };

  const todayStr = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date());

  const today = new Date().toISOString().split('T')[0];

  const formatTanggal = (d) =>
    new Date(d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[#0891b2]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-8 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-5">
          <CheckCircle size={20} className="text-green-400" />
          <p className="font-medium text-sm">{toast}</p>
        </div>
      )}

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Selamat datang, {(profile?.full_name || user?.name || 'Member').split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-500">{todayStr}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── Left Column ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Poin & Tier */}
          <div className="bg-gradient-to-r from-[#0891b2] to-cyan-600 p-6 rounded-2xl text-white relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -right-4 bottom-0 w-24 h-24 bg-white/5 rounded-full" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-cyan-100 text-sm mb-1">Total Poin Anda</p>
                  <p className="text-4xl font-bold">{currentPoints.toLocaleString('id-ID')}</p>
                  <p className="text-cyan-100 text-sm mt-1">poin</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-xl text-sm font-bold">
                    <Trophy size={14} />
                    {profile?.tiers?.name ?? currentTier?.name ?? 'Bronze'}
                  </span>
                  <span className="text-xs text-cyan-100">
                    {profile?.tiers?.discount_percentage ?? 0}% diskon
                  </span>
                </div>
              </div>

              {nextTier && (
                <div>
                  <div className="flex items-center justify-between text-xs text-cyan-100 mb-2">
                    <span>Progress menuju {nextTier.name}</span>
                    <span>{nextTier.min_points - currentPoints} poin lagi</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              )}
              {!nextTier && (
                <p className="text-xs text-cyan-100 mt-2">🏆 Anda sudah mencapai tier tertinggi!</p>
              )}
            </div>
          </div>

          {/* Jadwal Mendatang */}
          {upcomingJadwal.length > 0 && (
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-200/50 rounded-full blur-3xl" />
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 bg-[#0891b2] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
                  Jadwal Berikutnya
                </span>
              </div>
              {(() => {
                const next = upcomingJadwal[0];
                const statusCfg = STATUS_CFG[next.status] ?? STATUS_CFG.pending;
                return (
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{next.layanan?.nama ?? '-'}</h3>
                      <div className="flex items-center gap-4 text-sm font-semibold text-gray-800 bg-white px-4 py-2.5 rounded-xl border border-cyan-50 inline-flex shadow-sm mt-2">
                        <span className="flex items-center gap-2"><Calendar size={16} className="text-[#0891b2]" /> {formatTanggal(next.tanggal)}</span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-2"><Clock size={16} className="text-[#0891b2]" /> {next.jam_mulai}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[140px]">
                      <div className="text-center mb-1">
                        <span className={`inline-block px-3 py-1 ${statusCfg.bg} ${statusCfg.text} text-xs font-bold rounded-full border`}>
                          {statusCfg.label}
                        </span>
                      </div>
                      <Link to="/member/jadwal" className="px-4 py-2.5 bg-white text-gray-800 text-sm font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-center shadow-sm">
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Form Booking Cepat */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-[#0891b2]">
                <Plus size={18} />
              </span>
              Booking Jadwal Baru
            </h2>

            {!myPasien && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-sm text-amber-700">
                  Data pasien belum diisi.{' '}
                  <Link to="/member/profil" className="font-semibold underline">Lengkapi sekarang</Link>{' '}
                  untuk bisa booking.
                </p>
              </div>
            )}

            <form onSubmit={handleBooking} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Layanan Perawatan</label>
                <select
                  value={booking.layanan_id}
                  onChange={(e) => setBooking({ ...booking, layanan_id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all"
                >
                  <option value="">Pilih Layanan</option>
                  {layananList.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.nama} — {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(l.harga)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                <input
                  type="date"
                  value={booking.tanggal}
                  min={today}
                  onChange={(e) => setBooking({ ...booking, tanggal: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Waktu Tersedia</label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot} type="button"
                      onClick={() => setBooking({ ...booking, jam_mulai: slot })}
                      className={`py-2 rounded-lg text-sm font-medium transition-colors border ${
                        booking.jam_mulai === slot
                          ? 'bg-[#0891b2] text-white border-[#0891b2]'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-[#0891b2] hover:text-[#0891b2]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={bookingLoading || !myPasien}
                  className="w-full py-3.5 bg-[#0891b2] text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-100 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {bookingLoading ? <><Loader2 size={16} className="animate-spin" />Memproses...</> : 'Konfirmasi Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Right Column ─────────────────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Statistik */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-sm mb-1">Total Kunjungan</p>
              <p className="text-2xl font-bold text-gray-900">
                {upcomingJadwal.length}
                <span className="text-sm font-normal text-gray-400 ml-1">akan datang</span>
              </p>
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-sm mb-1">Status Member</p>
              <p className="text-lg font-bold text-emerald-600">Aktif</p>
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm col-span-2">
              <p className="text-gray-500 text-sm mb-1 flex items-center gap-1">
                <Star size={13} className="text-amber-400" /> Tier Saat Ini
              </p>
              <p className="text-lg font-bold text-gray-900">{profile?.tiers?.name ?? 'Bronze'}</p>
              {profile?.tiers?.benefits && (
                <p className="text-xs text-gray-400 mt-1">{profile.tiers.benefits}</p>
              )}
            </div>
          </div>

          {/* Semua Jadwal Mendatang */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Jadwal Mendatang</h2>
              <Link to="/member/jadwal" className="text-sm text-[#0891b2] hover:underline font-medium flex items-center gap-1">
                Lihat semua <ArrowRight size={13} />
              </Link>
            </div>

            {upcomingJadwal.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Calendar size={28} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Belum ada jadwal mendatang</p>
                <button onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-2 text-xs text-[#0891b2] font-medium hover:underline">
                  Buat jadwal baru ↑
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingJadwal.map((j) => {
                  const st = STATUS_CFG[j.status] ?? STATUS_CFG.pending;
                  return (
                    <div key={j.id} className="flex gap-3 items-start p-3 rounded-xl bg-gray-50 hover:bg-cyan-50 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#0891b2] shadow-sm">
                        <FileText size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">{j.layanan?.nama}</h4>
                        <p className="text-xs text-gray-500">{formatTanggal(j.tanggal)}, {j.jam_mulai}</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 ${st.bg} ${st.text}`}>
                          {st.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
