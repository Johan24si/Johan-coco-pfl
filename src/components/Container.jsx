import React from 'react';

export default function Container({
  children,
  className = "",
  ...props
}) {
  return (
    <div className={`container mx-auto py-8 px-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
