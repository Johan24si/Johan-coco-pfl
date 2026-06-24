import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import Alert from '../../../components/Alert';
import { supabase } from '../../../lib/supabase';

export default function AdminRegister() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: '',
  });
  const [error, setError] = useState('');

  const validate = () => {
    if (!form.name.trim()) return 'Nama lengkap wajib diisi.';
    if (!form.email.trim()) return 'Email wajib diisi.';
    if (!form.password) return 'Kata sandi wajib diisi.';
    if (form.password.length < 6) return 'Kata sandi minimal 6 karakter.';
    if (form.password !== form.confirm) return 'Konfirmasi kata sandi tidak cocok.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    try {
      // Check if email already exists in admins table
      const { data: existing } = await supabase
        .from('admins')
        .select('id')
        .eq('email', form.email.trim())
        .maybeSingle();

      if (existing) {
        setError('Email ini sudah terdaftar sebagai admin.');
        return;
      }

      // Insert into admins table
      const { error: insertError } = await supabase
        .from('admins')
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role: 'admin',
        });

      if (insertError) throw new Error(insertError.message);

      setSuccess(true);
    } catch (err) {
      setError(err.message ?? 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──
  if (success) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Akun Admin Dibuat!</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Akun admin untuk <strong className="text-gray-700">{form.email}</strong> berhasil
          terdaftar. Silakan masuk dengan kredensial baru Anda.
        </p>
        <button
          onClick={() => navigate('/login', { replace: true })}
          className="mt-2 px-6 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          Masuk Sekarang
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Buat Akun Admin</h1>
        <p className="text-gray-500 text-sm mt-1">Daftarkan akun staf / klinik DentaCare</p>
      </div>

      {error && (
        <Alert type="danger" className="mb-4 flex items-start gap-2">
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Nama Lengkap */}
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

        {/* Email */}
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

        {/* No. Telepon */}
        <div className="relative">
          <InputField
            label="No. Telepon (opsional)"
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
              placeholder="Min. 6 karakter"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-field pl-10 pr-10 focus:border-sky-500 focus:ring-sky-500"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
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

        {/* Tombol Daftar */}
        <Button
          type="primary"
          className="w-full !py-2.5 !bg-sky-500 hover:!bg-sky-600 !font-semibold !rounded-xl justify-center disabled:!opacity-70"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading
            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Mendaftar...</>
            : 'Buat Akun Admin'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-sky-500 font-semibold hover:text-sky-600">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}