import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import Alert from '../../../components/Alert';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 1000);
  };

  if (sent) {
    return (
      <div className="text-center">
        {/* Menggunakan Alert component untuk success state */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Email Terkirim!</h2>
        <p className="text-sm text-gray-500 mb-6">
          Kami telah mengirim link reset kata sandi ke <strong>{email}</strong>.
          Cek folder inbox atau spam Anda.
        </p>
        <Link to="/login" className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700">
          <ArrowLeft size={15} /> Kembali ke halaman masuk
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Lupa Kata Sandi?</h1>
        <p className="text-gray-500 text-sm mt-1">
          Masukkan email Anda dan kami akan mengirim link untuk reset kata sandi.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email (menggunakan InputField component) */}
        <div className="relative">
          <InputField
            label="Email"
            type="email"
            placeholder="dokter@dentacare.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="[&_input]:pl-10"
          />
          <Mail size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
        </div>

        {/* Tombol Submit (menggunakan Button component) */}
        <Button
          type="primary"
          className="w-full !py-2.5 !font-semibold !rounded-xl justify-center disabled:!opacity-70"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Mengirim...</> : 'Kirim Link Reset'}
        </Button>
      </form>

      <Link to="/login" className="flex items-center justify-center gap-1.5 mt-6 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft size={14} /> Kembali ke halaman masuk
      </Link>
    </div>
  );
}
