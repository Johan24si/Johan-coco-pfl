import React from 'react';

export default function Avatar({ name, className = "", ...props }) {
  return (
    <div 
      className={`w-10 h-10 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold uppercase shadow-sm ${className}`}
      title={name}
      {...props}
    >
      {name ? name.charAt(0) : '?'}
    </div>
  );
}
