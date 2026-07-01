import { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle, Shield, User as UserIcon, MoreVertical, RefreshCw } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Table from '../components/Table';
import InputField from '../components/InputField';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { fetchAllProfiles, updateUserRole } from '../lib/supabaseService';
import { useAuthContext } from '../context/AuthContext';

export default function Users() {
  const { user: currentUser } = useAuthContext();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await fetchAllProfiles();
    if (err) setError(err);
    else setProfiles(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    if (userId === currentUser?.id) {
      alert("Anda tidak bisa mengubah role Anda sendiri dari halaman ini.");
      return;
    }
    
    if (!window.confirm(`Ubah role user ini menjadi ${newRole.toUpperCase()}?`)) return;

    setUpdatingId(userId);
    const { error: err } = await updateUserRole(userId, newRole);
    setUpdatingId(null);

    if (err) {
      alert("Gagal mengubah role: " + err);
    } else {
      setProfiles(prev => prev.map(p => p.id === userId ? { ...p, role: newRole } : p));
    }
  };

  const filtered = profiles.filter(p => 
    (p.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.email || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center py-24"><Loader2 size={32} className="animate-spin text-sky-500" /></div>;
  }

  if (error) {
    return <div className="flex flex-col items-center justify-center py-24 gap-3 text-red-500"><AlertCircle size={32} /> <p>{error}</p></div>;
  }

  return (
    <div>
      <PageHeader
        title="Manajemen Pengguna"
        subtitle={`Kelola akses dan role pengguna sistem (${profiles.length} terdaftar)`}
        action={
          <Button type="secondary" onClick={loadData} className="!text-xs gap-1.5">
            <RefreshCw size={13}/> Refresh Data
          </Button>
        }
      />

      <Card className="!p-4 mb-5">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
          <InputField
            type="text" placeholder="Cari nama atau email..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="[&_input]:pl-9 [&_input]:py-2 [&_input]:text-xs"
          />
        </div>
      </Card>

      <Card noPadding className="overflow-hidden">
        <Table headers={['Pengguna', 'Role & Akses', 'Tier', 'Poin', 'Tanggal Bergabung', 'Aksi']} className="[&_table]:border-0 [&_thead]:bg-gray-50/50 [&_th]:border-0 [&_th]:py-3.5 [&_th]:px-5 [&_th]:text-xs [&_th]:font-semibold [&_th]:text-gray-500 [&_th]:uppercase [&_th]:tracking-wide">
          {filtered.length === 0 ? (
            <tr><td colSpan={6} className="py-12 text-center text-gray-400 text-sm">Tidak ada pengguna ditemukan</td></tr>
          ) : (
            filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-3">
                    <Avatar name={p.full_name || '?'} className="!w-9 !h-9 !text-xs" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{p.full_name || 'Tidak ada nama'}</p>
                      <p className="text-xs text-gray-500">{p.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-5">
                  {p.role === 'admin' ? (
                    <Badge type="primary" className="!bg-sky-50 !text-sky-700 !border-sky-200 gap-1"><Shield size={12}/> Admin</Badge>
                  ) : (
                    <Badge type="secondary" className="gap-1"><UserIcon size={12}/> Member</Badge>
                  )}
                </td>
                <td className="py-3.5 px-5 text-sm text-gray-700 font-medium">
                  {p.role === 'member' ? (p.tiers?.name || 'Bronze') : '-'}
                </td>
                <td className="py-3.5 px-5 text-sm text-gray-700 font-semibold">
                  {p.role === 'member' ? p.points : '-'}
                </td>
                <td className="py-3.5 px-5 text-xs text-gray-500">
                  {new Date(p.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </td>
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-2">
                    <select
                      className="text-xs border border-gray-200 rounded-md px-2 py-1.5 outline-none focus:border-sky-500 disabled:opacity-50"
                      value={p.role}
                      onChange={(e) => handleRoleChange(p.id, e.target.value)}
                      disabled={updatingId === p.id || p.id === currentUser?.id}
                    >
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                    </select>
                    {updatingId === p.id && <Loader2 size={14} className="animate-spin text-gray-400" />}
                  </div>
                </td>
              </tr>
            ))
          )}
        </Table>
      </Card>
    </div>
  );
}
