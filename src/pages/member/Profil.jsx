import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Camera, CheckCircle } from 'lucide-react';

export default function Profil() {
  const { user, updateUser } = useAuth();
  const [toast, setToast] = useState('');
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    phone: '081234567890',
    dob: '1995-05-15',
    blood: 'O',
    notes: 'Alergi obat amoxicillin'
  });

  const [pwd, setPwd] = useState({ old: '', new: '', confirm: '' });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUser({ name: profile.name });
    showToast('Profil berhasil diperbarui!');
  };

  const handlePwdSubmit = (e) => {
    e.preventDefault();
    if (pwd.new !== pwd.confirm) {
      alert('Konfirmasi password tidak cocok');
      return;
    }
    showToast('Kata sandi berhasil diubah!');
    setPwd({ old: '', new: '', confirm: '' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-top-5">
          <CheckCircle size={20} className="text-green-400" />
          <p className="font-medium text-sm">{toast}</p>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Pengaturan Profil</h1>
        <p className="text-gray-500 text-sm">Kelola informasi pribadi dan keamanan akun Anda.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Col - Edit Profile */}
        <div className="md:col-span-2">
          <form onSubmit={handleProfileSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Informasi Pribadi</h2>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#0891b2] text-white flex items-center justify-center text-3xl font-bold">
                  {profile.name.charAt(0)}
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
                <input disabled type="email" value={user?.email || 'pasien@dentacare.com'} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
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
                <input required type="date" value={profile.dob} onChange={e => setProfile({...profile, dob: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Golongan Darah</label>
                <select value={profile.blood} onChange={e => setProfile({...profile, blood: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                  <option value="-">Tidak Tahu</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alergi / Catatan Medis Khusus</label>
              <textarea value={profile.notes} onChange={e => setProfile({...profile, notes: e.target.value})} rows="3" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all" placeholder="Tuliskan jika ada alergi obat atau kondisi tertentu..."></textarea>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button type="submit" className="px-6 py-2.5 bg-[#0891b2] text-white font-bold rounded-xl shadow-md hover:bg-cyan-700 transition-colors">
                Simpan Perubahan
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Lama</label>
                <input required type="password" value={pwd.old} onChange={e => setPwd({...pwd, old: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all" />
              </div>
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

            <button type="submit" className="w-full py-2.5 bg-white border-2 border-[#0891b2] text-[#0891b2] font-bold rounded-xl hover:bg-cyan-50 transition-colors">
              Ubah Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
