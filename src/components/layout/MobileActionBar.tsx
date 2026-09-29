'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { getGeneralWhatsAppUrl, getPhoneUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick, trackCallClick } from '@/lib/analytics';

export default function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-lg pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex items-stretch h-14 sm:h-16">
        <a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mobile-action-bar')}
          className="flex-1 whatsapp-btn flex items-center justify-center gap-1.5 sm:gap-2 font-semibold text-xs sm:text-sm px-2 text-center"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span className="truncate">WhatsApp Enquiry</span>
        </a>
        <a
          href={getPhoneUrl()}
          onClick={() => trackCallClick('mobile-action-bar')}
          className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 font-semibold text-xs sm:text-sm text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors border-l border-slate-200 px-2 text-center"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 shrink-0" />
          <span className="truncate">Call Now</span>
        </a>
      </div>
    </div>
  );
}
