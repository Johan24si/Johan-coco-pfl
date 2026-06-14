import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Phone, Calendar } from 'lucide-react';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import Alert from '../../../components/Alert';

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', dob: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) {
      setError('Semua kolom wajib diisi.'); return;
    }
    if (form.password !== form.confirm) {
      setError('Kata sandi tidak cocok.'); return;
    }
    setLoading(true);
    setTimeout(() => {
      // Mock patient registration
      localStorage.setItem('dentacare_member_token', 'member-token-' + Date.now());
      localStorage.setItem('dentacare_member_name', form.name);
      localStorage.setItem('dentacare_member_email', form.email);
      localStorage.setItem('dentacare_member_role', 'member');
      window.location.href = '/member/dashboard';
    }, 800);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Buat Akun Pasien</h1>
        <p className="text-gray-500 text-sm mt-1">Daftar untuk mulai booking perawatan gigi Anda</p>
      </div>

      {error && (
        <Alert type="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Lengkap */}
        <div className="relative">
          <InputField
            label="Nama Lengkap"
            type="text"
            placeholder="Budi Santoso"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="[&_input]:pl-10 [&_input]:focus:border-[#0891b2] [&_input]:focus:ring-[#0891b2]/20"
          />
          <User size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
        </div>

        {/* Email */}
        <div className="relative">
          <InputField
            label="Email"
            type="email"
            placeholder="budi@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="[&_input]:pl-10 [&_input]:focus:border-[#0891b2] [&_input]:focus:ring-[#0891b2]/20"
          />
          <Mail size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
        </div>

        {/* No. Telepon */}
        <div className="relative">
          <InputField
            label="No. WhatsApp"
            type="tel"
            placeholder="0812-xxxx-xxxx"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="[&_input]:pl-10 [&_input]:focus:border-[#0891b2] [&_input]:focus:ring-[#0891b2]/20"
          />
          <Phone size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
        </div>
        
        {/* Tanggal Lahir */}
        <div className="relative">
          <InputField
            label="Tanggal Lahir"
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            className="[&_input]:pl-10 [&_input]:focus:border-[#0891b2] [&_input]:focus:ring-[#0891b2]/20 text-gray-500"
          />
          <Calendar size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
        </div>

        {/* Kata Sandi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Kata Sandi</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Min. 8 karakter"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3.5 py-2.5 pl-10 pr-10 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/10 transition"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Konfirmasi Kata Sandi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Kata Sandi</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Ulangi kata sandi"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className="w-full px-3.5 py-2.5 pl-10 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/10 transition"
            />
          </div>
        </div>

        {/* Tombol Daftar */}
        <Button
          type="primary"
          className="w-full !py-2.5 !bg-[#0891b2] hover:!bg-cyan-700 active:!bg-cyan-800 !font-semibold !rounded-xl justify-center disabled:!opacity-70 mt-4 shadow-md shadow-cyan-200"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Mendaftar...</> : 'Daftar Sekarang'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Sudah punya akun pasien?{' '}
        <Link to="/guest/login" className="text-[#0891b2] font-semibold hover:text-cyan-700">Masuk di sini</Link>
      </p>
    </div>
  );
}
