import { BUSINESS, CONTACT, SEO } from './config';
import type { Product, BreadcrumbItem, FAQItem } from '@/types';

/**
 * JSON-LD Structured Data Generators
 */

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: SEO.siteUrl,
    logo: `${SEO.siteUrl}/logo.png`,
    taxID: BUSINESS.gstin,
    foundingDate: String(BUSINESS.established),
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.location.street,
      addressLocality: BUSINESS.location.city,
      addressRegion: BUSINESS.location.state,
      postalCode: BUSINESS.location.pincode,
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phone,
      contactType: 'sales',
      availableLanguage: ['English', 'Tamil', 'Hindi'],
    },
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SEO.siteUrl}/#localbusiness`,
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: SEO.siteUrl,
    image: `${SEO.siteUrl}/og-image.jpg`,
    taxID: BUSINESS.gstin,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    foundingDate: String(BUSINESS.established),
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.location.fullAddress,
      addressLocality: BUSINESS.location.city,
      addressRegion: BUSINESS.location.state,
      postalCode: BUSINESS.location.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.0935,
      longitude: 80.2526,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    priceRange: '₹₹',
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO.siteUrl}/#website`,
    url: SEO.siteUrl,
    name: BUSINESS.name,
    description: BUSINESS.shortDescription,
    publisher: {
      '@id': `${SEO.siteUrl}/#localbusiness`,
    },
  };
}

export function getProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) => `${SEO.siteUrl}${img.src}`),
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    category: product.category,
    ...(product.price
      ? {
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability:
              product.availability === 'in-stock' || product.availability === 'available'
                ? 'https://schema.org/InStock'
                : product.availability === 'limited'
                  ? 'https://schema.org/LimitedAvailability'
                  : 'https://schema.org/PreOrder',
            seller: {
              '@type': 'Organization',
              name: BUSINESS.name,
            },
          },
        }
      : {}),
  };
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SEO.siteUrl}${item.href}` } : {}),
    })),
  };
}

export function getFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getItemListSchema(products: Product[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SEO.siteUrl}/products/${product.slug}`,
      name: product.name,
    })),
  };
}
