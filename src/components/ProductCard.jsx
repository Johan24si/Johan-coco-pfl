import React from 'react';
import Card from './Card';
import Button from './Button';

export default function ProductCard({
  image, title, category, price, description, className = "", ...props
}) {
  return (
    <Card noPadding className={`overflow-hidden flex flex-col ${className}`} {...props}>
        <img
            src={image}
            alt={title}
            className="w-full h-52 object-cover"
        />

        <div className="p-5 flex flex-col flex-1">

            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 self-start">
              {category}
            </span>

            <h2 className="text-xl font-bold mb-2 text-gray-900">
              {title}
            </h2>

            <p className="text-gray-600 text-sm mb-4 flex-1">
              {description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <h3 className="text-xl font-bold text-blue-600">
                  {price}
              </h3>
              
              {/* Kita memanfaatkan Button reusable yang sudah dibuat sebelumnya */}
              <Button type="primary" className="!px-4 !py-2">
                  Detail
              </Button>
            </div>

        </div>
    </Card>
  );
}
