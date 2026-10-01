import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, MessageCircle, ExternalLink } from 'lucide-react';
import { BRANDS } from '@/lib/config';
import { getProductsByBrand } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PoolLaneSpine from '@/components/ui/aquatic/PoolLaneSpine';
import AquaticWaveRays from '@/components/ui/aquatic/AquaticWaveRays';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'EGLIDER Brand Room — Swimwear Distribution | Balaji Traders',
  description:
    'EGLIDER brand room distributed by Balaji Traders Chennai. Professional racing suits, training swimwear, goggles, and silicone caps. Direct wholesale supply.',
};
export const dynamic = 'force-dynamic';
export default async function EgliderPage() {
  const egliderProducts = await getProductsByBrand('EGLIDER');

  const divisions = [
    {
      code: '01',
      title: 'RACING & COMPETITION SUITS',
      desc: 'Knee-length jammers and suits engineered for competitive swim meets, state championships, and race days.',
    },
    {
      code: '02',
      title: 'DAILY SQUAD TRAINING',
      desc: 'Durable polyester and Lycra swimwear designed for squad training, coaching batches, and pool practice.',
    },
    {
      code: '03',
      title: 'SILICONE HEADWEAR',
      desc: '100% silicone swimming caps offering tear resistance, hydrodynamic profile, and secure fit for pool sessions.',
    },
    {
      code: '04',
      title: 'PRECISION OPTICS & GEAR',
      desc: 'Anti-fog racing goggles, junior goggles, and kickboards for comprehensive swimming education and training.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] pt-20">
      {/* Top Header */}
      <div className="border-b border-slate-200/80 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: 'Brands', href: '/brands' },
              { label: 'EGLIDER' },
            ]}
          />
        </div>
      </div>

      {/* ================================================================ */}
      {/* MONUMENTAL BRAND ROOM STAGE                                      */}
      {/* ================================================================ */}
      <div className="bg-slate-950 text-white py-16 lg:py-24 relative overflow-hidden">
        {/* Animated aquatic wave rays, water caustics & floating particles */}
        <AquaticWaveRays theme="dark" intensity="vibrant" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="technical-mono text-xs font-bold text-sky-400 block mb-3">
              PRIMARY BRAND ARCHIVE // GLIDER ENTERPRISE
            </span>

            <h1 className="text-4xl min-[400px]:text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tight leading-none mb-6 break-words">
              EGLIDER
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mb-8">
              {BRANDS.primary.description} Balaji Traders stocks the catalog for sports retailers, swimming academies, coaches, and institutional squads across South India.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                Wholesale Lot Enquiry
              </a>
              {BRANDS.primary.website && (
                <a
                  href={BRANDS.primary.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 text-xs font-bold technical-mono text-white bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  VISIT EGLIDER.IN <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Divisions Stream */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <PoolLaneSpine distance="BRAND ROOM // SECTORS" label="VERIFIED CATALOG DIVISIONS" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          {divisions.map((div, i) => (
            <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="technical-mono text-xs font-bold text-sky-600 block mb-2">
                  DIV {div.code}
                </span>
                <h3 className="font-black text-sm uppercase tracking-wide text-slate-950 mb-2">
                  {div.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {div.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stocked Lines Grid */}
        <div className="pt-8">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <span className="technical-mono text-[10px] font-bold text-sky-600 block mb-1">
                INVENTORY // AVAILABLE LINES
              </span>
              <h2 className="text-3xl font-black uppercase text-slate-950 tracking-tight">
                Stocked EGLIDER Collection ({egliderProducts.length})
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold uppercase tracking-wider text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              All Products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
            {egliderProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
