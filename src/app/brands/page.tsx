import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { BRANDS } from '@/lib/config';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Brands We Distribute — EGLIDER Official Partner',
  description: 'Balaji Traders is the authorized distributor of EGLIDER professional swimwear and reseller of Speedo aquatic gear in Chennai.',
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'Brands' }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">Our Brand Portfolio</h1>
          <p className="text-slate-600 mt-2 text-sm max-w-2xl">The professional swimwear and swimming gear brands we distribute, wholesale, and supply across India.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 gap-8">
          {/* EGLIDER — Primary */}
          <Link
            href="/brands/eglider"
            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover-glow transition-all shadow-sm"
          >
            <div className="aspect-video bg-gradient-to-br from-sky-50 via-cyan-50/50 to-blue-100/60 flex items-center justify-center relative border-b border-slate-100">
              <div className="text-center">
                <div className="text-5xl font-black text-gradient-cyan tracking-wider">EGLIDER</div>
                <p className="text-xs font-bold text-sky-800 mt-2 uppercase tracking-[0.25em]">Command the Water</p>
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-sky-600 text-white rounded-full shadow-xs">
                  {BRANDS.primary.relationship}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2">
                EGLIDER
              </h2>
              <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">{BRANDS.primary.description}</p>
              <span className="text-sm font-bold text-sky-600 flex items-center gap-2 group-hover:gap-3 transition-all">
                View EGLIDER Range <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Other brands */}
          {BRANDS.secondary.map((brand, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-video bg-slate-100 flex items-center justify-center relative border-b border-slate-100">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-400 tracking-wide">{brand.name}</div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-slate-200 text-slate-700 rounded-full">
                    {brand.relationship}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2">{brand.name}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{brand.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
