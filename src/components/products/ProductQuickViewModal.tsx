'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, MessageCircle, ArrowRight, Check, Eye, Package, ShieldCheck, Sparkles } from 'lucide-react';
import type { Product } from '@/types';
import AvailabilityBadge from '@/components/ui/AvailabilityBadge';
import { formatPrice } from '@/lib/utils';
import { getProductWhatsAppUrl } from '@/lib/whatsapp';
import { CONTACT } from '@/lib/config';
import { trackWhatsAppClick } from '@/lib/analytics';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
}: ProductQuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (product && product.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize(null);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const primaryImage = product.images?.[0] || {
    src: '/images/products/mens-racing-jammer-black.png',
    alt: product.name,
  };

  const discountPercent =
    product.mrp && product.price && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  const handleWhatsApp = (inquiryType: 'stock' | 'bulk' = 'stock') => {
    trackWhatsAppClick('quick-view-modal', product.id, `${product.name} (${inquiryType})`);
    const sizeNote = selectedSize ? ` (Selected Size: ${selectedSize})` : '';
    const customMsg =
      inquiryType === 'bulk'
        ? `Hello Balaji Traders, I want to inquire about bulk wholesale lot pricing for ${product.name} (SKU: ${product.sku})${sizeNote}. Please share wholesale quote.`
        : `Hello Balaji Traders, I want to check current warehouse stock availability for ${product.name} (SKU: ${product.sku})${sizeNote}.`;
    
    const encoded = encodeURIComponent(customMsg);
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto z-10 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 transition-colors shadow-2xs"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Stage */}
          <div className="md:col-span-5 bg-gradient-to-b from-sky-50/50 via-slate-50 to-white p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(240,249,255,0.8),transparent_70%)] pointer-events-none" />
            <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
              <span className="technical-mono text-[9px] font-black uppercase tracking-widest text-sky-600 bg-white/90 px-2 py-0.5 rounded border border-sky-200">
                {product.brand}
              </span>
              {product.isNewArrival && (
                <span className="technical-mono text-[9px] font-black uppercase tracking-widest bg-slate-950 text-white px-2 py-0.5 rounded">
                  NEW ARRIVAL
                </span>
              )}
            </div>

            {/* Product Image */}
            <div className="relative w-full aspect-square max-w-[260px] sm:max-w-[300px] flex items-center justify-center my-4 group">
              <Image
                src={primaryImage.src}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 260px, 300px"
                className="object-contain filter drop-shadow-[0_15px_30px_rgba(15,23,42,0.15)] group-hover:scale-105 transition-transform duration-300"
                priority
              />
              <div className="absolute bottom-1 inset-x-8 h-3.5 bg-slate-900/10 rounded-full blur-md opacity-40 pointer-events-none" />
            </div>

            {/* Availability */}
            <div className="mt-2">
              <AvailabilityBadge status={product.availability} size="sm" />
            </div>

            <div className="mt-4 text-center">
              <span className="technical-mono text-[10px] text-slate-400 block font-semibold">
                SKU: {product.sku}
              </span>
              <span className="technical-mono text-[9px] text-slate-400 block mt-0.5">
                WAREHOUSE DISPATCH: OTTERI, CHENNAI
              </span>
            </div>
          </div>

          {/* Right Column: Specifications & Rapid Procurement */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-2 mb-2">
                <span className="technical-mono text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-slate-300">/</span>
                <span className="technical-mono text-[10px] font-medium text-slate-500 uppercase">
                  {product.gender}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-950 leading-tight">
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                {product.description || product.shortDescription}
              </p>

              {/* Pricing Block */}
              <div className="my-5 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="technical-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    WHOLESALE RATE
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl sm:text-3xl font-black text-slate-950">
                      {product.price ? formatPrice(product.price) : 'Wholesale Quote'}
                    </span>
                    {product.mrp && product.mrp > (product.price || 0) && (
                      <span className="text-xs sm:text-sm text-slate-400 line-through">
                        MRP {formatPrice(product.mrp)}
                      </span>
                    )}
                  </div>
                </div>

                {discountPercent && (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
                    {discountPercent}% OFF MRP
                  </span>
                )}
              </div>

              {/* Specifications: Fabric & Sizes */}
              <div className="space-y-4 mb-6">
                {product.material && (
                  <div>
                    <span className="technical-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      FABRIC & MATERIAL
                    </span>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                      <span>{product.material}</span>
                    </div>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="technical-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        AVAILABLE SIZES
                      </span>
                      {selectedSize && (
                        <span className="text-[11px] font-bold text-sky-600">
                          Selected: {selectedSize}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            selectedSize === sz
                              ? 'bg-slate-950 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div>
                    <span className="technical-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      COLOR OPTIONS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.colors.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-1 bg-slate-100 rounded-lg text-[11px] font-semibold text-slate-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features Bullet points */}
                {product.features && product.features.length > 0 && (
                  <div className="pt-2">
                    <span className="technical-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      SPECIFICATIONS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {product.features.slice(0, 4).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 space-y-2.5">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => handleWhatsApp('stock')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Check Warehouse Stock</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsApp('bulk')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <Package className="w-4 h-4 text-sky-400" />
                  <span>Bulk Lot Quote</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Full Product Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Authentic EGLIDER Supply</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
