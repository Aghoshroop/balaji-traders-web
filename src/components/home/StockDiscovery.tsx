'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getAllProducts } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/components/products/ProductCard';

export default async function StockDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    return result.slice(0, 6);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            All Stock ({products.length})
          </button>
          {categories.map((cat) => {
            const count = (await getAllProducts()).filter((p) => p.categorySlug === cat.slug).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                  selectedCategory === cat.slug
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat.shortName} ({count})
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search stock..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Grid of Results */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No items match your query.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs font-bold text-sky-600 hover:text-sky-700 uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* View Full Catalog Link */}
      <div className="mt-10 flex items-center justify-between pt-6 border-t border-slate-200/80">
        <p className="text-xs text-slate-500 font-medium">
          Showing {filteredProducts.length} of {products.length} products available for wholesale enquiry
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 hover:text-sky-700 transition-colors"
        >
          View Full Catalogue ({products.length})
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
