import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Stethoscope, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Alert from '../../components/Alert';
import { supabase } from '../../lib/supabase';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Masukkan alamat email Anda.');
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin + '/reset-password',
      });
      if (resetError) throw new Error(resetError.message);
      
      setSuccess(true);
    } catch (err) {
      setError(err.message ?? 'Gagal mengirim email pemulihan.');
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cek Email Anda</h2>
          <p className="text-sm text-gray-500 mb-6">
            Instruksi pemulihan kata sandi telah dikirim ke <strong className="text-gray-900">{email}</strong>.
          </p>
          <Link to="/login" className="text-sky-500 font-semibold hover:text-sky-600 transition-colors">
            Kembali ke Halaman Masuk
          </Link>
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

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Lupa Kata Sandi?</h1>
      <p className="text-sm text-gray-500 mb-7 text-center max-w-xs">
        Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
      </p>

      <Card className="w-full !p-7">
        {error && (
          <Alert type="danger" className="mb-4 flex items-start gap-2">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <InputField
              label="Alamat Email"
              type="email"
              placeholder="email@contoh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="[&_input]:pl-10 [&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500/10"
            />
            <Mail size={15} className="absolute left-3.5 top-[38px] text-gray-400" />
          </div>

          <Button
            type="primary"
            className="w-full !py-2.5 mt-2 !bg-sky-500 hover:!bg-sky-600 active:!bg-sky-700 disabled:!opacity-60 !font-semibold !rounded-lg justify-center shadow-md shadow-sky-200"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Memproses...</>
              : 'Kirim Tautan'}
          </Button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-500">
          Kembali ke{' '}
          <Link to="/login" className="text-sky-500 font-medium hover:text-sky-600">
            Halaman Masuk
          </Link>
        </p>
      </Card>
    </div>
  );
}
