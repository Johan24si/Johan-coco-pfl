import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, AlertCircle, Stethoscope } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Alert from '../../components/Alert';
import { signUpMember } from '../../lib/supabaseService';

export default function Register() {
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
      const { data, error: regError } = await signUpMember({
        fullName: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim(),
      });

      if (regError) throw new Error(regError);

      setSuccess(true);
    } catch (err) {
      setError(err.message ?? 'Terjadi kesalahan saat pendaftaran.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center w-full">
        <Card className="w-full !p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Akun Anda dengan email <strong className="text-gray-900">{form.email}</strong> berhasil dibuat.
            Silakan masuk untuk melanjutkan ke Dashboard.
          </p>
          <Button
            type="primary"
            className="w-full !py-2.5 !bg-sky-500 hover:!bg-sky-600 !font-semibold !rounded-lg justify-center shadow-md"
            onClick={() => navigate('/login', { replace: true })}
          >
            Masuk Sekarang
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">

      {/* ── Logo ── */}
      <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-sky-200">
        <Stethoscope size={26} className="text-white" />
      </div>

      {/* ── Judul ── */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Buat Akun Baru</h1>
      <p className="text-sm text-gray-500 mb-7">Daftarkan diri Anda untuk menjadi Member DentaCare</p>

      {/* ── Card Form ── */}
      <Card className="w-full !p-7">
        
        {error && (
          <Alert type="danger" className="mb-4 flex items-start gap-2">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          
          <div className="relative">
            <InputField
              label="Nama Lengkap"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="[&_input]:pl-10 [&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500/10"
            />
            <User size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
          </div>

          <div className="relative">
            <InputField
              label="Email"
              type="email"
              placeholder="email@contoh.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="[&_input]:pl-10 [&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500/10"
            />
            <Mail size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
          </div>

          <div className="relative">
            <InputField
              label="No. Telepon (WA)"
              type="tel"
              placeholder="0812xxxx"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="[&_input]:pl-10 [&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500/10"
            />
            <Phone size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Kata Sandi</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Min. 6 karakter"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Konfirmasi Sandi</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Ulangi kata sandi"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="w-full pl-10 px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button
            type="primary"
            className="w-full !py-2.5 mt-2 !bg-sky-500 hover:!bg-sky-600 active:!bg-sky-700 disabled:!opacity-60 !font-semibold !rounded-lg justify-center shadow-md shadow-sky-200"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Memproses...</>
              : 'Daftar Sekarang'}
          </Button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-500">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-sky-500 font-medium hover:text-sky-600">
            Masuk di sini
          </Link>
        </p>
      </Card>
    </div>
  );
}
