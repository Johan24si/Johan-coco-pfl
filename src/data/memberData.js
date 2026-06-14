export const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Andi Susanto', spec: 'Dokter Gigi Umum', initials: 'AS', color: 'from-blue-500 to-cyan-500', jadwal: 'Senin – Jumat, 08.00 – 17.00', pengalaman: '12 Tahun', lulusan: 'Universitas Indonesia', pasien: 850 },
  { id: 2, name: 'Dr. Rina Melati', spec: 'Orthodontis (Spesialis Behel)', initials: 'RM', color: 'from-purple-500 to-pink-500', jadwal: 'Selasa, Kamis, Sabtu 09.00 – 15.00', pengalaman: '8 Tahun', lulusan: 'Universitas Gadjah Mada', pasien: 620 },
  { id: 3, name: 'Dr. Budi Santoso', spec: 'Bedah Mulut', initials: 'BS', color: 'from-emerald-500 to-teal-500', jadwal: 'Senin, Rabu, Jumat 13.00 – 20.00', pengalaman: '15 Tahun', lulusan: 'Universitas Airlangga', pasien: 1100 },
  { id: 4, name: 'Dr. Sari Dewi', spec: 'Periodonti (Spesialis Gusi)', initials: 'SD', color: 'from-orange-500 to-amber-500', jadwal: 'Rabu, Jumat 10.00 – 18.00', pengalaman: '6 Tahun', lulusan: 'Universitas Padjadjaran', pasien: 380 },
];

export const MOCK_SERVICES = [
  { id: 1, name: 'Pemeriksaan Umum', icon: '🦷', desc: 'Pemeriksaan menyeluruh kondisi gigi dan gusi oleh dokter spesialis. Termasuk X-ray jika diperlukan.', price: 'Rp 100.000', priceNum: 100000, duration: '30 – 45 menit', tag: 'Populer', tagColor: 'bg-blue-100 text-blue-700', category: 'umum' },
  { id: 2, name: 'Tambal Gigi (Filling)', icon: '🔧', desc: 'Menutup lubang pada gigi menggunakan bahan komposit sewarna gigi yang tahan lama.', price: 'Rp 200.000', priceNum: 200000, duration: '45 – 60 menit', tag: 'Sering Dipilih', tagColor: 'bg-green-100 text-green-700', category: 'umum' },
  { id: 3, name: 'Cabut Gigi (Ekstraksi)', icon: '🩺', desc: 'Pencabutan gigi bermasalah, sisa akar, atau gigi bungsu dengan teknik minimal nyeri.', price: 'Rp 250.000', priceNum: 250000, duration: '30 – 60 menit', tag: null, tagColor: null, category: 'umum' },
  { id: 4, name: 'Scaling (Karang Gigi)', icon: '✨', desc: 'Pembersihan karang gigi untuk mencegah radang gusi dan menjaga kesehatan mulut.', price: 'Rp 150.000', priceNum: 150000, duration: '45 – 90 menit', tag: 'Direkomendasikan', tagColor: 'bg-cyan-100 text-cyan-700', category: 'umum' },
  { id: 5, name: 'Perawatan Saluran Akar', icon: '🔬', desc: 'Menyelamatkan gigi terinfeksi parah agar tidak perlu dicabut dengan teknik endodontik modern.', price: 'Rp 800.000', priceNum: 800000, duration: '90 – 120 menit', tag: 'Spesialis', tagColor: 'bg-purple-100 text-purple-700', category: 'spesialis' },
  { id: 6, name: 'Pemutihan Gigi (Bleaching)', icon: '⭐', desc: 'Mencerahkan warna gigi yang kusam menggunakan teknologi laser bleaching terkini.', price: 'Rp 500.000', priceNum: 500000, duration: '60 – 90 menit', tag: 'Estetik', tagColor: 'bg-yellow-100 text-yellow-700', category: 'estetik' },
  { id: 7, name: 'Pasang Behel (Orthodonti)', icon: '😁', desc: 'Meratakan susunan gigi yang tidak rapi menggunakan kawat gigi konvensional atau ceramic bracket.', price: 'Rp 5.000.000', priceNum: 5000000, duration: '18 – 24 bulan', tag: 'Spesialis', tagColor: 'bg-purple-100 text-purple-700', category: 'spesialis' },
  { id: 8, name: 'Implan Gigi', icon: '🦴', desc: 'Penggantian gigi yang hilang secara permanen dengan implan titanium yang kokoh dan alami.', price: 'Rp 8.000.000', priceNum: 8000000, duration: '3 – 6 bulan', tag: 'Premium', tagColor: 'bg-red-100 text-red-700', category: 'spesialis' },
  { id: 9, name: 'Veneer Gigi', icon: '💎', desc: 'Lapisan porselen tipis yang ditempel di permukaan gigi untuk mempercantik senyum secara instan.', price: 'Rp 2.500.000', priceNum: 2500000, duration: '2 – 3 kunjungan', tag: 'Estetik', tagColor: 'bg-yellow-100 text-yellow-700', category: 'estetik' },
  { id: 10, name: 'Perawatan Gusi (Periodontal)', icon: '🌿', desc: 'Perawatan radang dan penyakit gusi (periodontitis) untuk menjaga gigi tetap kuat dan sehat.', price: 'Rp 350.000', priceNum: 350000, duration: '60 – 90 menit', tag: null, tagColor: null, category: 'spesialis' },
];

