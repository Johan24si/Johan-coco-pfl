import { useState } from "react";
// Pastikan path ke file JSON sudah benar sesuai struktur foldermu
import frameworkData from "./framework.json"; 

export default function FrameworkListsearchFilterData() {
  /** 1. Deklarasi State (TIDAK BERUBAH) **/
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  /** 2. Logika Pengambilan Unique Tags (TIDAK BERUBAH) **/
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags || [])),
  ];

  /** 3. Logika Search & Filter (TIDAK BERUBAH) **/
  const filteredFrameworks = frameworkData.filter((framework) => {
    const _searchTerm = searchTerm.toLowerCase();
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = selectedTag ? framework.tags?.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    /* Background dengan Radial Gradient agar tidak flat */
    <div className="min-h-screen bg-[#0b0f1a] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black px-6 py-12 text-slate-100 font-sans">
      
      {/* Header dengan efek Neon */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.8)]"></div>
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 mt-6 mb-3 uppercase tracking-tighter italic">
          🔫 PUBG <span className="text-white">Esports Explorer</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto tracking-wide font-light">
          Analisis database tim pro, strategi, dan performa regional secara real-time.
        </p>
      </div>

      {/* Input Section - Glassmorphism style */}
      <div className="max-w-4xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative group">
          <input
            type="text"
            placeholder="Cari tim atau strategi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 shadow-xl transition-all placeholder:text-slate-500"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-yellow-500 transition-colors">
            🔍
          </div>
        </div>

        <div className="relative">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-slate-700 bg-slate-900/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 shadow-xl transition-all appearance-none cursor-pointer"
          >
            <option value="" className="bg-slate-900">Semua Wilayah & Gaya</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag} className="bg-slate-900">
                {tag.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-yellow-500">
            ▼
          </div>
        </div>
      </div>

      {/* Result Count Indicator */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center gap-4">
        <span className="h-[1px] flex-1 bg-slate-800"></span>
        <div className="px-4 py-1 rounded-full border border-slate-800 bg-slate-900/30 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Menampilkan <span className="text-yellow-500">{filteredFrameworks.length}</span> Entri Data
        </div>
        <span className="h-[1px] flex-1 bg-slate-800"></span>
      </div>

      {/* Grid Layout - Modern Esports Card */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="group relative bg-slate-900/40 rounded-3xl border border-slate-800 hover:border-yellow-500/40 transition-all duration-500 overflow-hidden backdrop-blur-sm"
          >
            {/* Top accent glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Image Container */}
            {item.image && (
              <div className="relative h-48 overflow-hidden bg-gradient-to-b from-slate-800/50 to-transparent flex items-center justify-center p-8">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
                {/* Badge Overlay */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black tracking-tighter border border-white/10 uppercase">
                  Verified Team
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white group-hover:text-yellow-500 transition-colors italic tracking-tighter">
                  {item.name}
                </h2>
                <span className="text-[10px] text-green-400 font-mono">● ACTIVE</span>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6 h-12 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 text-xs">
                  🏢
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Sponsor / Dev</p>
                  <p className="text-xs font-semibold text-slate-300">{item.details?.developer}</p>
                </div>
              </div>

              {/* Tags Rendering */}
              <div className="flex flex-wrap gap-2">
                {item.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-[9px] rounded-md font-black uppercase tracking-tight transition-all duration-300 ${
                      selectedTag === tag 
                      ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]" 
                      : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFrameworks.length === 0 && (
        <div className="text-center py-24 bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-800 max-w-2xl mx-auto">
          <div className="text-5xl mb-4 grayscale opacity-50">🏟️</div>
          <p className="text-xl font-bold text-slate-500 uppercase">Target Tidak Terdeteksi</p>
          <p className="text-slate-600 text-sm mt-2 font-light tracking-widest italic">Coba gunakan parameter pencarian lain.</p>
        </div>
      )}

      {/* Footer Decoration */}
      <div className="mt-24 text-center">
        <p className="text-[10px] text-slate-700 uppercase tracking-[0.5em] font-bold">
          Global Esports Data System v2.0.26
        </p>
      </div>
    </div>
  );
}