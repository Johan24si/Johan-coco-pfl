import { useState } from 'react';
import {
  Search, Plus, Mail, Phone, MoreHorizontal,
  Edit2, Trash2, Loader2, AlertCircle, RefreshCw,
  X, Save, KeyRound, CheckCircle, MapPin, Eye, EyeOff,
} from 'lucide-react';
import { useMembers } from '../hooks/useMembers';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Table from '../components/Table';
import InputField from '../components/InputField';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  return (
    <div className={`fixed top-5 right-5 z-[200] flex items-center gap-2.5 px-4 py-3 rounded-xl
      shadow-xl text-sm font-medium
      ${type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
      {type === 'error' ? <AlertCircle size={15} /> : <CheckCircle size={15} />}
      {msg}
    </div>
  );
}

// ─── Add / Edit Member Modal ──────────────────────────────────────────────────
function MemberModal({ member, onSave, onClose, saving }) {
  const isEdit = !!member;
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    nama:     member?.nama    ?? '',
    email:    member?.email   ?? '',
    telepon:  member?.telepon ?? '',
    alamat:   member?.alamat  ?? '',
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    const payload = {
      nama: form.nama,
      email: form.email,
      telepon: form.telepon,
      alamat: form.alamat,
    };
    onSave(member?.id ?? null, payload);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            {isEdit ? 'Edit Data Member' : 'Tambah Member Baru'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Nama */}
          <div className="relative">
            <InputField
              label="Nama Lengkap"
              type="text"
              value={form.nama}
              onChange={handleChange('nama')}
              placeholder="Nama lengkap member"
              className="[&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500/10"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <InputField
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="email@contoh.com"
              className="[&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500/10"
            />
          </div>

          {/* Telepon */}
          <div className="relative">
            <InputField
              label="No. Telepon"
              type="tel"
              value={form.telepon}
              onChange={handleChange('telepon')}
              placeholder="0812-xxxx-xxxx"
              className="[&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500/10"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Alamat <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3.5 top-3 text-gray-400" />
              <textarea
                value={form.alamat}
                onChange={handleChange('alamat')}
                placeholder="Jl. Contoh No. 1, Kota"
                rows={2}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition resize-none"
              />
            </div>
          </div>


        </div>

        <div className="flex gap-3 mt-6">
          <Button
            type="secondary"
            className="flex-1 justify-center !py-2.5"
            onClick={onClose}
            disabled={saving}
          >
            Batal
          </Button>
          <Button
            type="primary"
            className="flex-1 justify-center !py-2.5 !bg-sky-500 hover:!bg-sky-600"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? <><Loader2 size={14} className="animate-spin" />Menyimpan...</>
              : <><Save size={14} />{isEdit ? 'Simpan' : 'Tambah'}</>}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Customers() {
  const { members, loading, error, refetch, addMember, editMember, removeMember } = useMembers();

  const [search, setSearch] = useState('');
  const [modalTarget, setModalTarget] = useState(undefined); // undefined=closed, null=add, obj=edit
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const filtered = members.filter((m) => {
    const q = search.toLowerCase();
    return (
      (m.nama    ?? '').toLowerCase().includes(q) ||
      (m.email   ?? '').toLowerCase().includes(q) ||
      (m.telepon ?? '').toLowerCase().includes(q) ||
      (m.alamat  ?? '').toLowerCase().includes(q)
    );
  });

  const handleSave = async (id, formData) => {
    if (!formData.nama || !formData.email) {
      showToast('Nama dan email wajib diisi.', 'error');
      return;
    }

    setSaving(true);
    try {
      if (id) {
        await editMember(id, formData);
        showToast('Data member berhasil diperbarui.');
      } else {
        await addMember(formData);
        showToast('Member baru berhasil ditambahkan.');
      }
      setModalTarget(undefined);
    } catch (err) {
      showToast(err.message ?? 'Gagal menyimpan data.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await removeMember(deleteTarget.id);
      showToast(`Data pasien ${deleteTarget.nama} berhasil dihapus.`);
      setDeleteTarget(null);
    } catch (err) {
      showToast(err.message ?? 'Gagal menghapus pasien.', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
        <Loader2 size={32} className="animate-spin text-sky-400" />
        <p className="text-sm">Memuat data member dari Supabase...</p>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <AlertCircle size={22} className="text-red-400" />
        </div>
        <p className="text-sm text-gray-500 text-center max-w-xs">{error}</p>
        <Button type="secondary" className="!text-xs gap-1.5" onClick={refetch}>
          <RefreshCw size={13} />Coba Lagi
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      <PageHeader
        title="Data Member / Pasien"
        subtitle={`${members.length} pasien terdaftar di Supabase`}
        action={
          <div className="flex items-center gap-2">
            <Button type="secondary" className="flex items-center gap-1.5 !text-xs" onClick={refetch}>
              <RefreshCw size={13} />Refresh
            </Button>
            <Button
              type="primary"
              className="flex items-center gap-2"
              onClick={() => setModalTarget(null)}
            >
              <Plus size={15} />Tambah Pasien
            </Button>
          </div>
        }
      />

      {/* Search */}
      <Card className="!p-4 mb-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-gray-500 shrink-0">
            Menampilkan{' '}
            <span className="font-semibold text-gray-700">{filtered.length}</span> dari{' '}
            <span className="font-semibold text-gray-700">{members.length}</span> member
          </p>
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
            <InputField
              type="text"
              placeholder="Cari nama, email, atau telepon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="[&_input]:pl-9 [&_input]:py-2 [&_input]:text-xs [&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500"
            />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card noPadding className="overflow-hidden">
        <Table
          headers={['Member', 'Kontak', 'Alamat', 'Bergabung', 'Aksi']}
          className="[&_table]:border-0 [&_thead]:bg-gray-50/50 [&_th]:border-0 [&_th]:py-3.5 [&_th]:text-xs [&_th]:font-semibold [&_th]:text-gray-500 [&_th]:uppercase [&_th]:tracking-wide"
        >
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-12 text-center text-gray-400 text-sm">
                {members.length === 0
                  ? 'Belum ada member terdaftar di Supabase.'
                  : 'Tidak ada member yang cocok dengan pencarian.'}
              </td>
            </tr>
          ) : (
            filtered.map((m) => (
              <tr
                key={m.id}
                className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0"
              >
                {/* Nama + Avatar */}
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={m.nama ?? m.email}
                      className="!w-9 !h-9 !bg-gradient-to-br !from-sky-400 !to-sky-600 !text-white !text-xs shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{m.nama}</p>
                      <p className="text-xs text-gray-400">{m.email}</p>
                    </div>
                  </div>
                </td>

                {/* Kontak */}
                <td className="py-3.5 px-4 hidden md:table-cell">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Mail size={11} className="text-gray-400 shrink-0" />
                      <span className="truncate max-w-[150px]">{m.email}</span>
                    </div>
                    {m.telepon && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Phone size={11} className="text-gray-300 shrink-0" />
                        {m.telepon}
                      </div>
                    )}
                  </div>
                </td>

                {/* Alamat */}
                <td className="py-3.5 px-4 hidden lg:table-cell">
                  {m.alamat ? (
                    <p className="text-xs text-gray-500 max-w-[160px] truncate" title={m.alamat}>
                      {m.alamat}
                    </p>
                  ) : (
                    <span className="text-xs text-gray-300 italic">—</span>
                  )}
                </td>

                {/* Bergabung */}
                <td className="py-3.5 px-4 hidden xl:table-cell">
                  <p className="text-xs text-gray-500">
                    {m.created_at
                      ? new Date(m.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })
                      : '—'}
                  </p>
                </td>

                {/* Aksi */}
                <td className="py-3.5 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none">
                        <MoreHorizontal size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>
                        Aksi untuk {(m.nama ?? m.email).split(' ')[0]}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setModalTarget(m)}>
                          <Edit2 size={14} className="text-amber-500" />
                          <span>Edit Data</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard?.writeText(m.email)}
                        >
                          <Mail size={14} className="text-gray-400" />
                          <span>Salin Email</span>
                        </DropdownMenuItem>
                        {m.telepon && (
                          <DropdownMenuItem
                            onClick={() => navigator.clipboard?.writeText(m.telepon)}
                          >
                            <Phone size={14} className="text-gray-400" />
                            <span>Salin Telepon</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setDeleteTarget(m)}
                      >
                        <Trash2 size={14} />
                        <span>Hapus Pasien</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </Table>
        <div className="px-6 py-3.5 border-t border-gray-50 bg-gray-50/30">
          <p className="text-xs text-gray-400">
            {filtered.length} dari {members.length} member · Data realtime dari Supabase
          </p>
        </div>
      </Card>

      {/* Add / Edit Modal */}
      {modalTarget !== undefined && (
        <MemberModal
          member={modalTarget}
          onSave={handleSave}
          onClose={() => setModalTarget(undefined)}
          saving={saving}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Pasien?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda yakin ingin menghapus data pasien{' '}
              <strong className="text-gray-700">{deleteTarget?.nama}</strong>?{' '}
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteLoading} className="gap-2">
              {deleteLoading
                ? <><Loader2 size={14} className="animate-spin" />Menghapus...</>
                : 'Ya, Hapus'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}