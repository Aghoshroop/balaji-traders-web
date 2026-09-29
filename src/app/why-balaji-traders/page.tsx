import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS, CONTACT } from '@/lib/config';
import { getGeneralWhatsAppUrl, getPhoneUrl } from '@/lib/whatsapp';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: `Why Choose ${BUSINESS.name} — Swimwear Distribution`,
  description: `Wholesale swimwear distribution in Chennai. Browse current stock, check availability on WhatsApp, and discuss bulk orders directly with Balaji Traders.`,
};

const customerFlow = [
  {
    step: '01',
    title: 'SEE THE RANGE',
    desc: 'Browse our complete catalog online before contacting. Check images, specifications, available sizes, and colorways with full transparency.',
  },
  {
    step: '02',
    title: 'CHOOSE PRODUCTS',
    desc: 'Select the models required for your retail inventory, coaching squads, or swimming club batches.',
  },
  {
    step: '03',
    title: 'ASK ABOUT STOCK',
    desc: 'Initiate a direct WhatsApp enquiry from any product page. We verify real-time shelf stock at our Otteri, Chennai facility.',
  },
  {
    step: '04',
    title: 'DISCUSS BULK REQUIREMENTS',
    desc: 'Receive transparent wholesale lot pricing and quantity discount tiers tailored to your academy or retail volume.',
  },
  {
    step: '05',
    title: 'CONNECT DIRECTLY',
    desc: 'Deal directly with our Chennai sales desk. No automated tickets or call queues — just straightforward distribution service.',
  },
];

const capabilities = [
  {
    title: 'Distributor of EGLIDER',
    desc: 'Direct distribution of EGLIDER racing suits, training swimwear, goggles, and silicone caps manufactured by Glider Enterprise.',
  },
  {
    title: 'Established in 2001',
    desc: 'Over two decades operating from Otteri, Chennai, supplying swimming apparel and accessories.',
  },
  {
    title: 'Wholesale & Bulk Orders',
    desc: 'Built specifically for volume orders from retail sports shops, swimming academies, clubs, and schools.',
  },
  {
    title: 'Comprehensive Range',
    desc: 'From racing jammers to kickboards, goggles, caps, and safety jackets — everything for the pool from one distributor.',
  },
];

export default function WhyBalajiTradersPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs items={[{ label: `Why ${BUSINESS.name}` }]} />
          <div className="max-w-3xl mt-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-sky-600 mb-2">
              The Distributor Difference
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight uppercase">
              Why Choose {BUSINESS.name}
            </h1>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              We focus on what commercial and institutional buyers actually need: ready stock, verified models, direct human communication, and reliable wholesale distribution.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Customer Experience Flow */}
        <div className="mb-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-600 mb-2">
            The Procurement Flow
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-8">
            How You Work With Us
          </h2>

          <div className="space-y-4">
            {customerFlow.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 shadow-2xs"
              >
                <span className="text-3xl font-black font-mono text-slate-300 shrink-0">
                  {item.step}
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distributor Capabilities */}
        <div className="mb-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-600 mb-2">
            Factual Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-8">
            Distribution Operations
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {cap.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Action */}
        <div className="bg-slate-950 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-3">
            Ready to Check Stock?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-8 max-w-md mx-auto">
            Explore our collection online or initiate an immediate WhatsApp enquiry with our Chennai warehouse desk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-white rounded-xl hover:bg-slate-100 transition-colors"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider whatsapp-btn rounded-xl shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Enquiry
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
