import React from 'react';

export default function Badge({ children, type = "primary", className = "", ...props }) {
  const types = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-600 text-white",
    success: "bg-green-600 text-white",
    danger: "bg-red-600 text-white",
    warning: "bg-yellow-500 text-white",
  };

  return (
    <span 
      className={`${types[type] || types.primary} px-3 py-1 rounded-full text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
