import type { Metadata } from 'next';
import { MessageCircle, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { BUSINESS, CONTACT, BUSINESS_HOURS } from '@/lib/config';
import { getGeneralWhatsAppUrl, getPhoneUrl } from '@/lib/whatsapp';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PoolLaneSpine from '@/components/ui/aquatic/PoolLaneSpine';

export const metadata: Metadata = {
  title: `Contact ${BUSINESS.name} — WhatsApp & Phone Desk | Chennai Swimwear Distributor`,
  description: `Direct contact with Balaji Traders for wholesale swimwear enquiries, pricing lists, and stock checks. WhatsApp, phone, email. Based in Otteri, Chennai.`,
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] pt-20">
      {/* Top Header */}
      <div className="border-b border-slate-200/80 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Giant Closing Scene Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="technical-mono text-[10px] font-bold text-sky-600 block mb-3">
            DIRECT DISTRIBUTION DESK // CHENNAI WAREHOUSE
          </span>
          <h1 className="text-3xl min-[400px]:text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 uppercase tracking-tight leading-[0.95] sm:leading-[0.92] mb-6 break-words">
            Let&apos;s Talk About
            <br />
            <span className="text-gradient-cyan">Your Next Requirement.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
            Direct communication with our Otteri, Chennai warehouse desk. No automated tickets or call queues — just straightforward swimwear supply.
          </p>

          {/* Primary Action Trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: {CONTACT.phoneFormatted}
            </a>
            <a
              href={getPhoneUrl()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              Call: {CONTACT.phone}
            </a>
          </div>
        </div>

        <PoolLaneSpine distance="100.00M · REACH OUT" label="DIRECT CONNECTION" />

        {/* Contact Information Arranged Around It */}
        <div className="grid md:grid-cols-3 gap-6 pt-8 mb-8">
          {/* Location */}
          <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <span className="technical-mono text-[10px] text-slate-400 font-bold block mb-2">
              01 // WAREHOUSE & SHOWROOM
            </span>
            <h3 className="font-bold text-base text-slate-950 uppercase mb-2">Location</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {BUSINESS.location.fullAddress}
            </p>
            <a
              href={CONTACT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline uppercase tracking-wider"
            >
              Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Operations & Hours */}
          <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <span className="technical-mono text-[10px] text-slate-400 font-bold block mb-2">
              02 // TRADING HOURS
            </span>
            <h3 className="font-bold text-base text-slate-950 uppercase mb-2">Operating Times</h3>
            <div className="text-xs text-slate-600 space-y-1.5">
              <p className="flex justify-between">
                <span>Mon – Sat:</span>
                <span className="font-bold text-slate-900">{BUSINESS_HOURS.weekdays}</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-bold text-slate-400">{BUSINESS_HOURS.sunday}</span>
              </p>
            </div>
            <p className="text-[11px] text-slate-400 mt-4">
              Immediate WhatsApp replies during business hours.
            </p>
          </div>

          {/* Formal Inquiries */}
          <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <span className="technical-mono text-[10px] text-slate-400 font-bold block mb-2">
              03 // FORMAL TENDERS & GST
            </span>
            <h3 className="font-bold text-base text-slate-950 uppercase mb-2">Email Desk</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              For institutional tenders, formal quotation requests, GST billing, and vendor registration.
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-xs font-bold text-sky-600 hover:underline block"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>

        {/* Google Maps Interactive Facility Map */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs mb-8">
          <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span className="technical-mono text-[10px] font-bold text-sky-600 uppercase tracking-widest">
                  WAREHOUSE & DISPATCH MAP
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-slate-950">
                {BUSINESS.name} — Otteri Warehouse
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                {BUSINESS.location.fullAddress}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Embedded Google Map Iframe */}
          <div className="relative w-full h-[360px] sm:h-[440px] bg-slate-100">
            <iframe
              title="Balaji Traders Otteri Chennai Google Map"
              src="https://maps.google.com/maps?q=NO+-+70,+SATHIYAPPAN+STREET,+2ND+LANE,+OTTERI,+CHENNAI+-+600012&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
            <span>📍 Landmark: 2nd Lane, Sathiyappan Street · Purasawalkam / Otteri corridor, Chennai</span>
            <span className="technical-mono text-[11px] text-slate-600 font-semibold">PINCODE: {BUSINESS.location.pincode}</span>
          </div>
        </div>

        {/* GSTIN & Billing Identity Card */}
        <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
            <div>
              <span className="technical-mono text-[10px] font-bold text-sky-400 uppercase tracking-widest block mb-1">
                OFFICIAL WHOLESALE BILLING & DISPATCH IDENTITY
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                {BUSINESS.name}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="technical-mono text-xs text-slate-400 font-bold uppercase">
                STATE CODE: <span className="text-white">{BUSINESS.stateCode}</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 font-mono text-xs font-bold">
                VERIFIED TAXPAYER
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-xs">
            <div>
              <span className="text-slate-400 block font-medium mb-1">GSTIN / UIN</span>
              <span className="font-mono text-sm font-bold text-white tracking-wider">
                {BUSINESS.gstin}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium mb-1">Place of Supply</span>
              <span className="text-sm font-bold text-white">
                {BUSINESS.location.state} (Code {BUSINESS.stateCode})
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium mb-1">Consignee & Buyer Address</span>
              <span className="text-slate-300 font-normal leading-relaxed block">
                {BUSINESS.location.street}, {BUSINESS.location.area}, {BUSINESS.location.city} - {BUSINESS.location.pincode}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium mb-1">Direct Phone Lines</span>
              <div className="space-y-0.5">
                <a href={getPhoneUrl()} className="text-sky-400 hover:underline block font-semibold">
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
