import { Star } from 'lucide-react';

export default function StatsSection() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100 text-center">
          <div>
            <p className="text-4xl font-bold text-[#0891b2] mb-2">500+</p>
            <p className="text-gray-500 font-medium">Pasien Puas</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#0891b2] mb-2">5</p>
            <p className="text-gray-500 font-medium">Dokter Spesialis</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#0891b2] mb-2">10</p>
            <p className="text-gray-500 font-medium">Tahun Pengalaman</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#0891b2] mb-2 flex items-center justify-center gap-1">
              4.9<Star size={24} fill="currentColor" className="text-yellow-400" />
            </p>
            <p className="text-gray-500 font-medium">Rating Google</p>
          </div>
        </div>
      </div>
    </section>
  );
}
