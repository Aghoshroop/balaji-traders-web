'use client';

import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import type { Product, EnquiryType } from '@/types';
import { ENQUIRY_LABELS } from '@/types';
import { getProductWhatsAppUrl } from '@/lib/whatsapp';
import { trackEnquiryStarted, trackWhatsAppClick } from '@/lib/analytics';

interface EnquiryModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const enquiryTypes: EnquiryType[] = ['price', 'availability', 'bulk', 'size-colour', 'dealer', 'general'];

export default function EnquiryModal({ product, isOpen, onClose }: EnquiryModalProps) {
  const [selectedType, setSelectedType] = useState<EnquiryType | null>(null);

  if (!isOpen) return null;

  const handleEnquiry = (type: EnquiryType) => {
    setSelectedType(type);
    trackEnquiryStarted(product.id, type);
    trackWhatsAppClick('enquiry-modal', product.id, product.name);

    const url = getProductWhatsAppUrl(product, type);
    window.open(url, '_blank');
    onClose();
    setSelectedType(null);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div>
            <h3 className="text-base font-bold text-slate-900">Enquire About This Product</h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{product.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Enquiry Options */}
        <div className="p-5 overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Select Your Enquiry Type
          </p>
          <div className="grid grid-cols-1 gap-2">
            {enquiryTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleEnquiry(type)}
                className="flex items-center justify-between p-3.5 rounded-xl text-left text-sm font-medium text-slate-800 bg-slate-50/70 border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/80 hover:text-sky-900 transition-all group shadow-2xs"
              >
                <span>{ENQUIRY_LABELS[type]}</span>
                <MessageCircle className="w-4 h-4 text-[#25d366] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <p className="text-xs text-slate-400 text-center">
            Opens WhatsApp with pre-filled product details
          </p>
        </div>
      </div>
    </div>
  );
}
