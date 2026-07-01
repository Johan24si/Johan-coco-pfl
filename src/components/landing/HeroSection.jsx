import { Link } from 'react-router-dom';
import { Stethoscope, Calendar, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-[#f0f9ff] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Senyum Sehat, <br/><span className="text-[#0891b2]">Hidup Lebih Baik</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Dapatkan perawatan gigi profesional dari dokter berpengalaman. Daftar sebagai member dan nikmati kemudahan booking online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="px-8 py-3.5 bg-[#0891b2] text-white font-semibold rounded-xl hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-200 text-center text-lg">
                Mulai Sekarang
              </Link>
              <Link to="/guest/layanan" className="px-8 py-3.5 bg-white text-[#0891b2] border-2 border-[#0891b2] font-semibold rounded-xl hover:bg-cyan-50 transition-colors text-center text-lg">
                Lihat Layanan
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center relative">
            <div className="absolute inset-0 bg-[#0891b2] rounded-full blur-3xl opacity-20 -z-10"></div>
            {/* Simple illustration using Lucide icons */}
            <div className="w-[400px] h-[400px] bg-white rounded-full flex items-center justify-center shadow-2xl relative">
              <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-lg animate-bounce" style={{animationDuration: '3s'}}>
                <Stethoscope className="text-[#0891b2]" size={32} />
              </div>
              <div className="absolute bottom-10 left-10 bg-white p-4 rounded-2xl shadow-lg animate-bounce" style={{animationDuration: '4s'}}>
                <Calendar className="text-emerald-500" size={32} />
              </div>
              <Users size={180} className="text-[#0891b2] opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
