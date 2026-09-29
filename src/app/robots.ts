import type { MetadataRoute } from 'next';
import { SEO } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SEO.siteUrl}/sitemap.xml`,
  };
}
