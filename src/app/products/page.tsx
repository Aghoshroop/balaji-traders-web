'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Filter,
  X,
  ArrowRight,
  MessageCircle,
  LayoutGrid,
  List,
  Sparkles,
  ArrowUpDown,
  Phone,
  Package,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  Square,
  Grid3X3,
} from 'lucide-react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { BUSINESS, CONTACT } from '@/lib/config';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AvailabilityBadge from '@/components/ui/AvailabilityBadge';
import ProductCard from '@/components/products/ProductCard';
import ProductQuickViewModal from '@/components/products/ProductQuickViewModal';
import { formatPrice } from '@/lib/utils';
import { getProductWhatsAppUrl, getGeneralWhatsAppUrl, getPhoneUrl } from '@/lib/whatsapp';
import { trackSearch, trackWhatsAppClick } from '@/lib/analytics';
import type { Product } from '@/types';

const sortOptions = [
  { value: 'featured', label: 'Featured / Recommended' },
  { value: 'price-asc', label: 'Wholesale: Low to High' },
  { value: 'price-desc', label: 'Wholesale: High to Low' },
  { value: 'name-asc', label: 'Alphabetical: A to Z' },
  { value: 'newest', label: 'New Arrivals First' },
];

const priceRanges = [
  { label: 'All Rates', min: 0, max: Infinity },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 — ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 & Above', min: 1000, max: Infinity },
];

