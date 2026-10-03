/**
 * BALAJI TRADERS — Central Business Configuration
 * ================================================
 * Update these values to change business information across the entire website.
 * This is the SINGLE SOURCE OF TRUTH for all contact info, links, and business details.
 */

export const BUSINESS = {
  name: 'Balaji Traders',
  tagline: 'Swimwear Distribution',
  description:
    'Balaji Traders is a swimwear distributor based in Chennai, Tamil Nadu. Established in 2001, we supply swimming costumes, racing swimwear, training gear, and swimming accessories to retailers, swimming academies, coaches, and institutions.',
  shortDescription:
    'Swimwear distributor based in Chennai, supplying swimming costumes, racing swimwear, and accessories since 2001.',
  established: 2001,
  location: {
    street: 'No - 70, Sathiyappan Street, 2nd Lane',
    area: 'Otteri',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    pincode: '600012',
    fullAddress: 'No - 70, Sathiyappan Street, 2nd Lane, Otteri, Chennai - 600012, Tamil Nadu, India',
  },
  gstin: '33ANWPB8828L1ZD',
  stateCode: '33',
  type: 'Wholesaler, Distributor & Trader',
} as const;

export const CONTACT = {
  // Business WhatsApp number (with country code, no +)
  whatsapp: '919380898894',
  whatsappSecondary: '919380898894',
  // Business phone numbers
  phone: '+91-9380898894',
  phoneFormatted: '+91 93808 98894',
  phoneSecondary: '+91-9380898894',
  phoneSecondaryFormatted: '+91 93808 98894',
  phoneCombined: '+91-9380898894',
  // Business email
  email: 'info@balajitraders.com',
  // Google Maps URL targeting exact street address in Otteri, Chennai 600012
  googleMapsUrl: 'https://maps.google.com/?q=70+Sathiyappan+Street+2nd+Lane+Otteri+Chennai+600012',
  // IndiaMART profile URL
  indiamartUrl: '',
} as const;

export const SOCIAL_LINKS = {
  // UPDATE: Add actual social media profile URLs
  facebook: '',
  instagram: '',
  youtube: '',
  twitter: '',
  linkedin: '',
} as const;

export const BUSINESS_HOURS = {
  weekdays: '10:00 AM – 7:00 PM',
  saturday: '10:00 AM – 7:00 PM',
  sunday: 'Closed',
} as const;

export const SEO = {
  siteUrl: 'https://www.balajiswimwears.in', // UPDATE: Replace with actual domain
  siteName: 'Balaji Traders — The Best Swimwear Distributor in Chennai',
  defaultTitle: 'Top Swimwear Distributor in Chennai | Buy EGLIDER Racing Swimwear | Balaji Traders',
  defaultDescription:
    'Looking for the best swimwear distributor in Chennai? Balaji Traders is the leading wholesale supplier of EGLIDER competition swimming costumes, racing jammers, training gear, and swimming accessories in Tamil Nadu. Top-rated, trusted since 2001. Buy premium swimming suits for academies, coaches, and retail.',
  defaultKeywords: [
    'best swimwear distributor in Chennai',
    'top swimming costume wholesale Tamil Nadu',
    'EGLIDER racing swimwear distributor',
    'buy competition swimming suits Chennai',
    'where to buy swimming accessories wholesale',
    'leading swimwear wholesaler India',
    'Balaji Traders swimwear',
    'professional swimming gear supplier',
    'premium racing jammers wholesale',
    'FINA approved style swimwear distributors',
  ],
  ogImage: '/og-image.jpg', // UPDATE: Add actual OG image
} as const;

export const BRANDS = {
  primary: {
    name: 'EGLIDER',
    relationship: 'Distributor',
    description:
      'EGLIDER is a swimwear brand manufactured by Glider Enterprise in West Bengal, producing swimming costumes, racing jammers, training suits, and swimming accessories.',
    website: 'https://eglider.in',
  },
  secondary: [
    {
      name: 'Speedo',
      relationship: 'Reseller',
      description: 'Globally recognised swimming brand.',
    },
  ],
} as const;

export const ANALYTICS_EVENTS = {
  viewProduct: 'view_product',
  clickWhatsapp: 'click_whatsapp',
  clickCall: 'click_call',
  searchProduct: 'search_product',
  viewCategory: 'view_category',
  enquiryStarted: 'enquiry_started',
  enquiryWhatsappSent: 'enquiry_whatsapp_sent',
  clickCTA: 'click_cta',
} as const;
