import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Stethoscope } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Alert from '../../components/Alert';

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="flex flex-col items-center w-full">

      {/* ── Logo: Menggunakan Warna Custom ── */}
      <div className="w-14 h-14 bg-[#22a1c4] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-[#22a1c4]/20">
        <Stethoscope size={26} className="text-white" />
      </div>

      {/* ── Judul ── */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Portal Dokter</h1>
      <p className="text-sm text-gray-500 mb-7">Masuk untuk mengakses dashboard Anda</p>

      {/* ── Card Form (menggunakan Card component) ── */}
      <Card className="w-full !p-7">

        {/* Pesan error (menggunakan Alert component) */}
        {error && (
          <Alert type="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email (menggunakan InputField component) */}
          <InputField
            label="Alamat Email"
            type="email"
            placeholder="doctor@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="[&_input]:focus:border-[#22a1c4] [&_input]:focus:ring-[#22a1c4]/10"
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
                className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg outline-none
                           focus:border-[#22a1c4] focus:ring-2 focus:ring-[#22a1c4]/10 transition
                           placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#22a1c4]"
                aria-label={showPass ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
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
                className="w-4 h-4 rounded border-gray-300 text-[#22a1c4] focus:ring-[#22a1c4] accent-[#22a1c4]"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Ingat saya</span>
            </label>
            <Link
              to="/forgot"
              className="text-sm text-[#22a1c4] font-medium hover:text-[#1a7d99] transition-colors"
            >
              Lupa kata sandi?
            </Link>
          </div>

          {/* Tombol Masuk (menggunakan Button component) */}
          <Button
            type="primary"
            className="w-full !py-2.5 !bg-[#22a1c4] hover:!bg-[#1e8da1] active:!bg-[#1a7d99] disabled:!opacity-60 !font-semibold !rounded-lg justify-center shadow-md shadow-[#22a1c4]/20"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Memuat...
              </>
            ) : 'Masuk'}
          </Button>
        </form>

        {/* Bantuan */}
        <p className="mt-5 text-sm text-center text-gray-500">
          Butuh bantuan?{' '}
          <Link to="/support" className="text-[#22a1c4] font-medium hover:text-[#1a7d99]">
            Hubungi dukungan
          </Link>
        </p>
      </Card>

    </div>
  );
}