import React from 'react';

export default function Table({ headers, children, className = "", ...props }) {
  return (
    <div className={`overflow-x-auto ${className}`} {...props}>
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border px-4 py-3 text-left font-semibold text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}
