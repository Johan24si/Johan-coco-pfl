import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./tailwind.css";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import Admin from "./Admin"; // Import komponen Admin
import frameworkData from "./framework.json"; // Import data JSON

const App = () => {
  const [view, setView] = useState("guest");

  return (
    <React.StrictMode>
      {/* Navigasi untuk pindah view */}
      <nav className="p-4 bg-slate-900 text-white flex justify-center gap-4 border-b border-slate-700 sticky top-0 z-50">
        <button 
          onClick={() => setView("guest")}
          className={`px-6 py-2 rounded-full font-bold transition-all ${view === "guest" ? "bg-blue-600 shadow-lg shadow-blue-900/50" : "bg-slate-800 hover:bg-slate-700 text-slate-400"}`}
        >
          GUEST MODE
        </button>
        <button 
          onClick={() => setView("admin")}
          className={`px-6 py-2 rounded-full font-bold transition-all ${view === "admin" ? "bg-red-600 shadow-lg shadow-red-900/50" : "bg-slate-800 hover:bg-slate-700 text-slate-400"}`}
        >
          ADMIN MODE
        </button>
      </nav>

      {/* Area Konten Utama */}
      <main className="min-h-screen bg-slate-950">
        {view === "guest" ? (
          /* Menampilkan komponen Guest (Grid/Card) */
          <FrameworkListSearchFilter />
        ) : (
          /* Menampilkan komponen Admin (Table) */
          <Admin data={frameworkData} />
        )}
      </main>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);