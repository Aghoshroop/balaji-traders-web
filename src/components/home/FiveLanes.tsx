'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function FiveLanes() {
  return (
    <section className="relative w-full bg-white overflow-hidden border-t border-slate-200">
      {/* Background soft ambient gradient on right edge */}
      <div className="absolute top-0 right-0 w-[30%] h-full bg-gradient-to-l from-sky-50/50 via-transparent to-transparent pointer-events-none z-0" />

      <div className="flex flex-col lg:flex-row min-h-0 lg:min-h-[850px] relative z-10">
        {/* ============================================================ */}
        {/* 1. LEFT PANEL: TRIANGULAR CHEVRON CUT WITH STREAMLINE DIVER  */}
        {/* ============================================================ */}
        <div className="hidden lg:block relative lg:w-[22%] xl:w-[20%] shrink-0 lg:min-h-full">
          <div
            className="w-full h-full relative overflow-hidden bg-slate-950"
            style={{
              clipPath: 'polygon(0 0, 82% 0, 100% 50%, 65% 100%, 0 100%)',
            }}
          >
            <Image
              src="/images/lane-swimmer-dive.jpg"
              alt="Olympic Swimmer diving in streamline position"
              fill
              className="object-cover object-[center_20%]"
              priority
            />
            {/* Contrast gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

            {/* Architectural Word Stack at bottom */}
            <div className="absolute bottom-8 left-7 sm:bottom-10 sm:left-9 z-20 text-white select-none">
              <div className="w-8 h-0.5 bg-sky-400 mb-3" />
              <div className="technical-mono text-[9px] sm:text-[10px] font-black tracking-[0.25em] leading-[1.8] text-white/95">
                PEOPLE<br />
                PRODUCTS<br />
                POSSIBILITIES<br />
                AROUND<br />
                THE WATER
              </div>
            </div>
          </div>

          {/* Triangular Cyan Border Line Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polyline
              points="82,0 100,50 65,100"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="1.2"
              className="drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]"
            />
          </svg>
        </div>

        {/* ============================================================ */}
        {/* 2. RIGHT PANEL: ART-DIRECTED 5-LANE ARCHITECTURE             */}
        {/* ============================================================ */}
        <div className="flex-1 bg-white flex flex-col justify-between py-6 sm:py-8 lg:py-12 px-4 sm:px-8 lg:px-10 xl:px-14 w-full min-w-0 max-w-full overflow-hidden">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-slate-200">
            <div>
              <span className="technical-mono text-[10px] font-bold text-slate-400 tracking-[0.25em] block mb-1 uppercase">
                CATALOGUE INTRODUCTION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight leading-none">
                <span className="text-slate-950">THE FIVE </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400">
                  LANES
                </span>
              </h2>
            </div>

            <div className="text-left sm:text-right max-w-sm">
              <span className="technical-mono text-[9px] font-bold text-slate-500 tracking-[0.2em] block uppercase mb-1">
                FIVE DEDICATED TRACKS
              </span>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Each lane represents a distinct product division in our Chennai warehouse, from racing suits to pool deck equipment.
              </p>
            </div>
          </div>

          {/* ========================================================== */}
          {/* THE FIVE DISTINCT LANE COMPOSITIONS (NOT A REPEATED TABLE) */}
          {/* ========================================================== */}
          <div className="divide-y divide-slate-200/90 flex-1">
            {/* -------------------------------------------------------- */}
            {/* LANE 01: MEN'S SWIMWEAR — HORIZONTAL SILHOUETTE TRAJECTORY */}
            {/* -------------------------------------------------------- */}
            <Link
              href="/categories/mens-swimwear"
              className="group block py-6 sm:py-7 px-2 sm:px-6 rounded-2xl hover:bg-sky-50/40 transition-colors w-full min-w-0 max-w-full overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full min-w-0">
                {/* Lane Info */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-0 lg:min-w-[240px]">
                  <span
                    className="text-5xl sm:text-6xl font-black tracking-tight font-sans select-none"
                    style={{
                      WebkitTextStroke: '1.5px #0284c7',
                      color: 'rgba(224, 242, 254, 0.4)',
                    }}
                  >
                    01
                  </span>
                  <div>
                    <span className="technical-mono text-[9px] font-bold text-sky-600 tracking-widest block uppercase">
                      LANE 01 // TRAJECTORY
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight group-hover:text-sky-600 transition-colors">
                      Men&apos;s Swimwear
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Racing Jammers · Training Briefs · Swim Shorts
                    </p>
                  </div>
                </div>

                {/* Composition: Silhouettes moving along the lane */}
                <div className="flex-1 flex items-center justify-start lg:justify-center gap-4 sm:gap-6 overflow-hidden py-1">
                  <div className="hidden xl:block w-16 h-0.5 bg-gradient-to-r from-sky-400 to-transparent" />
                  <div className="flex items-center gap-6 sm:gap-8">
                    <div className="w-20 h-24 sm:w-24 sm:h-28 relative group-hover:scale-105 transition-transform">
                      <Image
                        src="/images/products/real-product-1-1.jpeg"
                        alt="EGLIDER Racing Jammer"
                        fill
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                    <div className="w-16 h-20 sm:w-20 sm:h-24 relative opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      <Image
                        src="/images/products/real-product-5-1.jpeg"
                        alt="EGLIDER Training Brief"
                        fill
                        className="object-contain drop-shadow-sm"
                      />
                    </div>
                    <div className="w-16 h-20 sm:w-20 sm:h-24 relative opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                      <Image
                        src="/images/products/real-product-6-1.jpeg"
                        alt="Swim Shorts"
                        fill
                        className="object-contain drop-shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors hidden sm:block">
                    Explore Lane 01
                  </span>
                  <div className="w-9 h-9 rounded-full bg-slate-950 group-hover:bg-sky-600 text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* -------------------------------------------------------- */}
            {/* LANE 02: WOMEN'S SWIMWEAR — EDITORIAL IMAGE COMPOSITION  */}
            {/* -------------------------------------------------------- */}
            <Link
              href="/categories/womens-swimwear"
              className="group block py-6 sm:py-7 px-2 sm:px-6 rounded-2xl hover:bg-sky-50/40 transition-colors w-full min-w-0 max-w-full overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full min-w-0">
                {/* Lane Info */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-0 lg:min-w-[240px]">
                  <span
                    className="text-5xl sm:text-6xl font-black tracking-tight font-sans select-none"
                    style={{
                      WebkitTextStroke: '1.5px #0284c7',
                      color: 'rgba(224, 242, 254, 0.4)',
                    }}
                  >
                    02
                  </span>
                  <div>
                    <span className="technical-mono text-[9px] font-bold text-sky-600 tracking-widest block uppercase">
                      LANE 02 // EDITORIAL
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight group-hover:text-sky-600 transition-colors">
                      Women&apos;s Swimwear
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Racing Kneeskins · Training One-Piece · Swimming Costumes
                    </p>
                  </div>
                </div>

                {/* Composition: Editorial Duo Showcase */}
                <div className="flex-1 flex items-center justify-start lg:justify-center gap-6 sm:gap-10">
                  <div className="flex items-center gap-5 sm:gap-8 bg-slate-50/80 border border-slate-100 rounded-2xl px-5 py-3 group-hover:border-sky-200 transition-colors">
                    <div className="w-20 h-24 sm:w-24 sm:h-28 relative group-hover:scale-105 transition-transform">
                      <Image
                        src="/images/products/real-product-2-1.jpeg"
                        alt="Racing Kneeskin"
                        fill
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                    <div className="h-16 w-px bg-slate-200" />
                    <div className="w-20 h-24 sm:w-24 sm:h-28 relative group-hover:scale-105 transition-transform">
                      <Image
                        src="/images/products/real-product-7-1.jpeg"
                        alt="Training One-Piece"
                        fill
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors hidden sm:block">
                    Explore Lane 02
                  </span>
                  <div className="w-9 h-9 rounded-full bg-slate-950 group-hover:bg-sky-600 text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* -------------------------------------------------------- */}
            {/* LANE 03: KIDS' SWIMWEAR — PLAYFUL YET REFINED SCALE     */}
            {/* -------------------------------------------------------- */}
            <Link
              href="/categories/kids-swimwear"
              className="group block py-6 sm:py-7 px-2 sm:px-6 rounded-2xl hover:bg-sky-50/40 transition-colors w-full min-w-0 max-w-full overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full min-w-0">
                {/* Lane Info */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-0 lg:min-w-[240px]">
                  <span
                    className="text-5xl sm:text-6xl font-black tracking-tight font-sans select-none"
                    style={{
                      WebkitTextStroke: '1.5px #0284c7',
                      color: 'rgba(224, 242, 254, 0.4)',
                    }}
                  >
                    03
                  </span>
                  <div>
                    <span className="technical-mono text-[9px] font-bold text-sky-600 tracking-widest block uppercase">
                      LANE 03 // JUNIOR
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight group-hover:text-sky-600 transition-colors">
                      Kids&apos; Swimwear
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Boys Swim Trunks · Girls Competition Costumes
                    </p>
                  </div>
                </div>

                {/* Composition: Playful Asymmetric Scale */}
                <div className="flex-1 flex items-center justify-start lg:justify-center gap-6">
                  <div className="relative flex items-center gap-4">
                    <div className="w-18 h-22 sm:w-20 sm:h-26 relative group-hover:rotate-1 transition-transform">
                      <Image
                        src="/images/products/real-product-8-1.jpeg"
                        alt="Girls Competition Swimsuit"
                        fill
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                    <div className="w-16 h-20 sm:w-18 sm:h-22 relative -ml-2 group-hover:-rotate-2 transition-transform">
                      <Image
                        src="/images/products/real-product-9-1.jpeg"
                        alt="Boys Swim Trunk"
                        fill
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors hidden sm:block">
                    Explore Lane 03
                  </span>
                  <div className="w-9 h-9 rounded-full bg-slate-950 group-hover:bg-sky-600 text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* -------------------------------------------------------- */}
            {/* LANE 04: COMPETITION — TECHNICAL RACING COMPOSITION      */}
            {/* -------------------------------------------------------- */}
            <Link
              href="/categories/competition-swimwear"
              className="group block py-6 sm:py-7 px-2 sm:px-6 rounded-2xl hover:bg-sky-50/40 transition-colors w-full min-w-0 max-w-full overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full min-w-0">
                {/* Lane Info */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-0 lg:min-w-[240px]">
                  <span
                    className="text-5xl sm:text-6xl font-black tracking-tight font-sans select-none"
                    style={{
                      WebkitTextStroke: '1.5px #0284c7',
                      color: 'rgba(224, 242, 254, 0.4)',
                    }}
                  >
                    04
                  </span>
                  <div>
                    <span className="technical-mono text-[9px] font-bold text-sky-600 tracking-widest block uppercase">
                      LANE 04 // TECHNICAL
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight group-hover:text-sky-600 transition-colors">
                      Competition Swimwear
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Elite Racing Jammers · Anti-Fog Racing Optics
                    </p>
                  </div>
                </div>

                {/* Composition: High-Tech Speed Line Focus */}
                <div className="flex-1 flex items-center justify-start lg:justify-center gap-6">
                  <div className="flex items-center gap-6 bg-slate-950 text-white rounded-2xl px-6 py-3 border border-slate-800 group-hover:border-sky-500/50 transition-colors">
                    <div className="w-20 h-24 sm:w-24 sm:h-28 relative group-hover:scale-105 transition-transform">
                      <Image
                        src="/images/products/real-product-10-1.jpeg"
                        alt="Elite Racing Jammer"
                        fill
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 relative group-hover:scale-105 transition-transform">
                      <Image
                        src="/images/products/real-product-3-1.jpeg"
                        alt="Anti-Fog Racing Goggles"
                        fill
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors hidden sm:block">
                    Explore Lane 04
                  </span>
                  <div className="w-9 h-9 rounded-full bg-slate-950 group-hover:bg-sky-600 text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* -------------------------------------------------------- */}
            {/* LANE 05: ACCESSORIES — POOL-DECK EQUIPMENT LAYOUT        */}
            {/* -------------------------------------------------------- */}
            <Link
              href="/categories/swimming-accessories"
              className="group block py-6 sm:py-7 px-2 sm:px-6 rounded-2xl hover:bg-sky-50/40 transition-colors w-full min-w-0 max-w-full overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full min-w-0">
                {/* Lane Info */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-0 lg:min-w-[240px]">
                  <span
                    className="text-5xl sm:text-6xl font-black tracking-tight font-sans select-none"
                    style={{
                      WebkitTextStroke: '1.5px #0284c7',
                      color: 'rgba(224, 242, 254, 0.4)',
                    }}
                  >
                    05
                  </span>
                  <div>
                    <span className="technical-mono text-[9px] font-bold text-sky-600 tracking-widest block uppercase">
                      LANE 05 // POOL DECK
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight group-hover:text-sky-600 transition-colors">
                      Swimming Accessories
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Silicone Caps · Training Gear · Essential Equipment
                    </p>
                  </div>
                </div>

                {/* Composition: Multiple items arranged like deck equipment */}
                <div className="flex-1 flex items-center justify-start lg:justify-center gap-4 sm:gap-6 py-1">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border border-slate-200/80 p-1 relative flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Image
                      src="/images/products/real-product-4-1.jpeg"
                      alt="Silicone Cap"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border border-slate-200/80 p-1 relative flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Image
                      src="/images/products/real-product-11-1.jpeg"
                      alt="Competition Cap"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border border-slate-200/80 p-1 relative flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Image
                      src="/images/products/real-product-3-2.jpeg"
                      alt="Racing Optics"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors hidden sm:block">
                    Explore Lane 05
                  </span>
                  <div className="w-9 h-9 rounded-full bg-slate-950 group-hover:bg-sky-600 text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
