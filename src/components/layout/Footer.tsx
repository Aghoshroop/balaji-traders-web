'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Phone, Mail, MapPin, ExternalLink, Play } from 'lucide-react';
import { BUSINESS, CONTACT } from '@/lib/config';
import { categories } from '@/data/categories';
import { getGeneralWhatsAppUrl, getPhoneUrl } from '@/lib/whatsapp';
import AquaticWaveRays from '@/components/ui/aquatic/AquaticWaveRays';

const quickLinks = [
  { href: '/products', label: 'All Products' },
  { href: '/brands/eglider', label: 'EGLIDER' },
  { href: '/about', label: 'About Us' },
  { href: '/why-balaji-traders', label: 'Why Balaji Traders' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 relative overflow-hidden">
      {/* Persistent aquatic wave rays & oceanic depth caustics */}
      <AquaticWaveRays theme="footer" intensity="subtle" showBubbles={true} />

      {/* ============================================================ */}
      {/* 1. MONUMENTAL BRAND MOMENT AT BASE                           */}
      {/* ============================================================ */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 pb-12 border-b border-slate-800/80 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <Image
                src="/logo-white.png"
                alt={BUSINESS.name}
                width={80}
                height={80}
                className="h-10 sm:h-14 w-auto object-contain"
              />
              <span className="technical-mono text-xs font-bold text-sky-400 uppercase tracking-[0.25em]">
                DISTRIBUTOR & WHOLESALER
              </span>
            </div>
            <h2 className="text-3xl min-[360px]:text-4xl min-[480px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight leading-none text-slate-100 select-none break-words">
              BALAJI<br />TRADERS
            </h2>
          </div>

          <div className="text-left lg:text-right max-w-sm">
            <span className="technical-mono text-xs text-sky-400 font-bold block mb-1">
              EST. {BUSINESS.established} · OTTERI, CHENNAI
            </span>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Specialist swimwear and aquatic sports distributor. Supplying EGLIDER performance racing apparel, accessories, and training gear.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. MINIMAL PRACTICAL FOOTER NAVIGATION                       */}
      {/* ============================================================ */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Categories */}
          <div>
            <span className="technical-mono text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
              Product Categories
            </span>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-xs sm:text-sm text-slate-300 hover:text-sky-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <span className="technical-mono text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
              Showroom Index
            </span>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-300 hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Warehouse & Facility */}
          <div className="lg:col-span-2">
            <span className="technical-mono text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
              Otteri Distribution Desk
            </span>
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <p>{BUSINESS.location.fullAddress}</p>
                  <a
                    href={CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-400 hover:underline inline-flex items-center gap-1 mt-1 font-semibold"
                  >
                    View on Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
                <div>
                  <div className="flex flex-wrap items-center gap-x-2">
                    <a href={getPhoneUrl()} className="hover:text-white font-medium transition-colors">
                      {CONTACT.phone}
                    </a>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Wholesale & Order Desk</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#25d366] shrink-0" />
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25d366] font-medium transition-colors"
                >
                  WhatsApp: {CONTACT.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </div>

              {/* GSTIN Verification Badge */}
              <div className="pt-2 text-xs text-slate-400 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="technical-mono text-[10px] text-sky-400 font-bold bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/60">
                  GSTIN
                </span>
                <span className="font-mono text-slate-300 font-semibold">{BUSINESS.gstin}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400 text-[11px]">TN ({BUSINESS.stateCode})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. DISCREET COPYRIGHT BASELINE                               */}
      {/* ============================================================ */}
      <div className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xs py-6 relative z-10">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {BUSINESS.name}. Established {BUSINESS.established} in Otteri, Chennai. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('replay-splash'));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              type="button"
              className="hover:text-sky-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400"
            >
              <Play className="w-3 h-3 text-sky-400 fill-sky-400" />
              <span>Watch Intro</span>
            </button>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">
              Sitemap
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Contact Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
