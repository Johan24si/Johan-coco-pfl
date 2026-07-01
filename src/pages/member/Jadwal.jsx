import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { fetchMyJadwal, updateJadwalStatus } from '../../lib/supabaseService';

export default function Jadwal() {
  const [tab, setTab] = useState('Mendatang');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const { data, error: err } = await fetchMyJadwal();
    if (err) setError(err);
    else setJadwalList(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = jadwalList.filter(j => {
    if (tab === 'Mendatang') return j.status === 'pending' || j.status === 'confirmed';
    if (tab === 'Selesai') return j.status === 'completed';
    if (tab === 'Dibatalkan') return j.status === 'cancelled';
    return false;
  });

  const openCancelModal = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmCancel = async () => {
    setStatusUpdating(true);
    const { error: err } = await updateJadwalStatus(selectedId, 'cancelled');
    setStatusUpdating(false);

    if (err) {
      alert("Gagal membatalkan jadwal: " + err);
    } else {
      setModalOpen(false);
      loadData();
    }
  };

  const getStatusDisplay = (status) => {
    if (status === 'pending') return { label: 'Menunggu', color: 'bg-amber-100 text-amber-700' };
    if (status === 'confirmed') return { label: 'Terkonfirmasi', color: 'bg-blue-100 text-blue-700' };
    if (status === 'completed') return { label: 'Selesai', color: 'bg-green-100 text-green-700' };
    if (status === 'cancelled') return { label: 'Dibatalkan', color: 'bg-red-100 text-red-700' };
    return { label: status, color: 'bg-gray-100 text-gray-700' };
  };

  if (loading) {
    return <div className="flex items-center justify-center py-24"><Loader2 size={32} className="animate-spin text-cyan-600" /></div>;
  }

  if (error) {
    return <div className="flex flex-col items-center justify-center py-24 gap-3 text-red-500"><AlertCircle size={32} /> <p>{error}</p></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Jadwal Saya</h1>
        <p className="text-gray-500 text-sm">Kelola jadwal kunjungan Anda ke DentaCare.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-6">
        {['Mendatang', 'Selesai', 'Dibatalkan'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-[#0891b2] text-[#0891b2]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Calendar size={24} />
            </div>
            <p className="text-gray-500 font-medium">Tidak ada jadwal {tab.toLowerCase()}.</p>
          </div>
        ) : (
          filtered.map(j => {
            const statusDisplay = getStatusDisplay(j.status);
            const dateObj = new Date(j.tanggal);
            const dayNum = dateObj.getDate();
            const dayName = dateObj.toLocaleDateString('id-ID', { weekday: 'long' });
            
            return (
              <div key={j.id} className="bg-white border border-gray-100 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
                
                <div className="flex gap-5 items-start md:items-center">
                  <div className="w-16 h-16 bg-cyan-50 rounded-xl flex flex-col items-center justify-center text-[#0891b2] flex-shrink-0">
                    <span className="text-xs font-bold uppercase">{dayName}</span>
                    <span className="text-xl font-black leading-none">{dayNum}</span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${statusDisplay.color}`}>{statusDisplay.label}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{j.layanan?.nama}</h3>
                    <p className="text-gray-500 text-sm mb-2">{j.pasien?.nama}</p>
                    
                    <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-600">
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-400" /> {dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-gray-400" /> {j.jam_mulai}</span>
                    </div>
                  </div>
                </div>

                {tab === 'Mendatang' && (
                  <div className="flex items-center gap-3 md:border-l md:border-gray-100 md:pl-6">
                    <button onClick={() => openCancelModal(j.id)} className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors">Batal</button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal Batal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Batalkan Jadwal?</h3>
            <p className="text-sm text-gray-500 mb-6">Apakah Anda yakin ingin membatalkan jadwal ini? Tindakan ini tidak dapat diurungkan.</p>
            <div className="flex gap-3">
              <button onClick={() => setModalOpen(false)} disabled={statusUpdating} className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 disabled:opacity-50">Tutup</button>
              <button onClick={confirmCancel} disabled={statusUpdating} className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 disabled:opacity-50 flex justify-center items-center gap-2">
                {statusUpdating ? <><Loader2 size={16} className="animate-spin"/> Proses...</> : 'Ya, Batalkan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
