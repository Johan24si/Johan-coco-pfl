import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Cara Kerja & Keunggulan</h2>
        <p className="text-gray-600 mb-12">Daftar sekarang dan nikmati pengalaman pelayanan yang lebih praktis</p>
        
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto text-left">
          {[
            "Booking jadwal online 24/7",
            "Lihat riwayat perawatan lengkap",
            "Notifikasi pengingat jadwal otomatis",
            "Antrian digital, tidak perlu antre lama",
            "Akses kartu member digital",
            "Diskon khusus member 10%"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
              <div className="bg-emerald-100 text-emerald-600 p-1.5 rounded-full">
                <CheckCircle size={20} />
              </div>
              <span className="font-medium text-gray-800">{item}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="inline-flex px-8 py-4 bg-[#0891b2] text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-lg text-lg">
            Daftar Gratis Sekarang →
          </Link>
          <Link to="/guest/promo" className="inline-flex px-8 py-4 bg-white text-[#0891b2] border-2 border-[#0891b2] font-bold rounded-xl hover:bg-cyan-50 transition-colors text-lg">
            🎁 Lihat Promo
          </Link>
        </div>
      </div>
    </section>
  );
}
