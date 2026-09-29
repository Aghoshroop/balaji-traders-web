import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS } from '@/lib/config';
import { getGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { getFAQSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import type { FAQItem } from '@/types';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Swimwear Wholesale Enquiries',
  description: `Common questions about Balaji Traders swimwear distribution. Wholesale pricing, EGLIDER availability, bulk orders, delivery, and how to enquire. Based in ${BUSINESS.location.city}.`,
};

const faqs: FAQItem[] = [
  {
    question: 'Where is Balaji Traders located?',
    answer: `Balaji Traders is located in ${BUSINESS.location.area}, ${BUSINESS.location.city}, ${BUSINESS.location.state}, India. We have been operating from this location since ${BUSINESS.established}.`,
  },
  {
    question: 'Does Balaji Traders distribute EGLIDER swimwear?',
    answer: 'Yes, Balaji Traders is a distributor of EGLIDER swimwear. We stock EGLIDER racing suits, training swimwear, goggles, and accessories. Contact us on WhatsApp for current availability and wholesale pricing.',
  },
  {
    question: 'How do I enquire about product pricing?',
    answer: 'The easiest way is through WhatsApp. On any product page, click the "WhatsApp Enquiry" button and it will open WhatsApp with a pre-filled message containing the product details. You can also call us directly during business hours.',
  },
  {
    question: 'Do you sell individual pieces or only in bulk?',
    answer: 'We are primarily a wholesaler and distributor, so we specialise in bulk orders. However, we are happy to discuss requirements of any size. Please contact us on WhatsApp or phone to discuss your specific needs.',
  },
  {
    question: 'What types of swimwear do you stock?',
    answer: "We stock a comprehensive range: men's racing jammers and swim briefs, women's competition kneeskins and one-piece suits, kids' swimwear, training costumes, swim shorts, and accessories including swimming goggles (anti-fog and racing), silicon caps, kickboards, safety life jackets, hand paddles, mask and snorkel sets, and swim rings.",
  },
  {
    question: 'Do you supply to swimming academies and schools?',
    answer: 'Absolutely. We regularly supply swimwear and swimming accessories to swimming academies, schools, colleges, sports clubs, competitive swimmers, coaches, and retail sports shops. We can handle institutional and bulk requirements.',
  },
  {
    question: 'Can I visit your shop/showroom?',
    answer: `Yes, you are welcome to visit us at ${BUSINESS.location.fullAddress}. Our business hours are Monday to Saturday, 10:00 AM to 7:00 PM. We are closed on Sundays. We recommend calling ahead to ensure product availability.`,
  },
  {
    question: 'What brands do you carry besides EGLIDER?',
    answer: 'Our primary brand is EGLIDER, for which we are a distributor. We also stock select products from other brands like Speedo. Please contact us on WhatsApp for current brand availability.',
  },
  {
    question: 'Do you offer delivery/shipping?',
    answer: 'Please contact us on WhatsApp or phone to discuss delivery arrangements for your order. Delivery terms depend on order size, location, and product availability across India.',
  },
  {
    question: 'How do I check if a specific product is in stock?',
    answer: 'Product availability is shown on each product page. For real-time stock confirmation, especially for large orders, we recommend sending a WhatsApp enquiry or calling us directly. Stock levels can change, so direct confirmation is always best for bulk requirements.',
  },
  {
    question: 'What materials are used in EGLIDER swimwear?',
    answer: 'EGLIDER swimwear uses durable polyester and Lycra blends designed for competitive and daily pool swimming. Racing jammers feature flatlock stitching and knee-length athletic cuts.',
  },
  {
    question: 'Do you have a minimum order quantity (MOQ)?',
    answer: 'MOQ varies by product and brand. Please contact us on WhatsApp with your specific requirement, and we will share the applicable MOQ, pricing, and available sizes/colours.',
  },
];

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }}
      />

      <div className="min-h-screen bg-slate-50 pt-20">
        <div className="bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: 'FAQ' }]} />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">Frequently Asked Questions</h1>
            <p className="text-slate-600 mt-2 text-sm max-w-2xl">
              Answers regarding wholesale pricing, minimum order quantities, EGLIDER distribution, delivery timelines, and direct enquiry options.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <h2 className="text-sm font-semibold text-slate-900 pr-4">{faq.question}</h2>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Still Have Questions?</h2>
            <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
              Our sales desk is available on WhatsApp and phone for custom queries, academy contracts, or size guides.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto whatsapp-btn flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold rounded-xl shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Ask on WhatsApp
              </a>
              <Link
                href="/products"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
