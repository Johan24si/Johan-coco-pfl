import { useState, useEffect, useCallback } from 'react';
import {
  fetchAllMembers,
  createMember,
  updateMember,
  deleteMember,
} from '../lib/supabaseService';

/**
 * useMembers — custom hook for admin CRUD on the `members` Supabase table.
 *
 * Returns:
 *  - members    : Member[]
 *  - loading    : boolean
 *  - error      : string | null
 *  - refetch()  : re-fetch all members
 *  - addMember(data)         : insert new member
 *  - editMember(id, updates) : update member by id
 *  - removeMember(id)        : delete member by id
 */
export function useMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await fetchAllMembers();
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
    const { data, error: createError } = await createMember(formData);
    if (createError) throw new Error(createError);
    setMembers((prev) => [data, ...prev]);
    return data;
  }, []);

  const editMember = useCallback(async (id, updates) => {
    const { data, error: updateError } = await updateMember(id, updates);
    if (updateError) throw new Error(updateError);
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
    return data;
  }, []);

  const removeMember = useCallback(async (id) => {
    const { error: deleteError } = await deleteMember(id);
    if (deleteError) throw new Error(deleteError);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return { members, loading, error, refetch: load, addMember, editMember, removeMember };
}
