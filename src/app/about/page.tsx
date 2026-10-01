import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, ArrowRight, Phone } from 'lucide-react';
import { BUSINESS, CONTACT, BRANDS } from '@/lib/config';
import { getAllProducts } from '@/data/products';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PoolLaneSpine from '@/components/ui/aquatic/PoolLaneSpine';
import { getGeneralWhatsAppUrl, getPhoneUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'About Balaji Traders — Established 2001 in Chennai',
  description: `Wholesale swimwear distribution since 2001. Supplying swimming costumes, racing wear, and swimming accessories from Otteri, Chennai, Tamil Nadu.`,
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const products = await getAllProducts();
  return (
    <div className="min-h-screen bg-[#ffffff] pt-20">
      {/* Top Breadcrumb */}
      <div className="border-b border-slate-200/80 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: 'About' }]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* ================================================================ */}
        {/* MONUMENTAL 2001 HERITAGE ANCHOR                                  */}
        {/* ================================================================ */}
        <div className="mb-20">
          <span className="technical-mono text-xs font-bold text-sky-600 block mb-2">
            HERITAGE ARCHIVE // FOUNDING ANCHOR
          </span>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-6">
              <span className="text-6xl min-[400px]:text-7xl sm:text-9xl lg:text-[12rem] font-black text-slate-100 tracking-tighter leading-none block font-mono select-none">
                2001
              </span>
              <div className="mt-[-1.5rem] sm:mt-[-2rem] relative z-10">
                <span className="technical-mono text-sm font-black text-slate-900 block">
                  ESTABLISHED · OTTERI, CHENNAI
                </span>
                <span className="technical-mono text-xs text-slate-500 block">
                  TAMIL NADU, INDIA
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 pb-4">
              <span className="technical-mono text-xs text-sky-600 font-bold block mb-1">
                TODAY // THE DISTRIBUTION MISSION
              </span>
              <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight mb-4 break-words">
                Two Decades in Swimwear Distribution
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {BUSINESS.name} was founded in {BUSINESS.established} in Otteri, Chennai. For over two decades, we have continuously operated as a specialist distributor and wholesaler of swimming apparel and aquatic gear.
              </p>
            </div>
          </div>
        </div>

        <PoolLaneSpine distance="2001 · CHENNAI FOUNDATION" label="HERITAGE TIMELINE" />

        {/* ================================================================ */}
        {/* VERIFIED OPERATIONAL ATTRIBUTES                                  */}
        {/* ================================================================ */}
        <div className="grid md:grid-cols-3 gap-6 my-16">
          <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <span className="technical-mono text-xs font-bold text-sky-600 block mb-2">
              01 // CORE SECTOR
            </span>
            <h3 className="font-black text-lg text-slate-950 uppercase mb-2">
              Wholesale Swimwear
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Direct inventory supply for retail sports shops, swimming academies, coaches, and institutional campuses.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <span className="technical-mono text-xs font-bold text-sky-600 block mb-2">
              02 // PRIMARY BRAND
            </span>
            <h3 className="font-black text-lg text-slate-950 uppercase mb-2">
              EGLIDER Distribution
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Direct distribution of EGLIDER racing suits, training swimwear, goggles, and 100% silicone caps.
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <span className="technical-mono text-xs font-bold text-sky-600 block mb-2">
              03 // WAREHOUSE SCALE
            </span>
            <h3 className="font-black text-lg text-slate-950 uppercase mb-2">
              {products.length} Verified Lines
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Catalogued models across men&apos;s, women&apos;s, kids&apos;, competition racing, and training gear.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-2xl font-black uppercase text-slate-950 tracking-tight mb-4">
            How We Distribute
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            <p>
              We operate an open, transparent B2B supply room. Potential customers can browse models, check available sizes, inspect specifications, and verify pricing prior to ordering.
            </p>
            <p>
              Rather than forcing buyers through generic online checkout systems, we connect directly on WhatsApp and phone. This ensures immediate confirmation of shelf stock, carton size breakdown, and delivery schedules tailored to your volume.
            </p>
          </div>
        </div>

        {/* Closing Action Bar */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl">
          <span className="technical-mono text-xs text-sky-400 font-bold block mb-2">
            DIRECT WHOLESALE CONNECT
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">
            Source from Balaji Traders
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-8 font-normal">
            Contact our Otteri, Chennai warehouse desk directly for product rate sheets and bulk dispatch details.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-white rounded-xl hover:bg-slate-100 transition-colors"
            >
              Explore Collection ({products.length})
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider whatsapp-btn rounded-xl shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Desk
            </a>
            <a
              href={getPhoneUrl()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
