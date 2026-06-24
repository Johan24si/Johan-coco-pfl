import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import Alert from '../../../components/Alert';
import { memberRegister } from '../../../lib/supabaseService';

export default function GuestRegister() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    if (!form.name.trim())    return 'Nama lengkap wajib diisi.';
    if (!form.email.trim())   return 'Email wajib diisi.';
    if (!form.password)       return 'Kata sandi wajib diisi.';
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
      const { data, error: regError } = await memberRegister({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
      });

      if (regError) { setError(regError); return; }

      setSuccess(true);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──
  if (success) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center">
          <CheckCircle size={32} className="text-[#0891b2]" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Pendaftaran Berhasil!</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Akun Anda telah dibuat. Silakan masuk menggunakan email dan kata sandi yang baru saja Anda daftarkan.
        </p>
        <button
          onClick={() => navigate('/guest/login', { replace: true })}
          className="mt-2 px-6 py-2.5 rounded-lg bg-[#0891b2] text-white text-sm font-semibold hover:bg-cyan-700 transition-colors"
        >
          Masuk Sekarang
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Buat Akun Pasien</h1>
        <p className="text-gray-500 text-sm mt-1">Daftar untuk mulai booking perawatan gigi Anda</p>
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
            placeholder="Budi Santoso"
            value={form.name}
            onChange={handleChange('name')}
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
            onChange={handleChange('email')}
            className="[&_input]:pl-10 [&_input]:focus:border-[#0891b2] [&_input]:focus:ring-[#0891b2]/20"
          />
          <Mail size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
        </div>

        {/* No. Telepon */}
        <div className="relative">
          <InputField
            label="No. WhatsApp / Telepon"
            type="tel"
            placeholder="0812-xxxx-xxxx"
            value={form.phone}
            onChange={handleChange('phone')}
            className="[&_input]:pl-10 [&_input]:focus:border-[#0891b2] [&_input]:focus:ring-[#0891b2]/20"
          />
          <Phone size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
        </div>

        {/* Alamat */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Alamat <span className="text-gray-400 font-normal">(opsional)</span>
          </label>
          <div className="relative">
            <MapPin size={15} className="absolute left-3.5 top-3 text-gray-400" />
            <textarea
              placeholder="Jl. Contoh No. 1, Jakarta"
              value={form.address}
              onChange={handleChange('address')}
              rows={2}
              className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/10 transition resize-none"
            />
          </div>
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
              onChange={handleChange('password')}
              className="w-full px-3.5 py-2.5 pl-10 pr-10 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/10 transition"
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
              onChange={handleChange('confirm')}
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
          {loading
            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Mendaftar...</>
            : 'Daftar Sekarang'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Sudah punya akun pasien?{' '}
        <Link to="/guest/login" className="text-[#0891b2] font-semibold hover:text-cyan-700">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
