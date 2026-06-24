import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Stethoscope } from 'lucide-react';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import Alert from '../../../components/Alert';
import { supabase } from '../../../lib/supabase';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Masukkan alamat email Anda.');
      return;
    }

    setLoading(true);
    try {
      // Check if this email is registered in the members table
      const { data, error: dbError } = await supabase
        .from('members')
        .select('id')
        .eq('email', email.trim())
        .maybeSingle();

      if (dbError) throw new Error(dbError.message);

      // Always show success to prevent email enumeration attacks
      setSubmitted(true);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 bg-[#0891b2] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-cyan-200">
        <Stethoscope size={26} className="text-white" />
      </div>

      {!submitted ? (
        <>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Lupa Kata Sandi?</h1>
          <p className="text-gray-500 text-sm text-center max-w-sm mb-6">
            Masukkan email yang terdaftar untuk akun pasien Anda. Kami akan mengirimkan instruksi untuk mereset kata sandi Anda.
          </p>

          {error && (
            <Alert type="danger" className="w-full mb-4 flex items-start gap-2">
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
            <div className="relative">
              <InputField
                label="Alamat Email"
                type="email"
                placeholder="budi@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="[&_input]:pl-10 [&_input]:focus:border-[#0891b2] [&_input]:focus:ring-[#0891b2]/20"
              />
              <Mail size={16} className="absolute left-3.5 top-[38px] text-gray-400" />
            </div>

            <Button
              type="primary"
              className="w-full !py-2.5 !bg-[#0891b2] hover:!bg-cyan-700 !font-semibold !rounded-xl justify-center mt-2 shadow-md shadow-cyan-200"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Mengirim...</>
                : 'Kirim Link Reset'}
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center w-full">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Periksa Email Anda</h1>
          <p className="text-gray-500 text-sm mb-8">
            Jika email <strong>{email}</strong> terdaftar, Anda akan menerima instruksi reset kata sandi segera.
          </p>
          <Button
            type="outline"
            className="w-full !py-2.5 !font-semibold !rounded-xl justify-center"
            onClick={() => { setSubmitted(false); setEmail(''); }}
          >
            Kirim Ulang Email
          </Button>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/guest/login"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0891b2] font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali ke Login
        </Link>
      </div>
    </div>
  );
}
