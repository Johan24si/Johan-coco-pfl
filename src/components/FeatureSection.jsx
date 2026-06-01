export default function FeatureSection({ features = [], className = "" }) {
  return (
    <div className={`py-12 ${className}`}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Fitur Unggulan</h2>
        <p className="text-gray-500 mt-2 text-lg">Kenapa Anda harus memilih layanan kami?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group">
            <div className="w-14 h-14 mx-auto bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center rounded-2xl mb-5 text-2xl shadow-sm">
              {feature.icon || "✨"}
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
