import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Stethoscope } from 'lucide-react';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import Alert from '../../../components/Alert';

export default function MemberLogin() {
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
      // Mock login as member
      localStorage.setItem('dentacare_member_token', 'member-token');
      localStorage.setItem('dentacare_member_name', 'Budi Santoso');
      localStorage.setItem('dentacare_member_email', form.email);
      localStorage.setItem('dentacare_member_role', 'member');
      window.location.href = '/member/dashboard';
    }, 800);
  };

  return (
    <div className="flex flex-col items-center w-full">

      {/* ── Logo ── */}
      <div className="w-14 h-14 bg-[#0891b2] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-cyan-200">
        <Stethoscope size={26} className="text-white" />
      </div>

      {/* ── Judul ── */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Masuk sebagai Pasien</h1>
      <p className="text-sm text-gray-500 mb-7">Akses portal pasien DentaCare Anda</p>

      {/* ── Card Form ── */}
      <Card className="w-full !p-7">
        
        {/* Pesan error */}
        {error && (
          <Alert type="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <InputField
            label="Alamat Email"
            type="email"
            placeholder="pasien@gmail.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="[&_input]:focus:border-[#0891b2] [&_input]:focus:ring-[#0891b2]/10"
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
                className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/10 transition placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0891b2]"
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
                className="w-4 h-4 rounded border-gray-300 text-[#0891b2] focus:ring-[#0891b2] accent-[#0891b2]"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Ingat saya</span>
            </label>
            <Link to="/guest/forgot" className="text-sm text-[#0891b2] font-medium hover:text-cyan-700 transition-colors">
              Lupa kata sandi?
            </Link>
          </div>

          {/* Tombol Masuk */}
          <Button
            type="primary"
            className="w-full !py-2.5 !bg-[#0891b2] hover:!bg-cyan-700 active:!bg-cyan-800 disabled:!opacity-60 !font-semibold !rounded-lg justify-center shadow-md shadow-cyan-200"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Memuat...</>
            ) : 'Masuk'}
          </Button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-500">
          Belum punya akun? <Link to="/guest/register" className="text-[#0891b2] font-medium hover:text-cyan-700">Daftar sekarang</Link>
        </p>
      </Card>
    </div>
  );
}
