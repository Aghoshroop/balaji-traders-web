'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  Package,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Layers,
  Phone,
  Square,
  Grid3X3,
} from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { BUSINESS, CONTACT } from '@/lib/config';
import ProductCard from '@/components/products/ProductCard';
import ProductQuickViewModal from '@/components/products/ProductQuickViewModal';
import AquaticWaveRays from '@/components/ui/aquatic/AquaticWaveRays';
import { getGeneralWhatsAppUrl, getPhoneUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';
import type { Product } from '@/types';

const departmentFilters = [
  { label: 'ALL GEAR', value: 'all', count: products.length },
  { label: "MEN'S RACING", value: 'mens-swimwear', count: products.filter((p) => p.categorySlug === 'mens-swimwear').length },
  { label: "WOMEN'S AQUATICS", value: 'womens-swimwear', count: products.filter((p) => p.categorySlug === 'womens-swimwear').length },
  { label: 'JUNIOR SQUAD', value: 'kids-swimwear', count: products.filter((p) => p.categorySlug === 'kids-swimwear').length },
  { label: 'COMPETITION', value: 'competition-swimwear', count: products.filter((p) => p.categorySlug === 'competition-swimwear').length },
  { label: 'OPTICS & ACCESSORIES', value: 'swimming-accessories', count: products.filter((p) => p.categorySlug === 'swimming-accessories').length },
];

export default function SupplyArchive() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [mobileGridCols, setMobileGridCols] = useState<1 | 2>(2);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const displayedProducts = useMemo(() => {
    if (selectedDepartment === 'all') {
      // 9 products for 3 complete rows of 3 products in a grid
      return products.slice(0, 9);
    }
    return products.filter((p) => p.categorySlug === selectedDepartment);
  }, [selectedDepartment]);

  return (
    <section className="relative w-full bg-transparent py-12 sm:py-16 lg:py-20 border-t border-slate-200/90 overflow-hidden">
      {/* Aquatic wave caustics, soft water ribbons & sunlit pool shimmer */}
      <AquaticWaveRays theme="light" intensity="subtle" showBubbles={true} />

      {/* Background soft ambient accents */}
      <div className="absolute top-10 left-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10 w-full min-w-0 max-w-full">
        {/* ============================================================ */}
        {/* 1. EDITORIAL HEADER & DEPARTMENT CONTROLS                    */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-slate-200">
          <div className="max-w-2xl min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="technical-mono text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-[0.22em] uppercase">
                CURATED WHOLESALE INVENTORY // CHENNAI DEPOT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
              THE SUPPLY{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500">
                ARCHIVE
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal leading-relaxed">
              Explore authentic EGLIDER competition apparel, athletic jammers, and deck training equipment. Direct warehouse lot pricing with mixed size matrix fulfillment from Otteri.
            </p>
          </div>

          {/* Department Filter Tabs */}
          {/* Department Filter Tabs & Mobile Grid Density Switcher */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-2">
            <div className="w-full lg:w-auto min-w-0 max-w-full overflow-x-auto pb-2 lg:pb-0 scrollbar-none no-scrollbar">
              <div className="flex items-center gap-1.5 sm:gap-2 w-max lg:w-auto lg:flex-wrap">
                {departmentFilters.map((dept) => (
                  <button
                    key={dept.value}
                    type="button"
                    onClick={() => setSelectedDepartment(dept.value)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      selectedDepartment === dept.value
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{dept.label}</span>
                    <span className="ml-1.5 text-[10px] opacity-75 technical-mono">({dept.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Density Switcher: [ 1 ] vs [ 2 ] */}
            <div className="block sm:hidden flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0 self-start">
              <button
                type="button"
                onClick={() => setMobileGridCols(1)}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-black technical-mono transition-all ${
                  mobileGridCols === 1
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="1 Product Per Row"
                aria-label="1 Product Per Row"
              >
                <Square className="w-3 h-3" />
                <span>1</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileGridCols(2)}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-black technical-mono transition-all ${
                  mobileGridCols === 2
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="2 Products in a Row"
                aria-label="2 Products in a Row"
              >
                <Grid3X3 className="w-3 h-3" />
                <span>2</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. SHOWROOM PRODUCT GRID                                     */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-10">
          <div
            className={`grid items-stretch w-full min-w-0 max-w-full ${
              mobileGridCols === 2
                ? 'grid-cols-2 gap-3 min-[400px]:gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6'
                : 'grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6'
            }`}
          >
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                density={mobileGridCols === 2 ? 'compact' : 'standard'}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          {/* Quick Explore Row */}
          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs technical-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>Showing {displayedProducts.length} of {products.length} catalog items</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-sky-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs w-full sm:w-auto"
              >
                <span>Browse Full 17-Line Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getGeneralWhatsAppUrl('Hello Balaji Traders, I would like to request your complete wholesale price catalogue.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('supply-archive-full-catalogue')}
                className="whatsapp-btn inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-xs font-bold uppercase tracking-wider shadow-xs w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Request Price Matrix</span>
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. B2B PROCUREMENT HIGHLIGHT STRIP                           */}
        {/* ============================================================ */}
        <div className="mt-10 sm:mt-12 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-sky-400" />
                <span className="technical-mono text-[9px] font-bold text-sky-400 uppercase tracking-widest">
                  SPECIALIST WHOLESALE SUPPLY
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mb-2">
                Ordering in Bulk for Academies, Schools or Retail?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-2xl">
                We supply verified EGLIDER carton batches with mixed size matrices, transparent wholesale rates, and fast dispatch across Chennai and Tamil Nadu.
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-xs technical-mono text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Size Batch Breakdown (28-38)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct Invoicing & GST</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Otteri Warehouse Verification</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <a
                href={getGeneralWhatsAppUrl('Hello Balaji Traders, I would like to discuss a bulk swimwear order for our academy / store.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('supply-archive-bulk-box')}
                className="whatsapp-btn inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss Bulk Order</span>
              </a>

              <a
                href={getPhoneUrl()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold uppercase tracking-wider text-white transition-colors text-center"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Call Desk: {CONTACT.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
