import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Card from '../components/Card';
import ProductCard from '../components/ProductCard';
import Table from '../components/Table';
import InputField from '../components/InputField';
import TextArea from '../components/TextArea';
import SelectField from '../components/SelectField';
import Alert from '../components/Alert';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import ProductSection from '../components/ProductSection';

export default function Components() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableHeaders = ["No", "Layanan / Produk", "Kategori", "Harga", "Aksi"];
  const tableProducts = [
    { id: 1, name: "Pembersihan Karang (Scaling)", category: "Layanan", price: "Rp 350.000" },
    { id: 2, name: "Tambal Gigi Estetik", category: "Layanan", price: "Rp 450.000" },
    { id: 3, name: "Sikat Gigi Elektrik", category: "Produk", price: "Rp 850.000" }
  ];
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <PageHeader
        title="Basic Components"
        subtitle="Kumpulan komponen kecil dan sederhana yang sering digunakan berulang."
      />

      <div className="space-y-6 mt-6 max-w-5xl">
        
        {/* Buttons */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Button</h2>
          <div className="flex flex-wrap gap-4">
            <Button type="primary">Primary</Button>
            <Button type="secondary">Secondary</Button>
            <Button type="success">Simpan</Button>
            <Button type="danger">Hapus</Button>
            <Button type="warning">Warning</Button>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Badge</h2>
          <div className="flex flex-wrap gap-4">
            <Badge type="primary">Baru</Badge>
            <Badge type="secondary">Draft</Badge>
            <Badge type="success">Selesai</Badge>
            <Badge type="danger">Batal</Badge>
            <Badge type="warning">Pending</Badge>
          </div>
        </div>

        {/* Avatars */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Avatar</h2>
          <div className="flex flex-wrap gap-4">
            <Avatar name="Budi" />
            <Avatar name="Siti" />
            <Avatar name="Andi" />
            <Avatar name="Dewi" />
          </div>
        </div>

        {/* Layout Components */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Layout Components</h2>
          
          <div className="space-y-8">
            {/* Container */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Container</h3>
              <div className="border border-dashed border-gray-300 rounded-lg bg-gray-50/50">
                <Container className="bg-white border border-gray-200 my-4 shadow-sm rounded-lg mx-4">
                  <h1 className="text-xl font-bold text-gray-800 mb-2">
                    Daftar Produk (Contoh Penggunaan Container)
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Berikut adalah daftar produk terbaru. Container memastikan konten tetap memiliki lebar maksimal (max-width) dan berada tepat di tengah halaman (mx-auto).
                  </p>
                </Container>
              </div>
            </div>

            {/* Footer */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Footer</h3>
              <div className="border border-dashed border-gray-300 rounded-lg overflow-hidden">
                <Footer className="!mt-0" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Display Components */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Data Display Components</h2>
          
          <div className="space-y-8">
            {/* Card */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Card</h3>
              <Card>
                <h2 className="text-xl font-bold mb-1">Judul Card</h2>
                <p className="text-gray-600">Ini adalah isi dari card. Card berfungsi sebagai pembungkus informasi.</p>
              </Card>
            </div>

            {/* ProductCard */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Product Card</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProductCard
                    image="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop"
                    title="Sikat Gigi Elektrik Pro"
                    category="Perawatan"
                    price="Rp 850.000"
                    description="Membersihkan plak 10x lebih efektif dengan getaran mikro yang lembut bagi gusi."
                />
                <ProductCard
                    image="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600&auto=format&fit=crop"
                    title="Obat Kumur Antiseptik"
                    category="Perawatan"
                    price="Rp 75.000"
                    description="Membunuh bakteri penyebab bau mulut dan menjaga nafas segar hingga 12 jam."
                />
              </div>
            </div>

            {/* Table */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Table</h3>
              <Table headers={tableHeaders}>
                {tableProducts.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="border px-4 py-3">{index + 1}</td>
                    <td className="border px-4 py-3">{product.name}</td>
                    <td className="border px-4 py-3">{product.category}</td>
                    <td className="border px-4 py-3">{product.price}</td>
                    <td className="border px-4 py-3">
                      <Button type="primary" className="!px-3 !py-1 text-xs">
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>
        </div>

        {/* Form Components */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Form Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InputField label="Nama Lengkap" placeholder="Masukkan nama Anda" />
              <SelectField 
                label="Pilih Pekerjaan" 
                options={[
                  { label: "Mahasiswa", value: "mhs" },
                  { label: "Pegawai Swasta", value: "swasta" },
                  { label: "Wirausaha", value: "wirausaha" }
                ]}
              />
            </div>
            <div>
              <TextArea label="Alamat" placeholder="Tuliskan alamat lengkap Anda..." rows={5} />
            </div>
          </div>
        </div>

        {/* Feedback Components */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Feedback Components</h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <Alert type="info">Ini adalah pesan informasi menggunakan Alert.</Alert>
              <Alert type="success">Data berhasil disimpan (Success Alert).</Alert>
              <Alert type="warning">Peringatan! Kuota Anda hampir habis.</Alert>
              <Alert type="danger">Terjadi kesalahan pada server (Danger Alert).</Alert>
            </div>
            
            <div className="flex gap-4 items-center p-4 border border-dashed border-gray-300 rounded-lg">
              <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Buka Modal
              </Button>
              <div className="relative w-16 h-16 border rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                 <div className="scale-[0.4] origin-center"><Loading /></div>
              </div>
              <span className="text-sm text-gray-500">&larr; Loading Component (di-scale)</span>
            </div>
          </div>

          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            title="Konfirmasi Tindakan"
          >
            <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menyimpan perubahan ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end gap-3">
              <Button type="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
              <Button type="primary" onClick={() => setIsModalOpen(false)}>Ya, Simpan</Button>
            </div>
          </Modal>
        </div>

        {/* Section Components */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Section Components</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Hero Section</h3>
              <div className="border border-dashed border-gray-300 rounded-xl p-2 bg-gray-50">
                <HeroSection 
                  title="Solusi Terbaik untuk Bisnis Anda" 
                  subtitle="Tingkatkan produktivitas dan efisiensi kerja tim dengan aplikasi mutakhir kami." 
                  buttonText="Mulai Gratis Sekarang" 
                  onButtonClick={() => alert("Mulai diklik!")}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Feature Section</h3>
              <div className="border border-dashed border-gray-300 rounded-xl p-2 bg-gray-50">
                <FeatureSection 
                  features={[
                    { title: "Keamanan Tinggi", description: "Data Anda dienkripsi dengan standar bank.", icon: "🔒" },
                    { title: "Sangat Cepat", description: "Waktu muat halaman kurang dari 1 detik.", icon: "⚡" },
                    { title: "Dukungan 24/7", description: "Tim kami siap membantu kapan saja.", icon: "🎧" }
                  ]}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Product Section</h3>
              <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                <ProductSection 
                  products={[
                    {
                      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop",
                      title: "Sikat Gigi Elektrik Pro",
                      category: "Perawatan",
                      price: "Rp 850.000",
                      description: "Membersihkan plak 10x lebih efektif dengan getaran mikro yang lembut bagi gusi."
                    },
                    {
                      image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600&auto=format&fit=crop",
                      title: "Obat Kumur Antiseptik",
                      category: "Perawatan",
                      price: "Rp 75.000",
                      description: "Membunuh bakteri penyebab bau mulut dan menjaga nafas segar hingga 12 jam."
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
