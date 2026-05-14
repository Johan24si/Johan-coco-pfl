import React from "react";
const Admin = ({ data }) => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Panel Manajemen Tim (Admin)</h2>
        <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
          + Tambah Tim Baru
        </button>
      </div>

      <div className="overflow-x-auto bg-slate-900 rounded-xl shadow-2xl border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 uppercase text-xs tracking-wider">
              <th className="p-4 font-bold border-b border-slate-700">ID</th>
              <th className="p-4 font-bold border-b border-slate-700">Logo</th>
              <th className="p-4 font-bold border-b border-slate-700">Nama Tim</th>
              <th className="p-4 font-bold border-b border-slate-700">Tags</th>
              <th className="p-4 font-bold border-b border-slate-700">Developer</th>
              <th className="p-4 font-bold border-b border-slate-700 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-slate-300 divide-y divide-slate-800">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-mono text-slate-500 text-sm">#{item.id}</td>
                <td className="p-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-lg p-1 flex items-center justify-center border border-slate-700">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                  </div>
                </td>
                <td className="p-4 font-bold text-white text-lg">{item.name}</td>
                <td className="p-4 text-sm italic text-slate-400">{item.details.developer}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button className="text-amber-500 hover:text-amber-400 font-semibold text-sm">Edit</button>
                    <button className="text-red-500 hover:text-red-400 font-semibold text-sm">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;