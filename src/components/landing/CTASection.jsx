import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section id="daftar" className="py-20 bg-[#0891b2]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Mulai Perawatan Gigi Anda Sekarang</h2>
          <p className="text-cyan-100 mb-8 text-lg">
            Daftar gratis untuk menjadi member DentaCare dan nikmati berbagai kemudahan dari kami.
          </p>
          <Link to="/register" className="inline-flex px-8 py-4 bg-white text-[#0891b2] font-bold text-lg rounded-xl hover:bg-cyan-50 transition-colors shadow-lg">
            Daftar Jadi Member
          </Link>
        </div>
      </div>
    </section>
  );
}
