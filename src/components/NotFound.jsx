import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Background icon diubah ke sky-50 dan text sky-400 */}
        <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <AlertCircle size={36} className="text-sky-400" />
        </div>
        
        <h1 className="text-6xl font-extrabold text-gray-900 mb-2">404</h1>
        <p className="text-lg font-semibold text-gray-700 mb-1">Halaman Tidak Ditemukan</p>
        <p className="text-sm text-gray-400 mb-8">
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        
        <button
          onClick={() => navigate('/dashboard')}
          /* Button diubah dari blue-600 menjadi sky-500 */
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-500 text-white text-sm font-medium rounded-xl hover:bg-sky-600 transition-all active:scale-95 shadow-md shadow-sky-100"
        >
          <ArrowLeft size={15} />
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}