const popularSearches = [
  'Racing Jammer',
  'Goggles',
  'Silicone Cap',
  'Training Brief',
  'Swim Shorts',
  'Kneeskin',
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedPriceRangeIndex, setSelectedPriceRangeIndex] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'rhythm' | 'index'>('rhythm');
  const [mobileGridCols, setMobileGridCols] = useState<1 | 3>(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      if (selectedCategory && product.categorySlug !== selectedCategory) return false;
      if (selectedBrand && product.brand !== selectedBrand) return false;
      if (selectedAvailability && product.availability !== selectedAvailability) return false;
      if (selectedGender && product.gender !== selectedGender) return false;

      const range = priceRanges[selectedPriceRangeIndex];
      const price = product.price || 0;
      if (price < range.min || price > range.max) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchSku = product.sku.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchMaterial = product.material?.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        if (!matchName && !matchSku && !matchCat && !matchBrand && !matchMaterial && !matchDesc) {
          return false;
        }
      }
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

    return result;
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedAvailability,
    selectedGender,
    selectedPriceRangeIndex,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (selectedBrand ? 1 : 0) +
    (selectedAvailability ? 1 : 0) +
    (selectedGender ? 1 : 0) +
    (selectedPriceRangeIndex > 0 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedAvailability('');
    setSelectedGender('');
    setSelectedPriceRangeIndex(0);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 w-full min-w-0 max-w-full overflow-x-hidden">
      {/* ================================================================ */}
      {/* 1. COMPACT, CRISP HEADER — COLLECTIONS SHOW IMMEDIATELY          */}
      {/* ================================================================ */}
      <div className="bg-white border-b border-slate-200/90 pt-3 pb-4 sm:pb-6 w-full min-w-0 max-w-full">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 w-full min-w-0">
          <div className="mb-2">
            <Breadcrumbs items={[{ label: 'Collection' }]} />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span className="technical-mono text-[9px] sm:text-[10px] font-bold text-sky-700 tracking-widest uppercase">
                  CHENNAI WHOLESALE WAREHOUSE // EST. {BUSINESS.established}
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-950">
                  THE{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500">
                    COLLECTION
                  </span>
                </h1>
                <span className="technical-mono text-xs sm:text-sm font-bold text-slate-500">
                  ({filteredProducts.length} Lines)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-normal hidden min-[480px]:block">
                Authentic EGLIDER racing swimwear, athletic suits & poolside equipment. Direct warehouse dispatch from Otteri, Chennai.
              </p>
            </div>

            {/* Quick Action Buttons on Desktop / Tablet */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('collection-top-quote')}
                className="whatsapp-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Wholesale Quote</span>
              </a>
              <a
                href={getPhoneUrl()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors border border-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 2. COLLECTION CATALOGUE & CONTROLS TOOLBAR                      */}
      {/* ================================================================ */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-4 sm:pt-6 w-full min-w-0 max-w-full">

        {/* ============================================================ */}
        {/* 3. SEARCH, FILTERS & MOBILE GRID TOGGLE BAR                  */}
        {/* ============================================================ */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-2xs mb-5 w-full min-w-0 max-w-full overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-3 w-full min-w-0">
            {/* Search Input */}
            <div className="flex-1 relative min-w-0 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search models, SKU, material (e.g. Jammer, Brief, Silicone)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length > 2) {
                    trackSearch(e.target.value, filteredProducts.length);
                  }
                }}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Controls Row: Filters, Flexible Truncated Sort, and Grid Density Switcher */}
            <div className="flex items-center justify-between md:justify-end gap-1.5 sm:gap-2 w-full md:w-auto min-w-0">
              {/* Filter Button */}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all shadow-2xs cursor-pointer shrink-0 ${
                  showFilters || activeFilterCount > 0
                    ? 'bg-sky-50 border-sky-400 text-sky-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-sky-600 text-white text-[9px] flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown: flexible and constrained so it NEVER pushes siblings off-screen */}
              <div className="relative flex-1 md:flex-initial min-w-0 max-w-[170px] sm:max-w-[220px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none pl-2.5 sm:pl-3 pr-6 sm:pr-7 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] sm:text-xs font-bold text-slate-700 hover:border-slate-300 focus:outline-none focus:border-sky-500 shadow-2xs cursor-pointer uppercase tracking-wider truncate"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="newest">Newest First</option>
                  <option value="name-asc">A to Z</option>
                </select>
                <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
              </div>

              {/* ======================================================== */}
              {/* MOBILE ONLY: 1-PRODUCT VS 3-PRODUCTS-IN-A-ROW TOGGLE     */}
              {/* ======================================================== */}
              <div className="block sm:hidden flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shrink-0">
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
                  onClick={() => setMobileGridCols(3)}
                  className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-black technical-mono transition-all ${
                    mobileGridCols === 3
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="3 Products in a Row"
                  aria-label="3 Products in a Row"
                >
                  <Grid3X3 className="w-3 h-3" />
                  <span>3</span>
                </button>
              </div>

              {/* DESKTOP ONLY: Grid vs Manifest Table Toggle */}
              <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('rhythm')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'rhythm'
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="Showroom Cards Grid"
                  aria-label="Showroom Cards Grid"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('index')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'index'
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="B2B Wholesale Manifest Table"
                  aria-label="B2B Wholesale Manifest Table"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Badges Row */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="technical-mono text-[9px] font-bold text-slate-400 uppercase">
                  APPLIED:
                </span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-semibold">
                    Category: {categories.find((c) => c.slug === selectedCategory)?.shortName}
                    <button onClick={() => setSelectedCategory('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedBrand && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-semibold">
                    {selectedBrand}
                    <button onClick={() => setSelectedBrand('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedAvailability && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                    {selectedAvailability}
                    <button onClick={() => setSelectedAvailability('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedGender && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-semibold">
                    {selectedGender}
                    <button onClick={() => setSelectedGender('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedPriceRangeIndex > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">
                    {priceRanges[selectedPriceRangeIndex].label}
                    <button onClick={() => setSelectedPriceRangeIndex(0)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-semibold">
                    &ldquo;{searchQuery}&rdquo;
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={clearAllFilters}
                className="technical-mono text-[10px] font-bold text-rose-600 hover:text-rose-700 tracking-wider uppercase inline-flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            </div>
          )}

          {/* Expandable Filter Suite */}
          {showFilters && (
            <div className="pt-4 mt-3 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 animate-fade-in">
              {/* Category Filter */}
              <div>
                <label className="block technical-mono text-[9px] font-bold text-slate-400 mb-1.5 uppercase">
                  CATEGORY
                </label>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedCategory === ''
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedCategory === c.slug
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {c.shortName}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block technical-mono text-[9px] font-bold text-slate-400 mb-1.5 uppercase">
                  MANUFACTURER / BRAND
                </label>
                <div className="flex flex-wrap gap-1">
                  {['', 'EGLIDER', 'Speedo'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBrand(b)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedBrand === b
                          ? 'bg-slate-950 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {b === '' ? 'All Brands' : b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block technical-mono text-[9px] font-bold text-slate-400 mb-1.5 uppercase">
                  WAREHOUSE STATUS
                </label>
                <div className="flex flex-wrap gap-1">
                  {[
                    { value: '', label: 'All Status' },
                    { value: 'in-stock', label: 'In Stock' },
                    { value: 'available', label: 'Available' },
                    { value: 'new-arrival', label: 'New Arrivals' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelectedAvailability(opt.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedAvailability === opt.value
                          ? 'bg-slate-950 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block technical-mono text-[9px] font-bold text-slate-400 mb-1.5 uppercase">
                  DIVISION
                </label>
                <div className="flex flex-wrap gap-1">
                  {[
                    { value: '', label: 'All' },
                    { value: 'men', label: 'Men' },
                    { value: 'women', label: 'Women' },
                    { value: 'kids', label: 'Kids' },
                    { value: 'unisex', label: 'Gear' },
                  ].map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => setSelectedGender(g.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedGender === g.value
                          ? 'bg-slate-950 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block technical-mono text-[9px] font-bold text-slate-400 mb-1.5 uppercase">
                  WHOLESALE PRICE TIER
                </label>
                <div className="flex flex-wrap gap-1">
                  {priceRanges.map((r, idx) => (
                    <button
                      key={r.label}
                      type="button"
                      onClick={() => setSelectedPriceRangeIndex(idx)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedPriceRangeIndex === idx
                          ? 'bg-slate-950 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* 4. PRODUCTS COLLECTION SHOWS IMMEDIATELY                     */}
        {/* ============================================================ */}
        {viewMode === 'rhythm' ? (
          filteredProducts.length > 0 ? (
            /* DYNAMIC GRID: Mobile can be 1 or 3 in a row! Desktop is standard sm:2 lg:3 xl:4 */
            <div
              className={`grid items-stretch w-full min-w-0 max-w-full ${
                mobileGridCols === 3
                  ? 'grid-cols-3 gap-1.5 min-[400px]:gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6'
                  : 'grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  density={mobileGridCols === 3 ? 'compact' : 'standard'}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            /* Zero Results State */
            <div className="text-center py-16 px-4 bg-white border border-slate-200/90 rounded-3xl shadow-xs my-6 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center mx-auto mb-3 text-sky-600">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-950 mb-1">
                No Products Found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5 leading-relaxed">
                Try popular swimwear lines below or reset your filters:
              </p>

              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      clearAllFilters();
                      setSearchQuery(term);
                    }}
                    className="px-3 py-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 border border-slate-200 rounded-full text-xs font-bold text-slate-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold technical-mono uppercase tracking-wider text-white bg-slate-950 rounded-full hover:bg-sky-600 transition-colors shadow-md cursor-pointer"
              >
                <span>Reset All Filters</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )
        ) : (
          /* ============================================================ */
          /* 5. DESKTOP B2B MANIFEST TABLE (VIEW MODE 2)                  */
          /* ============================================================ */
          <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs w-full min-w-0 max-w-full">
            <div className="p-4 sm:p-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                <span className="technical-mono text-xs font-bold uppercase tracking-wider">
                  B2B PROCUREMENT MANIFEST // {filteredProducts.length} LINE ITEMS
                </span>
              </div>
              <span className="text-[11px] text-slate-400 technical-mono hidden sm:block">
                DIRECT WAREHOUSE WHOLESALE RATES
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 technical-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4">#</th>
                    <th className="py-3.5 px-4">Product Details</th>
                    <th className="py-3.5 px-4">Division</th>
                    <th className="py-3.5 px-4">Material</th>
                    <th className="py-3.5 px-4">Available Sizes</th>
                    <th className="py-3.5 px-4">Stock Status</th>
                    <th className="py-3.5 px-4">Wholesale Rate</th>
                    <th className="py-3.5 px-4 text-right">Procure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredProducts.map((p, idx) => {
                    const thumb = p.images?.[0]?.src || '/images/products/real-product-1-1.jpeg';
                    return (
                      <tr
                        key={p.id}
                        className="hover:bg-sky-50/40 transition-colors group cursor-pointer"
                        onClick={() => setQuickViewProduct(p)}
                      >
                        <td className="py-3.5 px-4 technical-mono font-bold text-slate-400">
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-13 rounded-lg bg-slate-50 border border-slate-200/80 p-1 relative shrink-0 flex items-center justify-center overflow-hidden">
                              <Image src={thumb} alt={p.name} fill className="object-contain filter drop-shadow-[0_2px_4px_rgba(15,23,42,0.1)] group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="min-w-0 max-w-xs">
                              <span className="technical-mono text-[9px] font-bold text-sky-600 block">
                                {p.brand} · {p.sku}
                              </span>
                              <span className="font-bold text-slate-950 group-hover:text-sky-600 transition-colors block truncate">
                                {p.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {p.category}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {p.material || '—'}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[130px]">
                            {p.sizes.slice(0, 4).map((s) => (
                              <span
                                key={s}
                                className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700"
                              >
                                {s}
                              </span>
                            ))}
                            {p.sizes.length > 4 && (
                              <span className="text-[10px] text-slate-400 font-semibold self-center">
                                +{p.sizes.length - 4}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <AvailabilityBadge status={p.availability} size="sm" />
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-black text-slate-950 text-sm">
                            {p.price ? formatPrice(p.price) : 'Wholesale Lot'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setQuickViewProduct(p)}
                              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-bold"
                            >
                              Quick View
                            </button>
                            <a
                              href={getProductWhatsAppUrl(p)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackWhatsAppClick('manifest-table', p.id, p.name)}
                              className="whatsapp-btn p-2 rounded-lg text-white"
                              aria-label={`WhatsApp Enquiry for ${p.name}`}
                              title="Enquire on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 6. WHOLESALE ACADEMY & TEAM LOTS PROCUREMENT BANNER          */}
        {/* ============================================================ */}
        <section className="mt-14 sm:mt-16 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-sky-400" />
                <span className="technical-mono text-[9px] font-bold text-sky-400 uppercase tracking-widest">
                  SPECIALIST B2B BULK PROCUREMENT
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mb-2">
                Equipping Swim Academies, Sports Retailers & School Teams
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl font-normal">
                Need bulk sizing sets, academy batch pricing, or customized lot orders? Balaji Traders maintains ready stock at our Otteri, Chennai warehouse for rapid fulfillment.
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-xs technical-mono text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Size Batch Breakdown</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct Invoicing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Same-Day Stock Verification</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('bulk-banner')}
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
        </section>
      </div>

      {/* ================================================================ */}
      {/* 7. QUICK VIEW MODAL (DYNAMIC B2B INSPECTION)                     */}
      {/* ================================================================ */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
