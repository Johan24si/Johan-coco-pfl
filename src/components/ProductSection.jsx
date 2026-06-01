import ProductCard from "./ProductCard";

export default function ProductSection({ products = [], className = "" }) {
  return (
    <div className={`py-12 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Perawatan & Produk Pilihan</h2>
          <p className="text-gray-500 mt-2 text-lg">Solusi perawatan gigi terbaik untuk senyum sehat Anda</p>
        </div>
        <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-semibold transition-colors">
          Lihat Semua &rarr;
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            image={product.image}
            title={product.title}
            category={product.category}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}
