'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getCategoryBySlug, categories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);
  const categoryProducts = await getProductsByCategory(slug);
  const divisionIndex = categories.findIndex((c) => c.slug === slug);
  const divisionNum = divisionIndex !== -1 ? String(divisionIndex + 1).padStart(2, '0') : '01';

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-xs max-w-md w-full">
          <h1 className="text-xl font-bold text-slate-900 mb-2">Division Not Found</h1>
          <p className="text-xs text-slate-500 mb-4">The selected department does not exist in our archive.</p>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold technical-mono text-white bg-slate-950 rounded-xl hover:bg-sky-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL DIVISIONS</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pt-20 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200/90 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Divisions', href: '/categories' },
              { label: category.name },
            ]}
          />
          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[10px] font-bold technical-mono uppercase">
                  DIVISION {divisionNum}
                </span>
                <span className="text-[10px] technical-mono font-bold text-slate-500 uppercase">
                  CHENNAI WHOLESALE WAREHOUSE
                </span>
              </div>
              <h1 className="text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight uppercase break-words">
                {category.name}
              </h1>
              <p className="text-slate-600 mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed font-normal">
                {category.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
              <span className="technical-mono text-xs font-bold text-slate-500">
                {categoryProducts.length} STOCKED LINES
              </span>
              <a
                href={getGeneralWhatsAppUrl(`Hello Balaji Traders, I would like wholesale prices for ${category.name} bulk orders.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl text-white shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Wholesale Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl text-center py-20 px-4 shadow-2xs">
            <p className="text-base font-bold text-slate-800 mb-2">No products in this division yet</p>
            <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
              Contact us directly on WhatsApp to check upcoming shipments or request custom wholesale lots for {category.name}.
            </p>
            <a
              href={getGeneralWhatsAppUrl(`Hello Balaji Traders, I want to enquire about upcoming stock for ${category.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider whatsapp-btn rounded-xl shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask About {category.name} Stock</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
