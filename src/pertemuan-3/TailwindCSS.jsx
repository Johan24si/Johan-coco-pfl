import { useState } from "react";

// 🔁 Reusable Input - Battle Royale Style
const InputField = ({ label, name, value, onChange, error, placeholder }) => (
  <div className="mb-6 group">
    <div className="flex justify-between items-end mb-2 ml-1">
      <label className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 group-focus-within:text-yellow-400 transition-colors">
        {label}
      </label>
      {error && <span className="text-[10px] font-bold text-red-500 animate-pulse uppercase tracking-tighter">! {error}</span>}
    </div>
    <div className="relative">
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-5 py-4 rounded-xl border-b-4 transition-all duration-300 outline-none font-mono
          ${error 
            ? 'bg-red-950/30 border-red-600 text-red-200' 
            : 'bg-slate-900/80 border-slate-700 text-yellow-50 focus:bg-slate-800 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10'}`}
        placeholder={placeholder}
      />
      <div className="absolute inset-0 rounded-xl pointer-events-none border border-white/5 opacity-20"></div>
    </div>
  </div>
);

// 🔁 Reusable Select
const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className="mb-6 group">
    <div className="flex justify-between items-end mb-2 ml-1">
      <label className="text-xs font-black uppercase tracking-[0.2em] text-amber-500 group-focus-within:text-yellow-400 transition-colors">
        {label}
      </label>
      {error && <span className="text-[10px] font-bold text-red-500 uppercase">! {error}</span>}
    </div>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-5 py-4 rounded-xl border-b-4 appearance-none transition-all duration-300 outline-none
          ${error 
            ? 'bg-red-950/30 border-red-600 text-red-200' 
            : 'bg-slate-900/80 border-slate-700 text-yellow-50 focus:bg-slate-800 focus:border-yellow-500'}`}
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23f59e0b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'3\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
      >
        <option value="" className="bg-slate-900">Select Package</option>
        {options.map((opt, i) => (
          <option key={i} value={opt} className="bg-slate-900 italic text-yellow-50">{opt}</option>
        ))}
      </select>
    </div>
  </div>
);

export default function PubgStore() {
  // BAGIAN YANG SUDAH DIGANTI SESUAI KOMENTAR:
  const [form, setForm] = useState({
    nickname: "",         // In-Game Nickname
    email: "",            // Email Receipt
    userId: "",           // User ID (angka)
    paketUC: "",          // Pilihan Paket UC
    metodePembayaran: "", // Metode Pembayaran
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};
    if (!form.nickname) err.nickname = "Nickname required";
    if (!form.email) err.email = "Email required";
    else if (!form.email.includes("@")) err.email = "Invalid receipt email";
    
    if (!form.userId) err.userId = "ID required";
    else if (isNaN(form.userId)) err.userId = "ID must be numeric";
    
    if (!form.paketUC) err.paketUC = "Select UC amount";
    if (!form.metodePembayaran) err.metodePembayaran = "Select payment";
    
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setResult(form);
    }
  };

  const isValid =
    form.nickname &&
    form.email &&
    form.userId &&
    form.paketUC &&
    form.metodePembayaran &&
    Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0a0f16] p-4 font-sans antialiased text-slate-200">
      
      {/* 🌪️ Cinematic BG Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-600/10 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="w-full max-w-[1100px] grid lg:grid-cols-5 bg-slate-900/50 rounded-[3rem] border border-white/5 backdrop-blur-sm overflow-hidden shadow-2xl">

        {/* Left Side: Hero Section */}
        <div className="hidden lg:flex lg:col-span-2 flex-col p-12 h-full bg-gradient-to-br from-yellow-500/10 to-transparent">
          <div className="mb-auto">
            <span className="px-3 py-1 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest rounded-sm">Official Partner</span>
            <h1 className="text-6xl font-black italic tracking-tighter text-white mt-4 leading-none uppercase">
              Winner Winner <br />
              <span className="text-yellow-500">Chicken Dinner</span>
            </h1>
          </div>
          <div className="space-y-6">
            <p className="text-slate-400 font-medium leading-relaxed italic border-l-2 border-yellow-500 pl-4">
              Instant delivery to your account. Secure payment guaranteed.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-3 p-8 md:p-14 bg-slate-800/40 relative">
          <h2 className="text-3xl font-black text-white uppercase italic mb-10 flex items-center gap-3">
            UC TOP-UP CENTER <div className="h-1 w-12 bg-yellow-500"></div>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <InputField label="Character ID" name="userId" value={form.userId} onChange={handleChange} error={errors.userId} placeholder="e.g. 512345678" />
              <InputField label="In-Game Nickname" name="nickname" value={form.nickname} onChange={handleChange} error={errors.nickname} placeholder="e.g. PMPL_Winner" />
            </div>

            <InputField label="Email Receipt" name="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="your@email.com" />

            <div className="grid md:grid-cols-2 gap-4">
              <SelectField 
                label="UC Package" 
                name="paketUC" 
                value={form.paketUC} 
                onChange={handleChange} 
                options={["60 UC - Rp 15.000", "325 UC - Rp 75.000", "660 UC - Rp 150.000", "1800 UC - Rp 350.000"]} 
                error={errors.paketUC} 
              />
              <SelectField 
                label="Payment Method" 
                name="metodePembayaran" 
                value={form.metodePembayaran} 
                onChange={handleChange} 
                options={["DANA", "GOPAY", "QRIS"]} 
                error={errors.metodePembayaran} 
              />
            </div>

            <button disabled={!isValid} className={`w-full py-5 rounded-xl font-black text-base uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl italic mt-4
                ${isValid 
                  ? 'bg-yellow-500 text-black hover:bg-yellow-400 hover:-translate-y-1 active:scale-95' 
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'}`}>
              Order Now & Get UC
            </button>
          </form>

          {/* Result Modal */}
          {result && (
            <div className="absolute inset-0 bg-[#0a0f16]/95 backdrop-blur-xl p-10 text-white flex flex-col justify-center animate-in zoom-in duration-300 z-20 border-2 border-yellow-500/50 m-4 rounded-3xl">
              <h3 className="text-2xl font-black uppercase italic mb-6">Order Initialized</h3>
              <div className="space-y-3 bg-slate-900/80 p-6 rounded-2xl border border-white/10 font-mono text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2"><span>NICKNAME</span><span className="text-yellow-500 font-bold">{result.nickname}</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>USER ID</span><span>{result.userId}</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>PACKAGE</span><span>{result.paketUC}</span></div>
                <div className="flex justify-between"><span>GATEWAY</span><span className="text-blue-400 font-bold uppercase">{result.metodePembayaran}</span></div>
              </div>
              <button onClick={() => setResult(null)} className="mt-8 py-3 border border-yellow-500/30 text-yellow-500 text-xs font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all rounded-lg">
                Back to Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}