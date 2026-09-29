'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/config';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function HeroScene() {
  return (
    <section className="relative w-full bg-transparent overflow-hidden pt-16 min-[400px]:pt-20 sm:pt-24 lg:pt-24 border-b border-slate-200/80">
      {/* 1. BACKGROUND: HIGH-DEFINITION SWIMMING VIDEO + ARCHITECTURAL CUT */}
      {/* ============================================================ */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
        {/* Widescreen swimming video occupying the dominant right side */}
        <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-[center_35%]"
          >
            <source src="/videos/swimming.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dynamic Angled Polygon Mask separating typography from swimming video */}
        <div className="hidden lg:block absolute inset-0 w-full h-full">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="heroCyanStripe" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Cyan lane trace stripe */}
            <polygon
              points="0,0 505,0 575,250 565,600 0,600"
              fill="url(#heroCyanStripe)"
            />

            {/* Crisp pure white architectural backdrop */}
            <polygon
              points="0,0 480,0 555,250 545,600 0,600"
              fill="#f0f9ff"
            />

            {/* Razor-thin electric pool lane guide line */}
            <polyline
              points="480,0 555,250 545,600"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Mobile Backdrop: Reduced translucent aquatic wash letting the swimming video shine through clearly */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-white/45 via-white/20 to-white/40 z-10" />
      </div>

      {/* ============================================================ */}
      {/* 2. CAMPAIGN-LEVEL EDITORIAL CONTENT                         */}
      {/* ============================================================ */}
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-12 relative z-20 min-h-0 lg:min-h-[640px] xl:min-h-[680px] flex items-center">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full py-6 sm:py-8 lg:py-14">
          {/* Left Column: Monumental Architectural Typography */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center max-w-2xl">
            {/* Discreet Brand Identity Topline */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-600 mb-6 text-[11px] sm:text-xs">
              <span className="w-6 sm:w-8 h-0.5 bg-sky-500 rounded-full" />
              <span className="technical-mono font-bold text-slate-950 tracking-[0.2em] uppercase">
                BALAJI TRADERS
              </span>
              <span className="text-slate-400">/</span>
              <span className="technical-mono font-semibold text-slate-700 tracking-wider">
                EST. {BUSINESS.established} · OTTERI, CHENNAI
              </span>
            </div>

            {/* Monumental Headline: SWIM. and transparent SUPPLY. */}
            <div className="mb-6">
              <h1 className="text-5xl min-[380px]:text-6xl sm:text-8xl md:text-9xl xl:text-[9.5rem] font-black tracking-tight leading-[0.84] uppercase select-none text-slate-950 break-words">
                SWIM.
              </h1>

              {/* SUPPLY. with transparent cutout showing the active swimming video inside the letters */}
              <div className="w-full max-w-[640px] sm:max-w-[720px] -mt-1 sm:-mt-3">
                <svg
                  viewBox="0 0 650 135"
                  className="w-full h-auto block select-none"
                  preserveAspectRatio="xMinYMid meet"
                >
                  <defs>
                    <mask id="heroSupplyVideoMask">
                      <rect width="100%" height="100%" fill="black" />
                      <text
                        x="2"
                        y="110"
                        fill="white"
                        fontSize="125"
                        fontWeight="900"
                        letterSpacing="-4"
                        fontFamily="system-ui, -apple-system, sans-serif"
                      >
                        SUPPLY.
                      </text>
                    </mask>
                  </defs>

                  {/* Swimming video playing through the transparent letters */}
                  <foreignObject x="0" y="0" width="650" height="135" mask="url(#heroSupplyVideoMask)">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-center"
                      src="/videos/swimming.mp4"
                    />
                  </foreignObject>

                  {/* Crisp cyan outline to give the transparent letters electric definition */}
                  <text
                    x="2"
                    y="110"
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="2.5"
                    fontSize="125"
                    fontWeight="900"
                    letterSpacing="-4"
                    fontFamily="system-ui, -apple-system, sans-serif"
                  >
                    SUPPLY.
                  </text>
                </svg>
              </div>
            </div>

            {/* Restrained Factual Supporting Copy */}
            <p className="text-xs min-[400px]:text-sm sm:text-base lg:text-lg text-slate-950 font-semibold max-w-lg mb-6 sm:mb-8 leading-relaxed p-3.5 sm:p-0 rounded-2xl bg-white/75 sm:bg-transparent backdrop-blur-xs border border-white/80 sm:border-0 shadow-xs sm:shadow-none">
              Wholesale distributor of performance swimwear, racing apparel, and aquatic equipment based in Otteri, Chennai. Supplying verified gear directly to retailers, swim coaches, and academies.
            </p>

            {/* Decisive Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-lg">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest text-white bg-slate-950 hover:bg-slate-800 transition-all shadow-md group shrink-0"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest text-white bg-[#22c55e] hover:bg-[#16a34a] transition-all shadow-md shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP DESK</span>
              </a>
            </div>

            {/* Warehouse Dispatch & Brand Assurance Bar */}
            <div className="w-full max-w-[460px] sm:max-w-lg lg:max-w-xl pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-300/80">
              <div className="flex flex-wrap items-center gap-2 sm:gap-x-6 sm:gap-y-2.5 technical-mono text-[10px] sm:text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/75 sm:bg-transparent backdrop-blur-xs sm:p-0 border border-white/80 sm:border-0 shadow-2xs sm:shadow-none whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Direct EGLIDER Distribution</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/75 sm:bg-transparent backdrop-blur-xs sm:p-0 border border-white/80 sm:border-0 shadow-2xs sm:shadow-none whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                  <span>Otteri Wholesale Depot</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/75 sm:bg-transparent backdrop-blur-xs sm:p-0 border border-white/80 sm:border-0 shadow-2xs sm:shadow-none whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0" />
                  <span>Same-Day Stock Verification</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Cinematic Opening for the Swimming Video */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
