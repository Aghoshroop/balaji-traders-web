'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MessageCircle, Eye, Sparkles } from 'lucide-react';
import type { Product } from '@/types';
import AvailabilityBadge from '@/components/ui/AvailabilityBadge';
import { formatPrice } from '@/lib/utils';
import { getProductWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  density?: 'standard' | 'compact';
}

export default function ProductCard({
  product,
  onQuickView,
  density = 'standard',
}: ProductCardProps) {
  const primaryImage = product.images?.[0] || {
    src: '/images/products/mens-racing-jammer-black.png',
    alt: product.name,
  };

  const discountPercent =
    product.mrp && product.price && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  // =========================================================================
  // 1. COMPACT DENSITY (Specifically tailored for 3-in-a-row mobile grid)
  // =========================================================================
  if (density === 'compact') {
    return (
      <div className="group showroom-card rounded-xl sm:rounded-3xl overflow-hidden flex flex-col h-full bg-white border border-slate-200/90 shadow-2xs hover:border-sky-400 hover:shadow-md transition-all duration-300 w-full min-w-0 max-w-full">
        {/* Compact Mobile Presentation (Visible only on screens < 640px) */}
        <div className="block sm:hidden flex flex-col h-full justify-between">
          <div
            onClick={() => onQuickView?.(product)}
            className="cursor-pointer block relative aspect-square bg-gradient-to-b from-slate-50 via-sky-50/20 to-white p-2.5 flex items-center justify-center border-b border-slate-100 overflow-hidden"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={primaryImage.src}
                alt={product.name}
                fill
                sizes="120px"
                className="object-contain filter drop-shadow-[0_6px_12px_rgba(15,23,42,0.1)] group-hover:scale-108 transition-transform duration-300"
              />
            </div>

            {/* Micro Badge */}
            {discountPercent && (
              <span className="absolute top-1 left-1 px-1 py-0.2 text-[8px] font-black bg-emerald-600 text-white rounded">
                -{discountPercent}%
              </span>
            )}
            <span
              className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                product.availability === 'in-stock'
                  ? 'bg-emerald-500'
                  : product.availability === 'limited'
                  ? 'bg-amber-500'
                  : 'bg-sky-500'
              }`}
              title={product.availability}
            />
          </div>

          <div className="p-1.5 min-[400px]:p-2 flex flex-col flex-1 justify-between bg-white">
            <div
              onClick={() => onQuickView?.(product)}
              className="cursor-pointer"
            >
              <span className="technical-mono text-[8px] font-bold text-sky-700 block truncate">
                {product.brand}
              </span>
              <h4 className="font-bold text-slate-950 text-[11px] leading-tight line-clamp-1 uppercase group-hover:text-sky-600 transition-colors mt-0.5">
                {product.name}
              </h4>
            </div>

            <div className="pt-1 mt-1 border-t border-slate-100 flex items-center justify-between gap-1">
              <span className="text-[11px] font-black text-slate-950 truncate">
                {product.price ? formatPrice(product.price) : 'Wholesale'}
              </span>

              <a
                href={getProductWhatsAppUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  trackWhatsAppClick('compact-card', product.id, product.name);
                }}
                className="w-5 h-5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white flex items-center justify-center shrink-0 shadow-2xs"
                aria-label={`WhatsApp Enquiry for ${product.name}`}
              >
                <MessageCircle className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Standard Desktop Presentation (Automatically resumes on sm: screens) */}
        <div className="hidden sm:flex flex-col h-full justify-between">
          <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50/20 to-white p-6 flex items-center justify-center border-b border-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(240,249,255,0.8),transparent_70%)] pointer-events-none" />
            <Link
              href={`/products/${product.slug}`}
              className="relative w-full h-full flex items-center justify-center group-hover:scale-108 group-hover:-translate-y-1 transition-all duration-500 ease-out"
            >
              <Image
                src={primaryImage.src}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-contain filter drop-shadow-[0_10px_20px_rgba(15,23,42,0.12)]"
              />
              <div className="absolute bottom-1 inset-x-8 h-3.5 bg-slate-900/10 rounded-full blur-md opacity-40 group-hover:opacity-70 group-hover:scale-90 transition-all duration-500" />
            </Link>

            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
              {product.isNewArrival && (
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-slate-950 text-white rounded-full shadow-xs">
                  NEW
                </span>
              )}
              {discountPercent && (
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-600 text-white rounded-full shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <div className="absolute top-3 right-3 z-10">
              <AvailabilityBadge status={product.availability} size="sm" />
            </div>

            {onQuickView && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="inline-flex items-center gap-1.5 absolute bottom-3.5 inset-x-auto px-4 py-2 bg-slate-950/90 hover:bg-slate-950 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 cursor-pointer z-10 border border-white/10"
              >
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>Quick View</span>
              </button>
            )}
          </div>

          <div className="p-5 flex flex-col flex-1 justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="technical-mono text-[9px] font-bold text-sky-700 tracking-wider">
                  {product.brand}
                </span>
                <span className="technical-mono text-[9px] font-semibold text-slate-400">
                  {product.sku}
                </span>
              </div>

              <Link href={`/products/${product.slug}`} className="block mb-1.5">
                <h3 className="font-bold text-slate-950 text-base leading-snug group-hover:text-sky-600 transition-colors line-clamp-1 uppercase tracking-tight">
                  {product.name}
                </h3>
              </Link>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                {product.shortDescription || product.description}
              </p>

              <div className="space-y-2 mb-4 pt-1">
                {product.material && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <Sparkles className="w-3 h-3 text-sky-600 shrink-0" />
                    <span className="truncate font-medium">{product.material}</span>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="technical-mono text-[8px] font-bold text-slate-400 uppercase">
                      SIZES:
                    </span>
                    <div className="flex items-center gap-1 flex-wrap">
                      {product.sizes.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                      {product.sizes.length > 4 && (
                        <span className="text-[10px] text-slate-400 font-semibold">
                          +{product.sizes.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-slate-950 leading-none">
                    {formatPrice(product.price || 0)}
                  </span>
                  {product.mrp && product.mrp > (product.price || 0) && (
                    <span className="text-[11px] text-slate-400 line-through">
                      ₹{product.mrp}
                    </span>
                  )}
                </div>
                <span className="technical-mono text-[9px] font-bold text-slate-400 uppercase block mt-0.5">
                  WHOLESALE LOT
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  href={`/products/${product.slug}`}
                  className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors"
                  aria-label={`View full details for ${product.name}`}
                >
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <a
                  href={getProductWhatsAppUrl(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('product-card', product.id, product.name)}
                  className="whatsapp-btn px-3 py-2 rounded-xl shadow-xs flex items-center justify-center gap-1.5 text-xs font-bold text-white transition-transform hover:scale-105"
                  aria-label={`WhatsApp enquiry for ${product.name}`}
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span className="hidden xl:inline">Enquire</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. STANDARD DENSITY (Default 1-product-per-row mobile and standard desktop)
  // =========================================================================
  return (
    <div className="group showroom-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-full bg-white border border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.04)] hover:border-sky-400/80 hover:shadow-[0_20px_35px_rgba(14,165,233,0.14)] transition-all duration-500 w-full min-w-0 max-w-full">
      {/* Product Image Stage: Clean Aquatic Studio Environment */}
      <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50/20 to-white p-5 sm:p-7 flex items-center justify-center border-b border-slate-100/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(240,249,255,0.9),transparent_70%)] pointer-events-none" />
        <Link
          href={`/products/${product.slug}`}
          className="relative w-full h-full flex items-center justify-center group-hover:scale-108 group-hover:-translate-y-1.5 transition-all duration-500 ease-out"
          aria-label={`View details for ${product.name}`}
        >
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain filter drop-shadow-[0_12px_22px_rgba(15,23,42,0.12)]"
          />
          {/* Subtle Dynamic Pedestal Shadow */}
          <div className="absolute bottom-1 inset-x-10 h-3.5 bg-slate-900/10 rounded-full blur-md opacity-45 group-hover:opacity-75 group-hover:scale-90 transition-all duration-500 pointer-events-none" />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-slate-950 text-white rounded-full shadow-xs">
              NEW
            </span>
          )}
          {discountPercent && (
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-600 text-white rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <div className="absolute top-3.5 right-3.5 z-10">
          <AvailabilityBadge status={product.availability} size="sm" />
        </div>

        {/* Quick View Hover Pill on Desktop */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 absolute bottom-3.5 inset-x-auto px-4 py-2 bg-slate-950/90 hover:bg-slate-950 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-xl backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 cursor-pointer z-10 border border-white/10"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & SKU Header */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="technical-mono text-[9px] font-bold text-sky-700 tracking-wider">
              {product.brand}
            </span>
            <span className="technical-mono text-[9px] font-semibold text-slate-400">
              {product.sku}
            </span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block mb-1.5">
            <h3 className="font-bold text-slate-950 text-sm sm:text-base leading-snug group-hover:text-sky-600 transition-colors line-clamp-1 uppercase tracking-tight">
              {product.name}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
            {product.shortDescription || product.description}
          </p>

          {/* Fabric / Material & Size Pills */}
          <div className="space-y-2 mb-4 pt-1">
            {product.material && (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                <Sparkles className="w-3 h-3 text-sky-600 shrink-0" />
                <span className="truncate font-medium">{product.material}</span>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="technical-mono text-[8px] font-bold text-slate-400 uppercase">
                  SIZES:
                </span>
                <div className="flex items-center gap-1 flex-wrap">
                  {product.sizes.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                  {product.sizes.length > 4 && (
                    <span className="text-[10px] text-slate-400 font-semibold">
                      +{product.sizes.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            {product.price ? (
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-black text-slate-950 leading-none">
                    {formatPrice(product.price)}
                  </span>
                  {product.mrp && product.mrp > product.price && (
                    <span className="text-[11px] text-slate-400 line-through">
                      ₹{product.mrp}
                    </span>
                  )}
                </div>
                <span className="technical-mono text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase block mt-0.5">
                  WHOLESALE LOT
                </span>
              </div>
            ) : (
              <span className="text-xs font-bold text-slate-600">Wholesale Lot</span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {onQuickView && (
              <button
                type="button"
                onClick={() => onQuickView(product)}
                className="sm:hidden p-2 text-slate-600 hover:text-slate-950 bg-slate-100 rounded-xl"
                aria-label={`Quick view ${product.name}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            )}

            <Link
              href={`/products/${product.slug}`}
              className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label={`View full details for ${product.name}`}
            >
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <a
              href={getProductWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('product-card', product.id, product.name)}
              className="whatsapp-btn p-2 sm:px-3 sm:py-2 rounded-xl shadow-xs flex items-center justify-center gap-1.5 text-xs font-bold text-white transition-transform hover:scale-105"
              aria-label={`WhatsApp enquiry for ${product.name}`}
              title="Enquire on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span className="hidden xl:inline">Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
