import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Stethoscope, AlertCircle } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Alert from '../../components/Alert';
import { signIn } from '../../lib/supabaseService';
import { useAuthContext } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      const { data, error: authError } = await signIn({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        setError(authError);
        return;
      }

      // Simpan profile ke context
      login(data.profile);

      // Redirect berdasarkan role
      if (data.profile.role === 'admin') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/member/dashboard', { replace: true });
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">

      {/* ── Logo ── */}
      <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-sky-200">
        <Stethoscope size={26} className="text-white" />
      </div>

      {/* ── Judul ── */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Masuk ke DentaCare</h1>
      <p className="text-sm text-gray-500 mb-7">Silakan masuk menggunakan akun Anda</p>

      {/* ── Card Form ── */}
      <Card className="w-full !p-7">

        {error && (
          <Alert type="danger" className="mb-4 flex items-start gap-2">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <InputField
            label="Alamat Email"
            type="email"
            placeholder="email@contoh.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="[&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500/10"
          />

          {/* Kata Sandi */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Kata Sandi</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 transition placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-500"
              >
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Ingat saya + Lupa sandi */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 accent-sky-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                Ingat saya
              </span>
            </label>
            <Link to="/forgot" className="text-sm text-sky-500 font-medium hover:text-sky-600 transition-colors">
              Lupa kata sandi?
            </Link>
          </div>

          {/* Tombol Masuk */}
          <Button
            type="primary"
            className="w-full !py-2.5 !bg-sky-500 hover:!bg-sky-600 active:!bg-sky-700 disabled:!opacity-60 !font-semibold !rounded-lg justify-center shadow-md shadow-sky-200"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Memuat...</>
              : 'Masuk'}
          </Button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-500">
          Belum punya akun?{' '}
          <Link to="/register" className="text-sky-500 font-medium hover:text-sky-600">
            Daftar sekarang
          </Link>
        </p>
      </Card>
    </div>
  );
}
