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

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

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

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const primaryImage = product.images?.[0] || {
    src: '/images/products/real-product-1-1.jpeg',
    alt: product.name,
  };

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
        {/* PRODUCT CAMPAIGN STAGE                                           */}
        {/* ================================================================ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
            {/* Left: Floating Campaign Image Stage (6 cols) */}
            <div className="lg:col-span-6">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-b from-sky-50/70 via-slate-50 to-white border border-slate-200/90 p-8 flex items-center justify-center relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(240,249,255,0.8),transparent_70%)] pointer-events-none" />
                <div className="relative w-full h-full flex flex-col items-center justify-center product-float">
                  <div className="relative w-full h-4/5 max-h-[460px]">
                    <Image
                      src={primaryImage.src}
                      alt={primaryImage.alt || product.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain filter drop-shadow-[0_20px_40px_rgba(15,23,42,0.18)]"
                    />
                  </div>
                  {/* Floating water shadow beneath product */}
                  <div className="w-3/4 h-5 water-shadow rounded-full mx-auto mt-4 opacity-75" />
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <AvailabilityBadge status={product.availability} size="md" />
                </div>

                {/* Sub-label watermark */}
                <div className="absolute bottom-4 left-6 z-10">
                  <span className="technical-mono text-[9px] text-slate-400 block font-bold">
                    CHENNAI STOCK · {product.sku}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Campaign Details & Primary Direct Conversion (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="technical-mono text-xs font-bold text-sky-600">
                  {product.brand}
                </span>
                <span className="text-slate-300">·</span>
                <span className="technical-mono text-xs text-slate-400 font-mono">
                  {product.sku}
                </span>
              </div>

              <h1 className="text-2xl min-[360px]:text-3xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight leading-[0.95] mb-4 break-words">
                {product.name}
              </h1>

              {/* Price Callout */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-slate-200">
                {product.price ? (
                  <>
                    <span className="text-3xl font-black text-slate-950">{formatPrice(product.price)}</span>
                    <span className="technical-mono text-xs text-slate-500 font-bold">
                      PER PIECE (WHOLESALE LOT)
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-bold text-slate-700 technical-mono">
                    CONTACT FOR WHOLESALE LOT PRICING
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 font-normal">
                {product.description}
              </p>

              {/* Direct Acquisition Prompt */}
              <div className="bg-slate-950 text-white rounded-2xl p-6 mb-8 border border-slate-800 shadow-md">
                <span className="technical-mono text-[10px] font-bold text-sky-400 block mb-2">
                  NEED THIS APPAREL FOR YOUR SQUAD OR STORE?
                </span>
                <p className="text-xs text-slate-400 mb-5">
                  Launch an instant WhatsApp enquiry for stock verification and carton rate sheets, or call our Chennai warehouse desk.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setEnquiryOpen(true);
                      trackProductView(product.id, product.name, product.brand, product.category);
                    }}
                    className="flex-1 whatsapp-btn flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Enquiry
                  </button>
                  <a
                    href={getPhoneUrl()}
                    onClick={() => trackCallClick('product-detail')}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4 text-sky-400" />
                    Call: {CONTACT.phone}
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
