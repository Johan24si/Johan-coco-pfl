import { useState } from 'react';
import { Calendar, Clock, Upload, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { MOCK_DOCTORS, MOCK_SERVICES } from '../../data/memberData';
import { useLocation } from 'react-router-dom';

const SLOTS = ['08.00', '09.00', '10.00', '10.30', '11.00', '13.00', '13.30', '14.00', '15.00', '15.30', '16.00', '19.00'];
const BOOKED = ['09.00', '13.00', '15.00'];

const STEPS = ['Pilih Dokter & Layanan', 'Pilih Jadwal', 'Konfirmasi'];

export default function BookingPage() {
  const location = useLocation();
  const preselect = location.state?.service || '';

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    dokter: '',
    layanan: preselect,
    tanggal: '',
    waktu: '',
    keluhan: '',
    bpjs: false,
    foto: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const selectedDokter = MOCK_DOCTORS.find(d => d.name === form.dokter);
  const selectedLayanan = MOCK_SERVICES.find(s => s.name === form.layanan);

  const handleNext = () => {
    if (step === 0 && (!form.dokter || !form.layanan)) {
      showToast('Pilih dokter dan layanan terlebih dahulu!');
      return;
    }
    if (step === 1 && (!form.tanggal || !form.waktu)) {
      showToast('Pilih tanggal dan waktu terlebih dahulu!');
      return;
    }
    setStep(s => s + 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Booking Berhasil! 🎉</h2>
          <p className="text-gray-500 mb-6">
            Jadwal kunjungan Anda telah dikonfirmasi. Kami akan mengirimkan reminder via WhatsApp <strong>H-1</strong> sebelum jadwal.
          </p>
          <div className="bg-cyan-50 border border-cyan-100 p-5 rounded-2xl mb-8 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Dokter:</span>
              <span className="font-semibold text-gray-900">{form.dokter}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Layanan:</span>
              <span className="font-semibold text-gray-900">{form.layanan}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tanggal:</span>
              <span className="font-semibold text-gray-900">{form.tanggal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Pukul:</span>
              <span className="font-semibold text-gray-900">{form.waktu} WIB</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a href="/member/dashboard" className="w-full py-3 bg-[#0891b2] text-white font-bold rounded-xl hover:bg-cyan-700">
              Lihat Dashboard
            </a>
            <a href="/" className="w-full py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50">
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className="fixed top-24 right-6 bg-red-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50">
          <AlertCircle size={18} />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Hero */}
      <section className="pt-28 pb-10 bg-gradient-to-br from-[#0891b2] to-teal-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Booking Jadwal Online</h1>
          <p className="text-cyan-100">Pilih dokter, layanan & jadwal yang Anda inginkan</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                i === step ? 'bg-[#0891b2] text-white shadow-lg shadow-cyan-200' :
                i < step ? 'bg-green-500 text-white' :
                'bg-white text-gray-400 border border-gray-200'
              }`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < step ? 'bg-white text-green-600' : i === step ? 'bg-white text-[#0891b2]' : 'bg-gray-100 text-gray-500'
                }`}>
                  {i < step ? '✓' : i + 1}
                </span>
                <span className="hidden sm:block">{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-green-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          {/* STEP 0 — Dokter & Layanan */}
          {step === 0 && (
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Pilih Dokter & Layanan</h2>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Pilih Dokter</label>
                <div className="grid gap-3">
                  {MOCK_DOCTORS.map(doc => (
                    <button
                      key={doc.id}
                      onClick={() => setForm(f => ({ ...f, dokter: doc.name }))}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex gap-4 items-center ${
                        form.dokter === doc.name
                          ? 'border-[#0891b2] bg-cyan-50'
                          : 'border-gray-100 hover:border-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${doc.color} text-white flex items-center justify-center font-bold flex-shrink-0`}>
                        {doc.initials}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.spec}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{doc.jadwal}</p>
                      </div>
                      {form.dokter === doc.name && <CheckCircle size={20} className="text-[#0891b2] flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Pilih Layanan Perawatan</label>
                <div className="grid grid-cols-2 gap-3">
                  {MOCK_SERVICES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setForm(f => ({ ...f, layanan: s.name }))}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        form.layanan === s.name
                          ? 'border-[#0891b2] bg-cyan-50'
                          : 'border-gray-100 hover:border-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{s.icon}</div>
                      <p className="text-sm font-semibold text-gray-900 leading-snug">{s.name}</p>
                      <p className="text-xs text-[#0891b2] font-medium mt-1">Mulai {s.price}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 1 — Jadwal */}
          {step === 1 && (
            <div className="p-8 space-y-7">
              <h2 className="text-xl font-bold text-gray-900">Pilih Tanggal & Waktu</h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Kunjungan</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={form.tanggal}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setForm(f => ({ ...f, tanggal: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Pilih Waktu <span className="font-normal text-gray-400 text-xs ml-1">(merah = sudah penuh)</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {SLOTS.map(slot => {
                    const isBooked = BOOKED.includes(slot);
                    const isSelected = form.waktu === slot;
                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        onClick={() => setForm(f => ({ ...f, waktu: slot }))}
                        className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                          isBooked
                            ? 'bg-red-50 text-red-300 border-red-100 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#0891b2] text-white border-[#0891b2] shadow-lg shadow-cyan-200'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#0891b2] hover:text-[#0891b2]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Keluhan / Catatan Pasien (opsional)</label>
                <textarea
                  value={form.keluhan}
                  onChange={e => setForm(f => ({ ...f, keluhan: e.target.value }))}
                  rows={3}
                  placeholder="Deskripsikan keluhan atau kondisi gigi Anda..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Foto Gigi (opsional)</label>
                <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#0891b2] hover:bg-cyan-50 transition-all">
                  <Upload size={24} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{form.foto ? form.foto.name : 'Klik untuk upload foto gigi Anda'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => setForm(f => ({ ...f, foto: e.target.files[0] }))} />
                </label>
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <input
                  type="checkbox"
                  id="bpjs"
                  checked={form.bpjs}
                  onChange={e => setForm(f => ({ ...f, bpjs: e.target.checked }))}
                  className="w-4 h-4 text-[#0891b2] rounded"
                />
                <label htmlFor="bpjs" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Gunakan BPJS Kesehatan
                  <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">BPJS</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 2 — Konfirmasi */}
          {step === 2 && (
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Booking</h2>

              <div className="space-y-4 mb-8">
                {selectedDokter && (
                  <div className={`flex gap-4 items-center p-4 rounded-2xl bg-gradient-to-r ${selectedDokter.color} text-white`}>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold">{selectedDokter.initials}</div>
                    <div>
                      <p className="font-bold">{selectedDokter.name}</p>
                      <p className="text-white/80 text-sm">{selectedDokter.spec}</p>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
                  {[
                    { label: 'Layanan', value: form.layanan },
                    { label: 'Tanggal', value: form.tanggal },
                    { label: 'Waktu', value: form.waktu + ' WIB' },
                    { label: 'BPJS', value: form.bpjs ? '✅ Ya' : '—' },
                    { label: 'Keluhan', value: form.keluhan || '—' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-start text-sm">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-semibold text-gray-900 text-right max-w-[60%]">{item.value}</span>
                    </div>
                  ))}
                </div>

                {selectedLayanan && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-cyan-50 border border-cyan-100 p-4 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">Estimasi Biaya</p>
                      <p className="font-bold text-[#0891b2] text-lg">
                        {form.bpjs ? 'Ditanggung BPJS' : `Mulai ${selectedLayanan.price}`}
                      </p>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                      <p className="text-xs text-gray-500 mb-1">Estimasi Durasi</p>
                      <p className="font-bold text-gray-900 text-lg">{selectedLayanan.duration}</p>
                    </div>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3">
                  <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-semibold mb-1">Reminder Otomatis</p>
                    <p>Kami akan mengirimkan reminder via <strong>WhatsApp & Email</strong> H-1 sebelum jadwal kunjungan Anda.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="px-8 pb-8 flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                ← Kembali
              </button>
            )}
            {step < 2 ? (
              <button
                onClick={handleNext}
                className="flex-1 py-3.5 bg-gradient-to-r from-[#0891b2] to-teal-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-cyan-100"
              >
                Lanjut <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 py-3.5 bg-gradient-to-r from-[#0891b2] to-teal-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-cyan-100"
              >
                ✓ Konfirmasi Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
