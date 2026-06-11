import { useState } from 'react';
import { Plus, Search, Star, Clock, Tag, Wrench, Sparkles, Shield, Zap, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { Progress } from '@/components/ui/progress';

const services = [
  {
    id: 1,
    name: 'Pembersihan Gigi',
    category: 'Pencegahan',
    duration: '45 menit',
    price: 350000,
    description: 'Pembersihan karang gigi dan plak secara menyeluruh untuk menjaga kesehatan gigi dan gusi.',
    popular: true,
    icon: Sparkles,
    color: 'bg-sky-500', // Diubah ke sky
    lightColor: 'bg-sky-50', // Diubah ke sky
    textColor: 'text-sky-600', // Diubah ke sky
    demand: 92,
  },
  {
    id: 2,
    name: 'Tambal Gigi (Komposit)',
    category: 'Restoratif',
    duration: '60 menit',
    price: 500000,
    description: 'Penambalan gigi berlubang menggunakan bahan komposit sewarna gigi untuk hasil estetis.',
    popular: true,
    icon: Shield,
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    demand: 85,
  },
  {
    id: 3,
    name: 'Cabut Gigi',
    category: 'Bedah Minor',
    duration: '30 menit',
    price: 300000,
    description: 'Pencabutan gigi yang sudah tidak dapat dipertahankan atau gigi susu yang belum lepas.',
    popular: false,
    icon: Zap,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-600',
    demand: 40,
  },
  {
    id: 4,
    name: 'Scaling Gigi',
    category: 'Pencegahan',
    duration: '60 menit',
    price: 400000,
    description: 'Pembersihan karang gigi dengan alat ultrasonik untuk mencegah penyakit periodontal.',
    popular: true,
    icon: Sparkles,
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    demand: 78,
  },
  {
    id: 5,
    name: 'Behel Gigi (Ortodontik)',
    category: 'Ortodontik',
    duration: '90 menit',
    price: 8000000,
    description: 'Perawatan ortodontik untuk merapikan susunan gigi dan memperbaiki gigitan.',
    popular: true,
    icon: Star,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    demand: 88,
  },
  {
    id: 6,
    name: 'Veneer Gigi',
    category: 'Estetika',
    duration: '90 menit',
    price: 2500000,
    description: 'Pemasangan lapisan tipis porselen di permukaan gigi untuk mempercantik senyum.',
    popular: false,
    icon: Sparkles,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    demand: 55,
  },
  {
    id: 7,
    name: 'Crown Gigi',
    category: 'Restoratif',
    duration: '120 menit',
    price: 3000000,
    description: 'Pemasangan mahkota gigi untuk melindungi gigi yang sudah parah kerusakannya.',
    popular: false,
    icon: Shield,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    demand: 35,
  },
  {
    id: 8,
    name: 'Pemutihan Gigi',
    category: 'Estetika',
    duration: '60 menit',
    price: 1200000,
    description: 'Perawatan bleaching untuk memutihkan gigi yang kusam akibat noda minuman atau rokok.',
    popular: true,
    icon: Star,
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    demand: 72,
  },
];

const categories = ['Semua', 'Pencegahan', 'Restoratif', 'Estetika', 'Ortodontik', 'Bedah Minor'];

// Helper: warna progress bar sesuai level demand
function getDemandColor(demand) {
  if (demand >= 80) return '[&_[data-slot=progress-indicator]]:bg-emerald-500';
  if (demand >= 60) return '[&_[data-slot=progress-indicator]]:bg-sky-500';
  if (demand >= 40) return '[&_[data-slot=progress-indicator]]:bg-amber-500';
  return '[&_[data-slot=progress-indicator]]:bg-red-400';
}

function getDemandLabel(demand) {
  if (demand >= 80) return 'Sangat Tinggi';
  if (demand >= 60) return 'Tinggi';
  if (demand >= 40) return 'Sedang';
  return 'Rendah';
}

export default function Service() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filtered = services.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Semua' || s.category === activeCategory;
    return matchSearch && matchCat;
  });

  const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

  return (
    <div>
      <PageHeader
        title="Layanan Klinik"
        subtitle={`${services.length} layanan tersedia`}
        action={
          <Button type="primary" className="flex items-center gap-2">
            <Plus size={15} /> Tambah Layanan
          </Button>
        }
      />

      {/* Search + Filter (menggunakan Card & Button component) */}
      <Card className="!p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                type={activeCategory === cat ? 'primary' : 'secondary'}
                className={`!px-3 !py-1.5 !rounded-lg !text-xs !font-medium ${
                  activeCategory === cat
                    ? '!bg-sky-500 !text-white'
                    : '!bg-gray-100 !text-gray-600 hover:!bg-gray-200 !border-transparent'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
            <InputField
              type="text"
              placeholder="Cari layanan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="[&_input]:pl-9 [&_input]:py-2 [&_input]:text-xs [&_input]:focus:border-sky-500 [&_input]:focus:ring-sky-500"
            />
          </div>
        </div>
      </Card>

      {/* Service Cards Grid (menggunakan Card & Badge component) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.id}
              className="!p-5 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 ${service.lightColor} rounded-xl flex items-center justify-center`}>
                  <Icon size={20} className={service.textColor} />
                </div>
                <div className="flex items-center gap-2">
                  {service.popular && (
                    <Badge type="warning" className="!bg-amber-50 !text-amber-600 !text-[10px] !px-2 !py-0.5">
                      <Star size={10} fill="currentColor" /> Populer
                    </Badge>
                  )}
                </div>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-sky-600 transition-colors">
                {service.name}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{service.description}</p>

              {/* ✅ Shadcn UI Progress — menampilkan tingkat permintaan layanan */}
              <div className="mb-4 p-3 bg-gray-50/80 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={11} className="text-gray-400" />
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Permintaan</span>
                  </div>
                  <span className={`text-xs font-bold ${
                    service.demand >= 80 ? 'text-emerald-600' : 
                    service.demand >= 60 ? 'text-sky-600' : 
                    service.demand >= 40 ? 'text-amber-600' : 'text-red-500'
                  }`}>
                    {service.demand}% · {getDemandLabel(service.demand)}
                  </span>
                </div>
                <Progress 
                  value={service.demand} 
                  className={`h-2 bg-gray-200/80 ${getDemandColor(service.demand)}`}
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {service.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={11} /> {service.category}
                  </span>
                </div>
                {/* Teks Harga diubah ke sky-600 */}
                <p className="text-sm font-bold text-sky-600">{formatPrice(service.price)}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Wrench size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Tidak ada layanan ditemukan</p>
        </div>
      )}
    </div>
  );
}