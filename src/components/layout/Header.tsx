'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, ChevronRight, Sparkles } from 'lucide-react';
import { BUSINESS } from '@/lib/config';
import { getGeneralWhatsAppUrl, getPhoneUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick, trackCallClick } from '@/lib/analytics';

const navLinks = [
  { href: '/products', label: 'Products', badge: 'Wholesale' },
  { href: '/categories', label: 'Categories', badge: '4 Lines' },
  { href: '/brands/eglider', label: 'EGLIDER', badge: 'Brand' },
  { href: '/about', label: 'About', badge: 'Est. 2001' },
  { href: '/why-balaji-traders', label: 'Why Us', badge: 'Chennai' },
  { href: '/contact', label: 'Contact', badge: 'Direct' },
];

const quickCategories = [
  { label: 'Racing Jammers', href: '/categories/racing-jammers' },
  { label: "Women's Racing", href: '/categories/womens-racing' },
  { label: 'Optical Goggles', href: '/categories/swimming-goggles' },
  { label: 'Silicone Caps', href: '/categories/swimming-caps' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll detection for sticky navigation styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when sidebar drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close sidebar on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Auto-close sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-1.5'
            : 'bg-transparent border-b border-transparent py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-16 sm:min-h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0 group focus:outline-hidden py-1 max-w-[60vw] sm:max-w-none"
              aria-label={BUSINESS.name}
            >
              <Image
                src="/logo.png"
                alt={BUSINESS.name}
                width={180}
                height={180}
                className={`w-auto object-contain group-hover:scale-105 transition-all duration-300 ${
                  isScrolled
                    ? 'h-11 sm:h-14 lg:h-16'
                    : 'h-13 min-[400px]:h-14 sm:h-18 lg:h-22'
                }`}
                priority
              />
            </Link>

            {/* Desktop Navigation (Available on landscape / desktop viewports) */}
            <nav className="hidden lg:flex portrait-hide-desktop-nav items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs font-bold transition-colors uppercase tracking-wider rounded-lg ${
                      isActive
                        ? 'text-sky-600 bg-sky-50/80'
                        : 'text-slate-700 hover:text-sky-600 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex portrait-hide-desktop-nav items-center gap-2.5">
              <a
                href={getPhoneUrl()}
                onClick={() => trackCallClick('header')}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 border border-slate-300 rounded-full hover:bg-slate-50 transition-colors uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>Call</span>
              </a>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('header')}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-full shadow-xs uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Portrait Screen & Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden portrait-show-sidebar-toggle p-2 sm:p-2.5 text-slate-800 hover:text-slate-950 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all shadow-2xs"
              aria-label={mobileMenuOpen ? 'Close navigation sidebar' : 'Open navigation sidebar'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MOBILE & PORTRAIT NAVIGATION SIDEBAR DRAWER                  */}
      {/* Arrives smoothly with hardware-accelerated cubic-bezier ease */}
      {/* ============================================================ */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 ${
          mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none delay-300'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* 1. Frosted Dark Dim Backdrop Overlay */}
        <div
          className={`fixed inset-0 bg-slate-950/65 backdrop-blur-sm sidebar-backdrop-transition ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation sidebar backdrop"
        />

        {/* 2. Sliding Sidebar Drawer Panel */}
        <aside
          className={`fixed top-0 right-0 bottom-0 w-[88vw] max-w-[380px] sm:max-w-md h-full bg-white text-slate-900 shadow-[-16px_0_50px_rgba(0,0,0,0.3)] flex flex-col justify-between overflow-y-auto sidebar-drawer-transition z-10 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top Brand & Dismiss Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10 backdrop-blur-xs">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 focus:outline-hidden"
              aria-label={BUSINESS.name}
            >
              <Image
                src="/logo.png"
                alt={BUSINESS.name}
                width={120}
                height={120}
                className="h-10 sm:h-11 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="technical-mono text-[9px] font-bold text-sky-600 uppercase tracking-widest leading-none">
                  DISTRIBUTOR
                </span>
                <span className="text-xs font-black uppercase text-slate-950 tracking-tight leading-tight mt-0.5">
                  BALAJI TRADERS
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 sm:p-2.5 rounded-full text-slate-500 hover:text-slate-950 hover:bg-slate-200/70 border border-slate-200 transition-all focus:outline-hidden active:scale-95"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Warehouse Logistics Status Chip */}
          <div className="px-5 sm:px-6 pt-3 pb-1">
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-sky-50/80 border border-sky-200/80 text-[10px] font-bold text-sky-900 technical-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>CHENNAI WAREHOUSE</span>
              </span>
              <span className="text-sky-600">EST. {BUSINESS.established}</span>
            </div>
          </div>

          {/* Navigation Links with Smooth Staggered Micro-Animations */}
          <nav className="flex flex-col gap-1 px-3 sm:px-4 py-3 flex-1 overflow-y-auto">
            <span className="technical-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">
              NAVIGATION
            </span>
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`sidebar-nav-item flex items-center justify-between px-3.5 py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm group ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 border-l-4 border-sky-600 pl-3 font-black shadow-2xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                  style={{
                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(18px)',
                    opacity: mobileMenuOpen ? 1 : 0,
                    transitionDelay: mobileMenuOpen ? `${80 + idx * 35}ms` : '0ms',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="technical-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-700 font-semibold normal-case">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${isActive ? 'text-sky-600' : 'text-slate-300'}`} />
                </Link>
              );
            })}

            {/* Quick Division Shortcuts */}
            <div className="mt-4 pt-3 border-t border-slate-100 px-1">
              <span className="technical-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-2">
                POPULAR DIVISIONS
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {quickCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-800 text-[11px] font-bold transition-colors border border-slate-100 hover:border-sky-200"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Sticky Bottom Actions & Contact Card */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/90 space-y-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-support-chat'));
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-md cursor-pointer border border-sky-500/30"
            >
              <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>Ask Balaji AI Support</span>
            </button>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackWhatsAppClick('sidebar-drawer');
                setMobileMenuOpen(false);
              }}
              className="whatsapp-btn w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white rounded-xl shadow-md uppercase tracking-wider hover:brightness-105 active:scale-[0.99] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Enquiry</span>
            </a>

            <a
              href={getPhoneUrl()}
              onClick={() => {
                trackCallClick('sidebar-drawer');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all uppercase tracking-wider shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>Call Store Desk</span>
            </a>

            {/* Location & Hours Footnote */}
            <div className="pt-2 text-center">
              <span className="technical-mono text-[9px] text-slate-500 block font-medium">
                Otteri, Chennai — 600012 · Mon-Sat 9:30 AM–7:30 PM
              </span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
