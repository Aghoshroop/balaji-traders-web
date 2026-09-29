'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { BUSINESS } from '@/lib/config';
import { formatPrice } from '@/lib/utils';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';

// Visual enhancement mapping for the 5 divisions
const divisionMeta: Record<
  string,
  {
    divisionCode: string;
    headline: string;
    subtext: string;
    accentColor: string;
    bgImage: string;
    badge: string;
    specs: string[];
    sampleSkus: string[];
  }
> = {
  'mens-swimwear': {
    divisionCode: 'DIVISION 01',
    headline: "Men's Performance Swimwear",
    subtext: 'Racing jammers, training briefs & athletic trunks engineered for collegiate squads and daily pool laps.',
    accentColor: 'from-sky-500 to-blue-600',
    bgImage: '/images/categories/mens-swimwear.jpg',
    badge: 'Best Seller · Ready Stock',
    specs: ['Sizes 28 to 38', 'Chlorine-Resistant Poly', 'Otteri Ready Stock'],
    sampleSkus: ['EGL-JAM-BLK', 'EGL-BRF-NVY', 'EGL-SHT-BLU'],
  },
  'womens-swimwear': {
    divisionCode: 'DIVISION 02',
    headline: "Women's Racing & Fitness",
    subtext: 'High-performance racing kneeskins, athletic one-piece costumes & chlorine-resistant training apparel.',
    accentColor: 'from-cyan-400 to-sky-500',
    bgImage: '/images/categories/womens-swimwear.jpg',
    badge: 'Competitive Grade',
    specs: ['Sizes 30 to 40', 'Hydrodynamic Fabric', 'Full Lining Support'],
    sampleSkus: ['EGL-KNE-BLK', 'EGL-WOP-NVY', 'EGL-WOP-BLK'],
  },
  'kids-swimwear': {
    divisionCode: 'DIVISION 03',
    headline: "Junior & Swim Academy",
    subtext: 'Durable boys jammers, trunks and girls competition suits built for school teams and academy training.',
    accentColor: 'from-amber-400 to-orange-500',
    bgImage: '/images/categories/kids-swimwear.jpg',
    badge: 'Academy Batch Lots',
    specs: ['Ages 4 to 16 Yrs', 'Reinforced Stitching', 'Batch Box Sets'],
    sampleSkus: ['EGL-JTR-BLU', 'EGL-GCS-PNK', 'EGL-JGG-BLU'],
  },
  'competition-swimwear': {
    divisionCode: 'DIVISION 04',
    headline: 'Elite Competition Tech Suits',
    subtext: 'FINA-compliant hydrodynamic racing compression jammers and kneeskins for meet days and record breaks.',
    accentColor: 'from-indigo-400 to-purple-500',
    bgImage: '/images/categories/competition-swimwear.jpg',
    badge: 'Championship Meets',
    specs: ['Water-Repellent Nano', 'Bonded Compression', 'Meet Approved'],
    sampleSkus: ['ELT-JAM-CBN', 'EGL-KNE-BLK'],
  },
  'swimming-accessories': {
    divisionCode: 'DIVISION 05',
    headline: 'Aquatic Equipment & Optics',
    subtext: 'Anti-fog optical goggles, 100% silicone swim caps, kickboards, hand paddles and poolside safety gear.',
    accentColor: 'from-emerald-400 to-teal-500',
    bgImage: '/images/categories/swimming-accessories.jpg',
    badge: 'Wholesale Bundles',
    specs: ['UV & Anti-Fog Optics', '100% Pure Silicone', 'Club Packs Available'],
    sampleSkus: ['EGL-GOG-AF', 'EGL-CAP-SIL', 'ACC-KBD-BLU'],
  },
};

