import type { Product } from '@/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

// In-memory cache for static-like behavior during navigation
let cachedProducts: Product[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export async function getAllProducts(): Promise<Product[]> {
  if (cachedProducts && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedProducts;
  }

  try {
    const q = query(collection(db, 'products'));
    const snapshot = await getDocs(q);
    const products: Product[] = [];
    
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    
    cachedProducts = products;
    lastFetchTime = Date.now();
    return products;
  } catch (error) {
    console.error("Error fetching products from Firebase:", error);
    // Fallback to local JSON if Firebase fails (e.g. permission denied)
    try {
      const fallback = require('./products.json');
      return fallback.default || fallback;
    } catch {
      return [];
    }
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((product) => product.slug === slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((product) => product.categorySlug === categorySlug);
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((product) => product.brand.toLowerCase() === brand.toLowerCase());
}
