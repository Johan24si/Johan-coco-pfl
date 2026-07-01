import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export default function FeatureSection() {
  return (
    <section id="layanan" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Layanan Unggulan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan berbagai layanan perawatan gigi dengan fasilitas modern dan ditangani oleh dokter spesialis berpengalaman.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '✨', title: "Pembersihan Gigi (Scaling)", price: "Rp 150.000", desc: "Membersihkan karang gigi untuk mencegah radang gusi." },
            { icon: '🔧', title: "Tambal Gigi", price: "Rp 200.000", desc: "Perawatan untuk gigi berlubang menggunakan bahan sewarna gigi." },
            { icon: '🩺', title: "Cabut Gigi", price: "Rp 250.000", desc: "Pencabutan gigi bermasalah atau sisa akar." },
            { icon: '😁', title: "Behel Gigi (Orthodonti)", price: "Rp 5.000.000", desc: "Merawat susunan gigi agar lebih rapi dan sehat." },
            { icon: '⭐', title: "Pemutihan Gigi", price: "Rp 500.000", desc: "Mencerahkan warna gigi yang kusam atau kuning." },
            { icon: '🔬', title: "Perawatan Saluran Akar", price: "Rp 800.000", desc: "Menyelamatkan gigi infeksi agar tidak perlu dicabut." },
          ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 mb-6 text-sm">{s.desc}</p>
              <div className="flex items-center justify-between">
                <div className="inline-block px-4 py-1.5 bg-cyan-50 text-[#0891b2] font-semibold rounded-lg text-sm">
                  Mulai {s.price}
                </div>
                <Link to="/guest/booking" className="text-sm text-[#0891b2] font-semibold hover:underline">
                  Booking →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