export default function CategoryDivisions() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const displayedCategories =
    activeTab === 'all'
      ? categories
      : categories.filter((c) => c.slug === activeTab);

  return (
    <section className="relative w-full bg-transparent py-12 sm:py-16 lg:py-20 border-t border-slate-200/90 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        {/* ============================================================ */}
        {/* 1. SECTION EDITORIAL HEADER                                  */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span className="technical-mono text-[9px] sm:text-[10px] font-bold text-sky-700 tracking-[0.22em] uppercase">
                CHENNAI WHOLESALE SHOWROOM // SPECIALIST DIVISIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
              EXPLORE BY{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500">
                DIVISION
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal leading-relaxed">
              Five dedicated wholesale departments dispatched directly from our Otteri, Chennai facility. Engineered racing apparel, daily academy swimwear, and deck equipment.
            </p>
          </div>

          {/* Department Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Divisions (05)
            </button>
            {categories.map((c) => {
              const count = products.filter((p) => p.categorySlug === c.slug).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveTab(c.slug)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === c.slug
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{c.shortName}</span>
                  <span className="ml-1.5 text-[10px] opacity-75 technical-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. DYNAMIC BENTO DIVISION SHOWCASE                           */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-10">
          {activeTab === 'all' ? (
            /* ASYMMETRIC BENTO GRID (ALL 5 DIVISIONS) */
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-6">
              {/* Card 1: Men's Performance (7 cols) */}
              {(() => {
                const cat = categories[0];
                const meta = divisionMeta[cat.slug];
                const catProducts = products.filter((p) => p.categorySlug === cat.slug);
                return (
                  <div className="col-span-2 lg:col-span-7 group relative rounded-[1.25rem] sm:rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[260px] sm:min-h-[440px] flex flex-col justify-end p-5 sm:p-8 lg:p-10">
                    <Image
                      src={meta.bgImage}
                      alt={cat.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />

                    <div className="relative z-20">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-sky-500/20 text-sky-300 text-[9px] sm:text-[10px] font-bold technical-mono uppercase border border-sky-500/30">
                          {meta.divisionCode}
                        </span>
                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-white text-[9px] sm:text-[10px] font-bold technical-mono uppercase backdrop-blur-xs">
                          {meta.badge}
                        </span>
                        <span className="text-[9px] sm:text-[10px] technical-mono text-slate-300 ml-auto hidden sm:block">
                          {catProducts.length} Stocked Lines
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mb-1.5 sm:mb-2">
                        {meta.headline}
                      </h3>
                      <p className="text-[10px] sm:text-sm text-slate-300 font-normal leading-relaxed max-w-xl mb-3 sm:mb-5 line-clamp-2 sm:line-clamp-none">
                        {meta.subtext}
                      </p>

                      {/* Specs and Samples Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                        {meta.specs.map((spec) => (
                          <span
                            key={spec}
                            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-[9px] sm:text-[10px] font-semibold text-slate-200 technical-mono"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                            <span>{spec}</span>
                          </span>
                        ))}
                      </div>

                      {/* Action Row */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <Link
                          href={`/categories/${cat.slug}`}
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                        >
                          <span>Explore Department</span>
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </Link>
                        <a
                          href={getGeneralWhatsAppUrl(`Hello Balaji Traders, I would like wholesale prices for ${cat.name} lots.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick('category-bento-mens')}
                          className="whatsapp-btn inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs"
                        >
                          <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span className="hidden sm:inline">Wholesale Lot Inquiry</span>
                          <span className="sm:hidden">Inquiry</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Card 2: Women's Racing (5 cols) */}
              {(() => {
                const cat = categories[1];
                const meta = divisionMeta[cat.slug];
                const catProducts = products.filter((p) => p.categorySlug === cat.slug);
                return (
                  <div className="col-span-1 md:col-span-2 lg:col-span-5 group relative rounded-[1.25rem] sm:rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[220px] sm:min-h-[440px] flex flex-col justify-end p-4 sm:p-8">
                    <Image
                      src={meta.bgImage}
                      alt={cat.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />

                    <div className="relative z-20">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                        <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-[8px] sm:text-[10px] font-bold technical-mono uppercase border border-cyan-500/30">
                          {meta.divisionCode}
                        </span>
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-white/10 text-white text-[10px] font-bold technical-mono uppercase backdrop-blur-xs">
                          {meta.badge}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mb-1 sm:mb-2">
                        {meta.headline}
                      </h3>
                      <p className="text-[9px] sm:text-xs text-slate-300 font-normal leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                        {meta.subtext}
                      </p>

                      <div className="hidden sm:flex flex-wrap items-center gap-2 mb-6">
                        {meta.specs.map((spec) => (
                          <span
                            key={spec}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-[10px] font-semibold text-slate-200 technical-mono"
                          >
                            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                            <span>{spec}</span>
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <Link
                          href={`/categories/${cat.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-[9px] sm:text-xs font-bold uppercase tracking-wider transition-colors shadow-xs text-center"
                        >
                          <span>Explore<span className="hidden sm:inline"> ({catProducts.length})</span></span>
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 hidden sm:block" />
                        </Link>
                        <a
                          href={getGeneralWhatsAppUrl(`Hello Balaji Traders, I would like wholesale prices for ${cat.name} lots.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick('category-bento-womens')}
                          className="whatsapp-btn p-2 sm:p-2.5 rounded-xl text-white shadow-xs shrink-0"
                          title="WhatsApp Wholesale Inquiry"
                        >
                          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Card 3: Junior & Academy (4 cols) */}
              {(() => {
                const cat = categories[2];
                const meta = divisionMeta[cat.slug];
                const catProducts = products.filter((p) => p.categorySlug === cat.slug);
                return (
                  <div className="col-span-1 md:col-span-1 lg:col-span-4 group relative rounded-[1.25rem] sm:rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 min-h-[220px] sm:min-h-[340px] flex flex-col justify-end p-4 sm:p-6">
                    <Image
                      src={meta.bgImage}
                      alt={cat.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />

                    <div className="relative z-20">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[8px] sm:text-[9px] font-bold technical-mono uppercase border border-amber-500/30">
                          {meta.divisionCode}
                        </span>
                        <span className="text-[8px] sm:text-[10px] technical-mono text-slate-300 ml-auto hidden sm:block">
                          {catProducts.length} Items
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-xl font-black uppercase tracking-tight text-white mb-1 sm:mb-1.5">
                        {meta.headline}
                      </h4>
                      <p className="text-[9px] sm:text-xs text-slate-300 line-clamp-2 mb-2 sm:mb-4 leading-relaxed font-normal">
                        {meta.subtext}
                      </p>

                      <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-800">
                        <Link
                          href={`/categories/${cat.slug}`}
                          className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-xs font-bold text-sky-400 hover:text-sky-300 uppercase tracking-wider transition-colors"
                        >
                          <span>View<span className="hidden sm:inline"> Academy Suits</span></span>
                          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </Link>
                        <a
                          href={getGeneralWhatsAppUrl(`Hello Balaji Traders, I need pricing for Junior / Academy swimwear lots.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whatsapp-btn p-1.5 sm:p-2 rounded-lg text-white"
                          title="WhatsApp Bulk Pricing"
                        >
                          <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Card 4: Competition Tech Suits (4 cols) */}
              {(() => {
                const cat = categories[3];
                const meta = divisionMeta[cat.slug];
                const catProducts = products.filter((p) => p.categorySlug === cat.slug);
                return (
                  <div className="col-span-1 md:col-span-1 lg:col-span-4 group relative rounded-[1.25rem] sm:rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 min-h-[220px] sm:min-h-[340px] flex flex-col justify-end p-4 sm:p-6">
                    <Image
                      src={meta.bgImage}
                      alt={cat.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />

                    <div className="relative z-20">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[8px] sm:text-[9px] font-bold technical-mono uppercase border border-indigo-500/30">
                          {meta.divisionCode}
                        </span>
                        <span className="text-[8px] sm:text-[10px] technical-mono text-slate-300 ml-auto hidden sm:block">
                          {catProducts.length} Items
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-xl font-black uppercase tracking-tight text-white mb-1 sm:mb-1.5">
                        {meta.headline}
                      </h4>
                      <p className="text-[9px] sm:text-xs text-slate-300 line-clamp-2 mb-2 sm:mb-4 leading-relaxed font-normal">
                        {meta.subtext}
                      </p>

                      <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-800">
                        <Link
                          href={`/categories/${cat.slug}`}
                          className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-xs font-bold text-sky-400 hover:text-sky-300 uppercase tracking-wider transition-colors"
                        >
                          <span>View<span className="hidden sm:inline"> Tech Racing</span></span>
                          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </Link>
                        <a
                          href={getGeneralWhatsAppUrl(`Hello Balaji Traders, I need bulk pricing for Competition Tech swimwear.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whatsapp-btn p-1.5 sm:p-2 rounded-lg text-white"
                          title="WhatsApp Bulk Pricing"
                        >
                          <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Card 5: Equipment & Accessories (4 cols) */}
              {(() => {
                const cat = categories[4];
                const meta = divisionMeta[cat.slug];
                const catProducts = products.filter((p) => p.categorySlug === cat.slug);
                return (
                  <div className="col-span-1 md:col-span-2 lg:col-span-4 group relative rounded-[1.25rem] sm:rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 min-h-[220px] sm:min-h-[340px] flex flex-col justify-end p-4 sm:p-6">
                    <Image
                      src={meta.bgImage}
                      alt={cat.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />

                    <div className="relative z-20">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[8px] sm:text-[9px] font-bold technical-mono uppercase border border-emerald-500/30">
                          {meta.divisionCode}
                        </span>
                        <span className="text-[8px] sm:text-[10px] technical-mono text-slate-300 ml-auto hidden sm:block">
                          {catProducts.length} Items
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-xl font-black uppercase tracking-tight text-white mb-1 sm:mb-1.5">
                        {meta.headline}
                      </h4>
                      <p className="text-[9px] sm:text-xs text-slate-300 line-clamp-2 mb-2 sm:mb-4 leading-relaxed font-normal">
                        {meta.subtext}
                      </p>

                      <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-800">
                        <Link
                          href={`/categories/${cat.slug}`}
                          className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-xs font-bold text-sky-400 hover:text-sky-300 uppercase tracking-wider transition-colors"
                        >
                          <span>View<span className="hidden sm:inline"> Optics & Caps</span></span>
                          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </Link>
                        <a
                          href={getGeneralWhatsAppUrl(`Hello Balaji Traders, I need wholesale details for goggles and silicone caps.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whatsapp-btn p-1.5 sm:p-2 rounded-lg text-white"
                          title="WhatsApp Bulk Pricing"
                        >
                          <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* FILTERED SINGLE DIVISION DETAIL VIEW */
            <div className="space-y-6">
              {displayedCategories.map((cat) => {
                const meta = divisionMeta[cat.slug];
                const catProducts = products.filter((p) => p.categorySlug === cat.slug);

                return (
                  <div
                    key={cat.id}
                    className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs"
                  >
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-950">
                        <Image
                          src={meta.bgImage}
                          alt={cat.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                        <div className="absolute bottom-4 left-4 z-10">
                          <span className="px-2.5 py-1 rounded-md bg-white/20 text-white text-[10px] font-bold technical-mono uppercase backdrop-blur-xs">
                            {meta.divisionCode}
                          </span>
                        </div>
                      </div>

                      <div className="lg:col-span-7">
                        <span className="technical-mono text-xs font-bold text-sky-600 uppercase tracking-widest block mb-1">
                          {cat.name} Wholesale Division
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 mb-3">
                          {meta.headline}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                          {cat.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {meta.specs.map((spec) => (
                            <span
                              key={spec}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold technical-mono"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{spec}</span>
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            href={`/categories/${cat.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                          >
                            <span>Browse All {catProducts.length} Items</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                          <a
                            href={getGeneralWhatsAppUrl(`Hello Balaji Traders, I would like wholesale details for ${cat.name} lots.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white text-xs font-bold uppercase tracking-wider shadow-xs"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Discuss Bulk Lot</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Sample Product Row */}
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <span className="technical-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                        FEATURED IN THIS DIVISION
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        {catProducts.slice(0, 4).map((p) => {
                          const thumb = p.images?.[0]?.src || '/images/products/mens-racing-jammer-black.png';
                          return (
                            <Link
                              key={p.id}
                              href={`/products/${p.slug}`}
                              className="group p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-500 hover:bg-white transition-all shadow-2xs"
                            >
                              <div className="aspect-square relative rounded-xl bg-white border border-slate-100 p-2 mb-2 flex items-center justify-center overflow-hidden">
                                <Image
                                  src={thumb}
                                  alt={p.name}
                                  fill
                                  className="object-contain filter drop-shadow-[0_4px_8px_rgba(15,23,42,0.08)] group-hover:scale-108 transition-transform duration-300"
                                />
                              </div>
                              <span className="technical-mono text-[9px] font-bold text-sky-600 block uppercase truncate">
                                {p.brand}
                              </span>
                              <span className="font-bold text-xs text-slate-900 block truncate group-hover:text-sky-600 transition-colors">
                                {p.name}
                              </span>
                              <span className="text-[11px] font-black text-slate-950 mt-1 block">
                                {p.price ? formatPrice(p.price) : 'Wholesale Lot'}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