export const MOCK_PROMOS = [
  { id: 1, title: 'Promo Scaling Gratis!', desc: 'Scaling gratis untuk pasien baru yang mendaftar sebagai member di bulan Juni 2026.', badge: 'Terbatas', badgeColor: 'bg-red-500', category: 'aktif', image: '🦷', color: 'from-blue-500 to-cyan-600', expired: '30 Juni 2026', countdown: true, syarat: 'Berlaku untuk pasien baru, tidak dapat digabung dengan promo lain.' },
  { id: 2, title: 'Diskon 20% Behel Gigi', desc: 'Hemat hingga Rp 1.000.000 untuk pemasangan behel gigi. Berlaku semua jenis bracket.', badge: 'Segera Berakhir', badgeColor: 'bg-orange-500', category: 'aktif', image: '😁', color: 'from-purple-500 to-pink-600', expired: '15 Juni 2026', countdown: true, syarat: 'Tidak berlaku untuk behel damon dan self-ligating.' },
  { id: 3, title: 'Paket Keluarga Sehat', desc: 'Daftar bersama 3 anggota keluarga, hemat 15% untuk semua perawatan rutin.', badge: 'Baru', badgeColor: 'bg-green-500', category: 'aktif', image: '👨‍👩‍👧‍👦', color: 'from-emerald-500 to-teal-600', expired: '31 Juli 2026', countdown: false, syarat: 'Minimal 3 anggota keluarga dalam satu pendaftaran.' },
  { id: 4, title: 'Voucher Ulang Tahun', desc: 'Diskon spesial 30% untuk semua layanan di bulan ulang tahun Anda!', badge: 'Eksklusif', badgeColor: 'bg-pink-500', category: 'aktif', image: '🎂', color: 'from-pink-500 to-rose-600', expired: 'Sesuai Ulang Tahun', countdown: false, syarat: 'Hanya berlaku di bulan ulang tahun. Tunjukkan KTP.' },
  { id: 5, title: 'Reward Pasien Setia', desc: 'Tukar 500 poin loyalitas dengan voucher diskon Rp 200.000 untuk perawatan apa saja.', badge: 'Member Setia', badgeColor: 'bg-amber-500', category: 'aktif', image: '⭐', color: 'from-amber-500 to-orange-600', expired: '31 Des 2026', countdown: false, syarat: 'Minimum akumulasi 500 poin.' },
  { id: 6, title: 'Promo Spesial Lebaran', desc: 'Diskon 25% untuk pemeriksaan umum dan scaling selama periode lebaran.', badge: 'Berakhir', badgeColor: 'bg-gray-400', category: 'berakhir', image: '🌙', color: 'from-gray-400 to-gray-500', expired: '30 Apr 2026', countdown: false, syarat: 'Berlaku 20-30 April 2026.' },
];

