import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'mens-swimwear',
    slug: 'mens-swimwear',
    name: "Men's Swimwear",
    shortName: 'Men',
    description:
      "Professional men's swimming costumes including jammers, swim briefs, swim shorts, and racing suits. Available in various sizes and colours from EGLIDER and other top brands.",
    image: '/images/categories/mens-swimwear.jpg',
    gender: 'men',
    seoTitle: "Men's Swimwear — Jammers, Swim Briefs & Racing Suits | Balaji Traders Chennai",
    seoDescription:
      "Browse men's professional swimwear at Balaji Traders Chennai. EGLIDER jammers, swim briefs, racing suits, and swim shorts available for wholesale. Enquire on WhatsApp.",
  },
  {
    id: 'womens-swimwear',
    slug: 'womens-swimwear',
    name: "Women's Swimwear",
    shortName: 'Women',
    description:
      "Professional women's swimming costumes including one-piece suits, racing kneeskins, and training swimwear. Designed for competitive and training use.",
    image: '/images/categories/womens-swimwear.jpg',
    gender: 'women',
    seoTitle: "Women's Swimwear — Racing Suits & Swimming Costumes | Balaji Traders Chennai",
    seoDescription:
      "Shop women's professional swimwear at Balaji Traders Chennai. EGLIDER racing suits, training costumes, and competition swimwear available wholesale.",
  },
  {
    id: 'kids-swimwear',
    slug: 'kids-swimwear',
    name: "Kids' Swimwear",
    shortName: 'Kids',
    description:
      "Swimming costumes for children including boys' and girls' swimwear. Durable, comfortable swimwear suitable for training and recreational swimming.",
    image: '/images/categories/kids-swimwear.jpg',
    gender: 'kids',
    seoTitle: "Kids' Swimwear — Boys & Girls Swimming Costumes | Balaji Traders Chennai",
    seoDescription:
      "Kids' swimming costumes at Balaji Traders Chennai. Boys and girls swimwear, competition suits, and training costumes available wholesale.",
  },
  {
    id: 'competition-swimwear',
    slug: 'competition-swimwear',
    name: 'Competition Swimwear',
    shortName: 'Racing',
    description:
      'Racing and competitive swimming costumes including jammers and suits designed for competitive swimmers and swim meets.',
    image: '/images/categories/competition-swimwear.jpg',
    gender: 'unisex',
    seoTitle: 'Competition & Racing Swimwear | Balaji Traders Chennai',
    seoDescription:
      'Competition racing swimwear at Balaji Traders Chennai. EGLIDER racing jammers and competitive suits available wholesale.',
  },
  {
    id: 'swimming-accessories',
    slug: 'swimming-accessories',
    name: 'Swimming Accessories',
    shortName: 'Accessories',
    description:
      'Professional swimming accessories including anti-fog goggles, silicon caps, kickboards, hand paddles, safety life jackets, swim rings, and snorkel sets.',
    image: '/images/categories/swimming-accessories.jpg',
    gender: 'unisex',
    seoTitle: 'Swimming Accessories — Goggles, Caps, Kickboards | Balaji Traders Chennai',
    seoDescription:
      'Swimming accessories wholesale at Balaji Traders Chennai. Goggles, silicon caps, kickboards, life jackets, hand paddles, and snorkel sets. Bulk pricing available.',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
