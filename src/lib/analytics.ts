import { ANALYTICS_EVENTS } from './config';

/**
 * Analytics event tracker — ready for GA4 / GTM integration.
 * Replace the console.log calls with actual analytics implementation.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

function trackEvent(eventName: string, params?: EventParams): void {
  // In production, replace with:
  // window.gtag?.('event', eventName, params);
  // or
  // window.dataLayer?.push({ event: eventName, ...params });
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${eventName}`, params);
  }
}

export function trackProductView(productId: string, productName: string, brand: string, category: string): void {
  trackEvent(ANALYTICS_EVENTS.viewProduct, {
    product_id: productId,
    product_name: productName,
    brand,
    category,
  });
}

export function trackWhatsAppClick(source: string, productId?: string, productName?: string): void {
  trackEvent(ANALYTICS_EVENTS.clickWhatsapp, {
    source,
    product_id: productId,
    product_name: productName,
  });
}

export function trackCallClick(source: string): void {
  trackEvent(ANALYTICS_EVENTS.clickCall, { source });
}

export function trackSearch(query: string, resultCount: number): void {
  trackEvent(ANALYTICS_EVENTS.searchProduct, {
    search_query: query,
    result_count: resultCount,
  });
}

export function trackCategoryView(categorySlug: string, categoryName: string): void {
  trackEvent(ANALYTICS_EVENTS.viewCategory, {
    category_slug: categorySlug,
    category_name: categoryName,
  });
}

export function trackEnquiryStarted(productId: string, enquiryType: string): void {
  trackEvent(ANALYTICS_EVENTS.enquiryStarted, {
    product_id: productId,
    enquiry_type: enquiryType,
  });
}

export function trackCTAClick(ctaName: string, location: string): void {
  trackEvent(ANALYTICS_EVENTS.clickCTA, {
    cta_name: ctaName,
    location,
  });
}
