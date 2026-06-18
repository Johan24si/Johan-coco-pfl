import { useState, useEffect } from 'react';

/**
 * useLocalStorage — Custom Hook menggunakan useState + useEffect
 *
 * Fungsi: Menyinkronkan state React dengan localStorage secara otomatis.
 * Setiap kali state berubah, data langsung tersimpan ke localStorage.
 * Saat halaman di-refresh, data dipulihkan dari localStorage.
 *
 * Digunakan di project ini untuk: menyimpan preferensi user, data form
 * sementara, atau data yang perlu persisten walau halaman di-refresh.
 *
 * @param {string} key          - Nama kunci di localStorage
 * @param {*}      initialValue - Nilai awal jika kunci belum ada
 * @returns {[value, setValue, removeValue]}
 */
export function useLocalStorage(key, initialValue) {
  // useState: muat nilai dari localStorage (atau pakai initialValue jika belum ada)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Jika sudah ada → parse JSON, jika belum → pakai initialValue
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Gagal membaca key "${key}":`, error);
      return initialValue;
    }
  });

  // useEffect: simpan ke localStorage setiap kali storedValue berubah
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`[useLocalStorage] Gagal menyimpan key "${key}":`, error);
    }
  }, [key, storedValue]); // jalankan ulang setiap key atau value berubah

  // Fungsi untuk menghapus data dari localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`[useLocalStorage] Gagal menghapus key "${key}":`, error);
    }
  };

  return [
    storedValue,   // nilai saat ini
    setStoredValue,// fungsi untuk mengubah nilai (otomatis tersimpan)
    removeValue,   // fungsi untuk menghapus dari localStorage
  ];
}
