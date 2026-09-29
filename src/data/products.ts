import type { Product } from '@/types';

/**
 * PRODUCT CATALOG — Balaji Traders
 * =================================
 * Sample products based on verified IndiaMART inventory.
 * UPDATE: Replace placeholder images and descriptions with actual product data.
 *
 * To add a product: copy an existing entry and modify all fields.
 * To remove: delete the object from this array.
 * To change availability: update the 'availability' field.
 */

export const products: Product[] = [
  // ========== MEN'S SWIMWEAR ==========
  {
    id: 'egl-m-jammer-001',
    slug: 'eglider-mens-racing-jammer-black',
    name: 'EGLIDER Pro Racing Jammer',
    brand: 'EGLIDER',
    category: "Men's Swimwear",
    categorySlug: 'mens-swimwear',
    sku: 'EGL-MRJ-001',
    price: 1200,
    mrp: 1599,
    description:
      'Professional men\'s racing jammer designed for competitive swimming. Streamlined fit provides supportive athletic compression and comfortable movement. Durable polyester blend fabric ensures shape retention through regular training sessions.',
    shortDescription: 'Professional racing jammer for competitive swimmers.',
    images: [
      { src: '/images/products/mens-racing-jammer-black.png', alt: 'EGLIDER Pro Racing Jammer - Black', width: 800, height: 1000 },
    ],
    colors: ['Black', 'Navy Blue', 'Black/Red'],
    sizes: ['26', '28', '30', '32', '34', '36', '38'],
    material: 'Polyester Blend',
    features: [
      'Streamlined athletic cut',
      'Supportive athletic fit',
      'Durable pool-grade fabric',
      'Flatlock seams for comfort',
      'Internal drawcord',
      'Knee-length cut',
    ],
    availability: 'in-stock',
    tags: ['racing', 'jammer', 'competition', 'men'],
    gender: 'men',
    isFeatured: true,
    seoTitle: 'EGLIDER Pro Racing Jammer — Men\'s Competition Swimwear | Balaji Traders',
    seoDescription: 'EGLIDER Pro Racing Jammer. Professional men\'s competition jammer available at Balaji Traders Chennai. Wholesale pricing available.',
    keywords: ['racing jammer', 'EGLIDER jammer', 'mens competition swimwear', 'swimming jammer'],
  },
  {
    id: 'egl-m-brief-001',
    slug: 'eglider-mens-training-brief',
    name: 'EGLIDER Training Swim Brief',
    brand: 'EGLIDER',
    category: "Men's Swimwear",
    categorySlug: 'mens-swimwear',
    sku: 'EGL-MTB-001',
    price: 450,
    mrp: 650,
    description:
      'Durable men\'s training swim brief designed for everyday pool use. Quality stretch fabric maintains shape through regular pool sessions. Classic brief cut provides maximum freedom of movement for serious swimmers.',
    shortDescription: 'Durable training brief for daily pool practice.',
    images: [
      { src: '/images/products/mens-training-brief.png', alt: 'EGLIDER Training Swim Brief', width: 800, height: 1000 },
    ],
    colors: ['Black', 'Navy', 'Royal Blue'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    material: 'Durable Polyester Blend',
    features: [
      'Durable pool fabric',
      'Shape retention technology',
      'Internal drawcord',
      'Classic brief cut',
      'Quick-dry material',
    ],
    availability: 'in-stock',
    tags: ['training', 'brief', 'swim brief', 'men'],
    gender: 'men',
    seoTitle: 'EGLIDER Training Swim Brief — Men\'s Swimwear | Balaji Traders',
    seoDescription: 'EGLIDER Training Swim Brief — durable chlorine-resistant men\'s swimwear. Available at Balaji Traders Chennai.',
    keywords: ['swim brief', 'training swimwear', 'mens swim brief'],
  },
  {
    id: 'egl-m-shorts-001',
    slug: 'eglider-mens-swim-shorts',
    name: 'EGLIDER Men\'s Swim Shorts',
    brand: 'EGLIDER',
    category: "Men's Swimwear",
    categorySlug: 'mens-swimwear',
    sku: 'EGL-MSS-001',
    price: 350,
    mrp: 500,
    description:
      'Comfortable men\'s swimming shorts suitable for recreational swimming and water activities. Quick-dry fabric with secure elastic waistband and internal drawcord. Available in multiple colours.',
    shortDescription: 'Comfortable swim shorts for recreational and casual swimming.',
    images: [
      { src: '/images/products/mens-swim-shorts.png', alt: 'EGLIDER Men\'s Swim Shorts', width: 800, height: 1000 },
    ],
    colors: ['Black', 'Navy', 'Blue', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: 'Quick-Dry Polyester',
    features: [
      'Quick-dry fabric',
      'Elastic waistband with drawcord',
      'Side pockets',
      'Lightweight construction',
    ],
    availability: 'in-stock',
    tags: ['shorts', 'swim shorts', 'casual', 'men'],
    gender: 'men',
    seoTitle: 'EGLIDER Men\'s Swim Shorts | Balaji Traders Chennai',
    seoDescription: 'EGLIDER Men\'s Swim Shorts — comfortable and quick-dry. Available at Balaji Traders Chennai. Wholesale pricing.',
    keywords: ['swim shorts', 'mens swimming shorts'],
  },

  // ========== WOMEN'S SWIMWEAR ==========
  {
    id: 'egl-w-racing-001',
    slug: 'eglider-womens-racing-suit',
    name: 'EGLIDER Women\'s Racing Kneeskin',
    brand: 'EGLIDER',
    category: "Women's Swimwear",
    categorySlug: 'womens-swimwear',
    sku: 'EGL-WRK-001',
    price: 1800,
    mrp: 2499,
    description:
      'Women\'s racing kneeskin designed for competitive swimming. Athletic compression fit provides streamlined performance in the water. Knee-length construction with open back for competitive swim meets.',
    shortDescription: 'Racing kneeskin for competitive swimming and swim meets.',
    images: [
      { src: '/images/products/womens-racing-kneeskin.png', alt: 'EGLIDER Women\'s Racing Kneeskin', width: 800, height: 1000 },
    ],
    colors: ['Black', 'Navy/Cyan', 'Black/Pink'],
    sizes: ['24', '26', '28', '30', '32', '34'],
    material: 'Polyester-Spandex Blend',
    features: [
      'Streamlined racing cut',
      'Athletic compression fit',
      'Knee-length for maximum coverage',
      'Flatlock seams for comfort',
      'Supportive ergonomic panels',
      'Open back design',
    ],
    availability: 'in-stock',
    tags: ['racing', 'kneeskin', 'competition', 'women'],
    gender: 'women',
    isFeatured: true,
    seoTitle: 'EGLIDER Women\'s Racing Kneeskin — Competition Swimwear | Balaji Traders',
    seoDescription: 'EGLIDER Women\'s Racing Kneeskin. Professional competition swimwear at Balaji Traders Chennai.',
    keywords: ['racing kneeskin', 'womens competition swimwear', 'EGLIDER racing suit'],
  },
  {
    id: 'egl-w-onepiece-001',
    slug: 'eglider-womens-training-onepiece',
    name: 'EGLIDER Women\'s Training One-Piece',
    brand: 'EGLIDER',
    category: "Women's Swimwear",
    categorySlug: 'womens-swimwear',
    sku: 'EGL-WTO-001',
    price: 600,
    mrp: 899,
    description:
      'Professional women\'s one-piece training swimsuit built for daily pool use. Resilient fabric with shape retention. Comfortable fit with adequate coverage for serious training sessions.',
    shortDescription: 'Professional one-piece training suit for daily pool use.',
    images: [
      { src: '/images/products/womens-training-onepiece.png', alt: 'EGLIDER Women\'s Training One-Piece', width: 800, height: 1000 },
    ],
    colors: ['Black', 'Navy', 'Black/Pink', 'Navy/Cyan'],
    sizes: ['26', '28', '30', '32', '34', '36'],
    material: 'Polyester-Spandex Blend',
    features: [
      'Durable pool-grade fabric',
      'Shape retention',
      'Wide straps for comfort',
      'Modest back design',
      'Quick-dry material',
    ],
    availability: 'in-stock',
    tags: ['training', 'one-piece', 'swimming costume', 'women'],
    gender: 'women',
    seoTitle: 'EGLIDER Women\'s Training One-Piece — Swimming Costume | Balaji Traders',
    seoDescription: 'EGLIDER Women\'s Training One-Piece swimming costume. Chlorine-resistant and durable. Available wholesale at Balaji Traders Chennai.',
    keywords: ['womens swimming costume', 'one-piece swimsuit', 'training swimwear'],
  },
  {
    id: 'egl-w-costume-001',
    slug: 'eglider-ladies-swimming-costume',
    name: 'EGLIDER Ladies Swimming Costume',
    brand: 'EGLIDER',
    category: "Women's Swimwear",
    categorySlug: 'womens-swimwear',
    sku: 'EGL-WLC-001',
    price: 500,
    mrp: 750,
    description:
      'Comfortable ladies swimming costume suitable for recreational swimming and water activities. Lycra-blend fabric for a smooth and flexible fit. Ideal for swimming pools and water parks.',
    shortDescription: 'Comfortable Lycra-blend swimming costume for recreational use.',
    images: [
      { src: '/images/products/ladies-swimming-costume.png', alt: 'EGLIDER Ladies Swimming Costume', width: 800, height: 1000 },
    ],
    colors: ['Black', 'Navy', 'Blue', 'Purple'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: 'Lycra Blend',
    features: [
      'Lycra-blend fabric',
      'Comfortable fit',
      'UV protection',
      'Quick-dry',
    ],
    availability: 'available',
    tags: ['swimming costume', 'ladies', 'recreational', 'women'],
    gender: 'women',
    seoTitle: 'EGLIDER Ladies Swimming Costume | Balaji Traders Chennai',
    seoDescription: 'EGLIDER Ladies Swimming Costume in Lycra blend. Comfortable and durable. Wholesale at Balaji Traders Chennai.',
    keywords: ['ladies swimming costume', 'swimming costume Chennai'],
  },

  // ========== KIDS' SWIMWEAR ==========
  {
    id: 'egl-k-boys-001',
    slug: 'eglider-boys-swim-trunk',
    name: 'EGLIDER Boys Swim Trunk',
    brand: 'EGLIDER',
    category: "Kids' Swimwear",
    categorySlug: 'kids-swimwear',
    sku: 'EGL-KBT-001',
    price: 250,
    mrp: 400,
    description:
      'Durable boys swim trunk for young swimmers. Comfortable elastic waistband with quick-dry fabric. Suitable for swimming lessons, training, and recreational swimming.',
    shortDescription: 'Durable and comfortable swim trunk for young swimmers.',
    images: [
      { src: '/images/products/boys-swim-trunk.png', alt: 'EGLIDER Boys Swim Trunk', width: 800, height: 1000 },
    ],
    colors: ['Black', 'Blue', 'Navy', 'Red'],
    sizes: ['22', '24', '26', '28', '30'],
    material: 'Polyester',
    features: [
      'Quick-dry fabric',
      'Elastic waistband',
      'Comfortable fit for kids',
      'Durable construction',
    ],
    availability: 'in-stock',
    tags: ['kids', 'boys', 'swim trunk', 'children'],
    gender: 'kids',
    seoTitle: 'EGLIDER Boys Swim Trunk — Kids\' Swimwear | Balaji Traders Chennai',
    seoDescription: 'EGLIDER Boys Swim Trunk — durable and comfortable kids swimwear. Wholesale at Balaji Traders Chennai.',
    keywords: ['boys swimwear', 'kids swim trunk', 'children swimming costume'],
  },
  {
    id: 'egl-k-girls-001',
    slug: 'eglider-girls-racing-swimsuit',
    name: 'EGLIDER Girls Competition Swimsuit',
    brand: 'EGLIDER',
    category: "Kids' Swimwear",
    categorySlug: 'kids-swimwear',
    sku: 'EGL-KGC-001',
    price: 550,
    mrp: 799,
    description:
      'Professional-grade girls competition swimsuit designed for young competitive swimmers. Resilient fabric with athletic fit for training and racing. Perfect for swim meets and intensive training.',
    shortDescription: 'Competition swimsuit for young competitive swimmers.',
    images: [
      { src: '/images/products/girls-competition-swimsuit.png', alt: 'EGLIDER Girls Competition Swimsuit', width: 800, height: 1000 },
    ],
    colors: ['Black', 'Navy/Pink', 'Black/Cyan'],
    sizes: ['22', '24', '26', '28', '30', '32'],
    material: 'Polyester Blend',
    features: [
      'Competition-grade construction',
      'Durable pool fabric',
      'Athletic fit',
      'Racerback design',
      'Flatlock seams',
    ],
    availability: 'in-stock',
    tags: ['kids', 'girls', 'competition', 'racing', 'children'],
    gender: 'kids',
    isFeatured: true,
    seoTitle: 'EGLIDER Girls Competition Swimsuit | Balaji Traders Chennai',
    seoDescription: 'EGLIDER Girls Competition Swimsuit — professional-grade for young swimmers. Wholesale at Balaji Traders Chennai.',
    keywords: ['girls competition swimsuit', 'kids racing swimwear'],
  },

  // ========== COMPETITION SWIMWEAR ==========
  {
    id: 'egl-c-elite-001',
    slug: 'eglider-elite-racing-jammer',
    name: 'EGLIDER Elite Racing Jammer',
    brand: 'EGLIDER',
    category: 'Competition Swimwear',
    categorySlug: 'competition-swimwear',
    sku: 'EGL-ERJ-001',
    price: 2200,
    mrp: 2999,
    description:
      'EGLIDER\'s top-tier racing jammer engineered for competitive swimming. Streamlined athletic construction provides supportive fit and clean profile for race days.',
    shortDescription: 'Top-tier racing jammer for competitive swimmers.',
    images: [
      { src: '/images/products/elite-racing-jammer.png', alt: 'EGLIDER Elite Racing Jammer', width: 800, height: 1000 },
    ],
    colors: ['Black/Cyan', 'Navy/Gold', 'Black'],
    sizes: ['26', '28', '30', '32', '34', '36'],
    material: 'High-Density Polyester-Spandex',
    features: [
      'Streamlined racing profile',
      'Athletic race-day fit',
      'Supportive muscle panels',
      'Flatlock seam construction',
      'Anatomical panel design',
      'Knee-length cut',
    ],
    availability: 'limited',
    tags: ['elite', 'racing', 'jammer', 'competition', 'performance'],
    gender: 'men',
    isFeatured: true,
    isNewArrival: true,
    seoTitle: 'EGLIDER Elite Racing Jammer | Balaji Traders Chennai',
    seoDescription: 'EGLIDER Elite Racing Jammer for competitive swimmers. Premium competition swimwear at Balaji Traders Chennai.',
    keywords: ['elite racing jammer', 'EGLIDER racing jammer', 'competition jammer'],
  },

  // ========== ACCESSORIES ==========
  {
    id: 'egl-a-goggle-race-001',
    slug: 'eglider-racing-swimming-goggles',
    name: 'EGLIDER Racing Swimming Goggles',
    brand: 'EGLIDER',
    category: 'Swimming Accessories',
    categorySlug: 'swimming-accessories',
    sku: 'EGL-ARG-001',
    price: 280,
    mrp: 450,
    description:
      'Professional racing swimming goggles with anti-fog coating and UV protection. Low-profile hydrodynamic design minimises drag. Adjustable nose bridge and silicone seal for a secure, comfortable fit.',
    shortDescription: 'Professional anti-fog racing goggles with UV protection.',
    images: [
      { src: '/images/products/racing-goggles.png', alt: 'EGLIDER Racing Swimming Goggles', width: 800, height: 1000 },
    ],
    colors: ['Clear/Black', 'Blue/Black', 'Smoke/Silver'],
    sizes: ['One Size', 'Adjustable'],
    material: 'Polycarbonate Lens, Silicone Seal',
    features: [
      'Anti-fog coating',
      'UV protection',
      'Low-profile racing design',
      'Adjustable nose bridge',
      'Silicone gaskets',
      'Split strap design',
    ],
    availability: 'in-stock',
    tags: ['goggles', 'racing goggles', 'accessories', 'anti-fog'],
    gender: 'unisex',
    isFeatured: true,
    seoTitle: 'EGLIDER Racing Swimming Goggles — Anti-Fog, UV Protection | Balaji Traders',
    seoDescription: 'EGLIDER Racing Swimming Goggles with anti-fog and UV protection. Professional swimming goggles at Balaji Traders Chennai.',
    keywords: ['racing goggles', 'swimming goggles', 'anti-fog goggles'],
  },
  {
    id: 'egl-a-goggle-jr-001',
    slug: 'junior-swim-goggles',
    name: 'Junior Swim Goggles',
    brand: 'EGLIDER',
    category: 'Swimming Accessories',
    categorySlug: 'swimming-accessories',
    sku: 'EGL-AJG-001',
    price: 95,
    mrp: 180,
    description:
      'Comfortable junior swimming goggles designed for young swimmers. Anti-fog lenses with soft silicone frame for a gentle fit around children\'s eyes. Easy-adjust strap for quick fitting.',
    shortDescription: 'Anti-fog junior goggles with soft silicone frame for kids.',
    images: [
      { src: '/images/products/junior-goggles.png', alt: 'Junior Swim Goggles', width: 800, height: 1000 },
    ],
    colors: ['Blue', 'Pink', 'Clear'],
    sizes: ['Junior'],
    material: 'Polycarbonate Lens, Soft Silicone',
    features: [
      'Anti-fog lenses',
      'Soft silicone frame',
      'Easy-adjust strap',
      'Junior sizing',
    ],
    availability: 'in-stock',
    tags: ['goggles', 'junior', 'kids', 'accessories'],
    gender: 'kids',
    seoTitle: 'Junior Swim Goggles — Kids Swimming Goggles | Balaji Traders',
    seoDescription: 'Junior Swim Goggles with anti-fog and soft silicone frame. Kids swimming goggles at Balaji Traders Chennai.',
    keywords: ['junior goggles', 'kids swimming goggles'],
  },
  {
    id: 'egl-a-cap-001',
    slug: 'eglider-silicon-swimming-cap',
    name: 'EGLIDER Silicon Swimming Cap',
    brand: 'EGLIDER',
    category: 'Swimming Accessories',
    categorySlug: 'swimming-accessories',
    sku: 'EGL-ASC-001',
    price: 150,
    mrp: 250,
    description:
      'Premium silicon swimming cap providing excellent fit and durability. Hydrodynamic shape reduces drag. Suitable for training and competition use. Protects hair from chlorine.',
    shortDescription: 'Premium silicon cap — hydrodynamic, durable, chlorine protection.',
    images: [
      { src: '/images/products/silicon-swim-cap.png', alt: 'EGLIDER Silicon Swimming Cap', width: 800, height: 1000 },
    ],
    colors: ['Black', 'White', 'Blue', 'Red', 'Pink'],
    sizes: ['One Size'],
    material: '100% Premium Silicon',
    features: [
      'Premium silicon construction',
      'Hydrodynamic shape',
      'Tear-resistant',
      'Chlorine protection',
      'Comfortable fit',
    ],
    availability: 'in-stock',
    tags: ['cap', 'swimming cap', 'silicon', 'accessories'],
    gender: 'unisex',
    seoTitle: 'EGLIDER Silicon Swimming Cap | Balaji Traders Chennai',
    seoDescription: 'EGLIDER Silicon Swimming Cap — premium, hydrodynamic, durable. Available wholesale at Balaji Traders Chennai.',
    keywords: ['swimming cap', 'silicon cap', 'swim cap'],
  },
  {
    id: 'egl-a-kickboard-001',
    slug: 'swimming-kickboard',
    name: 'Swimming Kickboard',
    brand: 'EGLIDER',
    category: 'Swimming Accessories',
    categorySlug: 'swimming-accessories',
    sku: 'EGL-AKB-001',
    price: 400,
    mrp: 600,
    description:
      'Professional EVA foam kickboard for swim training. Lightweight and buoyant design helps swimmers isolate leg technique. Ergonomic shape with rounded edges for comfortable grip during extended training sets.',
    shortDescription: 'Lightweight EVA foam kickboard for training.',
    images: [
      { src: '/images/products/kickboard.png', alt: 'Swimming Kickboard', width: 800, height: 1000 },
    ],
    colors: ['Blue', 'Yellow', 'Pink'],
    sizes: ['Standard'],
    material: 'EVA Foam',
    features: [
      'High-density EVA foam',
      'Lightweight and buoyant',
      'Ergonomic grip shape',
      'Rounded edges',
      'Durable construction',
    ],
    availability: 'in-stock',
    tags: ['kickboard', 'training', 'accessories'],
    gender: 'unisex',
    seoTitle: 'Swimming Kickboard — Training Equipment | Balaji Traders Chennai',
    seoDescription: 'Professional swimming kickboard for training. EVA foam, lightweight. Wholesale at Balaji Traders Chennai.',
    keywords: ['kickboard', 'swimming training equipment'],
  },
  {
    id: 'egl-a-lifejacket-001',
    slug: 'safety-life-jacket',
    name: 'Safety Life Jacket',
    brand: 'EGLIDER',
    category: 'Swimming Accessories',
    categorySlug: 'swimming-accessories',
    sku: 'EGL-ALJ-001',
    price: 1000,
    mrp: 1500,
    description:
      'Safety life jacket suitable for water sports and swimming. Adjustable straps for secure fit. High-visibility design with durable buckles. Meets standard safety requirements for water activities.',
    shortDescription: 'Safety life jacket with adjustable straps and durable buckles.',
    images: [
      { src: '/images/products/life-jacket.png', alt: 'Safety Life Jacket', width: 800, height: 1000 },
    ],
    colors: ['Orange', 'Red', 'Yellow'],
    sizes: ['S', 'M', 'L', 'XL'],
    material: 'Nylon Shell, EPE Foam',
    features: [
      'High-visibility colours',
      'Adjustable straps',
      'Durable quick-release buckles',
      'EPE foam buoyancy',
      'Whistle attached',
    ],
    availability: 'in-stock',
    tags: ['life jacket', 'safety', 'water sports', 'accessories'],
    gender: 'unisex',
    seoTitle: 'Safety Life Jacket | Balaji Traders Chennai',
    seoDescription: 'Safety Life Jacket for water sports and swimming. Adjustable, high-visibility. Wholesale at Balaji Traders Chennai.',
    keywords: ['life jacket', 'safety life jacket', 'water safety'],
  },
  {
    id: 'egl-a-paddle-001',
    slug: 'swimming-hand-paddles',
    name: 'Swimming Hand Paddles',
    brand: 'EGLIDER',
    category: 'Swimming Accessories',
    categorySlug: 'swimming-accessories',
    sku: 'EGL-AHP-001',
    price: 320,
    mrp: 500,
    description:
      'Ergonomic swimming hand paddles designed to increase stroke power and improve technique. Adjustable rubber tubing for secure fit. Suitable for intermediate to advanced swimmers.',
    shortDescription: 'Ergonomic hand paddles for stroke power and technique.',
    images: [
      { src: '/images/products/hand-paddles.png', alt: 'Swimming Hand Paddles', width: 800, height: 1000 },
    ],
    colors: ['Blue', 'Yellow'],
    sizes: ['S', 'M', 'L'],
    material: 'Polypropylene',
    features: [
      'Ergonomic contoured design',
      'Adjustable rubber tubing',
      'Flow-through holes for feel',
      'Builds stroke strength',
    ],
    availability: 'available',
    tags: ['paddles', 'hand paddles', 'training', 'accessories'],
    gender: 'unisex',
    seoTitle: 'Swimming Hand Paddles — Training Equipment | Balaji Traders Chennai',
    seoDescription: 'Swimming Hand Paddles for stroke power and technique. Wholesale at Balaji Traders Chennai.',
    keywords: ['hand paddles', 'swimming paddles', 'training equipment'],
  },
  {
    id: 'egl-a-snorkel-001',
    slug: 'mask-and-snorkel-set',
    name: 'Mask & Snorkel Set',
    brand: 'EGLIDER',
    category: 'Swimming Accessories',
    categorySlug: 'swimming-accessories',
    sku: 'EGL-AMS-001',
    price: 650,
    mrp: 999,
    description:
      'Complete mask and snorkel set for recreational water activities. Tempered glass lens mask with silicone skirt for comfortable seal. Dry-top snorkel prevents water entry. Ideal for snorkelling, pool activities, and water exploration.',
    shortDescription: 'Complete mask & snorkel set for recreational water activities.',
    images: [
      { src: '/images/products/mask-snorkel-set.png', alt: 'Mask & Snorkel Set', width: 800, height: 1000 },
    ],
    colors: ['Blue/Clear', 'Black/Clear'],
    sizes: ['Adult', 'Junior'],
    material: 'Tempered Glass, Silicone, PVC',
    features: [
      'Tempered glass lens',
      'Silicone mask skirt',
      'Dry-top snorkel',
      'Adjustable strap',
      'Purge valve',
    ],
    availability: 'available',
    tags: ['snorkel', 'mask', 'snorkelling', 'accessories'],
    gender: 'unisex',
    seoTitle: 'Mask & Snorkel Set | Balaji Traders Chennai',
    seoDescription: 'Mask & Snorkel Set for snorkelling and water activities. Wholesale at Balaji Traders Chennai.',
    keywords: ['mask snorkel set', 'snorkelling equipment'],
  },
  {
    id: 'egl-a-ring-001',
    slug: 'pvc-swimming-ring',
    name: 'PVC Swimming Ring',
    brand: 'EGLIDER',
    category: 'Swimming Accessories',
    categorySlug: 'swimming-accessories',
    sku: 'EGL-ASR-001',
    price: 180,
    mrp: 300,
    description:
      'Durable PVC swimming ring suitable for recreational use and swimming pool activities. Multiple sizes available for children and adults. Bright colours for high visibility in water.',
    shortDescription: 'Durable PVC swim ring for recreational use.',
    images: [
      { src: '/images/products/swimming-ring.png', alt: 'PVC Swimming Ring', width: 800, height: 1000 },
    ],
    colors: ['Blue', 'Orange', 'Pink', 'Green'],
    sizes: ['Small (60cm)', 'Medium (70cm)', 'Large (80cm)'],
    material: 'PVC',
    features: [
      'Durable PVC construction',
      'High-visibility colours',
      'Multiple sizes',
      'Safety valve',
    ],
    availability: 'in-stock',
    tags: ['swim ring', 'pool toy', 'recreational', 'accessories'],
    gender: 'unisex',
    seoTitle: 'PVC Swimming Ring | Balaji Traders Chennai',
    seoDescription: 'PVC Swimming Ring for pool activities. Multiple sizes. Wholesale at Balaji Traders Chennai.',
    keywords: ['swimming ring', 'PVC swim ring', 'pool ring'],
  },
];

// ========== HELPER FUNCTIONS ==========

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNewArrival);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;

  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.keywords.some((k) => k.toLowerCase().includes(q))
  );
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