export const MOCK_VOUCHERS = [
  { id: 'VC001', title: 'Diskon Scaling 50%', desc: 'Hemat 50% untuk layanan pembersihan karang gigi', value: 'Rp 75.000', code: 'SCALING50', status: 'aktif', expired: '30 Jun 2026', category: 'aktif' },
  { id: 'VC002', title: 'Voucher Ulang Tahun', desc: 'Hadiah spesial dari DentaCare untuk hari ulang tahunmu!', value: 'Rp 100.000', code: 'HBDYOU2026', status: 'aktif', expired: '30 Jun 2026', category: 'aktif' },
  { id: 'VC003', title: 'Pasien Setia - Tukar Poin', desc: 'Penukaran 500 poin loyalitas', value: 'Rp 200.000', code: 'LOYAL500', status: 'aktif', expired: '31 Des 2026', category: 'aktif' },
  { id: 'VC004', title: 'Diskon Tambal Gigi 30%', desc: 'Diskon 30% untuk layanan tambal gigi pertama', value: 'Rp 60.000', code: 'TAMBAL30', status: 'terpakai', expired: '15 Apr 2026', category: 'terpakai' },
  { id: 'VC005', title: 'Voucher Follow-Up', desc: 'Diberikan setelah kunjungan pertama. Diskon pemeriksaan berikutnya.', value: 'Rp 50.000', code: 'FOLLOWUP', status: 'kadaluarsa', expired: '28 Feb 2026', category: 'kadaluarsa' },
];

export const MOCK_LOYALTY = {
  totalPoin: 1250,
  level: 'Gold Member',
  nextLevel: 'Platinum Member',
  nextLevelPoin: 2000,
  history: [
    { id: 1, type: 'masuk', date: '12 Mei 2026', desc: 'Poin dari kunjungan – Pembersihan Gigi', poin: 150 },
    { id: 2, type: 'masuk', date: '10 Apr 2026', desc: 'Poin dari kunjungan – Konsultasi Behel', poin: 200 },
    { id: 3, type: 'keluar', date: '05 Apr 2026', desc: 'Penukaran voucher diskon Rp 200.000', poin: -500 },
    { id: 4, type: 'masuk', date: '15 Mar 2026', desc: 'Poin dari kunjungan – Tambal Gigi', poin: 350 },
    { id: 5, type: 'masuk', date: '05 Feb 2026', desc: 'Poin dari kunjungan – Pemeriksaan Rutin', poin: 100 },
    { id: 6, type: 'masuk', date: '01 Jan 2026', desc: 'Bonus Poin Tahun Baru', poin: 200 },
    { id: 7, type: 'keluar', date: '01 Nov 2025', desc: 'Penukaran voucher ulang tahun', poin: -300 },
    { id: 8, type: 'masuk', date: '20 Sep 2025', desc: 'Bonus Pasien Setia (1 Tahun)', poin: 500 },
  ],
  rewards: [
    { id: 1, name: 'Voucher Rp 50.000', poin: 200, stock: 10, icon: '🎫' },
    { id: 2, name: 'Voucher Rp 100.000', poin: 400, stock: 5, icon: '🎟️' },
    { id: 3, name: 'Voucher Rp 200.000', poin: 500, stock: 3, icon: '💳' },
    { id: 4, name: 'Scaling Gratis', poin: 600, stock: 2, icon: '✨' },
    { id: 5, name: 'Pemeriksaan Gratis', poin: 300, stock: 8, icon: '🦷' },
    { id: 6, name: 'Diskon 30% Tambal Gigi', poin: 350, stock: 4, icon: '🔧' },
  ],
};

