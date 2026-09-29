import React from 'react';
import { BUSINESS } from '@/lib/config';

const customerSegments = [
  {
    name: 'SPORTS RETAILERS',
    desc: 'Wholesale inventory and bulk swimwear lots for retail stores.',
  },
  {
    name: 'SWIMMING ACADEMIES',
    desc: 'Training swimwear and aquatic equipment for training batches.',
  },
  {
    name: 'COACHES & INSTRUCTORS',
    desc: 'Kickboards, hand paddles, silicone caps, and training aids.',
  },
  {
    name: 'COMPETITIVE SWIMMERS',
    desc: 'High-performance racing jammers, kneeskins, and anti-fog goggles.',
  },
  {
    name: 'SCHOOLS & INSTITUTIONS',
    desc: 'Student swim kits and equipment for campus pool facilities.',
  },
];

const workflow = [
  { step: '01', title: 'DISCOVER', desc: 'Browse our digital collection online.' },
  { step: '02', title: 'SELECT', desc: 'Identify models, sizes, and quantities.' },
  { step: '03', title: 'ENQUIRE', desc: 'Check availability via direct WhatsApp.' },
  { step: '04', title: 'DISCUSS BULK', desc: 'Receive wholesale rate quotes.' },
  { step: '05', title: 'DISPATCH', desc: 'Direct dispatch from Otteri warehouse.' },
];

export default function DistributionMap() {
  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* 1. PHYSICAL DISTRIBUTION ROUTE MAP (NOT A SAAS DASHBOARD)   */}
      {/* ============================================================ */}
      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl relative overflow-hidden mb-12">
        {/* Subtle architectural pool tile grid */}
        <div className="absolute inset-0 pool-tile-grid-dark opacity-30 pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-slate-800">
            <div>
              <span className="technical-mono text-[10px] text-sky-400 font-bold block mb-2 uppercase">
                DISTRIBUTION NETWORK
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
                Who We Serve
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-sm mt-3 sm:mt-0 font-medium leading-relaxed">
              Physical wholesale distribution radiating directly from our Otteri, Chennai facility to sports businesses and aquatic programs across the region.
            </p>
          </div>

          {/* Elegant Route Visualization (Hub & Radiating Routes) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Center Hub */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative">
              <span className="technical-mono text-[9px] font-bold text-sky-400 uppercase tracking-widest block mb-2">
                CENTRAL DISTRIBUTION HUB
              </span>
              <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mb-2">
                {BUSINESS.name}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">
                {BUSINESS.location.area}, {BUSINESS.location.city} · Established {BUSINESS.established}
              </p>

              <div className="space-y-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-0.5 bg-sky-400" />
                  <span>Wholesale distributor of EGLIDER swimwear</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-0.5 bg-sky-400" />
                  <span>Direct warehouse inventory in Otteri, Chennai</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-0.5 bg-sky-400" />
                  <span>Direct phone and WhatsApp stock verification</span>
                </div>
              </div>
            </div>

            {/* Distribution Routes to Customer Segments */}
            <div className="lg:col-span-7 space-y-3">
              {customerSegments.map((segment, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/50 hover:bg-slate-900 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="technical-mono text-xs font-bold text-sky-400 font-mono">
                      0{idx + 1}
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-white tracking-wide uppercase group-hover:text-sky-300 transition-colors">
                        {segment.name}
                      </h5>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {segment.desc}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="technical-mono text-[9px] font-bold text-slate-500 group-hover:text-sky-400 transition-colors uppercase">
                      DISTRIBUTION ROUTE →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. RESTRAINED PROCUREMENT PROTOCOL                           */}
      {/* ============================================================ */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="technical-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            WHOLESALE WORKFLOW
          </span>
          <span className="technical-mono text-[10px] text-sky-600 font-bold uppercase tracking-wider">
            FIVE STEPS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {workflow.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-white border border-slate-200/90 rounded-2xl shadow-2xs hover:border-slate-400 transition-colors"
            >
              <span className="technical-mono text-[10px] font-bold text-sky-600 block mb-2">
                STEP {item.step}
              </span>
              <h6 className="font-black text-slate-950 text-xs uppercase tracking-wider mb-1">
                {item.title}
              </h6>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
