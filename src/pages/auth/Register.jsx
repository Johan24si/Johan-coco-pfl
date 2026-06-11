import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Phone } from 'lucide-react';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Alert from '../../components/Alert';

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
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
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Buat Akun Baru</h1>
        <p className="text-gray-500 text-sm mt-1">Daftarkan klinik Anda ke DentaCare</p>
      </div>

      {/* Error (menggunakan Alert component) */}
      {error && (
        <Alert type="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Lengkap (menggunakan InputField component) */}
        <div className="relative">
          <InputField
            label="Nama Lengkap"
            type="text"
            placeholder="Dr. Nama Lengkap"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="[&_input]:pl-10 [&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500"
          />
          <User size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
        </div>

        {/* Email (menggunakan InputField component) */}
        <div className="relative">
          <InputField
            label="Email"
            type="email"
            placeholder="dokter@klinik.id"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="[&_input]:pl-10 [&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500"
          />
          <Mail size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
        </div>

        {/* No. Telepon (menggunakan InputField component) */}
        <div className="relative">
          <InputField
            label="No. Telepon"
            type="tel"
            placeholder="08xx-xxxx-xxxx"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="[&_input]:pl-10 [&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500"
          />
          <Phone size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
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
              className="input-field pl-10 pr-10 focus:border-sky-500 focus:ring-sky-500"
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
              className="input-field pl-10 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Tombol Daftar (menggunakan Button component) */}
        <Button
          type="primary"
          className="w-full !py-2.5 !bg-sky-500 hover:!bg-sky-600 !font-semibold !rounded-xl justify-center disabled:!opacity-70"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Mendaftar...</> : 'Buat Akun'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-sky-500 font-semibold hover:text-sky-600">Masuk di sini</Link>
      </p>
    </div>
  );
}