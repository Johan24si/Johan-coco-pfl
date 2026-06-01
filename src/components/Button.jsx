import React from 'react';

export default function Button({ children, type = "primary", className = "", ...props }) {
  const types = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  };

  return (
    <button 
      className={`${types[type] || types.primary} px-4 py-2 rounded-lg transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
