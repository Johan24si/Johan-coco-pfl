import { useState } from 'react';

/**
 * useSearch — Custom Hook menggunakan useState
 *
 * Fungsi: Mengelola state pencarian (search) dan filter aktif
 * secara terpusat, sehingga tidak perlu tulis ulang logika
 * yang sama di setiap halaman (Orders, Service, Customers, dll).
 *
 * @param {Array}  data          - Array data asli yang ingin difilter
 * @param {Array}  searchFields  - Field mana saja yang dicari (misal: ['patientName', 'treatment'])
 * @param {string} initialFilter - Nilai filter awal (default: 'Semua')
 * @returns {{ search, setSearch, activeFilter, setActiveFilter, filtered, reset }}
 */
export function useSearch(data = [], searchFields = [], initialFilter = 'Semua') {
  // useState #1: menyimpan kata kunci pencarian
  const [search, setSearch] = useState('');

  // useState #2: menyimpan filter yang sedang aktif
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  // Logika filter: cari di semua field yang diberikan
  const filtered = data.filter((item) => {
    const keyword = search.toLowerCase();

    // Cek apakah keyword cocok dengan salah satu field
    const matchSearch =
      searchFields.length === 0
        ? true
        : searchFields.some((field) =>
            String(item[field] ?? '').toLowerCase().includes(keyword)
          );

    // Cek apakah status cocok dengan filter aktif
    const matchFilter =
      activeFilter === 'Semua' || item.status === activeFilter;

    return matchSearch && matchFilter;
  });

  // Fungsi reset: kembalikan ke kondisi awal
  const reset = () => {
    setSearch('');
    setActiveFilter(initialFilter);
  };

  return {
    search,         // nilai input pencarian saat ini
    setSearch,      // fungsi untuk mengubah kata kunci
    activeFilter,   // filter yang aktif saat ini
    setActiveFilter,// fungsi untuk mengubah filter
    filtered,       // data hasil filter
    reset,          // fungsi untuk mereset semua
  };
}
