import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Phone, ChevronRight } from 'lucide-react';
import { BUSINESS, CONTACT } from '@/lib/config';
import { getGeneralWhatsAppUrl, getPhoneUrl } from '@/lib/whatsapp';
import HeroScene from '@/components/home/HeroScene';
import CategoryDivisions from '@/components/home/CategoryDivisions';
import SupplyArchive from '@/components/home/SupplyArchive';
import DistributionMap from '@/components/home/DistributionMap';
import AquaticWaveRays from '@/components/ui/aquatic/AquaticWaveRays';
import { getFAQSchema } from '@/lib/schema';

export const dynamic = 'force-dynamic';

const homeFaqs = [
  {
    question: 'Where is Balaji Traders located?',
    answer: `Balaji Traders is located in ${BUSINESS.location.area}, ${BUSINESS.location.city}, ${BUSINESS.location.state}. We have operated as a swimwear distributor from this location since ${BUSINESS.established}.`,
  },
  {
    question: 'What brands does Balaji Traders distribute?',
    answer: 'We distribute EGLIDER swimwear, which includes racing jammers, training suits, girls competition swimsuits, goggles, and silicone caps. We also supply select swimming equipment and accessories.',
  },
  {
    question: 'How do I check wholesale pricing and bulk availability?',
    answer: 'Simply tap the WhatsApp Enquiry button on any product page, or contact us directly via phone. We verify current warehouse stock and provide wholesale rate quotes immediately during business hours.',
  },
  {
    question: 'Can I purchase swimwear in bulk for a swimming academy or sports store?',
    answer: 'Yes. As a dedicated wholesale distributor, our primary service is supplying sports retailers, academies, clubs, and schools with bulk lots and team sets.',
  },
  {
    question: 'What types of swimwear and accessories are stocked?',
    answer: "Our stock includes men's racing jammers and briefs, women's racing suits and one-piece costumes, kids' swim trunks and suits, racing goggles, silicone caps, kickboards, hand paddles, and life jackets.",
  },
];

import { getAllProducts } from '@/data/products';

