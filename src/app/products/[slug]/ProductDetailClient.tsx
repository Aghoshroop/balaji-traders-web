'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Phone, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { getProductBySlug, getProductsByCategory } from '@/data/products';
import AvailabilityBadge from '@/components/ui/AvailabilityBadge';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import EnquiryModal from '@/components/products/EnquiryModal';
import ProductCard from '@/components/products/ProductCard';
import PoolLaneSpine from '@/components/ui/aquatic/PoolLaneSpine';
import { formatPrice } from '@/lib/utils';
import { getPhoneUrl } from '@/lib/whatsapp';
import { trackCallClick, trackProductView } from '@/lib/analytics';
import { CONTACT } from '@/lib/config';
import { getProductSchema } from '@/lib/schema';
import type { Product } from '@/types';

export default function ProductDetailClient({ 
  product, 
  relatedProducts 
}: { 
  product: Product | undefined;
  relatedProducts: Product[];
}) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 flex items-center justify-center p-4">
        <div className="text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-xs max-w-md w-full">
          <h1 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h1>
          <p className="text-xs text-slate-500 mb-6">The requested item could not be located in our current inventory.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-950 rounded-xl"
          >
            Return to Products Archive
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [
    { src: '/images/products/real-product-1-1.jpeg', alt: product.name }
  ];
  const primaryImage = images[activeImageIndex] || images[0];

  return (
    <>
      {/* Product Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProductSchema(product)) }}
      />

      <div className="min-h-screen bg-white">
        {/* Navigation & Breadcrumbs Header */}
        <div className="pt-24 pb-6 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: 'Products', href: '/products' },
                { label: product.category, href: `/categories/${product.categorySlug}` },
                { label: product.name },
              ]}
            />
          </div>
        </div>

        {/* ================================================================ */}
        {/* PREMIUM PRODUCT HERO SECTION                                     */}
        {/* ================================================================ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
            
            {/* Left: Massive Edge-to-Edge Image Stage (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="w-full relative aspect-square sm:aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] bg-white border border-slate-200/60 overflow-hidden shadow-sm group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(240,249,255,0.4),transparent_70%)] pointer-events-none" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-12 transition-transform duration-700 ease-out group-hover:scale-105">
                  <div className="relative w-full h-full">
                    <Image
                      src={primaryImage.src}
                      alt={primaryImage.alt || product.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-contain filter drop-shadow-[0_20px_40px_rgba(15,23,42,0.15)]"
                    />
                  </div>
                </div>
                
                <div className="absolute top-6 right-6 z-10">
                  <AvailabilityBadge status={product.availability} size="md" />
                </div>
              </div>

              {/* Minimalist Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden transition-all duration-300 ${
                        activeImageIndex === idx 
                        ? 'ring-2 ring-sky-500 shadow-md bg-white' 
                        : 'border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt || `${product.name} thumbnail ${idx + 1}`}
                        fill
                        sizes="96px"
                        className="object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Premium Details & Conversion (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center py-6 lg:py-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest rounded-full">
                  {product.brand}
                </span>
                <span className="text-slate-400 font-mono text-xs">
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 uppercase tracking-tighter leading-[1.1] mb-6">
                {product.name}
              </h1>

              {/* Price Callout - Clean & Bold */}
              <div className="flex items-end gap-3 mb-8">
                {!product.isHardcodedUntouched && product.price ? (
                  <>
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{formatPrice(product.price)}</span>
                    <span className="text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider">
                      / Wholesale & Retail
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-sky-600 uppercase tracking-wide">
                    Price on Request
                  </span>
                )}
              </div>

              <div className="w-12 h-1 bg-sky-500 rounded-full mb-8" />

              <p className="text-base text-slate-600 leading-relaxed mb-10 font-medium">
                {product.description}
              </p>

              {/* Premium Direct Acquisition Prompt */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-[2rem] p-8 mb-8 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">
                  Ready to Order?
                </h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  Connect with our warehouse team instantly to check live inventory and secure your bulk pricing.
                </p>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => {
                      setEnquiryOpen(true);
                      trackProductView(product.id, product.name, product.brand, product.category);
                    }}
                    className="w-full flex items-center justify-center gap-3 py-4 text-sm font-bold uppercase tracking-widest text-white bg-slate-950 hover:bg-slate-900 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enquire Now
                  </button>
                  <a
                    href={getPhoneUrl()}
                    onClick={() => trackCallClick('product-detail')}
                    className="w-full flex items-center justify-center gap-3 py-4 text-sm font-bold uppercase tracking-widest text-slate-900 bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-2xl transition-colors duration-300"
                  >
                    <Phone className="w-5 h-5 text-slate-400" />
                    Call Warehouse
                  </a>
                </div>
              </div>
            </div>
          </div>

          <PoolLaneSpine distance="50.00M · TECHNICAL DATA" label="PRODUCT SPECIFICATIONS" />

          {/* ================================================================ */}
          {/* TECHNICAL SPECIFICATION STREAM (NO GENERIC CARDS)                */}
          {/* ================================================================ */}
          <div className="grid md:grid-cols-3 gap-8 py-10 border-b border-slate-200">
            {/* Column 1: Material & Cut */}
            <div>
              <span className="technical-mono text-[10px] font-bold text-sky-600 block mb-2">
                01 // COMPOSITION & CONSTRUCTION
              </span>
              <h3 className="text-lg font-black uppercase text-slate-950 mb-3">
                Fabric & Profile
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {product.material || 'Durable swimming apparel fabric blend'}
              </p>
              {product.features && product.features.length > 0 && (
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Column 2: Sizing & Colors */}
            <div>
              <span className="technical-mono text-[10px] font-bold text-sky-600 block mb-2">
                02 // SIZING MATRIX
              </span>
              <h3 className="text-lg font-black uppercase text-slate-950 mb-3">
                Sizes & Colourways
              </h3>
              <div className="mb-4">
                <span className="text-[10px] technical-mono text-slate-400 block mb-1">AVAILABLE SIZES</span>
                <span className="text-sm font-bold text-slate-900">{product.sizes.join(' · ')}</span>
              </div>
              <div>
                <span className="text-[10px] technical-mono text-slate-400 block mb-1">STOCKED COLOURS</span>
                <span className="text-sm font-bold text-slate-900">{product.colors.join(' · ')}</span>
              </div>
            </div>

            {/* Column 3: Suitable For */}
            <div>
              <span className="technical-mono text-[10px] font-bold text-sky-600 block mb-2">
                03 // PROCUREMENT ADVICE
              </span>
              <h3 className="text-lg font-black uppercase text-slate-950 mb-3">
                Suitable For
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recommended for sports retail shops stocking swimming apparel, swimming coaching academies providing student teamwear, competitive athletes preparing for race meets, and club squads requiring regular replenishment.
              </p>
            </div>
          </div>

          {/* ================================================================ */}
          {/* RELATED PRODUCTS                                                 */}
          {/* ================================================================ */}
          {relatedProducts.length > 0 && (
            <div className="pt-16">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="technical-mono text-[10px] font-bold text-sky-600 block mb-1">
                    INVENTORY CONTINUITY
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-slate-950 tracking-tight">
                    Related Apparel & Equipment
                  </h2>
                </div>
                <Link
                  href={`/categories/${product.categorySlug}`}
                  className="text-xs font-bold uppercase tracking-wider text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  View All {product.category} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 min-[440px]:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp Enquiry Modal */}
      <EnquiryModal product={product} isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
