import { Star } from 'lucide-react';

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Apa Kata Pasien Kami</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Maria S.", review: "Pelayanan ramah dan profesional. Gigi saya jauh lebih sehat sekarang!" },
            { name: "Budi H.", review: "Booking online sangat mudah, dokternya tepat waktu. Sangat direkomendasikan." },
            { name: "Siti R.", review: "Sebagai member, saya dapat diskon dan pengingat jadwal otomatis. Mantap!" }
          ].map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{t.review}"</p>
              <p className="font-bold text-gray-900">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
