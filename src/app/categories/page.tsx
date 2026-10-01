import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { categories } from '@/data/categories';
import { getAllProducts } from '@/data/products';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductCard from '@/components/products/ProductCard';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Swimwear Categories — Wholesale Divisions | Balaji Traders Chennai',
  description: 'Explore the 5 specialist swimwear departments of Balaji Traders: Men\'s, Women\'s, Junior Academy, Competition tech suits, and aquatic accessories available wholesale.',
};

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const products = await getAllProducts();
  return (
    <div className="min-h-screen bg-slate-50/60 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200/90 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Categories' }]} />
          <div className="mt-4 max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span className="technical-mono text-[10px] font-bold text-sky-700 tracking-[0.25em] uppercase">
                WHOLESALE ARCHIVE // 05 SPECIALIST DIVISIONS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight uppercase">
              Product Divisions
            </h1>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed font-normal">
              Explore Balaji Traders&apos; five specialist wholesale departments. Performance racing apparel, athletic training swimwear, academy kits, and pool deck equipment ready for immediate dispatch from Otteri, Chennai.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 sm:space-y-20">
        {categories.map((cat, idx) => {
          const catProducts = products.filter((p) => p.categorySlug === cat.slug);
          const divisionNum = String(idx + 1).padStart(2, '0');
          const sampleProducts = catProducts.slice(0, 3);

          return (
            <section key={cat.id} className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
              {/* Department Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-start sm:items-center gap-5">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tracking-tighter shrink-0">
                    {divisionNum}
                  </span>
                  <div>
                    <span className="technical-mono text-[10px] text-sky-600 font-bold block mb-0.5 uppercase tracking-wider">
                      DIVISION {divisionNum} // {catProducts.length} STOCKED LINES
                    </span>
                    <h2 className="text-2xl min-[360px]:text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950 break-words">
                      {cat.name}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 self-start md:self-end">
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-slate-950 hover:bg-sky-600 px-5 py-2.5 rounded-xl transition-colors shadow-2xs"
                  >
                    <span>View All {catProducts.length} Items</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={getGeneralWhatsAppUrl(`Hello Balaji Traders, I would like wholesale prices for ${cat.name} lots.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-btn p-2.5 rounded-xl text-white shadow-2xs"
                    title={`WhatsApp inquiry for ${cat.name}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Layout: Department Image & Overview alongside Featured Products */}
              <div className="grid lg:grid-cols-12 gap-8 items-start pt-6">
                <div className="lg:col-span-4 rounded-2xl overflow-hidden bg-slate-950 text-white relative min-h-[300px] flex flex-col justify-end p-6 border border-slate-800">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />

                  <div className="relative z-20">
                    <span className="technical-mono text-[9px] text-sky-400 block mb-1 uppercase tracking-widest font-bold">
                      DEPARTMENT OVERVIEW
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal mb-4">
                      {cat.description}
                    </p>
                    <div className="pt-3 border-t border-slate-800 text-[10px] technical-mono text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Verified wholesale stock in Chennai</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Sizing matrices ready for dispatch</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Official EGLIDER distribution</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {sampleProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
