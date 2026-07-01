import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { Camera, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { fetchMyProfile, updateMyProfile, fetchMyPasien, createPasien, updatePasien, updateJadwalStatus } from '../../lib/supabaseService';
import { supabase } from '../../lib/supabase';

export default function Profil() {
  const { user, updateUser } = useAuthContext();
  const [toast, setToast] = useState('');
  const [errorPopup, setErrorPopup] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Data Profil (auth)
  const [profile, setProfile] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  // Data Pasien (medis)
  const [pasienId, setPasienId] = useState(null);
  const [pasien, setPasien] = useState({
    tanggal_lahir: '',
    jenis_kelamin: 'L',
    alamat: '',
    catatan_medis: '',
  });

  const [pwd, setPwd] = useState({ new: '', confirm: '' });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      const [profRes, pasRes] = await Promise.all([
        fetchMyProfile(),
        fetchMyPasien()
      ]);

      if (profRes.data) {
        setProfile({
          name: profRes.data.full_name || '',
          phone: profRes.data.phone || '',
        });
      }

      if (pasRes.data) {
        setPasienId(pasRes.data.id);
        setPasien({
          tanggal_lahir: pasRes.data.tanggal_lahir || '',
          jenis_kelamin: pasRes.data.jenis_kelamin || 'L',
          alamat: pasRes.data.alamat || '',
          catatan_medis: pasRes.data.catatan_medis || '',
        });
      }
      
      setLoading(false);
    }
    loadData();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // 1. Update Profile (auth)
      const { data: updatedProf, error: profErr } = await updateMyProfile({
        fullName: profile.name,
        phone: profile.phone,
      });
      if (profErr) throw new Error(profErr);

      // 2. Update Context
      updateUser({ name: updatedProf.full_name, phone: updatedProf.phone });

      // 3. Upsert Pasien
      const pasPayload = {
        nama: profile.name,
        telepon: profile.phone,
        email: user?.email,
        tanggal_lahir: pasien.tanggal_lahir || null,
        jenis_kelamin: pasien.jenis_kelamin,
        alamat: pasien.alamat,
        // catatan_medis: pasien.catatan_medis, // Dihapus sementara untuk menghindari error schema cache
      };

      if (pasienId) {
        const { error: pasErr } = await updatePasien(pasienId, pasPayload);
        if (pasErr) throw new Error(pasErr);
      } else {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        const { data: newPas, error: pasErr } = await createPasien({
          ...pasPayload,
          profile_id: authUser.id,
        });
        if (pasErr) throw new Error(pasErr);
        setPasienId(newPas.id);
      }

      showToast('Profil berhasil diperbarui!');
    } catch (error) {
      // Menangani error skema yang sering terjadi (seperti catatan_medis cache miss)
      if (error.message.includes('schema cache')) {
        setErrorPopup(`Gagal menyimpan: Kolom tidak ditemukan di database. \n\nSolusi: Buka Supabase Dashboard > Table Editor > Refresh/Reload Schema Cache, atau jalankan ulang SQL Migration.`);
      } else {
        setErrorPopup('Gagal menyimpan profil: ' + error.message);
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePwdSubmit = async (e) => {
    e.preventDefault();
    if (pwd.new !== pwd.confirm) {
      setErrorPopup('Konfirmasi password tidak cocok');
      return;
    }
    if (pwd.new.length < 6) {
      setErrorPopup('Kata sandi minimal 6 karakter');
      return;
    }

    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: pwd.new });
    setSaving(false);

    if (error) {
      setErrorPopup('Gagal mengubah password: ' + error.message);
    } else {
      showToast('Kata sandi berhasil diubah!');
      setPwd({ new: '', confirm: '' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[#0891b2]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-5">
          <CheckCircle size={20} className="text-green-400" />
          <p className="font-medium text-sm">{toast}</p>
        </div>
      )}

      {/* Error Popup */}
      {errorPopup && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl zoom-in-95 animate-in flex flex-col gap-4">
            <div className="flex items-center gap-3 text-red-500">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">Terjadi Kesalahan</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{errorPopup}</p>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => setErrorPopup('')} 
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Pengaturan Profil</h1>
        <p className="text-gray-500 text-sm">Kelola informasi pribadi dan data medis pasien Anda.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Col - Edit Profile */}
        <div className="md:col-span-2">
          <form onSubmit={handleProfileSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Informasi Pribadi</h2>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#0891b2] text-white flex items-center justify-center text-3xl font-bold uppercase">
                  {profile.name.charAt(0) || user?.email?.charAt(0)}
                </div>
                <button type="button" className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-[#0891b2] hover:border-[#0891b2] transition-colors shadow-sm">
                  <Camera size={14} />
                </button>
              </div>
              <div>
                <p className="font-medium text-gray-900">Foto Profil</p>
                <p className="text-xs text-gray-500 mb-2">JPG, GIF atau PNG. Maks 2MB.</p>
                <button type="button" className="text-sm font-semibold text-[#0891b2] hover:underline">Ganti Foto</button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input required type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input disabled type="email" value={user?.email || ''} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
                <p className="text-[10px] text-gray-400 mt-1">Email tidak dapat diubah</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP / WA</label>
                <input required type="tel" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                <input type="date" value={pasien.tanggal_lahir} onChange={e => setPasien({...pasien, tanggal_lahir: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                <select value={pasien.jenis_kelamin} onChange={e => setPasien({...pasien, jenis_kelamin: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all">
                  <option value="L">Laki-Laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <textarea value={pasien.alamat} onChange={e => setPasien({...pasien, alamat: e.target.value})} rows="2" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all" placeholder="Alamat lengkap..."></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alergi / Catatan Medis Khusus</label>
              <textarea value={pasien.catatan_medis} onChange={e => setPasien({...pasien, catatan_medis: e.target.value})} rows="3" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all" placeholder="Tuliskan jika ada alergi obat atau kondisi tertentu..."></textarea>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[#0891b2] text-white font-bold rounded-xl shadow-md hover:bg-cyan-700 transition-colors disabled:opacity-60 flex items-center gap-2">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Menyimpan...</> : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Col - Security */}
        <div>
          <form onSubmit={handlePwdSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Ubah Kata Sandi</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Baru</label>
                <input required type="password" value={pwd.new} onChange={e => setPwd({...pwd, new: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all" />
                {pwd.new && (
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 w-full rounded-full ${pwd.new.length >= i*3 ? 'bg-emerald-400' : 'bg-gray-200'}`}></div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi</label>
                <input required type="password" value={pwd.confirm} onChange={e => setPwd({...pwd, confirm: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all" />
              </div>
            </div>

            <button type="submit" disabled={saving} className="w-full py-2.5 bg-white border-2 border-[#0891b2] text-[#0891b2] font-bold rounded-xl hover:bg-cyan-50 transition-colors disabled:opacity-60">
              Ubah Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
