import { CONTACT, BUSINESS } from './config';
import type { Product, EnquiryType, ENQUIRY_LABELS } from '@/types';

/**
 * Generate a WhatsApp URL with a pre-filled message.
 */
export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsapp}?text=${encoded}`;
}

/**
 * Generate a pre-filled WhatsApp message for a specific product.
 */
export function getProductWhatsAppMessage(
  product: Product,
  enquiryType?: EnquiryType
): string {
  const typeLabels: Record<EnquiryType, string> = {
    price: 'Price Enquiry',
    availability: 'Check Availability',
    bulk: 'Bulk / Wholesale Order',
    'size-colour': 'Size & Colour Options',
    dealer: 'Dealer / Reseller Enquiry',
    general: 'General Enquiry',
  };

  const enquiryLabel = enquiryType ? typeLabels[enquiryType] : 'General Enquiry';

  let message = `Hello ${BUSINESS.name},\n\n`;
  message += `I am interested in this product:\n\n`;
  message += `Product: ${product.name}\n`;
  message += `Brand: ${product.brand}\n`;
  message += `Category: ${product.category}\n`;
  message += `Product Code: ${product.sku}\n`;

  if (enquiryType === 'price') {
    message += `\nMy Enquiry: ${enquiryLabel}\n`;
    message += `\nPlease share the current wholesale/bulk pricing and any available discounts.\n`;
  } else if (enquiryType === 'availability') {
    message += `\nMy Enquiry: ${enquiryLabel}\n`;
    message += `\nPlease confirm current stock availability and expected restock dates if out of stock.\n`;
  } else if (enquiryType === 'bulk') {
    message += `\nMy Enquiry: ${enquiryLabel}\n`;
    message += `\nPlease share:\n• Wholesale/Bulk pricing\n• MOQ (Minimum Order Quantity)\n• Available sizes & colours\n• Delivery/dispatch timeline\n`;
  } else if (enquiryType === 'size-colour') {
    message += `\nMy Enquiry: ${enquiryLabel}\n`;
    message += `\nPlease share the available sizes and colour options for this product.\n`;
  } else if (enquiryType === 'dealer') {
    message += `\nMy Enquiry: ${enquiryLabel}\n`;
    message += `\nI am interested in becoming a dealer/reseller. Please share dealer terms, pricing, and requirements.\n`;
  } else {
    message += `\nI would like to know:\n• Availability\n• Wholesale/Bulk price\n• Available sizes\n• Available colours\n• MOQ\n• Delivery/dispatch details\n`;
  }

  message += `\nThank you.`;

  return message;
}

/**
 * Generate a WhatsApp URL for a specific product enquiry.
 */
export function getProductWhatsAppUrl(
  product: Product,
  enquiryType?: EnquiryType
): string {
  return getWhatsAppUrl(getProductWhatsAppMessage(product, enquiryType));
}

/**
 * Generate a general WhatsApp enquiry URL (no specific product).
 */
export function getGeneralWhatsAppUrl(customMessage?: string): string {
  if (customMessage) {
    return getWhatsAppUrl(customMessage);
  }
  const message = `Hello ${BUSINESS.name},\n\nI would like to enquire about your swimwear products.\n\nPlease share your current available stock and wholesale pricing.\n\nThank you.`;
  return getWhatsAppUrl(message);
}

/**
 * Get phone call URL.
 */
export function getPhoneUrl(): string {
  return `tel:${CONTACT.phone}`;
}

/**
 * Get secondary phone call URL.
 */
export function getSecondaryPhoneUrl(): string {
  return `tel:${CONTACT.phoneSecondary}`;
}

/**
 * Get secondary WhatsApp URL.
 */
export function getSecondaryWhatsAppUrl(): string {
  const message = `Hello ${BUSINESS.name},\n\nI would like to enquire about your swimwear products.\n\nThank you.`;
  return `https://wa.me/${CONTACT.whatsappSecondary}?text=${encodeURIComponent(message)}`;
}

