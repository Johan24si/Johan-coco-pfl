import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Stethoscope } from 'lucide-react';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import Alert from '../../../components/Alert';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Masukkan alamat email Anda.');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
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

          {error && <Alert type="danger" className="w-full mb-4">{error}</Alert>}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
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
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Mengirim...</> : 'Kirim Link Reset'}
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
            Kami telah mengirimkan instruksi reset kata sandi ke <strong>{email}</strong>
          </p>
          <Button
            type="outline"
            className="w-full !py-2.5 !font-semibold !rounded-xl justify-center"
            onClick={() => setSubmitted(false)}
          >
            Kirim Ulang Email
          </Button>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/guest/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0891b2] font-medium transition-colors">
          <ArrowLeft size={16} />
          Kembali ke Login
        </Link>
      </div>
    </div>
  );
}
