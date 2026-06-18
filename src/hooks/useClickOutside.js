import { useEffect, useRef } from 'react';

/**
 * useClickOutside — Custom Hook menggunakan useRef + useEffect
 *
 * Fungsi: Mendeteksi klik di LUAR elemen tertentu, lalu menjalankan
 * callback yang diberikan. Berguna untuk menutup dropdown, modal,
 * popover, atau panel secara otomatis saat user klik di luar area.
 *
 * Cara pakai:
 *   const ref = useClickOutside(() => setIsOpen(false));
 *   <div ref={ref}> ... isi dropdown ... </div>
 *
 * @param {Function} callback  - Fungsi yang dipanggil saat klik di luar
 * @param {boolean}  enabled   - Aktifkan/nonaktifkan listener (default: true)
 * @returns {React.RefObject}  - Ref yang harus ditempel ke elemen target
 */
export function useClickOutside(callback, enabled = true) {
  // useRef: menyimpan referensi ke elemen DOM tanpa memicu re-render
  const ref = useRef(null);

  // useEffect: daftarkan event listener saat komponen mount,
  // dan bersihkan (cleanup) saat komponen unmount
  useEffect(() => {
    // Jika hook dinonaktifkan, jangan pasang listener
    if (!enabled) return;

    const handleClick = (event) => {
      // Cek: apakah elemen ref ada, DAN klik terjadi di LUAR elemen tersebut?
      if (ref.current && !ref.current.contains(event.target)) {
        callback(); // jalankan callback (misal: tutup dropdown)
      }
    };

    // Pasang listener ke seluruh dokumen
    document.addEventListener('mousedown', handleClick);

    // Cleanup: hapus listener saat komponen unmount atau dependency berubah
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [callback, enabled]); // re-run jika callback atau enabled berubah

  return ref; // kembalikan ref untuk ditempel ke elemen JSX
}
