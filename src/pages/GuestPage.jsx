import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, CheckCircle, Calendar, Users, Star, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function GuestPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Section 2: Hero */}
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
                <a href="#daftar" className="px-8 py-3.5 bg-[#0891b2] text-white font-semibold rounded-xl hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-200 text-center text-lg">
                  Daftar Jadi Member
                </a>
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

      {/* Section 3: Statistik */}
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
              <p className="text-4xl font-bold text-[#0891b2] mb-2 flex items-center justify-center gap-1">4.9<Star size={24} fill="currentColor" className="text-yellow-400" /></p>
              <p className="text-gray-500 font-medium">Rating Google</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Layanan Unggulan */}
      <section id="layanan" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Layanan Unggulan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kami menyediakan berbagai layanan perawatan gigi dengan fasilitas modern dan ditangani oleh dokter spesialis berpengalaman.</p>
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
                  <Link to="/guest/booking" className="text-sm text-[#0891b2] font-semibold hover:underline">Booking →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Keunggulan Member */}
      <section className="py-20 bg-[#f0f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Keunggulan Menjadi Member</h2>
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
            <a href="#daftar" className="inline-flex px-8 py-4 bg-[#0891b2] text-white font-bold rounded-xl hover:bg-cyan-700 transition-colors shadow-lg text-lg">
              Daftar Gratis Sekarang →
            </a>
            <Link to="/guest/promo" className="inline-flex px-8 py-4 bg-white text-[#0891b2] border-2 border-[#0891b2] font-bold rounded-xl hover:bg-cyan-50 transition-colors text-lg">
              🎁 Lihat Promo
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Tim Dokter */}
      <section id="dokter" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Dokter Kami</h2>
            <p className="text-gray-600">Dokter spesialis berpengalaman yang siap merawat senyum Anda.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Andi Susanto", spec: "Dokter Gigi Umum", jadwal: "Senin-Jumat 08.00-17.00", initials: "AS", color: "from-blue-500 to-cyan-500" },
              { name: "Dr. Rina Melati", spec: "Orthodontis", jadwal: "Selasa, Kamis, Sabtu 09.00-15.00", initials: "RM", color: "from-purple-500 to-pink-500" },
              { name: "Dr. Budi Santoso", spec: "Bedah Mulut", jadwal: "Senin, Rabu, Jumat 13.00-20.00", initials: "BS", color: "from-emerald-500 to-teal-500" }
            ].map((doc, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${doc.color} text-white flex items-center justify-center text-3xl font-bold mb-6 shadow-md`}>
                  {doc.initials}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{doc.name}</h3>
                <p className="text-[#0891b2] font-medium mb-4">{doc.spec}</p>
                <div className="flex flex-col gap-2 items-center text-sm text-gray-500 mb-8 bg-gray-50 py-3 rounded-lg">
                  <div className="flex items-center gap-2"><Calendar size={14} /> Jadwal Praktek</div>
                  <div className="font-medium text-gray-700">{doc.jadwal}</div>
                </div>
                <Link to="/login" className="block w-full py-2.5 bg-gray-50 text-[#0891b2] font-semibold rounded-lg hover:bg-[#0891b2] hover:text-white transition-colors border border-gray-100">
                  Booking →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Testimonial */}
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
                  {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 mb-6 italic">"{t.review}"</p>
                <p className="font-bold text-gray-900">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Form Pendaftaran (id="daftar") */}
      <section id="daftar" className="py-20 bg-[#0891b2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Daftar Jadi Member DentaCare</h2>
            <p className="text-cyan-100">Gratis selamanya. Nikmati semua keuntungan member.</p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            <RegisterForm />
          </div>
        </div>
      </section>

      {/* Section 9: Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#0891b2] rounded-xl flex items-center justify-center">
                <Stethoscope size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white leading-none">DentaCare</h1>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6">Senyum Sehat, Hidup Lebih Baik. Memberikan pelayanan dokter gigi terbaik untuk Anda dan keluarga.</p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">Layanan</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Pembersihan Gigi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tambal Gigi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cabut Gigi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Orthodonti (Behel)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pemutihan Gigi</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">Jam Operasional</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span>Senin - Jumat:</span> <span className="text-white">08.00 - 20.00</span></li>
              <li className="flex justify-between"><span>Sabtu:</span> <span className="text-white">09.00 - 15.00</span></li>
              <li className="flex justify-between"><span>Minggu:</span> <span className="text-red-400">Tutup</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 font-bold text-[#0891b2]">WA</span>
                <span>0812-3456-7890</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 font-bold text-[#0891b2]">@</span>
                <span>info@dentacare.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 font-bold text-[#0891b2]">📍</span>
                <span>Jl. Sehat Selalu No. 88, Jakarta Selatan 12345</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
          © 2026 DentaCare - Klinik Gigi. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Inlined form component for the landing page
function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', dob: '', password: '', confirm: '', agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Kata sandi tidak cocok!");
      return;
    }
    if (!form.agree) {
      alert("Anda harus menyetujui syarat & ketentuan.");
      return;
    }
    
    // Simulate register
    const registered = JSON.parse(localStorage.getItem('dentacare_registered_members') || '[]');
    const existing = registered.find(m => m.email === form.email);
    if (existing) {
      alert('Email sudah terdaftar. Silakan login.');
      return;
    }
    const newMember = { ...form, id: Date.now() };
    registered.push(newMember);
    localStorage.setItem('dentacare_registered_members', JSON.stringify(registered));
    
    // Auto login
    localStorage.setItem('dentacare_member_token', `token-${Date.now()}`);
    localStorage.setItem('dentacare_member_name', form.name);
    localStorage.setItem('dentacare_member_email', form.email);
    localStorage.setItem('dentacare_member_role', 'member');
    
    alert("Pendaftaran berhasil!");
    // Need full page reload to sync auth context since this is outside AuthProvider scope or use navigate, 
    // but window.location.href ensures clean state for token read
    window.location.href = '/member/dashboard';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input required type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all" placeholder="Budi Santoso" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP / WhatsApp</label>
          <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all" placeholder="0812xxxx" />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all" placeholder="budi@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
          <input required type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
          <input required type="password" minLength={8} name="password" value={form.password} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all" placeholder="Min. 8 karakter" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi</label>
          <input required type="password" minLength={8} name="confirm" value={form.confirm} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all" placeholder="Ulangi kata sandi" />
        </div>
      </div>

      <div className="flex items-start gap-3 mt-6">
        <input required type="checkbox" name="agree" checked={form.agree} onChange={handleChange} className="mt-1 w-4 h-4 text-[#0891b2] border-gray-300 rounded focus:ring-[#0891b2]" />
        <label className="text-sm text-gray-600">Saya setuju dengan Syarat & Ketentuan serta Kebijakan Privasi yang berlaku di DentaCare.</label>
      </div>

      <button type="submit" className="w-full py-4 bg-[#0891b2] text-white font-bold text-lg rounded-xl hover:bg-cyan-700 transition-colors shadow-md mt-6">
        Daftar Sekarang
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Sudah punya akun? <Link to="/guest/login" className="text-[#0891b2] font-semibold hover:underline">Login di sini</Link>
      </p>
    </form>
  );
}