export default async function HomePage() {
  const products = await getAllProducts();
  return (
    <>
      {/* Structured Data for FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(homeFaqs)) }}
      />

      {/* ================================================================ */}
      {/* SCENE 01 — HERO: CAMPAIGN-LEVEL VIDEO & MONUMENTAL SWIM. SUPPLY. */}
      {/* ================================================================ */}
      <HeroScene />

      {/* ================================================================ */}
      {/* SCENE 02 — SPECIALIST WHOLESALE DIVISIONS (BENTO SHOWROOM)       */}
      {/* ================================================================ */}
      <CategoryDivisions products={products} />

      {/* ================================================================ */}
      {/* SCENE 03 — THE SUPPLY ARCHIVE: SIGNATURE SHOWROOM EXPERIENCE     */}
      {/* ================================================================ */}
      <SupplyArchive products={products} />

      {/* ================================================================ */}
      {/* SCENE 04 — THE BRAND ROOM: EGLIDER TAKEOVER                      */}
      {/* ================================================================ */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-950 text-white relative overflow-hidden">
        {/* High-end animated aquatic wave rays, volumetric sunlight shafts & caustics */}
        <AquaticWaveRays />

        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Brand Takeover Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 sm:pb-8 mb-8 sm:mb-12 border-b border-slate-800">
            <div>
              <span className="technical-mono text-xs font-bold text-sky-400 block mb-3 uppercase tracking-[0.25em]">
                BRAND TAKEOVER
              </span>
              <h2 className="text-4xl min-[400px]:text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight leading-[0.9] sm:leading-[0.85] break-words">
                EGLIDER.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400">
                  BUILT FOR WATER.
                </span>
              </h2>
            </div>
            <div className="mt-6 sm:mt-0 text-left sm:text-right">
              <span className="technical-mono text-xs text-slate-400 block font-bold">MANUFACTURER</span>
              <span className="text-sm font-bold text-white">GLIDER ENTERPRISE · WEST BENGAL</span>
              <span className="technical-mono text-[10px] text-sky-400 block mt-1">DISTRIBUTED IN CHENNAI BY BALAJI TRADERS</span>
            </div>
          </div>

          {/* Advertisement Showcase Layout (One Dominant Product + Secondary Visual References) */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center mb-8 sm:mb-12">
            {/* The Dominant Hero Product (7 cols) */}
            <div className="lg:col-span-7 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 hover:border-sky-500/50 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden transition-all group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="technical-mono text-xs font-bold text-sky-400 uppercase tracking-widest">
                    FLAGSHIP PERFORMANCE // RACING JAMMER
                  </span>
                </div>
                <span className="technical-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  VERIFIED DESIGN · EGL-MRJ-001
                </span>
              </div>

              {/* Massive Stage: Floating High-Tech Aquatic Arena */}
              <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 border border-slate-800/90 flex items-center justify-center p-6 sm:p-8 relative overflow-hidden mb-8 shadow-inner">
                {/* Ambient Center Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.2),transparent_70%)] pointer-events-none" />
                
                {/* Luminous Pedestal Reflection */}
                <div className="absolute bottom-6 w-48 sm:w-72 h-8 rounded-full bg-sky-500/25 blur-2xl pointer-events-none" />
                <div className="absolute bottom-8 w-32 sm:w-48 h-3 rounded-full bg-cyan-300/30 blur-md pointer-events-none" />

                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 z-10 flex items-center justify-center product-float">
                  <Image
                    src="/images/products/real-product-1-1.jpeg"
                    alt="EGLIDER Pro Racing Jammer"
                    fill
                    className="object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    EGLIDER Pro Racing Jammer
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md">
                    Knee-length racing suit engineered for competitive training and meet days.
                  </p>
                </div>
                <Link
                  href="/products/eglider-mens-racing-jammer-black"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors shrink-0 shadow-md"
                >
                  <span>View Model</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Secondary Visual References (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Secondary Item 1: Women's Racing Kneeskin */}
              <Link
                href="/products/eglider-womens-racing-kneeskin"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-sky-500/50 hover:bg-slate-900 transition-all duration-300 shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-2 flex items-center justify-center shrink-0 relative overflow-hidden group-hover:border-sky-500/50 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15),transparent_70%)] pointer-events-none" />
                    <Image
                      src="/images/products/real-product-2-1.jpeg"
                      alt="EGLIDER Racing Kneeskin"
                      width={52}
                      height={52}
                      className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-300 relative z-10"
                    />
                  </div>
                  <div>
                    <span className="technical-mono text-[9px] text-sky-400 uppercase tracking-widest block font-bold">
                      WOMEN&apos;S RACING
                    </span>
                    <h4 className="text-sm font-black text-white uppercase group-hover:text-sky-300 transition-colors mt-0.5">
                      Racing Kneeskin
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Racerback kneeskin cut for competitive events
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0 ml-2" />
              </Link>

              {/* Secondary Item 2: Anti-Fog Racing Goggles */}
              <Link
                href="/products/eglider-anti-fog-racing-goggles"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-sky-500/50 hover:bg-slate-900 transition-all duration-300 shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-2 flex items-center justify-center shrink-0 relative overflow-hidden group-hover:border-sky-500/50 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15),transparent_70%)] pointer-events-none" />
                    <Image
                      src="/images/products/real-product-3-1.jpeg"
                      alt="EGLIDER Anti-Fog Racing Goggles"
                      width={52}
                      height={52}
                      className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-300 relative z-10"
                    />
                  </div>
                  <div>
                    <span className="technical-mono text-[9px] text-sky-400 uppercase tracking-widest block font-bold">
                      OPTICAL GEAR
                    </span>
                    <h4 className="text-sm font-black text-white uppercase group-hover:text-sky-300 transition-colors mt-0.5">
                      Anti-Fog Racing Goggles
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Streamlined low-profile racing optics
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0 ml-2" />
              </Link>

              {/* Secondary Item 3: Silicone Swim Cap */}
              <Link
                href="/products/eglider-silicone-swim-cap"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-sky-500/50 hover:bg-slate-900 transition-all duration-300 shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 p-2 flex items-center justify-center shrink-0 relative overflow-hidden group-hover:border-sky-500/50 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15),transparent_70%)] pointer-events-none" />
                    <Image
                      src="/images/products/real-product-4-1.jpeg"
                      alt="EGLIDER Silicone Swim Cap"
                      width={52}
                      height={52}
                      className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-300 relative z-10"
                    />
                  </div>
                  <div>
                    <span className="technical-mono text-[9px] text-sky-400 uppercase tracking-widest block font-bold">
                      HEADWEAR
                    </span>
                    <h4 className="text-sm font-black text-white uppercase group-hover:text-sky-300 transition-colors mt-0.5">
                      Silicone Swim Cap
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      100% silicone caps in multiple team colors
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0 ml-2" />
              </Link>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/brands/eglider"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 rounded-full transition-colors"
            >
              <span>Explore EGLIDER Brand Room</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-full shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Wholesale EGLIDER Enquiry</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SCENE 05 — DISTRIBUTION NETWORK: ELEGANT PHYSICAL ROUTE MAP      */}
      {/* ================================================================ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-transparent border-y border-slate-200/80">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12">
          <DistributionMap />
        </div>
      </section>

      {/* ================================================================ */}
      {/* SCENE 06 — 2001 HERITAGE: MONUMENTAL ARCHITECTURAL TYPOGRAPHY    */}
      {/* ================================================================ */}
      <section className="py-12 sm:py-16 lg:py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Monumental Year Display (6 cols) */}
            <div className="lg:col-span-6">
              <span className="text-6xl min-[400px]:text-7xl sm:text-9xl lg:text-[11rem] xl:text-[13rem] font-black text-slate-100 tracking-tighter block font-mono leading-none select-none">
                2001
              </span>
            </div>

            {/* Factual Story (6 cols) */}
            <div className="lg:col-span-6">
              <span className="technical-mono text-xs font-bold text-sky-600 block mb-3 uppercase tracking-widest">
                ESTABLISHED IN OTTERI, CHENNAI · 2001
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 uppercase tracking-tight mb-6 leading-tight">
                Specialist Swimwear & Aquatic Supply
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 font-normal">
                {BUSINESS.name} was founded in {BUSINESS.established} in Otteri, Chennai as a distributor and wholesaler of swimming apparel.
                We supply sports retailers, coaching academies, and competitive athletes with authentic swimwear, racing jammers, and swimming accessories.
              </p>
              <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-8 text-xs technical-mono text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px]">LOCATION</span>
                  <span className="font-bold text-slate-900">OTTERI, CHENNAI</span>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <span className="text-slate-400 block text-[10px]">CORE SECTOR</span>
                  <span className="font-bold text-slate-900">SWIMWEAR WHOLESALE</span>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <span className="text-slate-400 block text-[10px]">PRIMARY BRAND</span>
                  <span className="font-bold text-slate-900">EGLIDER DISTRIBUTOR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SCENE 07 — FINAL CTA: TOUCHPAD / FINISH LINE                     */}
      {/* ================================================================ */}
      <section className="bg-slate-950 text-white pt-14 sm:pt-20 pb-12 sm:pb-16 relative overflow-hidden border-t border-slate-800">
        {/* Animated aquatic wave rays, water caustics & floating particles */}
        <AquaticWaveRays theme="dark" intensity="vibrant" />

        {/* The Pool Lane Touchpad indicator line connecting the experience */}
        <div className="w-full h-1 bg-gradient-to-r from-sky-500 via-emerald-400 to-sky-500 mb-8 sm:mb-12 opacity-80 relative z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Closing Statement */}
          <div className="text-center pb-10 sm:pb-14 border-b border-slate-800">
            <span className="technical-mono text-xs text-sky-400 font-bold block mb-4 tracking-[0.25em] uppercase">
              CHENNAI WHOLESALE DESK
            </span>
            <h2 className="text-3xl min-[400px]:text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] sm:leading-[0.9] mb-6 break-words">
              FOUND YOUR LANE?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400">
                LET&apos;S TALK.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed font-normal">
              Whether you require retail inventory, academy training gear, or competitive swim apparel, our Chennai wholesale desk is available directly on WhatsApp and phone.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Balaji Traders</span>
              </a>
              <a
                href={getPhoneUrl()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call Desk: {CONTACT.phone}</span>
              </a>
            </div>
          </div>

          {/* Factual FAQ Section */}
          <div className="pt-16">
            <div className="text-center mb-10">
              <span className="technical-mono text-xs text-slate-400 font-bold block mb-1 uppercase tracking-wider">
                REFERENCE ARCHIVE
              </span>
              <h3 className="text-2xl font-black uppercase tracking-wider">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-3">
              {homeFaqs.map((faq, i) => (
                <details key={i} className="group border border-slate-800 bg-slate-900/60 rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none font-bold text-sm text-white hover:text-sky-400 transition-colors">
                    <span className="pr-4">{faq.question}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/80 mt-1 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
