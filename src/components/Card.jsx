import React from 'react';

export default function Card({ children, className = "", noPadding = false, ...props }) {
  // noPadding prop ditambahkan agar jika Card dipakai untuk ProductCard (yang butuh gambar nempel ujung),
  // padding default (p-6) bisa dihilangkan.
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow ${noPadding ? '' : 'p-6'} ${className}`} {...props}>
      {children}
    </div>
  );
}