export const MOCK_RIWAYAT_DETAIL = [
  { id: 1, date: '12 Mei 2026', doc: 'Dr. Rina Melati', service: 'Pembersihan Gigi (Scaling)', tindakan: ['Scaling ultrasonic atas bawah', 'Polishing gigi', 'Edukasi kebersihan mulut'], obat: ['Obat kumur antiseptik 200ml', 'Pasta gigi fluoride'], catatan: 'Kondisi gusi baik, karang gigi ringan sudah dibersihkan. Disarankan scaling 6 bulan sekali.', cost: 'Rp 150.000', poin: 150, hasRontgen: false, bpjs: false },
  { id: 2, date: '10 Apr 2026', doc: 'Dr. Andi Susanto', service: 'Konsultasi Behel', tindakan: ['Pemeriksaan maloklusi', 'Foto X-ray panoramik', 'Konsultasi rencana perawatan'], obat: [], catatan: 'Pasien memiliki crossbite ringan pada gigi anterior. Direkomendasikan behel full metal 18-24 bulan.', cost: 'Rp 200.000', poin: 200, hasRontgen: true, bpjs: false },
  { id: 3, date: '15 Mar 2026', doc: 'Dr. Budi Santoso', service: 'Tambal Gigi Komposit', tindakan: ['Pengeboran kavitas', 'Etching dan bonding', 'Aplikasi komposit sewarna gigi'], obat: ['Ibuprofen 400mg (3x1)', 'Obat kumur antiseptik'], catatan: 'Tambalan komposit gigi geraham bawah kanan (36). Hasil baik.', cost: 'Rp 350.000', poin: 350, hasRontgen: false, bpjs: false },
  { id: 4, date: '05 Feb 2026', doc: 'Dr. Andi Susanto', service: 'Pemeriksaan Umum', tindakan: ['Pemeriksaan visual seluruh gigi', 'Pengecekan gusi', 'Foto rontgen periapikal'], obat: [], catatan: 'Ditemukan karies kecil pada gigi 36. Perlu ditambal pada kunjungan berikutnya.', cost: 'Rp 100.000', poin: 100, hasRontgen: true, bpjs: true },
  { id: 5, date: '12 Nov 2025', doc: 'Dr. Rina Melati', service: 'Pembersihan Gigi (Scaling)', tindakan: ['Scaling ultrasonic', 'Subgingival curettage ringan', 'Polishing'], obat: ['Obat kumur Chlorhexidine'], catatan: 'Sedikit pendarahan saat probing, gingivitis ringan. Instruksi sikat gigi yang benar.', cost: 'Rp 150.000', poin: 150, hasRontgen: false, bpjs: false },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'reminder', title: 'Reminder Kontrol Behel', msg: 'Jadwal kontrol behel Anda 2 hari lagi — Selasa, 16 Juni 2026 pukul 10.30 WIB bersama Dr. Andi Susanto.', time: '1 jam lalu', read: false, icon: '🦷', color: 'border-cyan-200 bg-cyan-50' },
  { id: 2, type: 'promo', title: 'Promo Scaling Gratis!', msg: 'Promo scaling gratis untuk member baru hampir berakhir! Berlaku hingga 30 Juni 2026.', time: '3 jam lalu', read: false, icon: '🎁', color: 'border-amber-200 bg-amber-50' },
  { id: 3, type: 'poin', title: 'Poin Masuk!', msg: 'Selamat! Anda mendapatkan 150 poin dari kunjungan 12 Mei 2026. Total poin: 1.250.', time: '5 hari lalu', read: true, icon: '⭐', color: 'border-yellow-200 bg-yellow-50' },
  { id: 4, type: 'voucher', title: 'Voucher Ulang Tahun Aktif', msg: 'Voucher diskon 30% (Rp 100.000) telah aktif untuk bulan ini.', time: '1 minggu lalu', read: true, icon: '🎂', color: 'border-pink-200 bg-pink-50' },
  { id: 5, type: 'followup', title: 'Follow-Up Pasca Tambal Gigi', msg: 'Bagaimana kondisi gigi Anda setelah tambal gigi 15 Mar? Kami ingin memastikan Anda baik-baik saja.', time: '2 minggu lalu', read: true, icon: '💬', color: 'border-purple-200 bg-purple-50' },
];

