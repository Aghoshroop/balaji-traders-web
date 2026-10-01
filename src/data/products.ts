import type { Product } from '@/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import hardcodedProducts from './products.json';

export async function getAllProducts(): Promise<Product[]> {
  let firebaseProducts: Product[] = [];
  try {
    const q = query(collection(db, 'products'));
    const snapshot = await getDocs(q);
    
    snapshot.forEach((doc) => {
      firebaseProducts.push({ id: doc.id, ...doc.data() } as Product);
    });
  } catch (error) {
    console.error("Error fetching products from Firebase (maybe rules block it):", error);
    // Ignore error, we will just use hardcoded products
  }

  // Merge hardcoded and firebase products.
  // Firebase products take precedence if they share the same ID (allowing admin to "edit" hardcoded products).
  const mergedMap = new Map<string, Product>();
  
  // 1. Add all hardcoded products
  hardcodedProducts.forEach((p: any) => {
    mergedMap.set(p.id, { ...p, isHardcodedUntouched: true });
  });
  
  // 2. Add/Override with Firebase products
  firebaseProducts.forEach((p: any) => {
    if (p.isDeleted) {
      mergedMap.delete(p.id); // Remove it if it was a hardcoded product marked as deleted
    } else {
      mergedMap.set(p.id, p);
    }
  });
  
  const finalProducts = Array.from(mergedMap.values());
  
  // Sort by numeric part of ID (e.g. prod-1, prod-2)
  finalProducts.sort((a, b) => {
    const numA = parseInt(a.id.replace('prod-', ''), 10) || 0;
    const numB = parseInt(b.id.replace('prod-', ''), 10) || 0;
    return numA - numB;
  });
  
  return finalProducts;
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
