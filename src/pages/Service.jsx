import { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Star, Clock, Tag, Wrench, Sparkles, Shield, Zap, TrendingUp, Loader2, AlertCircle, RefreshCw, Edit2, Trash2, Save, X, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Progress } from '@/components/ui/progress';
import { useAuthContext } from '../context/AuthContext';
import {
  fetchLayanan, createLayanan, updateLayanan, deleteLayanan,
} from '../lib/supabaseService';

// ─── Mapping kategori → ikon & warna ──────────────────────────────────────────
const KATEGORI_CONFIG = {
  Umum:        { icon: Sparkles, color: 'bg-sky-500',    lightColor: 'bg-sky-50',    textColor: 'text-sky-600' },
  Pencegahan:  { icon: Shield,   color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
  Restoratif:  { icon: Shield,   color: 'bg-green-500',  lightColor: 'bg-green-50',  textColor: 'text-green-600' },
  Estetika:    { icon: Star,     color: 'bg-amber-500',  lightColor: 'bg-amber-50',  textColor: 'text-amber-600' },
  Spesialis:   { icon: Zap,      color: 'bg-purple-500', lightColor: 'bg-purple-50', textColor: 'text-purple-600' },
  'Bedah Minor':{ icon: Zap,     color: 'bg-red-500',    lightColor: 'bg-red-50',    textColor: 'text-red-600' },
};
const DEFAULT_CONFIG = { icon: Wrench, color: 'bg-gray-500', lightColor: 'bg-gray-50', textColor: 'text-gray-600' };

function getDemandColor(d) {
  if (d >= 80) return '[&_[data-slot=progress-indicator]]:bg-emerald-500';
  if (d >= 60) return '[&_[data-slot=progress-indicator]]:bg-sky-500';
  if (d >= 40) return '[&_[data-slot=progress-indicator]]:bg-amber-500';
  return '[&_[data-slot=progress-indicator]]:bg-red-400';
}
function getDemandLabel(d) {
  if (d >= 80) return 'Sangat Tinggi';
  if (d >= 60) return 'Tinggi';
  if (d >= 40) return 'Sedang';
  return 'Rendah';
}

// ─── Toast ───────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  return (
    <div className={`fixed top-5 right-5 z-[200] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
      {type === 'error' ? <AlertCircle size={15} /> : <CheckCircle size={15} />}
      {msg}
    </div>
  );
}

// ─── Modal Tambah / Edit Layanan ─────────────────────────────────────────────
const KATEGORI_LIST = ['Umum', 'Pencegahan', 'Restoratif', 'Estetika', 'Spesialis', 'Bedah Minor'];

function LayananModal({ layanan, onSave, onClose, saving }) {
  const isEdit = !!layanan;
  const [form, setForm] = useState({
    nama:         layanan?.nama         ?? '',
    deskripsi:    layanan?.deskripsi    ?? '',
    harga:        layanan?.harga        ?? '',
    durasi_menit: layanan?.durasi_menit ?? 30,
    kategori:     layanan?.kategori     ?? 'Umum',
    is_active:    layanan?.is_active    ?? true,
  });

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"><X size={18} /></button>
        </div>

        <div className="space-y-4">
          <InputField label="Nama Layanan" type="text" value={form.nama} onChange={set('nama')} placeholder="Pembersihan Gigi" className="[&_input]:focus:border-sky-500" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
            <textarea value={form.deskripsi} onChange={set('deskripsi')} rows={3} placeholder="Deskripsi singkat layanan..." className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga (Rp)</label>
              <input type="number" value={form.harga} onChange={set('harga')} min={0} placeholder="150000" className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Durasi (menit)</label>
              <input type="number" value={form.durasi_menit} onChange={set('durasi_menit')} min={5} placeholder="45" className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
            <select value={form.kategori} onChange={set('kategori')} className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition">
              {KATEGORI_LIST.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))} className="w-4 h-4 accent-sky-500 rounded" />
            <span className="text-sm font-medium text-gray-700">Layanan aktif (tampil ke member)</span>
          </label>
        </div>

        <div className="flex gap-3 mt-6">
          <Button type="secondary" className="flex-1 justify-center !py-2.5" onClick={onClose} disabled={saving}>Batal</Button>
          <Button type="primary" className="flex-1 justify-center !py-2.5 !bg-sky-500 hover:!bg-sky-600" onClick={() => onSave(layanan?.id ?? null, form)} disabled={saving}>
            {saving ? <><Loader2 size={14} className="animate-spin" />Menyimpan...</> : <><Save size={14} />{isEdit ? 'Simpan' : 'Tambah'}</>}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Service() {
  const { user } = useAuthContext();
  const isAdmin = user?.role === 'admin';

  const [layananList, setLayananList] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [search, setSearch]           = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [modalTarget, setModalTarget] = useState(undefined); // undefined=tutup, null=tambah, obj=edit
  const [saving, setSaving]           = useState(false);
  const [toast, setToast]             = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await fetchLayanan({ includeInactive: isAdmin });
    if (fetchError) setError(fetchError);
    else setLayananList(data ?? []);
    setLoading(false);
  }, [isAdmin]);

  useEffect(() => { load(); }, [load]);

  const categories = ['Semua', ...new Set(layananList.map((l) => l.kategori).filter(Boolean))];

  const filtered = layananList.filter((s) => {
    const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase()) ||
      (s.deskripsi ?? '').toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Semua' || s.kategori === activeCategory;
    return matchSearch && matchCat;
  });

  const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

  // Popularitas simulatif berdasarkan harga (bisa diganti dengan data dari DB)
  const getDemand = (s) => {
    const h = Number(s.harga);
    if (h <= 200000) return 85;
    if (h <= 500000) return 70;
    if (h <= 1000000) return 55;
    return 40;
  };

  const handleSave = async (id, formData) => {
    if (!formData.nama) { showToast('Nama layanan wajib diisi.', 'error'); return; }
    setSaving(true);
    try {
      const payload = {
        nama:         formData.nama.trim(),
        deskripsi:    formData.deskripsi?.trim() || null,
        harga:        parseFloat(formData.harga) || 0,
        durasi_menit: parseInt(formData.durasi_menit) || 30,
        kategori:     formData.kategori,
        is_active:    formData.is_active,
      };

      if (id) {
        const { data, error: e } = await updateLayanan(id, payload);
        if (e) throw new Error(e);
        setLayananList((prev) => prev.map((l) => l.id === id ? { ...l, ...data } : l));
        showToast('Layanan berhasil diperbarui.');
      } else {
        const { data, error: e } = await createLayanan(payload);
        if (e) throw new Error(e);
        setLayananList((prev) => [data, ...prev]);
        showToast('Layanan baru berhasil ditambahkan.');
      }
      setModalTarget(undefined);
    } catch (err) {
      showToast(err.message ?? 'Gagal menyimpan.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, nama) => {
    if (!window.confirm(`Nonaktifkan layanan "${nama}"?`)) return;
    const { error: e } = await deleteLayanan(id);
    if (e) { showToast('Gagal menonaktifkan layanan.', 'error'); return; }
    setLayananList((prev) => prev.filter((l) => l.id !== id));
    showToast(`Layanan "${nama}" dinonaktifkan.`);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
      <Loader2 size={32} className="animate-spin text-sky-400" />
      <p className="text-sm">Memuat layanan dari Supabase...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <AlertCircle size={32} className="text-red-400" />
      <p className="text-sm text-gray-500">{error}</p>
      <Button type="secondary" className="!text-xs gap-1.5" onClick={load}>
        <RefreshCw size={13} />Coba Lagi
      </Button>
    </div>
  );

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <PageHeader
        title="Layanan Klinik"
        subtitle={`${layananList.length} layanan tersedia`}
        action={isAdmin && (
          <div className="flex gap-2">
            <Button type="secondary" className="!text-xs gap-1.5" onClick={load}>
              <RefreshCw size={13} />Refresh
            </Button>
            <Button type="primary" className="flex items-center gap-2" onClick={() => setModalTarget(null)}>
              <Plus size={15} /> Tambah Layanan
            </Button>
          </div>
        )}
      />

      {/* Search + Filter */}
      <Card className="!p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                type={activeCategory === cat ? 'primary' : 'secondary'}
                className={`!px-3 !py-1.5 !rounded-lg !text-xs !font-medium ${activeCategory === cat ? '!bg-sky-500 !text-white' : '!bg-gray-100 !text-gray-600 hover:!bg-gray-200 !border-transparent'}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
            <InputField
              type="text" placeholder="Cari layanan..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="[&_input]:pl-9 [&_input]:py-2 [&_input]:text-xs [&_input]:focus:border-sky-500"
            />
          </div>
        </div>
      </Card>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((service) => {
          const cfg = KATEGORI_CONFIG[service.kategori] ?? DEFAULT_CONFIG;
          const Icon = cfg.icon;
          const demand = getDemand(service);

          return (
            <Card key={service.id} className={`!p-5 hover:shadow-lg transition-all duration-200 cursor-pointer group ${!service.is_active ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 ${cfg.lightColor} rounded-xl flex items-center justify-center`}>
                  <Icon size={20} className={cfg.textColor} />
                </div>
                <div className="flex items-center gap-2">
                  {demand >= 80 && (
                    <Badge type="warning" className="!bg-amber-50 !text-amber-600 !text-[10px] !px-2 !py-0.5">
                      <Star size={10} fill="currentColor" /> Populer
                    </Badge>
                  )}
                  {!service.is_active && (
                    <Badge type="secondary" className="!bg-gray-100 !text-gray-400 !text-[10px] !px-2 !py-0.5">Nonaktif</Badge>
                  )}
                  {isAdmin && (
                    <div className="flex gap-1">
                      <button onClick={() => setModalTarget(service)} className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => handleDelete(service.id, service.nama)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-sky-600 transition-colors">{service.nama}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{service.deskripsi}</p>

              {/* Progress permintaan */}
              <div className="mb-4 p-3 bg-gray-50/80 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={11} className="text-gray-400" />
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Permintaan</span>
                  </div>
                  <span className={`text-xs font-bold ${demand >= 80 ? 'text-emerald-600' : demand >= 60 ? 'text-sky-600' : demand >= 40 ? 'text-amber-600' : 'text-red-500'}`}>
                    {demand}% · {getDemandLabel(demand)}
                  </span>
                </div>
                <Progress value={demand} className={`h-2 bg-gray-200/80 ${getDemandColor(demand)}`} />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={11} /> {service.durasi_menit} menit</span>
                  <span className="flex items-center gap-1"><Tag size={11} /> {service.kategori}</span>
                </div>
                <p className="text-sm font-bold text-sky-600">{formatPrice(service.harga)}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && !loading && (
        <div className="text-center py-16 text-gray-400">
          <Wrench size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">{layananList.length === 0 ? 'Belum ada layanan.' : 'Tidak ada layanan ditemukan.'}</p>
        </div>
      )}

      {/* Modal */}
      {modalTarget !== undefined && (
        <LayananModal
          layanan={modalTarget}
          onSave={handleSave}
          onClose={() => setModalTarget(undefined)}
          saving={saving}
        />
      )}
    </div>
  );
}