export const CRM_AUTOMATIONS = [
  { id: 1, title: 'Reminder Kontrol Rutin', trigger: 'Setiap 6 bulan sejak kunjungan terakhir', channel: 'WhatsApp + Email', status: 'aktif', icon: '📅', color: 'text-blue-600 bg-blue-50' },
  { id: 2, title: 'Reminder Kontrol Behel', trigger: 'Setiap 4–6 minggu sejak kunjungan behel', channel: 'WhatsApp', status: 'aktif', icon: '😁', color: 'text-purple-600 bg-purple-50' },
  { id: 3, title: 'Promo Ulang Tahun', trigger: '7 hari sebelum ulang tahun pasien', channel: 'WhatsApp + Email', status: 'aktif', icon: '🎂', color: 'text-pink-600 bg-pink-50' },
  { id: 4, title: 'Voucher Setelah Kunjungan', trigger: '1 jam setelah kunjungan selesai', channel: 'Email', status: 'aktif', icon: '🎫', color: 'text-green-600 bg-green-50' },
  { id: 5, title: 'Follow-Up Pasca Perawatan', trigger: '3 hari setelah perawatan besar', channel: 'WhatsApp', status: 'aktif', icon: '💬', color: 'text-cyan-600 bg-cyan-50' },
  { id: 6, title: 'Reaktivasi Pasien Tidak Aktif', trigger: 'Pasien tidak kunjungan >6 bulan', channel: 'WhatsApp + Email', status: 'aktif', icon: '🔔', color: 'text-orange-600 bg-orange-50' },
  { id: 7, title: 'Reward Pasien Setia', trigger: 'Setiap 10 kunjungan kumulatif', channel: 'WhatsApp', status: 'aktif', icon: '⭐', color: 'text-amber-600 bg-amber-50' },
  { id: 8, title: 'Broadcast Info Layanan Baru', trigger: 'Manual (sesuai jadwal broadcast)', channel: 'WhatsApp + Email', status: 'jadwal', icon: '📣', color: 'text-indigo-600 bg-indigo-50' },
];

export const PATIENT_JOURNEY = [
  { id: 1, title: 'Pasien Baru Daftar', desc: 'Pasien mendaftar online sebagai member DentaCare melalui website.', icon: '👋', color: 'bg-blue-500', detail: 'Form pendaftaran → Verifikasi → Member aktif' },
  { id: 2, title: 'Booking Online', desc: 'Pilih dokter, layanan, tanggal & jam yang tersedia secara real-time.', icon: '📅', color: 'bg-cyan-500', detail: 'Pilih dokter → Pilih layanan → Konfirmasi jadwal' },
  { id: 3, title: 'Notifikasi & Reminder', desc: 'Sistem mengirim reminder otomatis via WhatsApp & Email H-1.', icon: '🔔', color: 'bg-purple-500', detail: 'Reminder H-1 & H-0 → Konfirmasi kehadiran' },
  { id: 4, title: 'Datang ke Klinik', desc: 'Pasien datang, check-in digital, tidak perlu antre panjang.', icon: '🏥', color: 'bg-teal-500', detail: 'Check-in digital → Ruang tunggu → Dipanggil dokter' },
  { id: 5, title: 'Pemeriksaan & Perawatan', desc: 'Dokter melakukan pemeriksaan dan tindakan perawatan sesuai kebutuhan.', icon: '🦷', color: 'bg-emerald-500', detail: 'Pemeriksaan → Tindakan → Catatan medis' },
  { id: 6, title: 'Mendapat Poin Loyalitas', desc: 'Setiap kunjungan otomatis menghasilkan poin yang bisa ditukarkan reward.', icon: '⭐', color: 'bg-amber-500', detail: 'Poin masuk otomatis → Akumulasi → Tukar reward' },
  { id: 7, title: 'Voucher Follow-Up', desc: 'Voucher diskon dikirim otomatis 1 jam setelah kunjungan selesai.', icon: '🎫', color: 'bg-pink-500', detail: 'Auto-send voucher → Berlaku 30 hari' },
  { id: 8, title: 'Menjadi Pasien Setia', desc: 'Pasien setia menikmati reward eksklusif, prioritas jadwal, dan layanan VIP.', icon: '👑', color: 'bg-amber-600', detail: 'Gold → Platinum → VIP Member' },
];
