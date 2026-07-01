import { useState, useEffect, useCallback } from 'react';
import {
  fetchAllPasien,
  createPasien,
  updatePasien,
  deletePasien,
} from '../lib/supabaseService';

export function useMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await fetchAllPasien();
    if (fetchError) {
      setError(fetchError);
    } else {
      setMembers(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addMember = useCallback(async (formData) => {
    const { data, error: createError } = await createPasien(formData);
    if (createError) throw new Error(createError);
    setMembers((prev) => [data, ...prev]);
    return data;
  }, []);

  const editMember = useCallback(async (id, updates) => {
    const { data, error: updateError } = await updatePasien(id, updates);
    if (updateError) throw new Error(updateError);
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
    return data;
  }, []);

  const removeMember = useCallback(async (id) => {
    const { error: deleteError } = await deletePasien(id);
    if (deleteError) throw new Error(deleteError);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return { members, loading, error, refetch: load, addMember, editMember, removeMember };
}
